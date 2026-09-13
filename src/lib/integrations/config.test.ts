import { describe, it, expect, vi } from 'vitest'
import { adapterConfig } from './config'
import { createClickUpRecorder } from './recorders/clickup'
import { createBrevoGroupMailer } from './mailers/brevo-group'
import type { Lead } from './ports'

function fakeFetch() {
  const calls: { url: string; body: Record<string, unknown> }[] = []
  const impl = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body ?? '{}')) })
    return { ok: true, status: 200, json: async () => ({ id: 'x' }), text: async () => '' } as Response
  })
  return { impl: impl as unknown as typeof fetch, calls }
}

const lead: Lead = {
  form: 'contact', title: 't', tags: [], fields: { email: 'a@b.co', phone: null }, rows: [],
}

describe('reading the committed config', () => {
  it('hands an adapter only its own section', () => {
    expect(adapterConfig('brevo-group')).toHaveProperty('lists')
    expect(adapterConfig('clickup')).toHaveProperty('list')
  })

  it('strips the documentation keys so they never reach an adapter', () => {
    const config = adapterConfig('brevo-group')
    expect(JSON.stringify(config)).not.toContain('_comment')
  })

  it('drops empty values, so an unfilled id is absent rather than blank', () => {
    const fields = adapterConfig('clickup').fields as Record<string, string>
    expect(Object.values(fields)).not.toContain('')
  })

  it('carries the real list ids the studio uses', () => {
    expect(adapterConfig('brevo-group').lists).toMatchObject({
      'audit-confirm': '19',
      'contact-confirm': '18',
    })
    expect(adapterConfig('clickup').list).toBe('901222088251')
  })

  it('returns an empty section for an adapter with no config at all', () => {
    expect(adapterConfig('console')).toEqual({})
  })
})

describe('config supplies the values, the environment can still override them', () => {
  it('records to the list named in the config with no env var set', async () => {
    const { impl, calls } = fakeFetch()
    await createClickUpRecorder({
      env: { CLICKUP_TOKEN: 'pk' },
      config: adapterConfig('clickup'),
      fetchImpl: impl,
    }).record(lead)

    expect(calls[0].url).toContain('/list/901222088251/task')
  })

  it('lets one deployment point somewhere else without editing the file', async () => {
    const { impl, calls } = fakeFetch()
    await createClickUpRecorder({
      env: { CLICKUP_TOKEN: 'pk', CLICKUP_LIST_LEADS: '999' },
      config: adapterConfig('clickup'),
      fetchImpl: impl,
    }).record(lead)

    expect(calls[0].url).toContain('/list/999/task')
  })

  it('reports configured on the config alone — only the token has to be a secret', () => {
    const recorder = createClickUpRecorder({ env: { CLICKUP_TOKEN: 'pk' }, config: adapterConfig('clickup') })
    expect(recorder.configured()).toBe(true)
  })

  it('routes each form to its own list straight from the config', async () => {
    const { impl, calls } = fakeFetch()
    const mailer = createBrevoGroupMailer({
      env: { BREVO_API_KEY: 'k' },
      config: adapterConfig('brevo-group'),
      fetchImpl: impl,
    })

    await mailer.send({ to: { email: 'a@b.co' }, template: 'audit-confirm', params: {} })
    await mailer.send({ to: { email: 'a@b.co' }, template: 'contact-confirm', params: {} })

    expect(calls.map(c => c.body.listIds)).toEqual([[19], [18]])
  })

  it('an env override wins for a single template too', async () => {
    const { impl, calls } = fakeFetch()
    await createBrevoGroupMailer({
      env: { BREVO_API_KEY: 'k', MAIL_LIST_AUDIT_CONFIRM: '77' },
      config: adapterConfig('brevo-group'),
      fetchImpl: impl,
    }).send({ to: { email: 'a@b.co' }, template: 'audit-confirm', params: {} })

    expect(calls[0].body.listIds).toEqual([77])
  })
})
