import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {
  clean,
  isValidEmail,
  isDisposableEmail,
  isValidSiteUrl,
  normaliseSiteHost,
  needsRelationshipQuestion,
  isRelationship,
  emailMatchesSite,
  deliveryDate,
  formatDeliveryDate,
} from '@/lib/audit-intake'

// nodemailer opens a real SMTP socket, which the Edge runtime can't do.
export const runtime = 'nodejs'

/** Error codes the form maps to the copy in the Figma "Errors" frame. Sending a
 *  code rather than a sentence keeps the wording in the locale files, where the
 *  Hebrew and English versions live together. */
export type AuditRequestError =
  | 'bad_request'
  | 'invalid_email'
  | 'disposable_email'
  | 'invalid_url'
  | 'consent_required'
  | 'relationship_required'
  | 'not_configured'
  | 'send_failed'

export type AuditRequestResponse = { ok: true } | { ok: false; error: AuditRequestError }

const RELATIONSHIP_LABELS: Record<string, string> = {
  owner: 'זה האתר של החברה שלי',
  employee: 'עובד/ת שם',
  consultant: 'מלווה אותם מבחוץ',
  other: 'בודק/ת אתר של מישהו אחר',
}

const esc = (s: string) => s.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]!))

function fail(error: AuditRequestError, status: number) {
  return NextResponse.json<AuditRequestResponse>({ ok: false, error }, { status })
}

export async function POST(req: NextRequest): Promise<NextResponse<AuditRequestResponse>> {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return fail('bad_request', 400)
  }

  // Bots fill every field they can see; this one is hidden, so anything in it
  // is a bot. Answer as if it worked so they have nothing to tune against.
  if (clean(body.website, 'firstName')) return NextResponse.json({ ok: true })

  const firstName = clean(body.firstName, 'firstName')
  const email = clean(body.email, 'email')
  const url = clean(body.url, 'url')
  const relationship = clean(body.relationship, 'relationship')
  const consentReport = body.consentReport === true
  const marketingOptIn = body.marketingOptIn === true

  if (!firstName) return fail('bad_request', 400)
  if (!isValidEmail(email)) return fail('invalid_email', 400)
  if (isDisposableEmail(email)) return fail('disposable_email', 400)
  if (!isValidSiteUrl(url)) return fail('invalid_url', 400)

  // The report is the thing they asked for, so this one is required. Joining the
  // mailing list is a separate, optional box: consent to marketing has to be
  // given freely, and it cannot be the price of the service.
  if (!consentReport) return fail('consent_required', 400)

  // Re-derived here rather than trusted from the client, which could simply not
  // send the field.
  if (needsRelationshipQuestion(email, url) && !isRelationship(relationship)) {
    return fail('relationship_required', 400)
  }

  // Checked after validation so a visitor still gets accurate feedback on their
  // input even if the server is misconfigured.
  // Who we authenticate to Gmail as. On a Workspace where two-otters.studio is
  // a secondary domain, this may have to be the primary-domain account that
  // actually owns the mailbox, because only a real user can hold an App
  // Password — an alias cannot.
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  // Who the mail appears to come from. Defaults to the login, but can be set to
  // hello@two-otters.studio when we authenticate as someone else. Gmail only
  // honours it if that address is a verified "Send mail as" identity on the
  // account; otherwise it silently rewrites From back to the login.
  const from = process.env.MAIL_FROM || user
  const to = process.env.CONTACT_TO || user
  if (!user || !pass) {
    // Our problem, not theirs — detail goes to the log, the client stays vague.
    console.error('[audit-request] GMAIL_USER / GMAIL_APP_PASSWORD are not set')
    return fail('not_configured', 500)
  }

  const host = normaliseSiteHost(url)
  const matched = emailMatchesSite(email, url)
  // Same promise the success screen shows, so the two never disagree.
  const deliveryLabel = formatDeliveryDate(deliveryDate(), 'he')

  const rows: [string, string][] = [
    ['אתר לבדיקה', host],
    ['שם', firstName],
    ['אימייל', email],
    ['התאמת דומיין', matched ? 'המייל שייך לדומיין של האתר' : 'המייל אינו שייך לדומיין של האתר'],
    ['הקשר לאתר', relationship ? RELATIONSHIP_LABELS[relationship] ?? relationship : '—'],
    ['דיוור', marketingOptIn ? 'כן, הצטרפ/ה לרשימה' : 'לא'],
  ].filter((r): r is [string, string] => Boolean(r[1]))

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    })

    await transporter.sendMail({
      // Reply-To carries the visitor, so hitting reply in the studio inbox
      // answers them rather than us.
      from: `"Two Otters Studio" <${from}>`,
      to,
      replyTo: `"${firstName}" <${email}>`,
      subject: `בקשת אודיט - ${host}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6">
        <p style="margin:0 0 12px;font-size:17px"><b>בקשת אודיט חדשה</b></p>
        ${rows.map(([k, v]) => `<p style="margin:0 0 4px"><b>${k}:</b> ${esc(v)}</p>`).join('')}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
        <p style="margin:0"><a href="https://${esc(host)}">https://${esc(host)}</a></p>
      </div>`,
    })

    // The confirmation the success screen promises ("שלחנו לכם עכשיו מייל
    // אישור"). Sent after ours and deliberately not awaited into the failure
    // path: if this one bounces we still have the lead, and failing the request
    // would make someone submit again for a report already on its way.
    try {
      await transporter.sendMail({
        from: `"Two Otters Studio" <${from}>`,
        to: email,
        subject: `קיבלנו את הבקשה לאודיט של ${host}`,
        text: [
          `היי ${firstName},`,
          '',
          `קיבלנו את הבקשה לבדוק את ${host}.`,
          `הדוח יגיע לכאן עד ${deliveryLabel}.`,
          '',
          'אם המייל הזה נחת בקידומי מכירות או בספאם, שווה לסמן אותנו כ"לא ספאם" כדי שגם הדוח עצמו יגיע למקום הנכון.',
          '',
          'Two Otters Studio',
          'hello@two-otters.studio',
        ].join('\n'),
        html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#1d2332">
          <p style="margin:0 0 12px">היי ${esc(firstName)},</p>
          <p style="margin:0 0 12px">קיבלנו את הבקשה לבדוק את <b>${esc(host)}</b>.<br>
          הדוח יגיע לכאן עד <b>${esc(deliveryLabel)}</b>.</p>
          <p style="margin:0 0 12px">אם המייל הזה נחת בקידומי מכירות או בספאם, שווה לסמן אותנו כ״לא ספאם״ כדי שגם הדוח עצמו יגיע למקום הנכון.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
          <p style="margin:0;color:#4B5280">Two Otters Studio · <a href="mailto:hello@two-otters.studio">hello@two-otters.studio</a></p>
        </div>`,
      })
    } catch (err) {
      console.error('[audit-request] confirmation to visitor failed:', err)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[audit-request] send failed:', err)
    return fail('send_failed', 502)
  }
}
