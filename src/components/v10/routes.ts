/**
 * Every v10 link goes through here. v10 is the live site at the root, so BASE
 * is empty; the old /v10/* addresses redirect here (next.config.ts).
 */
const BASE = ''

export const ROUTES = {
  home: '/',
  work: `${BASE}/work`,
  workFincat: `${BASE}/work#wk-fincat`,
  work5ers: `${BASE}/work#wk-5ers`,
  workEwise: `${BASE}/work#wk-ewise`,
  services: `${BASE}/services`,
  serviceMvp: `${BASE}/services/mvp`,
  serviceUpgrade: `${BASE}/services/upgrade`,
  serviceMarketing: `${BASE}/services/marketing`,
  serviceNewsite: `${BASE}/services/new-site`,
  partners: `${BASE}/partners`,
  about: `${BASE}/about`,
  contact: `${BASE}/contact`,
  // Booking isn't live yet (it stays on site-next), so every "book a call"
  // leads to the contact form. Point this at the booking page when it ships.
  book: `${BASE}/contact`,
  // Pages that predate v10 and still work as they are.
  caseFincat: '/work/fincat',
  audit: '/audit',
  privacy: '/privacy',
  accessibility: '/accessibility',
} as const

export type RouteKey = keyof typeof ROUTES

/** Resolves a locale link — a route key, optionally with a section ("partners#pt-when").
 *  Anything that isn't a key (a full URL, mailto:) passes through untouched. */
export function link(to: string): string {
  const [key, hash] = to.split('#')
  const base = ROUTES[key as RouteKey]
  if (!base) return to
  return hash ? `${base}#${hash}` : base
}
