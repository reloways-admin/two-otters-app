"use client";

import { motion } from "framer-motion";

const pains = [
  {
    trigger: "Again?",
    headline: "You paid. You waited.\nIt wasn't what you imagined.",
    subtext:
      "Agencies deliver something. It just never quite matches what was in your head. So now you're starting over — and you're not willing to go through that again.",
    number: "01",
  },
  {
    trigger: "I can't explain it.",
    headline: "You know exactly what you want.\nYou just can't make anyone else see it.",
    subtext:
      "You leave every meeting with the feeling they didn't really get it. What comes out doesn't look like what you imagined. Again.",
    number: "02",
  },
  {
    trigger: "I don't have time.",
    headline: "You don't have eight months\nfor another process.",
    subtext:
      "You have a business to run. Every month the product isn't live is money and momentum slipping away.",
    number: "03",
  },
  {
    trigger: "Not again.",
    headline: "You already invested.\nNot doing it again without seeing it first.",
    subtext:
      "A process that ends in a PDF and a list of tickets is not a process. You want to see the result before you commit.",
    number: "04",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function PainV2() {
  return (
    <section className="py-28 px-6 bg-stone-950 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 mb-4">
            Sound familiar?
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.0] tracking-tight">
            You&apos;ve been
            <br />
            here before.
          </h2>
        </motion.div>

        {/* Pain grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {pains.map((pain) => (
            <motion.div
              key={pain.trigger}
              variants={cardVariants}
              className="group relative rounded-2xl border border-white/5 bg-stone-900/50 p-7 overflow-hidden cursor-default hover:border-white/10 hover:bg-stone-900 transition-all duration-300"
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.03] select-none leading-none">
                {pain.number}
              </span>

              {/* Teal hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-600/0 to-teal-600/0 group-hover:from-teal-600/5 group-hover:to-transparent transition-all duration-500" />

              <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400 mb-5">
                {pain.trigger}
              </p>

              <h3 className="relative text-lg font-bold text-white leading-snug mb-3 whitespace-pre-line">
                {pain.headline}
              </h3>

              <p className="relative text-sm text-stone-400 leading-relaxed">
                {pain.subtext}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center text-stone-500 text-sm"
        >
          There is a better way — and it starts with seeing, not imagining.{" "}
          <a
            href="#promise"
            className="text-white font-semibold underline underline-offset-4 hover:text-teal-400 transition-colors"
          >
            Here&apos;s how.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
