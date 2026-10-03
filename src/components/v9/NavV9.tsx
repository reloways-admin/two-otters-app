'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 nav, with motion.
 * Same language as NavV8 on the live site:
 *   fixed, transparent with the white logo over the navy hero (32px 40px padding)
 *   once scrolled: white 92% + blur, dark logo, 12px padding, hairline shadow
 *   a white pill of links in the middle (#1E1B4B, hover #EDE9FE), flag + green "דברו איתנו" on the left
 *   <=1150px: hamburger on the right, the mark alone centred, a full-screen white menu
 * Motion: the bar slides down once on load; the scrolled state cross-fades the two
 * logos and eases the padding; the hover tint glides between links instead of blinking.
 */

type NavLink = { label: string; href: string };

const NAV_DEFAULT_LINKS: NavLink[] = [
  { label: 'למה אנחנו', href: '#process' },
  { label: 'שיטת הספירלה', href: '#spiral' },
  { label: 'המוצרים שלנו', href: '#offer' },
  { label: 'למי מתאים', href: '#who' },
  { label: 'עלינו', href: '#about' },
  { label: 'שאלות', href: '#faq' },
];

const NAV_EASE = [0.22, 1, 0.36, 1] as const;

const navDrawerList: Variants = {
  hidden: { transition: { staggerChildren: 0 } },
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.09 } },
};
const navDrawerItem: Variants = {
  hidden: { opacity: 0, y: 16, transition: { duration: 0.15 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.44, ease: NAV_EASE } },
};

/** Both logo states are stacked and cross-faded, so the swap on scroll never pops. */
function NavLogo({ dark, href }: { dark: boolean; href: string }) {
  const fade = 'absolute inset-0 transition-opacity duration-300';
  return (
    <a
      href={href}
      aria-label="The Two Otters Studio"
      className="relative block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5aff00] max-[1150px]:absolute max-[1150px]:left-1/2 max-[1150px]:top-1/2 max-[1150px]:-translate-x-1/2 max-[1150px]:-translate-y-1/2"
    >
      {/* Desktop: full logo with the wordmark */}
      <span
        className={[
          'relative hidden aspect-[486/465] transition-[height] duration-300 min-[1151px]:block',
          dark ? 'h-[44px]' : 'h-[80px]',
        ].join(' ')}
      >
        <img src="/v8-logo-white.svg" alt="" className={`${fade} h-full w-auto ${dark ? 'opacity-0' : 'opacity-100'}`} />
        <img src="/v8-logo-dark.svg" alt="" className={`${fade} h-full w-auto ${dark ? 'opacity-100' : 'opacity-0'}`} />
      </span>
      {/* <=1150px: the mark alone; the wordmark is unreadable at this size */}
      <span
        className={[
          'relative block aspect-[350/356] transition-[height] duration-300 min-[1151px]:hidden',
          dark ? 'h-[34px] max-[600px]:h-[30px]' : 'h-[40px] max-[600px]:h-[34px]',
        ].join(' ')}
      >
        <img src="/v8-logo-mark.svg" alt="" className={`${fade} h-full w-auto ${dark ? 'opacity-0' : 'opacity-100'}`} />
        <img src="/v8-logo-mark-dark.svg" alt="" className={`${fade} h-full w-auto ${dark ? 'opacity-100' : 'opacity-0'}`} />
      </span>
    </a>
  );
}

