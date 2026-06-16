'use client'

import en from '@/locales/v7-en.json'

type HeroT = typeof en.hero

export default function HeroV7({ t, lang = 'he' }: { t: HeroT; lang?: 'en' | 'he' }) {
  const suffix = lang === 'en' ? '-english' : ''
  const heroSrc = `/hero-v04${suffix}.svg`
  const amirSrc = `/amir-tag${suffix}.svg`
  const kerenSrc = `/keren-tag${suffix}.svg`
  return (
    <section className="v7-hero" id="why">
      <div className="v7-hero-text">
        <h1 className="v7-hero-title">
          {t.titleLine1}
          <span className="bold">
            {t.titleBold}{' '}
            <span className="v7-hero-underline">
              {t.titleUnderline}
              <svg
                className="v7-hero-swoosh"
                width="221" height="18" viewBox="0 0 221 18"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  className="v7-swoosh-path"
                  d="M214.5 8.5C179.833 5.16666 74.2 2.89994 5 8.49994"
                  stroke="#BAB4FA" strokeWidth="8" strokeLinecap="round"
                  pathLength="1"
                />
              </svg>
            </span>
          </span>
        </h1>
        <p className="v7-hero-desc">
          {t.desc}
          <br />
          <strong>{t.descStrong}</strong>
        </p>
      </div>

      <div className="v7-hero-flow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSrc} alt={t.imgAlt} className="v7-hero-svg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={amirSrc}  alt={t.amirAlt}  className="v7-hero-tag v7-hero-tag--amir"  aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={kerenSrc} alt={t.kerenAlt} className="v7-hero-tag v7-hero-tag--keren" aria-hidden="true" />
      </div>
    </section>
  )
}
