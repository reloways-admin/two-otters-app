import type { MetadataRoute } from 'next'
import { SITE_URL } from './sitemap'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Superseded design versions and the internal brand kit. They render real
      // pages (/v8 is the live homepage's twin), so without this they compete
      // with the pages we actually want ranked.
      disallow: ['/v2', '/v3', '/v4', '/v5', '/v6', '/v7', '/v8', '/brand', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
