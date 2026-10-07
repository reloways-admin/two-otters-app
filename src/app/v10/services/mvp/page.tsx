import type { Metadata } from 'next'
import ServiceMvpV10 from '@/components/v10/services/ServiceMvpV10'

export const metadata: Metadata = {
  title: 'מרעיון למוצר · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/** /v10/services/mvp — ported from the artifact's "#service-mvp" page. */
export default function Page() {
  return <ServiceMvpV10 />
}
