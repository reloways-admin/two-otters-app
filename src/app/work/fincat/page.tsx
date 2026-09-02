'use client'

import { useEffect, useState, type ReactNode } from 'react'
import NavV8 from '@/components/v8/NavV8'
import ContactV8 from '@/components/v8/ContactV8'
import FooterV8 from '@/components/v8/FooterV8'
import en from '@/locales/v8-en.json'
import he from '@/locales/v8-he.json'
import '../../v8/styles.css'
import '../case-study-v8.css'

type Lang = 'en' | 'he'
const locales = { en, he } as const

type Fact = { label: string; value?: string; note: string }

function Facts({ items, variant }: { items: Fact[]; variant?: 'meta' }) {
  return (
    <div className={`cs8-facts${variant === 'meta' ? ' cs8-facts--meta' : ''}`}>
      {items.map(item => (
        <div key={item.label} className="cs8-fact">
          <span className="cs8-fact-label">{item.label}</span>
          {item.value && <span className="cs8-fact-value">{item.value}</span>}
          <span className="cs8-fact-note">{item.note}</span>
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
    <section className="cs8-prose">
      <div className={bare ? undefined : 'cs8-container'}>
        <div className="cs8-prose-inner">
          <div className="cs8-prose-heading">
            {kicker && <p className="cs8-prose-kicker">{kicker}</p>}
            <h2 className="cs8-prose-title">{title}</h2>
          </div>
          <div className="cs8-prose-body">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Band({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="cs8-band">
      <div className="cs8-container">
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
    const bar = document.querySelector<HTMLElement>('.cs8-progress')
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
    <main className="cs8" dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className="cs8-progress" aria-hidden="true" />

      <NavV8 t={l.nav} lang={lang} onLangChange={setLang} hrefPrefix={home} />

      {/* ── Hero ── */}
      <section className="cs8-hero">
        <div className="cs8-container">
          <div className="cs8-hero-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/cs/logo.svg" alt={t.logoAlt} className="cs8-hero-logo" />
            <h1 className="cs8-hero-title">{t.title}</h1>
          </div>

          <Facts items={t.stats} />

          <div className="cs8-hero-figure">
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
      <section className="cs8-materials">
        <div className="cs8-container">
          <Prose bare title={t.materials.title} paragraphs={t.materials.body} />

          <div className="cs8-materials-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/cs/materials.webp" alt={t.alt.materials} loading="lazy" />
          </div>

          {/* First column takes the start edge — right in Hebrew, left in English. */}
          <div className="cs8-cols">
            <div className="cs8-col">
              <div className="cs8-col-text">
                <h2 className="cs8-col-title">{t.cols[0].title}</h2>
                <p>{t.cols[0].body}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fincat/cs/project-mgmt.webp" alt={t.alt.projectMgmt} loading="lazy" />
            </div>

            <div className="cs8-col">
              <div className="cs8-col-text">
                <h2 className="cs8-col-title">{t.cols[1].title}</h2>
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
      <section className="cs8-quote">
        <div className="cs8-container">
          <blockquote className="cs8-quote-body">
            {t.quote.body.map((p, i) => <p key={i}>{p}</p>)}
          </blockquote>
          <cite className="cs8-quote-cite">{t.quote.cite}</cite>
        </div>
      </section>

      {/* ── Closing CTA — the site's live contact form, which already
             matches this section field-for-field ── */}
      <ContactV8 t={l.contact} />

      <FooterV8 t={l.footer} />
    </main>
  )
}
