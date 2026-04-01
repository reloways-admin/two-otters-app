"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type AboutTranslations = typeof en["about"];

interface AboutV4Props {
  t: AboutTranslations;
  isRTL: boolean;
}

export default function AboutV4({ t, isRTL }: AboutV4Props) {
  const headingLines = t.heading.split("\n");

  return (
    <section
      id="about"
      style={{
        padding: "120px 32px 100px",
        background: "var(--v4-cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Wave top (from navy) */}
      <div
        aria-hidden
        style={{ position: "absolute", top: -2, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}
      >
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="var(--v4-navy)" />
        </svg>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div
          className="v4-about-layout"
          style={{ display: "flex", gap: 56, alignItems: "center" }}
        >
          {/* Text side */}
          <div style={{ flex: 1 }}>
            <div className="v4-section-tag" style={{ marginBottom: 20 }}>
              {t.label}
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 4vw, 38px)",
                fontWeight: 900,
                color: "var(--v4-navy)",
                marginBottom: 20,
                lineHeight: 1.3,
              }}
            >
              {headingLines[0]}
              {headingLines[1] && (
                <>
                  <br />
                  {headingLines[1]}
                </>
              )}
            </motion.h2>

            {t.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{
                  fontSize: 16,
                  color: "var(--v4-text-body)",
                  marginBottom: 16,
                  lineHeight: 1.8,
                }}
              >
                {para}
              </motion.p>
            ))}

            {/* Team cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginTop: 28,
              }}
            >
              {[t.amir, t.keren].map((person, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: "var(--v4-radius-md)",
                    padding: 20,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    borderTop: `3px solid ${i === 0 ? "var(--v4-orange)" : "var(--v4-teal)"}`,
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--v4-navy)",
                      marginBottom: 4,
                    }}
                  >
                    {person.name}
                  </h4>
                  <p style={{ fontSize: 13, color: "var(--v4-text-muted)", margin: 0 }}>
                    {person.role}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image placeholder */}
          <div style={{ flex: "0 0 360px" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                width: "100%",
                height: 420,
                background: "linear-gradient(135deg, var(--v4-orange-light), var(--v4-teal-light))",
                borderRadius: "var(--v4-radius-xl)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 64,
                gap: 12,
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  background: "var(--v4-orange)",
                  opacity: 0.07,
                  borderRadius: "50%",
                  top: -40,
                  insetInlineStart: -40,
                }}
              />
              🦦🦦
              <span style={{ fontSize: 14, color: "var(--v4-text-muted)" }}>
                {t.imgPlaceholder}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
