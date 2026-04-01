"use client";

import { motion } from "framer-motion";

const items = [
  "Working prototype in 2 weeks",
  "Zero imagination required",
  "Free audit — no email",
  "UX · Strategy · Build",
  "You see it before you commit",
  "Agent Amir + Agent Keren",
  "No commitment until confident",
];

export function MarqueeV3() {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="relative py-4 overflow-hidden select-none"
      style={{ background: "#00ff88" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #00ff88, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #00ff88, transparent)" }} />

      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center text-[#080808] text-[11px] font-black uppercase tracking-[0.18em]">
            {item}
            <span className="mx-7 text-[#080808]/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
