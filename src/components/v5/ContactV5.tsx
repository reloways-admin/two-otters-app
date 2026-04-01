"use client";
import { motion } from "framer-motion";
import type en from "@/locales/en.json";

type ContactTranslations = typeof en["contact"];

interface ContactV5Props {
  t: ContactTranslations;
  isRTL: boolean;
}

export default function ContactV5({ t, isRTL }: ContactV5Props) {
  return (
    <section
      id="contact"
      style={{
        padding: "96px 32px",
        background: "var(--v5-white)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Paint surface card wrapper */}
        <div
          style={{
            background: "var(--v5-paint-mint)",
            borderRadius: "var(--v5-r-xl)",
            padding: "64px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative paint blobs */}
          <div
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              background: "var(--v5-paint-peach)",
              borderRadius: "50%",
              top: -60,
              right: -60,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 160,
              height: 160,
              background: "var(--v5-paint-lavender)",
              borderRadius: "50%",
              bottom: -40,
              left: -40,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div className="v5-tag" style={{ marginBottom: 16 }}>{t.label}</div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(26px, 4vw, 42px)",
                  fontWeight: 900,
                  color: "var(--v5-text-dark)",
                  marginBottom: 10,
                }}
              >
                {t.heading}
              </motion.h2>
              <p style={{ fontSize: 17, color: "var(--v5-text-body)", maxWidth: 440, margin: "0 auto" }}>
                {t.sub}
              </p>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              onSubmit={(e) => e.preventDefault()}
              style={{ maxWidth: 600, margin: "0 auto" }}
            >
              <div
                className="v5-form-grid"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
              >
                <input className="v5-input" type="text"  placeholder={t.fields.name} />
                <input className="v5-input" type="email" placeholder={t.fields.email} />
                <input className="v5-input" type="tel"   placeholder={t.fields.phone} />
                <input className="v5-input" type="text"  placeholder={t.fields.company} />
                <input
                  className="v5-input"
                  type="text"
                  placeholder={t.fields.role}
                  style={{ gridColumn: "1 / -1" }}
                />
                <textarea
                  className="v5-input v5-textarea"
                  placeholder={t.fields.message}
                  style={{ gridColumn: "1 / -1" }}
                />
              </div>

              <button
                type="submit"
                className="v5-btn v5-btn-primary"
                style={{ display: "block", width: "100%", marginTop: 14, textAlign: "center", fontSize: 16, padding: "16px" }}
              >
                {t.submit}
              </button>
            </motion.form>

            {/* Trust signals */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 28,
                marginTop: 28,
                flexWrap: "wrap",
              }}
            >
              {t.trust.map((signal, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 13,
                    color: "var(--v5-text-body)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      background: "var(--v5-teal-light)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: "var(--v5-teal)",
                    }}
                  >
                    ✓
                  </span>
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
