import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createBookRoute, createDecideRoutes, createExpireRoute, createSlotsRoute, type BookingDeps } from './routes'
import { createMockCalendar } from './mock'
import { createRequest, type FlowDeps } from './requests'
import { withAllowlist, type BookingMail, type BookingMailer } from './mailer'
import type { LeadRecorder } from '@/lib/integrations/ports'

/**
 * The whole request → approve → meeting flow, end to end, against the mock
 * calendar (a JSON file per test) and a mailer that keeps what it was given.
 */

const sunToThu = Object.fromEntries([0, 1, 2, 3, 4].map(d => [d, [['09:00', '17:00']]]))
const settings: BookingDeps['settings'] = {
  durationMin: 30,
  bufferMin: 0,
  minNoticeHours: 0,
  horizonDays: 30,
  holdHours: 24,
  organizer: 'amir',
  hosts: [
    { id: 'amir', name: 'Amir Shalev', nameHe: 'אמיר', email: '', timeZone: 'Europe/Berlin', hours: sunToThu },
    { id: 'keren', name: 'Keren Rightler', nameHe: 'קרן', email: '', timeZone: 'Asia/Bangkok', hours: sunToThu },
  ],
}

const HOUR = 3_600_000
const NOW = Date.UTC(2026, 10, 1) // Sunday 1 Nov 2026, 00:00 UTC
// Overlap is 08:00–10:00 UTC; the mock keeps Keren busy 08:00–08:30 and 09:30–10:00.
const SLOT = '2026-11-02T08:30:00.000Z'

let dir: string
let clock: number
let sent: BookingMail[]
let env: Record<string, string>
let recorder: LeadRecorder & { record: ReturnType<typeof vi.fn> }

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'booking-flow-'))
  clock = NOW
  sent = []
  env = {
    NODE_ENV: 'test',
    BOOKING_MOCK_STORE: join(dir, 'mock.json'),
    BOOKING_HOST_EMAIL_AMIR: 'amir@redigma.test',
    BOOKING_HOST_EMAIL_KEREN: 'keren@methodqueen.test',
    BOOKING_FROM_EMAIL: 'amir@two-otters.studio',
    BOOKING_FROM_NAME: 'Amir Shalev · Two Otters',
    BOOKING_LINK_SECRET: 'test-link-secret',
    CRON_SECRET: 'test-cron-secret',
  }
  recorder = { name: 'stub', configured: () => true, record: vi.fn(async () => ({ id: 'lead' })) }
  vi.spyOn(console, 'info').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  rmSync(dir, { recursive: true, force: true })
})

const capture: BookingMailer = {
  name: 'capture',
  async send(mail) {
    sent.push(mail)
    return { id: String(sent.length), delivered: mail.to.map(t => t.email), dropped: [] }
  },
}

const deps = (): BookingDeps => ({
  settings,
  calendar: () => createMockCalendar(env),
  mailer: () => withAllowlist(capture, env, { real: false }),
  recorder: () => recorder,
  botCheck: async () => ({ isBot: false }),
  now: () => clock,
  env,
})

const calendar = () => createMockCalendar(env)
const store = () => JSON.parse(readFileSync(env.BOOKING_MOCK_STORE, 'utf8')) as { events: { hostId: string; description: string; props: Record<string, string>; attendees: { email: string }[]; transparent: boolean; start: number }[] }

async function request(start = SLOT, email = 'dana@acme.com') {
  const res = await createBookRoute(deps())(
    new Request('http://localhost:3002/api/booking/book', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'דנה כהן', email, topic: 'אתר חדש', message: 'שלום', start, timeZone: 'Asia/Jerusalem', lang: 'he' }),
    })
  )
  return { res, body: await res.json() }
}

/** The approve / decline links from the approval email sent to `to`. */
function links(to: string) {
  const mail = sent.find(m => m.to[0].email === to && m.text.includes('/api/booking/decide'))!
  const token = (label: string) => new URL(mail.text.match(new RegExp(`${label}: (\\S+)`))![1]).searchParams.get('t')!
  return { approve: token('לאשר'), decline: token('לדחות') }
}

