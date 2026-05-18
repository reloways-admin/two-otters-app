'use client'

import { useState } from 'react'
import en from '@/locales/v6-en.json'

type FaqT = typeof en.faq

export default function FaqV6({ t }: { t: FaqT }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="v6-faq" id="faq">
      <div className="v6-container">
        <h2 className="v6-section-heading" style={{ marginBottom: 48 }}>
          <span className="bold">{t.heading}</span>
        </h2>

        <div className="v6-faq-list">
          {t.items.map((faq, i) => (
            <div key={i} className="v6-faq-item">
              <button
                className="v6-faq-q"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span>{faq.q}</span>
                <span className="v6-faq-icon" aria-hidden="true">
                  <span className="v6-faq-icon-bar v6-faq-icon-bar--h" />
                  <span className="v6-faq-icon-bar v6-faq-icon-bar--v" />
                </span>
              </button>
              <div className={`v6-faq-a${openIdx === i ? ' open' : ''}`}>
                <div className="v6-faq-a-inner">
                  {faq.a.split('\n\n').map((para, pi) => (
                    <p key={pi} style={{ margin: pi > 0 ? '16px 0 0' : 0 }}>
                      {para.split('\n').map((line, li, arr) => (
                        <span key={li}>{line}{li < arr.length - 1 && <br />}</span>
                      ))}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
