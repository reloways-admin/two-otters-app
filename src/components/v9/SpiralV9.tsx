'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
  type Variants,
} from 'framer-motion';

/*
 * Two Otters v8 "spiral method" section, with motion.
 * Same language as SpiralV8 on the live site:
 *   navy #1d2332 ground, slanted top / shallow curved bottom (same clip-path polygon)
 *   the lilac #BAB4FA spiral with its arrow, the Figma frame 1381.3 x 1367.2 scaled with cqw
 *   4 stage cards (#5aff00 / #945eee / #f8f800 / #2672ff, 3px #020202 border) at the Figma coordinates
 *   horse / papers / screens / spaceship riding over the cards, steps 5-8 with icons, Anton numbers, green titles
 * The one orchestrated moment: as you scroll, the spiral draws itself from its centre
 * outwards, and each stage card builds in (right to left, the Hebrew reading direction)
 * when the line has travelled far enough to reach it; its illustration then builds up from
 * below. The arrow at the tail draws last and points at "אל תעצרו באפיון...".
 * Below 900px the spiral is hidden, as on the live site, and the cards build on scroll-in.
 */

type SpiralStage = { num: string; title: string; subtitle: string; body: string };
type SpiralStep = { num: string; title: string; subtitle: string; body: string };

const SPIRAL_DEFAULT_STAGES: SpiralStage[] = [
  { num: '1', title: 'שלב האסטרטגיה', subtitle: 'נקודת ההתחלה', body: 'מתחילים עם הבנה עמוקה של המוצר, השוק והמטרות ומתרגמים את הכל לבריף חד שרצים עליו.' },
  { num: '2', title: 'שלב האיפיון', subtitle: 'איפיון UX אסטרטגי', body: 'מתחילים עם הבנה עמוקה של המוצר, השוק והמטרות ומתרגמים את הכל לבריף חד שרצים עליו.' },
  { num: '3', title: 'שלב הפרוטוטייפ', subtitle: 'עובד במהירות שיא', body: 'בשלב הזה מפסיקים לדמיין ומתחילים לראות.\nמקבלים פרוטוטייפ עובד שאפשר ללחוץ עליו, להרגיש אותו ולתת פידבק קונקרטי על משהו מוחשי.' },
  { num: '4', title: 'שלב ההשקה', subtitle: 'האנד אוף מלא', body: 'פרוטוטייפ מאושר, תיעוד מלא וקווים מנחים ברורים כדי שכל מי שנוגע במותג שלכם מכאן והלאה ידע בדיוק מה לעשות.' },
];

// Same order as the live copy (5, 7, 6, 8): the RTL grid lays it out as 5 | 7 over 6 | 8.
const SPIRAL_DEFAULT_STEPS: SpiralStep[] = [
  { num: '5', title: 'שלב פיתוח השפה', subtitle: 'הקול הייחודי של המותג שלכם', body: 'יוצקים לעסק אופי, צורת דיבור וקווים מנחים לכתיבה, כדי שהקהל שלכם לא רק יזהה אתכם, אלא הוא ירגיש שהוא מכיר אתכם ומאמין לכם.' },
  { num: '7', title: 'שלב העיצוב', subtitle: 'מלבישים את המוצר שלכם', body: 'השלב המלהיב של העיצוב, בוא אנחנו מתרגמים את המסרים והאופי שלכם לשפה גרפית שמבליטה את האופי שלכם בכל פיקסל' },
  { num: '6', title: 'שלב כתיבת התוכן', subtitle: 'המילים שמובילות את המוצר שלכם', body: 'כותבים את התוכן לאתר, הפלטפורמה או האפליקציה עם האופי המדויק של המותג שלכם. השפה מתכתבת עם האסטרטגיה והעיצוב.' },
  { num: '8', title: 'שלב הפיתוח', subtitle: 'מלווים את הפיתוח עד שאתם באוויר', body: 'אחרי העבודה הקשה, זה הזמן לוודא שהעיצוב וחוויית המשתמש מובנים נכון, עד שמה שיוצא לאוויר נראה בדיוק כמו מה שתכננו.' },
];

