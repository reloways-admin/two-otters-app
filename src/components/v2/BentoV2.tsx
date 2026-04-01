"use client";

import { motion } from "framer-motion";

const amirSkills = [
  "Visual hierarchy",
  "Component systems",
  "Dev handoff",
  "User flow logic",
  "Design system",
];

const kerenSkills = [
  "Value proposition",
  "Audience fit",
  "Message clarity",
  "Strategic narrative",
  "5-second test",
];

function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function BentoV2() {
  return (
    <section id="about" className="py-28 px-6 bg-stone-900 relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400 mb-4">
            Who we are
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">
            Two perspectives.
            <br />
            <span className="text-stone-500 font-medium">One outcome.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_auto] gap-4">

          {/* Amir — large */}
          <Cell className="md:col-span-5 md:row-span-2 bg-stone-950 border border-white/5 flex flex-col justify-between p-8 min-h-[340px]">
            {/* Teal bar */}
            <div className="h-1 w-10 rounded-full bg-teal-500 mb-6" />

            {/* Name + role */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-2">Agent</p>
              <h3 className="text-5xl font-black text-white tracking-tight leading-none mb-1">Amir</h3>
              <p className="text-teal-400 text-sm font-medium">UX · UI · Product Design</p>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed my-6">
              When you show Amir what you&apos;re building, his first question isn&apos;t
              &ldquo;what should it look like?&rdquo; — it&apos;s &ldquo;what happens when the developer
              gets this?&rdquo; He thinks in systems and builds fast.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {amirSkills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-3 py-1 rounded-full bg-teal-900/30 text-teal-400 border border-teal-800/40 font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </Cell>

          {/* Amir quote */}
          <Cell className="md:col-span-4 bg-teal-500 p-7 flex flex-col justify-between">
            <svg className="w-6 h-6 text-teal-900/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.598-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.598-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-teal-950 text-xl font-bold leading-snug">
              &ldquo;What happens when the developer gets this?&rdquo;
            </p>
            <p className="text-teal-800 text-xs font-medium mt-4">— Amir, always</p>
          </Cell>

          {/* Stat: years */}
          <Cell className="md:col-span-3 bg-stone-800/60 border border-white/5 p-7 flex flex-col justify-between">
            <p className="text-[10px] uppercase tracking-widest text-stone-600">Experience</p>
            <p className="text-7xl font-black text-white leading-none">10<span className="text-teal-400">+</span></p>
            <p className="text-xs text-stone-500 font-medium">years shipping products</p>
          </Cell>

          {/* Keren — large */}
          <Cell className="md:col-span-5 bg-stone-950 border border-white/5 flex flex-col justify-between p-8 min-h-[300px]">
            <div className="h-1 w-10 rounded-full bg-amber-500 mb-6" />

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-2">Agent</p>
              <h3 className="text-5xl font-black text-white tracking-tight leading-none mb-1">Keren</h3>
              <p className="text-amber-400 text-sm font-medium">Strategy · Messaging · Positioning</p>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed my-6">
              Keren listens to what you say and hears what you mean. When a client says
              &ldquo;I don&apos;t like this button,&rdquo; Keren hears &ldquo;the message isn&apos;t landing.&rdquo;
              She ensures what gets built is strategically aligned.
            </p>

            <div className="flex flex-wrap gap-2">
              {kerenSkills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-3 py-1 rounded-full bg-amber-900/30 text-amber-400 border border-amber-800/40 font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </Cell>

          {/* Keren quote */}
          <Cell className="md:col-span-4 bg-amber-500 p-7 flex flex-col justify-between">
            <svg className="w-6 h-6 text-amber-900/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.598-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.598-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-amber-950 text-xl font-bold leading-snug">
              &ldquo;What&apos;s the real question behind the question?&rdquo;
            </p>
            <p className="text-amber-800 text-xs font-medium mt-4">— Keren, always</p>
          </Cell>

          {/* Together cell — full width */}
          <Cell className="md:col-span-12 bg-gradient-to-r from-teal-950 to-stone-950 border border-teal-900/30 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-2xl md:text-3xl font-black text-white leading-tight max-w-2xl">
                Together, we are the first people who will{" "}
                <span className="text-teal-400">fully understand what is in your head</span>{" "}
                — and show it back to you within two weeks.
              </p>
              <a
                href="#contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-teal-500 text-stone-950 text-sm font-bold hover:bg-teal-400 transition-colors"
              >
                Book a sprint
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </Cell>

        </div>
      </div>
    </section>
  );
}
