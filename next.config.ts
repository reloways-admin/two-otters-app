import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // resvg ships a native binary — don't bundle it; require it at runtime.
  serverExternalPackages: ["@resvg/resvg-js"],
};

export default nextConfig;
