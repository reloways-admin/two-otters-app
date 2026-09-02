'use client'

import en from '@/locales/v8-en.json'

type FooterT = typeof en.footer

const CONTACT_LINKS = [
  { label: 'hello@two-otters.studio', href: 'mailto:hello@two-otters.studio' },
  { label: 'Instagram',              href: 'https://instagram.com' },
  { label: 'LinkedIn',               href: 'https://linkedin.com' },
]

export default function FooterV8({ t }: { t: FooterT }) {
  const taglineLines = t.tagline.split('\n')

  return (
    <footer className="v8-footer">
      <div className="v8-container v8-footer-inner">

        <div className="v8-footer-brand">
          <div className="v8-footer-brand-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/v8-logo-white.svg" alt="Two Otters Studio" className="v8-footer-logo" />
          </div>
          <p className="v8-footer-tagline">
            {taglineLines.map((line, i) => (
              <span key={i}>{line}{i < taglineLines.length - 1 && <br />}</span>
            ))}
          </p>
        </div>

        <div className="v8-footer-col">
          <h4 className="v8-footer-col-heading">{t.navHeading}</h4>
          <ul className="v8-footer-list">
            {t.navLinks.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="v8-footer-col">
          <h4 className="v8-footer-col-heading">{t.contactHeading}</h4>
          <ul className="v8-footer-list">
            {CONTACT_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="v8-footer-bottom">
        <span>{t.copyright}</span>
      </div>
    </footer>
  )
}
