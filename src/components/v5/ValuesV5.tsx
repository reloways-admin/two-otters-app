"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type ValuesTranslations = typeof en["values"];

interface ValuesV5Props {
  t: ValuesTranslations;
  isRTL: boolean;
}

const cardPaints = [
  "var(--v5-paint-peach)",
  "var(--v5-paint-mint)",
  "var(--v5-paint-sky)",
  "var(--v5-paint-lavender)",
  "var(--v5-paint-lemon)",
  "var(--v5-paint-rose)",
];

export default function ValuesV5({ t, isRTL }: ValuesV5Props) {
  return (
    <section
      id="values"
      style={{
        padding: "96px 32px",
        background: "var(--v5-paint-sky)",
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
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 900,
              color: "var(--v5-text-dark)",
            }}
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* Grid */}
        <div
          className="v5-values-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {t.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.09 }}
              whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
              style={{
                background: "white",
                borderRadius: "var(--v5-r-lg)",
                padding: "32px 24px",
                boxShadow: "var(--v5-shadow-sm)",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
            >
              {/* Emoji on paint surface */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: cardPaints[i % cardPaints.length],
                  borderRadius: "var(--v5-r-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  marginBottom: 18,
                }}
              >
                {card.emoji}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 17,
                  fontWeight: 800,
                  color: "var(--v5-text-dark)",
                  marginBottom: 10,
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--v5-text-body)", lineHeight: 1.7 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
