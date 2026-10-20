import { timingSafeEqual } from 'node:crypto'
import { checkBotId } from 'botid/server'
import { bookingSchema } from '@/lib/forms/schemas'
import { getRecorder } from '@/lib/integrations/registry'
import { NotConfiguredError, type Env, type LeadRecorder } from '@/lib/integrations/ports'
import { BOOKING } from '@/config/booking'
import { getCalendar, type CalendarPort } from './calendar'
import { getBookingMailer, type BookingMailer } from './mailer'
import { createRequest, decide, expireRequests, inspectLink, releaseStale, type FlowDeps } from './requests'
import { computeSlots } from './slots'
import { decidePage } from './decide-page'

/**
 * The booking endpoints, built from injectable parts so the specs can run them
 * without a network — the same shape as lib/forms/handler.ts.
 *
 *   GET  /api/booking/slots     free half-hours for the next horizonDays (60)
 *   POST /api/booking/book      a visitor's request (holds + approval emails)
 *   GET  /api/booking/decide    a host's approve / decline link: a page with
 *                               one button, so mail scanners that open links
 *                               cannot approve anything
 *   POST /api/booking/decide    the button
 *   GET  /api/booking/expire    the expiry job (Authorization: Bearer CRON_SECRET)
 */

export interface BookingDeps {
  settings: typeof BOOKING
  calendar: () => CalendarPort
  /** Told whether the calendar is the mock: the mock never sends real mail. */
  mailer: (calendar: CalendarPort) => BookingMailer
  recorder: () => LeadRecorder
  botCheck: () => Promise<{ isBot: boolean }>
  now: () => number
  env: Env
}

/**
 * BOOKING_CLOCK_OFFSET_HOURS moves the clock forward outside production, so a
 * local run can watch a request expire without waiting a day.
 */
export function bookingNow(env: Env = process.env): number {
  const offset = env.NODE_ENV === 'production' ? 0 : Number(env.BOOKING_CLOCK_OFFSET_HOURS || 0)
  return Date.now() + (Number.isFinite(offset) ? offset * 3_600_000 : 0)
}

const defaults = (): BookingDeps => ({
  settings: BOOKING,
  calendar: () => getCalendar(process.env, BOOKING.hosts.map(h => h.id)),
  mailer: calendar => getBookingMailer(process.env, { mockCalendar: calendar.name === 'mock-calendar' }),
  recorder: () => getRecorder(),
  botCheck: () => checkBotId(),
  now: () => bookingNow(process.env),
  env: process.env,
})

const HONEYPOT = 'website'
const MIN = 60_000
const DAY = 24 * 60 * MIN

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { 'cache-control': 'no-store' } })

/** One request's worth of everything the flow needs, with one clock reading. */
function flow(deps: BookingDeps, request: Request): FlowDeps {
  const calendar = deps.calendar()
  let mailer: BookingMailer | undefined
  return {
    settings: deps.settings,
    calendar,
    mailer: () => (mailer ??= deps.mailer(calendar)),
    recorder: deps.recorder,
    env: deps.env,
    now: deps.now(),
    baseUrl: (deps.env.BOOKING_BASE_URL || new URL(request.url).origin).replace(/\/$/, ''),
  }
}

const isZone = (zone: string) => {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: zone })
    return true
  } catch {
    return false
  }
}

/**
 * Each host's hours are local hours ("09:00–17:00 wherever I am"), so place
 * them in the zone their calendar is set to today. If the calendar cannot say,
 * the configured zone stands: a slightly wrong window beats no page.
 */
async function withLiveZones(f: FlowDeps): Promise<FlowDeps['settings']> {
  const { settings, calendar } = f
  if (!calendar.timeZones) return settings
  let zones: Record<string, string>
  try {
    zones = await calendar.timeZones(settings.hosts.map(h => h.id))
  } catch (err) {
    console.error('[booking] could not read time zones, using config', String(err))
    return settings
  }
  return {
    ...settings,
    hosts: settings.hosts.map(h => (zones[h.id] && isZone(zones[h.id]) ? { ...h, timeZone: zones[h.id] } : h)),
  }
}

/**
 * Free slots across every host, between two instants. Also settles each host's
 * live time zone onto `f`, so the approval emails that follow speak it too.
 */
async function freeSlots(f: FlowDeps, from: number, to: number) {
  f.settings = await withLiveZones(f)
  const { settings } = f
  // Requests past their 24 hours stop blocking before we look. If that fails,
  // they keep blocking — the safe direction — so it must not stop the read.
  try {
    await releaseStale(f)
  } catch (err) {
    if (err instanceof NotConfiguredError) throw err
    console.error('[booking] could not release stale holds', String(err))
  }
  // Read a little past each edge so a meeting just outside the window still
  // pushes its buffer into it.
  const pad = settings.bufferMin * MIN
  const busy = await f.calendar.freeBusy(settings.hosts.map(h => h.id), from - pad, to + pad)
  return computeSlots({ ...settings, hosts: settings.hosts, busy, from, to, now: f.now })
}

