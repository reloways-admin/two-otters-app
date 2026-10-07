import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'דברו איתנו · Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

export default function V10ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
