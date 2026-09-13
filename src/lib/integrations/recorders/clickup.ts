import type { AdapterOptions, Annotation, Env, Lead, LeadRecorder, LeadRef } from '../ports'
import { DeliveryError, NotConfiguredError } from '../ports'
import { leadToMarkdown } from '../compose'
import { clickUpFieldEnvKey } from '../naming'
import { mapping, setting, type AdapterConfig } from '../config'

const API = 'https://api.clickup.com/api/v2'

/**
 * ClickUp, as the lead record.
 *
 * The task *is* the lead: durable, assignable, and it carries its own
 * notifications, which is what lets the studio drop internal email entirely.
 *
 * The spec hands over neutral field names; each is mapped to a ClickUp custom
 * field id read from env (CLICKUP_FIELD_EMAIL and friends). A field with no id
 * configured is skipped rather than failing the submission — a missing column
 * must never cost a lead.
 */
export function createClickUpRecorder({ env, config = {}, fetchImpl = fetch }: AdapterOptions): LeadRecorder {
  const listId = () => setting(config, 'list', env.CLICKUP_LIST_LEADS)
  const configured = () => !!(env.CLICKUP_TOKEN && listId())

  const call = async (path: string, body: unknown): Promise<unknown> => {
    let response: Response
    try {
      response = await fetchImpl(`${API}${path}`, {
        method: 'POST',
        headers: { Authorization: env.CLICKUP_TOKEN!, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (err) {
      throw new DeliveryError('clickup', null, String(err))
    }
    if (!response.ok) {
      throw new DeliveryError('clickup', response.status, (await response.text().catch(() => '')).slice(0, 300))
    }
    return response.json().catch(() => ({}))
  }

  return {
    name: 'clickup',
    configured,

    async record(lead: Lead): Promise<LeadRef> {
      if (!configured()) throw new NotConfiguredError('clickup')

      const task = (await call(`/list/${listId()}/task`, {
        name: lead.title,
        markdown_content: leadToMarkdown(lead.rows, lead.note),
        tags: lead.tags,
        due_date: lead.dueDate,
        due_date_time: false,
        custom_fields: toCustomFields(lead.fields, config, env),
      })) as { id?: string; url?: string }

      if (!task.id) throw new DeliveryError('clickup', null, 'task created without an id')
      return { id: task.id, url: task.url }
    },

    async annotate(ref: LeadRef, note: Annotation): Promise<void> {
      if (note.tag) {
        // Path-based, so the tag name has to survive a URL.
        await call(`/task/${ref.id}/tag/${encodeURIComponent(note.tag)}`, {})
      }
      if (note.comment) {
        await call(`/task/${ref.id}/comment`, { comment_text: note.comment, notify_all: false })
      }
    },
  }
}

type CustomField = { id: string; value: Lead['fields'][string] }

/** A field with no id configured is skipped — its value is in the body anyway. */
function toCustomFields(fields: Lead['fields'], config: AdapterConfig, env: Env): CustomField[] {
  return Object.entries(fields)
    .map(([key, value]) => ({ id: mapping(config, 'fields', key, env[clickUpFieldEnvKey(key)]), value }))
    .filter((field): field is CustomField => Boolean(field.id) && field.value !== null)
}
