import { DeliveryError, NotConfiguredError, type Env } from '@/lib/integrations/ports'
import type { CalendarPort, CalendarEvent } from './calendar'
import type { Interval } from './slots'

/**
 * Google Calendar over plain REST — no SDK, same as lib/brand-drive.ts.
 *
 * Each host connects their *own* Google account once (scripts/google-calendar-token.mjs)
 * and we keep that account's refresh token. Nothing is shared between the two
 * calendars: we ask each one when it's busy, and create the event in the
 * organizer's, inviting the other host and the visitor. Google sends those
 * invites itself, Meet link included.
 *
 *   GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET   the OAuth client
 *   GOOGLE_REFRESH_TOKEN_<HOST ID>                        e.g. GOOGLE_REFRESH_TOKEN_AMIR
 */

const NAME = 'google-calendar'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const API = 'https://www.googleapis.com/calendar/v3'

export const tokenVar = (hostId: string) => `GOOGLE_REFRESH_TOKEN_${hostId.toUpperCase()}`

/** Access tokens live an hour; one per host is plenty to cache. */
const accessTokens = new Map<string, { token: string; expires: number }>()

export function createGoogleCalendar({
  env,
  hostIds,
  fetchImpl = fetch,
}: {
  env: Env
  hostIds: string[]
  fetchImpl?: typeof fetch
}): CalendarPort {
  const configured = () =>
    Boolean(env.GOOGLE_OAUTH_CLIENT_ID && env.GOOGLE_OAUTH_CLIENT_SECRET) &&
    hostIds.every(id => Boolean(env[tokenVar(id)]))

  async function accessToken(hostId: string) {
    if (!configured()) throw new NotConfiguredError(NAME)
    const cached = accessTokens.get(hostId)
    if (cached && cached.expires > Date.now() + 60_000) return cached.token

    const res = await fetchImpl(TOKEN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: env.GOOGLE_OAUTH_CLIENT_ID!,
        client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET!,
        refresh_token: env[tokenVar(hostId)]!,
        grant_type: 'refresh_token',
      }),
    })
    if (!res.ok) {
      // A revoked or expired refresh token shows up here as 400 invalid_grant.
      // Retrying cannot fix it; someone has to reconnect that account.
      throw new DeliveryError(NAME, res.status, `token refresh for ${hostId}: ${await res.text()}`)
    }
    const data = (await res.json()) as { access_token: string; expires_in: number }
    accessTokens.set(hostId, { token: data.access_token, expires: Date.now() + data.expires_in * 1000 })
    return data.access_token
  }

  async function call<T>(hostId: string, path: string, body: unknown): Promise<T> {
    const res = await fetchImpl(`${API}${path}`, {
      method: 'POST',
      headers: { authorization: `Bearer ${await accessToken(hostId)}`, 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new DeliveryError(NAME, res.status, `${path}: ${await res.text()}`)
    return (await res.json()) as T
  }

  return {
    name: NAME,
    configured,

    async freeBusy(ids, from, to) {
      // One call per host, each with its own token, against its own primary
      // calendar — so neither host has to share a calendar with the other.
      const entries = await Promise.all(
        ids.map(async id => {
          const data = await call<{
            calendars: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }>
          }>(id, '/freeBusy', {
            timeMin: new Date(from).toISOString(),
            timeMax: new Date(to).toISOString(),
            items: [{ id: 'primary' }],
          })
          const cal = data.calendars.primary
          // A calendar Google couldn't read must not look empty — that would
          // offer every slot as free.
          if (!cal || cal.errors?.length) {
            throw new DeliveryError(NAME, null, `freeBusy for ${id}: ${JSON.stringify(cal?.errors)}`)
          }
          const busy: Interval[] = (cal.busy ?? []).map(b => ({ start: Date.parse(b.start), end: Date.parse(b.end) }))
          return [id, busy] as const
        })
      )
      return Object.fromEntries(entries)
    },

    async createEvent(organizerId, event: CalendarEvent) {
      const created = await call<{ id: string; hangoutLink?: string }>(
        organizerId,
        // sendUpdates=all is what makes Google email the invites.
        '/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all',
        {
          summary: event.summary,
          description: event.description,
          start: { dateTime: new Date(event.start).toISOString() },
          end: { dateTime: new Date(event.end).toISOString() },
          attendees: event.attendees.map(a => ({ email: a.email, displayName: a.name })),
          conferenceData: {
            createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } },
          },
          reminders: { useDefault: true },
        }
      )
      return { id: created.id, meetUrl: created.hangoutLink }
    },
  }
}
