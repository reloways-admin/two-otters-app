import type { Host } from '@/lib/booking/slots'

/**
 * The "schedule a call" rules — who hosts, when, and for how long.
 *
 * Decided 6.10.2026 (Amir + Keren): our own booking UI on top of both founders'
 * Google calendars, rather than Cal.com's paid Teams plan. The reasoning lives
 * in decisions.md (row 19) and section 12 of the next-site report.
 *
 * Config, not secrets: the refresh tokens that let us read and write these
 * calendars live in the environment (see .env.example), never here.
 */

export interface BookingHost extends Host {
  name: string
  /** Invited to every call. Empty until the two-otters.studio mailboxes exist. */
  email: string
}

/** Same window on Sunday through Thursday. */
const sundayToThursday = (open: string, close: string): Host['hours'] =>
  Object.fromEntries([0, 1, 2, 3, 4].map(day => [day, [[open, close]]]))

export const BOOKING = {
  durationMin: 30,
  /** Kept clear before and after anything already in either calendar. */
  bufferMin: 15,
  minNoticeHours: 12,
  horizonDays: 30,

  /** Whose calendar the event is created in. Everyone else is invited. */
  organizer: 'amir',

  // PLACEHOLDER HOURS — Amir and Keren haven't set theirs yet. Each host's
  // hours are in their own zone; the visitor is only ever offered the overlap.
  hosts: [
    {
      id: 'amir',
      name: 'Amir Shalev',
      email: '',
      timeZone: 'Europe/Berlin',
      hours: sundayToThursday('09:00', '17:00'),
    },
    {
      id: 'keren',
      name: 'Keren Reitler',
      email: '',
      timeZone: 'Asia/Bangkok',
      hours: sundayToThursday('09:00', '17:00'),
    },
  ] as BookingHost[],
}
