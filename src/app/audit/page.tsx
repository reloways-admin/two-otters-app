import type { Metadata } from 'next'
import AuditLanding from './AuditLanding'

export const metadata: Metadata = {
  title: 'אודיט חינם לעמוד הבית שלכם | Two Otters Studio',
  description:
    'תנו לנו לינק אחד ותקבלו דוח עם ציון, ממצאים וסדר פעולות על עמוד הבית שלכם. בלי עלות ובלי התחייבות, תוך 1-2 ימי עסקים.',
  alternates: { canonical: './' },
}

export default function AuditPage() {
  return <AuditLanding />
}
