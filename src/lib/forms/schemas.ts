/**
 * Form schemas — the single definition of what each form accepts.
 *
 * Imported by the client for instant feedback and re-run by the server, where
 * it is the copy that actually counts. The rules themselves still live in
 * `audit-intake.ts`; this file only arranges them.
 *
 * Every message here is an **API error code**, not a sentence. The handler
 * returns the first issue's message verbatim and the client maps it to the
 * Hebrew or English copy in the locale files, so wording never reaches the
 * server.
 */

import { z } from 'zod'
import {
  LIMITS,
  isValidEmail,
  isDisposableEmail,
  isValidSiteUrl,
  normaliseSiteHost,
  needsRelationshipQuestion,
  isRelationship,
} from '@/lib/audit-intake'

/** Longest we accept for fields the audit flow doesn't already bound. */
const CONTACT_LIMITS = { name: 120, phone: 60, company: 200, role: 200, message: 5000 } as const

/**
 * Accept anything, hand back a trimmed string of at most `max`.
 *
 * Truncating rather than rejecting is deliberate and matches what the forms did
 * before: a real enquiry never needs more, and a bot posting a novel gets its
 * novel cut short instead of a validation message to tune against.
 */
const text = (max: number) =>
  // `.optional()` because a key the client never sent is the same thing as an
  // empty one here; without it Zod 4 rejects the missing key on its own terms
  // and the message that comes back is not one of our codes.
  z.unknown().optional().transform(v => (typeof v === 'string' ? v.trim().slice(0, max) : ''))

/** A checkbox is true or it is not there; anything else is not consent. */
const checkbox = z.unknown().optional().transform(v => v === true)

const emailField = text(LIMITS.email)
  .refine(isValidEmail, 'invalid_email')
  // Only reached once the address is syntactically real, so the two codes can
  // never both fire and the client always has one thing to say.
  .refine(v => !isDisposableEmail(v), 'disposable_email')

export const auditRequestSchema = z
  .object({
    firstName: text(LIMITS.firstName).refine(v => v.length > 0, 'firstName_required'),
    email: emailField,
    url: text(LIMITS.url).refine(isValidSiteUrl, 'invalid_url'),
    relationship: text(LIMITS.relationship),
    consentReport: checkbox.refine(v => v, 'consent_required'),
    marketingOptIn: checkbox,
  })
  .superRefine((d, ctx) => {
    // Re-derived here rather than trusted from the client, which could simply
    // not send the field.
    if (needsRelationshipQuestion(d.email, d.url) && !isRelationship(d.relationship)) {
      ctx.addIssue({ code: 'custom', path: ['relationship'], message: 'relationship_required' })
    }
  })
  // The host is what we actually work with — the address someone pasted is not.
  .transform(d => ({ ...d, host: normaliseSiteHost(d.url) }))

export const contactSchema = z.object({
  name: text(CONTACT_LIMITS.name).refine(v => v.length > 0, 'name_required'),
  email: emailField,
  phone: text(CONTACT_LIMITS.phone),
  company: text(CONTACT_LIMITS.company),
  role: text(CONTACT_LIMITS.role),
  message: text(CONTACT_LIMITS.message).refine(v => v.length > 0, 'message_required'),
})

export type AuditRequestInput = z.output<typeof auditRequestSchema>
export type ContactInput = z.output<typeof contactSchema>
