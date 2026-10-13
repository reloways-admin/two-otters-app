import { describe, it, expect } from 'vitest'
import { computeSlots, zonedToUtc, type Host } from './slots'

const MIN = 60_000
const HOUR = 60 * MIN

/** Sunday–Thursday, the same window every day. */
const sunToThu = (from: string, to: string) =>
  Object.fromEntries([0, 1, 2, 3, 4].map(d => [d, [[from, to]]])) as Host['hours']

const berlin: Host = { id: 'amir', timeZone: 'Europe/Berlin', hours: sunToThu('09:00', '17:00') }
const bangkok: Host = { id: 'keren', timeZone: 'Asia/Bangkok', hours: sunToThu('09:00', '17:00') }

const base = { durationMin: 30, bufferMin: 0, minNoticeHours: 0, horizonDays: 60 }

// Monday 2 November 2026 — after Europe's clocks went back, so Berlin is UTC+1.
const MON_NOV_2 = Date.UTC(2026, 10, 2)
const iso = (ms: number) => new Date(ms).toISOString()

describe('zonedToUtc', () => {
  it('reads a wall-clock time in the zone it belongs to', () => {
    expect(iso(zonedToUtc(2026, 11, 2, 9, 0, 'Europe/Berlin'))).toBe('2026-11-02T08:00:00.000Z')
    expect(iso(zonedToUtc(2026, 11, 2, 9, 0, 'Asia/Bangkok'))).toBe('2026-11-02T02:00:00.000Z')
  })

  it('follows a daylight-saving change rather than a fixed offset', () => {
    // Before 25 October Berlin is on summer time, UTC+2.
    expect(iso(zonedToUtc(2026, 10, 20, 9, 0, 'Europe/Berlin'))).toBe('2026-10-20T07:00:00.000Z')
  })
})

describe('computeSlots', () => {
  const day = { from: MON_NOV_2, to: MON_NOV_2 + 24 * HOUR, now: MON_NOV_2 - 48 * HOUR }

  it('offers one host their whole day in half-hour steps', () => {
    const slots = computeSlots({ ...base, ...day, hosts: [berlin], busy: {} })
    expect(slots.map(iso)).toHaveLength(16)
    expect(iso(slots[0])).toBe('2026-11-02T08:00:00.000Z')
    expect(iso(slots.at(-1)!)).toBe('2026-11-02T15:30:00.000Z')
  })

  it('offers only the hours both hosts share across time zones', () => {
    // Berlin 09–17 is 08–16 UTC; Bangkok 09–17 is 02–10 UTC. They share 08–10.
    const slots = computeSlots({ ...base, ...day, hosts: [berlin, bangkok], busy: {} })
    expect(slots.map(iso)).toEqual([
      '2026-11-02T08:00:00.000Z',
      '2026-11-02T08:30:00.000Z',
      '2026-11-02T09:00:00.000Z',
      '2026-11-02T09:30:00.000Z',
    ])
  })

  it('drops a slot when only one of the two hosts is busy', () => {
    const busy = { keren: [{ start: Date.UTC(2026, 10, 2, 8, 30), end: Date.UTC(2026, 10, 2, 9, 0) }] }
    const slots = computeSlots({ ...base, ...day, hosts: [berlin, bangkok], busy })
    expect(slots.map(iso)).toEqual([
      '2026-11-02T08:00:00.000Z',
      '2026-11-02T09:00:00.000Z',
      '2026-11-02T09:30:00.000Z',
    ])
  })

  it('keeps the buffer clear on both sides of an existing meeting', () => {
    const busy = { amir: [{ start: Date.UTC(2026, 10, 2, 9, 0), end: Date.UTC(2026, 10, 2, 9, 30) }] }
    const slots = computeSlots({ ...base, ...day, bufferMin: 15, hosts: [berlin, bangkok], busy })
    // 08:30 would end at 09:00, inside the 15 minutes before the meeting.
    expect(slots.map(iso)).toEqual(['2026-11-02T08:00:00.000Z'])
  })

  it('never offers a slot sooner than the minimum notice', () => {
    const now = Date.UTC(2026, 10, 2, 0, 0)
    const slots = computeSlots({ ...base, ...day, now, minNoticeHours: 9, hosts: [berlin], busy: {} })
    expect(iso(slots[0])).toBe('2026-11-02T09:00:00.000Z')
  })

  it('never offers a slot past the booking horizon', () => {
    const now = Date.UTC(2026, 10, 1, 12, 0)
    const slots = computeSlots({ ...base, ...day, now, horizonDays: 1, hosts: [berlin], busy: {} })
    expect(slots.every(s => s <= now + 24 * HOUR)).toBe(true)
    expect(slots.length).toBeGreaterThan(0)
  })

  it('offers nothing on a day neither host works', () => {
    // Saturday 7 November.
    const sat = Date.UTC(2026, 10, 7)
    const slots = computeSlots({ ...base, from: sat, to: sat + 24 * HOUR, now: day.now, hosts: [berlin, bangkok], busy: {} })
    expect(slots).toEqual([])
  })

  it('uses each host’s own weekday, not the visitor’s', () => {
    // Bangkok's Monday 01:00 is still Sunday evening in UTC — a Sunday-only host
    // in Bangkok must not be offered on Monday local time.
    const sundayOnly: Host = { id: 'k', timeZone: 'Asia/Bangkok', hours: { 0: [['00:00', '23:59']] } }
    const slots = computeSlots({ ...base, ...day, hosts: [sundayOnly], busy: {} })
    expect(slots).toEqual([])
  })
})
