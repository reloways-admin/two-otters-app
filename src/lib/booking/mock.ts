import type { CalendarPort } from './calendar'
import type { Interval } from './slots'

/**
 * A stand-in calendar for `npm run dev` before any Google account is connected.
 *
 * Each host gets a couple of fixed busy blocks every day — at different hours,
 * so the page visibly offers only the overlap — and bookings are remembered in
 * memory until the dev server restarts, so a booked slot disappears like it
 * would for real. Never used in production (see getCalendar).
 */

const HOUR = 3_600_000
const DAY = 24 * HOUR

/** UTC hours each host is "in a meeting" every day. */
const DAILY_BUSY: Record<string, [number, number][]> = {
  amir: [[11, 12]],
  keren: [[8, 8.5], [9.5, 10]],
}

const booked: Interval[] = []

export function createMockCalendar(): CalendarPort {
  return {
    name: 'mock-calendar',
    configured: () => true,

    async freeBusy(ids, from, to) {
      const out: Record<string, Interval[]> = {}
      for (const id of ids) {
        const busy: Interval[] = [...booked]
        for (let day = Math.floor(from / DAY) * DAY; day < to; day += DAY) {
          for (const [a, b] of DAILY_BUSY[id] ?? []) busy.push({ start: day + a * HOUR, end: day + b * HOUR })
        }
        out[id] = busy
      }
      return out
    },

    async createEvent(organizerId, event) {
      booked.push({ start: event.start, end: event.end })
      console.info('[booking] mock event', {
        organizer: organizerId,
        start: new Date(event.start).toISOString(),
        summary: event.summary,
        attendees: event.attendees.map(a => a.email),
      })
      return { id: `mock-${event.start}`, meetUrl: 'https://meet.google.com/mock-meet-link' }
    },
  }
}
