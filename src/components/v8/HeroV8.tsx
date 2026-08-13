'use client'

import { useState, type FormEvent } from 'react'
import en from '@/locales/v8-en.json'

type HeroT = typeof en.hero

// Gentle bottom curve traced from the Figma background shape (viewBox 0 0 1920 196).
// Sits in FRONT of the figures and cuts them at the waist.
const WAVE_PATH =
  'M 0,0 L 40,2.7 L 80,5.4 L 120,8.1 L 160,10.8 L 200,13.5 L 240,16.2 L 280,17.9 ' +
  'L 320,19.6 L 360,21.2 L 400,22.8 L 440,24.4 L 480,26 L 520,27.6 L 560,29.2 L 600,30.8 ' +
  'L 640,32.4 L 680,34 L 720,35.4 L 760,36.4 L 800,37.4 L 840,37.4 L 880,38.4 L 920,39.4 ' +
  'L 960,39.4 L 1000,40.1 L 1040,40.4 L 1080,40.4 L 1120,40.4 L 1160,40.4 L 1200,40.4 ' +
  'L 1240,40.2 L 1280,39.5 L 1320,38.7 L 1360,37.9 L 1400,37.1 L 1440,36.4 L 1480,35.6 ' +
  'L 1520,34.8 L 1560,34.1 L 1600,33.3 L 1640,32.5 L 1680,31.8 L 1720,31 L 1760,30 ' +
  'L 1800,28.3 L 1840,26.6 L 1880,24.3 L 1920,23.2 L 1920,196 L 0,196 Z'

export default function HeroV8({ t, lang = 'he' }: { t: HeroT; lang?: 'en' | 'he' }) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: wire the paste-a-link audit report. Input is display-only for now.
  }

  return (
    <section className="v8-hero" id="why">
      <div className="v8-hero-copy">
        <h1 className="v8-hero-title">
          <span className="v8-hero-title-top">{t.titleTop}</span>
          <span className="v8-hero-title-accent">{t.titleAccent}</span>
        </h1>
        <p className="v8-hero-desc">
          {t.desc}
          <br />
          <strong>{t.descStrong}</strong>
        </p>
      </div>

      {/* input flanked by the two people (heads at input level); they drop below on narrow screens */}
      <div className="v8-hero-cta">
        <figure className="v8-hero-person v8-hero-person--amir">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/v8-hero-amir.png" alt={t.amirAlt} className="v8-hero-photo" />
          <span className="v8-hero-tag v8-hero-tag--amir">{t.amirTag}</span>
          <figcaption className="v8-hero-cap">
            <strong>{t.amirName}</strong>
            {t.amirRole}
          </figcaption>
        </figure>

        <form className="v8-hero-search" onSubmit={handleSubmit} role="search">
          <span className="v8-hero-beta">{t.beta}</span>
          <input
            type="url"
            inputMode="url"
            className="v8-hero-input"
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <span className="v8-hero-wand" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="v8-wand-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#5AFF00" />
                  <stop offset="1" stopColor="#2EB62C" />
                </linearGradient>
              </defs>
              <path d="M3 21 13 11" stroke="url(#v8-wand-grad)" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M16 3l1.2 2.6L20 7l-2.8 1.4L16 11l-1.2-2.6L12 7l2.8-1.4L16 3z" fill="url(#v8-wand-grad)" />
              <circle cx="7" cy="6" r="1.15" fill="url(#v8-wand-grad)" />
              <circle cx="20.5" cy="14.5" r="1.15" fill="url(#v8-wand-grad)" />
            </svg>
          </span>
        </form>

        <figure className="v8-hero-person v8-hero-person--keren">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/v8-hero-keren.png" alt={t.kerenAlt} className="v8-hero-photo" />
          <span className="v8-hero-tag v8-hero-tag--keren">{t.kerenTag}</span>
          <figcaption className="v8-hero-cap">
            <strong>{t.kerenName}</strong>
            {t.kerenRole}
          </figcaption>
        </figure>
      </div>

      <div className="v8-hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1920 196" preserveAspectRatio="none">
          <path d={WAVE_PATH} />
        </svg>
      </div>
    </section>
  )
}
