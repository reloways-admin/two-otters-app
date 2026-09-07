'use client'

import { useEffect, useState, type ReactNode } from 'react'
import NavV8 from '@/components/v8/NavV8'
import FooterV8 from '@/components/v8/FooterV8'
import en from '@/locales/v8-en.json'
import he from '@/locales/v8-he.json'
import '../v8/styles.css'
import './legal.css'

type Lang = 'en' | 'he'
const locales = { en, he } as const

export type LegalTab = 'privacy' | 'accessibility'

/**
 * solar:arrow-right-linear, inlined from the Iconify set rather than pulled
 * through @iconify/react — that component fetches the glyph from Iconify's API
 * on every render, which would put a third-party request on a page whose whole
 * point is that the site makes none.
 *
 * The `linear` variant is drawn as a stroke rather than a filled shape, so the
 * weight is a number we control; the `outline` variant we started with is a
 * fixed thin shape that only ever gets bigger, never heavier. Solar ships it at
 * 1.5, which read as spindly next to the text. `currentColor` keeps it on the
 * link colour.
 */
function ArrowRight() {
  return (
    <svg
      className="legal-back-icon"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="M4 12H20M14 18L20 12L14 6"
      />
    </svg>
  )
}

const TABS: { id: LegalTab; href: string }[] = [
  { id: 'accessibility', href: '/accessibility' },
  { id: 'privacy', href: '/privacy' },
]

export default function LegalShell({
  active,
  title,
  updated,
  children,
}: {
  active: LegalTab
  title: string
  updated: string
  children: ReactNode
}) {
  const [lang, setLang] = useState<Lang>('he')
  const l = locales[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <div className="v8-page legal" dir="rtl" lang="he">
      <NavV8 t={l.nav} lang={lang} onLangChange={setLang} hrefPrefix={`/?lang=${lang}`} />

      <main className="legal-main">
        <div className="legal-inner">
          {/* In RTL, "back" travels to the right, so the arrow points that way.
              Marked decorative: the link text already says where it goes. */}
          <a href="/" className="legal-back">
            <ArrowRight />
            חזרה לאתר
          </a>

          {/* Real links, not client-side navigation: each document keeps its own
              URL (Meta needs a stable privacy-policy address, and the
              accessibility statement has to be linkable on its own), and a plain
              href loads the page from the top instead of scroll-jumping. */}
          <nav className="legal-tabs" aria-label="מסמכים">
            {TABS.map(tab => {
              const isActive = tab.id === active
              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  className={`legal-tab${isActive ? ' legal-tab--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {l.footer.legal[tab.id]}
                </a>
              )
            })}
          </nav>

          <h1>{title}</h1>
          <p className="legal-updated">עודכן לאחרונה: {updated}</p>

          {children}
        </div>
      </main>

      <FooterV8 t={l.footer} hrefPrefix={`/?lang=${lang}`} />
    </div>
  )
}
