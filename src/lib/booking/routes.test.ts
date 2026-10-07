import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createBookRoute, createSlotsRoute, type BookingDeps } from './routes'
import type { CalendarPort } from './calendar'
import type { LeadRecorder } from '@/lib/integrations/ports'
import { DeliveryError, NotConfiguredError } from '@/lib/integrations/ports'

const sunToThu = Object.fromEntries([0, 1, 2, 3, 4].map(d => [d, [['09:00', '17:00']]]))

const settings: BookingDeps['settings'] = {
  durationMin: 30,
  bufferMin: 0,
  minNoticeHours: 0,
  horizonDays: 30,
  organizer: 'amir',
  hosts: [
    { id: 'amir', name: 'Amir', email: 'amir@two-otters.studio', timeZone: 'Europe/Berlin', hours: sunToThu },
    { id: 'keren', name: 'Keren', email: 'keren@two-otters.studio', timeZone: 'Asia/Bangkok', hours: sunToThu },
  ],
}

// Sunday 1 November 2026, midnight UTC. The two hosts overlap 08:00–10:00 UTC.
const NOW = Date.UTC(2026, 10, 1)
const FREE_SLOT = '2026-11-02T08:00:00.000Z'

function stubCalendar(overrides: Partial<CalendarPort> = {}) {
  return {
    name: 'stub',
    configured: () => true,
    freeBusy: vi.fn(async () => ({})),
    createEvent: vi.fn(async () => ({ id: 'evt-1', meetUrl: 'https://meet.google.com/abc' })),
    ...overrides,
  } as CalendarPort & { freeBusy: ReturnType<typeof vi.fn>; createEvent: ReturnType<typeof vi.fn> }
}

function stubRecorder(overrides: Partial<LeadRecorder> = {}) {
  return {
    name: 'stub',
    configured: () => true,
    record: vi.fn(async () => ({ id: 'lead-1' })),
    ...overrides,
  } as LeadRecorder & { record: ReturnType<typeof vi.fn> }
}

let calendar: ReturnType<typeof stubCalendar>
let recorder: ReturnType<typeof stubRecorder>

beforeEach(() => {
  calendar = stubCalendar()
  recorder = stubRecorder()
})

const deps = (extra: Partial<BookingDeps> = {}): BookingDeps => ({
  settings,
  calendar: () => calendar,
  recorder: () => recorder,
  botCheck: async () => ({ isBot: false }),
  now: () => NOW,
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
})

describe('POST /api/booking/book', () => {
  it('creates the event in the organizer’s calendar and invites the other host and the visitor', async () => {
    const res = await book(valid)
    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({ ok: true, start: FREE_SLOT, meetUrl: 'https://meet.google.com/abc' })

    const [organizer, event] = calendar.createEvent.mock.calls[0]
    expect(organizer).toBe('amir')
    expect(event.end - event.start).toBe(30 * 60_000)
    expect(event.attendees.map((a: { email: string }) => a.email)).toEqual(['keren@two-otters.studio', 'dana@acme.com'])
  })

  it('records the booking as a lead tagged booking', async () => {
    await book(valid)
    const lead = recorder.record.mock.calls[0][0]
    expect(lead.tags).toEqual(['booking'])
    expect(lead.replyTo).toEqual({ email: 'dana@acme.com', name: 'דנה' })
  })

  it('refuses a slot that has been taken since the page loaded', async () => {
    calendar.freeBusy.mockResolvedValue({
      amir: [{ start: Date.parse(FREE_SLOT), end: Date.parse(FREE_SLOT) + 30 * 60_000 }],
    })
    const res = await book(valid)
    expect(res.status).toBe(409)
    expect((await res.json()).error).toBe('slot_taken')
    expect(calendar.createEvent).not.toHaveBeenCalled()
  })

  it('refuses a time that was never a slot', async () => {
    const res = await book({ ...valid, start: '2026-11-02T08:10:00.000Z' })
    expect((await res.json()).error).toBe('slot_taken')
  })

  it('still confirms the booking when only the lead could not be recorded', async () => {
    recorder.record.mockRejectedValue(new DeliveryError('clickup', 500, 'down'))
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await book(valid)
    expect(res.status).toBe(200)
    expect(err).toHaveBeenCalled()
    err.mockRestore()
  })

  it('answers send_failed when the calendar refuses the event', async () => {
    calendar.createEvent.mockRejectedValue(new DeliveryError('google-calendar', 500, 'boom'))
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await book(valid)
    expect(res.status).toBe(502)
    expect((await res.json()).error).toBe('send_failed')
    expect(recorder.record).not.toHaveBeenCalled()
    err.mockRestore()
  })

  it('answers a filled honeypot as if it worked, and books nothing', async () => {
    const res = await book({ ...valid, website: 'spam.example' })
    expect(await res.json()).toMatchObject({ ok: true })
    expect(calendar.createEvent).not.toHaveBeenCalled()
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