function NavHamburger({ open, dark, onToggle, controls }: { open: boolean; dark: boolean; onToggle: () => void; controls: string }) {
  const bar = [
    'block h-[2px] w-[22px] rounded-[2px] transition-[transform,opacity,background-color] duration-[250ms]',
    open || dark ? 'bg-[#1E1B4B]' : 'bg-white',
  ].join(' ');
  return (
    <button
      type="button"
      aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className="hidden h-9 w-9 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg border-0 bg-transparent p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5aff00] max-[1150px]:flex"
    >
      <span className={`${bar} ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`${bar} ${open ? 'opacity-0' : ''}`} />
      <span className={`${bar} ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </button>
  );
}

/** The link pill. The hover tint is one shared element that slides to whichever link is hovered or focused. */
function NavPill({ links, hrefPrefix }: { links: NavLink[]; hrefPrefix: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  return (
    <ul
      className="m-0 flex list-none items-center gap-1 rounded-full bg-white px-4 py-[10px] max-[1150px]:hidden"
      onPointerLeave={() => setHovered(null)}
    >
      {links.map((l) => (
        <li key={l.href} className="relative">
          {hovered === l.href && (
            <motion.span
              layoutId="nav-pill-hover"
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#EDE9FE]"
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 40 }}
            />
          )}
          <a
            href={`${hrefPrefix}${l.href}`}
            onPointerEnter={() => setHovered(l.href)}
            onFocus={() => setHovered(l.href)}
            onBlur={() => setHovered(null)}
            className="relative block whitespace-nowrap rounded-full px-[14px] py-1.5 text-[0.875rem] font-medium text-[#1E1B4B] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#5C3EEF]"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function NavDrawerArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NavV9({
  links = NAV_DEFAULT_LINKS,
  cta = 'דברו איתנו',
  ctaHref = '#contact',
  hrefPrefix = '',
  onLangChange,
}: {
  links?: NavLink[];
  cta?: string;
  ctaHref?: string;
  hrefPrefix?: string;
  /** The page is Hebrew only here; wire this to switch to English where that exists. */
  onLangChange?: (lang: 'en') => void;
}) {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerId = useId().replace(/:/g, '') + '-nav-drawer';
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the full-screen menu; Escape closes it; widening past the
  // breakpoint closes it too, since the menu does not exist on desktop.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.querySelector('button')?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 1151px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const dark = scrolled || open;
  const close = () => setOpen(false);

  return (
    <header dir="rtl" lang="he" style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}>
      <motion.nav
        aria-label="ניווט ראשי"
        initial={reduce ? false : { y: '-100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: NAV_EASE, delay: 0.1 }}
        className={[
          'fixed inset-x-0 top-0 z-[100] transition-[padding,background-color,box-shadow,border-color] duration-300',
          'border-b',
          open
            ? 'border-[#E5E7EB] bg-white shadow-none'
            : scrolled
              ? 'border-transparent bg-white/[0.92] shadow-[0_1px_16px_rgba(0,0,0,0.08)] backdrop-blur-[12px]'
              : 'border-transparent bg-transparent',
          scrolled || open
            ? 'px-10 py-3 max-[1150px]:px-7 max-[1150px]:py-4 max-[600px]:px-5 max-[600px]:py-[14px]'
            : 'px-10 py-8 max-[1150px]:px-7 max-[1150px]:py-4 max-[600px]:px-5 max-[600px]:py-[14px]',
        ].join(' ')}
      >
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center max-[1150px]:flex max-[1150px]:justify-between">
          {/* Right: logo + hamburger (first in DOM = right in RTL) */}
          <div ref={toggleRef} className="flex items-center gap-3 justify-self-start">
            <NavLogo dark={dark} href={`${hrefPrefix}#`} />
            <NavHamburger open={open} dark={dark} onToggle={() => setOpen((o) => !o)} controls={drawerId} />
          </div>

          {/* Centre: the link pill */}
          <NavPill links={links} hrefPrefix={hrefPrefix} />

          {/* Left: language + CTA */}
          <div className="flex items-center gap-[14px] justify-self-end">
            <button
              type="button"
              aria-label="Switch to English"
              lang="en"
              onClick={() => onLangChange?.('en')}
              className="flex cursor-pointer items-center justify-center rounded-full border-0 bg-transparent px-[10px] py-1.5 leading-none transition-colors duration-200 hover:bg-[#EDE9FE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5aff00]"
            >
              <img src="/language-english.svg" alt="" width={28} height={28} className="block rounded-[3px]" />
            </button>
            <a
              href={`${hrefPrefix}${ctaHref}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#5aff00] px-7 py-3 text-[0.9375rem] font-bold leading-[1.4] text-[#1d2332] no-underline transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#4de000] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5C3EEF] max-[1150px]:hidden"
            >
              {cta}
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen menu (<=1150px only) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 0.26 }, scale: { duration: 0.42, ease: NAV_EASE } } }}
            exit={{ opacity: 0, scale: reduce ? 1 : 1.03, transition: { opacity: { duration: 0.26 }, scale: { duration: 0.38, ease: NAV_EASE } } }}
            className="fixed inset-0 z-[99] flex flex-col overflow-hidden bg-white px-7 pb-12 pt-[110px] min-[1151px]:hidden"
          >
            <motion.ul
              variants={reduce ? undefined : navDrawerList}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="m-0 flex min-h-0 flex-1 list-none flex-col items-stretch gap-0.5 overflow-y-auto p-0"
            >
              {links.map((l) => (
                <motion.li key={l.href} variants={reduce ? undefined : navDrawerItem}>
                  <a
                    href={`${hrefPrefix}${l.href}`}
                    onClick={close}
                    className="block w-full rounded-[20px] px-4 py-3 text-start text-[1.5rem] font-bold leading-[1.25] text-[#1E1B4B] no-underline transition-colors duration-200 hover:bg-[#EDE9FE] focus-visible:bg-[#EDE9FE] focus-visible:outline-none"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              {/* The CTA rides the same stagger, last, but sits pinned to the floor of the panel */}
              <motion.li variants={reduce ? undefined : navDrawerItem} className="mt-auto shrink-0 pt-5">
                <a
                  href={`${hrefPrefix}${ctaHref}`}
                  onClick={close}
                  className="flex w-full items-center justify-between gap-4 rounded-full bg-[#5aff00] py-[14px] pe-[14px] ps-[22px] text-start text-[1.125rem] font-bold text-[#0b0b0b] no-underline transition-colors duration-200 hover:bg-[#4ee600] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5C3EEF]"
                >
                  <span>{cta}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0b0b0b]" aria-hidden>
                    <NavDrawerArrow />
                  </span>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
