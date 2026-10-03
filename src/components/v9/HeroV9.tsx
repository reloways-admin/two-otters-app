'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { isValidSiteUrl, normaliseSiteHost } from '@/lib/audit-intake';

/*
 * Two Otters v8 hero, with motion.
 * Visual language is the live site's, not a new one:
 *   navy #1d2332 ground + faint white dot grid (26px)
 *   acid green #5aff00, gradient #5aff00 → #2eb62c on the input border
 *   white pill input, green pill button inside it, navy text on green
 *   founders flank the input and are cut at the waist by the wave
 *   the "star" is the studio's own logo mark, not a stock icon
 */

type Founder = { name: string; role: string; src: string; alt: string };

const DEFAULT_FOUNDERS: [Founder, Founder] = [
  { name: 'אמיר שלו', role: 'מומחה UX ו-UI', src: '/v8-hero-amir.png', alt: 'אמיר שלו' },
  { name: 'קרן רייטלר', role: 'מומחית אסטרטגיה, סטוריטלינג ושפה מוצרית', src: '/v8-hero-keren.png', alt: 'קרן רייטלר' },
];

const NAVY = '#1d2332';
const ACID = '#5aff00';
const EASE = [0.22, 1, 0.36, 1] as const;

// The same wave path HeroV8 uses (viewBox 0 0 1920 196), so the cut matches the live page.
const WAVE_PATH =
  'M 0,0 L 40,2.7 L 80,5.4 L 120,8.1 L 160,10.8 L 200,13.5 L 240,16.2 L 280,17.9 ' +
  'L 320,19.6 L 360,21.2 L 400,22.8 L 440,24.4 L 480,26 L 520,27.6 L 560,29.2 L 600,30.8 ' +
  'L 640,32.4 L 680,34 L 720,35.4 L 760,36.4 L 800,37.4 L 840,37.4 L 880,38.4 L 920,39.4 ' +
  'L 960,39.4 L 1000,40.1 L 1040,40.4 L 1080,40.4 L 1120,40.4 L 1160,40.4 L 1200,40.4 ' +
  'L 1240,40.2 L 1280,39.5 L 1320,38.7 L 1360,37.9 L 1400,37.1 L 1440,36.4 L 1480,35.6 ' +
  'L 1520,34.8 L 1560,34.1 L 1600,33.3 L 1640,32.5 L 1680,31.8 L 1720,31 L 1760,30 ' +
  'L 1800,28.3 L 1840,26.6 L 1880,24.3 L 1920,23.2 L 1920,196 L 0,196 Z';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

type Status = 'idle' | 'loading' | 'error';

/** Where the audit flow looks for the address it is about to review (same key as HeroV8). */
const HERO_STORE_URL = 'twootters.audit.url';

/**
 * The studio mark, built on load: the right stroke grows bottom to top, the left
 * one top to bottom, and only then does the purple diamond grow out of its own centre.
 * The strokes are filled shapes, not lines, so each is revealed by a clip rect
 * that grows across it rather than by animating pathLength.
 */
function LogoMark({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, '');
  const draw = { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const };
  return (
    <svg viewBox="61 0 350 356" className={className} aria-hidden>
      <defs>
        {/* Right stroke spans y 67 → 356: the rect starts flat on the bottom edge and grows up */}
        <clipPath id={`${id}-r`}>
          <motion.rect
            x="200" width="220"
            initial={reduce ? false : { y: 356, height: 0 }}
            animate={{ y: 67, height: 289 }}
            transition={{ ...draw, delay: 0.15 }}
          />
        </clipPath>
        {/* Left stroke spans y 0 → 289: the rect starts flat on the top edge and grows down */}
        <clipPath id={`${id}-l`}>
          <motion.rect
            x="55" y="0" width="210"
            initial={reduce ? false : { height: 0 }}
            animate={{ height: 289 }}
            transition={{ ...draw, delay: 0.55 }}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-r)`}>
        <path fill={ACID} d="M274.278 67C297.337 117.285 348.117 152.212 407.058 152.212C408.395 152.212 409.729 152.192 411.058 152.156V187.692C411.038 187.697 411.019 187.7 411 187.704V202.009C410.501 202.004 410.001 202 409.5 202C385.686 202 363.217 207.761 343.411 217.965C296.845 241.956 265 290.509 265 346.5C265 349.692 265.105 352.86 265.309 356H213.052C213.018 354.504 213 353.004 213 351.5C213 276.523 255.644 211.506 318 179.379C318.521 179.11 319.044 178.845 319.568 178.581C290.401 165.55 266.292 143.232 251 115.387L274.278 67Z" />
      </g>
      <g clipPath={`url(#${id}-l)`}>
        <path fill={ACID} d="M259.006 0C259.04 1.49587 259.058 2.99592 259.058 4.5C259.058 79.4772 216.414 144.494 154.058 176.621C153.536 176.89 153.012 177.154 152.488 177.418C181.656 190.449 205.766 212.767 221.058 240.613L197.779 289C174.721 238.715 123.94 203.788 65 203.788C63.6624 203.788 62.329 203.808 61 203.844V168.308C61.0192 168.303 61.0384 168.299 61.0576 168.295V153.991C61.557 153.996 62.057 154 62.5576 154C86.3719 154 108.841 148.239 128.646 138.035C175.212 114.044 207.058 65.4907 207.058 9.5C207.058 6.30808 206.953 3.14041 206.749 0H259.006Z" />
      </g>
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
      >
        <path fill="#945EEE" d="M234.735 222C223.096 193.432 201.759 180.593 194 177.872C220.111 165.017 233.723 143.268 237.265 134C251.434 165.374 267.88 173.876 278 177.872C253.711 192.412 241.313 207.971 234.735 222Z" />
      </motion.g>
    </svg>
  );
}

