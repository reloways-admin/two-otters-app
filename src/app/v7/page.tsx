'use client'

import { useState, useEffect } from 'react'
import NavV7 from '@/components/v7/NavV7'
import HeroV7 from '@/components/v7/HeroV7'
import WorkV7 from '@/components/v7/WorkV7'
import GasInNeutralV7 from '@/components/v7/GasInNeutralV7'
import SpiralV7 from '@/components/v7/SpiralV7'
import WhatWeOfferV7 from '@/components/v7/WhatWeOfferV7'
import WhoCanWorkV7 from '@/components/v7/WhoCanWorkV7'
import WhoWeAreV7 from '@/components/v7/WhoWeAreV7'
import TestimonialsV7 from '@/components/v7/TestimonialsV7'
import FaqV7 from '@/components/v7/FaqV7'
import ContactV7 from '@/components/v7/ContactV7'
import FooterV7 from '@/components/v7/FooterV7'
import './styles.css'
import en from '@/locales/v7-en.json'
import he from '@/locales/v7-he.json'

type Lang = 'en' | 'he'
const locales = { en, he } as const

export default function V7Page() {
  const [lang, setLang] = useState<Lang>('he')
  const t = locales[lang]
  const isRTL = lang === 'he'

  // Honor ?lang= so navigating to/from sub-pages (e.g. case studies) keeps the language
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'en' || p === 'he') setLang(p)
  }, [])

  return (
    <div className="v7-page" dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <NavV7 t={t.nav} lang={lang} onLangChange={setLang} />
      <main>
        <HeroV7 t={t.hero} lang={lang} />
        <WorkV7 t={t.work} lang={lang} />
        <GasInNeutralV7 t={t.gas} lang={lang} />
        <SpiralV7 t={t.spiral} lang={lang} />
        <WhatWeOfferV7 t={t.offer} isRTL={isRTL} />
        <WhoCanWorkV7 t={t.who} lang={lang} />
        <WhoWeAreV7 t={t.about} lang={lang} />
        <TestimonialsV7 t={t.testimonials} />
        <FaqV7 t={t.faq} />
        <ContactV7 t={t.contact} />
      </main>
      <FooterV7 t={t.footer} />
    </div>
  )
}
