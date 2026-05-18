'use client'

import en from '@/locales/v6-en.json'

type SpiralT = typeof en.spiral

const CARD_META = [
  { bg: '#68D68B', textColor: '#000', illus: '/step-1.svg' },
  { bg: '#AA83EB', textColor: '#fff', illus: '/step-2.svg' },
  { bg: '#FBDD7C', textColor: '#000', illus: '/step-3.svg' },
  { bg: '#A6C4FA', textColor: '#000', illus: '/step-4.svg' },
]

function SpiralCard({ card, meta, index }: {
  card: SpiralT['cards'][0]
  meta: typeof CARD_META[0]
  index: number
}) {
  return (
    <div
      className={`v6-spiral-card v6-spiral-card-${index + 1}`}
      style={{ background: meta.bg, color: meta.textColor }}
    >
      <span className="v6-spiral-card-num">{card.num}</span>
      <div className="v6-spiral-card-text">
        <p className="v6-spiral-card-title">{card.title}</p>
        <p className="v6-spiral-card-subtitle">{card.subtitle}</p>
      </div>
      <p className="v6-spiral-card-body">{card.body}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={meta.illus} alt={card.illusAlt} className="v6-spiral-card-illus" />
    </div>
  )
}

export default function SpiralV6({ t }: { t: SpiralT }) {
  return (
    <section className="v6-spiral" id="spiral">
      <div className="v6-container">
        {/* Heading */}
        <div className="v6-spiral-header">
          <h2 className="v6-spiral-title">
            {t.title1}<br />
            <span className="bold">{t.titleBold}</span>
          </h2>
          <p className="v6-spiral-sub">{t.sub}</p>
        </div>

        {/* Spiral canvas — SVG sets the height, cards overlay it */}
        <div className="v6-spiral-canvas">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="v6-spiral-svg" src="/spiral.svg" alt="" aria-hidden="true" />
          <div className="v6-spiral-top-grid">
            {t.cards.map((card, i) => (
              <SpiralCard key={i} card={card} meta={CARD_META[i]} index={i} />
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-1.svg" alt="" className="v6-spiral-horse" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-2.svg" alt="" className="v6-spiral-papers" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-3.svg" alt="" className="v6-spiral-screens" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-4.svg" alt="" className="v6-spiral-spaceship" aria-hidden="true" />
          </div>
        </div>

        {/* "Don't stop at spec" section */}
        <div className="v6-spiral-more">
          <h3 className="v6-spiral-more-title">{t.moreTitle}</h3>
          <p className="v6-spiral-more-sub">{t.moreSub}</p>
        </div>

        {/* Steps 5–8 */}
        <div className="v6-spiral-steps">
          {t.steps.map(step => (
            <div key={step.num} className="v6-spiral-step">
              <div className="v6-spiral-step-header">
                <div className="v6-spiral-step-text">
                  <p className="v6-spiral-step-title">{step.title}</p>
                  <p className="v6-spiral-step-subtitle">{step.subtitle}</p>
                </div>
                <span className="v6-spiral-step-num">{step.num}</span>
              </div>
              <p className="v6-spiral-step-body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
