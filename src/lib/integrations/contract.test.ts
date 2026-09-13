import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { allMailers, allRecorders, getMailer, getRecorder } from './registry'
import type { Lead, OutboundMail } from './ports'

/**
 * The contract every adapter must satisfy.
 *
 * This is what makes "swap the provider" a fact rather than a promise: a new
 * recorder or mailer proves itself against the port here, not against a
 * reviewer's attention.
 *
 * Structural invariants run over *every* registered adapter. Behavioural ones
 * run over the adapters that can work offline; adapters that talk to a network
 * prove their behaviour in their own spec, against a fake `fetch`.
 */

const lead: Lead = {
  form: 'audit-request',
  title: 'בקשת אודיט - acme.com',
  tags: ['audit'],
  dueDate: Date.UTC(2026, 0, 15),
  fields: { email: 'dana@acme.com', company: 'acme.com', marketingOptIn: false },
  rows: [['אתר לבדיקה', 'acme.com'], ['שם', 'דנה']],
  replyTo: { email: 'dana@acme.com', name: 'דנה' },
}

const mail: OutboundMail = {
  to: { email: 'dana@acme.com', name: 'דנה' },
  template: 'audit-confirm',
  params: { firstName: 'דנה', host: 'acme.com' },
}

describe.each(Object.keys(allRecorders))('LeadRecorder contract: %s', name => {
  const recorder = allRecorders[name]({ env: {} })

  it('names itself, and the name is the key it is registered under', () => {
    expect(recorder.name).toBe(name)
  })

  it('answers configured() without throwing on an empty environment', () => {
    expect(typeof recorder.configured()).toBe('boolean')
  })

  it('either implements annotate or omits it entirely, never a non-function', () => {
    expect(recorder.annotate === undefined || typeof recorder.annotate === 'function').toBe(true)
  })

  it('exposes record as a function', () => {
    expect(typeof recorder.record).toBe('function')
  })
})

describe.each(Object.keys(allMailers))('Mailer contract: %s', name => {
  const mailer = allMailers[name]({ env: {} })

  it('names itself, and the name is the key it is registered under', () => {
    expect(mailer.name).toBe(name)
  })

  it('answers configured() without throwing on an empty environment', () => {
    expect(typeof mailer.configured()).toBe('boolean')
  })

  it('exposes send as a function', () => {
    expect(typeof mailer.send).toBe('function')
  })
})

describe('the console adapters, which every contributor runs by default', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {})
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('records a lead and returns a ref carrying an id', async () => {
    const ref = await allRecorders.console({ env: {} }).record(lead)
    expect(ref.id).toBeTruthy()
  })

  it('reports itself configured with no credentials at all', () => {
    expect(allRecorders.console({ env: {} }).configured()).toBe(true)
  })

  it('sends and returns a message id', async () => {
    const result = await allMailers.console({ env: {} }).send(mail)
    expect(result.id).toBeTruthy()
  })
})

describe('choosing an adapter', () => {
  it('uses the name in the environment', () => {
    expect(getRecorder({ LEAD_RECORDER: 'console' }).name).toBe('console')
    expect(getMailer({ MAILER: 'console' }).name).toBe('console')
  })

  it('defaults to clickup, and to the group mailer whose automation sends the mail', () => {
    expect(getRecorder({ CLICKUP_TOKEN: 't', CLICKUP_LIST_LEADS: '1' }).name).toBe('clickup')
    expect(getMailer({ BREVO_API_KEY: 'k' }).name).toBe('brevo-group')
  })

  it('swaps to direct transactional sending on one env var', () => {
    const mailer = getMailer({ MAILER: 'brevo-transactional', BREVO_API_KEY: 'k', BREVO_SENDER_EMAIL: 'a@b.co' })
    expect(mailer.name).toBe('brevo-transactional')
  })

  it('falls back to the console adapter outside production when nothing is configured', () => {
    expect(getRecorder({ NODE_ENV: 'development' }).name).toBe('console')
    expect(getMailer({ NODE_ENV: 'development' }).name).toBe('console')
  })

  it('does not quietly fall back in production — a misconfigured deploy should be loud', () => {
    expect(getRecorder({ NODE_ENV: 'production' }).name).toBe('clickup')
    expect(getMailer({ NODE_ENV: 'production' }).name).toBe('brevo-group')
  })

  it('refuses a name nobody registered rather than guessing', () => {
    expect(() => getRecorder({ LEAD_RECORDER: 'telepathy' })).toThrow(/telepathy/)
  })
})

describe('the guard that keeps a mailer pointed outward', () => {
  const visitor = { email: 'dana@acme.com' }

  it('refuses to mail the studio itself, whatever the adapter', async () => {
    const mailer = getMailer({ MAILER: 'console' })
    await expect(mailer.send({ ...mail, to: { email: 'hello@two-otters.studio' } })).rejects.toThrow(
      /visitors only/
    )
  })

  it('refuses a subdomain of an internal domain too', async () => {
    const mailer = getMailer({ MAILER: 'console' })
    await expect(mailer.send({ ...mail, to: { email: 'x@mail.two-otters.studio' } })).rejects.toThrow(
      /visitors only/
    )
  })

  it('lets a visitor through', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {})
    const mailer = getMailer({ MAILER: 'console' })
    await expect(mailer.send({ ...mail, to: visitor })).resolves.toHaveProperty('id')
    vi.restoreAllMocks()
  })

  it('honours an allowlist given in the environment', async () => {
    const mailer = getMailer({ MAILER: 'console', INTERNAL_MAIL_DOMAINS: 'acme.com' })
    await expect(mailer.send({ ...mail, to: visitor })).rejects.toThrow(/visitors only/)
  })
})
