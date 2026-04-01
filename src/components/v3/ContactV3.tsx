"use client";

import { motion } from "framer-motion";

export function ContactV3() {
  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden" style={{ background: "#080808" }}>

      {/* Neon scan line */}
      <motion.div
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, #00ff8820 30%, #00ff8870 50%, #00ff8820 70%, transparent 100%)" }}
      />

      {/* Giant ghost word */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
      >
        <span
          className="font-black leading-none whitespace-nowrap"
          style={{ fontSize: "28vw", color: "rgba(0,255,136,0.018)" }}
        >
          2 WEEKS
        </span>
      </div>

      <div className="max-w-5xl mx-auto relative">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] font-black uppercase tracking-[0.25em] mb-10"
          style={{ color: "#00ff88" }}
        >
          Let&apos;s work together
        </motion.p>

        {/* Staggered headline */}
        {["Two weeks from", "now, you'll have", "something real."].map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.12 }}
              className="font-black text-white leading-[0.92] tracking-[-0.03em] mb-1"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 7.5rem)",
                ...(i === 1 ? { color: "#00ff88", textShadow: "0 0 60px #00ff8860" } : {}),
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 mb-10 flex flex-wrap gap-6"
        >
          {[
            "We respond within 24 hours",
            "First conversation is free",
            "No commitment until you see it",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-white/30">
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#00ff88" }} />
              {item}
            </div>
          ))}
        </motion.div>

        {/* Contact blocks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="mailto:hello@twootterstudio.com"
            className="group flex-1 flex items-center justify-between gap-4 px-8 py-6 rounded-2xl transition-all duration-200"
            style={{ background: "#00ff88", boxShadow: "0 0 30px #00ff8850, 0 0 60px #00ff8820" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 50px #00ff88, 0 0 100px #00ff8840"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px #00ff8850, 0 0 60px #00ff8820"; }}
          >
            <div>
              <p className="text-[#080808] font-black text-xl leading-none">Email us</p>
              <p className="font-mono text-[#00804d] text-xs mt-1">hello@twootterstudio.com</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#080808]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#080808]/20 transition-colors">
              <svg className="w-5 h-5 text-[#080808]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </a>

          <a
            href="https://wa.me/972000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 flex items-center justify-between gap-4 px-8 py-6 rounded-2xl transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,136,0.2)";
              (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
            }}
          >
            <div>
              <p className="text-white font-black text-xl leading-none">WhatsApp</p>
              <p className="text-white/30 text-xs mt-1">Quick questions welcome</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-xs text-white/20"
        >
          Not ready?{" "}
          <a href="#audit" className="underline underline-offset-4 hover:text-white/50 transition-colors" style={{ textDecorationColor: "#00ff8850" }}>
            Start with the free audit.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
