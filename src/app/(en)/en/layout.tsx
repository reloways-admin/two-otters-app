import type { Metadata } from 'next'
import NavV10 from '@/components/v10/NavV10'
import FooterV10 from '@/components/v10/FooterV10'
import HtmlLangV10 from '@/components/v10/HtmlLangV10'
import t from '@/locales/v10-en.json'
import '../../v8/styles.css'
import '../../audit/audit.css'
import '../../(site)/styles.css'

export const metadata: Metadata = {
  title: 'Two Otters Studio · Strategy, branding and UX in one place',
  description:
    'A strategy, branding and UX studio. First we build a working prototype you can click, and from real use we refine, write and design until everything fits just right.',
  alternates: { canonical: '/en', languages: { he: '/', en: '/en' } },
  openGraph: {
    type: 'website',
    siteName: 'Two Otters Studio',
    locale: 'en_US',
    url: '/en',
    title: 'Two Otters Studio · Strategy, branding and UX in one place',
    description: 'We start from the end, and the results are better. First a working prototype you can click, then we refine, write and design.',
    images: [{ url: '/og/two-otters-en.jpg', width: 1200, height: 630, alt: 'Amir and Keren, Two Otters Studio: we start from the end and the results are better' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og/two-otters-en.jpg'] },
}

/**
 * The English homepage. Only the homepage is translated for now; the menu and
 * footer are in English too, but the pages they lead to are still Hebrew
 * (docs/TODO-english.md). Same frame as the Hebrew site, left to right.
 */
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v8-page v10 v10-en" dir="ltr" lang="en">
      <HtmlLangV10 lang="en" dir="ltr" />
      <NavV10 t={t.nav} lang="en" />
      <main>{children}</main>
      <FooterV10 t={t.footer} />
    </div>
  )
}
