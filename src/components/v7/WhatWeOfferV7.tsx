'use client'

import Image from 'next/image'
import en from '@/locales/v7-en.json'

type OfferT = typeof en.offer

const CARD_META = [
  { id: 'offer-mvp',       imageSrc: '/offer-illus-1-fast.svg',       illusTop: 0, illusLeft: 0, illusWidth: 480, illusHeight: 275, wrapPaddingTop: 0 },
  { id: 'offer-upgrade',   imageSrc: '/offer-illus-2-upgrade.svg',    illusTop: 0, illusLeft: 0, illusWidth: 460, illusHeight: 330, wrapPaddingTop: 0 },
  { id: 'offer-marketing', imageSrc: '/offer-illus-3-marketing.svg',  illusTop: 0, illusLeft: 0, illusWidth: 420, illusHeight: 338, wrapPaddingTop: 0 },
  { id: 'offer-newsite',   imageSrc: '/offer-illus-4-new-brand.svg',  illusTop: 0, illusLeft: 0, illusWidth: 440, illusHeight: 318, wrapPaddingTop: 0 },
]

function WideOfferCard({ card, meta, isRTL }: {
  card: OfferT['cards'][0]
  meta: typeof CARD_META[0]
  isRTL: boolean
}) {
  const titleLines = card.title.split('\n')
  const descParts = card.desc.split('\n\n')

  return (
    <div id={meta.id} className="v7-offer-mvp-wrap" style={{ paddingTop: meta.wrapPaddingTop }}>
      <div className="v7-offer-card v7-offer-card--mvp">
        <div className="v7-offer-mvp-row">

          {/* Text column — first in DOM = right in RTL */}
          <div className="v7-offer-mvp-body">
            <h3 className="v7-offer-mvp-title">
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h3>
            {'subtitle' in card && card.subtitle && (
              <p className="v7-offer-mvp-sub">{card.subtitle}</p>
            )}
            <div className="v7-offer-desc">
              {descParts.map((part, i) => (
                <p key={i} style={{ margin: i > 0 ? '8px 0 0' : 0 }}>{part}</p>
              ))}
            </div>
            {/* Timing label — below the description */}
            <span className="v7-offer-timing v7-offer-timing--mvp">{card.timing}</span>
            <a href="#contact" className="v7-offer-mvp-cta">
              {card.cta}
              <svg className="v7-offer-mvp-cta-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Illustration column — second in DOM = left in RTL */}
          <div className="v7-offer-mvp-illus-col">
            <div
              className="v7-offer-mvp-illus"
              style={{
                top: meta.illusTop,
                left: meta.illusLeft,
                width: meta.illusWidth,
                height: meta.illusHeight,
              }}
            >
              <Image
                src={meta.imageSrc}
                alt={card.imageAlt}
                fill
                style={{ objectFit: 'contain', objectPosition: 'center center' }}
              />
            </div>
          </div>
        </div>

        {/* Tags strip */}
        <div className="v7-offer-mvp-tags">
          {card.tags.map((tag, i) => (
            <span key={tag} className="v7-offer-mvp-tag-item">
              <span className="v7-offer-mvp-tag">{tag}</span>
              {i < card.tags.length - 1 && (
                <span className="v7-offer-mvp-star" aria-hidden="true">★</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WhatWeOfferV7({ t, isRTL }: { t: OfferT; isRTL: boolean }) {
  return (
    <section className="v7-offer" id="offer">
      <div className="v7-container">
        <h2 className="v7-section-heading" style={{ marginBottom: 28 }}>
          <span className="bold">{t.heading}</span>
        </h2>

        {/* Anchor jump-links — one per card */}
        <div className="v7-offer-anchors">
          {t.cards.map((card, i) => (
            <a key={CARD_META[i].id} href={`#${CARD_META[i].id}`} className="v7-offer-anchor-btn">
              {card.anchorLabel}
            </a>
          ))}
        </div>

        <div className="v7-offer-grid">
          {t.cards.map((card, i) => (
            <WideOfferCard key={CARD_META[i].id} card={card} meta={CARD_META[i]} isRTL={isRTL} />
          ))}
        </div>
      </div>
    </section>
  )
}
