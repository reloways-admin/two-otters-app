import Image from 'next/image'
import he from '@/locales/v10-he.json'
import { ROUTES } from './routes'

type OfferT = typeof he.offer

// Same accent + illustration per service as v8 (Figma "06 · Services"); each
// card now leads to its own service page instead of the contact form.
const CARD_META = [
  { id: 'offer-mvp',       accent: '#5aff00', img: '/offer-illus-1-fast.svg',      to: ROUTES.serviceMvp },
  { id: 'offer-upgrade',   accent: '#f8f800', img: '/offer-illus-2-upgrade.svg',   to: ROUTES.serviceUpgrade },
  { id: 'offer-marketing', accent: '#61fff2', img: '/offer-illus-3-marketing.svg', to: ROUTES.serviceMarketing },
  { id: 'offer-newsite',   accent: '#ff6d2c', img: '/offer-illus-4-new-brand.svg', to: ROUTES.serviceNewsite },
]

const Arrow = () => (
  <svg className="v8-svc-cta-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * "So, what shall we do together?" — v8's service cards, laid out as a 2×2
 * bento on desktop (see .v10-offer in styles.css). Forked from WhatWeOfferV8
 * rather than shared, because that one is on the live homepage.
 */
export default function OfferV10({ t }: { t: OfferT }) {
  return (
    <section className="v8-offer v8-svc v10-offer" id="offer">
      <div className="v8-container">
        <h2 className="v8-svc-heading">
          <span className="v8-svc-heading-text">{t.headingPre}</span>
          <span className="v8-svc-az">{t.headingBadge}</span>
          <span className="v8-svc-heading-text">{t.headingPost}</span>
        </h2>

        <div className="v8-svc-filters">
          {t.cards.map((card, i) => (
            <a key={CARD_META[i].id} href={`#${CARD_META[i].id}`} className="v8-svc-filter">{card.anchorLabel}</a>
          ))}
        </div>

        <div className="v8-svc-grid">
          {t.cards.map((card, i) => {
            const meta = CARD_META[i]
            const titleLines = card.title.split('\n')
            return (
              <div key={meta.id} id={meta.id} className="v8-svc-card" style={{ ['--svc-accent' as string]: meta.accent }}>
                <div className="v8-svc-main">
                  <div className="v8-svc-illus">
                    <Image src={meta.img} alt={card.imageAlt} fill style={{ objectFit: 'contain', objectPosition: 'center bottom' }} />
                  </div>
                  <div className="v8-svc-body">
                    <h3 className="v8-svc-title">
                      {titleLines.map((line, j) => <span key={j}>{line}{j < titleLines.length - 1 && <br />}</span>)}
                    </h3>
                    {'subtitle' in card && card.subtitle && <p className="v8-svc-sub">{card.subtitle}</p>}
                    <div className="v8-svc-desc">
                      {card.desc.split('\n\n').map((part, j) => <p key={j} style={{ margin: j > 0 ? '10px 0 0' : 0 }}>{part}</p>)}
                    </div>
                    <a href={meta.to} className="v8-svc-cta">{card.cta}<Arrow /></a>
                  </div>
                </div>
                <p className="v8-svc-tags">
                  <span className="v8-svc-timing">{card.timing} {'timingSuffix' in t ? String(t.timingSuffix) : 'של'}</span>
                  {card.tags.map(tag => (
                    <span key={tag} className="v8-svc-tag-item">
                      <span className="v8-svc-sep" aria-hidden="true">//</span>
                      <span className="v8-svc-tag">{tag}</span>
                    </span>
                  ))}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
