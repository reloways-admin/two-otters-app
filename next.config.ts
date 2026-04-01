import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow large file uploads for the audit tool
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default nextConfig;
