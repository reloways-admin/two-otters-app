import type { Metadata } from 'next'
import './partners.css'

export const metadata: Metadata = {
  title: 'לשותפים',
  alternates: { canonical: '/partners' },
}

/** Scopes the artifact's rules in partners.css (under .v10-partners) to this page only. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="v10-partners">{children}</div>
}
