'use client'

import Image from 'next/image'
import en from '@/locales/v6-en.json'

type WhoT = typeof en.who

const EYES = ['/eyes-v01.png']
const PERSONA_ICONS = ['/mobile.svg', '/a-to-b.svg', '/lightning.svg', '/stamp.svg', '/target.svg']

function MarqueeUnit({ text }: { text: string }) {
  return (
    <>
      <span className="v6-marquee-text">{text}</span>
      {EYES.map((src, i) => (
        <span key={i} className="v6-marquee-eye">
          <Image src={src} alt="" width={36} height={36} style={{ objectFit: 'contain' }} />
        </span>
      ))}
    </>
  )
}

export default function WhoCanWorkV6({ t }: { t: WhoT }) {
  const units = Array.from({ length: 20 })

  return (
    <section className="v6-who" id="who">
      {/* Blue ticker marquee */}
      <div className="v6-marquee-strip">
        <div className="v6-marquee-track">
          {units.map((_, i) => <MarqueeUnit key={i} text={t.marqueeText} />)}
          {units.map((_, i) => <MarqueeUnit key={`b${i}`} text={t.marqueeText} />)}
        </div>
      </div>

      <div className="v6-who-body">
        <div className="v6-container">
          <h2 className="v6-who-title">
            {t.title.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>

          {/* Match cards */}
          <div className="v6-match-grid">
            {/* It's a match — green card (right in RTL) */}
            <div className="v6-match-card-wrap">
              <div className="v6-match-card yes">
                <div className="v6-match-illus">
                  <Image
                    src="/its-a-match-v01.svg"
                    alt={t.yesAlt}
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                  />
                </div>
                <ul className="v6-match-list">
                  {t.yesList.map(item => (
                    <li key={item}>
                      <span className="v6-match-icon-wrap">
                        <Image src="/checkmark.png" alt="✓" width={22} height={22} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Not a match — red card (left in RTL) */}
            <div className="v6-match-card-wrap">
              <div className="v6-match-card no">
                <div className="v6-match-illus">
                  <Image
                    src="/swipe-left-v01.svg"
                    alt={t.noAlt}
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                  />
                </div>
                <ul className="v6-match-list">
                  {t.noList.map(item => (
                    <li key={item}>
                      <span className="v6-match-icon-wrap">
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
          <h3 className="v6-personas-title">{t.personasTitle}</h3>
          <div className="v6-personas-grid">
            {t.personas.map((p, i) => (
              <div key={i} className="v6-persona-card">
                <div className="v6-persona-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PERSONA_ICONS[i]} alt="" className="v6-persona-icon-img" />
                </div>
                <div className="v6-persona-title">
                  {p.title.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </div>
                <div className="v6-persona-text">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
