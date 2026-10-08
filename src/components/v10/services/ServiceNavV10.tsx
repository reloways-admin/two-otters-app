import type { CSSProperties } from 'react'
import he from '@/locales/v10-he.json'
import { link } from '@/components/v10/routes'
import ArrowLeftV10 from '@/components/v10/ArrowLeftV10'

type Card = (typeof he.nav.menus)[number]['cards'][number]

// The four services in their order. Titles, one-liners, colours and
// illustrations come from the services mega menu, so the two never drift apart.
const SERVICES = he.nav.menus.find(m => m.id === 'services')!.cards
const IDS = ['mvp', 'upgrade', 'marketing', 'newsite'] as const
export type ServiceId = (typeof IDS)[number]

function NavCard({ card, kicker, dir }: { card: Card; kicker: string; dir: 'prev' | 'next' }) {
  return (
    <a className={`v10-svc-nav-card v10-svc-nav-card--${dir}`} href={link(card.to)} style={{ '--c': card.color } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <span className="v10-svc-nav-art" aria-hidden="true"><img src={card.art} alt="" /></span>
      <span className="v10-svc-nav-copy">
        <small>{kicker}</small>
        <b>{card.title}</b>
        <span className="v10-svc-nav-text">{card.text}</span>
      </span>
      <ArrowLeftV10 dir={dir === 'next' ? 'left' : 'right'} size={22} className="v10-svc-nav-arrow" />
    </a>
  )
}

/**
 * The foot of every service page: the previous and the next service, each a
 * coloured square with its illustration and the copy on white, the same
 * language as the services page and the mega menu. In RTL the previous one
 * sits on the right and the next on the left, the way the page reads. The
 * order wraps around, so every page has both.
 */
export default function ServiceNavV10({ current }: { current: ServiceId }) {
  const i = IDS.indexOf(current)
  const prev = SERVICES[(i + IDS.length - 1) % IDS.length]
  const next = SERVICES[(i + 1) % IDS.length]
  const t = he.serviceNav
  return (
    <nav className="v10-svc-nav" aria-label={t.label}>
      <NavCard card={prev} kicker={t.prev} dir="prev" />
      <NavCard card={next} kicker={t.next} dir="next" />
    </nav>
  )
}
