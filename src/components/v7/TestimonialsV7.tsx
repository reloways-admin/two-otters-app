'use client'

import en from '@/locales/v7-en.json'

type TestimonialsT = typeof en.testimonials

const AV_COLORS = ['#A8B5FD', '#FFD166', '#3ECF7E', '#F4736E', '#7C5CED']

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
}

export default function TestimonialsV7({ t }: { t: TestimonialsT }) {
  return (
    <section className="v7-testimonials">
      <div className="v7-container">
        <h2 className="v7-testimonials-title">{t.title}</h2>
        <div className="v7-t-stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <div className="v7-t-masonry">
          {t.items.map((item, i) => {
            const photo = (item as { photo?: string }).photo
            return (
              <article key={i} className="v7-tcard">
                <header className="v7-tcard-head">
                  <span
                    className="v7-tcard-avatar"
                    style={photo ? undefined : { background: AV_COLORS[i % AV_COLORS.length] }}
                  >
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo} alt={item.name} />
                    ) : (
                      initials(item.name)
                    )}
                  </span>
                  <span className="v7-tcard-meta">
                    <span className="v7-tcard-name">{item.name}</span>
                    <span className="v7-tcard-role">{item.role}</span>
                  </span>
                </header>
                {item.quote.split('\n\n').map((para, j) => (
                  <p key={j} className="v7-tcard-quote">{para}</p>
                ))}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
