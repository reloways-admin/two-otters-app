'use client'

import { useEffect } from 'react'
import NavV8 from '@/components/v8/NavV8'
import WhatWeOfferV8 from '@/components/v8/WhatWeOfferV8'
import WhoCanWorkV8 from '@/components/v8/WhoCanWorkV8'
import WorkV8 from '@/components/v8/WorkV8'
import SpiralV8 from '@/components/v8/SpiralV8'
import TestimonialsV8 from '@/components/v8/TestimonialsV8'
import WhoWeAreV8 from '@/components/v8/WhoWeAreV8'
import ContactV8 from '@/components/v8/ContactV8'
import HeroV10 from '@/components/v10/HeroV10'
import ShowreelV10 from '@/components/v10/ShowreelV10'
import PartnersBandV10 from '@/components/v10/PartnersBandV10'
import FaqV10 from '@/components/v10/FaqV10'
import FooterV10 from '@/components/v10/FooterV10'
import '../v8/styles.css'
import '../audit/audit.css'
import './styles.css'
import t from '@/locales/v10-he.json'

/**
 * v10 — Keren's next homepage, from the next-site artifact (6.10.2026).
 *
 * Hebrew only: the design exists only in Hebrew so far. Sections the artifact
 * kept from v8 reuse the v8 components with v10 copy; what is new lives in
 * components/v10. Two deliberate departures from the artifact, both because
 * the pages it links to aren't built yet: the contact form stays at the bottom
 * (the artifact moves it to its own page), and links to services / partners /
 * tools pages point at the matching section on this page instead.
 */
export default function V10Page() {
  useEffect(() => {
    document.documentElement.lang = 'he'
    document.documentElement.dir = 'rtl'
  }, [])

  return (
    <div className="v8-page v10" dir="rtl" lang="he">
      {/* No English v10 yet, so the language switch goes to the live English site. */}
      <NavV8 t={t.nav} lang="he" onLangChange={() => { window.location.href = '/?lang=en' }} />
      <main>
        <HeroV10 t={t.hero} />
        <ShowreelV10 video={t.video} logos={t.logos} />
        <WhatWeOfferV8 t={t.offer} isRTL />
        <WhoCanWorkV8 t={t.who} lang="he" />
        <WorkV8 t={t.work} lang="he" />
        <SpiralV8 t={t.spiral} lang="he" />
        <PartnersBandV10 t={t.partners} />
        <TestimonialsV8 t={t.testimonials} />
        <WhoWeAreV8 t={t.about} lang="he" />
        <FaqV10 t={t.faq} ask={t.ask} />
        <ContactV8 t={t.contact} lang="he" />
      </main>
      <FooterV10 t={t.footer} />
    </div>
  )
}
