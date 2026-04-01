"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type HeroTranslations = typeof en["hero"];

interface HeroV4Props {
  t: HeroTranslations;
  isRTL: boolean;
}

export default function HeroV4({ t, isRTL }: HeroV4Props) {
  return (
    <section
      style={{
        padding: "160px 32px 100px",
        background: "var(--v4-cream)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Floating decorative shapes */}
      <div
        className="v4-hero-shape v4-blob"
        style={{
          width: 180,
          height: 180,
          background: "var(--v4-orange)",
          opacity: 0.07,
          top: "8%",
          right: "-40px",
          animationDelay: "0s",
        }}
      />
      <div
        className="v4-hero-shape v4-blob"
        style={{
          width: 120,
          height: 120,
          background: "var(--v4-teal)",
          opacity: 0.08,
          top: "30%",
          left: "4%",
          animationDelay: "-2s",
        }}
      />
      <div
        className="v4-hero-shape v4-blob"
        style={{
          width: 80,
          height: 80,
          background: "var(--v4-lavender)",
          opacity: 0.1,
          bottom: "15%",
          right: "8%",
          animationDelay: "-4s",
        }}
      />
      <div
        className="v4-hero-shape v4-blob"
        style={{
          width: 60,
          height: 60,
          background: "var(--v4-coral)",
          opacity: 0.08,
          top: "18%",
          left: "18%",
          animationDelay: "-6s",
        }}
      />
      <div
        className="v4-hero-shape v4-blob"
        style={{
          width: 200,
          height: 200,
          background: "var(--v4-sky)",
          opacity: 0.05,
          bottom: "5%",
          left: "-60px",
          animationDelay: "-3s",
        }}
      />

      {/* Content */}
      <div
        style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="v4-badge-float"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "white",
            padding: "8px 20px",
            borderRadius: "var(--v4-radius-pill)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--v4-orange)",
            marginBottom: 28,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          {t.eyebrow}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(36px, 6vw, 58px)",
            fontWeight: 900,
            lineHeight: 1.15,
            color: "var(--v4-navy)",
            marginBottom: 20,
          }}
        >
          {t.headlinePart1}
          <br />
          {t.headlinePart2}{" "}
          <span
            style={{
              color: "var(--v4-orange)",
              position: "relative",
              display: "inline-block",
            }}
          >
            {t.headlineHighlight}
            <span
              style={{
                position: "absolute",
                bottom: 4,
                right: 0,
                left: 0,
                height: 12,
                background: "var(--v4-orange)",
                opacity: 0.15,
                borderRadius: 6,
                zIndex: -1,
              }}
            />
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "var(--v4-text-body)",
            maxWidth: 600,
            margin: "0 auto 36px",
            lineHeight: 1.8,
          }}
        >
          {t.sub}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="v4-hero-btns"
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <a href="#contact" className="v4-btn v4-btn-orange">
            {t.cta1}
          </a>
          <a href="#process" className="v4-btn v4-btn-outline">
            {t.cta2}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="v4-hero-stats"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 48,
            marginTop: 56,
            flexWrap: "wrap",
          }}
        >
          {t.stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 36,
                  fontWeight: 900,
                  color: "var(--v4-navy)",
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--v4-text-muted)",
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Wave divider to next section */}
      <div className="v4-wave-bottom" style={{ bottom: -2 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#FFFDFB"
          />
        </svg>
      </div>
    </section>
  );
}
