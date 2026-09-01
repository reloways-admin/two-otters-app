'use client'

import { useState, useEffect, type CSSProperties } from 'react'
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
      <nav className={`v8-nav${scrolled ? ' v8-nav--scrolled' : ''}${open ? ' v8-nav--menu-open' : ''}`}>
        <div className="v8-nav-inner">
          {/* Right: logo + hamburger — first in DOM = right in RTL */}
          <div className="v8-nav-right">
            <a href={`${hrefPrefix}#`} className="v8-nav-logo">
              {/* White over the dark hero at the top; black once the nav turns white on scroll */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scrolled || open ? '/v8-logo-dark.svg' : '/v8-logo-white.svg'}
                alt="The Two Otters Studio"
                className="v8-nav-logo-img"
              />
              {/* Mobile: the mark alone — the wordmark is illegible at nav size.
                  Goes solid navy on the white scrolled nav, same as the full logo. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scrolled || open ? '/v8-logo-mark-dark.svg' : '/v8-logo-mark.svg'}
                alt=""
                aria-hidden="true"
                className="v8-nav-logo-mark"
              />
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
          {/* --i drives the staggered rise-in (see .v8-nav-drawer--open in styles.css) */}
          {t.links.map((l, i) => (
            <a
              key={l.href}
              href={`${hrefPrefix}${l.href}`}
              className="v8-nav-drawer-link"
              style={{ '--i': i } as CSSProperties}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Pinned to the bottom of the drawer, whatever the link list does */}
        <div className="v8-nav-drawer-foot">
          <a
            href={`${hrefPrefix}#contact`}
            className="v8-btn-primary v8-nav-drawer-cta"
            style={{ '--i': t.links.length } as CSSProperties}
            onClick={close}
          >
            <span>{t.cta}</span>
            <span className="v8-nav-drawer-cta-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

    </>
  )
}
