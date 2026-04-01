"use client";

import { motion } from "framer-motion";

export function AboutV3() {
  return (
    <section id="about" className="py-28 px-6 overflow-hidden" style={{ background: "#080808" }}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: "#00ff88" }}>Who we are</p>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">
            Two people.
            <br />
            <span className="text-white/20 font-thin">One outcome.</span>
          </h2>
        </motion.div>

        {/* Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Amir — large dark card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 rounded-2xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
            style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Neon accent line */}
            <div className="absolute top-0 left-8 right-8 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #00ff88, transparent)" }} />

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2">Agent</p>
              <h3 className="text-5xl font-black text-white tracking-tight leading-none" style={{ textShadow: "0 0 40px rgba(0,255,136,0.1)" }}>Amir</h3>
              <p className="text-sm font-medium mt-1" style={{ color: "#00cc66" }}>UX · UI · Product Design</p>
            </div>

            <p className="text-sm text-white/40 leading-relaxed my-6 font-light">
              When you show Amir what you&apos;re building, his first question isn&apos;t
              &ldquo;what should it look like?&rdquo; — it&apos;s &ldquo;what happens when the developer
              gets this?&rdquo; He thinks in systems and builds fast.
            </p>

            <div className="flex flex-wrap gap-2">
              {["Visual hierarchy", "Component systems", "Dev handoff", "User flows", "Design system"].map((s) => (
                <span key={s} className="text-[11px] px-3 py-1 rounded-full font-medium" style={{ background: "rgba(0,255,136,0.08)", color: "#00aa55", border: "1px solid rgba(0,255,136,0.15)" }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Amir quote — neon card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="md:col-span-4 rounded-2xl p-8 flex flex-col justify-between"
            style={{ background: "#00ff88" }}
          >
            <svg className="w-7 h-7 text-[#00804d]/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.598-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.598-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-[#080808] text-xl font-black leading-tight">
              &ldquo;What happens when the developer gets this?&rdquo;
            </p>
            <p className="text-[#00804d] text-xs font-bold mt-4">— Amir, always</p>
          </motion.div>

          {/* Stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3 rounded-2xl p-8 flex flex-col justify-between"
            style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Experience</p>
            <p className="text-7xl font-black leading-none" style={{ color: "#00ff88", textShadow: "0 0 40px #00ff8860" }}>
              10<span className="text-3xl">+</span>
            </p>
            <p className="text-xs text-white/30 font-medium">years shipping products</p>
          </motion.div>

          {/* Keren — large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 rounded-2xl p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
            style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="absolute top-0 left-8 right-8 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2">Agent</p>
              <h3 className="text-5xl font-black text-white tracking-tight leading-none">Keren</h3>
              <p className="text-sm font-medium mt-1 text-white/50">Strategy · Messaging · Positioning</p>
            </div>

            <p className="text-sm text-white/40 leading-relaxed my-6 font-light">
              Keren listens to what you say and hears what you mean. When a client says
              &ldquo;I don&apos;t like this button,&rdquo; Keren hears &ldquo;the message isn&apos;t landing.&rdquo;
              She ensures what gets built is strategically aligned.
            </p>

            <div className="flex flex-wrap gap-2">
              {["Value proposition", "Audience fit", "Message clarity", "Strategic narrative"].map((s) => (
                <span key={s} className="text-[11px] px-3 py-1 rounded-full font-medium text-white/30" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Keren quote — white card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-4 rounded-2xl p-8 bg-white flex flex-col justify-between"
          >
            <svg className="w-7 h-7 text-[#080808]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.598-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.598-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-[#080808] text-xl font-black leading-tight">
              &ldquo;What&apos;s the real question behind the question?&rdquo;
            </p>
            <p className="text-[#080808]/30 text-xs font-bold mt-4">— Keren, always</p>
          </motion.div>

          {/* Together — full width, neon border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-12 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{ background: "#0a0a0a", border: "1px solid #00ff8830", boxShadow: "0 0 60px #00ff8810" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, #00ff8808 0%, transparent 60%)" }} />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative">
              <p className="text-2xl md:text-3xl font-black text-white leading-tight max-w-2xl">
                Together, we are the first people who will{" "}
                <span style={{ color: "#00ff88", textShadow: "0 0 30px #00ff8860" }}>
                  fully understand what is in your head
                </span>{" "}
                — and show it back to you within two weeks.
              </p>
              <a
                href="#contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-[#080808] transition-all hover:scale-[1.03]"
                style={{ background: "#00ff88", boxShadow: "0 0 24px #00ff8870" }}
              >
                Book a sprint
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
