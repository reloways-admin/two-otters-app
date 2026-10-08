import type { Metadata } from 'next'
import './partners.css'

// A draft for review, like the rest of /v10: never indexed.
export const metadata: Metadata = {
  title: 'לשותפים · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/** Scopes the artifact's rules in partners.css (under .v10-partners) to this page only. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="v10-partners">{children}</div>
}
