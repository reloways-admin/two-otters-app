import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  // resvg ships a native binary — don't bundle it; require it at runtime.
  serverExternalPackages: ["@resvg/resvg-js"],

  async headers() {
    return [
      {
        // Deployment URLs serve the whole site too. The canonical tag already
        // points at two-otters.studio, but this is the unambiguous version:
        // a crawler that reaches a *.vercel.app host is told not to index it.
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        // v8 was the homepage until v10 replaced it; it stays reachable at /v8
        // as history (robots.ts disallows it too). A header, not page metadata,
        // so v8's own files stay exactly as they shipped.
        source: "/v8",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },

  async redirects() {
    return [
      // Booking isn't live yet (it stays on site-next), so the booking
      // addresses lead to the contact form instead of a page that can fail.
      { source: "/schedule-a-call", destination: "/contact", permanent: true },
      { source: "/v10/schedule-a-call", destination: "/contact", permanent: true },
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