const SPIRAL_EASE = [0.22, 1, 0.36, 1] as const;
const SPIRAL_BUILD = [0.65, 0, 0.35, 1] as const;
const SPIRAL_LILAC = '#BAB4FA';

/*
 * Per stage: colours, the desktop frame position (% of the Figma frame) and padding (cqw),
 * the illustration and where it rides on the frame, and how far along the spiral
 * (0..1 of the drawn length) the line must be before the card builds.
 * Classes are written out in full so Tailwind can see them.
 */
const SPIRAL_STAGE_META = [
  {
    bg: '#5aff00', ink: '#1d2332', illus: '/step-1.svg', at: 0.3,
    pos: 'min-[901px]:left-[43.2%] min-[901px]:top-[19%] min-[901px]:w-[46.2%] min-[901px]:h-[28.5%] min-[901px]:z-[1]',
    pad: 'min-[901px]:pt-[3.47cqw] min-[901px]:pr-[4.05cqw] min-[901px]:pb-[1.74cqw] min-[901px]:pl-[2.90cqw]',
    art: 'left-[45.2%] top-[12.4%] w-[17.7%] z-[6]',
  },
  {
    bg: '#945eee', ink: '#ffffff', illus: '/step-2.svg', at: 0.45,
    pos: 'min-[901px]:left-[4.6%] min-[901px]:top-[26.3%] min-[901px]:w-[44.5%] min-[901px]:h-[26.9%] min-[901px]:z-[2]',
    pad: 'min-[901px]:pt-[2.32cqw] min-[901px]:pr-[2.90cqw] min-[901px]:pb-[1.74cqw] min-[901px]:pl-[5.21cqw]',
    art: 'left-0 top-[27.5%] w-[21.6%] z-[8]',
  },
  {
    bg: '#f8f800', ink: '#1d2332', illus: '/step-3.svg', at: 0.6,
    pos: 'min-[901px]:left-[43.9%] min-[901px]:top-[43.4%] min-[901px]:w-[42.6%] min-[901px]:h-[27.1%] min-[901px]:z-[3]',
    pad: 'min-[901px]:pt-[1.74cqw] min-[901px]:pr-[1.74cqw] min-[901px]:pb-[1.74cqw] min-[901px]:pl-[2.90cqw]',
    art: 'left-[46.1%] top-[41.3%] w-[17.8%] z-[5]',
  },
  {
    bg: '#2672ff', ink: '#ffffff', illus: '/step-4.svg', at: 0.75,
    pos: 'min-[901px]:left-[10.1%] min-[901px]:top-[50.6%] min-[901px]:w-[34.5%] min-[901px]:h-[26.8%] min-[901px]:z-[4]',
    pad: 'min-[901px]:pt-[4.63cqw] min-[901px]:pr-[2.90cqw] min-[901px]:pb-[1.74cqw] min-[901px]:pl-[2.90cqw]',
    art: 'left-[4.3%] top-[59.1%] w-[17.4%] z-[6]',
  },
];

const SPIRAL_STEP_ICONS: Record<string, string> = {
  '5': '/spiral-megaphone.svg',
  '6': '/spiral-feather.svg',
  '7': '/spiral-colors.svg',
  '8': '/spiral-browser.svg',
};

