'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 "who we are" section, with motion.
 * Same language as WhoWeAreV8 on the live site:
 *   transparent ground (white page), text on the left, the couch photo on the right
 *   the photo is tilted 3deg, radius 16, and climbs 150px up onto the navy section above
 *   acid green #5aff00 "אולה!" chip tilted -2deg with the otter hand beside it
 *   names #2c2549 black weight, body #4a4565, the last line's bold in navy #1E1B4B
 *   speech bubbles + browser + knight drawings placed as % of the photo (desktop),
 *   compact name tags on the photo instead (900px and below)
 * Motion, one orchestrated moment:
 *   the photo builds bottom to top, the bubbles grow out of their own tails toward the
 *   founders, the drawings settle in; on the text side the green chip builds right to left
 *   (Hebrew reading direction), the hand waves once, then the lines rise in reading order.
 */

type AboutCopy = {
  greeting: string;
  title: string;
  body1: string;
  body2: string;
  body3: string;
  body3Bold: string;
  amirBubbleAlt: string;
  kerenBubbleAlt: string;
  amirPhotoAlt: string;
  kerenPhotoAlt: string;
};

const ABOUT_DEFAULT_COPY: AboutCopy = {
  greeting: 'אולה!',
  title: 'אנחנו אמיר וקרן.',
  body1:
    'הכרנו אי שם בתיכון ובמשך השנים הזרם לקח אותנו להרבה מקומות, אבל כמו לוטרות אמיתיות (שמחזיקות ידיים) - תמיד נשארנו יחד.',
  body2:
    'בטח הגעתם לכאן כי יש לכם רעיון, ואתם רוצים לראות אותו מוחשי ומהר. וזו החדשנות בשיטת הספירלה שלנו - אנחנו לוקחים רעיונות למוצרים ומוציאים אותם לפועל בזריזות ודייקנות.',
  body3: 'בתכלס, אנחנו מוציאים לאוויר בדיוק מה שהיה לכם בראש.',
  body3Bold: 'רק מהר יותר ממה שציפיתם.',
  amirBubbleAlt: 'אמיר שלו - מומחה UX/UI, אפיון ותרגום אסטרטגיה למוצר',
  kerenBubbleAlt: 'קרן רייטלר - מומחית אסטרטגיה, סטוריטלינג ושפה מוצרית',
  amirPhotoAlt: 'אמיר שלו',
  kerenPhotoAlt: 'קרן רייטלר',
};

const ABOUT_EASE = [0.22, 1, 0.36, 1] as const;
const ABOUT_BUILD = [0.65, 0, 0.35, 1] as const;

// Explicit delays rather than staggerChildren: a child's own delay would override the stagger.
function aboutRiseAt(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: ABOUT_EASE } },
  };
}

/** A speech bubble that grows out of its tail, so it reads as "said by" the person it points at. */
function AboutBubble({
  src,
  alt,
  style,
  origin,
  delay,
}: {
  src: string;
  alt: string;
  style: React.CSSProperties;
  origin: string;
  delay: number;
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className="pointer-events-none absolute z-[5] h-auto max-[900px]:hidden"
      style={{ ...style, transformOrigin: origin }}
      variants={{
        hidden: { opacity: 0, scale: 0.4 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: ABOUT_EASE } },
      }}
    />
  );
}

