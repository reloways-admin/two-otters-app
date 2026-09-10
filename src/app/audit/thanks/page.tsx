import type { Metadata } from 'next'
import AuditThanks from './AuditThanks'

export const metadata: Metadata = {
  title: 'קיבלנו, אנחנו על זה | Two Otters Studio',
  description: 'קיבלנו את הבקשה לאודיט. הדוח יגיע במייל תוך 1-2 ימי עסקים.',
  // The conversion URL. Useful to an ad platform, useless to a search engine,
  // and it should never turn up as a result for someone who never applied.
  robots: { index: false, follow: false },
}

export default function AuditThanksPage() {
  return <AuditThanks />
}
