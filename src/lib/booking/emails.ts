import type { BookingMail } from './mailer'

/**
 * The words in every booking email. Hosts read Hebrew; the visitor reads the
 * language of the page they booked from.
 *
 * Plain inline-styled HTML on purpose: mail clients ignore stylesheets, and
 * nothing here should depend on images loading.
 */

export type Lang = 'he' | 'en'

export interface RequestSummary {
  name: string
  email: string
  topic: string
  message: string
  /** The visitor's IANA zone, as their browser reported it. May be empty. */
  timeZone: string
  start: number
  end: number
  lang: Lang
}

export interface HostRef {
  id: string
  name: string
  nameHe?: string
  timeZone: string
}

/** The first name a Hebrew sentence uses. */
export const heName = (h: { name: string; nameHe?: string }) => h.nameHe ?? h.name.split(' ')[0]

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function safeZone(zone: string, fallback: string) {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: zone })
    return zone || fallback
  } catch {
    return fallback
  }
}

export function when(ms: number, zone: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'he' ? 'he-IL' : 'en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    hourCycle: 'h23',
    timeZone: safeZone(zone, 'Asia/Jerusalem'),
  }).format(ms)
}

function frame(lang: Lang, body: string) {
  const dir = lang === 'he' ? 'rtl' : 'ltr'
  const align = lang === 'he' ? 'right' : 'left'
  return `<!doctype html><html lang="${lang}" dir="${dir}"><body style="margin:0;padding:24px;background:#f6f4ef">
<div dir="${dir}" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#14213d;text-align:${align}">
${body}
<p style="margin:28px 0 0;color:#6b7280;font-size:13px">Two Otters Studio · two-otters.studio</p>
</div></body></html>`
}

const button = (href: string, label: string, color: string) =>
  `<a href="${esc(href)}" style="display:inline-block;padding:12px 22px;margin:0 0 8px 8px;border-radius:999px;background:${color};color:#ffffff;text-decoration:none;font-weight:bold">${esc(label)}</a>`

const rows = (pairs: [string, string][]) =>
  `<table role="presentation" style="border-collapse:collapse;margin:16px 0">${pairs
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 0 4px 16px;color:#6b7280;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`
    )
    .join('')}</table>`

/** To one host: a new request, with this host's own approve / decline links. */
export function approvalEmail(input: {
  host: HostRef & { email: string }
  hosts: HostRef[]
  request: RequestSummary
  approveUrl: string
  declineUrl: string
  expiresAt: number
}): BookingMail {
  const { host, hosts, request: r } = input
  const times: [string, string][] = hosts.map(h => [`אצל ${heName(h)}`, when(r.start, h.timeZone, 'he')])
  const pairs: [string, string][] = [
    ['שם', r.name],
    ['אימייל', r.email],
    ['נושא', r.topic],
    ...times,
    ['אצל המבקר', r.timeZone ? `${when(r.start, r.timeZone, 'he')} (${r.timeZone})` : ''],
    ['הודעה', r.message],
  ]
  const deadline = when(input.expiresAt, host.timeZone, 'he')
  const subject = `בקשה לשיחת היכרות: ${r.name}, ${when(r.start, host.timeZone, 'he')}`
  const text = [
    `${heName(host)}, יש בקשה חדשה לשיחת היכרות.`,
    '',
    ...pairs.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    '',
    `לאשר: ${input.approveUrl}`,
    `לדחות: ${input.declineUrl}`,
    '',
    `השיחה נקבעת רק כששניכם מאשרים. אם לא תאושר עד ${deadline}, הבקשה פגה והמועד משתחרר.`,
  ].join('\n')
  const html = frame(
    'he',
    `<p style="margin:0 0 8px;font-size:20px;font-weight:bold">בקשה חדשה לשיחת היכרות</p>
