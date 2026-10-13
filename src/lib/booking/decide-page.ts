import type { BOOKING } from '@/config/booking'
import { heName, when } from './emails'
import type { DecideResult } from './requests'
import type { Decision } from './links'

/**
 * The small page behind a host's approve / decline link. Hosts only, Hebrew,
 * no site chrome: it has to work from a phone's mail app and say clearly what
 * just happened.
 *
 * Opening the link never decides anything. Mail security scanners open links
 * to check them, so the page asks for one click (a POST) first.
 */

type Outcome = DecideResult['outcome'] | 'error'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const MESSAGES: Record<Exclude<Outcome, 'ready'>, [string, string]> = {
  invalid: ['הקישור לא תקין', 'אולי הוא נחתך בהעתקה. פתחו אותו שוב מהמייל המקורי.'],
  expired: ['הבקשה פגה', 'עברו 24 שעות בלי אישור של שניכם, והמועד שוחרר. המבקר יקבל מייל לבחור מועד אחר.'],
  closed: ['הבקשה כבר לא פתוחה', 'היא נדחתה או פגה, ואין מה לעשות איתה עכשיו.'],
  declined: ['הבקשה נדחתה', 'המועד שוחרר מהיומנים, והמבקר קיבל מייל לבחור מועד אחר.'],
  already_declined: ['הבקשה כבר נדחתה', 'לא השתנה כלום.'],
  approved: ['אישרת, תודה', 'השיחה תיקבע אחרי האישור של {waiting}.'],
  already_approved: ['כבר אישרת את הבקשה הזאת', 'לא השתנה כלום. מחכים לאישור של {waiting}.'],
  confirmed: ['השיחה נקבעה', 'הפגישה נוצרה ביומן של שניכם עם קישור Meet, והמבקר קיבל הזמנה במייל.'],
  already_confirmed: ['השיחה כבר נקבעה', 'לא השתנה כלום. הפגישה נמצאת ביומן.'],
  in_progress: ['השיחה נקבעת ממש עכשיו', 'אישור אחר נקלט באותו רגע. רעננו בעוד כמה שניות.'],
  error: ['משהו השתבש', 'לא הצלחנו להשלים את הפעולה. נסו שוב בעוד רגע.'],
}

export function decidePage(input: {
  outcome: Outcome
  stage: 'confirm' | 'done'
  settings: typeof BOOKING
  token?: string
  decision?: Decision
  hostName?: string
  record?: DecideResult['record']
  waitingFor?: string[]
  inviteFailed?: boolean
}): string {
  const { outcome, record } = input
  const details = record
    ? `<dl>
<dt>מבקר</dt><dd>${esc(record.name)} · <span dir="ltr">${esc(record.email)}</span></dd>
${input.settings.hosts.map(h => `<dt>אצל ${esc(heName(h))}</dt><dd>${esc(when(record.start, h.timeZone, 'he'))}</dd>`).join('\n')}
${record.topic ? `<dt>נושא</dt><dd>${esc(record.topic)}</dd>` : ''}
${record.message ? `<dt>הודעה</dt><dd style="white-space:pre-wrap">${esc(record.message)}</dd>` : ''}
</dl>`
    : ''

  let body: string
  if (outcome === 'ready' && input.stage === 'confirm' && input.token) {
    const approve = input.decision === 'approve'
    body = `<h1>${approve ? 'לאשר את השיחה?' : 'לדחות את הבקשה?'}</h1>
<p>${esc(input.hostName ?? '')}, ${approve ? 'השיחה נקבעת רק כששניכם מאשרים.' : 'המועד ישתחרר והמבקר יקבל מייל לבחור מועד אחר.'}</p>
${details}
<form method="post" action="/api/booking/decide">
<input type="hidden" name="t" value="${esc(input.token)}">
<button type="submit" class="${approve ? 'ok' : 'no'}">${approve ? 'כן, לאשר' : 'כן, לדחות'}</button>
</form>`
  } else {
    const key = (outcome === 'ready' ? 'error' : outcome) as Exclude<Outcome, 'ready'>
    const [title, text] = MESSAGES[key]
    const waiting = (input.waitingFor ?? []).join(' ו') || 'השותף/ה'
    body = `<h1>${esc(title)}</h1>
<p>${esc(text.replace('{waiting}', waiting))}</p>
${input.inviteFailed ? '<p class="warn">שימו לב: הפגישה נוצרה, אבל מייל ההזמנה למבקר לא נשלח. כדאי לשלוח לו הזמנה ידנית.</p>' : ''}
${details}`
  }

  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Two Otters · אישור שיחה</title>
<style>
  body { margin: 0; padding: 24px; background: #f6f4ef; font: 17px/1.55 Arial, Helvetica, sans-serif; color: #14213d; }
  main { max-width: 520px; margin: 8vh auto 0; background: #fff; border-radius: 14px; padding: 28px; }
  h1 { font-size: 24px; margin: 0 0 8px; }
  dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; margin: 20px 0; }
  dt { color: #6b7280; } dd { margin: 0; }
  button { font: inherit; font-weight: bold; color: #fff; border: 0; border-radius: 999px; padding: 12px 26px; cursor: pointer; }
  .ok { background: #1f7a4d; } .no { background: #9b2c2c; }
  .warn { background: #fff4e5; border-radius: 8px; padding: 10px 12px; }
  small { color: #6b7280; }
</style>
</head>
<body><main>
${body}
<p><small>Two Otters Studio</small></p>
</main></body>
</html>`
}
