'use client';

import React, { useId, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 FAQ, with motion.
 * Same language as FaqV8 on the live site:
 *   white ground, navy #1E1B4B heading (weight 900), one 640px list
 *   1.5px #E5E7EB border, radius 28, 1px hairlines between rows
 *   question 16px bold, answer 15px / 1.75 in #4B5280, row hover = #F8F7FF tint
 *   the + icon turns into an x when the row is open
 * Motion: the list's frame builds top to bottom, then the questions rise in reading order.
 * Opening a row grows its height smoothly (real accordion: button + aria-expanded + region).
 */

type FaqItem = { q: string; a: string };

const FAQ_DEFAULT_HEADING = 'כנראה שזה מה שעובר לכם בראש';

const FAQ_DEFAULT_ITEMS: FaqItem[] = [
  {
    q: 'כמה זמן לוקח התהליך?',
    a: 'כל פרויקט הוא ייחודי ויש לו את המורכבות שלו.\nיחד עם זאת, בדרך כלל נגיע לפרוטוטייפ עובד תוך שבועות בודדים.\nתהליך מלא של בניית מוצר הכולל אפיון אסטרטגי, עיצוב וכתיבת תוכן לוקח 3-4 חודשים.\n\nבכל הערכה שונה של לוח הזמנים, אנחנו נעשה תיאום ציפיות ברור כבר בתחילת הפרויקט.',
  },
  {
    q: 'מה התוצר הסופי שאקבל?',
    a: 'בתום התהליך האפיוני, הלקוחות שלנו מקבלים פרוטוטייפ אינטראקטיבי שאפשר ללחוץ ולהרגיש, מסמך אפיון אסטרטגי, קבצי עיצוב, וקווים מנחים ברורים שיאפשרו לכם להמשיך באופן עצמאי (או להמשיך את הפרויקט איתנו)',
  },
  {
    q: 'כבר עברתי תהליך אפיון, מה מיוחד בעבודה שלכם?',
    a: 'המתודה שלנו היא ייחודית ולא קיימת בסטודיואים אחרים (ככל הידוע לנו).\nכל התהליך שלנו בנוי על וודאות ללקוחות שלנו. חשוב לנו שתראו את חווית המשתמש של המוצר לפני שתתחייבו לפיתוח (שהוא התהליך היקר והארוך).\n\nבמקום PDF שנגנז או לינק לפיגמה, אתם מקבלים פרוטוטייפ עובד שאפשר ללחוץ עליו ולהבין את חווית המשתמש של המוצר.\nלראשונה, אפשר בכמה שבועות בודדים לחוות את המוצר, וככה לדייק אותו במהירות.',
  },
  {
    q: 'מה ההבדל בין פרוטוטייפ למוצר מוגמר?',
    a: 'פרוטוטייפ הוא מודל אינטראקטיבי שמדמה את חווית המשתמש.\nהוא לא קוד סופי והוא מגיע ללא העיצוב המדויק.\nאבל הוא מאפשר לכם להרגיש, לבדוק ולדייק את המוצר שלכם לפני שמשקיעים בפיתוח.',
  },
  {
    q: 'כמה עולה לעבוד ביחד?',
    a: 'כל פרויקט מתומחר בהתאם לגודל ולמורכבות.\nנשמח לדבר ולהבין מה אתם בונים ומשם נתאים הצעה מדויקת.',
  },
  {
    q: 'מה קורה אחרי שמקבלים את הפרוטוטייפ?',
    a: 'אתם ממשיכים לפיתוח עם כל הקבצים והדוחות. אתם לא תלויים בנו - אבל אנחנו כאן אם תצטרכו ליווי גם בשלב העיצוב והפיתוח.',
  },
];

const FAQ_EASE = [0.22, 1, 0.36, 1] as const;
const FAQ_BUILD = [0.65, 0, 0.35, 1] as const;

const faqRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: FAQ_EASE } },
};

function FaqAnswer({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((para, pi) => (
        <p key={pi} className={pi > 0 ? 'mb-0 mt-4' : 'm-0'}>
          {para.split('\n').map((line, li, arr) => (
            <span key={li}>
              {line}
              {li < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

function FaqRow({
  item,
  index,
  open,
  onToggle,
  baseId,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
  baseId: string;
}) {
  const reduce = useReducedMotion();
  const btnId = `${baseId}-q-${index}`;
  const panelId = `${baseId}-a-${index}`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.45 + index * 0.07, ease: FAQ_EASE } },
      }}
      className="border-b border-[#E5E7EB] last:border-b-0"
    >
      <h3 className="m-0 text-[1rem] font-bold">
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-7 py-[22px] text-right font-[inherit] text-[1rem] font-bold text-[#1E1B4B] transition-colors duration-150 hover:bg-[#F8F7FF] focus-visible:bg-[#F8F7FF] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#5C3EEF] max-[600px]:px-5"
        >
          <span>{item.q}</span>
          {/* + turns into x: the two bars rotate, as on the live site */}
          <span aria-hidden className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <span
              className="absolute h-[2px] w-4 rounded-[2px] bg-[#04202b] transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
            />
            <span
              className="absolute h-[2px] w-4 rounded-[2px] bg-[#04202b] transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: open ? 'rotate(-45deg)' : 'rotate(90deg)' }}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0 }}
            animate={{ height: 'auto', transition: { duration: reduce ? 0 : 0.4, ease: FAQ_BUILD } }}
            exit={{ height: 0, transition: { duration: reduce ? 0 : 0.3, ease: FAQ_BUILD } }}
            className="overflow-hidden"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.08, ease: FAQ_EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="px-7 pb-6 text-right text-[0.9375rem] leading-[1.75] text-[#4B5280] max-[600px]:px-5"
            >
              <FaqAnswer text={item.a} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqV9({
  heading = FAQ_DEFAULT_HEADING,
  items = FAQ_DEFAULT_ITEMS,
}: {
  heading?: string;
  items?: FaqItem[];
}) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      dir="rtl"
      lang="he"
      className="bg-white px-10 py-[100px] max-[600px]:px-5 max-[600px]:py-16"
      style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
    >
      <motion.div
        initial={reduce ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto w-full max-w-[1100px]"
      >
        <motion.h2
          variants={faqRise}
          className="m-0 mb-12 text-balance text-center text-[clamp(2rem,4vw,2.75rem)] font-black leading-[1.15] text-[#1E1B4B]"
        >
          {heading}
        </motion.h2>

        {/* The frame builds top to bottom; rows rise into it in reading order */}
        <motion.div
          variants={{
            hidden: { clipPath: 'inset(0% 0% 100% 0% round 28px)' },
            show: {
              clipPath: 'inset(0% 0% 0% 0% round 28px)',
              transition: { duration: 0.9, delay: 0.2, ease: FAQ_BUILD },
            },
          }}
          className="mx-auto max-w-[640px] overflow-hidden rounded-[28px] border-[1.5px] border-[#E5E7EB] bg-white"
        >
          {items.map((item, i) => (
            <FaqRow
              key={item.q}
              item={item}
              index={i}
              baseId={baseId}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
