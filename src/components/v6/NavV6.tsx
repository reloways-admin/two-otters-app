'use client'

import Image from 'next/image'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'למה אנחנו',     href: '#process' },
  { label: 'שיטת הספירלה', href: '#spiral' },
  { label: 'המוצרים שלנו', href: '#offer' },
  { label: 'למי מתאים',    href: '#who' },
  { label: 'עלינו',         href: '#about' },
  { label: 'שאלות',        href: '#faq' },
]

export default function NavV6() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <nav className="v6-nav">
        <div className="v6-nav-inner">
          {/* Right: logo + hamburger — first in DOM = right in RTL */}
          <div className="v6-nav-right">
            <a href="#" className="v6-nav-logo">
              <Image src="/logo.png" alt="The Two Otters Studio" width={80} height={80} priority />
            </a>
            <button
              className="v6-nav-hamburger"
              aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}
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
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="v6-nav-link">{l.label}</a>
            ))}
          </div>

          {/* Left: lang + CTA — last in DOM = left in RTL */}
          <div className="v6-nav-actions">
            <button className="v6-nav-lang" aria-label="Switch language">🇺🇸</button>
            <a href="#contact" className="v6-btn-primary v6-nav-cta-desktop">בואו נדבר</a>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`v6-nav-drawer ${open ? 'v6-nav-drawer--open' : ''}`} aria-hidden={!open}>
        <div className="v6-nav-drawer-inner">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="v6-nav-drawer-link" onClick={close}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="v6-btn-primary v6-nav-drawer-cta" onClick={close}>
            בואו נדבר
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className="v6-nav-backdrop" onClick={close} aria-hidden="true" />}
    </>
  )
}
