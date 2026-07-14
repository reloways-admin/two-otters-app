'use client'

import en from '@/locales/v6-en.json'

type WorkT = typeof en.work

const COVER_BG: Record<string, { bg: string; fg: string }> = {
  yellow: { bg: '#FFD166', fg: '#1a1407' },
  blue:   { bg: '#A8B5FD', fg: '#1E1B4B' },
  green:  { bg: '#3ECF7E', fg: '#04321c' },
  purple: { bg: '#5C3EEF', fg: '#ffffff' },
  soft:   { bg: '#EDE9FE', fg: '#7C5CED' },
}

function ProjectCard({ p }: { p: WorkT['projects'][0] }) {
  const cover = COVER_BG[p.color] ?? COVER_BG.soft
  const isLink = !!p.href
  return (
    <div className={`v6-work-card${isLink ? '' : ' v6-work-card--soon'}`}>
      <div
        className="v6-work-cover"
        style={p.image ? undefined : { background: cover.bg, color: cover.fg }}
      >
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title} className="v6-work-cover-img" />
        ) : (
          p.coverLabel && <span className="v6-work-cover-label">{p.coverLabel}</span>
        )}
      </div>
      <div className="v6-work-info">
        <h3 className="v6-work-title">{p.title}</h3>
        <p className="v6-work-tagline">{p.tagline}</p>
        {p.tags && <span className="v6-work-tags">{p.tags}</span>}
      </div>
    </div>
  )
}

export default function WorkV6({ t, lang = 'he' }: { t: WorkT; lang?: 'en' | 'he' }) {
  return (
    <section className="v6-work" id="work">
      <div className="v6-container">
        <h2 className="v6-section-heading" style={{ marginBottom: 12 }}>
          <span className="bold">{t.heading}</span>
        </h2>
        <p className="v6-work-sub">{t.sub}</p>

        <div className="v6-work-grid">
          {t.projects.map((p, i) =>
            p.href ? (
              <a key={i} href={`${p.href}?lang=${lang}`} className="v6-work-link" aria-label={p.title}>
                <ProjectCard p={p} />
              </a>
            ) : (
              <ProjectCard key={i} p={p} />
            )
          )}
        </div>
      </div>
    </section>
  )
}