export default function WhoWeAreV9({
  copy = ABOUT_DEFAULT_COPY,
  overlapPrevious = true,
}: {
  copy?: AboutCopy;
  /** The live photo climbs up onto the navy section above it. Turn off when rendered on its own. */
  overlapPrevious?: boolean;
}) {
  const reduce = useReducedMotion();
  const initial = reduce ? 'show' : 'hidden';

  return (
    <section
      id="about"
      dir="rtl"
      lang="he"
      className="relative z-[1] overflow-visible bg-transparent px-10 pb-20 pt-[60px] max-[600px]:px-5 max-[600px]:py-16"
      style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
    >
      {/* RTL row-reverse puts the first child (the text) on the left, like the live page */}
      <div className="mx-auto flex w-full max-w-[1100px] flex-row-reverse items-start gap-[30px] max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-2">
        {/* Text column */}
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto min-w-0 max-w-[560px] flex-[1_1_44%] pt-11 text-right max-[900px]:order-2 max-[900px]:flex-none max-[900px]:pt-0 max-[900px]:text-center"
        >
          <h2 className="m-0 mb-[22px]">
            <span className="inline-flex items-center gap-2.5 max-[900px]:justify-center">
              {/* The chip builds right to left, the direction the word is read */}
              <motion.span
                className="inline-block rotate-[-2deg] bg-[#5aff00] px-3.5 pb-1.5 pt-0.5 text-[clamp(1.9rem,3.4vw,2.7rem)] font-black leading-none text-[#1d2332]"
                variants={{
                  hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
                  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.6, delay: 0.3, ease: ABOUT_BUILD } },
                }}
              >
                {copy.greeting}
              </motion.span>
              {/* One wave hello once the chip is in place */}
              <motion.img
                src="/otter-hand.svg"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="h-[clamp(34px,4vw,48px)] w-auto"
                style={{ transformOrigin: '50% 90%' }}
                variants={
                  reduce
                    ? { hidden: { rotate: -18 }, show: { rotate: -18 } }
                    : {
                        hidden: { rotate: -18, opacity: 0 },
                        show: {
                          rotate: [-18, -34, -6, -28, -18],
                          opacity: 1,
                          transition: {
                            opacity: { duration: 0.2, delay: 0.8 },
                            rotate: { duration: 1.1, delay: 0.85, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] },
                          },
                        },
                      }
                }
              />
            </span>
            <motion.span
              variants={aboutRiseAt(0.55)}
              className="mt-3.5 block text-[clamp(1.9rem,3.8vw,3rem)] font-black leading-[1.05] text-[#2c2549] max-[900px]:text-[2.1rem]"
            >
              {copy.title}
            </motion.span>
          </h2>
          <motion.p variants={aboutRiseAt(0.7)} className="m-0 mb-3.5 text-[1.06rem] leading-[1.7] text-[#4a4565] max-[900px]:mx-auto">
            {copy.body1}
          </motion.p>
          <motion.p variants={aboutRiseAt(0.8)} className="m-0 mb-3.5 text-[1.06rem] leading-[1.7] text-[#4a4565] max-[900px]:mx-auto">
            {copy.body2}
          </motion.p>
          <motion.p variants={aboutRiseAt(0.9)} className="m-0 mb-3.5 text-[1.06rem] leading-[1.7] text-[#4a4565] max-[900px]:mx-auto">
            {copy.body3} <b className="font-bold text-[#1E1B4B]">{copy.body3Bold}</b>
          </motion.p>
        </motion.div>

        {/* Visual column: bubbles and drawings sit at % of the photo so the composition scales together */}
        <div className="flex min-w-0 flex-[1_1_52%] justify-center max-[900px]:order-1 max-[900px]:mb-4 max-[900px]:w-full max-[900px]:flex-none">
          <motion.div
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`relative w-[min(470px,100%)] max-[900px]:w-[min(340px,84%)] ${
              overlapPrevious ? '-mt-[150px] max-[900px]:-mt-[60px]' : ''
            }`}
          >
            {/* Photo: tilted like the live page, built bottom to top, then settles from a slight zoom */}
            <div className="rotate-[3deg]">
              <motion.div
                className="overflow-hidden rounded-2xl"
                variants={{
                  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.95, ease: ABOUT_BUILD } },
                }}
              >
                <motion.img
                  src="/about-couch.jpg"
                  alt={`${copy.amirPhotoAlt} · ${copy.kerenPhotoAlt}`}
                  draggable={false}
                  className="block h-auto w-full"
                  variants={{
                    hidden: { scale: 1.1 },
                    show: { scale: 1, transition: { duration: 1.4, ease: ABOUT_EASE } },
                  }}
                />
              </motion.div>
            </div>

            {/* Bubbles grow from their tails: Amir's tail is bottom right, Keren's bottom left */}
            <AboutBubble
              src="/about-bubble-amir.svg"
              alt={copy.amirBubbleAlt}
              style={{ left: '-7.3%', top: '28.2%', width: '34.9%' }}
              origin="83% 99%"
              delay={0.8}
            />
            <AboutBubble
              src="/about-bubble-keren.svg"
              alt={copy.kerenBubbleAlt}
              style={{ left: '72%', top: '28.9%', width: '34.9%' }}
              origin="22% 92%"
              delay={0.95}
            />

            {/* Drawings settle in from below once the photo is up */}
            <motion.img
              src="/about-browser.svg"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none absolute z-[4] h-auto max-[900px]:hidden"
              style={{ left: '39.4%', top: '82.5%', width: '38.4%' }}
              variants={{
                hidden: { opacity: 0, y: 28, rotate: -4 },
                show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, delay: 1.1, ease: ABOUT_EASE } },
              }}
            />
            <motion.img
              src="/about-horse.svg"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none absolute z-[4] h-auto max-[900px]:hidden"
              style={{ left: '75.4%', top: '74.6%', width: '37%' }}
              variants={{
                hidden: { opacity: 0, y: 28, rotate: 6 },
                show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, delay: 1.2, ease: ABOUT_EASE } },
              }}
            />

            {/* Compact name tags, shown in place of the bubbles at 900px and below */}
            <motion.img
              src="/v9/amir-tag.svg"
              alt={copy.amirPhotoAlt}
              draggable={false}
              className="pointer-events-none absolute z-[6] hidden h-11 w-auto max-[900px]:block"
              style={{ left: '6%', top: '50%', transformOrigin: '90% 100%' }}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.8, ease: ABOUT_EASE } },
              }}
            />
            <motion.img
              src="/v9/keren-tag.svg"
              alt={copy.kerenPhotoAlt}
              draggable={false}
              className="pointer-events-none absolute z-[6] hidden h-11 w-auto max-[900px]:block"
              style={{ left: '55%', top: '42%', transformOrigin: '5% 100%' }}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.95, ease: ABOUT_EASE } },
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
