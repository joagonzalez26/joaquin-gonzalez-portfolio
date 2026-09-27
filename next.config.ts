import type { NextConfig } from "next";

const ASSET_ORIGIN = "https://joaquin-gonzalez-portfolio.joagonzalez26.chatgpt.site";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/images/:path*", destination: ASSET_ORIGIN + "/images/:path*" },
      { source: "/fonts/:path*", destination: ASSET_ORIGIN + "/fonts/:path*" },
      { source: "/assets/:path*", destination: ASSET_ORIGIN + "/assets/:path*" },
      { source: "/og.png", destination: ASSET_ORIGIN + "/og.png" },
      { source: "/favicon.svg", destination: ASSET_ORIGIN + "/favicon.svg" }
    ];
  }
};

export default nextConfig;
