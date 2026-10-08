import type { Metadata } from 'next'
import './about.css'

// A draft for review, like the rest of /v10: never indexed.
export const metadata: Metadata = {
  title: 'עלינו · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/** Scopes the artifact's rules in about.css (under .v10-about-page) to this page only. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="v10-about-page">{children}</div>
}
