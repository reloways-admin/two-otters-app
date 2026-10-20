import { describe, expect, it, vi } from 'vitest'
import { DeliveryError } from '@/lib/integrations/ports'
import { busyCalendars, createGoogleCalendar } from './google'

const env = {
  GOOGLE_OAUTH_CLIENT_ID: 'id',
  GOOGLE_OAUTH_CLIENT_SECRET: 'secret',
  GOOGLE_REFRESH_TOKEN_AMIR: 'refresh-amir',
  BOOKING_ALSO_BUSY_AMIR: ' other@example.com , ',
}

const json = (body: unknown) => new Response(JSON.stringify(body), { status: 200 })

function fakeGoogle(calendars: Record<string, unknown>) {
  return vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url)
    if (u.includes('oauth2')) return json({ access_token: 'access', expires_in: 3600 })
    const items = JSON.parse(String(init?.body)).items as { id: string }[]
    return json({ calendars: Object.fromEntries(items.map(i => [i.id, calendars[i.id]])) })
  })
}

describe('busyCalendars', () => {
  it('is the primary calendar plus any BOOKING_ALSO_BUSY_<HOST> ones', () => {
    expect(busyCalendars(env, 'amir')).toEqual(['primary', 'other@example.com'])
    expect(busyCalendars(env, 'keren')).toEqual(['primary'])
  })
})

describe('freeBusy', () => {
  it('merges busy times from every calendar of a host', async () => {
    const fetchImpl = fakeGoogle({
      primary: { busy: [{ start: '2026-10-18T08:00:00Z', end: '2026-10-18T09:00:00Z' }] },
      'other@example.com': { busy: [{ start: '2026-10-19T08:00:00Z', end: '2026-10-19T09:00:00Z' }] },
    })
    const cal = createGoogleCalendar({ env, hostIds: ['amir'], fetchImpl })
    const busy = await cal.freeBusy(['amir'], 0, Date.parse('2026-11-01'))
    expect(busy.amir.map(b => new Date(b.start).toISOString())).toEqual([
      '2026-10-18T08:00:00.000Z',
      '2026-10-19T08:00:00.000Z',
    ])
  })

  it('fails loudly when an extra calendar is no longer shared', async () => {
    const fetchImpl = fakeGoogle({
      primary: { busy: [] },
      'other@example.com': { errors: [{ domain: 'global', reason: 'notFound' }] },
    })
    const cal = createGoogleCalendar({ env, hostIds: ['amir'], fetchImpl })
    await expect(cal.freeBusy(['amir'], 0, 1)).rejects.toBeInstanceOf(DeliveryError)
  })
})

describe('timeZones', () => {
  it('reads each host’s calendar time zone, which follows them when they travel', async () => {
    const fetchImpl = vi.fn(async (url: string | URL | Request) =>
      String(url).includes('oauth2') ? json({ access_token: 'access', expires_in: 3600 }) : json({ timeZone: 'Europe/Berlin' })
    )
    const cal = createGoogleCalendar({ env, hostIds: ['amir'], fetchImpl })
    expect(await cal.timeZones!(['amir'])).toEqual({ amir: 'Europe/Berlin' })
  })
})