<p style="margin:0">${esc(heName(host))}, ${esc(r.name)} ביקש/ה שיחה של 30 דקות.</p>
${rows(pairs)}
<p style="margin:16px 0 8px">${button(input.approveUrl, 'לאשר את המועד', '#1f7a4d')}${button(input.declineUrl, 'לדחות', '#9b2c2c')}</p>
<p style="margin:8px 0 0;color:#6b7280;font-size:14px">השיחה נקבעת רק כששניכם מאשרים. אם לא תאושר עד ${esc(deadline)}, הבקשה פגה והמועד משתחרר. הקישורים האלה אישיים, אל תעבירו אותם הלאה.</p>`
  )
  return { to: [{ email: host.email, name: host.name }], subject, text, html, replyTo: { email: r.email, name: r.name } }
}

const COPY = {
  he: {
    inviteSubject: (w: string) => `נקבע: שיחת היכרות עם Two Otters, ${w}`,
    inviteTitle: 'השיחה נקבעה',
    inviteBody: (w: string, names: string) =>
      `נתראה ב${w}. בשיחה יהיו ${names}. ההזמנה מצורפת, כך שאפשר להוסיף אותה ליומן בלחיצה.`,
    meet: 'קישור לשיחה (Google Meet)',
    reply: 'צריך להזיז? פשוט עונים למייל הזה.',
    declinedSubject: 'לגבי בקשת השיחה עם Two Otters',
    declinedTitle: 'המועד הזה לא מסתדר לנו',
    declinedBody: (w: string) => `תודה שביקשתם שיחה. לצערנו ${w} לא מסתדר לנו. נשמח אם תבחרו מועד אחר:`,
    expiredSubject: 'בקשת השיחה עם Two Otters פגה',
    expiredTitle: 'לא הספקנו לאשר את המועד',
    expiredBody: (w: string) => `סליחה, לא הספקנו לאשר את הבקשה לשיחה ב${w} בזמן, והמועד שוחרר. נשמח אם תבחרו מועד חדש:`,
    pick: 'לבחירת מועד',
    names: 'אמיר וקרן',
  },
  en: {
    inviteSubject: (w: string) => `Confirmed: intro call with Two Otters, ${w}`,
    inviteTitle: 'Your call is booked',
    inviteBody: (w: string, names: string) =>
      `See you on ${w}, with ${names}. The invitation is attached, so it goes into your calendar in one click.`,
    meet: 'Join link (Google Meet)',
    reply: 'Need to move it? Just reply to this email.',
    declinedSubject: 'About your call request with Two Otters',
    declinedTitle: 'That time doesn’t work for us',
    declinedBody: (w: string) => `Thanks for asking for a call. Unfortunately ${w} doesn’t work for us. Please pick another time:`,
    expiredSubject: 'Your call request with Two Otters expired',
    expiredTitle: 'We didn’t confirm in time',
    expiredBody: (w: string) => `Sorry, we didn’t confirm your request for ${w} in time, and the slot was released. Please pick a new time:`,
    pick: 'Pick a time',
    names: 'Amir and Keren',
  },
}

const visitor = (r: RequestSummary) => [{ email: r.email, name: r.name }]

export function inviteEmail(r: RequestSummary, meetUrl: string | undefined, ics: string): BookingMail {
  const c = COPY[r.lang]
  const w = when(r.start, r.timeZone, r.lang)
  const text = [c.inviteTitle, '', c.inviteBody(w, c.names), meetUrl ? `\n${c.meet}: ${meetUrl}` : '', '', c.reply].join('\n')
  const html = frame(
    r.lang,
    `<p style="margin:0 0 8px;font-size:20px;font-weight:bold">${esc(c.inviteTitle)}</p>
<p style="margin:0 0 16px">${esc(c.inviteBody(w, c.names))}</p>
${meetUrl ? `<p style="margin:0 0 16px">${button(meetUrl, c.meet, '#14213d')}</p>` : ''}
<p style="margin:0;color:#6b7280;font-size:14px">${esc(c.reply)}</p>`
  )
  return { to: visitor(r), subject: c.inviteSubject(w), text, html, ics }
}

export function declinedEmail(r: RequestSummary, bookUrl: string): BookingMail {
  const c = COPY[r.lang]
  const w = when(r.start, r.timeZone, r.lang)
  return {
    to: visitor(r),
    subject: c.declinedSubject,
    text: [c.declinedTitle, '', c.declinedBody(w), bookUrl].join('\n'),
    html: frame(
      r.lang,
      `<p style="margin:0 0 8px;font-size:20px;font-weight:bold">${esc(c.declinedTitle)}</p>
<p style="margin:0 0 16px">${esc(c.declinedBody(w))}</p>
<p style="margin:0">${button(bookUrl, c.pick, '#14213d')}</p>`
    ),
  }
}

export function expiredEmail(r: RequestSummary, bookUrl: string): BookingMail {
  const c = COPY[r.lang]
  const w = when(r.start, r.timeZone, r.lang)
  return {
    to: visitor(r),
    subject: c.expiredSubject,
    text: [c.expiredTitle, '', c.expiredBody(w), bookUrl].join('\n'),
    html: frame(
      r.lang,
      `<p style="margin:0 0 8px;font-size:20px;font-weight:bold">${esc(c.expiredTitle)}</p>
<p style="margin:0 0 16px">${esc(c.expiredBody(w))}</p>
<p style="margin:0">${button(bookUrl, c.pick, '#14213d')}</p>`
    ),
  }
}
