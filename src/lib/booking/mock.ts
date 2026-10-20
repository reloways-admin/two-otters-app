import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Env } from '@/lib/integrations/ports'
import { ConflictError, type CalendarPort, type StoredEvent } from './calendar'
import type { Interval } from './slots'

/**
 * A stand-in calendar for `npm run dev` before any Google account is connected.
 *
 * Each host gets a couple of fixed busy blocks every day — at different hours,
 * so the page visibly offers only the overlap. Holds and meetings are kept in a
 * small JSON file (default `.next/cache/booking-mock.json`, or
 * BOOKING_MOCK_STORE), so the whole request → approve → meeting flow can be
 * walked through by hand: the approve links are separate requests, and Next's
 * dev server does not share module memory between routes reliably.
 * Never used in production (see getCalendar).
 */

const HOUR = 3_600_000
const DAY = 24 * HOUR

/** UTC hours each host is "in a meeting" every day. */
const DAILY_BUSY: Record<string, [number, number][]> = {
  amir: [[11, 12]],
  keren: [[8, 8.5], [9.5, 10]],
}

interface MockEvent extends StoredEvent {
  hostId: string
  description: string
  attendees: { email: string; name?: string }[]
  meetUrl?: string
}

interface Store {
  seq: number
  events: MockEvent[]
}

export function mockStorePath(env: Env = process.env) {
  return env.BOOKING_MOCK_STORE || join(cacheDir(), 'booking-mock.json')
}

export function createMockCalendar(env: Env = process.env): CalendarPort {
  const path = mockStorePath(env)

  const load = (): Store => {
    try {
      return JSON.parse(readFileSync(/* turbopackIgnore: true */ path, 'utf8')) as Store
    } catch {
      return { seq: 0, events: [] }
    }
  }
  const save = (store: Store) => {
    mkdirSync(/* turbopackIgnore: true */ dirname(path), { recursive: true })
    const tmp = `${path}.${process.pid}.tmp`
    writeFileSync(/* turbopackIgnore: true */ tmp, JSON.stringify(store, null, 2))
    renameSync(/* turbopackIgnore: true */ tmp, path)
  }
  const nextId = (store: Store, prefix: string) => `${prefix}-${(++store.seq).toString(36)}`
  const strip = ({ hostId: _h, description: _d, attendees: _a, meetUrl: _m, ...event }: MockEvent): StoredEvent => event

  return {
    name: 'mock-calendar',
    configured: () => true,

    async freeBusy(ids, from, to) {
      const { events } = load()
      const out: Record<string, Interval[]> = {}
      for (const id of ids) {
        // A meeting with attendees is every host's meeting (they are all
        // invited), as it would be once Google delivers the invitation.
        const busy: Interval[] = events
          .filter(e => (e.hostId === id || e.attendees.length > 0) && !e.transparent && e.end > from && e.start < to)
          .map(e => ({ start: e.start, end: e.end }))
        for (let day = Math.floor(from / DAY) * DAY; day < to; day += DAY) {
          for (const [a, b] of DAILY_BUSY[id] ?? []) busy.push({ start: day + a * HOUR, end: day + b * HOUR })
        }
        out[id] = busy
      }
      return out
    },

    async createEvent(organizerId, event) {
      const store = load()
      const id = nextId(store, 'evt')
      const meetUrl = `https://meet.google.com/mock-${id}`
      // As in Google: the event sits in the organizer's calendar and, because
      // the other hosts are attendees, in theirs too.
      store.events.push({
        id,
        etag: `"${store.seq}"`,
        hostId: organizerId,
        start: event.start,
        end: event.end,
        summary: event.summary,
        description: event.description,
        attendees: event.attendees,
        transparent: false,
        props: event.props ?? {},
        meetUrl,
      })
      save(store)
      console.info('[booking] mock event', {
        organizer: organizerId,
        start: new Date(event.start).toISOString(),
        attendees: event.attendees.map(a => a.email),
        meetUrl,
      })
      return { id, meetUrl }
    },

    async createHold(hostId, hold) {
      const store = load()
      const event: MockEvent = {
        id: nextId(store, `hold-${hostId}`),
        etag: `"${store.seq}"`,
        hostId,
        start: hold.start,
        end: hold.end,
        summary: hold.summary,
        description: hold.description,
        attendees: [],
        transparent: false,
        props: { ...hold.props },
      }
      store.events.push(event)
      save(store)
      return strip(event)
    },

    async findByProp(hostId, key, value) {
      return load()
        .events.filter(e => e.props[key] === value && e.hostId === hostId)
        .map(strip)
    },

    async getEvent(hostId, id) {
      const event = load().events.find(e => e.id === id && e.hostId === hostId)
      return event ? strip(event) : null
    },

    async updateEvent(hostId, id, patch, ifMatch) {
      const store = load()
      const event = store.events.find(e => e.id === id && e.hostId === hostId)
      if (!event) throw new Error(`mock event ${id} not found`)
      if (ifMatch && event.etag !== ifMatch) throw new ConflictError(`${id} changed since it was read`)
      if (patch.summary !== undefined) event.summary = patch.summary
      if (patch.transparent !== undefined) event.transparent = patch.transparent
      if (patch.props) event.props = { ...event.props, ...patch.props }
      event.etag = `"${++store.seq}"`
      save(store)
      return strip(event)
    },

    async deleteEvent(hostId, id) {
      const store = load()
      store.events = store.events.filter(e => !(e.id === id && e.hostId === hostId))
      save(store)
    },
  }
}

/** `.next/cache` of the running app — kept out of the build's file tracing. */
function cacheDir() {
  return join(/* turbopackIgnore: true */ process.cwd(), '.next/cache')
}
