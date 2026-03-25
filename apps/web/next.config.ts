import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@voygo/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
