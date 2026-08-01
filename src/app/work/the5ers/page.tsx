'use client'

import { useEffect, useState } from 'react'
import NavV6 from '@/components/v6/NavV6'
import '../../v6/styles.css'
import '../case-study.css'
import en from '@/locales/v6-en.json'
import he from '@/locales/v6-he.json'

type Lang = 'en' | 'he'
const locales = { en, he } as const

export default function The5ersCaseStudy() {
  const [lang, setLang] = useState<Lang>('he')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'en' || p === 'he') setLang(p)
  }, [])

  const t = locales[lang].caseThe5ers
  const isRTL = lang === 'he'

  return (
    <main className="cs" dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <NavV6 t={locales[lang].nav} lang={lang} onLangChange={setLang} hrefPrefix={`/v6?lang=${lang}`} />

      {/* Hero — FinCat-style two-column (text right, meta cols left) */}
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-tag">{t.eyebrow}</div>
            <h1>{t.titleA}<span className="u">{t.titleHi}</span></h1>
            <p className="hero-sub">{t.lede}</p>
          </div>
          <aside className="hero-meta">
            <div className="hero-meta-cols">
              <div className="hmc"><span className="hmc-label">{t.industryL}</span><span className="hmc-value">{t.industry}</span></div>
              <div className="hmc"><span className="hmc-label">{t.roleL}</span><span className="hmc-value">{t.role}</span></div>
              <div className="hmc"><span className="hmc-label">{t.timelineL}</span><span className="hmc-value">{t.timeline}</span></div>
            </div>
            <a className="hero-live-link" href="https://the5ers.com/" target="_blank" rel="noopener noreferrer">
              {t.viewLive}
            </a>
          </aside>
        </div>
      </header>
      <div className="cs-hero-media">
        <div className="cs-hero-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/the5ers/cover.jpg" alt={t.coverAlt} />
        </div>
      </div>

      {/* At a glance */}
      <section className="cs-section">
        <div className="cs-wrap">
          <span className="cs-kicker">{t.glanceKicker}</span>
          <h2 className="cs-h2">{t.glanceTitle}</h2>
          <p className="cs-body">{t.glanceBody}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cs-wrap">
        <div className="cs-final">
          <span className="cs-final-otter cs-final-otter--start" aria-hidden="true" />
          <span className="cs-final-otter cs-final-otter--end" aria-hidden="true" />
          <div className="cs-final-inner">
            <h2>{t.finalTitle}</h2>
            <p>{t.finalSub}</p>
            <div className="cs-final-row">
              <a className="cs-final-btn" href={`/v6?lang=${lang}#contact`}>{t.finalCta}</a>
              <a className="cs-final-ghost" href={`/v6?lang=${lang}#work`}>{t.finalGhost}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
