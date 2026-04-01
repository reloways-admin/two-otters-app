"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type HeroTranslations = typeof en["hero"];

interface HeroV5Props {
  t: HeroTranslations;
  isRTL: boolean;
}

export default function HeroV5({ t, isRTL }: HeroV5Props) {
  return (
    <section
      style={{
        padding: "152px 32px 96px",
        background: "var(--v5-white)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Paint surface accents — flat geometric shapes */}
      <div
        className="v5-drift"
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          background: "var(--v5-paint-peach)",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          top: -80,
          right: -120,
          zIndex: 0,
          animationDelay: "0s",
        }}
      />
      <div
        className="v5-drift"
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background: "var(--v5-paint-mint)",
          borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%",
          bottom: -60,
          left: -80,
          zIndex: 0,
          animationDelay: "-3s",
        }}
      />
      <div
        className="v5-drift"
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          background: "var(--v5-paint-lavender)",
          borderRadius: "50% 50% 40% 60% / 40% 60% 50% 50%",
          top: "30%",
          left: "6%",
          zIndex: 0,
          animationDelay: "-5s",
        }}
      />
      <div
        className="v5-drift"
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          background: "var(--v5-paint-sky)",
          borderRadius: "60% 40% 50% 50% / 60% 40% 60% 40%",
          bottom: "20%",
          right: "8%",
          zIndex: 0,
          animationDelay: "-7s",
        }}
      />

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="v5-float"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "white",
            border: "1.5px solid var(--v5-border)",
            padding: "7px 20px",
            borderRadius: "var(--v5-r-pill)",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--v5-text-body)",
            marginBottom: 32,
            boxShadow: "var(--v5-shadow-sm)",
          }}
        >
          {t.eyebrow}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(38px, 6.5vw, 64px)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "var(--v5-text-dark)",
            marginBottom: 22,
            letterSpacing: "-0.5px",
          }}
        >
          {t.headlinePart1}
          <br />
          {t.headlinePart2}{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{ color: "var(--v5-accent)", position: "relative", zIndex: 1 }}>
              {t.headlineHighlight}
            </span>
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: 2,
                left: 0,
                right: 0,
                height: "38%",
                background: "var(--v5-paint-peach)",
                borderRadius: 6,
                zIndex: 0,
              }}
            />
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          style={{
            fontSize: "clamp(16px, 2.2vw, 19px)",
            color: "var(--v5-text-body)",
            maxWidth: 580,
            margin: "0 auto 40px",
            lineHeight: 1.75,
          }}
        >
          {t.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="v5-hero-btns"
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <a href="#contact" className="v5-btn v5-btn-primary">{t.cta1}</a>
          <a href="#process" className="v5-btn v5-btn-ghost">{t.cta2}</a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="v5-hero-stats"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 64,
            flexWrap: "wrap",
          }}
        >
          {t.stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "white",
                border: "1.5px solid var(--v5-border)",
                borderRadius: "var(--v5-r-lg)",
                padding: "20px 32px",
                textAlign: "center",
                boxShadow: "var(--v5-shadow-sm)",
                minWidth: 140,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 34,
                  fontWeight: 900,
                  color: "var(--v5-accent)",
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </div>
              <div style={{ fontSize: 12, color: "var(--v5-text-muted)", marginTop: 5, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
