'use client'

const NAV_LINKS = [
  { label: 'למה אנחנו',     href: '#why' },
  { label: 'התהליך',        href: '#process' },
  { label: 'המוצרים שלנו', href: '#offer' },
  { label: 'למי מתאים',    href: '#who' },
  { label: 'עלינו',         href: '#about' },
  { label: 'שאלות נפוצות', href: '#faq' },
]

const CONTACT_LINKS = [
  { label: 'hello@twootters.studio', href: 'mailto:hello@twootters.studio' },
  { label: 'Instagram',              href: 'https://instagram.com' },
  { label: 'LinkedIn',               href: 'https://linkedin.com' },
]

export default function FooterV6() {
  return (
    <footer className="v6-footer">
      <div className="v6-container v6-footer-inner">

        {/* Brand col — first in DOM = rightmost in RTL */}
        <div className="v6-footer-brand">
          <div className="v6-footer-brand-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Two Otters Studio" className="v6-footer-logo" />
          </div>
          <p className="v6-footer-tagline">
            אפיון UX/UI ופרוטוטייפ עובד —<br />בדיוק מה שהיה לכם בראש. רק מהר יותר.
          </p>
        </div>

        {/* Nav col */}
        <div className="v6-footer-col">
          <h4 className="v6-footer-col-heading">ניווט</h4>
          <ul className="v6-footer-list">
            {NAV_LINKS.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact col — last in DOM = leftmost in RTL */}
        <div className="v6-footer-col">
          <h4 className="v6-footer-col-heading">בואו נדבר</h4>
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
        <span>© 2026 Two Otters Studio. כל הזכויות שמורות.</span>
      </div>
    </footer>
  )
}
