import type { Metadata } from 'next'
import './work.css'

export const metadata: Metadata = {
  title: 'עבודות',
  alternates: { canonical: '/work' },
}

/** Scopes the artifact's rules in work.css (under .v10-work-page) to this page only. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="v10-work-page">{children}</div>
}
