import type { Metadata } from 'next'
import AuditDetails from './AuditDetails'

export const metadata: Metadata = {
  title: 'מיד מתחילים לעבוד על הדוח | Two Otters Studio',
  description: 'עוד שני פרטים ואנחנו מתחילים להריץ את האודיט על העמוד שלכם.',
  // A step inside a funnel, carrying whatever address the visitor typed. There
  // is nothing here for a search engine to rank, and plenty of near-duplicate
  // URLs it could waste crawl budget on.
  robots: { index: false, follow: false },
}

export default function AuditDetailsPage() {
  return <AuditDetails />
}
