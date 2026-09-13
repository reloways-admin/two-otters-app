import type { AdapterOptions, Env, LeadRecorder, Mailer, OutboundMail } from './ports'
import { createClickUpRecorder } from './recorders/clickup'
import { createConsoleRecorder } from './recorders/console'
import { createBrevoGroupMailer } from './mailers/brevo-group'
import { createBrevoTransactionalMailer } from './mailers/brevo-transactional'
import { createConsoleMailer } from './mailers/console'
import { adapterConfig } from './config'

/**
 * Which adapter runs is data, not code.
 *
 * Adding a provider is a file plus a line in one of these two maps. Nothing in
 * a route, a handler or a form spec changes.
 */
export const allRecorders: Record<string, (options: AdapterOptions) => LeadRecorder> = {
  clickup: createClickUpRecorder,
  console: createConsoleRecorder,
}

export const allMailers: Record<string, (options: AdapterOptions) => Mailer> = {
  'brevo-group': createBrevoGroupMailer,
  'brevo-transactional': createBrevoTransactionalMailer,
  console: createConsoleMailer,
}

const DEFAULT_RECORDER = 'clickup'
const DEFAULT_MAILER = 'brevo-group'
const DEFAULT_INTERNAL_DOMAINS = 'two-otters.studio'

export function getRecorder(env: Env = process.env): LeadRecorder {
  return pick(allRecorders, env.LEAD_RECORDER ?? DEFAULT_RECORDER, 'lead recorder', env, createConsoleRecorder)
}

export function getMailer(env: Env = process.env): Mailer {
  const mailer = pick(allMailers, env.MAILER ?? DEFAULT_MAILER, 'mailer', env, createConsoleMailer)
  return withExternalGuard(mailer, env)
}

/**
 * Resolve a name to an adapter, with one deliberate convenience: outside
 * production, an unconfigured adapter becomes the console one so that
 * `npm run dev` works with an empty `.env.local`. In production it does not —
 * a misconfigured deploy should fail loudly rather than print leads into a log.
 */
function pick<T extends { configured(): boolean }>(
  registry: Record<string, (options: AdapterOptions) => T>,
  name: string,
  kind: string,
  env: Env,
  fallback: (options: AdapterOptions) => T
): T {
  const factory = registry[name]
  if (!factory) {
    throw new Error(`Unknown ${kind} "${name}". Registered: ${Object.keys(registry).join(', ')}`)
  }
  const adapter = factory({ env, config: adapterConfig(name) })
  if (!adapter.configured() && env.NODE_ENV !== 'production') return fallback({ env })
  return adapter
}

/**
 * A mailer writes to visitors, never to us.
 *
 * Internal notification is the recorder's job, and a template pointed at the
 * studio's own inbox is a misconfiguration, not a feature — better to refuse it
 * than to quietly turn the marketing provider into an internal mail relay.
 */
function withExternalGuard(mailer: Mailer, env: Env): Mailer {
  return {
    ...mailer,
    async send(msg: OutboundMail) {
      if (isInternalAddress(msg.to.email, env)) {
        throw new Error(
          `Refusing to send to ${msg.to.email}: mailers write to visitors only (see INTERNAL_MAIL_DOMAINS)`
        )
      }
      return mailer.send(msg)
    },
  }
}

export function isInternalAddress(email: string, env: Env = process.env): boolean {
  const address = email.trim().toLowerCase()
  const domain = address.split('@')[1] ?? ''
  if (!domain) return false

  return (env.INTERNAL_MAIL_DOMAINS ?? DEFAULT_INTERNAL_DOMAINS)
    .split(',')
    .map(entry => entry.trim().toLowerCase())
    .filter(Boolean)
    .some(entry =>
      // An entry can be a whole address or a domain; a domain covers subdomains.
      entry.includes('@') ? entry === address : domain === entry || domain.endsWith(`.${entry}`)
    )
}
