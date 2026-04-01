"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type FaqTranslations = typeof en["faq"];

interface FaqV4Props {
  t: FaqTranslations;
  isRTL: boolean;
}

export default function FaqV4({ t, isRTL }: FaqV4Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        padding: "100px 32px",
        background: "white",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="v4-section-tag" style={{ marginBottom: 16 }}>
            {t.label}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 900,
              color: "var(--v4-navy)",
            }}
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* FAQ list */}
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {t.items.map((item, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "start",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "22px 0",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  gap: 16,
                  fontSize: 17,
                  fontWeight: 700,
                  color: openIndex === i ? "var(--v4-orange)" : "var(--v4-navy)",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s",
                }}
              >
                <span>{item.q}</span>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: openIndex === i ? "var(--v4-orange)" : "var(--v4-orange-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: openIndex === i ? "white" : "var(--v4-orange)",
                    flexShrink: 0,
                    transform: openIndex === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.3s, background 0.3s, color 0.3s",
                  }}
                >
                  +
                </span>
              </button>
              <div className={`v4-faq-answer ${openIndex === i ? "open" : ""}`}>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--v4-text-body)",
                    lineHeight: 1.8,
                    paddingBottom: 22,
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
