import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createBookRoute, createSlotsRoute, type BookingDeps } from './routes'
import type { CalendarPort } from './calendar'
import type { BookingMailer } from './mailer'
import type { LeadRecorder } from '@/lib/integrations/ports'
import { DeliveryError, NotConfiguredError } from '@/lib/integrations/ports'

const sunToThu = Object.fromEntries([0, 1, 2, 3, 4].map(d => [d, [['09:00', '17:00']]]))

const settings: BookingDeps['settings'] = {
  durationMin: 30,
  bufferMin: 0,
  minNoticeHours: 0,
  horizonDays: 30,
  holdHours: 24,
  organizer: 'amir',
  hosts: [
    { id: 'amir', name: 'Amir', email: 'amir@two-otters.studio', timeZone: 'Europe/Berlin', hours: sunToThu },
    { id: 'keren', name: 'Keren', email: 'keren@two-otters.studio', timeZone: 'Asia/Bangkok', hours: sunToThu },
  ],
}

// Sunday 1 November 2026, midnight UTC. The two hosts overlap 08:00–10:00 UTC.
const NOW = Date.UTC(2026, 10, 1)
const FREE_SLOT = '2026-11-02T08:00:00.000Z'

/** A calendar that remembers nothing: every method is a spy. */
function stubCalendar(overrides: Partial<CalendarPort> = {}) {
  let n = 0
  return {
    name: 'stub',
    configured: () => true,
    freeBusy: vi.fn(async () => ({})),
    createEvent: vi.fn(async () => ({ id: 'evt-1', meetUrl: 'https://meet.google.com/abc' })),
    createHold: vi.fn(async (_host: string, hold: { start: number; end: number; summary: string; props: Record<string, string> }) => ({
      id: `hold-${++n}`,
      etag: '"1"',
      start: hold.start,
      end: hold.end,
      summary: hold.summary,
      transparent: false,
      props: hold.props,
    })),
    findByProp: vi.fn(async () => []),
    getEvent: vi.fn(async () => null),
    updateEvent: vi.fn(async (_h: string, id: string) => ({ id, start: 0, end: 0, summary: '', transparent: false, props: {} })),
    deleteEvent: vi.fn(async () => {}),
    ...overrides,
  } as unknown as CalendarPort & Record<'freeBusy' | 'createEvent' | 'createHold' | 'deleteEvent' | 'findByProp', ReturnType<typeof vi.fn>>
}

function stubRecorder(overrides: Partial<LeadRecorder> = {}) {
  return {
    name: 'stub',
    configured: () => true,
    record: vi.fn(async () => ({ id: 'lead-1' })),
    ...overrides,
  } as LeadRecorder & { record: ReturnType<typeof vi.fn> }
}

function stubMailer() {
  return {
    name: 'stub',
    send: vi.fn(async (m: { to: { email: string }[] }) => ({ id: 'm', delivered: m.to.map(t => t.email), dropped: [] })),
  } as BookingMailer & { send: ReturnType<typeof vi.fn> }
}

let calendar: ReturnType<typeof stubCalendar>
let recorder: ReturnType<typeof stubRecorder>
let mailer: ReturnType<typeof stubMailer>

beforeEach(() => {
  calendar = stubCalendar()
  recorder = stubRecorder()
  mailer = stubMailer()
})

const deps = (extra: Partial<BookingDeps> = {}): BookingDeps => ({
  settings,
  calendar: () => calendar,
  mailer: () => mailer,
  recorder: () => recorder,
  botCheck: async () => ({ isBot: false }),
  now: () => NOW,
  env: { NODE_ENV: 'test', BOOKING_LINK_SECRET: 'test-secret' },
  ...extra,
})

