/**
 * Shared rules for the audit intake form.
 *
 * These run on the client for instant feedback and again on the server, which
 * is the copy that actually counts — anything enforced only in the browser is a
 * suggestion, not a rule.
 */

/** Longest we accept per field. A real enquiry never needs more, and it stops a
 *  bot posting a novel through the form. */
export const LIMITS = { firstName: 80, email: 200, url: 2048, relationship: 40 } as const

/** Mailbox providers that tell us nothing about which company someone is from.
 *  A personal address is not suspicious, it just means the domain check can
 *  never match, so we ask the relationship question instead of guessing. */
const CONSUMER_MAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'ymail.com', 'hotmail.com',
  'outlook.com', 'live.com', 'msn.com', 'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'zoho.com',
  'walla.com', 'walla.co.il', 'nana10.co.il', '013net.net',
])

/** Throwaway inboxes. The report would be sent into a void, so we say so rather
 *  than letting someone wait two days for mail they will never see. */
const DISPOSABLE_MAIL_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'throwawaymail.com', 'yopmail.com',
  'trashmail.com', 'sharklasers.com', 'getnada.com', 'dispostable.com',
  'maildrop.cc', 'fakeinbox.com', 'mailnesia.com', 'mohmal.com', 'emailondeck.com',
])

export function clean(value: unknown, field: keyof typeof LIMITS): string {
  return typeof value === 'string' ? value.trim().slice(0, LIMITS[field]) : ''
}

/** Deliberately permissive. Address syntax is far stranger than most patterns
 *  allow, and the real proof of a working address is that the report arrives. */
export function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/.test(email)
}

export function emailDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase().replace(/\.$/, '') ?? ''
}

export function isDisposableEmail(email: string): boolean {
  return DISPOSABLE_MAIL_DOMAINS.has(emailDomain(email))
}

export function isConsumerEmail(email: string): boolean {
  return CONSUMER_MAIL_DOMAINS.has(emailDomain(email))
}

/**
 * Pull the registrable-ish host out of whatever someone pasted. People paste
 * "example.com", "www.example.com/pricing?utm=x" and "Example.com " equally
 * often, so accept all of them and normalise.
 * Returns '' when it cannot be read as a host at all.
 */
export function normaliseSiteHost(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return ''
  // A bare host has no scheme; URL() demands one, so add a throwaway.
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  let host: string
  try {
    host = new URL(withScheme).hostname.toLowerCase()
  } catch {
    return ''
  }
  if (!host.includes('.') || host.endsWith('.')) return ''
  return host.replace(/^www\./, '')
}

/** True when the host looks like something we could actually fetch. */
export function isValidSiteUrl(raw: string): boolean {
  const host = normaliseSiteHost(raw)
  // Needs a label and a TLD of at least two letters; rejects "localhost", "a.b".
  return /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(host)
}

/**
 * Does the address they gave us belong to the site they asked us to look at?
 *
 * amir@redigma.com + www.redigma.com  -> true, no need to ask who they are
 * amir801@gmail.com + www.redigma.com -> false, so we ask
 *
 * Subdomains count as the same organisation in both directions, so
 * mail.redigma.com and shop.redigma.com both match redigma.com.
 */
export function emailMatchesSite(email: string, siteUrl: string): boolean {
  const mail = emailDomain(email)
  const site = normaliseSiteHost(siteUrl)
  if (!mail || !site) return false
  // A consumer mailbox tells us nothing about the company, so it never matches
  // even in the odd case where the strings line up.
  if (isConsumerEmail(email)) return false
  return mail === site || mail.endsWith(`.${site}`) || site.endsWith(`.${mail}`)
}

/** Whether step 4's "what is your connection to this site?" question applies. */
export function needsRelationshipQuestion(email: string, siteUrl: string): boolean {
  if (!isValidEmail(email) || !isValidSiteUrl(siteUrl)) return false
  return !emailMatchesSite(email, siteUrl)
}

const HE_DAYS = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת']
const EN_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * When the report is promised for. The screen says "within 1-2 business days",
 * so we quote the far end of that and count in business days — Friday and
 * Saturday are the weekend here, and a Thursday request that promised "Saturday"
 * would be a promise we cannot keep.
 *
 * Deliberately takes `from` so it can be tested without waiting for a Thursday.
 */
export function deliveryDate(from: Date = new Date(), businessDays = 2): Date {
  const d = new Date(from)
  let left = businessDays
  while (left > 0) {
    d.setDate(d.getDate() + 1)
    const day = d.getDay() // 5 = Friday, 6 = Saturday
    if (day !== 5 && day !== 6) left--
  }
  return d
}

/** "יום שני, 09.09" / "Monday, 09.09" */
export function formatDeliveryDate(date: Date, lang: 'he' | 'en'): string {
  const days = lang === 'he' ? HE_DAYS : EN_DAYS
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${days[date.getDay()]}, ${dd}.${mm}`
}

export const RELATIONSHIP_VALUES = ['owner', 'employee', 'consultant', 'other'] as const
export type Relationship = (typeof RELATIONSHIP_VALUES)[number]

export function isRelationship(value: string): value is Relationship {
  return (RELATIONSHIP_VALUES as readonly string[]).includes(value)
}
