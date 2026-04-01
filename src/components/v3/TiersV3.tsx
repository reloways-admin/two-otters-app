"use client";

import { motion } from "framer-motion";

export function TiersV3() {
  return (
    <section id="tiers" className="py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: "#00cc66" }}>
            Three ways to work with us
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-[#080808] leading-[1.0] tracking-tight">
            Start anywhere.
            <br />
            <span className="text-[#080808]/20 font-thin">Each step stands alone.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">

          {/* Connector */}
          {/* TIER 1 — Free */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-[#080808]/10 rounded-2xl p-7 hover:border-[#080808]/20 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex-shrink-0 sm:w-36">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#080808]/30 mb-2">01 / Free</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#00ff8820", color: "#00aa55", border: "1px solid #00ff8840" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#00cc66" }} />
                  Instant
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#080808]/60 mb-1">AI Audit</h3>
                <p className="text-xs text-[#080808]/40 mb-3">See how we think — for free.</p>
                <p className="text-sm text-[#080808]/60 leading-relaxed mb-5">
                  Drop your product — a screenshot, PDF, or description. Agent Amir reviews the UX.
                  Agent Keren adds the strategic layer. Real insights in under 30 seconds. No email required.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["UX review", "Strategy audit", "Quick wins", "Red flags"].map((t) => (
                    <span key={t} className="text-[11px] px-3 py-1 rounded-full bg-[#080808]/5 text-[#080808]/40 border border-[#080808]/8 font-medium">{t}</span>
                  ))}
                </div>
                <a href="#audit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#080808]/15 text-[#080808]/60 text-sm font-medium hover:border-[#080808]/30 hover:text-[#080808] transition-all">
                  Try the audit →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="flex flex-col items-center py-1">
            <div className="w-px h-4 bg-[#080808]/10" />
            <svg className="w-3 h-3 text-[#080808]/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* TIER 2 — Sprint (FEATURED — dark + neon) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-9 relative overflow-hidden"
            style={{
              background: "#080808",
              border: "1px solid #00ff8840",
              boxShadow: "0 0 40px #00ff8815, 0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {/* Neon top bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg, transparent, #00ff88, transparent)" }} />

            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #00ff8808 0%, transparent 70%)" }} />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 relative">
              <div className="flex-shrink-0 sm:w-36">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">02 / Sprint</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#080808]" style={{ background: "#00ff88" }}>
                  Most popular
                </span>
                <p className="mt-2 text-sm font-bold text-white">2 weeks</p>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white mb-1 tracking-tight">Discovery Sprint</h3>
                <p className="text-xs text-white/30 mb-4">Two weeks. A working prototype.</p>
                <p className="text-sm text-white/50 leading-relaxed mb-5">
                  We work intensively with you. Amir builds the prototype in real time while Keren translates your feedback into strategy.
                  You walk out with something you can click, test, and show anyone.{" "}
                  <span className="text-white font-medium">&ldquo;Take it and go.&rdquo;</span>{" "}
                  But you probably won&apos;t want to.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Clickable prototype", "UX + Strategy", "Real-time iteration", "Yours to keep"].map((t) => (
                    <span key={t} className="text-[11px] px-3 py-1 rounded-full font-bold text-[#080808]" style={{ background: "#00ff8820", color: "#00ff88", border: "1px solid #00ff8830" }}>{t}</span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-[#080808] transition-all hover:scale-[1.02]"
                  style={{ background: "#00ff88", boxShadow: "0 0 20px #00ff8860, 0 0 40px #00ff8830" }}
                >
                  Book a sprint
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="flex flex-col items-center py-1">
            <div className="w-px h-4 bg-[#080808]/10" />
            <svg className="w-3 h-3 text-[#080808]/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* TIER 3 — Full Build (dark) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-12 relative overflow-hidden"
            style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex-shrink-0 sm:w-36">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2">03 / Full</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white/40" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  Full engagement
                </span>
                <p className="mt-2 text-sm font-bold text-white/40">Ongoing</p>
              </div>
              <div className="flex-1">
                <h3 className="text-4xl font-black text-white mb-1 tracking-tight">Full Build</h3>
                <p className="text-xs text-white/30 mb-4">Design system to dev-ready handoff.</p>
                <p className="text-sm text-white/40 leading-relaxed mb-5">
                  Amir and Keren in full collaboration. A scalable component library, responsive layouts, and developer documentation so precise your engineers will thank you.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Design system", "Figma library", "Dev handoff docs", "Ongoing support"].map((t) => (
                    <span key={t} className="text-[11px] px-3 py-1 rounded-full font-medium text-white/40" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  Start the full build →
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#080808]/30 text-sm mt-10"
        >
          Not sure?{" "}
          <a href="#audit" className="font-bold underline underline-offset-4 hover:text-[#080808] transition-colors" style={{ textDecorationColor: "#00cc66" }}>
            Try the free audit.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
