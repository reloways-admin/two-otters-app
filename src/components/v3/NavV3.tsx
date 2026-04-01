"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NavV3() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Services", href: "#tiers" },
    { label: "Process", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#080808]/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span>🦦🦦</span>
          <span className="font-black text-white text-sm tracking-tight">Two Otters</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#audit" className="text-xs px-4 py-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all">
            Free audit
          </a>
          {/* Neon CTA */}
          <a
            href="#contact"
            className="text-xs px-5 py-2 rounded-full font-bold text-[#080808] transition-all"
            style={{
              background: "#00ff88",
              boxShadow: "0 0 16px #00ff8860, 0 0 32px #00ff8830",
            }}
          >
            Book a sprint
          </a>
        </div>

        <button className="md:hidden text-white/50 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080808] border-t border-white/5 px-6 py-5 flex flex-col gap-4 overflow-hidden"
          >
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-white/50 hover:text-white">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm text-center py-2 rounded-full font-bold text-[#080808]" style={{ background: "#00ff88" }}>
              Book a sprint
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
