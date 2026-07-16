import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ThatPerk - Two Otters case study',
  description:
    'How ThatPerk turned the organizational commute into a perk - a carpool product, marketing site and insights dashboard, designed together by Amir & Keren.',
}

export default function ThatPerkLayout({ children }: { children: React.ReactNode }) {
  return children
}
