import he from '@/locales/v10-he.json'
import { ROUTES } from './routes'
import ArrowLeftV10 from './ArrowLeftV10'

type CtaT = typeof he.cta

/**
 * The closing slab: a tilted lime band, a huge headline with the last word on
 * a navy marker, and stickers scattered around it. It deliberately breaks the
 * page's rhythm, so the last thing on the page is the one thing to do.
 * The artifact uses the same slab at the end of the work page.
 */
export default function CtaSlabV10({ t }: { t: CtaT }) {
  const [a, b, c] = t.stickers
  return (
    <section className="v10-cta" aria-labelledby="v10-cta-h">
      <div className="v10-cta-slab">
        {/* eslint-disable @next/next/no-img-element */}
        <img className="v10-cta-hand" src="/otter-hand.svg" alt="" aria-hidden="true" />
        <img className="v10-cta-star" src="/v10/ico-stars.png" alt="" aria-hidden="true" />
        {/* eslint-enable @next/next/no-img-element */}
        <span className="v10-cta-sticker v10-cta-sticker--a">{a}</span>
        <span className="v10-cta-sticker v10-cta-sticker--b">{b}</span>
        <span className="v10-cta-sticker v10-cta-sticker--c">{c} <em>✓</em></span>
        <div className="v10-cta-copy">
          <p className="v10-cta-k">{t.kicker}</p>
          <h2 id="v10-cta-h">{t.title}<br />{t.titleLine2} <mark>{t.titleMark}</mark></h2>
          <a className="v10-cta-btn" href={ROUTES.book}>{t.button} <span aria-hidden="true"><ArrowLeftV10 size={24} /></span></a>
        </div>
      </div>
    </section>
  )
}
