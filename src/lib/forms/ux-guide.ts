import { uxGuideSchema, type UxGuideInput } from './schemas'
import { defineForm } from './types'

/**
 * The free UX guide at /ux-guide: the landing page for paid ads.
 *
 * Same path as every other form: the lead is recorded first, then the visitor
 * joins the `ux-guide-confirm` audience. With the group mailer that list's
 * automation in Brevo is what actually emails the PDF, so until that list and
 * MAIL_LIST_UX_GUIDE_CONFIRM exist the lead is kept but nothing goes out (the
 * route answers `confirmed: false` and the lead is tagged confirmation-failed).
 */
export const uxGuideForm = defineForm<UxGuideInput>({
  name: 'ux-guide',
  schema: uxGuideSchema,

  record: {
    title: d => `מדריך UX - ${d.firstName}`,
    tags: ['ux-guide'],
    fields: d => ({ email: d.email }),
    rows: d =>
      (
        [
          ['שם', d.firstName],
          ['אימייל', d.email],
          ['utm_source', d.utmSource],
          ['utm_medium', d.utmMedium],
          ['utm_campaign', d.utmCampaign],
          ['utm_content', d.utmContent],
          ['utm_term', d.utmTerm],
        ] as [string, string][]
      ).filter(([, value]) => Boolean(value)),
    replyTo: d => ({ email: d.email, name: d.firstName }),
  },

  confirm: {
    to: d => ({ email: d.email, name: d.firstName }),
    template: 'ux-guide-confirm',
    params: d => ({ firstName: d.firstName }),
  },
})
