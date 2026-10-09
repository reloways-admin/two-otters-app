import type { MetadataRoute } from 'next'
import { SITE_URL } from './sitemap'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // The site's images and video live under /v10/ (the folder it was built
      // in), so they stay crawlable even though the /v10 pages are blocked.
      // Google takes the longest matching rule, so these win over '/v10'.
      allow: ['/', '/v10/*.webp', '/v10/*.png', '/v10/*.jpg', '/v10/*.svg', '/v10/*.mp4'],
      // Superseded design versions and the internal brand kit. They render real
      // pages (/v8 was the homepage before v10), so without this they compete
      // with the pages we actually want ranked. /v10/* only redirects to the
      // live pages now.
      disallow: ['/v2', '/v3', '/v4', '/v5', '/v6', '/v7', '/v8', '/v9', '/v10', '/brand', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
