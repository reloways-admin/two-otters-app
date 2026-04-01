"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type ContactTranslations = typeof en["contact"];

interface ContactV4Props {
  t: ContactTranslations;
  isRTL: boolean;
}

export default function ContactV4({ t, isRTL }: ContactV4Props) {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 32px 100px",
        background: "var(--v4-orange)",
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

      {/* Decorative circles */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          background: "rgba(255,255,255,0.08)",
          borderRadius: "50%",
          top: -40,
          insetInlineStart: -60,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          background: "rgba(255,255,255,0.06)",
          borderRadius: "50%",
          bottom: 20,
          insetInlineEnd: -30,
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            className="v4-section-tag"
            style={{ background: "rgba(255,255,255,0.2)", color: "white", marginBottom: 16 }}
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
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "white",
              marginBottom: 12,
            }}
          >
            {t.heading}
          </motion.h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", maxWidth: 480, margin: "0 auto" }}>
            {t.sub}
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <div
            className="v4-form-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            <input
              className="v4-input"
              type="text"
              placeholder={t.fields.name}
            />
            <input
              className="v4-input"
              type="email"
              placeholder={t.fields.email}
            />
            <input
              className="v4-input"
              type="tel"
              placeholder={t.fields.phone}
            />
            <input
              className="v4-input"
              type="text"
              placeholder={t.fields.company}
            />
            <input
              className="v4-input"
              type="text"
              placeholder={t.fields.role}
              style={{ gridColumn: "1 / -1" }}
            />
            <textarea
              className="v4-input v4-textarea"
              placeholder={t.fields.message}
              style={{ gridColumn: "1 / -1" }}
            />
          </div>

          <button
            type="submit"
            className="v4-btn v4-btn-navy"
            style={{
              display: "block",
              width: "100%",
              marginTop: 16,
              textAlign: "center",
              fontSize: 18,
              padding: "18px",
            }}
          >
            {t.submit}
          </button>
        </motion.form>

        {/* Trust signals */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          {t.trust.map((signal, i) => (
            <span
              key={i}
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.85)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16 }}>✓</span>
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
