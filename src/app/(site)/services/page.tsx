import type { Metadata } from 'next'
import ServicesIndexV10 from '@/components/v10/services/ServicesIndexV10'

export const metadata: Metadata = {
  title: 'שירותים',
  alternates: { canonical: '/services' },
}

/** /services: the four services, the spiral with steps 5–8, what you leave with. */
export default function ServicesPage() {
  return <ServicesIndexV10 />
}
