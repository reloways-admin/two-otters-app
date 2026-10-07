import he from '@/locales/v10-he.json'

type PartnersT = typeof he.partners

/**
 * The partners band — studios, dev houses and SEO people who bring us in under
 * their client. In the artifact each fit links to its own partner page; those
 * pages aren't built yet, so here the band ends in one CTA to the call page.
 */
export default function PartnersBandV10({ t }: { t: PartnersT }) {
  return (
    <section className="v10-sec v10-sec--band" id="partners">
      <div className="v10-band">
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
          <a className="v10-btn-lime v10-band-cta" href="/schedule-a-call?lang=he">{t.cta}</a>
        </div>
      </div>
    </section>
  )
}