// The spiral ribbon exactly as /spiral-loop.svg draws it (an outlined, tapering shape).
const SPIRAL_RIBBON =
  'M599.808 745.63C600.509 744.928 600.904 743.979 600.903 742.991C600.902 742.002 600.506 741.055 599.802 740.357C599.097 739.658 598.141 739.266 597.144 739.265C596.147 739.264 595.19 739.655 594.482 740.35C575.738 759.691 541.309 760.836 522.823 741.445C498.195 717.84 500.316 674.865 524.943 651.924C537.358 639.678 553.613 631.395 570.82 628.717C595.295 624.698 621.405 632.659 638.62 650.171C677.631 687.525 674.307 755.526 635.374 791.846C588.594 840.241 502.338 843.355 455.761 794.687C394.149 735.786 399.285 628.478 460.674 571.087C534.258 494.798 670.263 489.618 743.974 566.402C841.206 659.12 833.401 828.33 736.687 919.044C621.039 1039.34 406.561 1048.12 289.73 926.971C227.379 865.581 188.463 782.108 180.42 695.419C168.51 576.558 214.457 454.211 300.161 370.151C481.98 180.073 820.863 164.751 1006.83 356.292C1106.31 453.787 1190.09 580.746 1185.17 721.814C1181.15 862.651 1094.6 986.659 995.71 1085.51L995.854 1085.38C945.883 1133.66 876.459 1157.94 806.805 1154.11C765.871 1152.78 725.595 1143.73 684.356 1137C663.916 1134.26 642.086 1130.13 620.693 1138.76C598.098 1148.4 593.609 1174.59 593.443 1194.88C593.43 1195.86 593.811 1196.82 594.504 1197.53C595.198 1198.24 596.147 1198.65 597.143 1198.66C598.139 1198.68 599.102 1198.31 599.82 1197.62C600.538 1196.93 600.952 1195.99 600.975 1195.01C600.975 1195.01 600.975 1195.01 600.975 1195.01C601.312 1175.16 606.131 1153.28 624.002 1146.14C641.597 1139.03 662.999 1142.54 682.967 1145.57C723.533 1152.57 764.396 1162.18 806.398 1163.93C877.868 1168.67 951.678 1143.7 1003.87 1093.89L1004.02 1093.75C1104.6 994.706 1194.72 869.09 1200.06 722.287C1206.09 575.112 1119.63 443.644 1019.07 344.16C827.14 144.54 475.034 159.301 286.153 356.267C196.323 444.098 147.9 572.418 160.422 697.307C168.851 788.389 209.935 876.43 275.63 940.946C400.656 1070.14 628.413 1059.67 750.013 932.253C853.232 834.848 860.967 653.399 756.14 554.344C675.063 470.908 528.039 478.049 449.785 560.294C383.216 623.3 378.407 740.414 446.113 804.249C498.601 858.124 593.487 853.351 643.885 800.282C686.842 759.549 689.883 683.922 646.132 642.726C626.331 622.93 596.558 614.248 569.215 619.016C549.964 622.188 531.914 631.634 518.29 645.329C490.506 671.704 488.553 720.654 516.894 747.323C538.984 769.934 578.749 767.849 599.808 745.63Z';

// One edge of that ribbon, centre to tail, used as the stroke of a mask that "draws" the
// ribbon. A short lead-in and lead-out cover the rounded caps at both ends.
const SPIRAL_TRACE =
  'M604 750L594.482 740.35C575.738 759.691 541.309 760.836 522.823 741.445C498.195 717.84 500.316 674.865 524.943 651.924C537.358 639.678 553.613 631.395 570.82 628.717C595.295 624.698 621.405 632.659 638.62 650.171C677.631 687.525 674.307 755.526 635.374 791.846C588.594 840.241 502.338 843.355 455.761 794.687C394.149 735.786 399.285 628.478 460.674 571.087C534.258 494.798 670.263 489.618 743.974 566.402C841.206 659.12 833.401 828.33 736.687 919.044C621.039 1039.34 406.561 1048.12 289.73 926.971C227.379 865.581 188.463 782.108 180.42 695.419C168.51 576.558 214.457 454.211 300.161 370.151C481.98 180.073 820.863 164.751 1006.83 356.292C1106.31 453.787 1190.09 580.746 1185.17 721.814C1181.15 862.651 1094.6 986.659 995.71 1085.51L995.854 1085.38C945.883 1133.66 876.459 1157.94 806.805 1154.11C765.871 1152.78 725.595 1143.73 684.356 1137C663.916 1134.26 642.086 1130.13 620.693 1138.76C598.098 1148.4 593.609 1174.59 593.443 1194.88L595 1206';

// The arrowhead at the tail (a plain stroke in the source SVG).
const SPIRAL_ARROW = 'M566.002 1168.5L597.597 1203.5C599.352 1199.5 614.974 1180.5 631.825 1166';

const spiralRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SPIRAL_EASE } },
};

/** True above the live site's 900px breakpoint, where the spiral composition is shown. */
function useSpiralDesktop() {
  const query = '(min-width: 901px)';
  // Starts false on both server and client so hydration matches; the effect below
  // switches it on after mount.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return desktop;
}

