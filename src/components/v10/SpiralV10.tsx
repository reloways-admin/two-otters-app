'use client'

import { useState } from 'react'
import he from '@/locales/v10-he.json'
import ArrowLeftV10 from './ArrowLeftV10'

type SpiralT = typeof he.spiral

// Stage colours and illustrations, as in v8.
const CARD_META = [
  { bg: '#5aff00', textColor: '#1d2332' },
  { bg: '#945eee', textColor: '#ffffff' },
  { bg: '#f8f800', textColor: '#1d2332' },
  { bg: '#2672ff', textColor: '#ffffff' },
]
const STAGE_ILLUS = ['/step-1.svg', '/step-2.svg', '/step-3.svg', '/step-4.svg']
const STEP_ILLUS: Record<string, string> = {
  '5': '/spiral-megaphone.svg',
  '6': '/spiral-feather.svg',
  '7': '/spiral-colors.svg',
  '8': '/spiral-browser.svg',
}

/**
 * The spiral method: four stages on the loop, then steps 5–8.
 *
 * On the homepage the steps start folded behind "all the steps" — the four
 * stages are the pitch, the rest is for whoever wants the detail, and it opens
 * in place rather than sending them to another page. The services page passes
 * `steps="open"` and shows them outright.
 */
export default function SpiralV10({ t, steps = 'toggle' }: { t: SpiralT; steps?: 'toggle' | 'open' }) {
  const [open, setOpen] = useState(steps === 'open')
  const lines = (s: string) => s.split('\n').map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 && <br className="v10-br-desktop" />}</span>
  ))

  return (
    <section className="v8-spiral" id="spiral">
      <div className="v8-container">
        <div className="v8-spiral-header">
          <h2 className="v8-spiral-title">{t.title1}<br /><span className="v10-tilt">{t.titleBold}</span></h2>
          <p className="v8-spiral-sub">{t.sub}</p>
        </div>

        <div className="v8-spiral-canvas">
          {/* eslint-disable @next/next/no-img-element */}
          <img className="v8-spiral-svg" src="/spiral-loop.svg" alt="" aria-hidden="true" />
          <div className="v8-spiral-top-grid">
            {t.cards.map((card, i) => (
              <div key={i} className={`v8-spiral-card v8-spiral-card-${i + 1}`} style={{ background: CARD_META[i].bg, color: CARD_META[i].textColor }}>
                <span className="v8-spiral-card-num">{card.num}</span>
                <div className="v8-spiral-card-text">
                  <p className="v8-spiral-card-title">{card.title}</p>
                  <p className="v8-spiral-card-subtitle">{card.subtitle}</p>
                </div>
                <p className="v8-spiral-card-body">{card.body}</p>
                <img src={STAGE_ILLUS[i]} alt="" aria-hidden="true" className="v8-spiral-card-illus" />
              </div>
            ))}
            <img src="/step-1.svg" alt="" className="v8-spiral-horse" aria-hidden="true" />
            <img src="/step-2.svg" alt="" className="v8-spiral-papers" aria-hidden="true" />
            <img src="/step-3.svg" alt="" className="v8-spiral-screens" aria-hidden="true" />
            <img src="/step-4.svg" alt="" className="v8-spiral-spaceship" aria-hidden="true" />
          </div>
        </div>

        <div className="v8-spiral-more">
          <h3 className="v8-spiral-more-title">{lines(t.moreTitle)}</h3>
          <p className="v8-spiral-more-sub">{lines(t.moreSub)}</p>
        </div>

        {steps === 'toggle' && (
          <div className="v10-center" style={{ marginTop: 28 }}>
            <button
              type="button"
              className="v10-btn-lime v10-steps-toggle"
              aria-expanded={open}
              aria-controls="spiral-more-steps"
              onClick={() => setOpen(o => !o)}
            >
              {open ? t.hideSteps : t.showSteps}
              <ArrowLeftV10 dir="down" className="v10-steps-toggle-ico" />
            </button>
          </div>
        )}

        <div id="spiral-more-steps" className={`v10-more-steps${open ? ' is-open' : ''}`} hidden={!open}>
          <div className="v8-spiral-steps" style={steps === 'toggle' ? { marginTop: 56 } : undefined}>
            {t.steps.map(step => (
              <div key={step.num} className="v8-spiral-step">
                {STEP_ILLUS[step.num] && <img src={STEP_ILLUS[step.num]} alt="" aria-hidden="true" className="v8-spiral-step-icon" />}
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
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    </section>
  )
}
