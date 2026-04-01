"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type ProcessTranslations = typeof en["process"];

interface ProcessV5Props {
  t: ProcessTranslations;
  isRTL: boolean;
}

const stepPaints = [
  "var(--v5-paint-peach)",
  "var(--v5-paint-mint)",
  "var(--v5-paint-sky)",
  "var(--v5-paint-lavender)",
  "var(--v5-paint-lemon)",
];

const stepColors = [
  "var(--v5-accent)",
  "var(--v5-teal)",
  "#3B82F6",
  "#7C3AED",
  "#D97706",
];

export default function ProcessV5({ t, isRTL }: ProcessV5Props) {
  return (
    <section
      id="process"
      style={{
        padding: "96px 32px",
        background: "var(--v5-white)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
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
              marginBottom: 12,
            }}
          >
            {t.heading}
          </motion.h2>
          <p style={{ fontSize: 17, color: "var(--v5-text-body)", maxWidth: 500, margin: "0 auto" }}>
            {t.sub}
          </p>
        </div>

        {/* Steps */}
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              className="v5-step"
              style={{
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
                paddingBlock: 24,
                position: "relative",
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "var(--v5-r-md)",
                  background: stepPaints[i],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-heading)",
                  fontSize: 20,
                  fontWeight: 900,
                  color: stepColors[i],
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {i + 1}
              </div>

              {/* Content card */}
              <div
                style={{
                  flex: 1,
                  background: "white",
                  border: "1.5px solid var(--v5-border)",
                  borderRadius: "var(--v5-r-lg)",
                  padding: "20px 24px",
                  boxShadow: "var(--v5-shadow-sm)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "var(--v5-text-dark)",
                    marginBottom: 6,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--v5-text-body)", lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