function MagneticButton({ status }: { status: Status }) {
  const ref = useRef<HTMLButtonElement>(null);
  const spring = { stiffness: 260, damping: 16, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  // Kept small (max ~8px) so the button never leaves the pill it sits in.
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * 0.18)));
    y.set(Math.max(-4, Math.min(4, (e.clientY - (r.top + r.height / 2)) * 0.25)));
  };
  const reset = () => { x.set(0); y.set(0); };

  const busy = status === 'loading';

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={busy}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.93 }}
      className={[
        'relative flex h-11 min-w-[8.5rem] items-center justify-center gap-2 rounded-full px-[22px]',
        'bg-[#5aff00] text-[14px] font-bold text-[#1d2332] whitespace-nowrap',
        'transition-[filter] duration-200 hover:brightness-105',
        'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white',
        'max-sm:mt-3 max-sm:h-12 max-sm:w-full',
        busy ? 'cursor-default' : 'cursor-pointer',
      ].join(' ')}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === 'loading' ? (
          <motion.span key="loading" className="flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden>
              <path d="M21 12a9 9 0 1 1-6.22-8.56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            בודקים
          </motion.span>
        ) : (
          <motion.span key="idle"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            שלחו לבדיקה
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function Person({ founder, side, index }: { founder: Founder; side: 'left' | 'right'; index: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 170, damping: 18 });
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 170, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.75 + index * 0.15, ease: EASE }}
      className={[
        'relative m-0 h-[clamp(230px,46vw,380px)] self-end lg:h-[clamp(300px,28vw,540px)] lg:self-start',
        side === 'left' ? 'lg:justify-self-end' : 'lg:justify-self-start',
      ].join(' ')}
      style={{ perspective: 900 }}
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        whileHover={reduce ? undefined : { y: -12 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full"
      >
        <img
          src={founder.src}
          alt={founder.alt}
          draggable={false}
          className="block h-full w-auto max-w-none select-none"
        />
      </motion.div>
      <figcaption
        className={[
          'absolute bottom-[28%] z-[6] hidden w-[178px] text-[clamp(12px,0.9vw,15px)] leading-[1.4] text-white lg:block',
          side === 'left' ? 'left-full ml-3.5 text-left' : 'right-full mr-3.5 text-right',
        ].join(' ')}
        dir="rtl"
      >
        <strong className="mb-0.5 block font-bold">{founder.name}</strong>
        {founder.role}
      </figcaption>
    </motion.figure>
  );
}

