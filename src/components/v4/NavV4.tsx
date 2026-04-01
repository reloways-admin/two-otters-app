"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type en from "@/locales/en.json";

type NavTranslations = typeof en["nav"];

interface NavV4Props {
  t: NavTranslations;
  isRTL: boolean;
  lang: "en" | "he";
  onLangChange: (lang: "en" | "he") => void;
}

export default function NavV4({ t, isRTL, lang, onLangChange }: NavV4Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLang = lang === "en" ? "he" : "en";

  return (
    <nav className={`v4-nav ${scrolled ? "scrolled" : ""}`}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 32px" }}
        className="flex justify-between items-center"
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 no-underline"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 20,
            color: "var(--v4-navy)",
          }}
        >
          <span
            style={{
              width: 40,
              height: 40,
              background: "var(--v4-orange)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 4px 12px rgba(244,125,32,0.25)",
            }}
          >
            🦦
          </span>
          {t.logo}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {t.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "var(--v4-text-body)",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--v4-orange)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--v4-text-body)")
              }
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => onLangChange(otherLang)}
            style={{
              border: "1.5px solid var(--v4-teal)",
              borderRadius: "var(--v4-radius-pill)",
              padding: "4px 14px",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--v4-teal)",
              background: "transparent",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {t.langToggle[otherLang]}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="v4-btn v4-btn-orange"
            style={{ padding: "10px 24px", fontSize: 14 }}
          >
            {t.cta}
          </a>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => onLangChange(otherLang)}
            style={{
              border: "1.5px solid var(--v4-teal)",
              borderRadius: "var(--v4-radius-pill)",
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--v4-teal)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {t.langToggle[otherLang]}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="Toggle menu"
          >
            <div
              style={{
                width: 22,
                height: 2,
                background: "var(--v4-navy)",
                marginBottom: 5,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <div
              style={{
                width: 22,
                height: 2,
                background: "var(--v4-navy)",
                marginBottom: 5,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            />
            <div
              style={{
                width: 22,
                height: 2,
                background: "var(--v4-navy)",
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
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
            transition={{ duration: 0.25 }}
            style={{
              background: "rgba(255,253,251,0.98)",
              borderTop: "1px solid rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            <div
              style={{ padding: "16px 32px 24px" }}
              className="flex flex-col gap-4"
            >
              {t.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "var(--v4-text-body)",
                    fontSize: 16,
                    fontWeight: 500,
                    textDecoration: "none",
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="v4-btn v4-btn-orange"
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
