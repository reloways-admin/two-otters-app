'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 "who can work with us" section, with motion.
 * Same language as WhoCanWorkV8 on the live site:
 *   the curved navy #1d2332 blob (who-bg.svg) on desktop, a soft navy dome on mobile
 *   a skewed blue #3B82F6 ticker with the "eyes" mark between phrases
 *   IT'S A MATCH (#5aff00) / SWIPE LEFT :( (#ff4f3e) in Anton, otter photo in front
 *   tinted list cards, radius 32, hairline dividers; five dark persona cards, radius 20
 * Motion: the one orchestrated moment is the match pair. Each big word is built
 * right to left, the otter climbs up out of its card's top edge, then the list
 * rows join in reading order. Personas rise in reading order; the ticker runs as on the live site.
 */

type WhoPersona = { title: string; desc: string; icon: string };

type WhoContent = {
  marqueePhrases: string[];
  title: string;
  yesAlt: string;
  noAlt: string;
  yesList: string[];
  noList: string[];
  personasTitle: string;
  personas: WhoPersona[];
};

const WHO_BG = '/who-bg.svg';
const WHO_EYES = '/eyes-v01.png';
const WHO_OTTER_UP = '/v9/who-otter-up.webp';
const WHO_OTTER_DOWN = '/v9/who-otter-down.webp';
const WHO_CHECK = '/checkmark.png';
const WHO_CROSS = '/crossmark.png';

const WHO_DEFAULT: WhoContent = {
  marqueePhrases: [
    'אל דאגה - הלוטרות פה',
    'נפצח את זה',
    'כולם יגידו ״וואוו״',
    'צ׳ק-צ׳ק ונהיה באוויר',
    'בול מה שרצית',
  ],
  title: 'אם זה נשמע כמוכם,\nכנראה שנעבוד טוב ביחד',
  yesAlt: "It's a match - מתאים לנו",
  noAlt: 'Swipe left - לא מתאים לנו',
  yesList: [
    'יש לכם רעיון ומחפשים מישהו שיתרגם אותו החוצה',
    'ברור לכם שחלק מההצלחה זה הפידבק שלכם',
    'מבינים שאסטרטגיה היא חלק בלתי נפרד מהמוצר',
    'מתחשקת לכם חוויה חיובית עם נותני שירות',
    'הגדרתם תקציב ברור לתהליך פרמיום',
  ],
  noList: [
    'מחפשים ספק ביצוע בלבד, בלי חשיבה',
    'בא לכם ״שגר ושכח״ ואין לכם זמן להיות חלק',
    'בתכלס, לא חשבתם מה באמת הייתם רוצים',
    'מבחינתכם עיצוב גנרי מטמפלט זה סבבה',
    '״תקציב? לא חשבנו על זה..."',
  ],
  personasTitle: 'מתי פונים אלינו?',
  personas: [
    { title: 'בא לכם לראות,\nלפני שמתחייבים', desc: 'התהליך האפיוני שלנו מהיר ואתם מקבלים פרוטוטייפ שעובד וקל לשנות', icon: '/v9/phone-t.webp' },
    { title: 'חשוב לכם לעבוד עם\nספק אחד שלוקח אחריות', desc: 'אנחנו מספקים לכם את כל החוויה מהרעיון עד העלייה לאוויר. אין צורך לנהל 10 אנשים', icon: '/v9/ab-t.webp' },
    { title: 'החלום שלכם שהתהליך\nלא יקח שנה', desc: 'שלבי העבודה והתהליכים שלנו קצרים בחודשים ממה שמקובל. זה לא בא על חשבון האיכות...', icon: '/v9/light-t.webp' },
    { title: 'נמאס לכם\nמחובבנים ושרלטנים', desc: 'באחריות - אתם תקבלו את מה ששילמתם עליו ותאהבו את התוצאה. זו המומחיות שלנו', icon: '/v9/stamp-t.webp' },
    { title: 'רוצים להישאר רלוונטים,\nאבל לא ברור איך...', desc: 'בין כל הטרנדים והטכנולוגיות, נעזור לכם להבין מה הכי מתאים כדי שתשארו רלוונטים', icon: '/v9/target-t.webp' },
  ],
};

