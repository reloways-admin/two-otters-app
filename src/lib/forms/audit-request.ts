import {
  deliveryDate,
  formatDeliveryDate,
  emailMatchesSite,
} from '@/lib/audit-intake'
import { auditRequestSchema, type AuditRequestInput } from './schemas'
import { defineForm } from './types'

/** How each answer to "what is your connection to this site?" reads on the board. */
const RELATIONSHIP_LABELS: Record<string, string> = {
  owner: 'זה האתר של החברה שלי',
  employee: 'עובד/ת שם',
  consultant: 'מלווה אותם מבחוץ',
  other: 'בודק/ת אתר של מישהו אחר',
}

export const auditRequestForm = defineForm<AuditRequestInput>({
  name: 'audit-request',
  schema: auditRequestSchema,

  record: {
    title: d => `בקשת אודיט - ${d.host}`,
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
      ['אתר לבדיקה', d.host],
      ['שם', d.firstName],
      ['אימייל', d.email],
      [
        'התאמת דומיין',
        emailMatchesSite(d.email, d.url)
          ? 'המייל שייך לדומיין של האתר'
          : 'המייל אינו שייך לדומיין של האתר',
      ],
      ['הקשר לאתר', d.relationship ? RELATIONSHIP_LABELS[d.relationship] ?? d.relationship : '—'],
      ['דיוור', d.marketingOptIn ? 'כן, הצטרפ/ה לרשימה' : 'לא'],
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