async function click(token: string) {
  const form = new FormData()
  form.set('t', token)
  const res = await createDecideRoutes(deps()).POST(new Request('http://localhost:3002/api/booking/decide', { method: 'POST', body: form }))
  return { status: res.status, html: await res.text() }
}

async function slots() {
  const res = await createSlotsRoute(deps())(new Request('http://localhost:3002/api/booking/slots'))
  return (await res.json()).slots as string[]
}

/** Just enough RFC 5545 to check what we wrote: unfold, then KEY;PARAMS:VALUE. */
function parseIcs(ics: string) {
  expect(ics.endsWith('\r\n')).toBe(true)
  const physical = ics.split('\r\n').filter(Boolean)
  for (const line of physical) expect(Buffer.byteLength(line, 'utf8')).toBeLessThanOrEqual(75)
  const lines = ics.replace(/\r\n[ \t]/g, '').split('\r\n').filter(Boolean)
  return lines.map(l => {
    const i = l.search(/[:]/)
    const [name, ...params] = l.slice(0, i).split(';')
    return { name, params, value: l.slice(i + 1) }
  })
}

describe('request → both approve → meeting', () => {
  it('creates one meeting in Amir’s calendar with Keren invited, and emails the visitor an .ics', async () => {
    const { res, body } = await request()
    expect(res.status).toBe(200)
    expect(body.status).toBe('requested')

    // Two private holds, one per calendar, nobody invited; the slot is gone.
    const holds = store().events.filter(e => e.props.twoOtters === 'hold')
    expect(holds.map(h => h.hostId).sort()).toEqual(['amir', 'keren'])
    expect(holds.every(h => h.attendees.length === 0)).toBe(true)
    expect(await slots()).not.toContain(SLOT)
    expect(sent.map(m => m.to[0].email)).toEqual(['amir@redigma.test', 'keren@methodqueen.test'])
    expect(recorder.record.mock.calls[0][0].tags).toEqual(['booking-request'])

    const amir = links('amir@redigma.test')
    const keren = links('keren@methodqueen.test')

    const first = await click(amir.approve)
    expect(first.html).toContain('אישרת, תודה')
    expect(first.html).toContain('קרן')
    expect(store().events.some(e => e.props.twoOtters === 'event')).toBe(false)

    const second = await click(keren.approve)
    expect(second.html).toContain('השיחה נקבעה')

    const events = store().events
    expect(events.filter(e => e.props.twoOtters === 'hold')).toHaveLength(0)
    const meetings = events.filter(e => e.props.twoOtters === 'event')
    expect(meetings).toHaveLength(1)
    expect(meetings[0].hostId).toBe('amir')
    expect(meetings[0].attendees.map(a => a.email)).toEqual(['keren@methodqueen.test'])
    expect(await slots()).not.toContain(SLOT)

    const invite = sent.find(m => m.to[0].email === 'dana@acme.com')!
    expect(invite.subject).toContain('נקבע')
    expect(invite.ics).toBeDefined()
    const props = parseIcs(invite.ics!)
    const get = (n: string) => props.find(p => p.name === n)
    expect(get('METHOD')?.value).toBe('REQUEST')
    expect(get('DTSTART')?.value).toBe('20261102T083000Z')
    expect(get('DTEND')?.value).toBe('20261102T090000Z')
    expect(get('ORGANIZER')?.value).toBe('mailto:amir@two-otters.studio')
    expect(get('ORGANIZER')?.params).toContain('CN="Amir Shalev · Two Otters"')
    const attendees = props.filter(p => p.name === 'ATTENDEE')
    expect(attendees.map(a => a.value)).toEqual(['mailto:dana@acme.com'])
    expect(get('LOCATION')?.value).toMatch(/^https:\/\/meet\.google\.com\//)
    expect(get('DESCRIPTION')?.value).toContain('אמיר וקרן')
    expect(meetings[0].description).toContain('Keren Rightler')
    expect(props.filter(p => p.name === 'BEGIN').map(p => p.value)).toEqual(['VCALENDAR', 'VEVENT', 'VALARM'])
  })

  it('creates nothing while only one founder has approved', async () => {
    await request()
    const r = await click(links('keren@methodqueen.test').approve)
    expect(r.html).toContain('אמיר')
    expect(store().events.filter(e => e.props.twoOtters === 'event')).toHaveLength(0)
    expect(sent.some(m => m.to[0].email === 'dana@acme.com')).toBe(false)
  })

  it('is safe to click twice, before and after the meeting exists', async () => {
    await request()
    const amir = links('amir@redigma.test')
    await click(amir.approve)
    expect((await click(amir.approve)).html).toContain('כבר אישרת')
    await click(links('keren@methodqueen.test').approve)
    expect((await click(amir.approve)).html).toContain('השיחה כבר נקבעה')
    expect((await click(links('keren@methodqueen.test').approve)).html).toContain('השיחה כבר נקבעה')
    expect(store().events.filter(e => e.props.twoOtters === 'event')).toHaveLength(1)
    expect(sent.filter(m => m.to[0].email === 'dana@acme.com')).toHaveLength(1)
  })

  it('opening a link only shows a confirmation page; it decides nothing', async () => {
    await request()
    const { approve } = links('amir@redigma.test')
    const res = await createDecideRoutes(deps()).GET(new Request(`http://localhost:3002/api/booking/decide?t=${approve}`))
    const html = await res.text()
    expect(res.status).toBe(200)
    expect(html).toContain('לאשר את השיחה?')
    expect(html).toContain('<form method="post"')
    expect(res.headers.get('referrer-policy')).toBe('no-referrer')
    const hold = store().events.find(e => e.props.primary === '1')!
    expect(JSON.parse(hold.props.approvals)).toEqual({})
  })
})

describe('decline', () => {
  it('releases both holds, emails the visitor, and closes the other links', async () => {
    await request()
    await click(links('amir@redigma.test').approve)
    const r = await click(links('keren@methodqueen.test').decline)
    expect(r.html).toContain('הבקשה נדחתה')
    expect(store().events).toHaveLength(0)
    expect(await slots()).toContain(SLOT)
    const mail = sent.find(m => m.to[0].email === 'dana@acme.com')!
    expect(mail.subject).toContain('בקשת השיחה')
    expect(mail.ics).toBeUndefined()

    const late = await click(links('keren@methodqueen.test').approve)
    expect(late.status).toBe(410)
    expect(late.html).toContain('כבר לא פתוחה')
  })
})

describe('tampered and foreign links', () => {
  it('rejects a changed payload, a changed signature, and another secret', async () => {
    await request()
    const { approve } = links('amir@redigma.test')
    const [payload, sig] = approve.split('.')
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString())
    const forged = Buffer.from(JSON.stringify({ ...claims, h: 'keren' })).toString('base64url')
    for (const token of [`${forged}.${sig}`, `${payload}.${sig.slice(0, -2)}xx`, `${payload}`, 'garbage']) {
      const r = await click(token)
      expect(r.status).toBe(403)
      expect(r.html).toContain('הקישור לא תקין')
    }
    env.BOOKING_LINK_SECRET = 'another-secret'
    expect((await click(approve)).status).toBe(403)
    const hold = store().events.find(e => e.props.primary === '1')!
    expect(JSON.parse(hold.props.approvals)).toEqual({})
  })
})

