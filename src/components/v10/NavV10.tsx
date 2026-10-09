'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { usePathname } from 'next/navigation'
import he from '@/locales/v10-he.json'
import { ROUTES, link as href } from './routes'
import ArrowLeftV10 from './ArrowLeftV10'

type NavT = typeof he.nav
type MegaT = NavT['menus'][number]

/** Pages whose top is a light, coloured hero (the four service pages) need the
 *  dark logo and hamburger from the start, not only once the nav turns white. */
const isLightTop = (path: string) => /^\/v10\/services\/[^/]+/.test(path)

/** Which top-level item a path belongs to, so the pill marks where you are. */
function activeKey(path: string): string | null {
  const seg = path.replace(/^\/v10\/?/, '').split('/')[0]
  return seg || null
}

const Chevron = () => (
  <svg className="v10-dr-chev" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * The v10 header: the v8 nav pill, with two items (services, partners) that
 * open a full-width mega menu on hover. The mobile drawer shows the same
 * areas as collapsible groups, so both screens offer the same choices.
 *
 * Hover intent matters here: the panel sits below a gap, and closing the
 * instant the pointer leaves the trigger made the menu vanish on the way down
 * to it. It closes only after the pointer has been away for 350ms, and an
 * invisible bridge (::before on the panel) covers the gap itself.
 */
export default function NavV10({ t }: { t: NavT }) {
  const pathname = usePathname() ?? '/v10'
  const [scrolled, setScrolled] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [openMega, setOpenMega] = useState<string | null>(null)
  const [megaTop, setMegaTop] = useState(120)
  const linksRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const drawerWasOpen = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The header's real height, as --v10-nav-h on the root, for anything that
  // sticks right under it (the partners page's section index). It changes with
  // the breakpoint and when scrolling shrinks the logo, so a fixed number left
  // a strip of page showing between the two bars at some widths.
  useEffect(() => {
    const nav = navRef.current
    if (!nav || typeof ResizeObserver === 'undefined') return
    const root = document.documentElement
    const set = () => root.style.setProperty('--v10-nav-h', `${Math.round(nav.getBoundingClientRect().height)}px`)
    const ro = new ResizeObserver(set)
    // border-box: scrolling shrinks the nav's padding, which a content-box
    // observer (the default) never reports.
    ro.observe(nav, { box: 'border-box' })
    set()
    return () => { ro.disconnect(); root.style.removeProperty('--v10-nav-h') }
  }, [])

  // A route change closes whatever was open.
  useEffect(() => { setOpenMega(null); setDrawer(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawer])

  // Keyboard users: Escape closes the drawer, focus moves into it on open and
  // goes back to the hamburger on close (it used to stay behind the overlay).
  useEffect(() => {
    if (drawer) {
      drawerWasOpen.current = true
      closeBtnRef.current?.focus()
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false) }
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
    if (drawerWasOpen.current) { drawerWasOpen.current = false; burgerRef.current?.focus() }
  }, [drawer])

  useEffect(() => {
    if (!openMega) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenMega(null) }
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.v10-has-mega')) setOpenMega(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick) }
  }, [openMega])

  const open = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    const r = linksRef.current?.getBoundingClientRect()
    // 12px gap under the pill; the hover bridge in styles.css is exactly this tall.
    if (r) setMegaTop(r.bottom + 12)
    setOpenMega(id)
  }
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMega(null), 350)
  }

  const light = scrolled || isLightTop(pathname)
  const current = activeKey(pathname)
  const menus = Object.fromEntries(t.menus.map(m => [m.id, m])) as Record<string, MegaT>

  return (
    <>
      <nav ref={navRef} className={`v8-nav v10-nav${scrolled ? ' v8-nav--scrolled' : ''}${light ? ' v10-nav--light' : ''}`}>
        <div className="v8-nav-inner">
          <div className="v8-nav-right">
            <a href={ROUTES.home} className="v8-nav-logo" aria-label={t.logoLabel}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={light ? '/v8-logo-dark.svg' : '/v8-logo-white.svg'} alt="The Two Otters Studio" className="v8-nav-logo-img" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={light ? '/v8-logo-mark-dark.svg' : '/v8-logo-mark.svg'} alt="" aria-hidden="true" className="v8-nav-logo-mark" />
            </a>
            <button ref={burgerRef} className="v8-nav-hamburger" aria-label={t.openMenu} aria-expanded={drawer} onClick={() => setDrawer(true)}>
              <span className="v8-hamburger-bar" /><span className="v8-hamburger-bar" /><span className="v8-hamburger-bar" />
            </button>
          </div>

          <div className="v8-nav-links-wrap" ref={linksRef}>
            {t.links.map(l => {
              const on = l.section === current ? ' v10-on' : ''
              const mega = l.menu ? menus[l.menu] : null
              if (!mega) return <a key={l.label} href={href(l.to)} className={`v8-nav-link${on}`}>{l.label}</a>
              return (
                <div
                  key={l.label}
                  className={`v10-has-mega${openMega === mega.id ? ' open' : ''}`}
                  style={{ '--v10-mega-top': `${megaTop}px` } as CSSProperties}
                  onFocus={() => open(mega.id)}
                  // Tabbing past the last card used to leave the panel open over the page.
                  onBlur={e => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setOpenMega(cur => (cur === mega.id ? null : cur))
                    }
                  }}
                  onKeyDown={e => { if (e.key === 'Escape') setOpenMega(null) }}
                >
                  <a
                    href={href(l.to)}
                    className={`v8-nav-link${on}`}
                    aria-haspopup="true"
                    aria-expanded={openMega === mega.id}
                    onMouseEnter={() => open(mega.id)}
                    onMouseLeave={closeSoon}
                  >
                    {l.label}
                  </a>
                  <div className="v10-mega">
                    <div className={`v10-mega-panel v10-mega-panel--${mega.cards.length + 1}`} onMouseEnter={() => open(mega.id)} onMouseLeave={closeSoon}>
                      <a className="v10-mega-feature" href={href(mega.to)}>
                        <span className="v10-kicker">{mega.kicker}</span>
                        <h3>{mega.title}</h3>
                        <p>{mega.text}</p>
                        <span className="v10-more">{mega.more} <ArrowLeftV10 size={18} /></span>
                      </a>
                      {mega.cards.map(c => (
                        <div key={c.title} className="v10-mega-col">
                          <a className="v10-mega-card" href={href(c.to)}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <span className="v10-mega-art" style={{ background: c.color }}><img src={c.art} alt="" /></span>
                            <b>{c.title}</b>
                            <small>{c.text}</small>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="v8-nav-actions">
            <a href={ROUTES.contact} className="v8-btn-primary v8-nav-cta-desktop">{t.cta}</a>
          </div>
        </div>
      </nav>

      <div className="v10-drawer" hidden={!drawer} onClick={e => { if ((e.target as Element).closest('a')) setDrawer(false) }}>
        <a className="v10-dr-top" href={ROUTES.home}>{t.homeLabel}</a>
        {t.links.map(l => {
          const mega = l.menu ? menus[l.menu] : null
          if (!mega) return <a key={l.label} className="v10-dr-top" href={href(l.to)}>{l.label}</a>
          return (
            <details key={l.label} className="v10-dr-group">
              <summary className="v10-dr-top">{l.label}<Chevron /></summary>
              <div className="v10-dr-panel">
                <a className="v10-dr-feature" href={href(mega.to)}>
                  <span className="v10-kicker">{mega.kicker}</span><b>{mega.title}</b><span className="v10-more">{mega.more} <ArrowLeftV10 size={18} /></span>
                </a>
                {mega.cards.map(c => (
                  <a key={c.title} className="v10-dr-card" href={href(c.to)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <span className="v10-dr-art" style={{ background: c.color }}><img src={c.art} alt="" /></span>
                    <span className="v10-dr-txt"><b>{c.title}</b><small>{c.text}</small></span>
                  </a>
                ))}
              </div>
            </details>
          )
        })}
        <a className="v8-btn-primary v10-dr-cta" href={ROUTES.contact}>{t.cta}</a>
      </div>
      <button ref={closeBtnRef} className="v10-drawer-close" aria-label={t.closeMenu} hidden={!drawer} onClick={() => setDrawer(false)}>×</button>
    </>
  )
}
