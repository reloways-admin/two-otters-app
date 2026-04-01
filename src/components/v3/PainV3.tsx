"use client";

import { motion } from "framer-motion";

const pains = [
  {
    number: "01",
    trigger: "Again?",
    headline: "You paid.\nYou waited.\nIt wasn't right.",
    subtext: "Agencies deliver something. It just never matches what was in your head. So now you're starting over.",
  },
  {
    number: "02",
    trigger: "I can't explain it.",
    headline: "You know\nexactly what\nyou want.",
    subtext: "You leave every meeting with the feeling they didn't really get it. What comes out doesn't look like what you imagined.",
  },
  {
    number: "03",
    trigger: "I don't have time.",
    headline: "Not eight\nmonths for\nanother process.",
    subtext: "You have a business to run. Every month the product isn't live is money and momentum slipping away.",
  },
  {
    number: "04",
    trigger: "Not again.",
    headline: "You already\ninvested.\nNot repeating it.",
    subtext: "A process that ends in a PDF and a list of tickets is not a process. You want to see the result before you commit.",
  },
];

export function PainV3() {
  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#080808] leading-[1.0] tracking-tight">
            You&apos;ve been<br />here before.
          </h2>
          <p className="text-sm text-[#080808]/40 max-w-xs font-light">
            The problem isn&apos;t that you don&apos;t know what you want. The problem is that no one can translate it.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative border border-[#080808]/8 rounded-2xl p-7 flex flex-col gap-5 cursor-default overflow-hidden transition-all duration-300 hover:border-transparent"
              style={{
                ["--neon" as string]: "#00ff88",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 1.5px #00ff88, 0 0 20px #00ff8820";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Large ghost number */}
              <span className="absolute -top-3 -right-2 text-[7rem] font-black text-[#080808]/[0.04] leading-none select-none pointer-events-none">
                {pain.number}
              </span>

              {/* Trigger */}
              <p className="relative text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "#00cc66" }}>
                {pain.trigger}
              </p>

              {/* Headline */}
              <h3 className="relative text-xl font-black text-[#080808] leading-tight whitespace-pre-line">
                {pain.headline}
              </h3>

              <p className="relative text-sm text-[#080808]/50 leading-relaxed font-light">
                {pain.subtext}
              </p>

              {/* Bottom neon accent line — visible on hover via group */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"
                style={{ background: "#00ff88" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-[#080808]/10" />
          <a href="#promise" className="text-sm font-bold text-[#080808]/40 hover:text-[#080808] transition-colors flex items-center gap-2">
            There&apos;s a better way
            <span style={{ color: "#00cc66" }}>→</span>
          </a>
          <div className="h-px flex-1 bg-[#080808]/10" />
        </motion.div>

      </div>
    </section>
  );
}
