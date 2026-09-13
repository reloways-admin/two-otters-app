/**
 * The two capabilities every form submission needs, expressed as ports.
 *
 * Nothing in here names a vendor. A form spec talks in these terms, the handler
 * calls these methods, and swapping ClickUp for Notion or Brevo for Resend is a
 * new adapter file plus a line in the registry — never a change to a route, a
 * handler or a form.
 */

/** Process env, narrowed to what an adapter is allowed to see. */
export type Env = Record<string, string | undefined>

/** A lead, as the forms describe it — no provider's vocabulary. */
export interface Lead {
  /** Which form produced it, e.g. 'audit-request'. */
  form: string
  title: string
  tags: string[]
  /** ms epoch. The audit flow's 1-2 business day promise, as a date. */
  dueDate?: number
  /** Flat, neutral keys. Each adapter maps them into its own world. */
  fields: Record<string, string | number | boolean | null>
  /** Label/value pairs, in order, for the human-readable body. */
  rows: [string, string][]
  /** Free text the person wrote, kept apart from the one-word facts. */
  note?: { label: string; text: string }
  replyTo?: { email: string; name?: string }
}

export interface LeadRef {
  id: string
  url?: string
}

/** Something worth writing back onto a lead after the fact. */
export interface Annotation {
  tag?: string
  comment?: string
}

export interface LeadRecorder {
  readonly name: string
  configured(): boolean
  record(lead: Lead): Promise<LeadRef>
  /**
   * Optional on purpose: callers use `recorder.annotate?.(…)`, so an adapter
   * that cannot tag simply omits this and nobody needs to know which can.
   */
  annotate?(ref: LeadRef, note: Annotation): Promise<void>
}

export interface OutboundMail {
  to: { email: string; name?: string }
  /** A logical template name, e.g. 'audit-confirm'. The adapter resolves it. */
  template: string
  params: Record<string, unknown>
}

export interface Mailer {
  readonly name: string
  configured(): boolean
  send(msg: OutboundMail): Promise<{ id: string }>
}

export interface AdapterOptions {
  /** Credentials, and per-deployment overrides of anything in `config`. */
  env: Env
  /** This adapter's non-secret section of src/config/integrations.json. */
  config?: Record<string, string | Record<string, string>>
  /** Injectable so adapters can be exercised without a network. */
  fetchImpl?: typeof fetch
}

/** The provider is not set up. Distinct from "the provider said no". */
export class NotConfiguredError extends Error {
  constructor(adapter: string) {
    super(`${adapter} is not configured`)
    this.name = 'NotConfiguredError'
  }
}

/** The provider was reached and refused, or could not be reached at all. */
export class DeliveryError extends Error {
  constructor(adapter: string, readonly status: number | null, detail: string) {
    super(`${adapter} delivery failed${status ? ` (${status})` : ''}: ${detail}`)
    this.name = 'DeliveryError'
  }
}
