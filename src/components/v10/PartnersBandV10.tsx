import he from '@/locales/v10-he.json'
import { ROUTES } from './routes'

type PartnersT = typeof he.partners

/**
 * The partners band — studios, dev houses and SEO people who bring us in under
 * their client. The light ("negative") version: after the dark spiral, a white
 * band with a navy outline breaks the run of dark sections.
 */
export default function PartnersBandV10({ t }: { t: PartnersT }) {
  return (
    <section className="v10-sec v10-sec--band" id="partners">
      <div className="v10-band v10-band--neg">
        <div>
          <h2>{t.title} <em>{t.titleAccent}</em></h2>
          <p>{t.sub}</p>
        </div>
        <div className="v10-band-side">
          <p className="v10-band-label">{t.fitLabel}</p>
          <ul className="v10-fit-list">
            {t.fit.map(f => (
              <li key={f.title}>
                <b>{f.title}</b>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
          <a className="v10-btn-lime v10-band-cta" href={ROUTES.partners}>{t.cta}</a>
        </div>
      </div>
    </section>
  )
}
