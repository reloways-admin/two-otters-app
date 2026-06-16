import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trade The Pool — Two Otters case study',
  description:
    'How a bold, young FinTech brand and a full design language for Trade The Pool came together in two weeks — a solo project by Amir.',
}

export default function TradePoolLayout({ children }: { children: React.ReactNode }) {
  return children
}
