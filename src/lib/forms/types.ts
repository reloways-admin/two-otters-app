import type { Lead, LeadRecorder, Mailer } from '@/lib/integrations/ports'

/** What a route answers. `confirmed` says whether the visitor was written to. */
export type FormResponse =
  | { ok: true; confirmed: boolean }
  | { ok: false; error: string }

/** Codes the handler itself can produce; the rest come from the schema. */
export type HandlerError = 'bad_request' | 'send_failed'

export interface ParsedSchema<T> {
  safeParse(value: unknown): { success: true; data: T } | { success: false; error: { issues: { message: string }[] } }
}

/**
 * One form, described in terms no provider would recognise.
 *
 * Vendor vocabulary — list ids, template ids, custom field ids — belongs to the
 * adapters, which resolve it from their own environment. That separation is
 * what lets a provider be swapped without opening this file.
 */
export interface FormSpec<T> {
  name: string
  schema: ParsedSchema<T>
  record: {
    title: (data: T) => string
    tags: string[]
    dueDate?: (data: T) => number
    fields: (data: T) => Lead['fields']
    rows: (data: T) => [string, string][]
    replyTo?: (data: T) => { email: string; name?: string }
  }
  /** null when the form has nothing to say back to the visitor. */
  confirm: null | {
    to: (data: T) => { email: string; name?: string }
    /** Logical name. Each mailer resolves it its own way — see `naming.ts`. */
    template: string
    params: (data: T) => Record<string, unknown>
  }
}

export interface FormRouteDeps {
  recorder?: () => LeadRecorder
  mailer?: () => Mailer
  retry?: { attempts?: number; baseDelayMs?: number }
}

/** Identity helper: keeps each spec type-checked against its own schema. */
export const defineForm = <T>(spec: FormSpec<T>): FormSpec<T> => spec
