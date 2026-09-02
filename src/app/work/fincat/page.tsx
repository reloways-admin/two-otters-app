'use client'

import { useEffect, useState, type ReactNode } from 'react'
import NavV8 from '@/components/v8/NavV8'
import ContactV8 from '@/components/v8/ContactV8'
import FooterV8 from '@/components/v8/FooterV8'
import en from '@/locales/v8-en.json'
import he from '@/locales/v8-he.json'
import '../../v8/styles.css'
import './case.css'

type Lang = 'en' | 'he'
const locales = { en, he } as const

type Fact = { label: string; value?: string; note: string }

function Facts({ items, variant }: { items: Fact[]; variant?: 'meta' }) {
  return (
    <div className={`fc-facts${variant === 'meta' ? ' fc-facts--meta' : ''}`}>
      {items.map(item => (
        <div key={item.label} className="fc-fact">
          <span className="fc-fact-label">{item.label}</span>
          {item.value && <span className="fc-fact-value">{item.value}</span>}
          <span className="fc-fact-note">{item.note}</span>
        </div>
      ))}
    </div>
  )
}

/** A heading column plus body copy — the page's repeating text block. */
function Prose({ kicker, title, paragraphs, bare }: {
  kicker?: string
  title: string
  paragraphs: ReactNode[]
  /** Inside an already-padded dark section, drop the background and padding. */
  bare?: boolean
}) {
  return (
    <section className="fc-prose">
      <div className={bare ? undefined : 'fc-container'}>
        <div className="fc-prose-inner">
          <div className="fc-prose-heading">
            {kicker && <p className="fc-prose-kicker">{kicker}</p>}
            <h2 className="fc-prose-title">{title}</h2>
          </div>
          <div className="fc-prose-body">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Band({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="fc-band">
      <div className="fc-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </section>
  )
}

export default function FinCatCaseStudy() {
  const [lang, setLang] = useState<Lang>('he')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'en' || p === 'he') setLang(p)
  }, [])

  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.fc-progress')
    if (!bar) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%'
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const l = locales[lang]
  const t = l.caseFincat
  const isRTL = lang === 'he'
  const home = `/?lang=${lang}`

  return (
    <main className="fc" dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className="fc-progress" aria-hidden="true" />

      <NavV8 t={l.nav} lang={lang} onLangChange={setLang} hrefPrefix={home} />

      {/* ── Hero ── */}
      <section className="fc-hero">
        <div className="fc-container">
          <div className="fc-hero-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/cs/logo.svg" alt={t.logoAlt} className="fc-hero-logo" />
            <h1 className="fc-hero-title">{t.title}</h1>
          </div>

          <Facts items={t.stats} />

          <div className="fc-hero-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/cs/hero.webp" alt={t.alt.hero} fetchPriority="high" />
          </div>

          <Facts items={t.meta} variant="meta" />
        </div>
      </section>

      {/* ── Overview ── */}
      <Prose
        title={t.overview.title}
        paragraphs={t.overview.body.map((p, i) =>
          i === 0 ? <><b>{t.overview.boldLead}</b>{p}</> : p
        )}
      />

      <Band src="/fincat/cs/overview.webp" alt={t.alt.overview} />

      {/* ── Strategy ── */}
      <Prose title={t.strategy.title} paragraphs={t.strategy.body} />

      {/* ── Marketing materials (dark, with two supporting columns) ── */}
      <section className="fc-materials">
        <div className="fc-container">
          <Prose bare title={t.materials.title} paragraphs={t.materials.body} />

          <div className="fc-materials-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/cs/materials.webp" alt={t.alt.materials} loading="lazy" />
          </div>

          {/* First column takes the start edge — right in Hebrew, left in English. */}
          <div className="fc-cols">
            <div className="fc-col">
              <div className="fc-col-text">
                <h2 className="fc-col-title">{t.cols[0].title}</h2>
                <p>{t.cols[0].body}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fincat/cs/project-mgmt.webp" alt={t.alt.projectMgmt} loading="lazy" />
            </div>

            <div className="fc-col">
              <div className="fc-col-text">
                <h2 className="fc-col-title">{t.cols[1].title}</h2>
                <p>{t.cols[1].body}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fincat/cs/brand-language.webp" alt={t.alt.brandLanguage} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Visual language ── */}
      <Prose kicker={t.visual.kicker} title={t.visual.title} paragraphs={t.strategy.body} />

      <Band src="/fincat/cs/visual-language.webp" alt={t.alt.visual} />

      {/* ── Running the operation ── */}
      <Prose title={t.operation.title} paragraphs={t.operation.body} />

      <Band src="/fincat/cs/operation.webp" alt={t.alt.operation} />

      {/* ── Testimonial ── */}
      <section className="fc-quote">
        <div className="fc-container">
          <blockquote className="fc-quote-body">
            {t.quote.body.map((p, i) => <p key={i}>{p}</p>)}
          </blockquote>
          <cite className="fc-quote-cite">{t.quote.cite}</cite>
        </div>
      </section>

      {/* ── Closing CTA — the site's live contact form, which already
             matches this section field-for-field ── */}
      <ContactV8 t={l.contact} />

      <FooterV8 t={l.footer} />
    </main>
  )
}
