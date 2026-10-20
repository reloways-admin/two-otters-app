import { createExpireRoute } from '@/lib/booking/routes'

export const dynamic = 'force-dynamic'

/**
 * Scheduled by vercel.json: daily at 06:00 UTC, the most Vercel's Hobby plan
 * allows (a more frequent schedule there fails the deploy). Vercel Cron sends
 * `Authorization: Bearer $CRON_SECRET` by itself once CRON_SECRET is set in the
 * project. Daily is enough: the holds already stop blocking on the next slots
 * read; this job only tells the visitor to pick another time. On Pro, hourly
 * ("0 * * * *") would tell them sooner.
 */
export const GET = createExpireRoute()
