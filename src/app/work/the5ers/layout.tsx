import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The 5ers - Two Otters case study',
  description:
    'לתת פנים לכסף: אסטרטגיית מותג, סיפור מותג ומסרים, טון דיבור באנגלית ואפיון מלא ל‑13 תבניות אתר עבור The 5ers.',
}

export default function The5ersLayout({ children }: { children: React.ReactNode }) {
  return children
}