describe('expiry (clock moved 24 hours)', () => {
  it('kills the links, frees the slot, and the job emails the visitor and removes the holds', async () => {
    await request()
    const amir = links('amir@redigma.test')
    await click(amir.approve)

    clock = NOW + 24 * HOUR + 60_000
    const late = await click(links('keren@methodqueen.test').approve)
    expect(late.status).toBe(410)
    expect(late.html).toContain('הבקשה פגה')
    expect(store().events.filter(e => e.props.twoOtters === 'event')).toHaveLength(0)

    // Reading availability releases the holds (transparent) before anything is emailed.
    expect(await slots()).toContain(SLOT)
    expect(store().events.filter(e => e.props.twoOtters === 'hold').every(e => e.transparent)).toBe(true)
    expect(sent.some(m => m.to[0].email === 'dana@acme.com')).toBe(false)

    const expire = createExpireRoute(deps())
    expect((await expire(new Request('http://localhost:3002/api/booking/expire'))).status).toBe(401)
    expect((await expire(new Request('http://localhost:3002/api/booking/expire', { headers: { authorization: 'Bearer wrong' } }))).status).toBe(401)
    const ok = await expire(new Request('http://localhost:3002/api/booking/expire', { headers: { authorization: 'Bearer test-cron-secret' } }))
    expect(await ok.json()).toEqual({ ok: true, released: 0, notified: 1 })
    expect(store().events).toHaveLength(0)
    const mail = sent.find(m => m.to[0].email === 'dana@acme.com')!
    expect(mail.subject).toContain('פגה')
    expect(mail.text).toContain('http://localhost:3002/schedule-a-call')

    // Nothing left to do on a second run.
    const again = await expire(new Request('http://localhost:3002/api/booking/expire', { headers: { authorization: 'Bearer test-cron-secret' } }))
    expect(await again.json()).toEqual({ ok: true, released: 0, notified: 0 })
  })

  it('the job releases and notifies in one go when nobody read availability in between', async () => {
    await request()
    clock = NOW + 25 * HOUR
    const ok = await createExpireRoute(deps())(
      new Request('http://localhost:3002/api/booking/expire', { headers: { authorization: 'Bearer test-cron-secret' } })
    )
    expect(await ok.json()).toEqual({ ok: true, released: 1, notified: 1 })
  })

  it('refuses to run at all without a CRON_SECRET', async () => {
    delete env.CRON_SECRET
    const res = await createExpireRoute(deps())(new Request('http://localhost:3002/api/booking/expire', { headers: { authorization: 'Bearer ' } }))
    expect(res.status).toBe(503)
  })
})

