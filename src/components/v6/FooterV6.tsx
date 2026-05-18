'use client'

import en from '@/locales/v6-en.json'

type FooterT = typeof en.footer

const CONTACT_LINKS = [
  { label: 'hello@twootters.studio', href: 'mailto:hello@twootters.studio' },
  { label: 'Instagram',              href: 'https://instagram.com' },
  { label: 'LinkedIn',               href: 'https://linkedin.com' },
]

export default function FooterV6({ t }: { t: FooterT }) {
  const taglineLines = t.tagline.split('\n')

  return (
    <footer className="v6-footer">
      <div className="v6-container v6-footer-inner">

        <div className="v6-footer-brand">
          <div className="v6-footer-brand-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Two Otters Studio" className="v6-footer-logo" />
          </div>
          <p className="v6-footer-tagline">
            {taglineLines.map((line, i) => (
              <span key={i}>{line}{i < taglineLines.length - 1 && <br />}</span>
            ))}
          </p>
        </div>

        <div className="v6-footer-col">
          <h4 className="v6-footer-col-heading">{t.navHeading}</h4>
          <ul className="v6-footer-list">
            {t.navLinks.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="v6-footer-col">
          <h4 className="v6-footer-col-heading">{t.contactHeading}</h4>
          <ul className="v6-footer-list">
            {CONTACT_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="v6-footer-bottom">
        <span>{t.copyright}</span>
      </div>
    </footer>
  )
}
