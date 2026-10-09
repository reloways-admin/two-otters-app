import type { Metadata } from 'next'
import ServiceUpgradeV10 from '@/components/v10/services/ServiceUpgradeV10'

export const metadata: Metadata = {
  title: 'שדרוג אתר',
  alternates: { canonical: '/services/upgrade' },
}

/** /services/upgrade — ported from the artifact's "#service-upgrade" page. */
export default function Page() {
  return <ServiceUpgradeV10 />
}
