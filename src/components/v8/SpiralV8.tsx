'use client'

import en from '@/locales/v8-en.json'

type SpiralT = typeof en.spiral

// Stage cards recoloured to the Value-Props palette (green / purple / yellow / blue)
const CARD_META = [
  { bg: '#5aff00', textColor: '#1d2332' }, // 1 · strategy  (green)
  { bg: '#945eee', textColor: '#ffffff' }, // 2 · UX         (purple)
  { bg: '#f8f800', textColor: '#1d2332' }, // 3 · prototype  (yellow)
  { bg: '#2672ff', textColor: '#ffffff' }, // 4 · launch     (blue)
]

// Stage-card illustrations (horse / papers / screens / spaceship) — rendered inside
// each card so they appear in-flow on mobile; on desktop the canvas-positioned
// siblings below are used instead and these in-card copies are hidden.
const STAGE_ILLUS = ['/step-1.svg', '/step-2.svg', '/step-3.svg', '/step-4.svg']

// Step 5–8 icons (left of each block)
const STEP_ILLUS: Record<string, string> = {
  '5': '/spiral-megaphone.svg',
  '6': '/spiral-feather.svg',
  '7': '/spiral-colors.svg',
  '8': '/spiral-browser.svg',
}

function SpiralCard({ card, meta, index, lang }: {
  card: SpiralT['cards'][0]
  meta: typeof CARD_META[0]
  index: number
  lang: 'en' | 'he'
}) {
  return (
    <div
      className={`v8-spiral-card v8-spiral-card-${index + 1}`}
      style={{ background: meta.bg, color: meta.textColor }}
    >
      <span className="v8-spiral-card-num">{card.num}</span>
      <div className="v8-spiral-card-text">
        {lang === 'en' ? (
          <p className="v8-spiral-card-title v8-spiral-card-title--phase">
            <span className="v8-spiral-phase-pre">{card.title}</span>{card.subtitle}
          </p>
        ) : (
          <>
            <p className="v8-spiral-card-title">{card.title}</p>
            <p className="v8-spiral-card-subtitle">{card.subtitle}</p>
          </>
        )}
      </div>
      <p className="v8-spiral-card-body">{card.body}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={STAGE_ILLUS[index]} alt="" aria-hidden="true" className="v8-spiral-card-illus" />
    </div>
  )
}

export default function SpiralV8({ t, lang = 'he' }: { t: SpiralT; lang?: 'en' | 'he' }) {
  return (
    <section className="v8-spiral" id="spiral">
      <div className="v8-container">
        {/* Heading */}
        <div className="v8-spiral-header">
          {lang === 'en' ? (
            <>
              <h2 className="v8-spiral-title">{t.title1}</h2>
              <p className="v8-spiral-sub">{t.sub}<strong>{t.subBold}</strong></p>
            </>
          ) : (
            <>
              <h2 className="v8-spiral-title">
                {t.title1}<br />
                <span className="bold">{t.titleBold}</span>
              </h2>
              <p className="v8-spiral-sub">{t.sub}</p>
            </>
          )}
        </div>

        {/* Spiral canvas — SVG sets the height, cards + icons overlay it at Figma coords */}
        <div className="v8-spiral-canvas">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="v8-spiral-svg" src="/spiral-loop.svg" alt="" aria-hidden="true" />
          <div className="v8-spiral-top-grid">
            {t.cards.map((card, i) => (
              <SpiralCard key={i} card={card} meta={CARD_META[i]} index={i} lang={lang} />
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-1.svg" alt="" className="v8-spiral-horse" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-2.svg" alt="" className="v8-spiral-papers" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-3.svg" alt="" className="v8-spiral-screens" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-4.svg" alt="" className="v8-spiral-spaceship" aria-hidden="true" />
          </div>
        </div>

        {/* Bridge title + subtitle between the spiral and the post-prototype steps */}
        <div className="v8-spiral-more">
          <h3 className="v8-spiral-more-title">{t.moreTitle}</h3>
          <p className="v8-spiral-more-sub">{t.moreSub}</p>
        </div>

        {/* Steps 5–8 — icon on the left, Anton number, green title/subtitle, white body */}
        <div className="v8-spiral-steps">
          {t.steps.map(step => (
            <div key={step.num} className="v8-spiral-step">
              {STEP_ILLUS[step.num] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={STEP_ILLUS[step.num]} alt="" aria-hidden="true" className="v8-spiral-step-icon" />
              )}
              <div className="v8-spiral-step-content">
                <span className="v8-spiral-step-num">#{step.num.padStart(2, '0')}</span>
                <p className="v8-spiral-step-title">{step.title}</p>
                <p className="v8-spiral-step-subtitle">{step.subtitle}</p>
                <p className="v8-spiral-step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
