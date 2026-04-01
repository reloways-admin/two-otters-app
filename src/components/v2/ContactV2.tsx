"use client";

import { motion } from "framer-motion";

export function ContactV2() {
  return (
    <section id="contact" className="relative bg-stone-950 overflow-hidden py-28 px-6">

      {/* Giant background text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
      >
        <span className="text-[25vw] font-black text-white/[0.018] leading-none tracking-tight whitespace-nowrap">
          TWO WEEKS
        </span>
      </div>

      {/* Blob */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-900/20 blur-[120px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative">

        {/* Top label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-teal-400 mb-10"
        >
          Let&apos;s work together
        </motion.p>

        {/* Massive headline */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,9vw,8rem)] font-black text-white leading-[0.95] tracking-[-0.03em]"
          >
            Two weeks from
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[clamp(3rem,9vw,8rem)] font-black leading-[0.95] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300"
          >
            now, you&apos;ll have
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(3rem,9vw,8rem)] font-black text-white leading-[0.95] tracking-[-0.03em]"
          >
            something real.
          </motion.h2>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-6 mb-14"
        >
          {[
            "We respond within 24 hours",
            "First conversation is free — no pitch decks",
            "No commitment until you see the prototype",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-stone-500">
              <svg className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons — big, bold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="mailto:hello@twootterstudio.com"
            className="group flex items-center justify-between gap-4 px-8 py-5 rounded-2xl bg-teal-500 hover:bg-teal-400 transition-colors"
          >
            <div>
              <p className="text-stone-950 font-black text-lg leading-none">Email us</p>
              <p className="text-teal-900 text-xs mt-1 font-mono">hello@twootterstudio.com</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-400 group-hover:bg-teal-300 flex items-center justify-center transition-colors flex-shrink-0">
              <svg className="w-5 h-5 text-teal-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </a>

          <a
            href="https://wa.me/972000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 px-8 py-5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
          >
            <div>
              <p className="text-white font-black text-lg leading-none">WhatsApp</p>
              <p className="text-stone-500 text-xs mt-1">Quick questions welcome</p>
            </div>
            <div className="w-10 h-10 rounded-xl border border-white/10 group-hover:border-white/20 flex items-center justify-center transition-colors flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
          </a>
        </motion.div>

        {/* Audit fallback */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-xs text-stone-600"
        >
          Not ready to commit?{" "}
          <a href="#audit" className="text-stone-400 underline underline-offset-4 hover:text-teal-400 transition-colors">
            Start with the free audit.
          </a>
        </motion.p>

      </div>
    </section>
  );
}
