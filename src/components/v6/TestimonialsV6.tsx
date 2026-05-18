'use client'

import en from '@/locales/v6-en.json'

type TestimonialsT = typeof en.testimonials

const COLORS = ['blue', 'yellow', 'green', 'peach', 'purple']

export default function TestimonialsV6({ t }: { t: TestimonialsT }) {
  return (
    <section className="v6-testimonials">
      <h2 className="v6-testimonials-title">{t.title}</h2>
      <div className="v6-t-track">
        {t.items.map((item, i) => (
          <div key={i} className={`v6-tcard ${COLORS[i % COLORS.length]}`}>
            <div className="v6-tcard-quote">{item.quote}</div>
            <div className="v6-tcard-author">
              <div className="v6-tcard-avatar">{item.avatar}</div>
              <div>
                <div className="v6-tcard-name">{item.name}</div>
                <div className="v6-tcard-role">{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
