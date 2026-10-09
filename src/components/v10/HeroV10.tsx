import he from '@/locales/v10-he.json'
import { ROUTES } from './routes'

type HeroT = typeof he.hero

/**
 * Keren's hero (next-site artifact, 6.10.2026): Amir and Keren standing behind
 * a prototype window, cut at the waist, with their hands resting in front of
 * it. Two stacked images do that — the people behind the window, the hands in
 * front — so the window can be real markup rather than baked into a photo.
 *
 * The copy column reuses the audit page's hero classes (`au-*`), which is
 * where the layout came from.
 */
export default function HeroV10({ t }: { t: HeroT }) {
  return (
    <div className="au-page v10-hero">
      <header className="au-band au-band--dark au-hero">
        <div className="au-frame">
          <div className="au-hero-row">
            <div className="v10-duo" role="img" aria-label={t.duoAlt}>
              <span className="v10-duo-halo" aria-hidden="true" />
              {/* eslint-disable @next/next/no-img-element */}
              <img className="v10-duo-ico v10-duo-ico--stars" src="/v10/ico-stars.png" alt="" />
              <img className="v10-duo-people" src="/v10/duo-people.webp" alt="" width={1100} height={1375} />
              <div className="v10-duo-screen" aria-hidden="true">
                <div className="v10-duo-bar">
                  <span className="v10-duo-dots"><i /><i /><i /></span>
                  <span className="v10-duo-url">two-otters.studio</span>
                </div>
                <div className="v10-duo-body">
                  <span className="v10-duo-line v10-duo-line--h" />
                  <span className="v10-duo-line" />
                  <span className="v10-duo-btn">{t.duoButton}</span>
                  <img className="v10-duo-cursor" src="/v10/ico-cursor.png" alt="" />
                  <img className="v10-duo-heart" src="/v10/ico-heart.png" alt="" />
                  <img className="v10-duo-chart" src="/v10/ico-chart.png" alt="" />
                </div>
              </div>
              <img className="v10-duo-ico v10-duo-ico--rocket" src="/v10/ico-rocket.png" alt="" />
              <img className="v10-duo-hands" src="/v10/duo-hands.webp" alt="" width={1100} height={1375} />
              {/* eslint-enable @next/next/no-img-element */}
            </div>

            <div className="au-hero-copy">
              <p className="au-eyebrow">{t.eyebrow}</p>
              <h1 className="au-h1">
                {t.title}<br />
                <span className="au-h1-accent">{t.titleAccent}</span>
              </h1>
              <p className="au-hero-sub">
                {t.sub}<br className="v10-br-desktop" /> {t.subLine2}
              </p>
              <div className="v10-hero-actions">
                <a className="v10-btn-lime" href={ROUTES.book}>{t.ctaBook}</a>
                <a className="v10-btn-outline" href={ROUTES.audit}>{t.ctaAudit}</a>
              </div>
              <p className="au-trust">
                <span className="au-trust-avatars" role="img" aria-label={t.trustAlt}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/v10/au-amir.png" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/v10/au-keren.png" alt="" />
                </span>
                <span>{t.trust}</span>
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
