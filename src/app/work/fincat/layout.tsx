import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FinCat - Two Otters case study',
  description:
    'How Two Otters rebuilt FinCat from strategy to launch: brand foundation, a full UX/UI system, and a self-running marketing engine - designed and strategized in parallel.',
}

export default function FinCatLayout({ children }: { children: React.ReactNode }) {
  return children
}
