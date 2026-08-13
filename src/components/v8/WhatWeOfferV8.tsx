'use client'

import Image from 'next/image'
import en from '@/locales/v8-en.json'

type OfferT = typeof en.offer

// Per-card accent + illustration (from Figma "06 · Services")
const CARD_META = [
  { id: 'offer-mvp',       accent: '#5aff00', img: '/offer-illus-1-fast.svg' },      // green
  { id: 'offer-upgrade',   accent: '#f8f800', img: '/offer-illus-2-upgrade.svg' },   // yellow
  { id: 'offer-marketing', accent: '#61fff2', img: '/offer-illus-3-marketing.svg' }, // cyan
  { id: 'offer-newsite',   accent: '#ff6d2c', img: '/offer-illus-4-new-brand.svg' }, // orange
]

function ServiceCard({ card, meta }: {
  card: OfferT['cards'][0]
  meta: typeof CARD_META[0]
}) {
  const titleLines = card.title.split('\n')
  const descParts = card.desc.split('\n\n')

  return (
    <div
      id={meta.id}
      className="v8-svc-card"
      style={{ ['--svc-accent' as string]: meta.accent }}
    >
      {/* Top row: illustration (pokes above, left) + text (right) */}
      <div className="v8-svc-main">
        <div className="v8-svc-illus">
          <Image src={meta.img} alt={card.imageAlt} fill style={{ objectFit: 'contain', objectPosition: 'center bottom' }} />
        </div>

        <div className="v8-svc-body">
          <h3 className="v8-svc-title">
            {titleLines.map((line, i) => (
              <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
            ))}
          </h3>
          {'subtitle' in card && card.subtitle && (
            <p className="v8-svc-sub">{card.subtitle}</p>
          )}
          <div className="v8-svc-desc">
            {descParts.map((part, i) => (
              <p key={i} style={{ margin: i > 0 ? '10px 0 0' : 0 }}>{part}</p>
            ))}
          </div>

          <a href="#contact" className="v8-svc-cta">
            {card.cta}
            <svg className="v8-svc-cta-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Full-width tags row: timing prefix + accent tags */}
      <p className="v8-svc-tags">
        <span className="v8-svc-timing">{card.timing} של</span>
        {card.tags.map((tag) => (
          <span key={tag} className="v8-svc-tag-item">
            <span className="v8-svc-sep" aria-hidden="true">//</span>
            <span className="v8-svc-tag">{tag}</span>
          </span>
        ))}
      </p>
    </div>
  )
}

export default function WhatWeOfferV8({ t }: { t: OfferT; isRTL?: boolean }) {
  // Heading: the word before "..." becomes the accent badge ("אז" / "So")
  const [badgeRaw, ...restArr] = t.heading.split('...')
  const badge = badgeRaw.trim()
  const rest = restArr.join('...').replace(/^[.\s]+/, '').trim()

  return (
    <section className="v8-offer v8-svc" id="offer">
      <div className="v8-container">
        <h2 className="v8-svc-heading">
          <span className="v8-svc-az">{badge}</span>
          <span className="v8-svc-heading-text">{rest}</span>
        </h2>

        {/* Filter chips — each jumps to its card */}
        <div className="v8-svc-filters">
          {t.cards.map((card, i) => (
            <a key={CARD_META[i].id} href={`#${CARD_META[i].id}`} className="v8-svc-filter">
              {card.anchorLabel}
            </a>
          ))}
        </div>

        <div className="v8-svc-grid">
          {t.cards.map((card, i) => (
            <ServiceCard key={CARD_META[i].id} card={card} meta={CARD_META[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
