import type { Env } from '@/lib/integrations/ports'
import type { Interval } from './slots'
import { createGoogleCalendar } from './google'
import { createMockCalendar } from './mock'

/**
 * What booking needs from a calendar, with no provider in sight — the same
 * port-and-adapter shape the forms use (see lib/integrations/ports.ts).
 */
export interface CalendarEvent {
  start: number
  end: number
  summary: string
  description: string
  attendees: { email: string; name?: string }[]
}

export interface CreatedEvent {
  id: string
  meetUrl?: string
}

export interface CalendarPort {
  readonly name: string
  configured(): boolean
  /** Busy intervals per host id, read from each host's own calendar. */
  freeBusy(hostIds: string[], from: number, to: number): Promise<Record<string, Interval[]>>
  /** Created in the organizer's calendar; the calendar invites the attendees. */
  createEvent(organizerId: string, event: CalendarEvent): Promise<CreatedEvent>
}

/**
 * Google when its credentials are present. Outside production an empty
 * `.env.local` gets the mock instead, so the page is usable in `npm run dev`
 * before anyone has connected a calendar — the same convenience the forms'
 * console adapters give. In production it does not fall back: a misconfigured
 * deploy must fail loudly rather than take bookings into memory.
 */
export function getCalendar(env: Env = process.env, hostIds: string[]): CalendarPort {
  const google = createGoogleCalendar({ env, hostIds })
  if (!google.configured() && env.NODE_ENV !== 'production') return createMockCalendar()
  return google
}
