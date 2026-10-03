'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 "what we offer" section, with motion.
 * Same language as WhatWeOfferV8 on the live site:
 *   white ground, heading with the tilted purple "אז" badge (Anton, sharp corners)
 *   pill filter chips with a 2px #020202 border that invert to navy on hover
 *   navy #1d2332 cards, 3px #020202 border, radius 40 (28 on mobile)
 *   each card owns one accent (green, yellow, cyan, orange) for its CTA and tags
 *   the illustration overhangs the card top, on the left; text on the right
 * Motion: the badge is built right to left, then each card's illustration
 * builds up out of the card's top edge, the tag hairline draws right to left
 * and the tags join in reading order.
 */

type OfferCardData = {
  id: string;
  accent: string;
  img: string;
  anchorLabel: string;
  title: string;
  subtitle?: string;
  timing: string;
  desc: string;
  imageAlt: string;
  tags: string[];
  cta: string;
};

const OFFER_DEFAULT_HEADING = 'אז... מה בא לכם שנעשה יחד?';

const OFFER_DEFAULT_CARDS: OfferCardData[] = [
  {
    id: 'offer-mvp',
    accent: '#5aff00',
    img: '/offer-illus-1-fast.svg',
    anchorLabel: 'מרעיון למוצר',
    title: 'מרעיון למוצר\nבמהירות הבזק',
    subtitle: 'מתחילים ומסיימים בספרינט',
    timing: 'עד 6 שבועות',
    desc: 'מתחילים מהאסטרטגיה. עוברים לאיפיון. מגיעים לפרוטוטייפ עובד שאפשר ללחוץ עליו, להרגיש אותו ולשנות אותו. יוצאים עם הכל מאושר, מתועד ומוכן לשלב הבא.',
    imageAlt: 'מרעיון למוצר - אילוסטרציה',
    tags: ['אסטרטגיה', 'חווית משתמש', 'יצירת פרוטוטייפ עובד'],
    cta: 'בואו נתחיל ספרינט',
  },
  {
    id: 'offer-upgrade',
    accent: '#f8f800',
    img: '/offer-illus-2-upgrade.svg',
    anchorLabel: 'שדרוג אתר',
    title: 'לשדרג את האתר הקיים',
    timing: '4-6 חודשים',
    desc: 'האתר הישן לא מייצג אתכם יותר. הגיע הזמן לקחת את האתר כמה רמות למעלה כדי שיתאים למטרות העסקיות, יחזק את המוניטין ויתמוך בגדילה שלכם.\n\nואם תרצו להשאיר אבק לתחרות... בזה אנחנו הכי טובים :)',
    imageAlt: 'לשדרג את האתר הקיים - אילוסטרציה',
    tags: ['אסטרטגיית מותג', 'חווית משתמש', 'מיתוג טרמינולוגי', 'שפה עיצובית', 'סטוריטלינג'],
    cta: 'בואו נשדרג את האתר',
  },
  {
    id: 'offer-marketing',
    accent: '#61fff2',
    img: '/offer-illus-3-marketing.svg',
    anchorLabel: 'תשתית שיווקית',
    title: 'תשתית שיווקית\nשכל עסק צריך',
    timing: '1-2 חודשי הקמה',
    desc: 'אפשר לעבוד קשה, אנחנו מעדיפים לעבוד חכם 😜\n\nבונים לכם מסעות לקוח, אוטומציות ודשבורדים שמחליפים את העבודה הידנית.\n\nכדי שתוכלו סוף סוף לראות מה עובד וכמובן לקצור את הפירות...',
    imageAlt: 'תשתית שיווקית - אילוסטרציה',
    tags: ['מסעות לקוח', 'דאשבורד נתונים', 'הגדלת קהילה', 'הגדלת מכירות', 'חיבור מערכות', 'אוטומציה'],
    cta: 'בואו נבנה תשתית',
  },
  {
    id: 'offer-newsite',
    accent: '#ff6d2c',
    img: '/offer-illus-4-new-brand.svg',
    anchorLabel: 'אתר למותג חדש',
    title: 'אתר למותג\nחדש דנדש',
    timing: '4-6 חודשים',
    desc: 'המותג שלכם צריך אתר שיגרום לכם להיות זכירים ויניע לפעולה...\nאהבנו את האתגר! בונים לכם אתר מהאסטרטגיה ועד הפיקסל האחרון! מהיר, מדויק, מוכן לאוויר.\n\nאם כבר אתר, אז אצל הלוטרות.\nכי הרושם הראשוני לא מגיע פעמיים :)',
    imageAlt: 'אתר למותג חדש - אילוסטרציה',
    tags: ['אסטרטגיית מותג', 'חווית משתמש', 'מיתוג טרמינולוגי', 'שפה עיצובית', 'סטוריטלינג'],
    cta: 'בואו נבנה אתר חדש',
  },
];

