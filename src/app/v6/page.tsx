'use client'

import { useState, useEffect } from 'react'
import NavV6 from '@/components/v6/NavV6'
import HeroV6 from '@/components/v6/HeroV6'
import WorkV6 from '@/components/v6/WorkV6'
import GasInNeutralV6 from '@/components/v6/GasInNeutralV6'
import SpiralV6 from '@/components/v6/SpiralV6'
import WhatWeOfferV6 from '@/components/v6/WhatWeOfferV6'
import WhoCanWorkV6 from '@/components/v6/WhoCanWorkV6'
import WhoWeAreV6 from '@/components/v6/WhoWeAreV6'
import TestimonialsV6 from '@/components/v6/TestimonialsV6'
import FaqV6 from '@/components/v6/FaqV6'
import ContactV6 from '@/components/v6/ContactV6'
import FooterV6 from '@/components/v6/FooterV6'
import './styles.css'
import en from '@/locales/v6-en.json'
import he from '@/locales/v6-he.json'

type Lang = 'en' | 'he'
const locales = { en, he } as const

export default function V6Page() {
  const [lang, setLang] = useState<Lang>('he')
  const t = locales[lang]
  const isRTL = lang === 'he'

  // Honor ?lang= so navigating to/from sub-pages (e.g. case studies) keeps the language
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'en' || p === 'he') setLang(p)
  }, [])

  return (
    <div className="v6-page" dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <NavV6 t={t.nav} lang={lang} onLangChange={setLang} />
      <main>
        <HeroV6 t={t.hero} lang={lang} />
        <WorkV6 t={t.work} lang={lang} />
        <GasInNeutralV6 t={t.gas} lang={lang} />
        <SpiralV6 t={t.spiral} lang={lang} />
        <WhatWeOfferV6 t={t.offer} isRTL={isRTL} />
        <WhoCanWorkV6 t={t.who} lang={lang} />
        <WhoWeAreV6 t={t.about} lang={lang} />
        <TestimonialsV6 t={t.testimonials} />
        <FaqV6 t={t.faq} />
        <ContactV6 t={t.contact} />
      </main>
      <FooterV6 t={t.footer} />
    </div>
  )
}