const book = (payload: unknown, extra?: Partial<BookingDeps>) =>
  createBookRoute(deps(extra))(
    new Request('http://localhost/api/booking/book', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
  )

const valid = { name: 'דנה', email: 'dana@acme.com', topic: 'פרויקט חדש', start: FREE_SLOT, timeZone: 'Asia/Jerusalem' }

describe('GET /api/booking/slots', () => {
  it('offers only the slots both hosts are free for', async () => {
    calendar.freeBusy.mockResolvedValue({
      keren: [{ start: Date.parse('2026-11-02T08:30:00Z'), end: Date.parse('2026-11-02T09:00:00Z') }],
    })
    const res = await createSlotsRoute(deps())(new Request('http://localhost/api/booking/slots'))
    const body = await res.json()
    expect(res.status).toBe(200)
    expect(body.slots).toContain(FREE_SLOT)
    expect(body.slots).not.toContain('2026-11-02T08:30:00.000Z')
    expect(body.durationMin).toBe(30)
  })

  // Amir in Berlin (UTC+1 in November) overlaps Keren in Bangkok from 08:00 UTC;
  // Amir in Jerusalem (UTC+2) starts an hour earlier, at 07:00 UTC.
  const SEVEN_UTC = '2026-11-02T07:00:00.000Z'
  const slotsWith = async (timeZones?: CalendarPort['timeZones']) => {
    const live = stubCalendar(timeZones ? { timeZones } : {})
    const res = await createSlotsRoute(deps({ calendar: () => live }))(new Request('http://localhost/api/booking/slots'))
    return (await res.json()).slots as string[]
  }

  it('places each host’s hours in the time zone their own calendar is set to now', async () => {
    const slots = await slotsWith(async () => ({ amir: 'Asia/Jerusalem' }))
    expect(slots).toContain(SEVEN_UTC)
  })

  it('falls back to the configured time zone when the calendar cannot say', async () => {
    expect(await slotsWith(async () => { throw new Error('down') })).not.toContain(SEVEN_UTC)
    expect(await slotsWith(async () => ({ amir: 'Not/AZone' }))).not.toContain(SEVEN_UTC)
    expect(await slotsWith()).not.toContain(SEVEN_UTC)
  })

  it('asks every host’s calendar, not just the organizer’s', async () => {
    await createSlotsRoute(deps())(new Request('http://localhost/api/booking/slots'))
    expect(calendar.freeBusy.mock.calls[0][0]).toEqual(['amir', 'keren'])
  })

  it('answers not_configured when the calendars are not connected', async () => {
    calendar.freeBusy.mockRejectedValue(new NotConfiguredError('google-calendar'))
    const res = await createSlotsRoute(deps())(new Request('http://localhost/api/booking/slots'))
    expect(res.status).toBe(503)
    expect((await res.json()).error).toBe('not_configured')
  })

  it('offers nothing when one calendar cannot be read, rather than treating it as free', async () => {
    calendar.freeBusy.mockRejectedValue(new DeliveryError('google-calendar', null, 'freeBusy for keren: notFound'))
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await createSlotsRoute(deps())(new Request('http://localhost/api/booking/slots'))
    expect(res.status).toBe(502)
    expect((await res.json()).error).toBe('unavailable')
    err.mockRestore()
  })
})

describe('POST /api/booking/book (a request, not a booking)', () => {
  it('holds the slot in every host’s own calendar, with no attendees, and creates no meeting', async () => {
    const res = await book(valid)
    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({ ok: true, status: 'requested', start: FREE_SLOT })

    expect(calendar.createHold.mock.calls.map(c => c[0]).sort()).toEqual(['amir', 'keren'])
    for (const [, hold] of calendar.createHold.mock.calls) {
      expect(hold.end - hold.start).toBe(30 * 60_000)
      expect(hold).not.toHaveProperty('attendees')
    }
    expect(calendar.createEvent).not.toHaveBeenCalled()
  })

  it('emails each host their own approve and decline links', async () => {
    await book(valid)
    const to = mailer.send.mock.calls.map(c => c[0].to[0].email)
    expect(to).toEqual(['amir@two-otters.studio', 'keren@two-otters.studio'])
    const [amirMail, kerenMail] = mailer.send.mock.calls.map(c => c[0].text as string)
    expect(amirMail).toMatch(/\/api\/booking\/decide\?t=/)
    expect(amirMail).not.toEqual(kerenMail)
  })

  it('takes host addresses from BOOKING_HOST_EMAIL_<HOST> over the config', async () => {
    await book(valid, { env: { NODE_ENV: 'test', BOOKING_HOST_EMAIL_KEREN: 'keren@methodqueen.com' } })
    expect(mailer.send.mock.calls.map(c => c[0].to[0].email)).toContain('keren@methodqueen.com')
  })

  it('records the request as a lead tagged booking-request', async () => {
    await book(valid)
    const lead = recorder.record.mock.calls[0][0]
    expect(lead.tags).toEqual(['booking-request'])
    expect(lead.replyTo).toEqual({ email: 'dana@acme.com', name: 'דנה' })
  })

  it('refuses a slot that has been taken since the page loaded', async () => {
    calendar.freeBusy.mockResolvedValue({
      amir: [{ start: Date.parse(FREE_SLOT), end: Date.parse(FREE_SLOT) + 30 * 60_000 }],
    })
    const res = await book(valid)
    expect(res.status).toBe(409)
    expect((await res.json()).error).toBe('slot_taken')
    expect(calendar.createHold).not.toHaveBeenCalled()
  })

  it('refuses a time that was never a slot', async () => {
    const res = await book({ ...valid, start: '2026-11-02T08:10:00.000Z' })
    expect((await res.json()).error).toBe('slot_taken')
  })

  it('still accepts the request when only the lead could not be recorded', async () => {
    recorder.record.mockRejectedValue(new DeliveryError('clickup', 500, 'down'))
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await book(valid)
    expect(res.status).toBe(200)
    expect(err).toHaveBeenCalled()
    err.mockRestore()
  })

  it('answers send_failed and leaves no holds behind when a calendar refuses the hold', async () => {
    let calls = 0
    calendar.createHold.mockImplementation(async (_h: string, hold: { start: number; end: number; props: Record<string, string> }) => {
      if (++calls === 2) throw new DeliveryError('google-calendar', 500, 'boom')
      return { id: 'hold-1', etag: '"1"', start: hold.start, end: hold.end, summary: '', transparent: false, props: hold.props }
    })
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await book(valid)
    expect(res.status).toBe(502)
    expect((await res.json()).error).toBe('send_failed')
    expect(calendar.deleteEvent).toHaveBeenCalledWith('keren', 'hold-1')
    expect(mailer.send).not.toHaveBeenCalled()
    expect(recorder.record).not.toHaveBeenCalled()
    err.mockRestore()
  })

  it('backs out (holds removed) when the approval emails cannot be sent', async () => {
    mailer.send.mockRejectedValue(new DeliveryError('smtp', 535, 'auth'))
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await book(valid)
    expect(res.status).toBe(502)
    expect(calendar.deleteEvent).toHaveBeenCalledTimes(2)
    err.mockRestore()
  })

  it('answers a filled honeypot as if it worked, and holds nothing', async () => {
    const res = await book({ ...valid, website: 'spam.example' })
    expect(await res.json()).toMatchObject({ ok: true })
    expect(calendar.createHold).not.toHaveBeenCalled()
  })

  it('tells a visitor BotID flagged that they were blocked', async () => {
    const res = await book(valid, { botCheck: async () => ({ isBot: true }) })
    expect(res.status).toBe(403)
    expect((await res.json()).error).toBe('blocked')
  })

  it('returns the first validation code for a bad email', async () => {
    const res = await book({ ...valid, email: 'not-an-email' })
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('invalid_email')
  })
})
