'use client'

import { useState } from 'react'
import he from '@/locales/v10-he.json'
import { whatsappLink, type WhatsAppPerson } from './whatsapp'

type FaqT = typeof he.faq
type AskT = typeof he.ask

/**
 * The FAQ with Keren's "ask us directly" cards beside it. Each card opens a
 * WhatsApp chat with that person, in a new tab.
 * The question list itself is FaqV8's markup, so it keeps the v8 accordion styles.
 */
export default function FaqV10({ t, ask }: { t: FaqT; ask: AskT }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="v8-faq" id="faq">
      <div className="v8-container">
        <h2 className="v8-section-heading v10-faq-title">
          <span className="bold">{t.heading}</span>
        </h2>
        <div className="v10-faq-layout">
          <div className="v8-faq-list">
            {t.items.map((faq, i) => (
              <div key={faq.q} className="v8-faq-item">
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
                  <div className="v8-faq-a-inner"><p style={{ margin: 0 }}>{faq.a}</p></div>
                </div>
              </div>
            ))}
          </div>

          <aside className="v10-ask" aria-label={ask.label}>
            {ask.people.map(p => (
              <div key={p.name} className="v10-ask-card">
                <div className="v10-ask-who">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt="" className="v10-ask-avatar" />
                  <span><b>{p.name}</b>{p.role}</span>
                </div>
                <p>{p.text}</p>
                <a className="v10-ask-btn" href={whatsappLink(p.whatsapp as WhatsAppPerson)} target="_blank" rel="noopener">
                  {p.cta}
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
                  </svg>
                </a>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}
