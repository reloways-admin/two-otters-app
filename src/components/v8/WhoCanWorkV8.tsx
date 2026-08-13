'use client'

import Image from 'next/image'
import en from '@/locales/v8-en.json'

type WhoT = typeof en.who

const EYES = ['/eyes-v01.png']
// Icon order follows each locale's persona order (English LTR is the reverse of Hebrew RTL)
const PERSONA_ICONS_HE = ['/phone-t.png', '/ab-t.png', '/light-t.png', '/stamp-t.png', '/target-t.png']
const PERSONA_ICONS_EN = ['/target-t.png', '/stamp-t.png', '/light-t.png', '/ab-t.png', '/phone-t.png']

function MarqueeUnit({ text }: { text: string }) {
  return (
    <>
      <span className="v8-marquee-text">{text}</span>
      {EYES.map((src, i) => (
        <span key={i} className="v8-marquee-eye">
          <Image src={src} alt="" width={36} height={36} style={{ objectFit: 'contain' }} />
        </span>
      ))}
    </>
  )
}

export default function WhoCanWorkV8({ t, lang = 'he' }: { t: WhoT; lang?: 'en' | 'he' }) {
  const units = Array.from({ length: 20 })
  const personaIcons = lang === 'en' ? PERSONA_ICONS_EN : PERSONA_ICONS_HE

  return (
    <section className="v8-who" id="who">
      {/* Blue ticker marquee */}
      <div className="v8-marquee-strip">
        <div className="v8-marquee-track">
          {units.map((_, i) => <MarqueeUnit key={i} text={t.marqueePhrases[i % t.marqueePhrases.length]} />)}
          {units.map((_, i) => <MarqueeUnit key={`b${i}`} text={t.marqueePhrases[i % t.marqueePhrases.length]} />)}
        </div>
      </div>

      <div className="v8-who-body">
        <div className="v8-container">
          <h2 className="v8-who-title">
            {t.title.split('\n').map((line, i, arr) => (
              <span key={i} className={lang === 'en' && i > 0 ? 'v8-who-title-light' : undefined}>
                {line}{i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>

          {/* Match cards */}
          <div className="v8-match-grid">
            {/* It's a match — green (right in RTL) */}
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
                      <span className="v8-match-icon-wrap">
                        <Image src="/checkmark.png" alt="✓" width={26} height={26} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Not a match — red (left in RTL) */}
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
                      <span className="v8-match-icon-wrap">
                        <Image src="/crossmark.png" alt="✗" width={26} height={26} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Personas */}
          <h3 className="v8-personas-title">{t.personasTitle}</h3>
          <div className="v8-personas-grid">
            {t.personas.map((p, i) => (
              <div key={i} className="v8-persona-card">
                <div className="v8-persona-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={personaIcons[i]} alt="" className="v8-persona-icon-img" />
                </div>
                <div className="v8-persona-title">
                  {p.title.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </div>
                <div className="v8-persona-text">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
