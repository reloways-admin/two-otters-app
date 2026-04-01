"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type en from "@/locales/en.json";

type NavTranslations = typeof en["nav"];

interface NavV5Props {
  t: NavTranslations;
  isRTL: boolean;
  lang: "en" | "he";
  onLangChange: (lang: "en" | "he") => void;
}

export default function NavV5({ t, isRTL, lang, onLangChange }: NavV5Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLang = lang === "en" ? "he" : "en";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`v5-nav ${scrolled ? "scrolled" : ""}`}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 32px" }}
        className="flex justify-between items-center"
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 no-underline"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 18,
            color: "var(--v5-text-dark)",
          }}
        >
          <span
            style={{
              width: 38,
              height: 38,
              background: "var(--v5-accent-light)",
              borderRadius: "var(--v5-r-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🦦
          </span>
          {t.logo}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {t.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "var(--v5-text-body)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--v5-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--v5-text-body)")}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => onLangChange(otherLang)}
            style={{
              border: "1.5px solid var(--v5-border)",
              borderRadius: "var(--v5-r-pill)",
              padding: "4px 14px",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--v5-text-body)",
              background: "white",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            {t.langToggle[otherLang]}
          </button>

          <a href="#contact" className="v5-btn v5-btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
            {t.cta}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => onLangChange(otherLang)}
            style={{
              border: "1.5px solid var(--v5-border)",
              borderRadius: "var(--v5-r-pill)",
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--v5-text-body)",
              background: "white",
              cursor: "pointer",
            }}
          >
            {t.langToggle[otherLang]}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 22,
                  height: 2,
                  background: "var(--v5-text-dark)",
                  marginBottom: i < 2 ? 5 : 0,
                  borderRadius: 2,
                  transition: "transform 0.2s, opacity 0.2s",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform:
                    menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)" :
                    menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" :
                    "none",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              background: "white",
              borderTop: "1px solid var(--v5-border)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px 32px 24px" }} className="flex flex-col gap-4">
              {t.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "var(--v5-text-body)",
                    fontSize: 16,
                    fontWeight: 500,
                    textDecoration: "none",
                    padding: "8px 0",
                    borderBottom: "1px solid var(--v5-border)",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="v5-btn v5-btn-primary"
                style={{ marginTop: 8, textAlign: "center" }}
              >
                {t.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
