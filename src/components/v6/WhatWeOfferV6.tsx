'use client'

import Image from 'next/image'
import en from '@/locales/v6-en.json'

type OfferT = typeof en.offer

const CARD_META = [
  { id: 'offer-mvp',       imageSrc: '/space.png',    illusTop: 0, illusLeft: 0, illusWidth: 260, illusHeight: 320, wrapPaddingTop: 0 },
  { id: 'offer-upgrade',   imageSrc: '/cleaning.png', illusTop: 0, illusLeft: 0, illusWidth: 420, illusHeight: 280, wrapPaddingTop: 0 },
  { id: 'offer-marketing', imageSrc: '/working.png',  illusTop: 0, illusLeft: 0, illusWidth: 380, illusHeight: 254, wrapPaddingTop: 0 },
  { id: 'offer-newsite',   imageSrc: '/holding.png',  illusTop: 0, illusLeft: 0, illusWidth: 340, illusHeight: 227, wrapPaddingTop: 0 },
]

function WideOfferCard({ card, meta, isRTL }: {
  card: OfferT['cards'][0]
  meta: typeof CARD_META[0]
  isRTL: boolean
}) {
  const titleLines = card.title.split('\n')
  const descParts = card.desc.split('\n\n')

  return (
    <div id={meta.id} className="v6-offer-mvp-wrap" style={{ paddingTop: meta.wrapPaddingTop }}>
      <div className="v6-offer-card v6-offer-card--mvp">
        <div className="v6-offer-mvp-row">

          {/* Text column — first in DOM = right in RTL */}
          <div className="v6-offer-mvp-body">
            <h3 className="v6-offer-mvp-title">
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h3>
            {'subtitle' in card && card.subtitle && (
              <p className="v6-offer-mvp-sub">{card.subtitle}</p>
            )}
            <span className="v6-offer-timing v6-offer-timing--mvp">{card.timing}</span>
            <div className="v6-offer-desc">
              {descParts.map((part, i) => (
                <p key={i} style={{ margin: i > 0 ? '8px 0 0' : 0 }}>{part}</p>
              ))}
            </div>
          </div>

          {/* Illustration column — second in DOM = left in RTL */}
          <div className="v6-offer-mvp-illus-col">
            <div
              className="v6-offer-mvp-illus"
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
        <div className="v6-offer-mvp-tags">
          {card.tags.map((tag, i) => (
            <span key={tag} className="v6-offer-mvp-tag-item">
              <span className="v6-offer-mvp-tag">{tag}</span>
              {i < card.tags.length - 1 && (
                <span className="v6-offer-mvp-star" aria-hidden="true">★</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WhatWeOfferV6({ t, isRTL }: { t: OfferT; isRTL: boolean }) {
  return (
    <section className="v6-offer" id="offer">
      <div className="v6-container">
        <h2 className="v6-section-heading" style={{ marginBottom: 28 }}>
          <span className="bold">{t.heading}</span>
        </h2>

        {/* Anchor jump-links — one per card */}
        <div className="v6-offer-anchors">
          {t.cards.map((card, i) => (
            <a key={CARD_META[i].id} href={`#${CARD_META[i].id}`} className="v6-offer-anchor-btn">
              {card.anchorLabel}
            </a>
          ))}
        </div>

        <div className="v6-offer-grid">
          {t.cards.map((card, i) => (
            <WideOfferCard key={CARD_META[i].id} card={card} meta={CARD_META[i]} isRTL={isRTL} />
          ))}
        </div>
      </div>
    </section>
  )
}
