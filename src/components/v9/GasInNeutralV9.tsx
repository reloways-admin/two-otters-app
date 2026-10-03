'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 "full gas in neutral" section, with motion.
 * Same language as GasInNeutralV8 on the live site:
 *   white ground, a 10-column bento: wide/narrow, then narrow/wide
 *   flat brand fills (#f8f800 · #2672ff · #945eee · #5aff00), 3px #020202 border, radius 40
 *   titles #2c2549 (white on blue and purple), illustration full-bleed at the card bottom
 * Motion keeps the "things build" idea from the logo:
 *   the underline under "לא אתם" draws right to left, the way Hebrew is read,
 *   and each card's illustration builds up from the card's bottom edge once the card lands.
 */

type Card = {
  title: string;
  body: string;
  fill: string;
  ink: string;
  image: string;
  /** Column span on the 10-column desktop grid (column 1 is the right edge in RTL). */
  span: string;
};

const DEFAULT_CARDS: Card[] = [
  {
    title: 'אנחנו לא סטודיו AI',
    body: 'כן. אנחנו משתמשים בכלים של בינה מלאכותית.\nאבל כל אחד יכול להריץ פרומפט. לא כולם יודעים לשאול את השאלות הנכונות. לשלב. לבשל. הנה - אנחנו כן.',
    fill: '#f8f800', ink: '#2c2549', image: '/v8-gas-yellow.svg', span: 'lg:col-[1/8]',
  },
  {
    title: 'תשכחו מחודשים מתישים של אפיון',
    body: 'אתם מקבלים פרוטוטייפ עובד תוך שבועות בודדים, כדי שתוכלו "להרגיש" את השימוש במוצר שלכם לפני עיצוב ופיתוח.',
    fill: '#2672ff', ink: '#ffffff', image: '/v8-gas-blue.svg', span: 'lg:col-[8/11]',
  },
  {
    title: "מתרגמים ויז'ן למוצר עובד",
    body: 'זה הסופר-פאואר שלנו. באים מוכנים עם שאלות, רפרנסים ותשובות - ועוזרים לכם לתרגם את מה שדמיינתם למוצר עובד.',
    fill: '#945eee', ink: '#ffffff', image: '/v8-gas-purple.svg', span: 'lg:col-[1/4]',
  },
  {
    title: 'לא פחות מפיקסל פרפקט',
    body: 'פרוטוטייפ מאושר. תיעוד מסודר. ארכיטקטורה נכונה.\nהכל ברור ומדויק לרמת הפיקסל, כדי שתוכלו לקחת את הפרוטוטייפ לשלב הבא.',
    fill: '#5aff00', ink: '#2c2549', image: '/v8-gas-green.svg', span: 'lg:col-[4/11]',
  },
];

const GAS_EASE = [0.22, 1, 0.36, 1] as const;
const GAS_BUILD = [0.65, 0, 0.35, 1] as const;

const gasRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: GAS_EASE } },
};

function GasCard({ card, index }: { card: Card; index: number }) {
  const reduce = useReducedMotion();
  // Cards land in reading order; the second row waits for the first.
  const delay = index * 0.12;

  return (
    <motion.article
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 36, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, delay, ease: GAS_EASE } },
      }}
      className={`group relative col-span-full flex min-h-[220px] min-w-0 flex-col gap-3 overflow-hidden rounded-[40px] border-[3px] border-[#020202] px-8 pt-[30px] ${card.span}`}
      style={{ background: card.fill, color: card.ink }}
    >
      <h3 className="m-0 text-balance text-[26px] font-extrabold leading-[1.25]">{card.title}</h3>
      <p className="m-0 whitespace-pre-line text-[16px] leading-[1.6]">{card.body}</p>

      {/* Illustration: built up from the card's bottom edge after the card lands */}
      <div className="-mx-8 mt-auto overflow-hidden pt-4">
        <motion.div
          variants={{
            hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 24 },
            show: {
              clipPath: 'inset(0% 0% 0% 0%)',
              y: 0,
              transition: { duration: 0.8, delay: delay + 0.35, ease: GAS_BUILD },
            },
          }}
        >
          <img
            src={card.image}
            alt=""
            draggable={false}
            className="block h-auto w-full transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function GasInNeutralV9({ cards = DEFAULT_CARDS }: { cards?: Card[] }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      dir="rtl"
      lang="he"
      // z-[1] and no background: the spiral below tucks up under these cards, as on the live page
      className="relative z-[1] px-5 pb-16 pt-16 sm:px-10 lg:pt-20"
      style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
    >
      <motion.div
        initial={reduce ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: 0.12 }}
        className="mx-auto max-w-[1100px] text-center text-[#1E1B4B]"
      >
        <motion.h2 variants={gasRise} className="m-0 text-balance text-[clamp(2rem,4vw,2.75rem)] font-normal leading-[1.15]">
          להיות פול גז בניוטרל
          <br />
          <span className="font-black">
            זה כבר{' '}
            <span className="relative inline-block">
              לא אתם
              {/* Hand-drawn underline, drawn right to left. Sits under the baseline, never behind the letters. */}
              <svg
                aria-hidden
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-2.5 left-0 h-3 w-full overflow-visible"
              >
                <motion.path
                  d="M197 6 C 160 2, 118 11, 82 7 S 22 4, 3 9"
                  fill="none"
                  stroke="#945eee"
                  strokeWidth="5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  variants={{
                    hidden: { pathLength: 0 },
                    show: { pathLength: 1, transition: { duration: 0.8, delay: 0.55, ease: GAS_BUILD } },
                  }}
                />
              </svg>
            </span>
            .
          </span>
        </motion.h2>
        <motion.p variants={gasRise} className="mx-auto mb-10 mt-7 text-[clamp(1.1rem,1.6vw,22px)] leading-normal text-[#4A4565]">
          השיטה שלנו מקצרת את הדרך <strong className="font-bold text-[#1E1B4B]">מרעיון לפרוטוטייפ עובד</strong>
          <br />
          ומאפשרת לכם להגיע למוצר מדויק מהר יותר.
        </motion.p>
      </motion.div>

      <div className="mx-auto grid max-w-[520px] grid-cols-1 gap-4 lg:max-w-[1040px] lg:grid-cols-10">
        {cards.map((card, i) => (
          <GasCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
