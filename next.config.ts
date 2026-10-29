import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  // No reason to tell every visitor which framework serves the site.
  poweredByHeader: false,

  // resvg ships a native binary — don't bundle it; require it at runtime.
  serverExternalPackages: ["@resvg/resvg-js"],

  async headers() {
    return [
      {
        // Baseline browser protections, from the outside security review of
        // 24.10.2026. The CSP is Report-Only on purpose: it changes nothing
        // for visitors, it only reports what it would have blocked in the
        // browser console. Enforce it once a few weeks pass with no reports.
        // Google Fonts is the only outside origin the pages load; BotID is
        // proxied through our own domain by withBotId below, so 'self' covers
        // it. 'unsafe-inline' scripts are Next's own inline bootstrap: a nonce
        // would force every page to render per request and lose the CDN cache.
        // frame-ancestors is ignored in Report-Only, which is why
        // X-Frame-Options carries the anti-framing rule today.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "media-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
      {
        // Deployment URLs serve the whole site too. The canonical tag already
        // points at two-otters.studio, but this is the unambiguous version:
        // a crawler that reaches a *.vercel.app host is told not to index it.
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async redirects() {
    return [
      // The booking page lived at /v10/schedule-a-call while v10 was a draft.
      { source: "/v10/schedule-a-call", destination: "/schedule-a-call", permanent: true },
      // The old site switched language with ?lang=en; the English homepage
      // now has its own address. Temporary, since /en may grow into more pages.
      {
        source: "/",
        has: [{ type: "query", key: "lang", value: "en" }],
        destination: "/en",
        permanent: false,
      },
      // v10 was built under /v10 and now lives at the root. Only the page
      // addresses move: the images and video stay at /v10/*.
      { source: "/v10", destination: "/", permanent: true },
      {
        source: "/v10/:page(services|work|partners|about|contact)",
        destination: "/:page",
        permanent: true,
      },
      {
        source: "/v10/services/:service(mvp|upgrade|marketing|new-site)",
        destination: "/services/:service",
        permanent: true,
      },
    ];
  },
};

// Proxies BotID's challenge script through our own domain. Without this an
// ad-blocker can drop the third-party request and the protection quietly
// weakens to nothing, with no error to notice.
export default withBotId(nextConfig);
