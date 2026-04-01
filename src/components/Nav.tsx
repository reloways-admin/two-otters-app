"use client";

import { useState, useEffect } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Services", href: "#tiers" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About us", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-stone-900 text-lg">
          <span className="text-xl">🦦🦦</span>
          <span className="hidden sm:inline">Two Otters</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Dual CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* Ghost — low friction entry */}
          <a
            href="#audit"
            className="text-sm px-4 py-2 rounded-full border border-stone-200 text-stone-600 hover:border-teal-400 hover:text-teal-600 transition-colors font-medium"
          >
            Free audit
          </a>
          {/* Filled — primary conversion */}
          <a
            href="#contact"
            className="text-sm px-5 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-700 transition-colors font-medium"
          >
            Book a sprint
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-stone-600 hover:text-stone-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-stone-600 hover:text-stone-900"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-stone-100">
            <a
              href="#audit"
              onClick={() => setMenuOpen(false)}
              className="text-sm px-4 py-2 rounded-full border border-stone-200 text-stone-600 text-center font-medium"
            >
              Free audit
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-sm px-4 py-2 rounded-full bg-stone-900 text-white text-center font-medium"
            >
              Book a sprint
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
