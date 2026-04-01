"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type ValuesTranslations = typeof en["values"];

interface ValuesV4Props {
  t: ValuesTranslations;
  isRTL: boolean;
}

const cardBgs = [
  "var(--v4-orange-light)",
  "var(--v4-teal-light)",
  "var(--v4-lavender-light)",
  "var(--v4-sky-light)",
  "var(--v4-cream-dark)",
  "var(--v4-orange-light)",
];

export default function ValuesV4({ t, isRTL }: ValuesV4Props) {
  return (
    <section
      id="values"
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
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 900,
              color: "var(--v4-navy)",
            }}
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* Grid: 3 top + 2 bottom (last card spans 2 cols) */}
        <div
          className="v4-values-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {t.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              style={{
                background: cardBgs[i % cardBgs.length],
                borderRadius: "var(--v4-radius-lg)",
                padding: "36px 28px",
                transition: "transform 0.3s",
                cursor: "default",
              }}
              whileHover={{ y: -4 }}
            >
              <span style={{ fontSize: 36, marginBottom: 14, display: "block" }}>
                {card.emoji}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "var(--v4-navy)",
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--v4-text-body)", lineHeight: 1.7 }}>
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
