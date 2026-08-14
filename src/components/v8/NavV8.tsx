'use client'

import { useState, useEffect } from 'react'
import en from '@/locales/v8-en.json'

type NavT = typeof en.nav
type Lang = 'en' | 'he'

interface Props {
  t: NavT
  lang: Lang
  onLangChange: (lang: Lang) => void
  /** Prefix for anchor links — set to "/v8?lang=xx" on sub-pages so nav points back to the main page */
  hrefPrefix?: string
}

export default function NavV8({ t, lang, onLangChange, hrefPrefix = '' }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the full-screen menu so it can't scroll underneath
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : prev || ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`v8-nav${scrolled ? ' v8-nav--scrolled' : ''}`}>
        <div className="v8-nav-inner">
          {/* Right: logo + hamburger — first in DOM = right in RTL */}
          <div className="v8-nav-right">
            <a href={`${hrefPrefix}#`} className="v8-nav-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-2otters-black-vertical.svg" alt="The Two Otters Studio" className="v8-nav-logo-img" />
            </a>
            <button
              className="v8-nav-hamburger"
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              <span className={`v8-hamburger-bar ${open ? 'open' : ''}`} />
              <span className={`v8-hamburger-bar ${open ? 'open' : ''}`} />
              <span className={`v8-hamburger-bar ${open ? 'open' : ''}`} />
            </button>
          </div>

          {/* Center: nav links pill (desktop) */}
          <div className="v8-nav-links-wrap">
            {t.links.map(l => (
              <a key={l.href} href={`${hrefPrefix}${l.href}`} className="v8-nav-link">{l.label}</a>
            ))}
          </div>

          {/* Left: lang + CTA — last in DOM = left in RTL */}
          <div className="v8-nav-actions">
            <button
              className="v8-nav-lang"
              aria-label="Switch language"
              onClick={() => onLangChange(lang === 'he' ? 'en' : 'he')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lang === 'he' ? '/language-english.svg' : '/language-hebrew.svg'}
                alt={lang === 'he' ? 'Switch to English' : 'Switch to Hebrew'}
                width={28}
                height={28}
              />
            </button>
            <a href={`${hrefPrefix}#contact`} className="v8-btn-primary v8-nav-cta-desktop">{t.cta}</a>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`v8-nav-drawer ${open ? 'v8-nav-drawer--open' : ''}`} aria-hidden={!open}>
        <div className="v8-nav-drawer-inner">
          {t.links.map(l => (
            <a key={l.href} href={`${hrefPrefix}${l.href}`} className="v8-nav-drawer-link" onClick={close}>
              {l.label}
            </a>
          ))}
          <a href={`${hrefPrefix}#contact`} className="v8-btn-primary v8-nav-drawer-cta" onClick={close}>
            {t.cta}
          </a>
        </div>
      </div>

    </>
  )
}
