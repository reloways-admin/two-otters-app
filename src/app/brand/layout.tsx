import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Two Otters — ערכת מותג',
  description: 'נכסי המותג של Two Otters Studio — לוגואים, איורים, אייקונים ומסמכים.',
  robots: { index: false, follow: false },
}

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return children
}
