import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
