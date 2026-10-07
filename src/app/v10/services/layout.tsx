import type { Metadata } from 'next'
import './services.css'

// Drafts for review, like the rest of /v10: never indexed.
export const metadata: Metadata = {
  title: 'שירותים · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/**
 * Wraps the services page and the four service pages, so the artifact rules
 * in services.css (scoped under .v10-services) apply here and nowhere else.
 */
export default function V10ServicesLayout({ children }: { children: React.ReactNode }) {
  return <div className="v10-services">{children}</div>
}
