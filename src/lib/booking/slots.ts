/**
 * Which half-hours can a visitor book?
 *
 * Pure on purpose: everything time-dependent arrives as an argument, so the
 * rules can be tested against fixed dates instead of the clock.
 *
 * The one idea that matters: each host's working hours are wall-clock times in
 * *their own* time zone. Amir's 09:00 is Berlin's, Keren's is Bangkok's, and the
 * visitor may be in Tel Aviv. Everything is therefore converted to UTC
 * instants first and only ever compared there; the visitor's zone is a
 * display concern the client handles.
 */

export interface Interval {
  start: number
  end: number
}

/** 0 = Sunday … 6 = Saturday → ["HH:MM", "HH:MM"] windows in the host's zone. */
export type WeeklyHours = Partial<Record<0 | 1 | 2 | 3 | 4 | 5 | 6, [string, string][]>>

export interface Host {
  id: string
  /** IANA zone, e.g. "Europe/Berlin". */
  timeZone: string
  hours: WeeklyHours
}

export interface SlotRules {
  durationMin: number
  /** Kept free on both sides of every existing meeting. */
  bufferMin: number
  minNoticeHours: number
  horizonDays: number
  /** Candidate starts are multiples of this, counted in UTC. */
  stepMin?: number
}

const MIN = 60_000
const DAY = 24 * 60 * MIN

// ─── Time zones ──────────────────────────────────────────────────────────────
// Intl is the only zone database a browser and Node both ship, so the
// conversion is built on it rather than a dependency.

const formatters = new Map<string, Intl.DateTimeFormat>()
function formatter(timeZone: string) {
  let f = formatters.get(timeZone)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    formatters.set(timeZone, f)
  }
  return f
}

/** The wall-clock reading of an instant in a zone. Month is 1-based. */
export function zonedParts(utcMs: number, timeZone: string) {
  const p: Record<string, number> = {}
  for (const part of formatter(timeZone).formatToParts(utcMs)) {
    if (part.type !== 'literal') p[part.type] = Number(part.value)
  }
  return { y: p.year, m: p.month, d: p.day, hh: p.hour, mm: p.minute, ss: p.second }
}

/** Minutes the zone is ahead of UTC at that instant (Berlin in winter: 60). */
function offsetMin(utcMs: number, timeZone: string) {
  const { y, m, d, hh, mm, ss } = zonedParts(utcMs, timeZone)
  return (Date.UTC(y, m - 1, d, hh, mm, ss) - Math.floor(utcMs / 1000) * 1000) / MIN
}

/**
 * The UTC instant at which a zone's clock reads this date and time.
 *
 * Guess with the offset at the naive instant, then correct once: that settles
 * every case except the hour that doesn't exist on a spring-forward night,
 * which no working hours of ours fall into.
 */
export function zonedToUtc(y: number, m: number, d: number, hh: number, mm: number, timeZone: string) {
  const naive = Date.UTC(y, m - 1, d, hh, mm)
  const first = naive - offsetMin(naive, timeZone) * MIN
  return naive - offsetMin(first, timeZone) * MIN
}

// ─── Interval arithmetic ─────────────────────────────────────────────────────

function normalise(list: Interval[]) {
  const sorted = list.filter(i => i.end > i.start).sort((a, b) => a.start - b.start)
  const out: Interval[] = []
  for (const i of sorted) {
    const last = out.at(-1)
    if (last && i.start <= last.end) last.end = Math.max(last.end, i.end)
    else out.push({ ...i })
  }
  return out
}

function subtract(free: Interval[], busy: Interval[]) {
  let out = free
  for (const b of normalise(busy)) {
    out = out.flatMap(f => {
      if (b.end <= f.start || b.start >= f.end) return [f]
      const parts: Interval[] = []
      if (b.start > f.start) parts.push({ start: f.start, end: b.start })
      if (b.end < f.end) parts.push({ start: b.end, end: f.end })
      return parts
    })
  }
  return out
}

function intersect(a: Interval[], b: Interval[]) {
  const out: Interval[] = []
  for (const x of a) for (const y of b) {
    const start = Math.max(x.start, y.start)
    const end = Math.min(x.end, y.end)
    if (end > start) out.push({ start, end })
  }
  return normalise(out)
}

// ─── Availability ────────────────────────────────────────────────────────────

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** A host's working windows between two instants, as UTC intervals. */
export function hostWindows(host: Host, from: number, to: number): Interval[] {
  const windows: Interval[] = []
  // Walk the host's *local* calendar days, a day either side so a window that
  // straddles UTC midnight is never missed.
  const first = zonedParts(from - DAY, host.timeZone)
  const last = zonedParts(to + DAY, host.timeZone)
  for (
    let day = Date.UTC(first.y, first.m - 1, first.d);
    day <= Date.UTC(last.y, last.m - 1, last.d);
    day += DAY
  ) {
    const date = new Date(day)
    const weekday = date.getUTCDay() as keyof WeeklyHours
    for (const [open, close] of host.hours[weekday] ?? []) {
      const [y, m, d] = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()]
      const o = toMinutes(open)
      const c = toMinutes(close)
      windows.push({
        start: zonedToUtc(y, m, d, Math.floor(o / 60), o % 60, host.timeZone),
        end: zonedToUtc(y, m, d, Math.floor(c / 60), c % 60, host.timeZone),
      })
    }
  }
  return intersect(normalise(windows), [{ start: from, end: to }])
}

export function computeSlots(
  input: SlotRules & {
    hosts: Host[]
    /** Busy intervals per host id, straight from their calendars. */
    busy: Record<string, Interval[]>
    from: number
    to: number
    now: number
  }
): number[] {
  const { hosts, busy, from, to, now, durationMin, bufferMin, minNoticeHours, horizonDays } = input
  const step = (input.stepMin ?? 30) * MIN
  const length = durationMin * MIN
  const buffer = bufferMin * MIN
  const earliest = now + minNoticeHours * 60 * MIN
  const latest = now + horizonDays * DAY

  // Everyone must be free: intersect each host's own free time.
  let free: Interval[] = [{ start: from, end: to }]
  for (const host of hosts) {
    const padded = (busy[host.id] ?? []).map(b => ({ start: b.start - buffer, end: b.end + buffer }))
    free = intersect(free, subtract(hostWindows(host, from, to), padded))
  }

  const slots: number[] = []
  for (const f of free) {
    for (let s = Math.ceil(f.start / step) * step; s + length <= f.end; s += step) {
      if (s >= earliest && s <= latest) slots.push(s)
    }
  }
  return slots
}
