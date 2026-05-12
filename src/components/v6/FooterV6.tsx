'use client'

import Image from 'next/image'

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
      <div className="v6-footer-grid">
        {/* Brand */}
        <div className="v6-footer-brand">
          <div className="v6-footer-logo">
            <Image src="/logo.png" alt="The Two Otters Studio" width={72} height={72} />
          </div>
          <p className="v6-footer-tagline">
            אפיון UX/UI ופרוטוטייפ עובד — בדיוק מה שהיה לכם בראש. רק מהר יותר.
          </p>
        </div>

        {/* Nav */}
        <div className="v6-footer-col">
          <h4>ניווט</h4>
          <ul className="v6-footer-links">
            {NAV_LINKS.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="v6-footer-col">
          <h4>בואו נדבר</h4>
          <ul className="v6-footer-links">
            {CONTACT_LINKS.map(l => (
              <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="v6-footer-bottom">
        © 2026 Two Otters Studio. כל הזכויות שמורות. 🦦
      </div>
    </footer>
  )
}
