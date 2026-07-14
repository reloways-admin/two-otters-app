'use client'

import { useEffect, useState } from 'react'
import NavV6 from '@/components/v6/NavV6'
import '../../v6/styles.css'
import '../fincat/styles.css'
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

      {/* Hero */}
      <header className="cs-hero">
        <div className="cs-wrap">
          <span className="cs-eyebrow">{t.eyebrow}</span>
          <h1 className="cs-h1">
            {t.titleA}<span className="u">{t.titleHi}</span>
          </h1>
          <p className="cs-lede">{t.lede}</p>

          <dl className="cs-meta">
            <div><dt>{t.clientL}</dt><dd>{t.client}</dd></div>
            <div><dt>{t.industryL}</dt><dd>{t.industry}</dd></div>
            <div><dt>{t.roleL}</dt><dd>{t.role}</dd></div>
            <div><dt>{t.timelineL}</dt><dd>{t.timeline}</dd></div>
          </dl>

          <a className="cs-cta-link" href="https://the5ers.com/" target="_blank" rel="noopener noreferrer">
            {t.viewLive}
          </a>

          <div className="cs-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/the5ers/cover.jpg" alt={t.coverAlt} />
          </div>
        </div>
      </header>

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
