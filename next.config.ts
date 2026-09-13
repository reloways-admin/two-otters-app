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
    ];
  },
};

// Proxies BotID's challenge script through our own domain. Without this an
// ad-blocker can drop the third-party request and the protection quietly
// weakens to nothing, with no error to notice.
export default withBotId(nextConfig);
