'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import he from '@/locales/v10-he.json'

type TestimonialsT = typeof he.testimonials

const INTERVAL = 8000

/**
 * One big quote at a time instead of a wall of cards: the homepage already has
 * a lot of grids, and a single voice reads as a voice. It moves on every 8
 * seconds, holds still while the pointer is on it, and the dots jump directly.
 *
 * All slides share one grid cell, so the box is as tall as the longest quote
 * and the page below never jumps when the quote changes.
 */
export default function TestimonialsV10({ t }: { t: TestimonialsT }) {
  const [current, setCurrent] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = t.items.length

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setCurrent(i => (i + 1) % count), INTERVAL)
  }, [count])
  const stop = () => { if (timer.current) clearInterval(timer.current) }

  useEffect(() => {
    // Respect reduced motion: no auto-advance, the dots still work.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    start()
    return stop
  }, [start])

  return (
    <section className="v8-testimonials v10-bigq-sec">
      <div className="v8-container">
        <h2 className="v8-testimonials-title">{t.title}</h2>
        <div className="v8-t-stars" aria-hidden="true"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
        <figure className="v10-bigq" aria-live="polite" onMouseEnter={stop} onMouseLeave={start}>
          <div className="v10-bigq-slides">
            {t.items.map((q, i) => (
              <div key={i} className={`v10-bigq-slide${i === current ? ' on' : ''}`} aria-hidden={i !== current}>
                <blockquote>{q.quote}</blockquote>
                <figcaption>
                  {q.photo
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={q.photo} alt="" />
                    : <span className="v10-bigq-ini">{'initials' in q ? q.initials : q.name.slice(0, 2)}</span>}
                  <span><b>{q.name}</b>{q.role}</span>
                </figcaption>
              </div>
            ))}
          </div>
          <div className="v10-bigq-dots" role="tablist" aria-label={t.dotsLabel}>
            {t.items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={t.dotLabel.replace('{n}', String(i + 1))}
                className={i === current ? 'on' : undefined}
                onClick={() => { setCurrent(i); start() }}
              />
            ))}
          </div>
        </figure>
      </div>
    </section>
  )
}
