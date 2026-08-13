'use client'

import { useState, useEffect } from 'react'
import NavV8 from '@/components/v8/NavV8'
import HeroV8 from '@/components/v8/HeroV8'
import WorkV8 from '@/components/v8/WorkV8'
import GasInNeutralV8 from '@/components/v8/GasInNeutralV8'
import SpiralV8 from '@/components/v8/SpiralV8'
import WhatWeOfferV8 from '@/components/v8/WhatWeOfferV8'
import WhoCanWorkV8 from '@/components/v8/WhoCanWorkV8'
import WhoWeAreV8 from '@/components/v8/WhoWeAreV8'
import TestimonialsV8 from '@/components/v8/TestimonialsV8'
import FaqV8 from '@/components/v8/FaqV8'
import ContactV8 from '@/components/v8/ContactV8'
import FooterV8 from '@/components/v8/FooterV8'
import './styles.css'
import en from '@/locales/v8-en.json'
import he from '@/locales/v8-he.json'

type Lang = 'en' | 'he'
const locales = { en, he } as const

export default function V8Page() {
  const [lang, setLang] = useState<Lang>('he')
  const t = locales[lang]
  const isRTL = lang === 'he'

  // Honor ?lang= so navigating to/from sub-pages (e.g. case studies) keeps the language
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'en' || p === 'he') setLang(p)
  }, [])

  return (
    <div className="v8-page" dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <NavV8 t={t.nav} lang={lang} onLangChange={setLang} />
      <main>
        <HeroV8 t={t.hero} lang={lang} />
        <WorkV8 t={t.work} lang={lang} />
        <GasInNeutralV8 t={t.gas} lang={lang} />
        <SpiralV8 t={t.spiral} lang={lang} />
        <WhatWeOfferV8 t={t.offer} isRTL={isRTL} />
        <WhoCanWorkV8 t={t.who} lang={lang} />
        <WhoWeAreV8 t={t.about} lang={lang} />
        <TestimonialsV8 t={t.testimonials} />
        <FaqV8 t={t.faq} />
        <ContactV8 t={t.contact} />
      </main>
      <FooterV8 t={t.footer} />
    </div>
  )
}
