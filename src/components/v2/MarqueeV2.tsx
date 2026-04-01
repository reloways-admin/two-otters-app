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
  "Figma-ready · Dev-ready",
];

export function MarqueeV2() {
  // Duplicate items for seamless loop
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative py-5 bg-teal-500 overflow-hidden select-none">
      {/* Fade masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-teal-500 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-teal-500 to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="flex gap-0 whitespace-nowrap"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center text-teal-950 text-xs font-bold uppercase tracking-[0.15em]"
          >
            {item}
            <span className="mx-8 w-1 h-1 rounded-full bg-teal-700/50 inline-block flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
