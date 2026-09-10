'use client'

import { useState, type FormEvent } from 'react'
import en from '@/locales/v8-en.json'
import { isValidSiteUrl, normaliseSiteHost } from '@/lib/audit-intake'

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

/** Where the audit flow looks for the address it is about to review. */
const STORE_URL = 'twootters.audit.url'

export default function HeroV8({ t, lang = 'he' }: { t: HeroT; lang?: 'en' | 'he' }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidSiteUrl(url)) {
      setError(t.errorInvalidUrl)
      return
    }
    // Land on the audit page with the address already filled in, not past it.
    // That page is where the offer is actually explained — what is in the
    // report, why it takes two days, what a real one looks like — so sending
    // someone straight to the form would skip the part that earns the email.
    const host = normaliseSiteHost(url)
    try {
      sessionStorage.setItem(STORE_URL, host)
    } catch {
      // Storage can be blocked; ?url= below carries it anyway.
    }
    window.location.href = `/audit?lang=${lang}&url=${encodeURIComponent(host)}`
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
          <figcaption className="v8-hero-cap">
            <strong>{t.amirName}</strong>
            {t.amirRole}
          </figcaption>
        </figure>

        {/* noValidate: type="url" makes the browser block submit and show its
            own bubble, in its own language, before onSubmit ever runs. We want
            the wording from the Figma "Errors" frame instead. */}
        <form className="v8-hero-search" onSubmit={handleSubmit} role="search" noValidate>
          <input
            type="url"
            inputMode="url"
            className="v8-hero-input"
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            value={url}
            onChange={(e) => { setUrl(e.target.value); if (error) setError('') }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'v8-hero-url-err' : undefined}
          />
          <button type="submit" className="v8-hero-go">{t.submit}</button>
          {error && (
            <p className="v8-hero-error" id="v8-hero-url-err" role="alert">{error}</p>
          )}
        </form>

        <figure className="v8-hero-person v8-hero-person--keren">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/v8-hero-keren.png" alt={t.kerenAlt} className="v8-hero-photo" />
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
