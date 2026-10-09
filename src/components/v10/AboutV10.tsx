import he from '@/locales/v10-he.json'
import { ROUTES } from './routes'
import ArrowLeftV10 from './ArrowLeftV10'

type AboutT = typeof he.about

/** "Ola! We're Amir and Keren." — v8's about block plus a way on to the about
 *  page. The couch photo, bubbles and decorations are the v8 composition. */
export default function AboutV10({ t }: { t: AboutT }) {
  return (
    <section className="v8-about" id="about">
      <div className="v8-container v8-about-grid">
        <div className="v8-about-text">
          <h2 className="v8-about-title">
            <span className="v8-about-olah-row">
              <span className="v8-about-olah">{t.greeting}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/otter-hand.svg" alt="" className="v8-about-hand" aria-hidden="true" />
            </span>
            <span className="v8-about-names">{t.title}</span>
          </h2>
          <p className="v8-about-body">{t.body1}</p>
          <p className="v8-about-body">{t.body2} <b>{t.body3Bold}</b></p>
          <a className="v10-btn-dark" href={ROUTES.about} style={{ marginTop: 24 }}>{t.more} <ArrowLeftV10 /></a>
        </div>

        <div className="v8-about-visual">
          <div className="v8-about-frame">
            {/* eslint-disable @next/next/no-img-element */}
            <img src="/about-couch.jpg" alt={`${t.amirPhotoAlt} · ${t.kerenPhotoAlt}`} className="v8-about-couch" />
            <img src={'amirBubble' in t ? String(t.amirBubble) : '/about-bubble-amir.svg'} alt={t.amirBubbleAlt} className="v8-about-bubble v8-about-bubble--amir" />
            <img src={'kerenBubble' in t ? String(t.kerenBubble) : '/about-bubble-keren.svg'} alt={t.kerenBubbleAlt} className="v8-about-bubble v8-about-bubble--keren" />
            <img src="/about-browser.svg" alt="" className="v8-about-deco v8-about-deco--browser" aria-hidden="true" />
            <img src="/about-horse.svg" alt="" className="v8-about-deco v8-about-deco--knight" aria-hidden="true" />
            {/* Name tags stand in for the bubbles on mobile */}
            <img src="/amir-tag.svg" alt={t.amirPhotoAlt} className="v8-about-tag v8-about-tag--amir" />
            <img src="/keren-tag.svg" alt={t.kerenPhotoAlt} className="v8-about-tag v8-about-tag--keren" />
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </div>
    </section>
  )
}
