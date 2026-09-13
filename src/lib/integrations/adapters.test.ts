import { describe, it, expect, vi } from 'vitest'
import { createClickUpRecorder } from './recorders/clickup'
import { createBrevoGroupMailer } from './mailers/brevo-group'
import { createBrevoTransactionalMailer } from './mailers/brevo-transactional'
import { DeliveryError, NotConfiguredError, type Lead, type OutboundMail } from './ports'

/** A fetch that records what it was asked and answers however the test wants. */
function fakeFetch(response: { ok?: boolean; status?: number; body?: unknown } = {}) {
  const calls: { url: string; init: RequestInit }[] = []
  const impl = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} })
    return {
      ok: response.ok ?? true,
      status: response.status ?? 200,
      json: async () => response.body ?? {},
      text: async () => JSON.stringify(response.body ?? {}),
    } as unknown as Response
  })
  return { impl: impl as unknown as typeof fetch, calls }
}

const body = (calls: { init: RequestInit }[], i = 0) => JSON.parse(String(calls[i].init.body))

const lead: Lead = {
  form: 'audit-request',
  title: 'בקשת אודיט - acme.com',
  tags: ['audit'],
  dueDate: 1_760_000_000_000,
  fields: { email: 'dana@acme.com', marketingOptIn: true, phone: null },
  rows: [['אתר לבדיקה', 'acme.com'], ['שם', 'דנה']],
}

const clickUpEnv = {
  CLICKUP_TOKEN: 'pk_test',
  CLICKUP_LIST_LEADS: '901',
  CLICKUP_FIELD_EMAIL: 'field-email',
  CLICKUP_FIELD_MARKETING_OPT_IN: 'field-marketing',
}

describe('the ClickUp recorder', () => {
  it('refuses to pretend when it has no credentials', async () => {
    const recorder = createClickUpRecorder({ env: {}, fetchImpl: fakeFetch().impl })
    await expect(recorder.record(lead)).rejects.toBeInstanceOf(NotConfiguredError)
  })

  it('creates the task in the configured list and returns its ref', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 'abc123', url: 'https://app.clickup.com/t/abc123' } })
    const ref = await createClickUpRecorder({ env: clickUpEnv, fetchImpl: impl }).record(lead)

    expect(calls[0].url).toBe('https://api.clickup.com/api/v2/list/901/task')
    expect(ref).toEqual({ id: 'abc123', url: 'https://app.clickup.com/t/abc123' })
  })

  it('authenticates with the token as a bare Authorization header', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 'abc123' } })
    await createClickUpRecorder({ env: clickUpEnv, fetchImpl: impl }).record(lead)
    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe('pk_test')
  })

  it('carries the title, tags and due date over', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 'abc123' } })
    await createClickUpRecorder({ env: clickUpEnv, fetchImpl: impl }).record(lead)

    expect(body(calls)).toMatchObject({
      name: 'בקשת אודיט - acme.com',
      tags: ['audit'],
      due_date: 1_760_000_000_000,
    })
  })

  it('maps neutral field names onto the custom field ids from the environment', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 'abc123' } })
    await createClickUpRecorder({ env: clickUpEnv, fetchImpl: impl }).record(lead)

    expect(body(calls).custom_fields).toEqual([
      { id: 'field-email', value: 'dana@acme.com' },
      { id: 'field-marketing', value: true },
    ])
  })

  it('skips a field with no id configured rather than losing the lead over a column', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 'abc123' } })
    await createClickUpRecorder({
      env: { CLICKUP_TOKEN: 't', CLICKUP_LIST_LEADS: '901' },
      fetchImpl: impl,
    }).record(lead)

    expect(body(calls).custom_fields).toEqual([])
  })

  it('reports a refusal as a delivery error carrying the status', async () => {
    const { impl } = fakeFetch({ ok: false, status: 401, body: { err: 'Team not authorized' } })
    const failure = createClickUpRecorder({ env: clickUpEnv, fetchImpl: impl }).record(lead)

    await expect(failure).rejects.toBeInstanceOf(DeliveryError)
    await expect(failure).rejects.toMatchObject({ status: 401 })
  })

  it('marks an unanswered request retryable by leaving the status null', async () => {
    const impl = vi.fn(async () => {
      throw new TypeError('fetch failed')
    }) as unknown as typeof fetch
    await expect(
      createClickUpRecorder({ env: clickUpEnv, fetchImpl: impl }).record(lead)
    ).rejects.toMatchObject({ status: null })
  })

  it('annotates a lead by tagging the task', async () => {
    const { impl, calls } = fakeFetch()
    await createClickUpRecorder({ env: clickUpEnv, fetchImpl: impl }).annotate!(
      { id: 'abc123' },
      { tag: 'confirmation-failed' }
    )
    expect(calls[0].url).toBe('https://api.clickup.com/api/v2/task/abc123/tag/confirmation-failed')
  })

  it('leaves a comment when one is given', async () => {
    const { impl, calls } = fakeFetch()
    await createClickUpRecorder({ env: clickUpEnv, fetchImpl: impl }).annotate!(
      { id: 'abc123' },
      { comment: 'confirmation email failed' }
    )
    expect(calls[0].url).toBe('https://api.clickup.com/api/v2/task/abc123/comment')
    expect(body(calls)).toMatchObject({ comment_text: 'confirmation email failed', notify_all: false })
  })
})

