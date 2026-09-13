import { getMailer, getRecorder } from '@/lib/integrations/registry'
import { withRetry } from '@/lib/integrations/retry'
import { rowsToText } from '@/lib/integrations/compose'
import type { Lead } from '@/lib/integrations/ports'
import type { FormResponse, FormRouteDeps, FormSpec } from './types'

/** The honeypot field every form carries. Filled in means a bot. */
const HONEYPOT = 'website'

/**
 * The one submission path, shared by every form.
 *
 * Ordering is the whole design: the lead is recorded first, and only a recorded
 * lead earns a confirmation. That makes the bad case — having written to a
 * visitor about a lead we never kept — impossible rather than unlikely.
 */
export function createFormRoute<T>(spec: FormSpec<T>, deps: FormRouteDeps = {}) {
  return async function POST(request: Request): Promise<Response> {
    let payload: Record<string, unknown>
    try {
      payload = await request.json()
    } catch {
      return json({ ok: false, error: 'bad_request' }, 400)
    }

    // Bots fill every field they can see; this one is hidden, so anything in it
    // is a bot. Answer as if it worked so they have nothing to tune against.
    if (typeof payload[HONEYPOT] === 'string' && payload[HONEYPOT].trim()) {
      return json({ ok: true, confirmed: true }, 200)
    }

    const parsed = spec.schema.safeParse(payload)
    if (!parsed.success) {
      // The first issue's message *is* the code. The client owns the wording.
      return json({ ok: false, error: parsed.error.issues[0]?.message ?? 'bad_request' }, 400)
    }
    const data = parsed.data

    const recorder = (deps.recorder ?? getRecorder)()
    const mailer = (deps.mailer ?? getMailer)()
    const lead = toLead(spec, data)

    let ref
    try {
      ref = await withRetry(() => recorder.record(lead), deps.retry)
    } catch (err) {
      // With no fallback sink, this log is the only thing standing between a
      // provider outage and a lost lead. Log enough to recreate it by hand.
      console.error('[forms] lead not recorded', {
        form: spec.name,
        recorder: recorder.name,
        error: String(err),
        lead: { title: lead.title, fields: lead.fields, body: rowsToText(lead.rows) },
      })
      return json({ ok: false, error: 'send_failed' }, 502)
    }

    if (!spec.confirm) return json({ ok: true, confirmed: false }, 200)

    try {
      await withRetry(
        () =>
          mailer.send({
            to: spec.confirm!.to(data),
            template: spec.confirm!.template,
            params: spec.confirm!.params(data),
          }),
        deps.retry
      )
      return json({ ok: true, confirmed: true }, 200)
    } catch (err) {
      console.error('[forms] confirmation not sent', {
        form: spec.name,
        mailer: mailer.name,
        lead: ref.id,
        error: String(err),
      })
      // Write the failure onto the lead itself, where a human will see it and
      // can resend — far better than a log nobody reads. Optional capability,
      // and its own failure must not cost us the submission.
      await recorder
        .annotate?.(ref, { tag: 'confirmation-failed', comment: `confirmation not sent: ${err}` })
        .catch(annotateError => console.error('[forms] annotation failed', String(annotateError)))

      return json({ ok: true, confirmed: false }, 200)
    }
  }
}

function toLead<T>(spec: FormSpec<T>, data: T): Lead {
  return {
    form: spec.name,
    title: spec.record.title(data),
    tags: spec.record.tags,
    dueDate: spec.record.dueDate?.(data),
    fields: spec.record.fields(data),
    rows: spec.record.rows(data),
    replyTo: spec.record.replyTo?.(data),
  }
}

const json = (body: FormResponse, status: number) =>
  Response.json(body, { status })
