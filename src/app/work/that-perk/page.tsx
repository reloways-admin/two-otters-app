'use client'

import { useEffect, useState } from 'react'
import NavV6 from '@/components/v6/NavV6'
import '../../v6/styles.css'
import '../fincat/styles.css'
import './styles.css'
import en from '@/locales/v6-en.json'
import he from '@/locales/v6-he.json'

type Lang = 'en' | 'he'
const locales = { en, he } as const

const RESULT_META = [
  { bg: '#A8B5FD', icon: '🚗' },
  { bg: '#FFD166', icon: '🎁' },
  { bg: '#3ECF7E', icon: '📊' },
]

export default function ThatPerkCaseStudy() {
  const [lang, setLang] = useState<Lang>('he')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'en' || p === 'he') setLang(p)
  }, [])

  const t = locales[lang].caseThatPerk
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

          <a className="cs-cta-link" href="https://www.redigma.com/project/that-perk/" target="_blank" rel="noopener noreferrer">
            {t.viewLive}
          </a>

          <div className="cs-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/that-perk/cover.jpg" alt={t.coverAlt} />
          </div>
        </div>
      </header>

      {/* At a glance */}
      <section className="cs-section">
        <div className="cs-wrap">
          <span className="cs-kicker">{t.glanceKicker}</span>
          <h2 className="cs-h2">{t.glanceTitle}</h2>
          <p className="cs-body">{t.glanceBody}</p>
          <div className="cs-chips">
            {t.chips.map((c) => <span key={c} className="cs-chip">{c}</span>)}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-wrap">
          <div className="cs-soft">
            <span className="cs-kicker">{t.challengeKicker}</span>
            <h2 className="cs-h2">{t.challengeTitle}</h2>
            <p className="cs-body">{t.challengeBody}</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-wrap">
          <div className="cs-approach">
            <span className="cs-kicker">{t.approachKicker}</span>
            <h2 className="cs-h2">{t.approachTitle}</h2>
            <p className="cs-body" style={{ color: '#5b4fb0' }}>{t.approachBody}</p>
          </div>
        </div>
      </section>

      {/* Process — timeline */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-wrap">
          <span className="cs-kicker">{t.processKicker}</span>
          <h2 className="cs-h2">{t.processTitle}</h2>
          <div className="cs-steps">
            {t.steps.map((s, i) => (
              <div className="cs-step" key={i}>
                <span className="cs-step-num">{i + 1}</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase — real screens from the live site */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-wrap">
          <span className="cs-kicker">{t.showcaseKicker}</span>
          <h2 className="cs-h2">{t.showcaseTitle}</h2>
          <div className="cs-grid">
            {t.shots.map((cap, i) => (
              <figure className="cs-shot cs-span-3" key={cap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/that-perk/0${i + 1}.jpg`} alt={cap} loading="lazy" />
                <figcaption>{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-wrap">
          <span className="cs-kicker">{t.resultsKicker}</span>
          <h2 className="cs-h2">{t.resultsTitle}</h2>
          <div className="cs-results">
            {t.results.map((r, i) => (
              <div className="cs-result" key={r.b} style={{ background: RESULT_META[i % RESULT_META.length].bg }}>
                <span className="cs-result-icon" aria-hidden="true">{RESULT_META[i % RESULT_META.length].icon}</span>
                <b>{r.b}</b>
                <p>{r.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="cs-quote">
        <div className="cs-wrap">
          <blockquote>{t.quote}</blockquote>
          <cite>{t.quoteCite}</cite>
        </div>
      </section>

      {/* Deliverables */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-wrap">
          <span className="cs-kicker">{t.deliverKicker}</span>
          <h2 className="cs-h2">{t.deliverTitle}</h2>
          <ul className="cs-deliver">
            {t.deliverables.map((d) => <li key={d}>{d}</li>)}
          </ul>
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
