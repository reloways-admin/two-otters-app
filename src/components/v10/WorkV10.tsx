import he from '@/locales/v10-he.json'
import { ROUTES, link } from './routes'
import ArrowLeftV10 from './ArrowLeftV10'

type WorkT = typeof he.work

/**
 * "Our partners along the way" — three project cards in the brand language:
 * navy outline, a hard shadow in the project's colour, and the one number
 * that matters pinned to the bottom line of every card.
 *
 * Each card opens that project's chapter on the work page.
 */
export default function WorkV10({ t }: { t: WorkT }) {
  return (
    <section className="v8-work v10-work" id="work">
      <div className="v8-container">
        <h2 className="v8-section-heading" style={{ marginBottom: 12 }}>
          <span className="bold">{t.heading}</span>
        </h2>
        <p className="v8-work-sub">{t.sub}</p>

        <div className="v8-work-grid">
          {t.projects.map(p => (
            <a
              key={p.title}
              href={link(p.to)}
              className="v8-work-card"
              style={{ ['--acc-soft' as string]: p.accent }}
              aria-label={p.title}
            >
              <div className="v8-work-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} className="v8-work-cover-img" style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined} />
                <span className="v8-work-view" aria-hidden="true">{t.view}</span>
              </div>
              <div className="v8-work-info">
                <span className="v8-work-kicker">{p.subtitle}</span>
                <h3 className="v8-work-title">{p.title}</h3>
                <p className="v8-work-tagline">{p.tagline}</p>
                <span className="v10-metric"><b>{p.metric}</b> {p.metricLabel}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="v10-center"><a className="v10-btn-lime" href={ROUTES.work}>{t.all} <ArrowLeftV10 /></a></div>
      </div>
    </section>
  )
}