describe('two visitors, one slot', () => {
  it('the slot is not offered once requested, and a simultaneous second request backs out', async () => {
    await request()
    const second = await request(SLOT, 'other@acme.com')
    expect(second.res.status).toBe(409)
    expect(second.body.error).toBe('slot_taken')

    // Both passed the availability check at the same instant: the later one yields.
    const f = (): FlowDeps => ({
      settings,
      calendar: calendar(),
      mailer: () => capture,
      recorder: () => recorder,
      env,
      now: clock,
      baseUrl: 'http://localhost:3002',
    })
    const slot2 = Date.parse('2026-11-02T09:00:00.000Z')
    const base = { name: 'א', email: 'a@acme.com', topic: '', message: '', timeZone: '', lang: 'he' as const, start: slot2 }
    const a = await createRequest(f(), base)
    clock += 1000
    const b = await createRequest(f(), { ...base, email: 'b@acme.com' })
    expect(a.ok).toBe(true)
    expect(b).toEqual({ ok: false, error: 'slot_taken' })
    expect(store().events.filter(e => e.start === slot2)).toHaveLength(2) // a's two holds only
  })
})

describe('BOOKING_TEST_ALLOWLIST', () => {
  it('drops mail to anyone not on it, and the flow still completes', async () => {
    env.BOOKING_TEST_ALLOWLIST = 'amir@redigma.test'
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await request()
    expect(sent.map(m => m.to[0].email)).toEqual(['amir@redigma.test'])
    expect(warn).toHaveBeenCalledWith('[booking] mail dropped', expect.objectContaining({ dropped: ['keren@methodqueen.test'] }))
  })
})
