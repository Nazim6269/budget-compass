import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.7.42:4222/api/:path*",
      },
    ];
  },
};

export default nextConfig;
