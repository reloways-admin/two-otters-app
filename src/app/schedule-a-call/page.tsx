'use client'

import { useEffect, useState } from 'react'
import NavV8 from '@/components/v8/NavV8'
import BookCallV8 from '@/components/v8/BookCallV8'
import FooterV8 from '@/components/v8/FooterV8'
import en from '@/locales/v8-en.json'
import he from '@/locales/v8-he.json'
import '../v8/styles.css'
import './styles.css'

type Lang = 'en' | 'he'
const locales = { en, he } as const

/** The hero carries one short voice, not the whole carousel — long quotes would
 *  push the calendar below the fold on a laptop. */
const QUOTE_MAX = 160

export default function ScheduleACallPage() {
  const [lang, setLang] = useState<Lang>('he')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'en' || p === 'he') setLang(p)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  const l = locales[lang]
  const t = l.bookCall
  const isRTL = lang === 'he'
  const home = `/?lang=${lang}`
  const quote = l.testimonials.items.find(i => i.quote.length <= QUOTE_MAX)

  return (
    <div className="v8-page" dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <NavV8 t={l.nav} lang={lang} onLangChange={setLang} hrefPrefix={home} />
      <main>
        <section className="v8-book-hero">
          <div className="v8-book-hero-inner">
            <div className="v8-book-copy">
              <span className="v8-book-chip">{t.chip}</span>
              <h1 className="v8-book-title">{t.title}</h1>
              <p className="v8-book-sub">{t.sub}</p>
              {quote && (
                <figure className="v8-book-quote">
                  <blockquote>“{quote.quote}”</blockquote>
                  <figcaption>
                    <strong>{quote.name}</strong>
                    <span>{quote.role}</span>
                  </figcaption>
                </figure>
              )}
            </div>
            <BookCallV8 t={t} lang={lang} />
          </div>
        </section>

        <section className="v8-book-steps">
          <div className="v8-container">
            <h2 className="v8-book-steps-title">{t.stepsTitle}</h2>
            <ol className="v8-book-steps-list">
              {t.steps.map((step, i) => (
                <li key={step.title} className="v8-book-step">
                  {/* bdi: otherwise RTL flips the slash to the far side ("01/") */}
                  <span className="v8-book-step-num"><bdi>/{String(i + 1).padStart(2, '0')}</bdi></span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <FooterV8 t={l.footer} hrefPrefix={home} />
    </div>
  )
}
