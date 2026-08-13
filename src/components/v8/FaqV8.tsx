'use client'

import { useState } from 'react'
import en from '@/locales/v8-en.json'

type FaqT = typeof en.faq

export default function FaqV8({ t }: { t: FaqT }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="v8-faq" id="faq">
      <div className="v8-container">
        <h2 className="v8-section-heading" style={{ marginBottom: 48 }}>
          <span className="bold">{t.heading}</span>
        </h2>

        <div className="v8-faq-list">
          {t.items.map((faq, i) => (
            <div key={i} className="v8-faq-item">
              <button
                className="v8-faq-q"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span>{faq.q}</span>
                <span className="v8-faq-icon" aria-hidden="true">
                  <span className="v8-faq-icon-bar v8-faq-icon-bar--h" />
                  <span className="v8-faq-icon-bar v8-faq-icon-bar--v" />
                </span>
              </button>
              <div className={`v8-faq-a${openIdx === i ? ' open' : ''}`}>
                <div className="v8-faq-a-inner">
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
