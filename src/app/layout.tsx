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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
