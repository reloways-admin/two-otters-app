import type { Metadata } from 'next'
import NavV10 from '@/components/v10/NavV10'
import FooterV10 from '@/components/v10/FooterV10'
import t from '@/locales/v10-he.json'
import '../v8/styles.css'
import '../audit/audit.css'
import './styles.css'

// The live site. Indexable, unlike the /v2…/v9 history pages (see robots.ts).
// metadataBase and the Search Console tag come from the root layout. Each page
// sets its own canonical; the pages below only give their short title and the
// template adds the studio name.
export const metadata: Metadata = {
  title: {
    default: 'Two Otters Studio · אסטרטגיה, מיתוג ו-UX ממקום אחד',
    template: '%s · Two Otters Studio',
  },
  description:
    'סטודיו לאסטרטגיה, מיתוג ו-UX. קודם בונים פרוטוטייפ עובד שאפשר ללחוץ עליו, ומתוך השימוש מדייקים, כותבים ומעצבים עד שהכל יושב בול.',
  alternates: { canonical: '/' },
}

/**
 * The shell every page of the site shares: header with the mega menus, footer,
 * and the stylesheets. The site is multi-page (home, services, work, partners,
 * about, contact), unlike v8's single page, so the frame lives here once
 * instead of in each page.
 *
 * Hebrew only for now (English: docs/TODO-english.md); the root layout already
 * declares lang="he" dir="rtl".
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v8-page v10" dir="rtl" lang="he">
      <NavV10 t={t.nav} />
      <main>{children}</main>
      <FooterV10 t={t.footer} />
    </div>
  )
}
