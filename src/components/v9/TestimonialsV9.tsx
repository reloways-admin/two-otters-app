'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 testimonials section, with motion.
 * Same language as TestimonialsV8 on the live site:
 *   navy #1d2332 organic blob (wide desktop) that tucks 170px up under the About drawings;
 *   below 1150px a solid navy block with soft rounded top and a domed bottom
 *   white title, five #FFD166 stars, a static 3-column masonry wall of white cards (radius 28)
 *   avatar photo or coloured initials, name #1E1B4B, role and quote #4B5280
 * Not a carousel on the live site, so no autoplay and nothing to pause.
 * Motion, one orchestrated moment: the stars fill in right to left like a rating being given,
 * then the cards rise column by column in reading order (right column first).
 */

type TestiItem = { name: string; role: string; quote: string; photo?: string };

const TESTI_DEFAULT_TITLE = 'היה לנו כייף לעבוד ביחד';

const TESTI_DEFAULT_ITEMS: TestiItem[] = [
  {
    name: 'גיל בן חור',
    role: 'מנכ"ל ומייסד · The5ers',
    photo: '/testimonials/gil-ben-hor.jpg',
    quote:
      'כחלק מתהליך המיתוג מחדש שלנו, ביקשנו מקרן לעזור לנו לנסח באופן אחיד את נרטיב המותג. קרן לקחה בעלות מלאה על הפרויקט, ועד מהרה הפכה לחלק בלתי נפרד מהצוות האסטרטגי הפנימי שלנו, שלא כמו כל צד שלישי אחר שהיינו מעורבים בו.\n\nככל שהפרויקט התקדם, קרן הרחיבה כל הזמן את חובותיה ואחריותיה. זה מראה את יחסה ומסירותה, בגישה הנדיבה והמקצועית ביותר.\n\nקרן מציעה שילוב ייחודי של יצירתיות, יחס YES CAN DO וגישה זריזה לשינויים בעת הצורך. היא מהירה להסתגל לשינויים, ופתוחה במיוחד.\n\nתכונותיה של קרן הופכות אותה לאשת מקצוע נדירה לעבוד איתה, ובאופן מעורר השראה היא מובילה אותנו אל סיומו של סיפור המותג שלנו.',
  },
  {
    name: 'מיכל',
    role: 'סמנכ"לית שיווק · הום סטייל',
    quote: 'מסתכלת על האפיון שעשית ונגנבת! עבודה מטורפת!!! שאפו ענק!!!',
  },
  {
    name: 'גל רוסבי מור',
    role: 'עו"ד',
    quote:
      'קרן מיתגה את כל המשרד שלי.\n\nאחרי הרבה "אנשי שיווק" הגעתי סוף סוף למישהי שבאמת הפכה להיות השותפה השיווקית של העסק שלי.\n\nהמסרים, האתר המדויק והמשפכים השיווקיים החכמים עשו הבדל במוניטין ובכמות הפניות של הלקוחות.',
  },
  {
    name: 'עדי נודל',
    role: 'מנכ"לית · Financial Cat',
    photo: '/testimonials/adi-nudel.jpg',
    quote:
      'היכולת של אמיר לתקשר רעיונות בצורה ויזואלית פשוט יוצאת דופן. העבודה שלו מקצועית מבחינה טכנית וגם מלאת יצירתיות וחיים.\n\n---\n\nקרן, אני אקח רגע להיות רגשית. תודה על הליווי בדרך המפחידה הזו, המעבר בין מיזם חינמי לעסק שמוכר משהו. מעבר שהיה יפהיפה מבחינה אסתטית ועובד טוב מבחינת חווית המשתמש. מעבר שלווה בשאלות ששלחו אותנו לחשוב ולחזור עם תשובות מהודקות. תודה 💙',
  },
];

const TESTI_AVATAR_COLORS = ['#A8B5FD', '#FFD166', '#3ECF7E', '#F4736E', '#7C5CED'];
const TESTI_COLUMN_COUNT = 3;
const TESTI_EASE = [0.22, 1, 0.36, 1] as const;
const TESTI_BUILD = [0.65, 0, 0.35, 1] as const;

// The navy organic shape from Figma (testimonials-bg.svg), inlined so it can be drawn behind the section.
const TESTI_BLOB_PATH =
  'M-352.955 1170.12C-352.955 1170.12 -192.891 1356.83 949.447 1356.68C2091.78 1356.52 2064.29 1133.43 2084.04 975.241C2113.88 736.199 2060.01 384.161 1890.65 138.662C1721.28 -106.836 1358.33 27.1559 695.648 133.653C43.821 238.408 -284.321 249.577 -464.609 496.45C-618.99 707.846 -508.771 1075.34 -352.955 1170.12Z';

function testiInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('');
}

// Same balancing as the live component: each card goes to the currently shortest column.
function testiToColumns(items: TestiItem[], count: number): { item: TestiItem; i: number }[][] {
  const columns: { item: TestiItem; i: number }[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);
  items.forEach((item, i) => {
    const est = item.quote.length + 120;
    let target = 0;
    for (let c = 1; c < count; c++) if (heights[c] < heights[target]) target = c;
    columns[target].push({ item, i });
    heights[target] += est;
  });
  return columns;
}

const testiRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: TESTI_EASE } },
};

function TestiCard({ item, i, delay }: { item: TestiItem; i: number; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: TESTI_EASE } },
      }}
      className="w-full rounded-[28px] bg-white px-[26px] py-6 text-start"
    >
      <header className="mb-3.5 flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-extrabold text-white"
          style={item.photo ? undefined : { background: TESTI_AVATAR_COLORS[i % TESTI_AVATAR_COLORS.length] }}
          aria-hidden="true"
        >
          {item.photo ? (
            <img src={item.photo} alt="" draggable={false} className="block h-full w-full object-cover" />
          ) : (
            testiInitials(item.name)
          )}
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-base font-extrabold text-[#1E1B4B]">{item.name}</span>
          <span className="text-[0.82rem] text-[#4B5280]">{item.role}</span>
        </span>
      </header>
      <blockquote className="m-0">
        {item.quote.split('\n\n').map((para, j) =>
          para.trim() === '---' ? (
            <hr key={j} className="my-4 w-full border-0 border-t border-solid border-[#E5E7EB]" />
          ) : (
            <p key={j} className="m-0 text-[0.95rem] leading-[1.7] text-[#4B5280] [&+p]:mt-[0.85em]">
              {para}
            </p>
          ),
        )}
      </blockquote>
    </motion.article>
  );
}

export default function TestimonialsV9({
  title = TESTI_DEFAULT_TITLE,
  items = TESTI_DEFAULT_ITEMS,
  tuckUnderAbout = true,
}: {
  title?: string;
  items?: TestiItem[];
  /** On wide desktop the live navy shape pulls 170px up under the About drawings. */
  tuckUnderAbout?: boolean;
}) {
  const reduce = useReducedMotion();
  const columns = testiToColumns(items, TESTI_COLUMN_COUNT);

  return (
    <section
      dir="rtl"
      lang="he"
      aria-label={title}
      className={`relative z-0 bg-[#1d2332] px-10 pb-[100px] pt-[90px] [border-radius:60px_60px_46%_46%/48px_48px_60px_60px] max-[600px]:px-5 max-[600px]:pb-20 max-[600px]:pt-[70px] max-[600px]:[border-radius:40px_40px_42%_42%/40px_40px_46px_46px] min-[1151px]:bg-transparent min-[1151px]:pb-[150px] min-[1151px]:pt-[200px] min-[1151px]:[border-radius:0] ${
        tuckUnderAbout ? 'min-[1151px]:-mt-[170px]' : ''
      }`}
      style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
    >
      {/* Wide desktop: the organic navy blob, stretched to the section like the live CSS background */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1357"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full min-[1151px]:block"
      >
        <path d={TESTI_BLOB_PATH} fill="#1D2332" />
      </svg>

      <div className="mx-auto w-full max-w-[1100px]">
        <motion.div
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-center"
        >
          <motion.h2 variants={testiRise} className="m-0 text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-white">
            {title}
          </motion.h2>
          {/* Five stars, filled in right to left the way a rating is given in Hebrew */}
          <motion.div
            aria-hidden="true"
            className="mb-10 mt-4 text-[1.5rem] tracking-[6px] text-[#FFD166]"
            style={{ paddingInlineStart: 6 }}
            variants={{
              hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
              show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9, delay: 0.3, ease: TESTI_BUILD } },
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </motion.div>
        </motion.div>

        {/* 3-column masonry wall; in RTL the first column sits on the right, so it rises first */}
        <div className="flex flex-wrap items-start justify-center gap-[22px]">
          {columns.map((col, ci) => (
            <div key={ci} className="flex max-w-[352px] flex-[1_1_300px] flex-col gap-[22px]">
              {col.map(({ item, i }, ri) => (
                <TestiCard key={i} item={item} i={i} delay={0.35 + ci * 0.12 + ri * 0.1} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
