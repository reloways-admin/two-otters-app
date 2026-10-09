import type { Metadata } from 'next'
import ServiceNewsiteV10 from '@/components/v10/services/ServiceNewsiteV10'

export const metadata: Metadata = {
  title: 'אתר למותג חדש',
  alternates: { canonical: '/services/new-site' },
}

/** /services/new-site — ported from the artifact's "#service-newsite" page. */
export default function Page() {
  return <ServiceNewsiteV10 />
}