function SpiralCard({
  stage,
  index,
  built,
  desktop,
}: {
  stage: SpiralStage;
  index: number;
  built: boolean;
  desktop: boolean;
}) {
  const meta = SPIRAL_STAGE_META[index];
  const reduce = useReducedMotion();
  // Desktop: the spiral decides when the card builds. Mobile: the card builds when it scrolls in.
  // The trigger sits on the (always visible) <li>; the clipped card inside follows by variants.
  const trigger = desktop
    ? { initial: reduce ? 'show' : 'hidden', animate: built ? 'show' : 'hidden' }
    : { initial: reduce ? 'show' : 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.25 } };

  return (
    <motion.li {...trigger} className={`relative w-full min-[901px]:absolute ${meta.pos}`}>
      <motion.div
        variants={{
          hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.75, ease: SPIRAL_BUILD } },
        }}
        className={[
          'flex h-full flex-col items-start gap-2.5 overflow-hidden rounded-[24px] border-[3px] border-[#020202] p-9 text-right',
          'min-[901px]:gap-[0.58cqw] min-[901px]:rounded-[2.9cqw] min-[901px]:p-0',
          meta.pad,
        ].join(' ')}
        style={{ background: meta.bg, color: meta.ink }}
      >
        {/* Text rises in after the colour field has started to build */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 12 },
            show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3, ease: SPIRAL_EASE } },
          }}
          className="flex w-full flex-col gap-2.5 min-[901px]:w-auto min-[901px]:gap-[0.58cqw]"
        >
          <span className="text-[1.3rem] font-semibold leading-none min-[901px]:text-[1.74cqw]">{stage.num}</span>
          <div className="flex w-full flex-col min-[901px]:w-[21.5cqw]">
            <h3 className="m-0 text-[1.5rem] font-bold leading-[1.2] min-[901px]:text-[2.32cqw] min-[901px]:leading-[2.75cqw]">{stage.title}</h3>
            <p className="m-0 text-[1.15rem] font-normal leading-[1.3] min-[901px]:text-[2.32cqw] min-[901px]:leading-[2.75cqw]">{stage.subtitle}</p>
          </div>
          <p className="m-0 w-full whitespace-pre-line text-[1rem] leading-[1.55] min-[901px]:w-[21.5cqw] min-[901px]:text-[1.30cqw] min-[901px]:leading-[1.74cqw]">
            {stage.body}
          </p>
        </motion.div>

        {/* Mobile only: the illustration sits in the card, under the text, and builds up from below */}
        <motion.img
          src={meta.illus}
          alt=""
          aria-hidden
          draggable={false}
          variants={{
            hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
            show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.7, delay: 0.45, ease: SPIRAL_BUILD } },
          }}
          className="mt-2 block h-[140px] w-full object-contain object-center min-[901px]:hidden"
        />
      </motion.div>
    </motion.li>
  );
}

/** Desktop only: the illustrations ride over the cards at the Figma positions and build up from below once their card is in. */
function SpiralArt({ index, built }: { index: number; built: boolean }) {
  const meta = SPIRAL_STAGE_META[index];
  const reduce = useReducedMotion();
  return (
    <motion.img
      src={meta.illus}
      alt=""
      draggable={false}
      initial={reduce ? 'show' : 'hidden'}
      animate={built ? 'show' : 'hidden'}
      variants={{
        hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 18 },
        show: { clipPath: 'inset(0% 0% 0% 0%)', y: 0, transition: { duration: 0.75, delay: 0.35, ease: SPIRAL_BUILD } },
      }}
      className={`pointer-events-none absolute h-auto ${meta.art}`}
    />
  );
}

function SpiralLine({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const maskId = useId().replace(/:/g, '') + '-spiral-mask';
  const ribbon = useTransform(progress, [0, 0.92], [0, 1]);
  const arrow = useTransform(progress, [0.92, 1], [0, 1]);
  const arrowOpacity = useTransform(progress, [0.92, 0.925], [0, 1]);
  return (
    <svg
      viewBox="0 0 1380 1368"
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full min-[901px]:block"
      fill="none"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1380" height="1368">
          <motion.path
            d={SPIRAL_TRACE}
            stroke="#fff"
            strokeWidth={46}
            strokeLinecap="butt"
            strokeLinejoin="round"
            style={{ pathLength: ribbon }}
          />
        </mask>
      </defs>
      <path d={SPIRAL_RIBBON} fill={SPIRAL_LILAC} mask={`url(#${maskId})`} />
      <motion.path
        d={SPIRAL_ARROW}
        stroke={SPIRAL_LILAC}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: arrow, opacity: arrowOpacity }}
      />
    </svg>
  );
}

