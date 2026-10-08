import he from '@/locales/v10-he.json'
import { ROUTES, link } from './routes'
import ArrowLeftV10 from './ArrowLeftV10'

type FooterT = typeof he.footer

const ICONS = [
  {
    label: 'hello@two-otters.studio',
    href: 'mailto:hello@two-otters.studio',
    path: <><rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/two_otters.studio/',
    path: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" /></>,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61594012627095',
    path: <path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />,
  },
  // LinkedIn is left out until there is a studio profile to point at — the v8
  // footer's link still goes to linkedin.com itself.
]

/** Keren's footer: an Audit strip on top, the link columns, then icon links. */
export default function FooterV10({ t }: { t: FooterT }) {
  const tagline = t.tagline.split('\n')
  return (
    <footer className="v8-footer">
      <div className="v8-container v10-foot-audit">
        <span className="v10-tool-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="5" width="26" height="34" rx="4" /><path d="M14 14h14M14 21h9" /><circle cx="31" cy="30" r="8" fill="#5aff00" /><path d="M37 36l6 6" /><path d="M28 30.5l2 2 4-4.5" />
          </svg>
        </span>
        <div className="v10-foot-audit-copy"><b>{t.auditTitle}</b><span>{t.auditText}</span></div>
        <a className="v10-tool-cta" href={ROUTES.audit}>{t.auditCta} <ArrowLeftV10 size={18} /></a>
      </div>

      <div className="v8-container v8-footer-inner">
        <div className="v8-footer-brand">
          <div className="v8-footer-brand-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/v8-logo-white.svg" alt="Two Otters Studio" className="v8-footer-logo" />
          </div>
          <p className="v8-footer-tagline">
            {tagline.map((line, i) => <span key={i}>{line}{i < tagline.length - 1 && <br />}</span>)}
          </p>
        </div>
        <div className="v8-footer-col">
          <h4 className="v8-footer-col-heading">{t.studioHeading}</h4>
          <ul className="v8-footer-list">
            {t.studioLinks.map(l => <li key={l.label}><a href={link(l.to)}>{l.label}</a></li>)}
          </ul>
        </div>
        <div className="v8-footer-col">
          <h4 className="v8-footer-col-heading">{t.partnersHeading}</h4>
          <ul className="v8-footer-list">
            {t.partnersLinks.map(l => <li key={l.label}><a href={link(l.to)}>{l.label}</a></li>)}
          </ul>
        </div>
      </div>

      <div className="v8-container v10-foot-talk">
        <h4 className="v10-foot-talk-title">{t.talkTitle}</h4>
        <div className="v10-foot-icons">
          {ICONS.map(i => (
            <a
              key={i.label}
              href={i.href}
              aria-label={i.label}
              title={i.label}
              {...(i.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">{i.path}</svg>
            </a>
          ))}
        </div>
      </div>

      <div className="v8-footer-bottom">
        <span>{t.copyright}</span>
        <ul className="v8-footer-legal">
          <li><a href={ROUTES.privacy}>{t.legal.privacy}</a></li>
          <li><a href={ROUTES.accessibility}>{t.legal.accessibility}</a></li>
        </ul>
      </div>
    </footer>
  )
}
