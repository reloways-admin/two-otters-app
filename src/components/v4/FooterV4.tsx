"use client";
import type en from "@/locales/en.json";

type FooterTranslations = typeof en["footer"];

interface FooterV4Props {
  t: FooterTranslations;
  isRTL: boolean;
}

export default function FooterV4({ t, isRTL }: FooterV4Props) {
  return (
    <footer style={{ background: "var(--v4-navy)", color: "white", padding: "56px 32px 32px" }}>
      <div
        className="v4-footer-grid"
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
              marginBottom: 16,
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                background: "var(--v4-orange)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🦦
            </span>
            Two Otters Studio
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
            {t.tagline}
          </p>
        </div>

        {/* Nav */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 16,
              color: "white",
            }}
          >
            {t.navLabel}
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {t.nav.map((link, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                <a
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--v4-orange)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                  }
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
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 16,
              color: "white",
            }}
          >
            {t.contactLabel}
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {t.contactLinks.map((link, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                <a
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--v4-orange)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                  }
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
          margin: "32px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
          fontSize: 13,
          color: "rgba(255,255,255,0.35)",
        }}
      >
        {t.copy}
      </div>
    </footer>
  );
}
