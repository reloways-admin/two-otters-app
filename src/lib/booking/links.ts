import { createHmac, timingSafeEqual } from 'node:crypto'
import { NotConfiguredError, type Env } from '@/lib/integrations/ports'

/**
 * Approve / decline links, one per host per request.
 *
 * A link is the whole credential: whoever holds Amir's approve link can approve
 * as Amir. So it is signed (HMAC-SHA256 with BOOKING_LINK_SECRET), names one
 * host and one action, and dies with the request's hold (24 hours). Nothing is
 * stored to check it against — the signature is the check.
 */

export type Decision = 'approve' | 'decline'

export interface LinkClaims {
  /** Request id. */
  r: string
  /** Host id whose decision this link records. */
  h: string
  a: Decision
  /** Expiry, ms epoch. */
  e: number
}

/** Outside production a fixed secret keeps `npm run dev` working with an empty env. */
const DEV_SECRET = 'two-otters-dev-only-booking-link-secret'

export function linkSecret(env: Env): string {
  if (env.BOOKING_LINK_SECRET) return env.BOOKING_LINK_SECRET
  if (env.NODE_ENV !== 'production') return DEV_SECRET
  throw new NotConfiguredError('booking links (BOOKING_LINK_SECRET)')
}

const b64 = (buf: Buffer) => buf.toString('base64url')
const mac = (secret: string, payload: string) => createHmac('sha256', secret).update(payload).digest()

export function signLink(claims: LinkClaims, secret: string): string {
  const payload = b64(Buffer.from(JSON.stringify(claims)))
  return `${payload}.${b64(mac(secret, payload))}`
}

export type LinkCheck =
  | { ok: true; claims: LinkClaims }
  | { ok: false; reason: 'invalid' | 'expired'; claims?: LinkClaims }

export function verifyLink(token: string, secret: string, now: number): LinkCheck {
  const [payload, sig, extra] = token.split('.')
  if (!payload || !sig || extra !== undefined) return { ok: false, reason: 'invalid' }
  const expected = mac(secret, payload)
  const given = Buffer.from(sig, 'base64url')
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return { ok: false, reason: 'invalid' }

  let claims: LinkClaims
  try {
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
  } catch {
    return { ok: false, reason: 'invalid' }
  }
  const shapeOk =
    typeof claims?.r === 'string' &&
    typeof claims.h === 'string' &&
    (claims.a === 'approve' || claims.a === 'decline') &&
    typeof claims.e === 'number'
  if (!shapeOk) return { ok: false, reason: 'invalid' }
  if (claims.e <= now) return { ok: false, reason: 'expired', claims }
  return { ok: true, claims }
}
