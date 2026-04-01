"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Vision Extraction",
    agent: null,
    color: "border-stone-700",
    description:
      "We get into your head. Visual examples, strategic questions, no generic briefs. We help you discover exactly what you want — even when you don't know how to articulate it.",
    output: "Sharp strategic brief",
  },
  {
    number: "02",
    title: "Rapid Build",
    agent: "Amir",
    color: "border-teal-700",
    accentText: "text-teal-400",
    description:
      "Amir builds a working, clickable prototype directly from the brief. AI makes it fast. His expertise — UX, component thinking, dev-side awareness — makes it right.",
    output: "Clickable prototype",
  },
  {
    number: "03",
    title: "Real-Time Refine",
    agent: "Keren + Amir",
    color: "border-amber-700",
    accentText: "text-amber-400",
    description:
      "You see it. You react. Keren translates what you're really saying — \"I don't like this button\" means \"the message isn't landing.\" Amir updates live. You leave approved.",
    output: "Approved design",
  },
  {
    number: "04",
    title: "Handoff Ready",
    agent: null,
    color: "border-stone-700",
    description:
      "Approved prototype. Strategic documentation. Figma-packaged and dev-ready. Your engineers receive everything annotated and clear — so the handoff doesn't become a project.",
    output: "Dev-ready package",
  },
];

export function ProcessV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-28 px-6 bg-stone-950 relative overflow-hidden"
    >
      {/* Moving grid lines */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${(i / 11) * 100}%` }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400 mb-4">
              The process
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">
              Here&apos;s exactly
              <br />
              what happens.
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-xs">
            Spiral, not linear. Steps run in parallel,
            feedback is real-time, and the prototype IS the strategy.
          </p>
        </motion.div>

        {/* Filmstrip — horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="overflow-x-auto md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-4 gap-4 min-w-[700px] md:min-w-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`flex-shrink-0 w-64 md:w-auto relative rounded-2xl border-t-2 ${step.color} bg-stone-900/60 p-7 flex flex-col gap-5`}
              >
                {/* Step number */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">
                    Step
                  </span>
                  <span className="text-3xl font-black text-white/10">{step.number}</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl font-black text-white mb-1">{step.title}</h3>
                  {step.agent && (
                    <span className={`text-xs font-semibold ${step.accentText ?? "text-stone-400"}`}>
                      — {step.agent}
                    </span>
                  )}
                </div>

                <p className="text-sm text-stone-400 leading-relaxed flex-1">
                  {step.description}
                </p>

                {/* Output */}
                <div className="border-t border-white/5 pt-4">
                  <p className="text-[10px] uppercase tracking-widest text-stone-600 mb-1">Output</p>
                  <p className="text-xs font-semibold text-white">{step.output}</p>
                </div>

                {/* Connector arrow — desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-[1.125rem] top-1/2 -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full border border-stone-700 bg-stone-950 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint on mobile */}
        <p className="md:hidden text-center text-[10px] uppercase tracking-widest text-stone-700 mt-5">
          ← Scroll to see all steps →
        </p>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-stone-500 text-sm max-w-sm">
            The simplest way to start is the free audit.
            No commitment. Just insight.
          </p>
          <a
            href="#audit"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-stone-300 text-sm font-medium hover:border-teal-500/50 hover:text-teal-400 transition-all"
          >
            Try the free audit ↑
          </a>
        </motion.div>
      </div>
    </section>
  );
}
