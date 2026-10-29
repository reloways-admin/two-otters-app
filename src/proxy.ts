import { NextResponse, type NextRequest } from 'next/server'

/**
 * The old design versions (/v2–/v9) and the internal brand kit (/brand) stay in
 * the code as a record of how the studio got here, but only `next dev` serves
 * them. Everywhere else, the live site included, they answer 404.
 *
 * Why: an outside security review (24.10.2026) flagged them as extra surface
 * nobody needs on the live site. /api/brand/* is included because it renders
 * any Drive file id with our Drive key.
 *
 * Files with an extension (/v9/*.webp, /v10/*.mp4) never reach this: the
 * matcher skips them, so the live pages' images are untouched.
 */
export function proxy(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') return NextResponse.next()
  return NextResponse.rewrite(new URL('/__not-found', req.url), { status: 404 })
}

export const config = {
  matcher: ['/v([2-9])', '/v([2-9])/:path((?!.*\\.).*)', '/brand', '/brand/:path*', '/api/brand/:path*'],
}