const mail: OutboundMail = {
  to: { email: 'dana@acme.com', name: 'דנה' },
  template: 'audit-confirm',
  params: { firstName: 'דנה', host: 'acme.com' },
}

describe('the Brevo group mailer, where the automation does the sending', () => {
  const env = { BREVO_API_KEY: 'key', MAIL_LIST_AUDIT_CONFIRM: '7' }

  it('upserts the visitor into the list the logical template name resolves to', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 42 } })
    const result = await createBrevoGroupMailer({ env, fetchImpl: impl }).send(mail)

    expect(calls[0].url).toBe('https://api.brevo.com/v3/contacts')
    expect(body(calls)).toMatchObject({ email: 'dana@acme.com', listIds: [7], updateEnabled: true })
    expect(result.id).toBe('42')
  })

  it('uses the name Brevo actually defines, FIRSTNAME, not an invented one', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 42 } })
    await createBrevoGroupMailer({ env, fetchImpl: impl }).send(mail)

    // Brevo accepts the write and silently discards attributes it has no
    // definition for, so a wrong name here fails invisibly.
    expect(body(calls).attributes).toMatchObject({ FIRSTNAME: 'דנה' })
    expect(body(calls).attributes).not.toHaveProperty('FNAME')
  })

  it('upper-cases anything else, which must exist in Brevo or it is dropped', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 42 } })
    await createBrevoGroupMailer({ env, fetchImpl: impl }).send({
      ...mail,
      params: { host: 'acme.com', due: 'יום שלישי' },
    })

    expect(body(calls).attributes).toMatchObject({ HOST: 'acme.com', DUE: 'יום שלישי' })
  })

  it('maps the other standard Brevo names rather than inventing them', async () => {
    const { impl, calls } = fakeFetch({ body: { id: 42 } })
    await createBrevoGroupMailer({ env, fetchImpl: impl }).send({
      ...mail,
      to: { email: 'a@b.co' },
      params: { firstName: 'Dana', lastName: 'Levi', role: 'CEO' },
    })

    expect(body(calls).attributes).toMatchObject({
      FIRSTNAME: 'Dana',
      LASTNAME: 'Levi',
      JOB_TITLE: 'CEO',
    })
  })

  it('says it is not configured when the list for that template is missing', async () => {
    const { impl } = fakeFetch()
    await expect(
      createBrevoGroupMailer({ env: { BREVO_API_KEY: 'key' }, fetchImpl: impl }).send(mail)
    ).rejects.toBeInstanceOf(NotConfiguredError)
  })

  it('falls back to the address when Brevo answers an update with no id', async () => {
    const { impl } = fakeFetch({ status: 204, body: {} })
    const result = await createBrevoGroupMailer({ env, fetchImpl: impl }).send(mail)
    expect(result.id).toBe('dana@acme.com')
  })
})

describe('the Brevo transactional mailer', () => {
  const env = { BREVO_API_KEY: 'key', BREVO_SENDER_EMAIL: 'hello@two-otters.studio', MAIL_TEMPLATE_AUDIT_CONFIRM: '3' }

  it('posts the template id and params to the transactional endpoint', async () => {
    const { impl, calls } = fakeFetch({ body: { messageId: '<abc@brevo>' } })
    const result = await createBrevoTransactionalMailer({ env, fetchImpl: impl }).send(mail)

    expect(calls[0].url).toBe('https://api.brevo.com/v3/smtp/email')
    expect(body(calls)).toMatchObject({
      templateId: 3,
      to: [{ email: 'dana@acme.com', name: 'דנה' }],
      params: { firstName: 'דנה', host: 'acme.com' },
    })
    expect(result.id).toBe('<abc@brevo>')
  })

  it('authenticates with the api-key header', async () => {
    const { impl, calls } = fakeFetch({ body: { messageId: 'x' } })
    await createBrevoTransactionalMailer({ env, fetchImpl: impl }).send(mail)
    expect((calls[0].init.headers as Record<string, string>)['api-key']).toBe('key')
  })

  it('reports a rejected send as a delivery error carrying the status', async () => {
    const { impl } = fakeFetch({ ok: false, status: 400, body: { message: 'sender not valid' } })
    await expect(
      createBrevoTransactionalMailer({ env, fetchImpl: impl }).send(mail)
    ).rejects.toMatchObject({ status: 400 })
  })
})
