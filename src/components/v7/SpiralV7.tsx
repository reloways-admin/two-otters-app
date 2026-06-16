'use client'

import en from '@/locales/v7-en.json'

type SpiralT = typeof en.spiral

const CARD_META = [
  { bg: '#68D68B', textColor: '#000', illus: '/step-1.svg' },
  { bg: '#AA83EB', textColor: '#fff', illus: '/step-2.svg' },
  { bg: '#FBDD7C', textColor: '#000', illus: '/step-3.svg' },
  { bg: '#A6C4FA', textColor: '#000', illus: '/step-4.svg' },
]

// Optional illustration per step, keyed by step number
const STEP_ILLUS: Record<string, string> = {
  '7': '/design.png',      // שלב העיצוב
  '5': '/language.png',    // שלב פיתוח השפה
  '8': '/development.png', // שלב הפיתוח
  '6': '/writing.png',     // שלב כתיבת התוכן
}

function SpiralCard({ card, meta, index, lang }: {
  card: SpiralT['cards'][0]
  meta: typeof CARD_META[0]
  index: number
  lang: 'en' | 'he'
}) {
  return (
    <div
      className={`v7-spiral-card v7-spiral-card-${index + 1}`}
      style={{ background: meta.bg, color: meta.textColor }}
    >
      <span className="v7-spiral-card-num">{card.num}</span>
      <div className="v7-spiral-card-text">
        {lang === 'en' ? (
          <p className="v7-spiral-card-title v7-spiral-card-title--phase">
            <span className="v7-spiral-phase-pre">{card.title}</span>{card.subtitle}
          </p>
        ) : (
          <>
            <p className="v7-spiral-card-title">{card.title}</p>
            <p className="v7-spiral-card-subtitle">{card.subtitle}</p>
          </>
        )}
      </div>
      <p className="v7-spiral-card-body">{card.body}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={meta.illus} alt={card.illusAlt} className="v7-spiral-card-illus" />
    </div>
  )
}

export default function SpiralV7({ t, lang = 'he' }: { t: SpiralT; lang?: 'en' | 'he' }) {
  return (
    <section className="v7-spiral" id="spiral">
      <div className="v7-container">
        {/* Heading */}
        <div className="v7-spiral-header">
          {lang === 'en' ? (
            <>
              <h2 className="v7-spiral-title">{t.title1}</h2>
              <p className="v7-spiral-sub">{t.sub}<strong>{t.subBold}</strong></p>
            </>
          ) : (
            <>
              <h2 className="v7-spiral-title">
                {t.title1}<br />
                <span className="bold">{t.titleBold}</span>
              </h2>
              <p className="v7-spiral-sub">{t.sub}</p>
            </>
          )}
        </div>

        {/* Spiral canvas — SVG sets the height, cards overlay it */}
        <div className="v7-spiral-canvas">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="v7-spiral-svg" src="/spiral.svg" alt="" aria-hidden="true" />
          <div className="v7-spiral-top-grid">
            {t.cards.map((card, i) => (
              <SpiralCard key={i} card={card} meta={CARD_META[i]} index={i} lang={lang} />
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-1.svg" alt="" className="v7-spiral-horse" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-2.svg" alt="" className="v7-spiral-papers" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-3.svg" alt="" className="v7-spiral-screens" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/step-4.svg" alt="" className="v7-spiral-spaceship" aria-hidden="true" />
          </div>
        </div>

        {/* "Don't stop at spec" section */}
        <div className="v7-spiral-more">
          <h3 className="v7-spiral-more-title">{t.moreTitle}</h3>
          <p className="v7-spiral-more-sub">{t.moreSub}</p>
        </div>

        {/* Steps 5–8 */}
        <div className="v7-spiral-steps">
          {t.steps.map(step => (
            <div key={step.num} className="v7-spiral-step">
              <span className="v7-spiral-step-num">{step.num}</span>
              {STEP_ILLUS[step.num] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={STEP_ILLUS[step.num]} alt="" aria-hidden="true" className="v7-spiral-step-illus" />
              )}
              <div className="v7-spiral-step-header">
                <div className="v7-spiral-step-text">
                  <p className="v7-spiral-step-title">{step.title}</p>
                  <p className="v7-spiral-step-subtitle">{step.subtitle}</p>
                </div>
              </div>
              <p className="v7-spiral-step-body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
