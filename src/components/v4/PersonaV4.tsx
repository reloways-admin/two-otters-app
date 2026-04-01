"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type PersonaTranslations = typeof en["persona"];

interface PersonaV4Props {
  t: PersonaTranslations;
  isRTL: boolean;
}

export default function PersonaV4({ t, isRTL }: PersonaV4Props) {
  return (
    <section
      id="persona"
      style={{
        padding: "100px 32px",
        background: "var(--v4-navy)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Wave top */}
      <div
        aria-hidden
        style={{ position: "absolute", top: -2, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}
      >
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            className="v4-section-tag v4-section-tag-dark"
            style={{ marginBottom: 16 }}
          >
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
              color: "white",
              lineHeight: 1.25,
            }}
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* Yes/No boxes */}
        <div
          className="v4-persona-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
        >
          {/* Yes */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: "rgba(0,178,160,0.12)",
              borderRadius: "var(--v4-radius-lg)",
              padding: 36,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 22,
                fontWeight: 800,
                color: "var(--v4-teal)",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {t.yesTitle}
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {t.yesItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "10px 0",
                    fontSize: 15,
                    color: "rgba(255,255,255,0.82)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    borderBottom: i < t.yesItems.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ flexShrink: 0, marginTop: 3 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* No */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: "rgba(255,111,97,0.1)",
              borderRadius: "var(--v4-radius-lg)",
              padding: 36,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 22,
                fontWeight: 800,
                color: "var(--v4-coral)",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {t.noTitle}
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {t.noItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "10px 0",
                    fontSize: 15,
                    color: "rgba(255,255,255,0.82)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    borderBottom: i < t.noItems.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ flexShrink: 0, marginTop: 3 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Moments */}
        <div style={{ marginTop: 48 }}>
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 20,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {t.momentsLabel}
          </p>
          <div
            className="v4-moments-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}
          >
            {t.moments.map((moment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "var(--v4-radius-md)",
                  padding: "24px 16px",
                  textAlign: "center",
                  transition: "transform 0.3s, background 0.3s",
                  cursor: "default",
                }}
                whileHover={{ y: -4, background: "rgba(255,255,255,0.1)" }}
              >
                <span style={{ fontSize: 32, marginBottom: 10, display: "block" }}>
                  {moment.emoji}
                </span>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "white",
                    marginBottom: 6,
                  }}
                >
                  {moment.title}
                </h4>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                  {moment.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
