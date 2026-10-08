import type { Metadata } from 'next'
import './work.css'

// A draft for review, like the rest of /v10: never indexed.
export const metadata: Metadata = {
  title: 'עבודות · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/** Scopes the artifact's rules in work.css (under .v10-work-page) to this page only. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="v10-work-page">{children}</div>
}