export default function SpiralV9({
  title1 = 'הכירו את',
  titleBold = 'שיטת הספירלה',
  sub = 'שכחו מתהליך לינארי. אנחנו עובדים במקביל, בסנכרון מלא, ומדייקים תוך כדי תנועה',
  stages = SPIRAL_DEFAULT_STAGES,
  moreTitle = 'אל תעצרו באפיון...',
  moreSub = 'ככה אנחנו לוקחים אתכם עד שהמוצר חי, בועט ובאוויר',
  steps = SPIRAL_DEFAULT_STEPS,
  tuckUnderPrevious = true,
}: {
  title1?: string;
  titleBold?: string;
  sub?: string;
  stages?: SpiralStage[];
  moreTitle?: string;
  moreSub?: string;
  steps?: SpiralStep[];
  /** Pull the navy up under the previous section's last cards, as the live page does (-11vw). */
  tuckUnderPrevious?: boolean;
}) {
  const reduce = useReducedMotion();
  const desktop = useSpiralDesktop();
  const canvasRef = useRef<HTMLDivElement>(null);

  // Scroll drives the drawing, but only forwards: scrolling back up never un-draws it.
  const { scrollYProgress } = useScroll({ target: canvasRef, offset: ['start 0.8', 'center 0.45'] });
  const reached = useMotionValue(reduce ? 1 : 0);
  const drawn = useSpring(reached, { stiffness: 90, damping: 26, restDelta: 0.0005 });
  // 0 on the first render everywhere (the server can't know about reduced motion);
  // the effect below fills it in.
  const [builtCount, setBuiltCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      reached.set(1);
      drawn.jump(1);
      setBuiltCount(stages.length);
      return;
    }
    const push = (v: number) => {
      if (v > reached.get()) reached.set(v);
    };
    push(scrollYProgress.get());
    const offScroll = scrollYProgress.on('change', push);
    // Cards follow the visible (sprung) line, so a card lands as the line gets there.
    const offDrawn = drawn.on('change', (v) => {
      const n = SPIRAL_STAGE_META.filter((m) => v >= m.at).length;
      setBuiltCount((c) => (n > c ? n : c));
    });
    return () => {
      offScroll();
      offDrawn();
    };
  }, [reduce, scrollYProgress, reached, drawn, stages.length]);

  return (
    <section
      id="spiral"
      dir="rtl"
      lang="he"
      className={[
        'relative z-0 overflow-hidden bg-[#1d2332] px-10 pb-[120px] pt-[20vw] text-white',
        tuckUnderPrevious ? '-mt-[11vw]' : '',
      ].join(' ')}
      style={{
        fontFamily: "'Google Sans', Arial, sans-serif",
        // Slanted top that rises to the right; a shallow convex curve along the bottom.
        clipPath:
          'polygon(0 19.5vw, 100% 2.7vw, 100% calc(100% - 28px), 90% calc(100% - 18px), 80% calc(100% - 10px), 70% calc(100% - 4px), 60% calc(100% - 1px), 50% 100%, 40% calc(100% - 1px), 30% calc(100% - 4px), 20% calc(100% - 10px), 10% calc(100% - 18px), 0 calc(100% - 28px))',
      }}
    >
      <div className="mx-auto w-full max-w-[1100px]">
        {/* Heading */}
        <motion.div
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.12 }}
          className="mb-8 text-center min-[901px]:mb-0"
        >
          <motion.h2 variants={spiralRise} className="m-0 mb-5 text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.15] text-white">
            {title1}
            <br />
            {titleBold}
          </motion.h2>
          <motion.p variants={spiralRise} className="mx-auto m-0 max-w-[900px] text-[1.2rem] leading-[1.6] text-white/85">
            {sub}
          </motion.p>
        </motion.div>

        {/* The spiral frame: the SVG sets the proportions, cards and art sit at the Figma coordinates */}
        <div
          ref={canvasRef}
          className="relative mx-auto mb-4 w-full min-[901px]:-mt-[78px] min-[901px]:mb-12 min-[901px]:aspect-[1381.3/1367.2] min-[901px]:max-w-[1120px] min-[901px]:translate-x-[6.6%] min-[901px]:[container-type:inline-size]"
        >
          <SpiralLine progress={drawn} />

          <ol className="relative z-[1] m-0 mx-auto flex max-w-[520px] list-none flex-col gap-4 p-0 min-[901px]:absolute min-[901px]:inset-0 min-[901px]:mx-0 min-[901px]:block min-[901px]:max-w-none">
            {stages.map((stage, i) => (
              <SpiralCard key={stage.num} stage={stage} index={i} built={builtCount > i} desktop={desktop} />
            ))}
          </ol>

          {desktop && (
            <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
              {stages.map((stage, i) => (
                <SpiralArt key={stage.num} index={i} built={builtCount > i} />
              ))}
            </div>
          )}
        </div>

        {/* Bridge between the spiral's arrow and steps 5-8 */}
        <motion.div
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.1 }}
          className="relative z-[1] mx-auto mt-10 max-w-[820px] text-center min-[901px]:-mt-[90px]"
        >
          <motion.h3 variants={spiralRise} className="m-0 mb-3 text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.15] text-white">
            {moreTitle}
          </motion.h3>
          <motion.p variants={spiralRise} className="m-0 text-[clamp(1.1rem,1.7vw,1.5rem)] font-medium leading-[1.4] text-white">
            {moreSub}
          </motion.p>
        </motion.div>

        {/* Steps 5-8: icon on the left, Anton number, green title, white body */}
        <motion.ol
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.14 }}
          className="mx-auto mt-[72px] grid max-w-[520px] list-none grid-cols-1 gap-x-[72px] gap-y-12 p-0 min-[901px]:max-w-[1120px] min-[901px]:grid-flow-col min-[901px]:grid-cols-2 min-[901px]:grid-rows-2"
        >
          {/* The copy is stored 5, 7, 6, 8 so a row-filled grid shows 5|7 over 6|8. Sorting it and filling the
              grid by column keeps that desktop layout, while mobile and screen readers get 5, 6, 7, 8 (the live
              page reads 5, 7, 6, 8 there). */}
          {[...steps].sort((a, b) => Number(a.num) - Number(b.num)).map((step) => (
            <motion.li key={step.num} variants={spiralRise} className="flex flex-col items-start gap-[14px] min-[901px]:flex-row-reverse min-[901px]:gap-7">
              {SPIRAL_STEP_ICONS[step.num] && (
                <motion.img
                  src={SPIRAL_STEP_ICONS[step.num]}
                  alt=""
                  aria-hidden
                  draggable={false}
                  variants={{
                    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                    show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.7, delay: 0.2, ease: SPIRAL_BUILD } },
                  }}
                  className="h-auto w-[132px] flex-none min-[901px]:mt-[30px] min-[901px]:w-[clamp(96px,11vw,168px)]"
                />
              )}
              <div className="w-full flex-auto text-right min-[901px]:w-auto">
                {/* The number settles into its -4deg tilt as it lands */}
                <motion.span
                  variants={{
                    hidden: { rotate: 0 },
                    show: { rotate: -4, transition: { duration: 0.6, delay: 0.25, ease: SPIRAL_EASE } },
                  }}
                  className="-mb-1 inline-block origin-bottom-right text-[clamp(2.2rem,3.4vw,3.25rem)] font-normal leading-none text-white"
                  style={{ fontFamily: "'Anton', 'Google Sans', Arial, sans-serif" }}
                >
                  #{step.num.padStart(2, '0')}
                </motion.span>
                <h4 className="m-0 text-[clamp(1.35rem,2.1vw,1.85rem)] font-bold leading-[1.2] text-[#5aff00]">{step.title}</h4>
                <p className="m-0 mb-2.5 text-[clamp(1.35rem,2.1vw,1.85rem)] font-normal leading-[1.2] text-[#5aff00]">{step.subtitle}</p>
                <p className="m-0 text-[0.95rem] leading-[1.6] text-white/85">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
