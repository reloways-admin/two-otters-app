import type { Metadata } from "next";
import "./globals.css";
import "./v4/styles.css";

export const metadata: Metadata = {
  // Every relative metadata URL below resolves against this, so a page rendered
  // on a preview host still points search engines at the real site.
  metadataBase: new URL("https://two-otters.studio"),
  title: "Two Otters — Free AI Audit",
  description:
    "Get a free UX & strategy audit of your product from Agent Amir and Agent Keren.",
  // Proves ownership of the site to Google Search Console (URL-prefix property
  // for https://two-otters.studio). Search Console re-checks it periodically —
  // removing this un-verifies the property, so leave it in place.
  verification: {
    google: "elGuFhxcDmbZg2Oh3xmTxubZBz3ZAabP2Q0gzI4iZlc",
  },
  alternates: {
    // "./" resolves per route, so each page declares itself canonical without
    // every layout having to repeat the URL. Language is a ?lang= param, not a
    // route, so both languages share one canonical — which is what we want.
    canonical: "./",
  },
  // The card a link shows when it is shared (WhatsApp, LinkedIn, Slack, X):
  // one image for the whole site for now. /en overrides it with the English
  // card. The images are rendered from an HTML mock-up at 1200x630, the size
  // every platform crops to.
  openGraph: {
    type: "website",
    siteName: "Two Otters Studio",
    locale: "he_IL",
    title: "Two Otters Studio · אסטרטגיה, מיתוג ו-UX ממקום אחד",
    description: "אנחנו מתחילים מהסוף, והתוצאות טובות יותר. קודם פרוטוטייפ עובד שאפשר ללחוץ עליו, ומשם מדייקים, כותבים ומעצבים.",
    images: [{ url: "/og/two-otters-he.jpg", width: 1200, height: 630, alt: "אמיר וקרן, Two Otters Studio: אנחנו מתחילים מהסוף והתוצאות טובות יותר" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/two-otters-he.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Hebrew is the primary language and the site is RTL, so that is the honest
    // default for a crawler or a screen reader reading the document cold. The
    // client syncs these when the visitor switches language — see v8/page.tsx.
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