export function createSlotsRoute(overrides: Partial<BookingDeps> = {}) {
  return async function GET(request: Request): Promise<Response> {
    const deps = { ...defaults(), ...overrides }
    try {
      const f = flow(deps, request)
      const slots = await freeSlots(f, f.now, f.now + deps.settings.horizonDays * DAY)
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

    let f: FlowDeps
    try {
      f = flow(deps, request)
      // The page may have been open for an hour. Ask the calendars again, right
      // now, whether this exact slot is still free — the client's word is not enough.
      const slots = await freeSlots(f, start - DAY, start + DAY)
      if (!slots.includes(start)) return json({ ok: false, error: 'slot_taken' }, 409)
    } catch (err) {
      return failure(err, 'availability check', data)
    }

    try {
      const outcome = await createRequest(f, {
        name: data.name,
        email: data.email,
        topic: data.topic,
        message: data.message,
        timeZone: data.timeZone,
        lang: data.lang,
        start,
      })
      if (!outcome.ok) return json({ ok: false, error: outcome.error }, 409)
      return json({
        ok: true,
        status: 'requested',
        start: new Date(outcome.record.start).toISOString(),
        end: new Date(outcome.record.end).toISOString(),
        expiresAt: new Date(outcome.expiresAt).toISOString(),
      })
    } catch (err) {
      return failure(err, 'request', data)
    }
  }
}

function failure(err: unknown, step: string, data: { name: string; email: string; start: number }) {
  if (err instanceof NotConfiguredError) return json({ ok: false, error: 'not_configured' }, 503)
  console.error(`[booking] ${step} failed`, {
    error: String(err),
    visitor: { name: data.name, email: data.email, start: new Date(data.start).toISOString() },
  })
  return json({ ok: false, error: 'send_failed' }, 502)
}

const html = (body: string, status = 200) =>
  new Response(body, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      // The token is in the URL; don't hand it to anyone the page links to.
      'referrer-policy': 'no-referrer',
      'x-robots-tag': 'noindex',
    },
  })

const STATUS: Record<string, number> = { invalid: 403, expired: 410, closed: 410 }

export function createDecideRoutes(overrides: Partial<BookingDeps> = {}) {
  async function GET(request: Request): Promise<Response> {
    const deps = { ...defaults(), ...overrides }
    const token = new URL(request.url).searchParams.get('t') ?? ''
    try {
      const f = flow(deps, request)
      const result = await inspectLink(f, token)
      return html(decidePage({ ...result, token, stage: 'confirm', settings: deps.settings }), STATUS[result.outcome] ?? 200)
    } catch (err) {
      console.error('[booking] decide page failed', String(err))
      return html(decidePage({ outcome: 'error', stage: 'confirm', settings: deps.settings }), 502)
    }
  }

  async function POST(request: Request): Promise<Response> {
    const deps = { ...defaults(), ...overrides }
    let token = ''
    try {
      const form = await request.formData()
      token = String(form.get('t') ?? '')
    } catch {
      token = new URL(request.url).searchParams.get('t') ?? ''
    }
    try {
      const f = flow(deps, request)
      const result = await decide(f, token)
      return html(decidePage({ ...result, stage: 'done', settings: deps.settings }), STATUS[result.outcome] ?? 200)
    } catch (err) {
      console.error('[booking] decide failed', String(err))
      return html(decidePage({ outcome: 'error', stage: 'done', settings: deps.settings }), 502)
    }
  }

  return { GET, POST }
}

/**
 * The expiry job. Protected by CRON_SECRET in the Authorization header — the
 * form Vercel Cron sends — and refused outright when no secret is set.
 */
export function createExpireRoute(overrides: Partial<BookingDeps> = {}) {
  return async function GET(request: Request): Promise<Response> {
    const deps = { ...defaults(), ...overrides }
    const secret = deps.env.CRON_SECRET
    if (!secret) return json({ ok: false, error: 'not_configured' }, 503)
    if (!sameSecret(request.headers.get('authorization') ?? '', `Bearer ${secret}`)) {
      return json({ ok: false, error: 'unauthorized' }, 401)
    }
    try {
      const result = await expireRequests(flow(deps, request))
      return json({ ok: true, ...result })
    } catch (err) {
      if (err instanceof NotConfiguredError) return json({ ok: false, error: 'not_configured' }, 503)
      console.error('[booking] expiry job failed', String(err))
      return json({ ok: false, error: 'failed' }, 502)
    }
  }
}

function sameSecret(given: string, expected: string) {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}
