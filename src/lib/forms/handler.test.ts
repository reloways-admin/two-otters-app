import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createFormRoute } from './handler'
import { auditRequestForm } from './audit-request'
import { contactForm } from './contact'
import type { LeadRecorder, Mailer } from '@/lib/integrations/ports'
import { DeliveryError } from '@/lib/integrations/ports'

function stubRecorder(overrides: Partial<LeadRecorder> = {}) {
  return {
    name: 'stub',
    configured: () => true,
    record: vi.fn(async () => ({ id: 'lead-1', url: 'https://board/lead-1' })),
    annotate: vi.fn(async () => {}),
    ...overrides,
  } as LeadRecorder & { record: ReturnType<typeof vi.fn>; annotate: ReturnType<typeof vi.fn> }
}

function stubMailer(overrides: Partial<Mailer> = {}) {
  return {
    name: 'stub',
    configured: () => true,
    send: vi.fn(async () => ({ id: 'mail-1' })),
    ...overrides,
  } as Mailer & { send: ReturnType<typeof vi.fn> }
}

const post = (payload: unknown) =>
  new Request('http://localhost/api/forms/audit-request', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })

const validAudit = {
  firstName: 'דנה',
  email: 'dana@acme.com',
  url: 'acme.com',
  consentReport: true,
  marketingOptIn: true,
}

let recorder: ReturnType<typeof stubRecorder>
let mailer: ReturnType<typeof stubMailer>

const run = (payload: unknown, spec = auditRequestForm) =>
  createFormRoute(spec, { recorder: () => recorder, mailer: () => mailer, retry: { attempts: 1 } })(post(payload))

beforeEach(() => {
  recorder = stubRecorder()
  mailer = stubMailer()
  vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => vi.restoreAllMocks())

describe('a submission that works', () => {
  it('records the lead, sends the confirmation, and says both happened', async () => {
    const response = await run(validAudit)

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, confirmed: true })
    expect(recorder.record).toHaveBeenCalledOnce()
    expect(mailer.send).toHaveBeenCalledOnce()
  })

  it('records the lead before it confirms, so we never confirm a lead we lost', async () => {
    const order: string[] = []
    recorder = stubRecorder({ record: vi.fn(async () => { order.push('record'); return { id: 'l1' } }) })
    mailer = stubMailer({ send: vi.fn(async () => { order.push('confirm'); return { id: 'm1' } }) })

    await run(validAudit)
    expect(order).toEqual(['record', 'confirm'])
  })

  it('describes the lead in the form spec terms', async () => {
    await run(validAudit)
    const lead = recorder.record.mock.calls[0][0]

    expect(lead).toMatchObject({ form: 'audit-request', tags: ['audit'] })
    expect(lead.title).toContain('acme.com')
    expect(lead.fields).toMatchObject({ email: 'dana@acme.com', marketingOptIn: true })
  })

  it('gives the lead a due date, which is the promise the thanks page makes', async () => {
    await run(validAudit)
    expect(recorder.record.mock.calls[0][0].dueDate).toBeGreaterThan(Date.now())
  })

  it('addresses the confirmation to the visitor', async () => {
    await run(validAudit)
    expect(mailer.send.mock.calls[0][0]).toMatchObject({
      to: { email: 'dana@acme.com', name: 'דנה' },
      template: 'audit-confirm',
    })
  })
})

describe('when the confirmation fails but the lead is safe', () => {
  beforeEach(() => {
    mailer = stubMailer({ send: vi.fn(async () => { throw new DeliveryError('stub', 500, 'down') }) })
  })

  it('still succeeds — the lead is what matters', async () => {
    const response = await run(validAudit)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, confirmed: false })
  })

  it('writes the failure onto the lead so a human can see it on the board', async () => {
    await run(validAudit)
    expect(recorder.annotate).toHaveBeenCalledWith(
      { id: 'lead-1', url: 'https://board/lead-1' },
      expect.objectContaining({ tag: 'confirmation-failed' })
    )
  })

  it('does not fail the submission when even the annotation fails', async () => {
    recorder = stubRecorder({ annotate: vi.fn(async () => { throw new Error('nope') }) })
    const response = await run(validAudit)
    expect(await response.json()).toEqual({ ok: true, confirmed: false })
  })

  it('copes with a recorder that cannot annotate at all', async () => {
    recorder = stubRecorder({ annotate: undefined })
    const response = await run(validAudit)
    expect(await response.json()).toEqual({ ok: true, confirmed: false })
  })
})

