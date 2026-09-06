import type { MetadataRoute } from 'next'

export const SITE_URL = 'https://two-otters.studio'

/** The pages we want found. The /v2../v8 drafts and /brand are deliberately
 *  absent — see robots.ts, which keeps them out of the index entirely. */
const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/work/the5ers', priority: 0.8 },
  { path: '/work/fincat', priority: 0.8 },
  { path: '/work/trade-the-pool', priority: 0.8 },
  { path: '/work/keren-rightler', priority: 0.8 },
  { path: '/work/that-perk', priority: 0.8 },
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
