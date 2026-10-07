import type { Metadata } from 'next'

// A draft for review, like /v2…/v9: never indexed (see robots.ts).
export const metadata: Metadata = {
  title: 'Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

export default function V10Layout({ children }: { children: React.ReactNode }) {
  return children
}
