"use client";

import { motion } from "framer-motion";

const oldSteps = [
  "Brief",
  "Scope",
  "Contract — before seeing anything",
  "Months of work",
  "Reveal — hope for the best",
];

const newSteps = [
  { label: "Brief", accent: false },
  { label: "Build", accent: false },
  { label: "You see it — week 1", accent: true },
  { label: "Refine together", accent: false },
  { label: "Approved — then you commit", accent: false },
];

export function PromiseV2() {
  return (
    <section id="promise" className="py-28 px-6 bg-stone-900 relative overflow-hidden">
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400 mb-4">
            A different approach
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">
            This is not your
            <br />
            usual process.
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start">

          {/* Old way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="opacity-40"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-8">
              The usual way
            </p>
            <div className="space-y-0">
              {oldSteps.map((step, i) => (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 w-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-600 mt-1.5 flex-shrink-0" />
                    {i < oldSteps.length - 1 && (
                      <div className="w-px flex-1 my-1.5 bg-stone-800" style={{ minHeight: "2rem" }} />
                    )}
                  </div>
                  <p className="text-sm font-medium text-stone-500 line-through decoration-stone-700 pb-6 leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col items-center gap-3 pt-10 self-stretch"
          >
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="w-8 h-8 rounded-full border border-teal-500/40 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </motion.div>

          {/* New way */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400 mb-8">
              Two Otters
            </p>
            <div className="space-y-0">
              {newSteps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 w-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      className={`mt-1.5 flex-shrink-0 rounded-full ${
                        step.accent
                          ? "w-3 h-3 bg-teal-500 ring-4 ring-teal-500/20"
                          : "w-1.5 h-1.5 bg-white/50"
                      }`}
                    />
                    {i < newSteps.length - 1 && (
                      <div
                        className={`w-px flex-1 my-1.5 ${step.accent ? "bg-teal-800/60" : "bg-white/10"}`}
                        style={{ minHeight: "2rem" }}
                      />
                    )}
                  </div>
                  <p
                    className={`text-sm font-semibold pb-6 leading-snug ${
                      step.accent ? "text-teal-400" : "text-white"
                    }`}
                  >
                    {step.label}
                    {step.accent && (
                      <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-teal-600 bg-teal-500/10 px-2 py-0.5 rounded-full">
                        This is the difference
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mt-20 pt-12 border-t border-white/5"
        >
          <blockquote className="max-w-3xl">
            <p className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
              &ldquo;The gap between vision and reality closes
              <span className="text-teal-400"> the moment you can see and touch </span>
              the prototype.&rdquo;
            </p>
            <p className="mt-5 text-stone-500 text-sm">
              That&apos;s what we built our entire process around.
            </p>
          </blockquote>
          <div className="mt-8">
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-stone-300 text-sm font-medium hover:border-teal-500/50 hover:text-teal-400 transition-all"
            >
              See exactly how it works
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
