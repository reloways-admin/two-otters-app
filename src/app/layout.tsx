import type { Metadata } from "next";
import "./globals.css";
import "./v4/styles.css";

export const metadata: Metadata = {
  title: "Two Otters — Free AI Audit",
  description:
    "Get a free UX & strategy audit of your product from Agent Amir and Agent Keren.",
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
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
