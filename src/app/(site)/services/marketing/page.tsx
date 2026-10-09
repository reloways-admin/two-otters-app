import type { Metadata } from 'next'
import ServiceMarketingV10 from '@/components/v10/services/ServiceMarketingV10'

export const metadata: Metadata = {
  title: 'תשתית שיווקית',
  alternates: { canonical: '/services/marketing' },
}

/** /services/marketing — ported from the artifact's "#service-marketing" page. */
export default function Page() {
  return <ServiceMarketingV10 />
}
