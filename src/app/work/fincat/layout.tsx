import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'חתול פיננסי - Two Otters case study',
  description:
    'מקהילה לעסק: איך בנינו לחתול פיננסי בסיס מותגי מאפס, שפה ויזואלית מרעננת ותשתית שיווקית אוטומטית - אסטרטגיה ועיצוב במקביל.',
}

export default function FinCatLayout({ children }: { children: React.ReactNode }) {
  return children
}
