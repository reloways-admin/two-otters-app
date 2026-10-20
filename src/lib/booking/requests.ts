import { randomUUID } from 'node:crypto'
import { NotConfiguredError, type Env, type Lead, type LeadRecorder } from '@/lib/integrations/ports'
import { withRetry } from '@/lib/integrations/retry'
import type { BOOKING, BookingHost } from '@/config/booking'
import { ConflictError, type CalendarPort, type StoredEvent } from './calendar'
import { approvalEmail, declinedEmail, expiredEmail, heName, inviteEmail, when, type Lang, type RequestSummary } from './emails'
import { buildIcs } from './ics'
import { linkSecret, signLink, verifyLink, type Decision } from './links'
import type { BookingMailer } from './mailer'

/**
 * A booking is a request until both hosts say yes.
 *
 *   request   → a private "Pending" hold in *each* host's calendar (their own
 *               token, no attendees, so no emails), and an email to each host
 *               with their own signed approve / decline links.
 *   approve   → recorded on the request. When the last host approves: the
 *               holds go, one meeting is created in the organizer's calendar
 *               with the other hosts as attendees (and a Meet link), and the
 *               visitor gets our own invitation email with an .ics. The visitor
 *               is never a Google attendee.
 *   decline   → holds go; the visitor is asked to pick another time.
 *   24 hours  → the holds stop blocking (made transparent the next time anyone
 *               reads availability), the links stop working, and the expiry
 *               job emails the visitor and removes the holds.
 *
 * There is no database. The request lives on the organizer's hold as private
 * extended properties, and once confirmed the meeting carries the request id,
 * so a late second click on a link still finds out what happened.
 */

export type Settings = typeof BOOKING

export interface FlowDeps {
  settings: Settings
  calendar: CalendarPort
  mailer: () => BookingMailer
  recorder: () => LeadRecorder
  env: Env
  now: number
  /** Absolute base for links in emails, e.g. https://two-otters.studio */
  baseUrl: string
}

export type RequestStatus = 'pending' | 'confirming' | 'confirmed' | 'declined' | 'expired'

export interface RequestRecord extends RequestSummary {
  rid: string
  status: RequestStatus
  createdAt: number
  /** Hold event id per host, the organizer's included. */
  holds: Record<string, string>
  /** Host id → when they approved. */
  approvals: Record<string, number>
}

export interface NewRequest {
  name: string
  email: string
  topic: string
  message: string
  timeZone: string
  lang: Lang
  start: number
}

const HOUR = 3_600_000
const KIND = 'twoOtters'

// ─── Request ⇄ event properties ─────────────────────────────────────────────
// Google keeps up to 1024 characters per value; the full message is also in
// the hold's description.

function toProps(r: RequestRecord): Record<string, string> {
  return {
    [KIND]: 'hold',
    primary: '1',
    rid: r.rid,
    status: r.status,
    createdAt: String(r.createdAt),
    start: String(r.start),
    end: String(r.end),
    holds: JSON.stringify(r.holds),
    approvals: JSON.stringify(r.approvals),
    name: r.name.slice(0, 200),
    email: r.email,
    topic: r.topic.slice(0, 200),
    message: r.message.slice(0, 1000),
    tz: r.timeZone,
    lang: r.lang,
  }
}

