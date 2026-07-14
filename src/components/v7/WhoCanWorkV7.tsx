'use client'

import Image from 'next/image'
import en from '@/locales/v7-en.json'

type WhoT = typeof en.who

const EYES = ['/eyes-v01.png']
// Icon order follows each locale's persona order (English LTR is the reverse of Hebrew RTL)
const PERSONA_ICONS_HE = ['/phone-t.png', '/ab-t.png', '/light-t.png', '/stamp-t.png', '/target-t.png']
const PERSONA_ICONS_EN = ['/target-t.png', '/stamp-t.png', '/light-t.png', '/ab-t.png', '/phone-t.png']

function MarqueeUnit({ text }: { text: string }) {
  return (
    <>
      <span className="v7-marquee-text">{text}</span>
      {EYES.map((src, i) => (
        <span key={i} className="v7-marquee-eye">
          <Image src={src} alt="" width={36} height={36} style={{ objectFit: 'contain' }} />
        </span>
      ))}
    </>
  )
}

export default function WhoCanWorkV7({ t, lang = 'he' }: { t: WhoT; lang?: 'en' | 'he' }) {
  const units = Array.from({ length: 20 })
  const personaIcons = lang === 'en' ? PERSONA_ICONS_EN : PERSONA_ICONS_HE

  return (
    <section className="v7-who" id="who">
      {/* Blue ticker marquee */}
      <div className="v7-marquee-strip">
        <div className="v7-marquee-track">
          {units.map((_, i) => <MarqueeUnit key={i} text={t.marqueeText} />)}
          {units.map((_, i) => <MarqueeUnit key={`b${i}`} text={t.marqueeText} />)}
        </div>
      </div>

      <div className="v7-who-body">
        <div className="v7-container">
          <h2 className="v7-who-title">
            {t.title.split('\n').map((line, i, arr) => (
              <span key={i} className={lang === 'en' && i > 0 ? 'v7-who-title-light' : undefined}>
                {line}{i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>

          {/* Match cards */}
          <div className="v7-match-grid">
            {/* It's a match — green card (right in RTL) */}
            <div className="v7-match-card-wrap">
              <div className="v7-match-card yes">
                <div className="v7-match-illus">
                  <Image
                    src="/its-a-match-v01.svg"
                    alt={t.yesAlt}
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                  />
                </div>
                <ul className="v7-match-list">
                  {t.yesList.map(item => (
                    <li key={item}>
                      <span className="v7-match-icon-wrap">
                        <Image src="/checkmark.png" alt="✓" width={22} height={22} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Not a match — red card (left in RTL) */}
            <div className="v7-match-card-wrap">
              <div className="v7-match-card no">
                <div className="v7-match-illus">
                  <Image
                    src="/swipe-left-v01.svg"
                    alt={t.noAlt}
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                  />
                </div>
                <ul className="v7-match-list">
                  {t.noList.map(item => (
                    <li key={item}>
                      <span className="v7-match-icon-wrap">
                        <Image src="/crossmark.png" alt="✗" width={22} height={22} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Personas */}
          <h3 className="v7-personas-title">{t.personasTitle}</h3>
          <div className="v7-personas-grid">
            {t.personas.map((p, i) => (
              <div key={i} className="v7-persona-card">
                <div className="v7-persona-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={personaIcons[i]} alt="" className="v7-persona-icon-img" />
                </div>
                <div className="v7-persona-title">
                  {p.title.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </div>
                <div className="v7-persona-text">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
