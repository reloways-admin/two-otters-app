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

export function PromiseV3() {
  return (
    <section id="promise" className="py-28 px-6 overflow-hidden" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: "#00ff88" }}>
            A different approach
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">
            Not your usual
            <br />
            <span className="text-white/20 font-thin">process.</span>
          </h2>
        </motion.div>

        {/* Comparison */}
        <div className="grid md:grid-cols-[1fr_80px_1fr] gap-0 items-start">

          {/* Old way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="border border-white/5 rounded-2xl p-8 opacity-40"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8">The usual way</p>
            <div>
              {oldSteps.map((step, i) => (
                <div key={step} className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center w-5 flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1" />
                    {i < oldSteps.length - 1 && <div className="w-px flex-1 bg-white/10 my-1.5" style={{ minHeight: "1.5rem" }} />}
                  </div>
                  <p className="text-sm font-medium text-white/30 line-through decoration-white/20 leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow divider */}
          <div className="hidden md:flex items-center justify-center pt-16">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ border: "1px solid #00ff8840", boxShadow: "0 0 16px #00ff8830" }}
            >
              <svg className="w-4 h-4" style={{ color: "#00ff88" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* New way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl p-8"
            style={{ border: "1px solid #00ff8830", boxShadow: "0 0 40px #00ff8810" }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-8" style={{ color: "#00ff88" }}>Two Otters</p>
            <div>
              {newSteps.map((step, i) => (
                <div key={step.label} className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center w-5 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      className="mt-1 rounded-full flex-shrink-0"
                      style={step.accent
                        ? { width: "10px", height: "10px", background: "#00ff88", boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8860" }
                        : { width: "6px", height: "6px", background: "rgba(255,255,255,0.3)" }
                      }
                    />
                    {i < newSteps.length - 1 && (
                      <div
                        className="w-px flex-1 my-1.5"
                        style={{ minHeight: "1.5rem", background: step.accent ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.08)" }}
                      />
                    )}
                  </div>
                  <div className="leading-snug">
                    <p
                      className="text-sm font-bold"
                      style={{ color: step.accent ? "#00ff88" : "rgba(255,255,255,0.85)" }}
                    >
                      {step.label}
                    </p>
                    {step.accent && (
                      <p className="text-[10px] font-black uppercase tracking-widest mt-0.5" style={{ color: "#00ff8860" }}>
                        ← This is the difference
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            className="text-3xl md:text-4xl font-black text-white leading-tight max-w-3xl"
          >
            &ldquo;The gap between vision and reality closes{" "}
            <span style={{ color: "#00ff88", textShadow: "0 0 30px #00ff8860" }}>
              the moment you can see and touch
            </span>{" "}
            the prototype.&rdquo;
          </p>
          <div className="mt-8">
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#00ff8860";
                el.style.color = "#00ff88";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              See exactly how it works →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
