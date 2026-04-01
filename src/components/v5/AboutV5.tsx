"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type AboutTranslations = typeof en["about"];

interface AboutV5Props {
  t: AboutTranslations;
  isRTL: boolean;
}

export default function AboutV5({ t, isRTL }: AboutV5Props) {
  const headingLines = t.heading.split("\n");

  return (
    <section
      id="about"
      style={{
        padding: "96px 32px",
        background: "var(--v5-white)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="v5-about-layout"
          style={{ display: "flex", gap: 64, alignItems: "center" }}
        >
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ flex: "0 0 340px" }}
          >
            <div
              style={{
                width: "100%",
                height: 400,
                background: "var(--v5-paint-peach)",
                borderRadius: "var(--v5-r-xl)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 60,
                gap: 12,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative paint patches */}
              <div
                style={{
                  position: "absolute",
                  width: 160,
                  height: 160,
                  background: "var(--v5-paint-mint)",
                  borderRadius: "50%",
                  bottom: -40,
                  right: -40,
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 100,
                  height: 100,
                  background: "var(--v5-paint-lavender)",
                  borderRadius: "50%",
                  top: -20,
                  left: -20,
                  opacity: 0.7,
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>🦦🦦</span>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--v5-text-muted)",
                  fontWeight: 500,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {t.imgPlaceholder}
              </span>
            </div>
          </motion.div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <div className="v5-tag" style={{ marginBottom: 20 }}>{t.label}</div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 900,
                color: "var(--v5-text-dark)",
                marginBottom: 20,
                lineHeight: 1.3,
              }}
            >
              {headingLines[0]}
              {headingLines[1] && <><br />{headingLines[1]}</>}
            </motion.h2>

            {t.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                style={{
                  fontSize: 16,
                  color: "var(--v5-text-body)",
                  marginBottom: 14,
                  lineHeight: 1.8,
                }}
              >
                {para}
              </motion.p>
            ))}

            {/* Team cards */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.28 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 28 }}
            >
              {[t.amir, t.keren].map((person, i) => (
                <div
                  key={i}
                  style={{
                    background: i === 0 ? "var(--v5-paint-peach)" : "var(--v5-paint-mint)",
                    borderRadius: "var(--v5-r-md)",
                    padding: "18px 20px",
                    borderTop: `3px solid ${i === 0 ? "var(--v5-accent)" : "var(--v5-teal)"}`,
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--v5-text-dark)",
                      marginBottom: 4,
                    }}
                  >
                    {person.name}
                  </h4>
                  <p style={{ fontSize: 12, color: "var(--v5-text-muted)", margin: 0 }}>
                    {person.role}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
