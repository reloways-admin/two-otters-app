'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/*
 * Two Otters v8 "our projects" section, with motion.
 * Same language as WorkV8 on the live site:
 *   white ground, navy #1E1B4B type, mid #4B5280 body, #E5E7EB hairline border
 *   one quiet accent per project (a tinted kicker chip + the tag line)
 *   hover = a 2px accent border and a slow image zoom; no lift, no shadow
 * The motion borrows the hero logo's idea: things BUILD rather than fade.
 * Each cover is revealed bottom to top, like the logo's right stroke.
 */

type Project = {
  title: string;
  kicker: string;
  tagline: string;
  tags: string[];
  href: string;
  image: string;
  accent: { solid: string; soft: string };
};

const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'Fincat',
    kicker: 'מותג פיננסי',
    tagline: 'יצירת אסטרטגיית מותג ובנייה של פלטפורמת נותני שירות מורכבת',
    tags: ['אסטרטגיה', 'UX UI', 'אתר', 'ליווי שיווקי'],
    href: '/work/fincat',
    image: '/fincat/card.webp',
    accent: { solid: '#B8860B', soft: '#FBF0D0' },
  },
  {
    title: 'The 5%',
    kicker: 'קרן מסחר',
    tagline:
      'בניית סיפור מותג חדש ומתוכו יציאה לאסטרטגיית שיווק. כדי להשלים את התהליך, יצרנו עולם ויזואלי חדש שמשלים את הערכים והשפה הטרמינולוגית',
    tags: ['אסטרטגיה', 'UX UI', 'סיפור מותג', 'אתר', 'ליווי שיווקי'],
    href: '/work/the5ers',
    image: '/the5ers/card.webp',
    accent: { solid: '#12904C', soft: '#DFF6EA' },
  },
];

const WORK_EASE = [0.22, 1, 0.36, 1] as const;
const BUILD_EASE = [0.65, 0, 0.35, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: WORK_EASE } },
};

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const reduce = useReducedMotion();
  const delay = 0.15 + index * 0.18;

  return (
    <motion.a
      href={p.href}
      aria-label={p.title}
      // One trigger for the whole card; the cover, image and tags follow through variants.
      // (A whileInView on the clipped cover itself never fires: a fully clipped box
      // has no visible area for the IntersectionObserver to see.)
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: WORK_EASE } },
      }}
      className="group flex min-w-0 flex-[0_1_520px] flex-col overflow-hidden rounded-[22px] border-2 border-[#E5E7EB] bg-white text-inherit no-underline transition-colors duration-200 hover:border-[var(--acc)] focus-visible:border-[var(--acc)] focus-visible:outline-none"
      style={{ ['--acc' as string]: p.accent.solid, ['--acc-soft' as string]: p.accent.soft }}
    >
      {/* Cover: built bottom to top, then settles from a slight zoom */}
      <div className="relative aspect-[5/4] overflow-hidden bg-[var(--acc-soft)]">
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
            show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9, delay: delay + 0.1, ease: BUILD_EASE } },
          }}
        >
          {/* Hover zoom sits on its own wrapper so it never fights the entrance scale */}
          <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <motion.img
            src={p.image}
            alt=""
            draggable={false}
            variants={{
              hidden: { scale: 1.12 },
              show: { scale: 1, transition: { duration: 1.4, delay: delay + 0.1, ease: WORK_EASE } },
            }}
            className="block h-full w-full object-cover object-top"
          />
          </div>
        </motion.div>
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3.5 end-3.5 inline-flex translate-y-1.5 items-center gap-1.5 rounded-full bg-[#1E1B4B] px-3.5 py-2 text-[0.82rem] font-bold text-white opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          לצפייה בפרויקט
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            className="transition-transform duration-200 group-hover:-translate-x-[3px]"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col px-[22px] pb-6 pt-5 text-start">
        <span className="mb-3 self-start rounded-full bg-[var(--acc-soft)] px-[11px] py-1 text-[0.78rem] font-bold text-[var(--acc)]">
          {p.kicker}
        </span>
        <h3 className="m-0 text-[1.35rem] font-extrabold text-[#1E1B4B]">{p.title}</h3>
        <p className="mb-0 mt-2 text-[0.98rem] leading-[1.55] text-[#4B5280]">{p.tagline}</p>
        {/* Tags join in one by one, after the card has landed */}
        <p className="mb-0 mt-auto flex flex-wrap gap-x-1.5 pt-4 text-[0.9rem] font-bold text-[var(--acc)]">
          {p.tags.map((tag, i) => (
            <motion.span
              key={tag}
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: delay + 0.7 + i * 0.07, ease: WORK_EASE } },
              }}
            >
              {i > 0 && <span aria-hidden className="me-1.5">·</span>}
              {tag}
            </motion.span>
          ))}
        </p>
      </div>
    </motion.a>
  );
}

export default function WorkV9({ projects = DEFAULT_PROJECTS }: { projects?: Project[] }) {
  return (
    <section
      id="work"
      dir="rtl"
      lang="he"
      className="bg-white px-5 pb-20 pt-8 sm:px-10 lg:pt-[88px]"
      style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: 0.1 }}
        className="mx-auto max-w-[1100px] text-center"
      >
        <motion.h2
          variants={rise}
          className="m-0 mb-3 text-balance text-[clamp(2rem,4vw,2.75rem)] font-black leading-[1.15] text-[#1E1B4B]"
        >
          הצצה לתוך הפרויקטים שלנו
        </motion.h2>
        <motion.p variants={rise} className="mx-auto mb-10 mt-0 max-w-[620px] text-[1.15rem] leading-relaxed text-[#4B5280]">
          כל מותג והטאצ׳ האישי שקיבל מאיתנו
        </motion.p>
      </motion.div>

      <div className="mx-auto flex max-w-[360px] flex-wrap justify-center gap-5 sm:max-w-[640px] lg:max-w-[1100px] lg:gap-7">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
