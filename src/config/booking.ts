import type { Host } from '@/lib/booking/slots'

/**
 * The "schedule a call" rules — who hosts, when, and for how long.
 *
 * Decided 6.10.2026 (Amir + Keren): our own booking UI on top of both founders'
 * Google calendars, rather than Cal.com's paid Teams plan. The reasoning lives
 * in decisions.md (row 19) and section 12 of the next-site report.
 *
 * Config, not secrets: the refresh tokens that let us read and write these
 * calendars live in the environment (see .env.example), never here. So do the
 * host addresses and the sender (BOOKING_HOST_EMAIL_<HOST>, BOOKING_FROM_EMAIL,
 * BOOKING_FROM_NAME), which differ between a test run and the real thing.
 *
 * Since 8.10.2026 a booking is a *request*: both hosts approve it by email
 * before it becomes a meeting (see lib/booking/requests.ts).
 */

export interface BookingHost extends Host {
  name: string
  /** First name as Hebrew emails and pages write it. */
  nameHe?: string
  /**
   * Where this host's approval emails go, and (for everyone but the organizer)
   * the address invited to the confirmed meeting. Read from the environment at
   * request time — BOOKING_HOST_EMAIL_<HOST ID> — so this stays a fallback.
   */
  email: string
}

/**
 * Same window Monday through Thursday — the days both of us work: Keren keeps
 * an Israeli week (Sunday–Thursday), Amir a European one (Monday–Friday).
 */
const mondayToThursday = (open: string, close: string): Host['hours'] =>
  Object.fromEntries([1, 2, 3, 4].map(day => [day, [[open, close]]]))

export const BOOKING = {
  durationMin: 30,
  /** Kept clear before and after anything already in either calendar. */
  bufferMin: 15,
  minNoticeHours: 12,
  horizonDays: 60,
  /**
   * A request waits this long for both hosts to approve. After that its holds
   * stop blocking the calendars, its approval links stop working, and the
   * expiry job tells the visitor to pick another time.
   */
  holdHours: 24,

  /** Whose calendar the event is created in. Everyone else is invited. */
  organizer: 'amir',

  // Decided 13.10.2026. Hours are *local* hours: we both travel, so each
  // host's timeZone below is only a fallback — the live one is read from their
  // Google Calendar on every request (see withLiveZones in lib/booking/routes.ts).
  // The visitor is only ever offered the overlap.
  hosts: [
    {
      id: 'amir',
      name: 'Amir Shalev',
      nameHe: 'אמיר',
      email: '',
      timeZone: 'Asia/Jerusalem',
      hours: mondayToThursday('09:00', '17:00'),
    },
    {
      id: 'keren',
      name: 'Keren Rightler',
      nameHe: 'קרן',
      email: '',
      timeZone: 'Asia/Bangkok',
      hours: mondayToThursday('09:00', '17:00'),
    },
  ] as BookingHost[],
}
