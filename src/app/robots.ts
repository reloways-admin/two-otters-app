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
      // The old design versions (/v2–/v9) and /brand answer 404 outside `next
      // dev` (see src/proxy.ts), so they are not listed here: naming them was a
      // signpost to pages nobody should visit. /v10/* only redirects to the
      // live pages now.
      disallow: ['/v10', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