const OFFER_EASE = [0.22, 1, 0.36, 1] as const;
const OFFER_BUILD = [0.65, 0, 0.35, 1] as const;

const offerRise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: OFFER_EASE } },
};

function OfferCard({ card }: { card: OfferCardData }) {
  const reduce = useReducedMotion();
  const titleLines = card.title.split('\n');
  const descParts = card.desc.split('\n\n');

  return (
    <motion.article
      id={card.id}
      aria-labelledby={`${card.id}-title`}
      // One trigger for the whole card; the illustration, hairline and tags follow through variants.
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: OFFER_EASE } },
      }}
      className="group relative flex scroll-mt-[150px] flex-col rounded-[28px] border-[3px] border-[#020202] bg-[#1d2332] px-[22px] pb-6 transition-colors duration-300 hover:border-[var(--acc)] focus-within:border-[var(--acc)] min-[901px]:rounded-[40px] min-[901px]:px-14 min-[901px]:pb-[34px]"
      style={{ ['--acc' as string]: card.accent }}
    >
      {/* Main row: illustration overhangs the top (left on desktop), text on the right */}
      <div className="flex flex-col items-center gap-1.5 min-[901px]:flex-row-reverse min-[901px]:items-start min-[901px]:gap-10 min-[901px]:pt-11">
        <div className="relative mx-auto -mt-16 mb-0.5 aspect-[595/438] w-[78%] max-w-[300px] flex-none min-[901px]:mx-0 min-[901px]:mb-0 min-[901px]:mt-[calc(-6%_-_44px)] min-[901px]:w-auto min-[901px]:max-w-none min-[901px]:flex-[0_0_46%] min-[901px]:self-start">
          {/* Built up from the card's top edge, like it is climbing out of the card */}
          <motion.div
            className="absolute inset-0"
            variants={{
              hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 28 },
              show: {
                clipPath: 'inset(-10% -10% 0% -10%)',
                y: 0,
                transition: { duration: 0.9, delay: 0.25, ease: OFFER_BUILD },
              },
            }}
          >
            <img
              src={card.img}
              alt={card.imageAlt}
              draggable={false}
              className="absolute inset-0 h-full w-full origin-bottom object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>

        <div className="w-full min-w-0 flex-auto text-center text-white min-[901px]:w-auto min-[901px]:text-right">
          <h3 id={`${card.id}-title`} className="m-0 text-[clamp(1.6rem,2.6vw,2.25rem)] font-extrabold leading-[1.15] text-white">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h3>
          {card.subtitle && (
            <p className="mb-0 mt-2 text-[clamp(1rem,1.4vw,1.2rem)] font-medium text-white">{card.subtitle}</p>
          )}
          <div className="mx-auto mt-4 max-w-[660px] text-base leading-[1.6] text-white/[0.82] min-[901px]:mx-0">
            {descParts.map((part, i) => (
              <p key={i} className={i > 0 ? 'mb-0 mt-2.5' : 'm-0'}>
                {part}
              </p>
            ))}
          </div>

          <a
            href="#contact"
            className="group/cta mt-[22px] inline-flex items-center gap-2 rounded-full bg-[var(--acc)] px-6 py-3 text-[1.02rem] font-bold text-[#1d2332] no-underline outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white"
          >
            {card.cta}
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
              className="flex-shrink-0 transition-transform duration-200 ease-out group-hover/cta:-translate-x-1 group-focus-visible/cta:-translate-x-1"
            >
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Tags row: full card width; the hairline above it draws right to left, then the tags join */}
      <div className="relative mt-[26px] pt-5">
        <motion.span
          aria-hidden
          className="absolute right-0 top-0 h-px w-full origin-right bg-white/[0.12]"
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.8, delay: 0.55, ease: OFFER_BUILD } },
          }}
        />
        <p className="m-0 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[0.95rem] leading-[1.5] min-[901px]:justify-start">
          <motion.span
            className="font-semibold text-white"
            variants={{
              hidden: { opacity: 0, x: 8 },
              show: { opacity: 1, x: 0, transition: { duration: 0.45, delay: 0.75, ease: OFFER_EASE } },
            }}
          >
            {card.timing} של
          </motion.span>
          {card.tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="inline-flex items-center gap-2"
              variants={{
                hidden: { opacity: 0, x: 8 },
                show: { opacity: 1, x: 0, transition: { duration: 0.45, delay: 0.82 + i * 0.07, ease: OFFER_EASE } },
              }}
            >
              <span aria-hidden="true" className="text-[var(--acc)] opacity-70">//</span>
              <span className="font-medium text-[var(--acc)]">{tag}</span>
            </motion.span>
          ))}
        </p>
      </div>
    </motion.article>
  );
}

