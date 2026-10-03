'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 footer, with motion.
 * Same language as FooterV8 on the live site:
 *   navy #1d2332 that continues the contact section's wave
 *   brand column (white logo + 14px tagline) | nav | contact, 2:1:1 on desktop, one column on phones
 *   column headings 15px bold at 50% white, links 14px white
 *   a 10% white hairline, then the 13px copyright and the two legal links
 * Motion: the columns rise in reading order (right to left), then the hairline draws
 * right to left and the bottom line settles. Links get an underline that grows from the right.
 */

type FooterLink = { label: string; href: string };

type FooterCopy = {
  tagline: string;
  navHeading: string;
  contactHeading: string;
  navLinks: FooterLink[];
  copyright: string;
  legal: { privacy: string; accessibility: string };
};

const FOOTER_DEFAULT_COPY: FooterCopy = {
  tagline: 'אפיון UX/UI ופרוטוטייפ עובד -\nבדיוק מה שהיה לכם בראש. רק מהר יותר.',
  navHeading: 'ניווט',
  contactHeading: 'בואו נדבר',
  navLinks: [
    { label: 'למה אנחנו', href: '#why' },
    { label: 'התהליך', href: '#process' },
    { label: 'המוצרים שלנו', href: '#offer' },
    { label: 'למי מתאים', href: '#who' },
    { label: 'עלינו', href: '#about' },
    { label: 'שאלות נפוצות', href: '#faq' },
  ],
  copyright: '© 2026 Two Otters Studio. כל הזכויות שמורות.',
  legal: { privacy: 'מדיניות פרטיות', accessibility: 'הצהרת נגישות' },
};

const FOOTER_CONTACT_LINKS: FooterLink[] = [
  { label: 'hello@two-otters.studio', href: 'mailto:hello@two-otters.studio' },
  { label: 'Instagram', href: 'https://www.instagram.com/two_otters.studio/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61594012627095' },
  // Same as the live site: still the generic linkedin.com landing page, not a studio profile.
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

/* The artifact is not served from the site, so the legal pages point at the live domain. */
const FOOTER_LEGAL_BASE = '';

const FOOTER_EASE = [0.22, 1, 0.36, 1] as const;
const FOOTER_BUILD = [0.65, 0, 0.35, 1] as const;

const footerCol: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: FOOTER_EASE } }),
};

/* Hover/focus: colour eases to 70% white (as live) and a 1px underline grows from the right. */
const FOOTER_LINK_CLASS =
  'rounded-[3px] bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:100%_100%] bg-no-repeat pb-0.5 text-[0.875rem] leading-[1.7] text-white no-underline transition-[color,background-size] duration-300 ease-out hover:bg-[length:100%_1px] hover:text-[rgba(255,255,255,0.7)] focus-visible:bg-[length:100%_1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5aff00]';

function FooterColumn({ heading, links, index, external }: { heading: string; links: FooterLink[]; index: number; external?: boolean }) {
  return (
    <motion.div variants={footerCol} custom={index} className="flex flex-col">
      <h2 className="m-0 mb-4 text-right text-[0.9375rem] font-bold text-[rgba(255,255,255,0.5)]">{heading}</h2>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={FOOTER_LINK_CLASS}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function FooterV9({
  copy = FOOTER_DEFAULT_COPY,
  hrefPrefix = '',
  logo = '/v8-logo-white.svg',
}: {
  copy?: FooterCopy;
  /** Sub-pages pass "/" so the hash links travel home first (as on the live site). */
  hrefPrefix?: string;
  logo?: string;
}) {
  const reduce = useReducedMotion();
  const taglineLines = copy.tagline.split('\n');
  const navLinks = copy.navLinks.map((l) => ({ ...l, href: `${hrefPrefix}${l.href}` }));

  return (
    <motion.footer
      dir="rtl"
      lang="he"
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative z-[1] bg-[#1d2332] px-10 pb-8 pt-16 text-white max-[600px]:px-5 max-[600px]:pb-6 max-[600px]:pt-12"
      style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
    >
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-[2fr_1fr_1fr] items-start gap-10 pb-2 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <motion.div variants={footerCol} custom={0} className="flex flex-col items-start gap-4">
          <img src={logo} alt="Two Otters Studio" draggable={false} className="block h-16 w-auto" />
          <p className="m-0 text-right text-[0.875rem] leading-[1.7] text-white">
            {taglineLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < taglineLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>

        <FooterColumn heading={copy.navHeading} links={navLinks} index={1} />
        <FooterColumn heading={copy.contactHeading} links={FOOTER_CONTACT_LINKS} index={2} external />
      </div>

      <div className="relative mx-auto mt-7 max-w-[1100px] pt-6 text-center text-[0.8125rem] text-[rgba(255,255,255,0.55)]">
        {/* Hairline, drawn right to left */}
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 block h-px origin-right bg-[rgba(255,255,255,0.1)]"
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 1.0, delay: 0.35, ease: FOOTER_BUILD } },
          }}
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.7, ease: FOOTER_EASE } },
          }}
        >
          <span>{copy.copyright}</span>
          <ul className="m-0 mt-2.5 flex list-none flex-wrap justify-center gap-5 p-0">
            <li>
              <a
                href={`${FOOTER_LEGAL_BASE}/privacy`}
                className="rounded-[3px] text-[rgba(255,255,255,0.8)] no-underline transition-colors duration-200 hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5aff00]"
              >
                {copy.legal.privacy}
              </a>
            </li>
            <li>
              <a
                href={`${FOOTER_LEGAL_BASE}/accessibility`}
                className="rounded-[3px] text-[rgba(255,255,255,0.8)] no-underline transition-colors duration-200 hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5aff00]"
              >
                {copy.legal.accessibility}
              </a>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.footer>
  );
}
