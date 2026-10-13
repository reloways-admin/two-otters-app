import { DeliveryError, NotConfiguredError, type Env } from '@/lib/integrations/ports'
import { ConflictError, type CalendarPort, type CalendarEvent, type StoredEvent } from './calendar'
import type { Interval } from './slots'

/**
 * Google Calendar over plain REST — no SDK, same as lib/brand-drive.ts.
 *
 * Each host connects their *own* Google account once (scripts/google-calendar-token.mjs)
 * and we keep that account's refresh token. Nothing is shared between the two
 * calendars: we ask each one when it's busy, write a private hold into each
 * one while a request waits for approval (no attendees, so no emails), and
 * once both hosts approve create the meeting in the organizer's calendar with
 * the other host as attendee. Google invites that host itself, Meet link
 * included. The visitor is never a Google attendee: their invitation is our
 * own email with an .ics (see lib/booking/mailer.ts).
 *
 *   GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET   the OAuth client
 *   GOOGLE_REFRESH_TOKEN_<HOST ID>                        e.g. GOOGLE_REFRESH_TOKEN_AMIR
 *   BOOKING_ALSO_BUSY_<HOST ID>     optional, comma-separated: more calendars
 *                                   that count as busy for that host (each one
 *                                   shares at least free/busy with the account
 *                                   above), e.g. a second workspace's calendar
 */

const NAME = 'google-calendar'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const API = 'https://www.googleapis.com/calendar/v3'

export const tokenVar = (hostId: string) => `GOOGLE_REFRESH_TOKEN_${hostId.toUpperCase()}`

