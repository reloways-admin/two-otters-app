'use client'

import en from '@/locales/v8-en.json'

type AboutT = typeof en.about

export default function WhoWeAreV8({ t, lang = 'he' }: { t: AboutT; lang?: 'en' | 'he' }) {
  const tagSuffix = lang === 'en' ? '-english' : ''
  return (
    <section className="v8-about" id="about">
      <div className="v8-container v8-about-grid">

        {/* Text column */}
        <div className="v8-about-text">
          <h2 className="v8-about-title">
            <span className="v8-about-olah-row">
              <span className="v8-about-olah">{t.greeting}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/otter-hand.svg" alt="" className="v8-about-hand" aria-hidden="true" />
            </span>
            <span className="v8-about-names">{t.title}</span>
          </h2>
          <p className="v8-about-body">{t.body1}</p>
          <p className="v8-about-body">{t.body2}</p>
          <p className="v8-about-body">
            {t.body3} <b>{t.body3Bold}</b>
          </p>
        </div>

        {/* Visual column — the frame holds the photo; bubbles + decorations are
            positioned as % of the photo so the whole composition scales together.
            The frame overlaps up onto the previous section (image on top). */}
        <div className="v8-about-visual">
          <div className="v8-about-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-couch.jpg" alt={`${t.amirPhotoAlt} · ${t.kerenPhotoAlt}`} className="v8-about-couch" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-bubble-amir.svg" alt={t.amirBubbleAlt} className="v8-about-bubble v8-about-bubble--amir" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-bubble-keren.svg" alt={t.kerenBubbleAlt} className="v8-about-bubble v8-about-bubble--keren" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-browser.svg" alt="" className="v8-about-deco v8-about-deco--browser" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-horse.svg" alt="" className="v8-about-deco v8-about-deco--knight" aria-hidden="true" />

            {/* Compact name tags — shown on mobile in place of the bubbles */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/amir-tag${tagSuffix}.svg`} alt={t.amirPhotoAlt} className="v8-about-tag v8-about-tag--amir" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/keren-tag${tagSuffix}.svg`} alt={t.kerenPhotoAlt} className="v8-about-tag v8-about-tag--keren" />
          </div>
        </div>

      </div>
    </section>
  )
}
