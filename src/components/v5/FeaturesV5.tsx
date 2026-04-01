"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type FeaturesTranslations = typeof en["features"];

interface FeaturesV5Props {
  t: FeaturesTranslations;
  isRTL: boolean;
}

const cardAccents = [
  { bg: "var(--v5-paint-peach)", icon: "var(--v5-accent-light)", dot: "var(--v5-accent)" },
  { bg: "var(--v5-paint-mint)",  icon: "var(--v5-teal-light)",   dot: "var(--v5-teal)" },
  { bg: "var(--v5-paint-sky)",   icon: "#E8F3FF",                dot: "#3B82F6" },
];

export default function FeaturesV5({ t, isRTL }: FeaturesV5Props) {
  return (
    <section
      id="features"
      style={{
        padding: "96px 32px",
        background: "var(--v5-paint-mint)",
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
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            {t.heading}
          </motion.h2>
          <p style={{ fontSize: 17, color: "var(--v5-text-body)", maxWidth: 500, margin: "0 auto" }}>
            {t.sub}
          </p>
        </div>

        {/* Cards */}
        <div
          className="v5-features-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        >
          {t.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(0,0,0,0.09)" }}
              style={{
                background: "white",
                borderRadius: "var(--v5-r-lg)",
                padding: "36px 28px",
                boxShadow: "var(--v5-shadow-md)",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "var(--v5-r-md)",
                  background: cardAccents[i].bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  marginBottom: 20,
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "var(--v5-text-dark)",
                  marginBottom: 10,
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--v5-text-body)", lineHeight: 1.7 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            maxWidth: 680,
            margin: "44px auto 0",
            background: "white",
            borderRadius: "var(--v5-r-lg)",
            padding: "32px 40px",
            boxShadow: "var(--v5-shadow-md)",
            borderLeft: "4px solid var(--v5-accent)",
          }}
        >
          <p
            style={{
              fontSize: 18,
              color: "var(--v5-text-dark)",
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {t.quote}
          </p>
          <p style={{ fontSize: 13, color: "var(--v5-text-muted)", marginTop: 10 }}>{t.quoteAttr}</p>
        </motion.div>
      </div>
    </section>
  );
}
