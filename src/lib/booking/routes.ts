import { checkBotId } from 'botid/server'
import { bookingSchema, type BookingInput } from '@/lib/forms/schemas'
import { getRecorder } from '@/lib/integrations/registry'
import { withRetry } from '@/lib/integrations/retry'
import { NotConfiguredError, type Lead, type LeadRecorder } from '@/lib/integrations/ports'
import { BOOKING, type BookingHost } from '@/config/booking'
import { getCalendar, type CalendarPort } from './calendar'
import { computeSlots } from './slots'

/**
 * The two booking endpoints, built from injectable parts so the specs can run
 * them without a network — the same shape as lib/forms/handler.ts.
 *
 * Booking differs from a form in one way that changes the order: the *calendar
 * event* is the thing we must not lose, and Google's invite is the visitor's
 * confirmation. So the event comes first, and the ClickUp lead is a courtesy
 * that follows — if ClickUp is down, the call is still booked and both hosts
 * still have it in their calendars.
 */

export interface BookingDeps {
  settings: typeof BOOKING
  calendar: () => CalendarPort
  recorder: () => LeadRecorder
  botCheck: () => Promise<{ isBot: boolean }>
  now: () => number
}

const defaults = (): BookingDeps => ({
  settings: BOOKING,
  calendar: () => getCalendar(process.env, BOOKING.hosts.map(h => h.id)),
  recorder: () => getRecorder(),
  botCheck: () => checkBotId(),
  now: () => Date.now(),
})

const HONEYPOT = 'website'
const MIN = 60_000
const DAY = 24 * 60 * MIN

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { 'cache-control': 'no-store' } })

/** Free slots across every host, between two instants. */
async function freeSlots(deps: BookingDeps, from: number, to: number) {
  const { settings } = deps
  // Read a little past each edge so a meeting just outside the window still
  // pushes its buffer into it.
  const pad = settings.bufferMin * MIN
  const busy = await deps
    .calendar()
    .freeBusy(settings.hosts.map(h => h.id), from - pad, to + pad)
  return computeSlots({ ...settings, hosts: settings.hosts, busy, from, to, now: deps.now() })
}

export function createSlotsRoute(overrides: Partial<BookingDeps> = {}) {
  return async function GET(_request: Request): Promise<Response> {
    const deps = { ...defaults(), ...overrides }
    const now = deps.now()
    try {
      const slots = await freeSlots(deps, now, now + deps.settings.horizonDays * DAY)
      return json({
        ok: true,
        durationMin: deps.settings.durationMin,
        slots: slots.map(s => new Date(s).toISOString()),
      })
    } catch (err) {
      if (err instanceof NotConfiguredError) return json({ ok: false, error: 'not_configured' }, 503)
      console.error('[booking] could not read availability', String(err))
      return json({ ok: false, error: 'unavailable' }, 502)
    }
  }
}

export function createBookRoute(overrides: Partial<BookingDeps> = {}) {
  return async function POST(request: Request): Promise<Response> {
    const deps = { ...defaults(), ...overrides }
    const { settings } = deps

    let payload: Record<string, unknown>
    try {
      payload = await request.json()
    } catch {
      return json({ ok: false, error: 'bad_request' }, 400)
    }

    // Same two gates as every form, in the same order (see lib/forms/handler.ts).
    if (typeof payload[HONEYPOT] === 'string' && payload[HONEYPOT].trim()) return json({ ok: true })
    if ((await deps.botCheck()).isBot) return json({ ok: false, error: 'blocked' }, 403)

    const parsed = bookingSchema.safeParse(payload)
    if (!parsed.success) return json({ ok: false, error: parsed.error.issues[0]?.message ?? 'bad_request' }, 400)
    const data = parsed.data
    const start = data.start
    const end = start + settings.durationMin * MIN

    // The page may have been open for an hour. Ask the calendars again, right
    // now, whether this exact slot is still free — the client's word is not enough.
    try {
      const slots = await freeSlots(deps, start - DAY, start + DAY)
      if (!slots.includes(start)) return json({ ok: false, error: 'slot_taken' }, 409)
    } catch (err) {
      return failure(err, 'availability check', data)
    }

    const organizer = settings.hosts.find(h => h.id === settings.organizer) ?? settings.hosts[0]
    const invited = settings.hosts.filter(h => h.id !== organizer.id && h.email)

    let event
    try {
      event = await deps.calendar().createEvent(organizer.id, {
        start,
        end,
        summary: `Two Otters × ${data.name}`,
        description: describe(data, settings.hosts),
        attendees: [...invited.map(h => ({ email: h.email, name: h.name })), { email: data.email, name: data.name }],
      })
    } catch (err) {
      return failure(err, 'create event', data)
    }

    try {
      await withRetry(() => deps.recorder().record(toLead(data, start, event.meetUrl)))
    } catch (err) {
      // The call is booked and in both calendars; only the board entry is
      // missing. Log everything needed to add it by hand.
      console.error('[booking] lead not recorded', {
        error: String(err),
        event: event.id,
        lead: { name: data.name, email: data.email, start: new Date(start).toISOString(), topic: data.topic },
      })
    }

    return json({ ok: true, start: new Date(start).toISOString(), end: new Date(end).toISOString(), meetUrl: event.meetUrl })
  }
}

function failure(err: unknown, step: string, data: BookingInput) {
  if (err instanceof NotConfiguredError) return json({ ok: false, error: 'not_configured' }, 503)
  console.error(`[booking] ${step} failed`, {
    error: String(err),
    visitor: { name: data.name, email: data.email, start: new Date(data.start).toISOString() },
  })
  return json({ ok: false, error: 'send_failed' }, 502)
}

/** The event body both hosts see in their calendar. */
function describe(d: BookingInput, hosts: BookingHost[]) {
  return [
    `שיחת היכרות דרך two-otters.studio`,
    '',
    `שם: ${d.name}`,
    `אימייל: ${d.email}`,
    d.topic && `נושא: ${d.topic}`,
    d.message && `\n${d.message}`,
    '',
    `אזור הזמן של המבקר: ${d.timeZone || 'לא ידוע'}`,
    `מארחים: ${hosts.map(h => h.name).join(', ')}`,
  ]
    // Drops the optional lines that were skipped; keeps the deliberate blanks.
    .filter((line): line is string => typeof line === 'string')
    .join('\n')
}

function toLead(d: BookingInput, start: number, meetUrl?: string): Lead {
  const when = new Intl.DateTimeFormat('he-IL', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jerusalem',
  }).format(start)
  return {
    form: 'booking',
    title: `שיחה נקבעה - ${d.name}`,
    tags: ['booking'],
    dueDate: start,
    fields: { email: d.email, topic: d.topic || null, start: new Date(start).toISOString() },
    rows: (
      [
        ['שם', d.name],
        ['אימייל', d.email],
        ['מועד (שעון ישראל)', when],
        ['נושא', d.topic],
        ['הודעה', d.message],
        ['אזור הזמן של המבקר', d.timeZone],
        ['Meet', meetUrl ?? ''],
      ] as [string, string][]
    ).filter(([, v]) => Boolean(v)),
    replyTo: { email: d.email, name: d.name },
  }
}