export default function HeroV9({
  founders = DEFAULT_FOUNDERS,
}: { founders?: [Founder, Founder] }) {
  const reduce = useReducedMotion();
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [amir, keren] = founders;

  // Back from /audit, the browser can restore this page from its cache with the
  // button still spinning. Put it back to rest whenever the page is shown again.
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => { if (e.persisted) setStatus('idle'); };
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!isValidSiteUrl(url)) {
      setStatus('error');
      return;
    }
    // Same hand-off as HeroV8: land on the audit page with the address filled in,
    // not past it, because that page is where the offer is explained.
    setStatus('loading');
    const host = normaliseSiteHost(url);
    try {
      sessionStorage.setItem(HERO_STORE_URL, host);
    } catch {
      // Storage can be blocked; ?url= below carries it anyway.
    }
    window.location.href = `/audit?lang=he&url=${encodeURIComponent(host)}`;
  };

  return (
    <section
      dir="rtl"
      lang="he"
      className="relative isolate overflow-hidden px-5 pt-24 text-white sm:px-6 lg:pt-[168px]"
      style={{
        fontFamily: "'Google Sans', Arial, sans-serif",
        backgroundColor: NAVY,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)',
        backgroundSize: '26px 26px',
      }}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-[4] mx-auto max-w-[760px] text-center"
      >
        <div className="mx-auto mb-7 h-12 w-12">
          <LogoMark className="h-full w-full" />
        </div>

        <h1 className="m-0 font-bold leading-[1.05]">
          <motion.span variants={reveal} className="block text-[clamp(1.9rem,2.8vw,3.375rem)] text-white">
            הדרך הכי קצרה
          </motion.span>
          <motion.span
            variants={reveal}
            className="mt-1 block text-[clamp(3.2rem,5.85vw,7rem)] leading-none text-[#5aff00]"
          >
            מרעיון למוצר
          </motion.span>
        </h1>

        <motion.p
          variants={reveal}
          className="mx-auto mb-0 mt-[26px] text-[clamp(1rem,1.25vw,1.5rem)] leading-normal text-white"
        >
          מתחילים מפרוטוטייפ שאפשר ללחוץ עליו, להרגיש אותו ולשנות אותו.
          <br />
          <strong className="font-bold">רק כשזה מדויק - יוצאים לעיצוב ופיתוח</strong>
        </motion.p>
      </motion.div>

      {/* Input flanked by the two founders; they drop below it under 1024px.
          dir=ltr keeps the physical columns: Amir left, Keren right, as on the site. */}
      <div
        dir="ltr"
        className="relative z-[2] mx-auto mt-[34px] grid max-w-[560px] grid-cols-2 items-end gap-x-2 gap-y-[22px] lg:max-w-[1440px] lg:grid-cols-[1fr_min(560px,90vw)_1fr] lg:items-start lg:gap-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: EASE }}
          dir="rtl"
          className="relative z-[4] col-span-2 row-start-1 w-full lg:col-span-1 lg:col-start-2"
        >
          <form onSubmit={onSubmit} noValidate role="search">
            <motion.div
              whileHover={reduce ? undefined : { y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={[
                'relative flex items-center rounded-[70px] border-2 border-transparent p-1.5 max-sm:flex-col max-sm:rounded-[28px] max-sm:p-2',
                'transition-shadow duration-300',
                'shadow-[0_12px_30px_rgba(0,0,0,0.28)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.34)]',
                'focus-within:shadow-[0_0_0_4px_rgba(90,255,0,0.20),0_12px_30px_rgba(0,0,0,0.28)]',
              ].join(' ')}
              style={{
                backgroundImage:
                  status === 'error'
                    ? 'linear-gradient(#fff,#fff), linear-gradient(90deg,#ff8b80,#ff8b80)'
                    : 'linear-gradient(#fff,#fff), linear-gradient(90deg,#5aff00,#2eb62c)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <label htmlFor="site-url" className="sr-only">כתובת האתר שלכם</label>
              <input
                id="site-url"
                type="url"
                inputMode="url"
                autoComplete="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="העתיקו והדביקו את האתר שלכם כאן"
                aria-invalid={status === 'error' || undefined}
                aria-describedby="site-url-msg"
                className="h-11 w-full min-w-0 flex-1 bg-transparent px-5 text-start text-[15px] text-[#1d2332] outline-none placeholder:text-[#7a828f] max-sm:text-center"
              />
              <MagneticButton status={status} />
            </motion.div>
          </form>
          <p id="site-url-msg" aria-live="polite" className="m-0 mt-2.5 min-h-[21px] text-center text-[14px] leading-normal">
            {status === 'error' && (
              <span className="text-[#ff8b80]">זה לא נראה כמו כתובת אתר. אפשר להדביק את הכתובת המלאה מהדפדפן?</span>
            )}
          </p>
        </motion.div>

        <div className="row-start-2 flex justify-center lg:col-start-1 lg:row-start-1 lg:block lg:justify-self-end">
          <Person founder={amir} side="left" index={0} />
        </div>
        <div className="row-start-2 flex justify-center lg:col-start-3 lg:row-start-1 lg:block lg:justify-self-start">
          <Person founder={keren} side="right" index={1} />
        </div>
      </div>

      {/* Wave in front of the founders, cutting them at the waist into the white page below */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px z-[3] h-14 bg-white lg:h-[130px] lg:bg-transparent">
        <svg viewBox="0 0 1920 196" preserveAspectRatio="none" className="hidden h-full w-full lg:block">
          <path d={WAVE_PATH} fill="#fff" />
        </svg>
      </div>
    </section>
  );
}
