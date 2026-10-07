import type { Metadata } from 'next'
import NavV10 from '@/components/v10/NavV10'
import FooterV10 from '@/components/v10/FooterV10'
import t from '@/locales/v10-he.json'
import '../v8/styles.css'
import '../audit/audit.css'
import './styles.css'

// A draft for review, like /v2…/v9: never indexed (see robots.ts).
export const metadata: Metadata = {
  title: 'Two Otters Studio · v10 (טיוטה)',
  robots: { index: false, follow: false },
}

/**
 * The shell every v10 page shares: header with the mega menus, footer, and the
 * stylesheets. v10 is a multi-page site (home, services, work, partners,
 * about, contact), unlike v8's single page, so the frame lives here once
 * instead of in each page.
 *
 * Hebrew only for now; the root layout already declares lang="he" dir="rtl".
 */
export default function V10Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v8-page v10" dir="rtl" lang="he">
      <NavV10 t={t.nav} />
      <main>{children}</main>
      <FooterV10 t={t.footer} />
    </div>
  )
}
