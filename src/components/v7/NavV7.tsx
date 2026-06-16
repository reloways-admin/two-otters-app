'use client'

import { useState, useEffect } from 'react'
import en from '@/locales/v7-en.json'

type NavT = typeof en.nav
type Lang = 'en' | 'he'

interface Props {
  t: NavT
  lang: Lang
  onLangChange: (lang: Lang) => void
  /** Prefix for anchor links — set to "/v7?lang=xx" on sub-pages so nav points back to the main page */
  hrefPrefix?: string
}

export default function NavV7({ t, lang, onLangChange, hrefPrefix = '' }: Props) {
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
      <nav className={`v7-nav${scrolled ? ' v7-nav--scrolled' : ''}`}>
        <div className="v7-nav-inner">
          {/* Right: logo + hamburger — first in DOM = right in RTL */}
          <div className="v7-nav-right">
            <a href={`${hrefPrefix}#`} className="v7-nav-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-2otters-black-vertical.svg" alt="The Two Otters Studio" className="v7-nav-logo-img" />
            </a>
            <button
              className="v7-nav-hamburger"
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              <span className={`v7-hamburger-bar ${open ? 'open' : ''}`} />
              <span className={`v7-hamburger-bar ${open ? 'open' : ''}`} />
              <span className={`v7-hamburger-bar ${open ? 'open' : ''}`} />
            </button>
          </div>

          {/* Center: nav links pill (desktop) */}
          <div className="v7-nav-links-wrap">
            {t.links.map(l => (
              <a key={l.href} href={`${hrefPrefix}${l.href}`} className="v7-nav-link">{l.label}</a>
            ))}
          </div>

          {/* Left: lang + CTA — last in DOM = left in RTL */}
          <div className="v7-nav-actions">
            <button
              className="v7-nav-lang"
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
            <a href={`${hrefPrefix}#contact`} className="v7-btn-primary v7-nav-cta-desktop">{t.cta}</a>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`v7-nav-drawer ${open ? 'v7-nav-drawer--open' : ''}`} aria-hidden={!open}>
        <div className="v7-nav-drawer-inner">
          {t.links.map(l => (
            <a key={l.href} href={`${hrefPrefix}${l.href}`} className="v7-nav-drawer-link" onClick={close}>
              {l.label}
            </a>
          ))}
          <a href={`${hrefPrefix}#contact`} className="v7-btn-primary v7-nav-drawer-cta" onClick={close}>
            {t.cta}
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className="v7-nav-backdrop" onClick={close} aria-hidden="true" />}
    </>
  )
}
