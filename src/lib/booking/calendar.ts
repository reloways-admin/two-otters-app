import type { Env } from '@/lib/integrations/ports'
import type { Interval } from './slots'
import { createGoogleCalendar } from './google'
import { createMockCalendar } from './mock'

/**
 * What booking needs from a calendar, with no provider in sight — the same
 * port-and-adapter shape the forms use (see lib/integrations/ports.ts).
 *
 * Every method takes the host whose *own* calendar it acts on. Each host has
 * their own token, so a hold in Keren's calendar is written with Keren's token
 * and nobody's calendar is shared with anybody.
 */
export interface CalendarEvent {
  start: number
  end: number
  summary: string
  description: string
  attendees: { email: string; name?: string }[]
  /** Private key/value pairs stored on the event, invisible to attendees. */
  props?: Record<string, string>
}

export interface CreatedEvent {
  id: string
  meetUrl?: string
}

/** An event as booking reads it back: when, and the private keys we put on it. */
export interface StoredEvent {
  id: string
  /** Changes on every write; pass it back to update only an unchanged event. */
  etag?: string
  start: number
  end: number
  summary: string
  /** A transparent event does not count as busy. */
  transparent: boolean
  props: Record<string, string>
}

export interface HoldInput {
  start: number
  end: number
  summary: string
  description: string
  props: Record<string, string>
}

export interface EventPatch {
  summary?: string
  transparent?: boolean
  /** Merged into the event's private keys. */
  props?: Record<string, string>
}

/** The event changed since it was read (an etag mismatch). Read it again. */
export class ConflictError extends Error {
  constructor(detail: string) {
    super(`calendar conflict: ${detail}`)
    this.name = 'ConflictError'
  }
}

export interface CalendarPort {
  readonly name: string
  configured(): boolean
  /**
   * Busy intervals per host id, read from each host's own primary calendar.
   * A calendar that cannot be read throws — it must never look free.
   */
  freeBusy(hostIds: string[], from: number, to: number): Promise<Record<string, Interval[]>>
  /**
   * The time zone each host's calendar is set to right now (IANA). Google
   * offers to update it when someone lands in another country, so this is how
   * the booking page follows two people who travel. Optional: without it, or
   * when it fails, the zone in config/booking.ts stands.
   */
  timeZones?(hostIds: string[]): Promise<Record<string, string>>
  /** Created in the organizer's calendar; the calendar invites the attendees. */
  createEvent(organizerId: string, event: CalendarEvent): Promise<CreatedEvent>
  /** A private, busy event with no attendees, so nobody is emailed. */
  createHold(hostId: string, hold: HoldInput): Promise<StoredEvent>
  /** Events in the host's calendar carrying private key `key` = `value`. */
  findByProp(hostId: string, key: string, value: string): Promise<StoredEvent[]>
  getEvent(hostId: string, id: string): Promise<StoredEvent | null>
  /** With `ifMatch`, throws ConflictError if the event changed since that etag. */
  updateEvent(hostId: string, id: string, patch: EventPatch, ifMatch?: string): Promise<StoredEvent>
  /** Silent (no emails). Deleting an event that is already gone is not an error. */
  deleteEvent(hostId: string, id: string): Promise<void>
}

/**
 * Google when its credentials are present. Outside production an empty
 * `.env.local` gets the mock instead, so the page is usable in `npm run dev`
 * before anyone has connected a calendar — the same convenience the forms'
 * console adapters give. In production it does not fall back: a misconfigured
 * deploy must fail loudly rather than take bookings into memory.
 *
 * BOOKING_CALENDAR=mock forces the mock outside production even when Google
 * credentials are present, for a test run that must not touch real calendars.
 */
export function getCalendar(env: Env = process.env, hostIds: string[]): CalendarPort {
  const production = env.NODE_ENV === 'production'
  if (!production && env.BOOKING_CALENDAR === 'mock') return createMockCalendar(env)
  const google = createGoogleCalendar({ env, hostIds })
  if (!google.configured() && !production) return createMockCalendar(env)
  return google
}
