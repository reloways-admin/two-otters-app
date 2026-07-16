import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The5ers - Two Otters case study',
  description:
    'The5ers is an online proprietary trading fund that funds the top forex traders worldwide.',
}

export default function The5ersLayout({ children }: { children: React.ReactNode }) {
  return children
}
