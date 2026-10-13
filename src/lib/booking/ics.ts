/**
 * The visitor's invitation as an iCalendar file (RFC 5545).
 *
 * The visitor is not a Google attendee — the meeting lives in our calendars and
 * the invitation is our own email — so this file is what puts the call in
 * *their* calendar, whichever app they use. Times are written in UTC ("Z"),
 * which every client converts to the reader's own zone; no VTIMEZONE needed.
 */

export interface IcsInput {
  uid: string
  start: number
  end: number
  /** DTSTAMP: when this version of the invitation was made. */
  stamp: number
  summary: string
  description: string
  url?: string
  organizer: { name?: string; email: string }
  attendees: { name?: string; email: string; host?: boolean }[]
  /** REQUEST for an invitation, CANCEL to take one back. */
  method?: 'REQUEST' | 'CANCEL'
  sequence?: number
}

export function utcStamp(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/** TEXT values: backslash, semicolon, comma and newlines are escaped. */
export function escapeText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

/** Parameter values (CN) are quoted; quotes themselves are not allowed. */
const param = (value: string) => `"${value.replace(/"/g, "'")}"`

/** Lines longer than 75 octets continue on the next line after a space. */
export function fold(line: string): string {
  const bytes = Buffer.from(line, 'utf8')
  if (bytes.length <= 75) return line
  const out: string[] = []
  let current = ''
  let size = 0
  for (const ch of line) {
    const len = Buffer.byteLength(ch, 'utf8')
    const limit = out.length === 0 ? 75 : 74
    if (size + len > limit) {
      out.push(current)
      current = ''
      size = 0
    }
    current += ch
    size += len
  }
  out.push(current)
  return out.join('\r\n ')
}

export function buildIcs(input: IcsInput): string {
  const method = input.method ?? 'REQUEST'
  const person = (p: { name?: string; email: string }) => `${p.name ? `;CN=${param(p.name)}` : ''}:mailto:${p.email}`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Two Otters Studio//Booking//EN',
    'CALSCALE:GREGORIAN',
    `METHOD:${method}`,
    'BEGIN:VEVENT',
    `UID:${input.uid}`,
    `SEQUENCE:${input.sequence ?? 0}`,
    `DTSTAMP:${utcStamp(input.stamp)}`,
    `DTSTART:${utcStamp(input.start)}`,
    `DTEND:${utcStamp(input.end)}`,
    `SUMMARY:${escapeText(input.summary)}`,
    `DESCRIPTION:${escapeText(input.description)}`,
    ...(input.url ? [`LOCATION:${escapeText(input.url)}`, `URL:${input.url}`] : []),
    `ORGANIZER${person(input.organizer)}`,
    ...input.attendees.map(a =>
      a.host
        ? `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED${person(a)}`
        : `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE${person(a)}`
    ),
    `STATUS:${method === 'CANCEL' ? 'CANCELLED' : 'CONFIRMED'}`,
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'TRIGGER:-PT15M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.map(fold).join('\r\n') + '\r\n'
}
