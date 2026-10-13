import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import { DeliveryError, NotConfiguredError, type Env } from '@/lib/integrations/ports'

/**
 * Booking's own email: approval requests to the hosts, and the visitor's
 * invitation (with an .ics), decline and expiry notes.
 *
 * Separate from the forms' Mailer port on purpose: those send Brevo templates
 * to visitors only, while booking writes to the hosts too, carries an
 * attachment, and must come from amir@two-otters.studio. That address is a
 * Gmail send-as alias, so the real adapter is plain SMTP (smtp.gmail.com, an
 * app password of the mailbox that owns the alias).
 *
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS     the SMTP login
 *   BOOKING_FROM_EMAIL, BOOKING_FROM_NAME          the From line
 *   BOOKING_TEST_ALLOWLIST                         see withAllowlist
 *
 * Outside production, and whenever the calendar is the mock, mail goes to the
 * outbox instead: the console, plus an .eml/.ics pair per message under
 * `.next/cache/booking-outbox` (or BOOKING_OUTBOX_DIR) to open by hand.
 */

export interface BookingMail {
  to: { email: string; name?: string }[]
  subject: string
  text: string
  html: string
  /** An iCalendar invitation (METHOD:REQUEST), sent as a calendar part. */
  ics?: string
  replyTo?: { email: string; name?: string }
}

export interface SendResult {
  id: string
  delivered: string[]
  dropped: string[]
}

export interface BookingMailer {
  readonly name: string
  send(mail: BookingMail): Promise<SendResult>
}

/** A Vercel preview runs a production build, but it is not production. */
export function isProduction(env: Env): boolean {
  return env.VERCEL_ENV ? env.VERCEL_ENV === 'production' : env.NODE_ENV === 'production'
}

const smtpConfigured = (env: Env) =>
  Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.BOOKING_FROM_EMAIL)

function sender(env: Env) {
  const email = env.BOOKING_FROM_EMAIL || 'amir@two-otters.studio'
  return { email, name: env.BOOKING_FROM_NAME || 'Two Otters Studio' }
}

function toMessage(mail: BookingMail, env: Env): Mail.Options {
  const from = sender(env)
  return {
    from: { name: from.name, address: from.email },
    to: mail.to.map(t => ({ name: t.name ?? '', address: t.email })),
    replyTo: mail.replyTo ? { name: mail.replyTo.name ?? '', address: mail.replyTo.email } : undefined,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    // As an inline calendar part *and* an attachment: Gmail and Outlook show
    // their RSVP card from the former, Apple Mail opens the latter.
    icalEvent: mail.ics ? { method: 'REQUEST', filename: 'invite.ics', content: mail.ics } : undefined,
    attachments: mail.ics
      ? [{ filename: 'invite.ics', content: mail.ics, contentType: 'application/ics; method=REQUEST; charset=utf-8' }]
      : undefined,
  }
}

export function createSmtpMailer(env: Env): BookingMailer {
  const port = Number(env.SMTP_PORT || 587)
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    // 465 is TLS from the first byte; 587 upgrades with STARTTLS, which we require.
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: env.SMTP_USER!, pass: env.SMTP_PASS! },
  })
  return {
    name: 'smtp',
    async send(mail) {
      try {
        const info = await transport.sendMail(toMessage(mail, env))
        return { id: info.messageId, delivered: mail.to.map(t => t.email), dropped: [] }
      } catch (err) {
        const code = (err as { responseCode?: number }).responseCode ?? null
        // Never log the error object whole: it can carry the SMTP command trail.
        throw new DeliveryError('smtp', code, (err as Error).message)
      }
    },
  }
}

/** Writes each message to disk and the console instead of sending it. */
export function createOutboxMailer(env: Env): BookingMailer {
  const dir = env.BOOKING_OUTBOX_DIR || join(cacheDir(), 'booking-outbox')
  const render = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'windows' })
  return {
    name: 'outbox',
    async send(mail) {
      const info = await render.sendMail(toMessage(mail, env))
      mkdirSync(/* turbopackIgnore: true */ dir, { recursive: true })
      const to = mail.to.map(t => t.email).join('+').replace(/[^A-Za-z0-9@.+-]+/g, '_').slice(0, 60)
      const base = join(dir, `${new Date().toISOString().replace(/[:.]/g, '-')}-to-${to}`)
      writeFileSync(/* turbopackIgnore: true */ `${base}.eml`, info.message as Buffer)
      if (mail.ics) writeFileSync(/* turbopackIgnore: true */ `${base}.ics`, mail.ics)
      console.info(
        [
          `\n── booking mail (outbox, not sent) ──`,
          `to:      ${mail.to.map(t => t.email).join(', ')}`,
          `subject: ${mail.subject}`,
          `file:    ${base}.eml${mail.ics ? ` (+ .ics)` : ''}`,
          mail.text,
          `─────────────────────────────────────\n`,
        ].join('\n')
      )
      return { id: `outbox-${Date.now().toString(36)}`, delivered: mail.to.map(t => t.email), dropped: [] }
    },
  }
}

/** Entries are full addresses, or "@domain" for a whole domain. */
export function parseAllowlist(raw: string | undefined): string[] {
  return (raw ?? '')
    .split(/[\s,;]+/)
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)
}

export function allowed(email: string, list: string[]): boolean {
  const addr = email.trim().toLowerCase()
  return list.some(entry => (entry.startsWith('@') ? addr.endsWith(entry) : addr === entry))
}

/**
 * BOOKING_TEST_ALLOWLIST: while it is set, mail to any address not on it is
 * dropped and logged, never sent. And outside production a *real* mailer with
 * an empty allowlist sends to nobody at all — so a local or preview run with
 * real credentials cannot write to a visitor, or to Keren, by accident.
 */
export function withAllowlist(mailer: BookingMailer, env: Env, { real }: { real: boolean }): BookingMailer {
  const list = parseAllowlist(env.BOOKING_TEST_ALLOWLIST)
  const refuseAll = real && !isProduction(env) && list.length === 0
  return {
    name: mailer.name,
    async send(mail) {
      const keep = mail.to.filter(t => !refuseAll && (list.length === 0 || allowed(t.email, list)))
      const dropped = mail.to.filter(t => !keep.includes(t)).map(t => t.email)
      if (dropped.length) {
        console.warn('[booking] mail dropped', {
          reason: refuseAll ? 'BOOKING_TEST_ALLOWLIST is empty outside production' : 'not on BOOKING_TEST_ALLOWLIST',
          dropped,
          subject: mail.subject,
        })
      }
      if (keep.length === 0) return { id: 'dropped', delivered: [], dropped }
      const result = await mailer.send({ ...mail, to: keep })
      return { ...result, dropped }
    },
  }
}

/**
 * SMTP when it is configured and the calendar is real; the outbox otherwise,
 * outside production. Production without SMTP fails loudly, like the calendar.
 */
export function getBookingMailer(env: Env = process.env, { mockCalendar }: { mockCalendar: boolean }): BookingMailer {
  if (smtpConfigured(env) && !mockCalendar) return withAllowlist(createSmtpMailer(env), env, { real: true })
  if (env.NODE_ENV === 'production') throw new NotConfiguredError('booking mail (SMTP_* / BOOKING_FROM_EMAIL)')
  return withAllowlist(createOutboxMailer(env), env, { real: false })
}

/** `.next/cache` of the running app — kept out of the build's file tracing. */
function cacheDir() {
  return join(/* turbopackIgnore: true */ process.cwd(), '.next/cache')
}