const WHO_EASE = [0.22, 1, 0.36, 1] as const;
const WHO_BUILD = [0.65, 0, 0.35, 1] as const;

const whoRise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: WHO_EASE } },
};

function WhoLines({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function WhoMarquee({ phrases }: { phrases: string[] }) {
  const reduce = useReducedMotion();
  const units = Array.from({ length: 20 }, (_, i) => phrases[i % phrases.length]);
  const half = (key: string) =>
    units.map((text, i) => (
      <React.Fragment key={`${key}${i}`}>
        <span className="flex-shrink-0 whitespace-nowrap px-5">{text}</span>
        <span className="mx-1 inline-flex flex-shrink-0 items-center">
          <img src={WHO_EYES} alt="" width={36} height={36} draggable={false} className="block h-9 w-9 object-contain" />
        </span>
      </React.Fragment>
    ));

  return (
    <div
      className="relative z-[1] m-0 overflow-hidden whitespace-nowrap bg-[#3B82F6] py-4 text-sm font-bold tracking-[0.3px] text-white [direction:ltr] [transform:skewY(-3deg)]"
    >
      {/* Screen readers get the phrases once; the moving copy is decorative */}
      <p className="sr-only" dir="rtl">{phrases.join(', ')}</p>
      <motion.div
        aria-hidden
        className="inline-flex items-center"
        animate={reduce ? { x: 0 } : { x: ['0%', '-50%'] }}
        transition={reduce ? { duration: 0 } : { duration: 60, ease: 'linear', repeat: Infinity }}
      >
        {half('a')}
        {half('b')}
      </motion.div>
    </div>
  );
}

function WhoMatchColumn({
  kind,
  items,
  otterAlt,
  delay,
}: {
  kind: 'yes' | 'no';
  items: string[];
  otterAlt: string;
  delay: number;
}) {
  const yes = kind === 'yes';
  const labelId = yes ? 'who-match-yes' : 'who-match-no';

  return (
    <div className="flex min-w-0 flex-col">
      <div className="relative z-[2] flex h-[200px] items-end min-[901px]:h-[250px]">
        {/* Big word: built right to left, the way Hebrew reads */}
        <motion.span
          id={labelId}
          className={`pointer-events-none absolute top-1.5 z-0 text-[3rem] font-normal uppercase leading-[0.9] tracking-[1px] [direction:ltr] min-[901px]:text-[clamp(2.8rem,5.6vw,5rem)] ${
            yes ? 'right-1 text-right text-[#5aff00]' : 'left-1 text-left text-[#ff4f3e]'
          }`}
          style={{ fontFamily: "'Anton', 'Google Sans', Arial, sans-serif" }}
          variants={{
            hidden: { clipPath: 'inset(-5% -5% -5% 100%)' },
            show: { clipPath: 'inset(-5% -5% -5% -5%)', transition: { duration: 0.75, delay, ease: WHO_BUILD } },
          }}
        >
          {yes ? (
            <>IT&rsquo;S A<br />MATCH</>
          ) : (
            <>SWIPE<br />LEFT :(</>
          )}
        </motion.span>

        {/* Otter climbs up out of the card's top edge (the clip is the card line) */}
        <div className={`relative z-[2] h-full overflow-hidden ${yes ? 'mr-auto' : 'ml-auto'}`}>
          <motion.img
            src={yes ? WHO_OTTER_UP : WHO_OTTER_DOWN}
            alt={otterAlt}
            draggable={false}
            className="block h-full w-auto"
            variants={{
              hidden: { y: '70%' },
              show: { y: '0%', transition: { duration: 0.9, delay: delay + 0.25, ease: WHO_EASE } },
            }}
          />
        </div>
      </div>

      <div className={`z-[1] rounded-[32px] px-[34px] py-5 ${yes ? 'bg-[rgba(90,255,0,0.05)]' : 'bg-[rgba(255,79,62,0.05)]'}`}>
        <ul aria-labelledby={labelId} className="m-0 list-none p-0">
          {items.map((item, i) => (
            <motion.li
              key={item}
              className={`flex items-center gap-3 border-b border-white/[0.09] py-[15px] text-base leading-[1.4] last:border-b-0 ${
                yes ? 'text-[#5aff00]' : 'text-[#ff6f61]'
              }`}
              variants={{
                hidden: { opacity: 0, x: 10 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5, delay: delay + 0.55 + i * 0.07, ease: WHO_EASE } },
              }}
            >
              <span className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center">
                <img src={yes ? WHO_CHECK : WHO_CROSS} alt="" width={26} height={26} className="block h-[26px] w-[26px]" />
              </span>
              <span className="flex-auto">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function WhoCanWorkV9({ content = WHO_DEFAULT }: { content?: WhoContent }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="who"
      dir="rtl"
      lang="he"
      className="relative overflow-x-clip px-0 pb-[60px] pt-11 text-white max-[900px]:!bg-none max-[900px]:rounded-[0_0_42%_42%/0_0_44px_44px] max-[900px]:bg-[#1d2332] min-[901px]:py-[210px]"
      style={{
        fontFamily: "'Google Sans', Arial, sans-serif",
        // Exact curved navy shape from the live site; light sections show through its curves.
        backgroundImage: `url(${WHO_BG})`,
        backgroundPosition: 'top center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <WhoMarquee phrases={content.marqueePhrases} />

      <div className="px-5 py-16 min-[601px]:px-10 min-[601px]:pb-0 min-[601px]:pt-11">
        <div className="mx-auto w-full max-w-[1100px]">
          <motion.h2
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={whoRise}
            className="m-0 mb-14 text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-[1.25] text-white"
          >
            <WhoLines text={content.title} />
          </motion.h2>

          {/* The orchestrated moment: match first (right), swipe left second */}
          <motion.div
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto mb-[100px] grid max-w-[460px] grid-cols-1 gap-6 min-[901px]:max-w-[1080px] min-[901px]:grid-cols-2 min-[901px]:gap-11"
          >
            <WhoMatchColumn kind="yes" items={content.yesList} otterAlt={content.yesAlt} delay={0} />
            <WhoMatchColumn kind="no" items={content.noList} otterAlt={content.noAlt} delay={0.35} />
          </motion.div>

          {/* Personas */}
          <motion.div
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3 variants={whoRise} className="m-0 mb-10 text-center text-[clamp(1.5rem,2.6vw,1.9rem)] font-extrabold text-white">
              {content.personasTitle}
            </motion.h3>
            <ul className="mx-auto m-0 grid max-w-[360px] list-none grid-cols-1 gap-4 p-0 min-[601px]:max-w-[1120px] min-[601px]:grid-cols-3 min-[901px]:grid-cols-5">
              {content.personas.map((p, i) => (
                <motion.li
                  key={p.title}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15 + i * 0.09, ease: WHO_EASE } },
                  }}
                  className="group flex flex-col items-center gap-2.5 rounded-[20px] border border-black bg-[#2b313e] px-4 pb-[22px] pt-5 text-center transition-colors duration-300 hover:border-white/40"
                >
                  <div className="flex h-[104px] w-full flex-shrink-0 items-center justify-center">
                    <motion.img
                      src={p.icon}
                      alt=""
                      draggable={false}
                      className="block h-24 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      variants={{
                        hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                        show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.7, delay: 0.35 + i * 0.09, ease: WHO_BUILD } },
                      }}
                    />
                  </div>
                  <h4 className="m-0 min-h-[calc(0.95rem*1.4*2)] text-center text-[0.95rem] font-bold leading-[1.4] text-white">
                    <WhoLines text={p.title} />
                  </h4>
                  <p className="m-0 text-center text-[0.8rem] font-normal leading-[1.5] text-white/60">{p.desc}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
