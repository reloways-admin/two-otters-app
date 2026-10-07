import type { Metadata } from 'next'
import ServiceMarketingV10 from '@/components/v10/services/ServiceMarketingV10'

export const metadata: Metadata = {
  title: 'תשתית שיווקית · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/** /v10/services/marketing — ported from the artifact's "#service-marketing" page. */
export default function Page() {
  return <ServiceMarketingV10 />
}
