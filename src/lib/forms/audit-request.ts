import {
  deliveryDate,
  formatDeliveryDate,
  emailMatchesSite,
} from '@/lib/audit-intake'
import { auditRequestSchema, type AuditRequestInput } from './schemas'
import { defineForm } from './types'

/**
 * How each answer to "what is your connection to this site?" reads on the board.
 *
 * English, like every label we write: the visitor's own words are theirs and
 * stay untouched, but a value we derive is ours to make scannable.
 */
const RELATIONSHIP_LABELS: Record<string, string> = {
  owner: 'Owns the company',
  employee: 'Works there',
  consultant: 'External consultant',
  other: "Checking someone else's site",
}

export const auditRequestForm = defineForm<AuditRequestInput>({
  name: 'audit-request',
  schema: auditRequestSchema,

  record: {
    // English so the board reads the same whichever language the visitor
    // used, and so the line stays left-to-right: a Hebrew prefix in front of a
    // domain leaves the browser to guess where the dash belongs.
    title: d => `Audit request - ${d.host}`,
    tags: ['audit'],
    // The 1-2 business day promise the thanks page makes, as a date on the
    // board — so the commitment lives where the work is, not only in an email.
    dueDate: () => deliveryDate().getTime(),
    fields: d => ({
      email: d.email,
      company: d.host,
      domainMatch: emailMatchesSite(d.email, d.url),
      relationship: d.relationship ? RELATIONSHIP_LABELS[d.relationship] ?? d.relationship : null,
      marketingOptIn: d.marketingOptIn,
    }),
    rows: d => [
      ['Site', d.host],
      ['Name', d.firstName],
      ['Email', d.email],
      ['Email matches site', emailMatchesSite(d.email, d.url) ? 'Yes' : 'No'],
      ['Relationship', d.relationship ? RELATIONSHIP_LABELS[d.relationship] ?? d.relationship : '—'],
      ['Marketing opt-in', d.marketingOptIn ? 'Yes' : 'No'],
    ],
    replyTo: d => ({ email: d.email, name: d.firstName }),
  },

  confirm: {
    to: d => ({ email: d.email, name: d.firstName }),
    template: 'audit-confirm',
    params: d => ({
      firstName: d.firstName,
      host: d.host,
      // Same promise the success screen shows, so the two never disagree.
      due: formatDeliveryDate(deliveryDate(), 'he'),
    }),
  },
})
