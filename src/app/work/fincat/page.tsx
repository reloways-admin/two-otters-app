'use client'

import { useEffect, useState } from 'react'
import NavV6 from '@/components/v6/NavV6'
import '../../v6/styles.css'
import './styles.css'
import en from '@/locales/v6-en.json'
import he from '@/locales/v6-he.json'

type Lang = 'en' | 'he'
const locales = { en, he } as const

const SHOTS = [
  { src: '/fincat/mascots.png', contain: true },
  { src: '/fincat/icons.png', contain: true },
  { src: '/fincat/onboarding.png', contain: false },
  { src: '/fincat/community.avif', contain: false },
  { src: '/fincat/landing.png', contain: false },
  { src: '/fincat/walkthrough.png', contain: false },
]

export default function FinCatCaseStudy() {
  const [lang, setLang] = useState<Lang>('he')

  // Pick up ?lang= from the URL on mount (so links from the site keep the language)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'en' || p === 'he') setLang(p)
  }, [])

  const t = locales[lang].caseFincat
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

          <a className="cs-cta-link" href="https://fincat.co.il/" target="_blank" rel="noopener noreferrer">
            {t.viewLive}
          </a>

          <div className="cs-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/cover.jpg" alt={t.coverAlt} />
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

      {/* Woven collaboration */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-wrap">
          <span className="cs-kicker">{t.workedKicker}</span>
          <h2 className="cs-h2">{t.workedTitle}</h2>
          <p className="cs-body">{t.workedBody}</p>

          <div className="cs-tracks">
            <span className="cs-track-tag amir"><span className="cs-dot" />{t.trackAmir}</span>
            <span className="cs-track-tag keren"><span className="cs-dot" />{t.trackKeren}</span>
          </div>

          <div className="cs-loops">
            {t.loops.map((loop, i) => {
              const leftKeren = loop.first === 'keren'
              const left = leftKeren
                ? { who: t.trackKeren.split(' ·')[0], cls: 'keren', text: loop.keren }
                : { who: t.trackAmir.split(' ·')[0], cls: 'amir', text: loop.amir }
              const right = leftKeren
                ? { who: t.trackAmir.split(' ·')[0], cls: 'amir', text: loop.amir }
                : { who: t.trackKeren.split(' ·')[0], cls: 'keren', text: loop.keren }
              return (
                <div className="cs-loop" key={i}>
                  <div className={`cs-loop-card ${left.cls}`}>
                    <span className="who"><span className="cs-dot" />{left.who}</span>
                    <p>{left.text}</p>
                  </div>
                  <div className="cs-loop-link" aria-hidden="true">⇄</div>
                  <div className={`cs-loop-card ${right.cls}`}>
                    <span className="who"><span className="cs-dot" />{right.who}</span>
                    <p>{right.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="cs-loop-note">{t.loopNote}</p>
        </div>
      </section>

      {/* Showcase */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-wrap">
          <span className="cs-kicker">{t.showcaseKicker}</span>
          <h2 className="cs-h2">{t.showcaseTitle}</h2>
          <div className="cs-grid">
            {SHOTS.map((shot, i) => (
              <figure className={`cs-shot cs-span-3${shot.contain ? ' contain' : ''}`} key={shot.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={t.shots[i]} />
                <figcaption>{t.shots[i]}</figcaption>
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
            {t.results.map((r) => (
              <div className="cs-result" key={r.b}>
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
          <h2>{t.finalTitle}</h2>
          <p>{t.finalSub}</p>
          <div className="cs-final-row">
            <a className="cs-cta-link" href={`/v6?lang=${lang}#contact`}>{t.finalCta}</a>
            <a className="ghost" href={`/v6?lang=${lang}#work`}>{t.finalGhost}</a>
          </div>
        </div>
      </section>
    </main>
  )
}
