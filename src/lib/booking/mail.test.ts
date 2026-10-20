import { describe, it, expect, vi, afterEach } from 'vitest'
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { allowed, createOutboxMailer, getBookingMailer, parseAllowlist, withAllowlist, type BookingMailer } from './mailer'
import { buildIcs, escapeText, fold } from './ics'
import { signLink, verifyLink } from './links'
import { NotConfiguredError } from '@/lib/integrations/ports'

afterEach(() => vi.restoreAllMocks())

const mail = (...to: string[]) => ({ to: to.map(email => ({ email })), subject: 'S', text: 'T', html: '<p>T</p>' })

function spyMailer() {
  const sent: string[][] = []
  const m: BookingMailer = {
    name: 'spy',
    async send(x) {
      sent.push(x.to.map(t => t.email))
      return { id: '1', delivered: x.to.map(t => t.email), dropped: [] }
    },
  }
  return { m, sent }
}

describe('BOOKING_TEST_ALLOWLIST', () => {
  it('parses addresses and @domains, case-insensitively', () => {
    const list = parseAllowlist(' Amir@Redigma.com, @two-otters.studio;x@y.z ')
    expect(list).toEqual(['amir@redigma.com', '@two-otters.studio', 'x@y.z'])
    expect(allowed('AMIR@redigma.com', list)).toBe(true)
    expect(allowed('keren@two-otters.studio', list)).toBe(true)
    expect(allowed('client@gmail.com', list)).toBe(false)
  })

  it('drops recipients that are not on the list', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { m, sent } = spyMailer()
    const guarded = withAllowlist(m, { NODE_ENV: 'development', BOOKING_TEST_ALLOWLIST: 'amir@redigma.com' }, { real: true })
    const r = await guarded.send(mail('amir@redigma.com', 'client@gmail.com'))
    expect(sent).toEqual([['amir@redigma.com']])
    expect(r.dropped).toEqual(['client@gmail.com'])
  })

  it('a real mailer sends to nobody outside production while the list is empty', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { m, sent } = spyMailer()
    for (const env of [{ NODE_ENV: 'development' }, { NODE_ENV: 'production', VERCEL_ENV: 'preview' }]) {
      const r = await withAllowlist(m, env, { real: true }).send(mail('amir@redigma.com'))
      expect(r.delivered).toEqual([])
    }
    expect(sent).toEqual([])
    expect(warn.mock.calls[0][1]).toMatchObject({ reason: 'BOOKING_TEST_ALLOWLIST is empty outside production' })
  })

  it('production with an empty list sends normally', async () => {
    const { m, sent } = spyMailer()
    await withAllowlist(m, { NODE_ENV: 'production', VERCEL_ENV: 'production' }, { real: true }).send(mail('client@gmail.com'))
    expect(sent).toEqual([['client@gmail.com']])
  })
})

describe('choosing the mailer', () => {
  const smtp = { SMTP_HOST: 'smtp.example', SMTP_USER: 'u', SMTP_PASS: 'p', BOOKING_FROM_EMAIL: 'amir@two-otters.studio' }

  it('never uses SMTP with the mock calendar', () => {
    expect(getBookingMailer({ NODE_ENV: 'development', ...smtp }, { mockCalendar: true }).name).toBe('outbox')
  })

  it('uses SMTP with a real calendar when SMTP is configured', () => {
    expect(getBookingMailer({ NODE_ENV: 'development', ...smtp }, { mockCalendar: false }).name).toBe('smtp')
  })

  it('falls back to the outbox in dev and refuses in production without SMTP', () => {
    expect(getBookingMailer({ NODE_ENV: 'development' }, { mockCalendar: false }).name).toBe('outbox')
    expect(() => getBookingMailer({ NODE_ENV: 'production' }, { mockCalendar: false })).toThrow(NotConfiguredError)
  })
})

describe('outbox', () => {
  it('writes the message, with its calendar part, to disk instead of sending', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {})
    const dir = mkdtempSync(join(tmpdir(), 'outbox-'))
    try {
      const ics = buildIcs({
        uid: 'x@two-otters.studio',
        start: Date.UTC(2026, 10, 2, 8, 30),
        end: Date.UTC(2026, 10, 2, 9),
        stamp: Date.UTC(2026, 10, 1),
        summary: 'שיחה',
        description: 'd',
        organizer: { email: 'amir@two-otters.studio' },
        attendees: [{ email: 'c@acme.com' }],
      })
      await createOutboxMailer({ BOOKING_OUTBOX_DIR: dir, BOOKING_FROM_EMAIL: 'amir@two-otters.studio', BOOKING_FROM_NAME: 'Amir' }).send({
        ...mail('c@acme.com'),
        ics,
      })
      const files = readdirSync(dir).sort()
      expect(files.some(f => f.endsWith('.eml'))).toBe(true)
      expect(files.some(f => f.endsWith('.ics'))).toBe(true)
      const eml = readFileSync(join(dir, files.find(f => f.endsWith('.eml'))!), 'utf8')
      expect(eml).toMatch(/^From: Amir <amir@two-otters\.studio>/m)
      expect(eml).toMatch(/Content-Type: text\/calendar; charset=utf-8; method=REQUEST/)
      expect(eml).toMatch(/filename=invite\.ics/)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('.ics', () => {
  it('escapes text and folds long lines at 75 octets without splitting a character', () => {
    expect(escapeText('a,b;c\\d\ne')).toBe('a\\,b\\;c\\\\d\\ne')
    const long = `DESCRIPTION:${'שיחת היכרות עם Two Otters '.repeat(10)}`
    const folded = fold(long)
    for (const line of folded.split('\r\n')) expect(Buffer.byteLength(line)).toBeLessThanOrEqual(75)
    expect(folded.replace(/\r\n /g, '')).toBe(long)
  })
})

describe('signed links', () => {
  const claims = { r: 'req-1', h: 'amir', a: 'approve' as const, e: 2_000 }

  it('verifies its own signature until it expires', () => {
    const t = signLink(claims, 's')
    expect(verifyLink(t, 's', 1_000)).toEqual({ ok: true, claims })
    expect(verifyLink(t, 's', 2_000)).toMatchObject({ ok: false, reason: 'expired' })
    expect(verifyLink(t, 'other', 1_000)).toMatchObject({ ok: false, reason: 'invalid' })
  })

  it('rejects any change to the claims', () => {
    const [, sig] = signLink(claims, 's').split('.')
    const forged = Buffer.from(JSON.stringify({ ...claims, e: 9_999_999 })).toString('base64url')
    expect(verifyLink(`${forged}.${sig}`, 's', 1_000)).toMatchObject({ ok: false, reason: 'invalid' })
  })
})