function fromEvent(e: StoredEvent): RequestRecord {
  const p = e.props
  const json = <T>(v: string | undefined, fallback: T): T => {
    try {
      return v ? (JSON.parse(v) as T) : fallback
    } catch {
      return fallback
    }
  }
  return {
    rid: p.rid,
    status: (p.status as RequestStatus) ?? 'pending',
    createdAt: Number(p.createdAt),
    start: Number(p.start),
    end: Number(p.end),
    holds: { ...json<Record<string, string>>(p.holds, {}) },
    approvals: json<Record<string, number>>(p.approvals, {}),
    name: p.name ?? '',
    email: p.email ?? '',
    topic: p.topic ?? '',
    message: p.message ?? '',
    timeZone: p.tz ?? '',
    lang: p.lang === 'en' ? 'en' : 'he',
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const organizerOf = (s: Settings): BookingHost => s.hosts.find(h => h.id === s.organizer) ?? s.hosts[0]
const holdMs = (s: Settings) => s.holdHours * HOUR
const firstName = (h: BookingHost) => heName(h)

/** BOOKING_HOST_EMAIL_<HOST>, then the config, then (outside production) a placeholder. */
export function hostEmail(host: BookingHost, env: Env): string {
  const fromEnv = env[`BOOKING_HOST_EMAIL_${host.id.toUpperCase()}`]
  if (fromEnv) return fromEnv.trim()
  if (host.email) return host.email
  if (env.NODE_ENV !== 'production') return `${host.id}@host.example.invalid`
  throw new NotConfiguredError(`booking host email (BOOKING_HOST_EMAIL_${host.id.toUpperCase()})`)
}

const bookUrl = (deps: FlowDeps, lang: Lang) => `${deps.baseUrl}/schedule-a-call${lang === 'en' ? '?lang=en' : ''}`

function describeHold(r: RequestRecord, hosts: BookingHost[]) {
  return [
    'ממתין לאישור של שניכם · two-otters.studio',
    '',
    `שם: ${r.name}`,
    `אימייל: ${r.email}`,
    r.topic && `נושא: ${r.topic}`,
    r.message && `\n${r.message}`,
    '',
    `אזור הזמן של המבקר: ${r.timeZone || 'לא ידוע'}`,
    `מארחים: ${hosts.map(h => h.name).join(', ')}`,
  ]
    .filter((line): line is string => typeof line === 'string')
    .join('\n')
}

function describeMeeting(r: RequestRecord, hosts: BookingHost[]) {
  return describeHold(r, hosts).replace('ממתין לאישור של שניכם', 'שיחת היכרות דרך two-otters.studio (אושרה על ידי שניכם)')
}

/** Is a pending request still alive at `now`? */
const alive = (r: RequestRecord, s: Settings, now: number) => r.status === 'pending' && r.createdAt + holdMs(s) > now

async function primaryHolds(deps: FlowDeps): Promise<{ event: StoredEvent; record: RequestRecord }[]> {
  const org = organizerOf(deps.settings)
  const events = await deps.calendar.findByProp(org.id, KIND, 'hold')
  return events.filter(e => e.props.primary === '1').map(event => ({ event, record: fromEvent(event) }))
}

async function quietly(step: string, fn: () => Promise<unknown>) {
  try {
    await fn()
  } catch (err) {
    console.error(`[booking] ${step} failed`, String(err))
  }
}

async function removeHolds(deps: FlowDeps, r: RequestRecord) {
  await Promise.all(
    Object.entries(r.holds).map(([hostId, id]) => quietly(`remove hold ${hostId}`, () => deps.calendar.deleteEvent(hostId, id)))
  )
}

/**
 * Read–modify–write of the request with the event's etag, retried when someone
 * else (the other host's click, the expiry job) wrote in between.
 */
async function mutate(
  deps: FlowDeps,
  rid: string,
  change: (r: RequestRecord) => Partial<RequestRecord> | null,
  extra: { transparent?: boolean } = {}
): Promise<{ record: RequestRecord; changed: boolean } | null> {
  const org = organizerOf(deps.settings)
  for (let attempt = 0; attempt < 5; attempt++) {
    const found = await findRequest(deps, rid)
    if (!found.hold) return null
    const current = fromEvent(found.hold)
    const next = change(current)
    if (!next) return { record: current, changed: false }
    const record = { ...current, ...next }
    try {
      await deps.calendar.updateEvent(org.id, found.hold.id, { props: toProps(record), ...extra }, found.hold.etag)
      return { record, changed: true }
    } catch (err) {
      if (err instanceof ConflictError) continue
      throw err
    }
  }
  throw new Error(`request ${rid}: too many concurrent updates`)
}

async function findRequest(deps: FlowDeps, rid: string) {
  const org = organizerOf(deps.settings)
  const events = await deps.calendar.findByProp(org.id, 'rid', rid)
  return {
    hold: events.find(e => e.props[KIND] === 'hold' && e.props.primary === '1') ?? null,
    meeting: events.find(e => e.props[KIND] === 'event') ?? null,
  }
}

// ─── Expiry ──────────────────────────────────────────────────────────────────

/**
 * Lazy expiry, run before availability is read: a request past its 24 hours
 * stops blocking. Its holds become transparent (so free/busy ignores them) and
 * it is marked expired; the expiry job later emails the visitor and deletes
 * the holds.
 */
export async function releaseStale(deps: FlowDeps): Promise<number> {
  let released = 0
  for (const { record } of await primaryHolds(deps)) {
    if (record.status !== 'pending' || alive(record, deps.settings, deps.now)) continue
    const result = await mutate(
      deps,
      record.rid,
      r => (r.status === 'pending' && !alive(r, deps.settings, deps.now) ? { status: 'expired' } : null),
      { transparent: true }
    )
    if (!result?.changed) continue
    released++
    const org = organizerOf(deps.settings)
    await Promise.all(
      Object.entries(result.record.holds)
        .filter(([hostId]) => hostId !== org.id)
        .map(([hostId, id]) =>
          quietly(`release hold ${hostId}`, () => deps.calendar.updateEvent(hostId, id, { transparent: true }))
        )
    )
  }
  return released
}

/** The scheduled half of expiry: tell each expired request's visitor, then clean up. */
export async function expireRequests(deps: FlowDeps): Promise<{ released: number; notified: number }> {
  const released = await releaseStale(deps)
  let notified = 0
  for (const { record } of await primaryHolds(deps)) {
    if (record.status !== 'expired') continue
    try {
      await deps.mailer().send(expiredEmail(record, bookUrl(deps, record.lang)))
    } catch (err) {
      // Keep the (transparent) hold, so the next run tries again.
      console.error('[booking] expiry email failed', { rid: record.rid, error: String(err) })
      continue
    }
    await removeHolds(deps, record)
    notified++
  }
  return { released, notified }
}

// ─── Request ─────────────────────────────────────────────────────────────────

export type RequestOutcome =
  | { ok: true; record: RequestRecord; expiresAt: number }
  | { ok: false; error: 'slot_taken' }

/**
 * Called after the slot was re-checked against the calendars. Writes the holds,
 * then makes sure no other request grabbed the same time in the meantime.
 */
export async function createRequest(deps: FlowDeps, input: NewRequest): Promise<RequestOutcome> {
  const { settings, calendar } = deps
  const org = organizerOf(settings)
  const record: RequestRecord = {
    ...input,
    rid: randomUUID(),
    status: 'pending',
    createdAt: deps.now,
    end: input.start + settings.durationMin * 60_000,
    holds: {},
    approvals: {},
  }
  const hold = () => ({
    start: record.start,
    end: record.end,
    summary: `Pending: Two Otters call (${record.name})`,
    description: describeHold(record, settings.hosts),
    props: { [KIND]: 'hold', rid: record.rid },
  })

  try {
    // Everyone else's hold first; the organizer's carries the whole request,
    // so it is written last, once every hold id is known.
    for (const host of settings.hosts.filter(h => h.id !== org.id)) {
      record.holds[host.id] = (await calendar.createHold(host.id, hold())).id
    }
    const primary = await calendar.createHold(org.id, { ...hold(), props: toProps(record) })
    record.holds[org.id] = primary.id
    await calendar.updateEvent(org.id, primary.id, { props: toProps(record) }, primary.etag)
  } catch (err) {
    await removeHolds(deps, record)
    throw err
  }

  // Two visitors on the same slot at the same moment both pass the free/busy
  // check. The earlier request keeps it; the later one backs out.
  const rivals = (await primaryHolds(deps)).filter(
    ({ record: r }) =>
      r.rid !== record.rid &&
      alive(r, settings, deps.now) &&
      r.start < record.end &&
      record.start < r.end &&
      (r.createdAt < record.createdAt || (r.createdAt === record.createdAt && r.rid < record.rid))
  )
  if (rivals.length) {
    await removeHolds(deps, record)
    return { ok: false, error: 'slot_taken' }
  }

  const expiresAt = record.createdAt + holdMs(settings)
  const secret = linkSecret(deps.env)
  const link = (host: BookingHost, a: Decision) =>
    `${deps.baseUrl}/api/booking/decide?t=${signLink({ r: record.rid, h: host.id, a, e: expiresAt }, secret)}`

  try {
    for (const host of settings.hosts) {
      await deps.mailer().send(
        approvalEmail({
          host: { ...host, email: hostEmail(host, deps.env) },
          hosts: settings.hosts,
          request: record,
          approveUrl: link(host, 'approve'),
          declineUrl: link(host, 'decline'),
          expiresAt,
        })
      )
    }
  } catch (err) {
    // Nobody can approve a request they never heard about. Back out cleanly.
    await removeHolds(deps, record)
    throw err
  }

  await quietly('record booking-request lead', () => withRetry(() => deps.recorder().record(toLead(record))))
  return { ok: true, record, expiresAt }
}

function toLead(r: RequestRecord): Lead {
  return {
    form: 'booking',
    title: `בקשת שיחה - ${r.name}`,
    tags: ['booking-request'],
    dueDate: r.start,
    fields: { email: r.email, topic: r.topic || null, start: new Date(r.start).toISOString(), request: r.rid },
    rows: (
      [
        ['שם', r.name],
        ['אימייל', r.email],
        ['מועד (שעון ישראל)', when(r.start, 'Asia/Jerusalem', 'he')],
        ['נושא', r.topic],
        ['הודעה', r.message],
        ['אזור הזמן של המבקר', r.timeZone],
        ['סטטוס', 'ממתין לאישור של אמיר וקרן (24 שעות)'],
      ] as [string, string][]
    ).filter(([, v]) => Boolean(v)),
    replyTo: { email: r.email, name: r.name },
  }
}

// ─── Decide ──────────────────────────────────────────────────────────────────

export type DecideOutcome =
  | 'ready'
  | 'invalid'
  | 'expired'
  | 'closed'
  | 'declined'
  | 'already_declined'
  | 'approved'
  | 'already_approved'
  | 'confirmed'
  | 'already_confirmed'
  | 'in_progress'

export interface DecideResult {
  outcome: DecideOutcome
  record?: RequestRecord
  /** First names of hosts who have not approved yet. */
  waitingFor?: string[]
  /** Set when the meeting exists but the visitor's invitation could not be sent. */
  inviteFailed?: boolean
}

/** What a link would do, without doing it — for the confirmation page. */
export async function inspectLink(deps: FlowDeps, token: string): Promise<DecideResult & { decision?: Decision; hostName?: string }> {
  const check = verifyLink(token, linkSecret(deps.env), deps.now)
  if (!check.ok) return { outcome: check.reason }
  const host = deps.settings.hosts.find(h => h.id === check.claims.h)
  if (!host) return { outcome: 'invalid' }
  const found = await findRequest(deps, check.claims.r)
  if (found.meeting) return { outcome: 'already_confirmed', decision: check.claims.a, hostName: firstName(host) }
  if (!found.hold) return { outcome: 'closed' }
  const record = fromEvent(found.hold)
  if (!alive(record, deps.settings, deps.now)) return { outcome: record.status === 'pending' ? 'expired' : 'closed', record }
  if (check.claims.a === 'approve' && record.approvals[host.id]) {
    return { outcome: 'already_approved', record, decision: 'approve', hostName: firstName(host), waitingFor: waiting(deps, record) }
  }
  return { outcome: 'ready', record, decision: check.claims.a, hostName: firstName(host), waitingFor: waiting(deps, record) }
}

const waiting = (deps: FlowDeps, r: RequestRecord) =>
  deps.settings.hosts.filter(h => !r.approvals[h.id]).map(firstName)

export async function decide(deps: FlowDeps, token: string): Promise<DecideResult> {
  const check = verifyLink(token, linkSecret(deps.env), deps.now)
  if (!check.ok) return { outcome: check.reason }
  const { r: rid, h: hostId, a: decision } = check.claims
  const host = deps.settings.hosts.find(h => h.id === hostId)
  if (!host) return { outcome: 'invalid' }

  const found = await findRequest(deps, rid)
  if (found.meeting) return { outcome: 'already_confirmed' }
  if (!found.hold) return { outcome: 'closed' }

  if (decision === 'decline') {
    const result = await mutate(deps, rid, r => (alive(r, deps.settings, deps.now) ? { status: 'declined' } : null))
    if (!result) return { outcome: 'closed' }
    if (!result.changed) {
      const r = result.record
      if (r.status === 'declined') return { outcome: 'already_declined', record: r }
      if (r.status === 'pending') return { outcome: 'expired', record: r }
      return { outcome: r.status === 'confirming' ? 'in_progress' : 'closed', record: r }
    }
    await removeHolds(deps, result.record)
    await quietly('decline email', () =>
      deps.mailer().send(declinedEmail(result.record, bookUrl(deps, result.record.lang)))
    )
    return { outcome: 'declined', record: result.record }
  }

  // Approve: record this host's yes (once), then see whether everyone has said it.
  const recorded = await mutate(deps, rid, r =>
    alive(r, deps.settings, deps.now) && !r.approvals[hostId] ? { approvals: { ...r.approvals, [hostId]: deps.now } } : null
  )
  if (!recorded) return { outcome: 'closed' }
  let record = recorded.record
  if (!alive(record, deps.settings, deps.now)) {
    if (record.status === 'pending') return { outcome: 'expired', record }
    if (record.status === 'declined') return { outcome: 'closed', record }
    return { outcome: record.status === 'confirming' ? 'in_progress' : 'closed', record }
  }
  const missing = waiting(deps, record)
  if (missing.length) {
    return { outcome: recorded.changed ? 'approved' : 'already_approved', record, waitingFor: missing }
  }

  // Everyone approved. Claim the confirmation, so two last clicks at the same
  // moment create one meeting, not two.
  const claimed = await mutate(deps, rid, r =>
    alive(r, deps.settings, deps.now) && deps.settings.hosts.every(h => r.approvals[h.id]) ? { status: 'confirming' } : null
  )
  if (!claimed?.changed) return { outcome: claimed?.record.status === 'confirming' ? 'in_progress' : 'already_approved', record }
  record = claimed.record
  return confirm(deps, record)
}

async function confirm(deps: FlowDeps, record: RequestRecord): Promise<DecideResult> {
  const { settings, calendar } = deps
  const org = organizerOf(settings)
  let meeting
  try {
    meeting = await calendar.createEvent(org.id, {
      start: record.start,
      end: record.end,
      summary: `Two Otters × ${record.name}`,
      description: describeMeeting(record, settings.hosts),
      // The other hosts, so the meeting is in their calendars too. Not the
      // visitor: their invitation is ours, from amir@two-otters.studio.
      attendees: settings.hosts
        .filter(h => h.id !== org.id)
        .map(h => ({ email: hostEmail(h, deps.env), name: h.name })),
      props: { [KIND]: 'event', rid: record.rid },
    })
  } catch (err) {
    // Put the request back, approvals kept, so clicking again retries.
    await quietly('reopen request', () => mutate(deps, record.rid, () => ({ status: 'pending' })))
    throw err
  }

  await removeHolds(deps, record)

  const from = deps.env.BOOKING_FROM_EMAIL || 'amir@two-otters.studio'
  const ics = buildIcs({
    uid: `${record.rid}@two-otters.studio`,
    start: record.start,
    end: record.end,
    stamp: deps.now,
    summary: record.lang === 'he' ? 'שיחת היכרות עם Two Otters' : 'Intro call with Two Otters',
    description: [
      record.lang === 'he'
        ? `שיחת היכרות של ${settings.durationMin} דקות עם ${settings.hosts.map(heName).join(' ו')}.`
        : `A ${settings.durationMin}-minute intro call with ${settings.hosts.map(h => h.name).join(' and ')}.`,
      meeting.meetUrl ? `Google Meet: ${meeting.meetUrl}` : '',
      record.topic ? `${record.lang === 'he' ? 'נושא' : 'Topic'}: ${record.topic}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
    url: meeting.meetUrl,
    organizer: { name: deps.env.BOOKING_FROM_NAME || org.name, email: from },
    attendees: [{ name: record.name, email: record.email }],
  })

  let inviteFailed = false
  try {
    await deps.mailer().send(inviteEmail(record, meeting.meetUrl, ics))
  } catch (err) {
    inviteFailed = true
    console.error('[booking] invitation email failed — the meeting exists; send it by hand', {
      rid: record.rid,
      visitor: record.email,
      start: new Date(record.start).toISOString(),
      error: String(err),
    })
  }
  return { outcome: 'confirmed', record: { ...record, status: 'confirmed' }, inviteFailed }
}
