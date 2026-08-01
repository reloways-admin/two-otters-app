import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'

// FinCat brand font
const rubik = Rubik({ subsets: ['latin', 'hebrew'], variable: '--font-rubik', display: 'swap' })

export const metadata: Metadata = {
  title: 'FinCat - Two Otters case study',
  description:
    'How Two Otters rebuilt FinCat from strategy to launch: brand foundation, a full UX/UI system, and a self-running marketing engine - designed and strategized in parallel.',
}

export default function FinCatLayout({ children }: { children: React.ReactNode }) {
  return <div className={rubik.variable}>{children}</div>
}
