import type { Metadata } from 'next'
import ServiceNewsiteV10 from '@/components/v10/services/ServiceNewsiteV10'

export const metadata: Metadata = {
  title: 'אתר למותג חדש · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/** /v10/services/new-site — ported from the artifact's "#service-newsite" page. */
export default function Page() {
  return <ServiceNewsiteV10 />
}
