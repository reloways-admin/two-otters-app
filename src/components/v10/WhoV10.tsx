import Image from 'next/image'
import he from '@/locales/v10-he.json'

type WhoT = typeof he.who

function MarqueeUnit({ text }: { text: string }) {
  return (
    <>
      <span className="v8-marquee-text">{text}</span>
      <span className="v8-marquee-eye">
        <Image src="/eyes-v01.png" alt="" width={36} height={36} style={{ objectFit: 'contain' }} />
      </span>
    </>
  )
}

/** "If this sounds like you" — the match / swipe-left cards, near the end of
 *  the homepage. Forked from WhoCanWorkV8 for the RTL marquee; the "when do
 *  people come to us" personas were dropped from v10 (Keren, 8.10.2026). */
export default function WhoV10({ t }: { t: WhoT }) {
  const units = Array.from({ length: 20 })

  return (
    <section className="v8-who" id="who">
      <div className="v8-marquee-strip">
        <div className="v8-marquee-track">
          {units.map((_, i) => <MarqueeUnit key={i} text={t.marqueePhrases[i % t.marqueePhrases.length]} />)}
          {units.map((_, i) => <MarqueeUnit key={`b${i}`} text={t.marqueePhrases[i % t.marqueePhrases.length]} />)}
        </div>
      </div>

      <div className="v8-who-body">
        <div className="v8-container">
          <h2 className="v8-who-title">
            {t.title.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}
          </h2>

          <div className="v8-match-grid">
            <div className="v8-match-col yes">
              <div className="v8-match-hero">
                <span className="v8-match-bigtext">IT&rsquo;S A<br />MATCH</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/who-otter-up.png" alt={t.yesAlt} className="v8-match-otter" />
              </div>
              <div className="v8-match-card yes">
                <ul className="v8-match-list">
                  {t.yesList.map(item => (
                    <li key={item}>
                      <span className="v8-match-icon-wrap"><Image src="/checkmark.png" alt="✓" width={26} height={26} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="v8-match-col no">
              <div className="v8-match-hero">
                <span className="v8-match-bigtext">SWIPE<br />LEFT :(</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/who-otter-down.png" alt={t.noAlt} className="v8-match-otter" />
              </div>
              <div className="v8-match-card no">
                <ul className="v8-match-list">
                  {t.noList.map(item => (
                    <li key={item}>
                      <span className="v8-match-icon-wrap"><Image src="/crossmark.png" alt="✗" width={26} height={26} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
