import { contactSchema, type ContactInput } from './schemas'
import { defineForm } from './types'

/**
 * The studio contact form.
 *
 * The sender joins the "Leads" audience — its own list, separate from the audit
 * flow's. With the group mailer, joining *is* the mechanism: whether anything
 * reaches them depends on the automation attached to that list in Brevo, so
 * this stays true whether or not you ever send a contact auto-reply.
 *
 * Because someone filling this form enters a list without ticking anything,
 * keep that list transactional — a CRM audience, not a campaign target.
 */
export const contactForm = defineForm<ContactInput>({
  name: 'contact',
  schema: contactSchema,

  record: {
    title: d => `פנייה מהאתר - ${d.name}`,
    tags: ['contact'],
    fields: d => ({
      email: d.email,
      phone: d.phone || null,
      company: d.company || null,
      role: d.role || null,
    }),
    // Every question the form asks appears on the task, answered or not. An
    // omitted row read as a lost field rather than a blank one, which made a
    // half-filled form look like a broken integration — and a visible gap is
    // useful anyway: it is the thing to ask about when you reply.
    rows: d => [
      ['שם', d.name],
      ['אימייל', d.email],
      ['טלפון', d.phone || '—'],
      ['חברה', d.company || '—'],
      ['תפקיד', d.role || '—'],
    ],
    // The one thing they wrote in their own words. It gets its own block.
    note: d => ({ label: 'הודעה', text: d.message }),
    replyTo: d => ({ email: d.email, name: d.name }),
  },

  confirm: {
    to: d => ({ email: d.email, name: d.name }),
    template: 'contact-confirm',
    params: d => ({
      firstName: d.name,
      company: d.company,
      role: d.role,
      phone: d.phone,
    }),
  },
})
