import { createDecideRoutes } from '@/lib/booking/routes'

// Every click reads and writes the calendars; never cache it.
export const dynamic = 'force-dynamic'

export const { GET, POST } = createDecideRoutes()