describe('when the lead cannot be recorded', () => {
  beforeEach(() => {
    recorder = stubRecorder({ record: vi.fn(async () => { throw new DeliveryError('stub', 503, 'down') }) })
  })

  it('fails the submission so the visitor knows to try again', async () => {
    const response = await run(validAudit)
    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({ ok: false, error: 'send_failed' })
  })

  it('never sends a confirmation for a lead that was not recorded', async () => {
    await run(validAudit)
    expect(mailer.send).not.toHaveBeenCalled()
  })

  it('logs the whole submission, because that log is now the only floor', async () => {
    await run(validAudit)
    const logged = JSON.stringify((console.error as unknown as ReturnType<typeof vi.fn>).mock.calls)
    expect(logged).toContain('dana@acme.com')
    expect(logged).toContain('acme.com')
  })
})

describe('submissions we refuse', () => {
  it('answers a bot as if it worked, and records nothing', async () => {
    const response = await run({ ...validAudit, website: 'http://spam.example' })

    expect(await response.json()).toEqual({ ok: true, confirmed: true })
    expect(recorder.record).not.toHaveBeenCalled()
    expect(mailer.send).not.toHaveBeenCalled()
  })

  it('returns the schema error code, which the client turns into its own copy', async () => {
    const response = await run({ ...validAudit, email: 'nope' })

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ ok: false, error: 'invalid_email' })
  })

  it('rejects a body that is not JSON at all', async () => {
    const route = createFormRoute(auditRequestForm, { recorder: () => recorder, mailer: () => mailer })
    const response = await route(
      new Request('http://localhost/api/forms/audit-request', { method: 'POST', body: 'not json' })
    )

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ ok: false, error: 'bad_request' })
  })
})

describe('the contact form, which feeds its own audience', () => {
  const validContact = { name: 'Dana', email: 'dana@acme.com', message: 'Hello there', company: 'Acme' }
  const runContact = (payload: unknown) =>
    createFormRoute(contactForm, { recorder: () => recorder, mailer: () => mailer })(post(payload))

  it('records the lead and puts the sender into the contact audience', async () => {
    const response = await runContact(validContact)

    expect(await response.json()).toEqual({ ok: true, confirmed: true })
    expect(recorder.record).toHaveBeenCalledOnce()
    expect(mailer.send).toHaveBeenCalledOnce()
  })

  it('uses its own logical name, so it resolves to its own Brevo list', async () => {
    await runContact(validContact)
    expect(mailer.send.mock.calls[0][0]).toMatchObject({
      to: { email: 'dana@acme.com', name: 'Dana' },
      template: 'contact-confirm',
    })
  })

  it('carries the details worth having on the contact record', async () => {
    await runContact(validContact)
    expect(mailer.send.mock.calls[0][0].params).toMatchObject({ firstName: 'Dana', company: 'Acme' })
  })

  it('still succeeds when the audience write fails — the lead is what matters', async () => {
    mailer = stubMailer({ send: vi.fn(async () => { throw new DeliveryError('stub', 500, 'down') }) })
    const response = await runContact(validContact)
    expect(await response.json()).toEqual({ ok: true, confirmed: false })
  })

  it('tags the lead as contact so the board can tell them apart', async () => {
    await runContact(validContact)
    expect(recorder.record.mock.calls[0][0].tags).toEqual(['contact'])
  })
})
