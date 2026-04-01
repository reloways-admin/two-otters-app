"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type FaqTranslations = typeof en["faq"];

interface FaqV5Props {
  t: FaqTranslations;
  isRTL: boolean;
}

export default function FaqV5({ t, isRTL }: FaqV5Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        padding: "96px 32px",
        background: "var(--v5-paint-lemon)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="v5-tag" style={{ marginBottom: 16 }}>{t.label}</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(24px, 4vw, 38px)",
              fontWeight: 900,
              color: "var(--v5-text-dark)",
            }}
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* FAQ list */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "white",
            borderRadius: "var(--v5-r-xl)",
            boxShadow: "var(--v5-shadow-md)",
            overflow: "hidden",
          }}
        >
          {t.items.map((item, i) => (
            <div
              key={i}
              style={{ borderBottom: i < t.items.length - 1 ? "1px solid var(--v5-border)" : "none" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "start",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "22px 28px",
                  cursor: "pointer",
                  background: openIndex === i ? "var(--v5-accent-light)" : "white",
                  border: "none",
                  gap: 16,
                  fontSize: 16,
                  fontWeight: 700,
                  color: openIndex === i ? "var(--v5-accent)" : "var(--v5-text-dark)",
                  fontFamily: "var(--font-body)",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <span>{item.q}</span>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: openIndex === i ? "var(--v5-accent)" : "var(--v5-accent-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: openIndex === i ? "white" : "var(--v5-accent)",
                    flexShrink: 0,
                    transform: openIndex === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.28s, background 0.2s, color 0.2s",
                  }}
                >
                  +
                </span>
              </button>
              <div className={`v5-faq-body ${openIndex === i ? "open" : ""}`}>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--v5-text-body)",
                    lineHeight: 1.8,
                    padding: "0 28px 22px",
                    margin: 0,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
