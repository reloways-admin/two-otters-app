'use client'

import en from '@/locales/v8-en.json'

type TestimonialsT = typeof en.testimonials
type Item = TestimonialsT['items'][number]

const AV_COLORS = ['#A8B5FD', '#FFD166', '#3ECF7E', '#F4736E', '#7C5CED']
const COLUMN_COUNT = 3

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
}

// Distribute items into balanced stacked columns (masonry), so cards pack
// vertically instead of leaving a short card's column empty below it.
function toColumns(items: Item[], count: number): { item: Item; i: number }[][] {
  const columns: { item: Item; i: number }[][] = Array.from({ length: count }, () => [])
  const heights = new Array(count).fill(0)
  items.forEach((item, i) => {
    const est = item.quote.length + 120 // rough height proxy (quote length + header)
    let target = 0
    for (let c = 1; c < count; c++) if (heights[c] < heights[target]) target = c
    columns[target].push({ item, i })
    heights[target] += est
  })
  return columns
}

function TCard({ item, i }: { item: Item; i: number }) {
  const photo = (item as { photo?: string }).photo
  return (
    <article className="v8-tcard">
      <header className="v8-tcard-head">
        <span
          className="v8-tcard-avatar"
          style={photo ? undefined : { background: AV_COLORS[i % AV_COLORS.length] }}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={item.name} />
          ) : (
            initials(item.name)
          )}
        </span>
        <span className="v8-tcard-meta">
          <span className="v8-tcard-name">{item.name}</span>
          <span className="v8-tcard-role">{item.role}</span>
        </span>
      </header>
      {item.quote.split('\n\n').map((para, j) =>
        para.trim() === '---' ? (
          <hr key={j} className="v8-tcard-divider" />
        ) : (
          <p key={j} className="v8-tcard-quote">{para}</p>
        )
      )}
    </article>
  )
}

export default function TestimonialsV8({ t }: { t: TestimonialsT }) {
  const columns = toColumns(t.items, COLUMN_COUNT)
  return (
    <section className="v8-testimonials">
      <div className="v8-container">
        <h2 className="v8-testimonials-title">{t.title}</h2>
        <div className="v8-t-stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <div className="v8-t-masonry">
          {columns.map((col, ci) => (
            <div key={ci} className="v8-t-col">
              {col.map(({ item, i }) => (
                <TCard key={i} item={item} i={i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
