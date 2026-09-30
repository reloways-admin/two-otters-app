import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// nodemailer opens a real SMTP socket, which the Edge runtime can't do.
export const runtime = 'nodejs'

/** Longest we'll accept per field — a real enquiry never needs more, and it
 *  keeps a bot from posting a novel through the form. */
const LIMITS = { name: 120, email: 200, phone: 60, company: 200, role: 200, message: 5000 } as const

type Field = keyof typeof LIMITS

export type ContactResponse = { ok: true } | { ok: false; error: string }

function clean(value: unknown, field: Field): string {
  return typeof value === 'string' ? value.trim().slice(0, LIMITS[field]) : ''
}

export async function POST(req: NextRequest): Promise<NextResponse<ContactResponse>> {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  // Bots fill every field they can see; this one is hidden, so anything in it is a bot.
  if (clean(body.website, 'name')) return NextResponse.json({ ok: true })

  const name = clean(body.name, 'name')
  const email = clean(body.email, 'email')
  const phone = clean(body.phone, 'phone')
  const company = clean(body.company, 'company')
  const role = clean(body.role, 'role')
  const message = clean(body.message, 'message')

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
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
    console.error('[contact] GMAIL_USER / GMAIL_APP_PASSWORD are not set')
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 })
  }

  const rows: [string, string][] = [
    ['שם', name], ['אימייל', email], ['טלפון', phone], ['חברה', company], ['תפקיד', role],
  ].filter((r): r is [string, string] => Boolean(r[1]))

  const esc = (s: string) => s.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]!))

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
      replyTo: `"${name}" <${email}>`,
      subject: `פנייה מהאתר - ${name}`,
      text: [...rows.map(([k, v]) => `${k}: ${v}`), '', message].join('\n'),
      html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6">
        ${rows.map(([k, v]) => `<p style="margin:0 0 4px"><b>${k}:</b> ${esc(v)}</p>`).join('')}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
        <p style="margin:0;white-space:pre-wrap">${esc(message)}</p>
      </div>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] send failed:', err)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }
}
