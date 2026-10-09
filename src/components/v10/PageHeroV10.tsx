import type { ReactNode } from 'react'

/**
 * The short navy hero that opens every inner v10 page: two-tone title, an
 * optional line under it, and the v8 wave into the white page below. The
 * homepage and the service pages have their own heroes; everything else
 * starts here.
 */
export default function PageHeroV10({ top, accent, desc, crumb, children, className = '' }: {
  top: string
  accent: string
  desc?: ReactNode
  crumb?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={`v8-hero v10-hero-sm ${className}`.trim()}>
      <div className="v8-hero-copy">
        {crumb && <span className="v10-crumb">{crumb}</span>}
        <h1 className="v8-hero-title">
          <span className="v8-hero-title-top">{top}</span>
          <span className="v8-hero-title-accent">{accent}</span>
        </h1>
        {desc && <p className="v8-hero-desc">{desc}</p>}
        {children}
      </div>
      <div className="v8-hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1920 196" preserveAspectRatio="none"><path d="M0,0 L480,26 L960,39.4 L1200,40.4 L1440,36.4 L1920,23.2 L1920,196 L0,196 Z" /></svg>
      </div>
    </section>
  )
}
