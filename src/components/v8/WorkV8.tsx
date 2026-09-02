'use client'

import en from '@/locales/v8-en.json'

type WorkT = typeof en.work
type Project = WorkT['projects'][0] & { hidden?: boolean }

// Subtle per-project accent — just a tinted client-type chip + tag colour.
// Keeps the section on-brand without flooding the cards with colour.
const ACCENT: Record<string, { solid: string; soft: string }> = {
  yellow: { solid: '#B8860B', soft: '#FBF0D0' },
  purple: { solid: '#5C3EEF', soft: '#EBE6FE' },
  green:  { solid: '#12904C', soft: '#DFF6EA' },
  blue:   { solid: '#4256D0', soft: '#E7ECFD' },
  soft:   { solid: '#7C5CED', soft: '#F1ECFE' },
}

function ProjectCard({ p, view, lang }: { p: Project; view: string; lang: 'en' | 'he' }) {
  const acc = ACCENT[p.color] ?? ACCENT.soft

  const inner = (
    <>
      <div className="v8-work-cover">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title} className="v8-work-cover-img" />
        ) : (
          p.coverLabel && <span className="v8-work-cover-label">{p.coverLabel}</span>
        )}
        <span className="v8-work-view" aria-hidden="true">
          {view}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="v8-work-info">
        {p.subtitle && <span className="v8-work-kicker">{p.subtitle}</span>}
        <h3 className="v8-work-title">{p.title}</h3>
        <p className="v8-work-tagline">{p.tagline}</p>
        {p.tags && <p className="v8-work-tags">{p.tags}</p>}
      </div>
    </>
  )

  const style = { ['--acc' as string]: acc.solid, ['--acc-soft' as string]: acc.soft }

  return p.href ? (
    <a href={`${p.href}?lang=${lang}`} className="v8-work-card" style={style} aria-label={p.title}>
      {inner}
    </a>
  ) : (
    <div className="v8-work-card v8-work-card--soon" style={style}>{inner}</div>
  )
}

export default function WorkV8({ t, lang = 'he' }: { t: WorkT; lang?: 'en' | 'he' }) {
  const projects = (t.projects as Project[]).filter((p) => !p.hidden)

  return (
    <section className="v8-work" id="work">
      <div className="v8-container">
        <h2 className="v8-section-heading" style={{ marginBottom: 12 }}>
          <span className="bold">{t.heading}</span>
        </h2>
        <p className="v8-work-sub">{t.sub}</p>

        <div className="v8-work-grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} view={t.view} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
