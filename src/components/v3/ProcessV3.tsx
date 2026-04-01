"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Vision Extraction",
    agent: null,
    description: "We get into your head. Visual examples, strategic questions, no generic briefs. We help you discover exactly what you want — even when you don't know how to articulate it.",
    output: "Sharp strategic brief",
  },
  {
    number: "02",
    title: "Rapid Build",
    agent: "Amir",
    description: "Amir builds a working, clickable prototype directly from the brief. AI makes it fast. His expertise — UX, component thinking, dev-side awareness — makes it right.",
    output: "Clickable prototype",
  },
  {
    number: "03",
    title: "Real-Time Refine",
    agent: "Keren + Amir",
    description: 'You see it. You react. Keren translates what you\'re really saying — "I don\'t like this button" means "the message isn\'t landing." Amir updates live.',
    output: "Approved design",
  },
  {
    number: "04",
    title: "Handoff Ready",
    agent: null,
    description: "Approved prototype. Strategic documentation. Figma-packaged and dev-ready. Your engineers receive everything annotated and clear.",
    output: "Dev-ready package",
  },
];

export function ProcessV3() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#080808] leading-[1.0] tracking-tight">
            Here&apos;s exactly<br />what happens.
          </h2>
          <p className="text-sm text-[#080808]/40 max-w-xs font-light">
            Spiral, not linear. Steps run in parallel, feedback is real-time.
          </p>
        </motion.div>

        {/* 4-column grid */}
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Dark card */}
              <div
                className="rounded-2xl p-7 flex flex-col gap-5 h-full transition-all duration-300"
                style={{
                  background: "#080808",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px #00ff8815";
                  (e.currentTarget as HTMLElement).style.borderColor = "#00ff8830";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                {/* Neon number */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-4xl font-black leading-none"
                    style={{ color: "#00ff88", textShadow: "0 0 20px #00ff8880" }}
                  >
                    {step.number}
                  </span>
                  {step.agent && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                      {step.agent}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-black text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{step.description}</p>
                </div>

                {/* Output */}
                <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-[10px] uppercase tracking-widest text-white/20 mb-1">Output</p>
                  <p className="text-xs font-bold text-white/60">{step.output}</p>
                </div>
              </div>

              {/* Arrow between steps — desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-[0.625rem] top-1/2 -translate-y-1/2 z-10">
                  <div
                    className="w-[14px] h-[14px] rounded-full flex items-center justify-center"
                    style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}
                  >
                    <svg className="w-2 h-2 text-[#080808]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(8,8,8,0.08)" }}
        >
          <p className="text-sm text-[#080808]/40 max-w-xs font-light">
            The simplest way to start is the free audit. No commitment. Just insight.
          </p>
          <a
            href="#audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#080808] transition-all hover:scale-[1.02]"
            style={{ background: "#00ff88", boxShadow: "0 0 16px #00ff8840" }}
          >
            Try the free audit
          </a>
        </motion.div>
      </div>
    </section>
  );
}
