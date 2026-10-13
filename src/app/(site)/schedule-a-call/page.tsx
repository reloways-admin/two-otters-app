'use client'

import BookCallV8 from '@/components/v8/BookCallV8'
import { ROUTES } from '@/components/v10/routes'
import he from '@/locales/v8-he.json'
import './styles.css'

/** As on the live page: one short voice, so the calendar stays above the fold. */
const QUOTE_MAX = 160

/**
 * The booking page, inside the site's frame (header, mega menus, footer). Every
 * "book a call" on the site lands here (ROUTES.book). The calendar is v8's
 * BookCallV8 over /api/booking — a request both founders approve by email; see
 * lib/booking/requests.ts. Its fallback link points at the contact page.
 */
export default function ScheduleACallPage() {
  const t = he.bookCall
  const quote = he.testimonials.items.find(i => i.quote.length <= QUOTE_MAX)

  return (
    <>
      <section className="v8-book-hero">
        <div className="v8-book-hero-inner">
          <div className="v8-book-copy">
            <span className="v8-book-chip">{t.chip}</span>
            <h1 className="v8-book-title">{t.title}</h1>
            <p className="v8-book-sub">{t.sub}</p>
            {quote && (
              <figure className="v8-book-quote">
                <blockquote>“{quote.quote}”</blockquote>
                <figcaption>
                  <strong>{quote.name}</strong>
                  <span>{quote.role}</span>
                </figcaption>
              </figure>
            )}
          </div>
          <BookCallV8 t={t} lang="he" contactHref={ROUTES.contact} />
        </div>
      </section>

      <section className="v8-book-steps">
        <div className="v8-container">
          <h2 className="v8-book-steps-title">{t.stepsTitle}</h2>
          <ol className="v8-book-steps-list">
            {t.steps.map((step, i) => (
              <li key={step.title} className="v8-book-step">
                {/* bdi: otherwise RTL flips the slash to the far side ("01/") */}
                <span className="v8-book-step-num"><bdi>/{String(i + 1).padStart(2, '0')}</bdi></span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
