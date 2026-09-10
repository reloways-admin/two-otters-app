'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import en from '@/locales/v8-en.json'
import he from '@/locales/v8-he.json'
import { isValidSiteUrl, normaliseSiteHost } from '@/lib/audit-intake'
import './audit.css'

type Lang = 'en' | 'he'
const locales = { en, he } as const

const STORE_URL = 'twootters.audit.url'

function Tick() {
  return (
    <svg className="au-tick" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="12" fill="#5AFF00" />
      <path d="M6.5 12.4l3.6 3.6L17.8 8.3" fill="none" stroke="#12210A"
        strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * The scan illustration, laid out from the frame's own coordinates.
 *
 * The cluster occupies x 142..947, y 2049..2843 in the 1920 frame, so the box
 * is 805 x 794 and every part is placed as a percentage of that — the rings
 * SVG, the wireframe, the connecting line, the avatars and the status pill all
 * keep their measured positions at any width.
 */
function ScanIllustration({ label, avatarsAlt }: { label: string; avatarsAlt: string }) {
  return (
    <div className="au-scan">
      {/* The frame's own thirteen rings, redrawn as elements so the sweep can
          run through them. Radii are the SVG's, as a share of its 794 box. */}
      <div className="au-scan-rings" aria-hidden="true">
        <i style={{ '--au-d': '11.86%', '--au-i': 0 } as React.CSSProperties} />
        <i style={{ '--au-d': '18.34%', '--au-i': 1 } as React.CSSProperties} />
        <i style={{ '--au-d': '25.59%', '--au-i': 2 } as React.CSSProperties} />
        <i style={{ '--au-d': '33.83%', '--au-i': 3 } as React.CSSProperties} />
        <i style={{ '--au-d': '41.06%', '--au-i': 4 } as React.CSSProperties} />
        <i style={{ '--au-d': '47.56%', '--au-i': 5 } as React.CSSProperties} />
        <i style={{ '--au-d': '54.06%', '--au-i': 6 } as React.CSSProperties} />
        <i style={{ '--au-d': '59.55%', '--au-i': 7 } as React.CSSProperties} />
        <i style={{ '--au-d': '66.05%', '--au-i': 8 } as React.CSSProperties} />
        <i style={{ '--au-d': '73.53%', '--au-i': 9 } as React.CSSProperties} />
        <i style={{ '--au-d': '81.51%', '--au-i': 10 } as React.CSSProperties} />
        <i style={{ '--au-d': '90.5%', '--au-i': 11 } as React.CSSProperties} />
        <i style={{ '--au-d': '98.99%', '--au-i': 12 } as React.CSSProperties} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/audit/scan-wireframe.png" alt="" className="au-scan-wire" aria-hidden="true" />
      <span className="au-scan-line" aria-hidden="true" />
      {/* Same pair as the hero, and for the same reason: the frame's export is
          flattened onto white and read as a white box on the navy. */}
      <span className="au-scan-avatars au-trust-avatars" role="img" aria-label={avatarsAlt}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/email/amir.png" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/email/keren.png" alt="" />
      </span>
      <span className="au-scan-pill">
        <span className="au-scan-spinner" aria-hidden="true" />
        {label}
      </span>
    </div>
  )
}

function Chevron({ up = false }: { up?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      style={up ? { transform: 'rotate(180deg)' } : undefined}>
      <path d="M6 9.5L12 15.5L18 9.5" fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** useLayoutEffect warns when React renders on the server, and this one has to
 *  run before the browser paints or the bars flash full and then reset. */
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Draws the score bars and the dial when the block first scrolls into view.
 *
 * The from-state is armed here rather than in the markup, on purpose: the
 * server sends the graphs already filled, so a visitor whose JavaScript never
 * arrives reads the real numbers instead of four empty tracks. Only once this
 * runs, and only before the first paint, do we wind them back to zero.
 *
 * Anyone who has asked their system for less motion is left at the full state
 * and never sees an animation at all.
 */
function useDrawOnReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useBeforePaint(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.dataset.draw = 'armed'
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.dataset.draw = 'in'
          io.disconnect()
        }
      },
      // A quarter of the block visible: enough that the movement is on screen
      // to be seen, rather than finishing above the fold.
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/**
 * The overall-score dial.
 *
 * Three arcs stacked longest-first over a track, each starting at twelve
 * o'clock, so every one covers the tail of the one beneath and the visible
 * bands fall where the frame draws them. Sweeps were read off the render at
 * 271.7, 231.6 and 188.6 degrees; `pathLength="360"` lets the dash arrays say
 * exactly that instead of a share of the circumference.
 *
 * The numbers are the frame's sample report, not a live measurement.
 */
function Dial({ alt }: { alt: string }) {
  const arcs = [
    { sweep: 271.7, className: 'au-dial-arc--blue' },
    { sweep: 231.6, className: 'au-dial-arc--amber' },
    { sweep: 188.6, className: 'au-dial-arc--red' },
  ]
  return (
    <svg className="au-dial" viewBox="0 0 274 274" role="img" aria-label={alt}>
      <g transform="rotate(-90 137 137)" fill="none" strokeWidth="34.52">
        <circle className="au-dial-track" cx="137" cy="137" r="119.59" />
        {arcs.map(a => (
          <circle
            key={a.className}
            className={`au-dial-arc ${a.className}`}
            cx="137"
            cy="137"
            r="119.59"
            pathLength={360}
            /* The attribute is the resting state for anyone without our CSS;
               the variable is what the reveal transition animates. */
            strokeDasharray={`${a.sweep} 360`}
            style={{ '--au-sweep': a.sweep } as React.CSSProperties}
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  )
}

export default function AuditLanding() {
  const [lang, setLang] = useState<Lang>('he')
  const t = locales[lang].audit.landing

  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const scoresRef = useDrawOnReveal<HTMLDivElement>()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('lang')
    if (p === 'en' || p === 'he') setLang(p)
    try {
      setUrl(params.get('url') || sessionStorage.getItem(STORE_URL) || '')
    } catch {
      setUrl(params.get('url') || '')
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidSiteUrl(url)) {
      setError(t.errors.invalid_url)
      document.getElementById('au-url')?.focus()
      return
    }
    setError('')
    setBusy(true)
    const host = normaliseSiteHost(url)
    try { sessionStorage.setItem(STORE_URL, host) } catch { /* ?url= carries it */ }
    window.location.href = `/audit/details?lang=${lang}&url=${encodeURIComponent(host)}`
  }

  return (
    <div className="au-page">

      {/* ═══ Band 1 · hero · frame y 0–1080 · dark ═══ */}
      <header className="au-band au-band--dark au-hero">
        <div className="au-frame">
          {/* The horizontal lockup from the frame (258x46). The site's other
              logo files are the square mark, which is a different asset. */}
          <a href={`/?lang=${lang}`} className="au-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/audit/logo-lockup.svg" alt="Two Otters Studio" width={258} height={46} />
          </a>

          {/* LTR grid on purpose: the frame puts the photograph on the left and
              the copy on the right regardless of reading direction. The copy
              block sets its own direction back. */}
          <div className="au-hero-row">
            <div className="au-hero-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/audit/hero-team.webp" alt={t.heroPhotoAlt} />
            </div>

            <div className="au-hero-copy">
              <p className="au-eyebrow">{t.eyebrow}</p>
              <h1 className="au-h1">
                {t.title1}
                <br />
                <span className="au-h1-accent">{t.title2}</span>
              </h1>
              <p className="au-hero-sub">{t.sub}</p>

              <form className="au-url-form" onSubmit={handleSubmit} noValidate>
                <label className="au-sr-only" htmlFor="au-url">{t.urlLabel}</label>
                <div className="au-url-pill">
                  <input
                    id="au-url"
                    className="au-url-input"
                    name="url"
                    type="url"
                    inputMode="url"
                    value={url}
                    onChange={e => { setUrl(e.target.value); if (error) setError('') }}
                    placeholder={t.placeholder}
                    autoComplete="url"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? 'au-url-err' : undefined}
                  />
                  <button type="submit" className="au-go" disabled={busy}>
                    {busy ? t.checking : t.submit}
                  </button>
                </div>
                {error && <p className="au-error" id="au-url-err" role="alert">{error}</p>}
              </form>

              <p className="au-trust">
                {/* The pair from the frame, rebuilt from the two portraits that
                    already back the email signatures. The frame's own export
                    was flattened onto white, which on the navy read as a white
                    box around the faces. These carry real transparency. */}
                <span className="au-trust-avatars" role="img" aria-label={t.avatarsAlt}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/email/amir.png" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/email/keren.png" alt="" />
                </span>
                <span>{t.trust.join(' · ')}</span>
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="au-scroll-cue"
          onClick={() => document.getElementById('au-what')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          {t.scrollHint}
          <Chevron />
        </button>
      </header>

      {/* ═══ Band 2 · what's in the report · frame y 1080–1916 · WHITE ═══ */}
      <section className="au-band au-band--light" id="au-what">
        <div className="au-frame">
          <div className="au-head">
            <h2 className="au-h2">{t.whatTitle}</h2>
            <p className="au-sub">{t.whatSub}</p>
          </div>

          {/* frame: the scores sit left of a summary dial, 1038 + 14 + 384 of
              1436. LTR placement for the same reason as the hero row: the frame
              fixes which side is which, and each card sets its text back. */}
          <div className="au-scores" ref={scoresRef}>
            <div className="au-cards">
              {t.areas.map((a, i) => (
                <article className="au-card" key={a.title}>
                  <div className="au-card-head">
                    <h3 className="au-card-title">{a.title}</h3>
                    <span className={`au-score au-score--${a.tone}`}>{a.score}</span>
                  </div>
                  <span className="au-meter" aria-hidden="true">
                    <span
                      className={`au-meter-fill au-meter-fill--${a.tone}`}
                      /* Width comes from the variable, not from this rule: an
                         inline width would outrank the reveal's from-state. */
                      style={{
                        '--au-fill': `${a.score}%`,
                        '--au-i': i,
                      } as React.CSSProperties}
                    />
                  </span>
                  <p className={`au-verdict au-verdict--${a.tone}`}>
                    <span className="au-verdict-dot" aria-hidden="true" />
                    {a.verdict}
                  </p>
                </article>
              ))}
            </div>

            <div className="au-overall">
              <Dial alt={t.overall.alt} />
              <div className="au-dial-face" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/audit/logo-mark.svg" alt="" className="au-dial-mark" />
                <span className="au-dial-wordmark">Two Otters Studio</span>
                <p className="au-dial-score">
                  {t.overall.score}
                  <span>{t.overall.outOf}</span>
                </p>
              </div>
              <p className="au-overall-label">{t.overall.label}</p>
            </div>
          </div>

          <ul className="au-deliverables">
            {t.deliverables.map(item => <li key={item}><Tick />{item}</li>)}
          </ul>
        </div>
      </section>

      {/* ═══ Band 3 · why it takes two days · frame y 1916–2996 · dark ═══ */}
      <section className="au-band au-band--dark au-band--why">
        <div className="au-frame au-split">
          <ScanIllustration label={t.scanning} avatarsAlt={t.avatarsAlt} />
          <div className="au-split-copy">
            <h2 className="au-h2">{t.whyTitle}</h2>
            <p className="au-why-lead">{t.whyLead}</p>
            {t.whyBody.map(p => <p className="au-body" key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ═══ Band 4 · a real report · frame y 2996–3580 · WHITE ═══
          The stack of pages starts up in the dark band above and carries over
          the boundary, exactly as it does in the frame (y 2852–3640 against a
          band edge at 2996), so it is pulled up rather than sitting inside. */}
      <section className="au-band au-band--light au-band--report">
        <div className="au-frame au-split au-split--report">
          <div className="au-split-copy">
            <h2 className="au-h2">{t.sampleTitle}</h2>
            <p className="au-sub">{t.sampleSub}</p>
          </div>
          {/* The whole stack as drawn: three sheets, their rotations and their
              offsets all come from the frame's own export, so there is nothing
              here to re-derive and get backwards. */}
          <div className="au-report">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/audit/report-stack.webp" alt={t.reportAlt} />
          </div>
        </div>
      </section>

      {/* ═══ Band 5 · three questions · frame y 3580–4659 · dark ═══ */}
      <section className="au-band au-band--dark au-band--faq">
        <div className="au-frame">
          <h2 className="au-h2 au-h2--center">{t.faqTitle}</h2>
          <dl className="au-faq">
            {t.faq.map(item => (
              <div className="au-faq-item" key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>

          <div className="au-to-top-row">
            <button
              type="button"
              className="au-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Chevron up />
              {t.backToTop}
            </button>
          </div>
        </div>
      </section>


    </div>
  )
}
