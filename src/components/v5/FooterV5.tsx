"use client";
import type en from "@/locales/en.json";

type FooterTranslations = typeof en["footer"];

interface FooterV5Props {
  t: FooterTranslations;
  isRTL: boolean;
}

export default function FooterV5({ t, isRTL }: FooterV5Props) {
  return (
    <footer style={{ background: "#0F172A", color: "white", padding: "56px 32px 32px" }}>
      <div
        className="v5-footer-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 17,
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                background: "var(--v5-accent-light)",
                borderRadius: "var(--v5-r-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              🦦
            </span>
            Two Otters Studio
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>
            {t.tagline}
          </p>
        </div>

        {/* Nav */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 14,
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {t.navLabel}
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {t.nav.map((link, i) => (
              <li key={i} style={{ marginBottom: 9 }}>
                <a
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontSize: 13,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--v5-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 14,
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {t.contactLabel}
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {t.contactLinks.map((link, i) => (
              <li key={i} style={{ marginBottom: 9 }}>
                <a
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontSize: 13,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--v5-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1100,
          margin: "28px auto 0",
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          textAlign: "center",
          fontSize: 12,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        {t.copy}
      </div>
    </footer>
  );
}
