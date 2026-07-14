'use client'

import Image from 'next/image'
import { useSquircle } from '@/hooks/useSquircle'
import en from '@/locales/v7-en.json'

type GasT = typeof en.gas

const CARD_META = [
  { color: 'yellow', image: '/not-an-ai-studio-sketch.png', imagePosition: 'center center' },
  { color: 'blue',   image: '/forget-sketch.png',           imagePosition: 'bottom center' },
  { color: 'purple', image: '/hands.svg',                    imagePosition: 'bottom 65%' },
  { color: 'green',  image: '/tetris-sketch.png',           imagePosition: 'bottom center' },
]

const BG: Record<string, string> = {
  yellow: '#FFC200',
  blue:   '#5A93FF',
  purple: '#8242EA',
  green:  '#13D04F',
}

function GasCard({ title, body, color, image, imagePosition }: {
  title: string; body: string; color: string; image: string; imagePosition: string
}) {
  const { ref, style: squircleStyle } = useSquircle(64, 0.6)

  return (
    <div
      ref={ref}
      className={`v7-gas-card ${color}`}
      style={{ background: BG[color], ...squircleStyle }}
    >
      <div className="v7-gas-card-title">{title}</div>
      <div className="v7-gas-card-body">{body}</div>
      <div className="v7-gas-illus v7-gas-illus-img">
        <Image
          src={image}
          alt=""
          fill
          style={{ objectFit: 'contain', objectPosition: imagePosition }}
        />
      </div>
    </div>
  )
}

function Swoosh() {
  return (
    <svg
      className="v7-hero-swoosh"
      width="221" height="18" viewBox="0 0 221 18"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M214.5 8.5C179.833 5.16666 74.2 2.89994 5 8.49994"
        stroke="#BAB4FA" strokeWidth="8" strokeLinecap="round"
        pathLength="1"
      />
    </svg>
  )
}

export default function GasInNeutralV7({ t, lang = 'he' }: { t: GasT; lang?: 'en' | 'he' }) {
  return (
    <section className="v7-gas" id="process">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/background-sketch-v03.svg"
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)', height: '55vh', width: 'auto', maxWidth: 'none', opacity: 0.55 }}
      />
      <div className="v7-container" style={{ position: 'relative', zIndex: 1 }}>
        {lang === 'en' ? (
          <>
            <h2 className="v7-section-heading">
              <span className="bold">
                <span className="v7-swoosh-word">
                  {t.titleUnderline}
                  <Swoosh />
                </span>
              </span>{' '}
              {t.title1}
            </h2>
            <p className="v7-section-sub">
              {t.sub1}
              <br />
              {t.sub2} <strong>{t.sub1Strong}</strong>
            </p>
          </>
        ) : (
          <>
            <h2 className="v7-section-heading">
              {t.title1}
              <br />
              <span className="bold">
                {t.title2Bold}{' '}
                <span className="v7-swoosh-word">
                  {t.titleUnderline}
                  <Swoosh />
                </span>
                .
              </span>
            </h2>
            <p className="v7-section-sub">
              {t.sub1} <strong>{t.sub1Strong}</strong>
              <br />
              {t.sub2}
            </p>
          </>
        )}

        <div className="v7-gas-grid">
          {t.cards.map((card, i) => (
            <GasCard
              key={i}
              title={card.title}
              body={card.body}
              color={CARD_META[i].color}
              image={CARD_META[i].image}
              imagePosition={CARD_META[i].imagePosition}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
