"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type PersonaTranslations = typeof en["persona"];

interface PersonaV5Props {
  t: PersonaTranslations;
  isRTL: boolean;
}

export default function PersonaV5({ t, isRTL }: PersonaV5Props) {
  return (
    <section
      id="persona"
      style={{
        padding: "96px 32px",
        background: "var(--v5-paint-lavender)",
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
              lineHeight: 1.25,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* Yes / No */}
        <div
          className="v5-persona-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          {/* Yes */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{
              background: "white",
              borderRadius: "var(--v5-r-lg)",
              padding: "36px 32px",
              boxShadow: "var(--v5-shadow-md)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 18,
                fontWeight: 800,
                color: "var(--v5-teal)",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t.yesTitle}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.yesItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "11px 0",
                    fontSize: 14,
                    color: "var(--v5-text-body)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    borderBottom: i < t.yesItems.length - 1 ? "1px solid var(--v5-border)" : "none",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      background: "var(--v5-teal-light)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: "var(--v5-teal)",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* No */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{
              background: "white",
              borderRadius: "var(--v5-r-lg)",
              padding: "36px 32px",
              boxShadow: "var(--v5-shadow-md)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 18,
                fontWeight: 800,
                color: "var(--v5-accent)",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t.noTitle}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.noItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "11px 0",
                    fontSize: 14,
                    color: "var(--v5-text-body)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    borderBottom: i < t.noItems.length - 1 ? "1px solid var(--v5-border)" : "none",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      background: "var(--v5-accent-light)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: "var(--v5-accent)",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    ×
                  </span>
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
              color: "var(--v5-text-muted)",
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 20,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            {t.momentsLabel}
          </p>
          <div
            className="v5-moments-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}
          >
            {t.moments.map((moment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: "var(--v5-shadow-md)" }}
                style={{
                  background: "white",
                  border: "1.5px solid var(--v5-border)",
                  borderRadius: "var(--v5-r-lg)",
                  padding: "22px 14px",
                  textAlign: "center",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  boxShadow: "var(--v5-shadow-sm)",
                }}
              >
                <span style={{ fontSize: 28, marginBottom: 10, display: "block" }}>{moment.emoji}</span>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--v5-text-dark)", marginBottom: 5 }}>
                  {moment.title}
                </h4>
                <p style={{ fontSize: 11, color: "var(--v5-text-muted)", lineHeight: 1.5 }}>
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
