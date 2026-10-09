import type { Metadata } from 'next'
import ServiceMvpV10 from '@/components/v10/services/ServiceMvpV10'

export const metadata: Metadata = {
  title: 'מרעיון למוצר',
  alternates: { canonical: '/services/mvp' },
}

/** /services/mvp — ported from the artifact's "#service-mvp" page. */
export default function Page() {
  return <ServiceMvpV10 />
}
