"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type FeaturesTranslations = typeof en["features"];

interface FeaturesV4Props {
  t: FeaturesTranslations;
  isRTL: boolean;
}

const cardBgs = [
  "var(--v4-orange-light)",
  "var(--v4-teal-light)",
  "var(--v4-lavender-light)",
];

export default function FeaturesV4({ t, isRTL }: FeaturesV4Props) {
  return (
    <section
      id="features"
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
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            {t.heading}
          </motion.h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--v4-text-body)",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            {t.sub}
          </p>
        </div>

        {/* Cards */}
        <div
          className="v4-features-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}
        >
          {t.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: cardBgs[i],
                borderRadius: "var(--v4-radius-lg)",
                padding: "36px 28px",
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
              whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: 32,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--v4-navy)",
                  marginBottom: 10,
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: 15, color: "var(--v4-text-body)", lineHeight: 1.7 }}>
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
            maxWidth: 700,
            margin: "48px auto 0",
            background: "var(--v4-sky-light)",
            borderRadius: "var(--v4-radius-lg)",
            padding: "32px 40px",
            position: "relative",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: -10,
              insetInlineEnd: 28,
              fontFamily: "var(--font-heading)",
              fontSize: 80,
              color: "var(--v4-sky)",
              opacity: 0.4,
              lineHeight: 1,
            }}
          >
            "
          </span>
          <p
            style={{
              fontSize: 19,
              color: "var(--v4-navy)",
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.7,
            }}
          >
            {t.quote}
          </p>
          <p style={{ fontSize: 14, color: "var(--v4-text-muted)", marginTop: 12 }}>
            {t.quoteAttr}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
