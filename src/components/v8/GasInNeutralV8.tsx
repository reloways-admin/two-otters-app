'use client'

import en from '@/locales/v8-en.json'

type GasT = typeof en.gas

// order matches t.cards: [0] AI-studio (yellow), [1] forget-months (blue),
// [2] translate-vision (purple), [3] pixel-perfect (green)
const CARD_META = [
  { color: 'yellow', image: '/v8-gas-yellow.svg' },
  { color: 'blue',   image: '/v8-gas-blue.svg' },
  { color: 'purple', image: '/v8-gas-purple.svg' },
  { color: 'green',  image: '/v8-gas-green.svg' },
]

function GasCard({ title, body, color, image }: {
  title: string; body: string; color: string; image: string
}) {
  return (
    <div className={`v8-gas-card ${color}`}>
      <div className="v8-gas-card-title">{title}</div>
      <div className="v8-gas-card-body">{body}</div>
      <div className="v8-gas-illus">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="v8-gas-illus-img" />
      </div>
    </div>
  )
}

export default function GasInNeutralV8({ t, lang = 'he' }: { t: GasT; lang?: 'en' | 'he' }) {
  return (
    <section className="v8-gas" id="process">
      <div className="v8-container">
        {lang === 'en' ? (
          <>
            <h2 className="v8-section-heading">
              <span className="bold">{t.titleUnderline}</span> {t.title1}
            </h2>
            <p className="v8-section-sub">
              {t.sub1} {t.sub2} <strong>{t.sub1Strong}</strong>
            </p>
          </>
        ) : (
          <>
            <h2 className="v8-section-heading">
              {t.title1}
              <br />
              <span className="bold">{t.title2Bold} {t.titleUnderline}.</span>
            </h2>
            <p className="v8-section-sub">
              {t.sub1} <strong>{t.sub1Strong}</strong>
              <br />
              {t.sub2}
            </p>
          </>
        )}

        <div className="v8-gas-grid">
          {t.cards.map((card, i) => (
            <GasCard
              key={i}
              title={card.title}
              body={card.body}
              color={CARD_META[i].color}
              image={CARD_META[i].image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
