'use client'

import { useEffect } from 'react'

/**
 * The partners page's two behaviours, from the artifact's own script:
 * screenshots open full size in a lightbox (click or Escape closes it), and the
 * sticky section index marks the section on screen and keeps that link in view.
 * The markup is server-rendered (PartnersPageV10); this only wires it up.
 */
export default function PartnersEffectsV10() {
  useEffect(() => {
    const lb = document.getElementById('pt-lb')
    const im = lb?.querySelector('img')
    if (!lb || !im) return
    const open = (src: string, alt: string) => { im.src = src; im.alt = alt; lb.classList.add('is-on'); lb.scrollTop = 0 }
    const close = () => lb.classList.remove('is-on')
    const offs: (() => void)[] = []
    const on = (el: EventTarget, ev: string, fn: EventListener) => { el.addEventListener(ev, fn); offs.push(() => el.removeEventListener(ev, fn)) }

    document.querySelectorAll<HTMLElement>('.v10-partners [data-full]').forEach(b => on(b, 'click', () => {
      const i = b.querySelector('img'); if (i) open(i.src, i.alt)
    }))
    document.querySelectorAll<HTMLImageElement>('.v10-partners img[data-zoom]').forEach(g => on(g, 'click', () => open(g.src, g.alt)))
    on(lb, 'click', close)
    on(document, 'keydown', e => { if ((e as KeyboardEvent).key === 'Escape') close() })

    const links = [...document.querySelectorAll<HTMLAnchorElement>('.v10-partners .toc a:not(.toc__cta)')]
    const map = new Map(links.map(a => [a.getAttribute('href')!.slice(1), a]))
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const a = e.isIntersecting && map.get(e.target.id)
        if (!a) return
        links.forEach(l => l.classList.remove('is-on'))
        a.classList.add('is-on')
        const bar = a.parentElement!
        bar.scrollLeft = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s) })

    return () => { offs.forEach(f => f()); io.disconnect() }
  }, [])
  return null
}
