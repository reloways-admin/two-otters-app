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

function Prose({ kicker, title, paragraphs, bare }: {
  kicker?: string
  title: string
  paragraphs: ReactNode[]
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

export default function The5ersCaseStudy() {
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
  const t = l.caseThe5ers
  const isRTL = lang === 'he'

  return (
    <main className="cs8" dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className="cs8-progress" aria-hidden="true" />

      <NavV8 t={l.nav} lang={lang} onLangChange={setLang} hrefPrefix={`/?lang=${lang}`} />

      {/* ── Hero ──
          No client logo: the Figma frame still carries FinCat's, left over from
          duplicating that template, and we have no The 5ers mark in the repo. */}
      <section className="cs8-hero">
        <div className="cs8-container">
          <div className="cs8-hero-head">
            <h1 className="cs8-hero-title">{t.title}</h1>
          </div>

          <Facts items={t.stats} />

          <div className="cs8-hero-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/the5ers/cs/hero.webp" alt={t.alt.hero} fetchPriority="high" />
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

      <Band src="/the5ers/cs/overview.webp" alt={t.alt.overview} />

      {/* ── Strategy ── */}
      <Prose title={t.strategy.title} paragraphs={t.strategy.body} />

      {/* ── Voice and content (dark, with its own image) ── */}
      <section className="cs8-materials">
        <div className="cs8-container">
          <Prose bare title={t.voice.title} paragraphs={t.voice.body} />
          <div className="cs8-materials-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/the5ers/cs/voice.webp" alt={t.alt.voice} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── Visual language ── */}
      <Prose kicker={t.visual.kicker} title={t.visual.title} paragraphs={t.visual.body} />

      <Band src="/the5ers/cs/visual.webp" alt={t.alt.visual} />

      {/* ── What was delivered ── */}
      <Prose title={t.delivered.title} paragraphs={t.delivered.body} />

      <Band src="/the5ers/cs/delivered.webp" alt={t.alt.delivered} />

      {/* ── Testimonial ── */}
      <section className="cs8-quote">
        <div className="cs8-container">
          <blockquote className="cs8-quote-body">
            {t.quote.body.map((p, i) => <p key={i}>{p}</p>)}
          </blockquote>
          <cite className="cs8-quote-cite">{t.quote.cite}</cite>
        </div>
      </section>

      <ContactV8 t={l.contact} />
      <FooterV8 t={l.footer} />
    </main>
  )
}