/** The host's primary calendar plus any BOOKING_ALSO_BUSY_<HOST> ones. */
export const busyCalendars = (env: Env, hostId: string) => [
  'primary',
  ...(env[`BOOKING_ALSO_BUSY_${hostId.toUpperCase()}`] ?? '').split(',').map(s => s.trim()).filter(Boolean),
]

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

  async function request(hostId: string, method: string, path: string, body?: unknown, headers: Record<string, string> = {}) {
    return fetchImpl(`${API}${path}`, {
      method,
      headers: {
        authorization: `Bearer ${await accessToken(hostId)}`,
        ...(body === undefined ? {} : { 'content-type': 'application/json' }),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  }

  async function call<T>(hostId: string, path: string, body: unknown, method = 'POST', headers?: Record<string, string>): Promise<T> {
    const res = await request(hostId, method, path, body, headers)
    if (res.status === 412) throw new ConflictError(`${path} changed since it was read`)
    if (!res.ok) throw new DeliveryError(NAME, res.status, `${path}: ${await res.text()}`)
    return (await res.json()) as T
  }

  const eventPath = (id: string) => `/calendars/primary/events/${encodeURIComponent(id)}`

  async function getEvent(hostId: string, id: string): Promise<StoredEvent | null> {
    const res = await request(hostId, 'GET', eventPath(id))
    if (res.status === 404 || res.status === 410) return null
    if (!res.ok) throw new DeliveryError(NAME, res.status, `get event: ${await res.text()}`)
    const event = (await res.json()) as GoogleEvent
    return event.status === 'cancelled' ? null : toStored(event)
  }

  return {
    name: NAME,
    configured,

    async freeBusy(ids, from, to) {
      // One call per host, each with its own token: their primary calendar plus
      // any extra calendars shared with that account (BOOKING_ALSO_BUSY_<HOST>).
      const entries = await Promise.all(
        ids.map(async id => {
          const calendars = busyCalendars(env, id)
          const data = await call<{
            calendars: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }>
          }>(id, '/freeBusy', {
            timeMin: new Date(from).toISOString(),
            timeMax: new Date(to).toISOString(),
            items: calendars.map(c => ({ id: c })),
          })
          const busy: Interval[] = calendars.flatMap(c => {
            const cal = data.calendars[c]
            // A calendar Google couldn't read must not look empty — that would
            // offer every slot as free. (An extra calendar that stopped being
            // shared comes back as notFound and lands here too.)
            if (!cal || cal.errors?.length) {
              throw new DeliveryError(NAME, null, `freeBusy for ${id} (${c}): ${JSON.stringify(cal?.errors)}`)
            }
            return (cal.busy ?? []).map(b => ({ start: Date.parse(b.start), end: Date.parse(b.end) }))
          })
          return [id, busy] as const
        })
      )
      return Object.fromEntries(entries)
    },

    async timeZones(ids) {
      // events.list carries the calendar's own time zone, so this needs no
      // scope beyond the calendar.events one we already hold.
      const entries = await Promise.all(
        ids.map(async id => {
          const data = await call<{ timeZone?: string }>(id, '/calendars/primary/events?maxResults=1&fields=timeZone', undefined, 'GET')
          return [id, data.timeZone ?? ''] as const
        })
      )
      return Object.fromEntries(entries.filter(([, zone]) => zone))
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
          ...(event.props ? { extendedProperties: { private: event.props } } : {}),
        }
      )
      return { id: created.id, meetUrl: created.hangoutLink }
    },

    async createHold(hostId, hold) {
      // No attendees and sendUpdates=none: a hold is a note to its own host,
      // nobody else hears about it. Private, so a shared calendar shows "busy".
      const created = await call<GoogleEvent>(hostId, '/calendars/primary/events?sendUpdates=none', {
        summary: hold.summary,
        description: hold.description,
        start: { dateTime: new Date(hold.start).toISOString() },
        end: { dateTime: new Date(hold.end).toISOString() },
        visibility: 'private',
        transparency: 'opaque',
        reminders: { useDefault: false, overrides: [] },
        extendedProperties: { private: hold.props },
      })
      return toStored(created)
    },

    async findByProp(hostId, key, value) {
      const query = new URLSearchParams({
        privateExtendedProperty: `${key}=${value}`,
        singleEvents: 'true',
        showDeleted: 'false',
        maxResults: '250',
      })
      const data = await call<{ items?: GoogleEvent[] }>(hostId, `/calendars/primary/events?${query}`, undefined, 'GET')
      return (data.items ?? []).filter(e => e.status !== 'cancelled').map(toStored)
    },

    getEvent,

    async updateEvent(hostId, id, patch, ifMatch) {
      const current = patch.props ? await getEvent(hostId, id) : null
      const body: Record<string, unknown> = {}
      if (patch.summary !== undefined) body.summary = patch.summary
      if (patch.transparent !== undefined) body.transparency = patch.transparent ? 'transparent' : 'opaque'
      if (patch.props) body.extendedProperties = { private: { ...(current?.props ?? {}), ...patch.props } }
      const updated = await call<GoogleEvent>(
        hostId,
        `${eventPath(id)}?sendUpdates=none`,
        body,
        'PATCH',
        ifMatch ? { 'if-match': ifMatch } : undefined
      )
      return toStored(updated)
    },

    async deleteEvent(hostId, id) {
      const res = await request(hostId, 'DELETE', `${eventPath(id)}?sendUpdates=none`)
      // Already gone is the outcome we wanted.
      if (res.ok || res.status === 404 || res.status === 410) return
      throw new DeliveryError(NAME, res.status, `delete event: ${await res.text()}`)
    },
  }
}

interface GoogleEvent {
  id: string
  etag?: string
  status?: string
  summary?: string
  transparency?: string
  start?: { dateTime?: string; date?: string }
  end?: { dateTime?: string; date?: string }
  extendedProperties?: { private?: Record<string, string> }
}

function toStored(e: GoogleEvent): StoredEvent {
  const when = (t?: { dateTime?: string; date?: string }) => Date.parse(t?.dateTime ?? t?.date ?? '')
  return {
    id: e.id,
    etag: e.etag,
    start: when(e.start),
    end: when(e.end),
    summary: e.summary ?? '',
    transparent: e.transparency === 'transparent',
    props: e.extendedProperties?.private ?? {},
  }
}
