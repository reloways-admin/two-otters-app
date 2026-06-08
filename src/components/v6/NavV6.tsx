'use client'

import { useState, useEffect } from 'react'
import en from '@/locales/v6-en.json'

type NavT = typeof en.nav
type Lang = 'en' | 'he'

interface Props {
  t: NavT
  lang: Lang
  onLangChange: (lang: Lang) => void
  /** Prefix for anchor links — set to "/v6?lang=xx" on sub-pages so nav points back to the main page */
  hrefPrefix?: string
}

export default function NavV6({ t, lang, onLangChange, hrefPrefix = '' }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`v6-nav${scrolled ? ' v6-nav--scrolled' : ''}`}>
        <div className="v6-nav-inner">
          {/* Right: logo + hamburger — first in DOM = right in RTL */}
          <div className="v6-nav-right">
            <a href={`${hrefPrefix}#`} className="v6-nav-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-black.svg" alt="The Two Otters Studio" className="v6-nav-logo-img" />
            </a>
            <button
              className="v6-nav-hamburger"
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              <span className={`v6-hamburger-bar ${open ? 'open' : ''}`} />
              <span className={`v6-hamburger-bar ${open ? 'open' : ''}`} />
              <span className={`v6-hamburger-bar ${open ? 'open' : ''}`} />
            </button>
          </div>

          {/* Center: nav links pill (desktop) */}
          <div className="v6-nav-links-wrap">
            {t.links.map(l => (
              <a key={l.href} href={`${hrefPrefix}${l.href}`} className="v6-nav-link">{l.label}</a>
            ))}
          </div>

          {/* Left: lang + CTA — last in DOM = left in RTL */}
          <div className="v6-nav-actions">
            <button
              className="v6-nav-lang"
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
            <a href={`${hrefPrefix}#contact`} className="v6-btn-primary v6-nav-cta-desktop">{t.cta}</a>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`v6-nav-drawer ${open ? 'v6-nav-drawer--open' : ''}`} aria-hidden={!open}>
        <div className="v6-nav-drawer-inner">
          {t.links.map(l => (
            <a key={l.href} href={`${hrefPrefix}${l.href}`} className="v6-nav-drawer-link" onClick={close}>
              {l.label}
            </a>
          ))}
          <a href={`${hrefPrefix}#contact`} className="v6-btn-primary v6-nav-drawer-cta" onClick={close}>
            {t.cta}
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className="v6-nav-backdrop" onClick={close} aria-hidden="true" />}
    </>
  )
}
