import type { MetadataRoute } from 'next'

export const SITE_URL = 'https://two-otters.studio'

/** The pages we want found. The /v2../v10 history pages and /brand are
 *  deliberately absent — see robots.ts, which keeps them out of the index
 *  entirely. So is /schedule-a-call, which only redirects to /contact. */
const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/en', priority: 0.8 },
  { path: '/services', priority: 0.9 },
  { path: '/services/mvp', priority: 0.8 },
  { path: '/services/upgrade', priority: 0.8 },
  { path: '/services/marketing', priority: 0.8 },
  { path: '/services/new-site', priority: 0.8 },
  { path: '/work', priority: 0.9 },
  { path: '/partners', priority: 0.8 },
  { path: '/about', priority: 0.8 },
  { path: '/contact', priority: 0.9 },
  { path: '/work/the5ers', priority: 0.8 },
  { path: '/work/fincat', priority: 0.8 },
  { path: '/work/trade-the-pool', priority: 0.8 },
  { path: '/work/keren-rightler', priority: 0.8 },
  { path: '/work/that-perk', priority: 0.8 },
  // Low priority but deliberately indexable — Meta and users both expect to be
  // able to find these, and a policy nobody can reach is not a policy.
  { path: '/privacy', priority: 0.3 },
  { path: '/accessibility', priority: 0.3 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time is the honest answer: the site is static, so a page last changed
  // when it was last deployed.
  const lastModified = new Date()

  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }))
}
