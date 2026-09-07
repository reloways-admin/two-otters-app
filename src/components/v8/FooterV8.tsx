'use client'

import en from '@/locales/v8-en.json'

type FooterT = typeof en.footer

const CONTACT_LINKS = [
  { label: 'hello@two-otters.studio', href: 'mailto:hello@two-otters.studio' },
  { label: 'Instagram',              href: 'https://www.instagram.com/two_otters.studio/' },
  { label: 'Facebook',               href: 'https://www.facebook.com/profile.php?id=61594012627095' },
  // TODO: still the generic linkedin.com landing page, not a studio profile.
  { label: 'LinkedIn',               href: 'https://linkedin.com' },
]

/**
 * `hrefPrefix` is what makes this footer usable off the homepage. The nav links
 * are bare hashes (#offer, #faq), which resolve against whatever page is open —
 * on /accessibility or /work/the5ers they pointed at anchors that do not exist
 * there and did nothing. Sub-pages pass "/" (optionally with ?lang=) so the
 * links travel home first. The homepage passes nothing and keeps bare hashes,
 * which scroll without a navigation.
 */
export default function FooterV8({ t, hrefPrefix = '' }: { t: FooterT; hrefPrefix?: string }) {
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
              <li key={l.href}><a href={`${hrefPrefix}${l.href}`}>{l.label}</a></li>
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
        {/* Both are required to be reachable from every page: Meta wants a public
            privacy-policy URL for the business page, and the accessibility
            regulations expect the statement to be linked site-wide. */}
        <ul className="v8-footer-legal">
          <li><a href="/privacy">{t.legal.privacy}</a></li>
          <li><a href="/accessibility">{t.legal.accessibility}</a></li>
        </ul>
      </div>
    </footer>
  )
}
