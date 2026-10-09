/**
 * Every v10 link goes through here. The site is being built page by page under
 * /v10; a page that doesn't exist yet points at its closest live stand-in, so
 * switching it over later is a one-line change.
 *
 * When v10 is promoted to the root, the /v10 prefix comes off in one place.
 */
const BASE = '/v10'

export const ROUTES = {
  home: BASE,
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
  book: `${BASE}/schedule-a-call`,
  // Not built under /v10 yet: audit and the full FinCat case study already work.
  caseFincat: '/work/fincat?lang=he',
  audit: '/audit',
  privacy: '/privacy?lang=he',
  accessibility: '/accessibility?lang=he',
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
