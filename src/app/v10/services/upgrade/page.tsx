import type { Metadata } from 'next'
import ServiceUpgradeV10 from '@/components/v10/services/ServiceUpgradeV10'

export const metadata: Metadata = {
  title: 'שדרוג אתר · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/** /v10/services/upgrade — ported from the artifact's "#service-upgrade" page. */
export default function Page() {
  return <ServiceUpgradeV10 />
}
