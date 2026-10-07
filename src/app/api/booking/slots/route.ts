import { createSlotsRoute } from '@/lib/booking/routes'

// Availability changes whenever either calendar does; never serve it from a cache.
export const dynamic = 'force-dynamic'

export const GET = createSlotsRoute()
