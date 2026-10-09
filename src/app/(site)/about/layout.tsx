import type { Metadata } from 'next'
import './about.css'

export const metadata: Metadata = {
  title: 'עלינו',
  alternates: { canonical: '/about' },
}

/** Scopes the artifact's rules in about.css (under .v10-about-page) to this page only. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="v10-about-page">{children}</div>
}