export default function WhatWeOfferV9({
  heading = OFFER_DEFAULT_HEADING,
  cards = OFFER_DEFAULT_CARDS,
}: {
  heading?: string;
  cards?: OfferCardData[];
}) {
  const reduce = useReducedMotion();

  // The word before "..." becomes the badge ("אז"), as on the live site.
  const [badgeRaw, ...restArr] = heading.split('...');
  const badge = badgeRaw.trim();
  const rest = restArr.join('...').replace(/^[.\s]+/, '').trim();

  const jumpTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      id="offer"
      dir="rtl"
      lang="he"
      className="relative bg-white px-5 pb-16 pt-16 text-[#1E1B4B] min-[601px]:pb-[90px] min-[601px]:pt-[72px] min-[901px]:px-10 min-[901px]:pb-[110px] min-[901px]:pt-24"
      style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <motion.div
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <h2 className="m-0 mb-[34px] flex flex-wrap items-center justify-center gap-3.5 text-center text-[1.9rem] font-extrabold leading-[1.1] text-[#1E1B4B] min-[901px]:text-[clamp(2rem,4vw,2.9rem)]">
            {/* Badge: the purple block is built right to left, keeping its tilt */}
            <motion.span
              className="inline-flex rotate-[-5.5deg] items-center justify-center bg-[#945eee] px-[0.34em] pb-[0.28em] pt-[0.2em] text-[0.86em] font-normal leading-none text-white"
              style={{ fontFamily: "'Anton', 'Google Sans', Arial, sans-serif" }}
              variants={{
                hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
                show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.6, ease: OFFER_BUILD } },
              }}
            >
              {badge}
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3, ease: OFFER_EASE } },
              }}
            >
              {rest}
            </motion.span>
          </h2>

          {/* Filter chips: each jumps to its card */}
          <motion.nav
            aria-label="סוגי שירות"
            className="mx-auto mb-[104px] flex max-w-[920px] flex-wrap justify-center gap-3"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.45 } } }}
          >
            {cards.map((card) => (
              <motion.a
                key={card.id}
                href={`#${card.id}`}
                onClick={(e) => jumpTo(e, card.id)}
                variants={offerRise}
                className="inline-flex items-center rounded-full border-2 border-[#020202] bg-white px-4 py-2.5 text-[0.95rem] font-semibold text-[#1d2332] no-underline outline-none transition-colors duration-200 hover:bg-[#1d2332] hover:text-white focus-visible:bg-[#1d2332] focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#945eee] min-[901px]:px-[22px] min-[901px]:py-[13px] min-[901px]:text-[1.05rem]"
              >
                {card.anchorLabel}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>

        <div className="mx-auto flex max-w-[1180px] flex-col gap-24 min-[901px]:gap-[120px]">
          {cards.map((card) => (
            <OfferCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
