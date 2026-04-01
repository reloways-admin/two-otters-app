"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type ProcessTranslations = typeof en["process"];

interface ProcessV4Props {
  t: ProcessTranslations;
  isRTL: boolean;
}

const stepColors = [
  { bg: "var(--v4-orange)", shadow: "rgba(244,125,32,0.3)" },
  { bg: "var(--v4-coral)", shadow: "rgba(255,111,97,0.3)" },
  { bg: "var(--v4-teal)", shadow: "rgba(0,178,160,0.3)" },
  { bg: "var(--v4-lavender)", shadow: "rgba(195,177,225,0.3)" },
  { bg: "var(--v4-navy)", shadow: "rgba(44,37,73,0.3)" },
];

export default function ProcessV4({ t, isRTL }: ProcessV4Props) {
  return (
    <section
      id="process"
      style={{
        padding: "100px 32px",
        background: "var(--v4-cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Wave top */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -2,
          left: 0,
          right: 0,
          lineHeight: 0,
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
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
              marginBottom: 12,
            }}
          >
            {t.heading}
          </motion.h2>
          <p style={{ fontSize: 18, color: "var(--v4-text-body)", maxWidth: 520, margin: "0 auto" }}>
            {t.sub}
          </p>
        </div>

        {/* Steps */}
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="v4-process-step"
              style={{
                display: "flex",
                gap: 28,
                alignItems: "flex-start",
                paddingBlock: 28,
                position: "relative",
              }}
            >
              {/* Step number */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: stepColors[i].bg,
                  boxShadow: `0 4px 16px ${stepColors[i].shadow}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-heading)",
                  fontSize: 22,
                  fontWeight: 900,
                  color: "white",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {i + 1}
              </div>

              {/* Content */}
              <div style={{ paddingTop: 8 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "var(--v4-navy)",
                    marginBottom: 6,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: "var(--v4-text-body)", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          lineHeight: 0,
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
