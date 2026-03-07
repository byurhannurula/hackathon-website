import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.pravatar.cc" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
