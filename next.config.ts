import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow any Cloudflare tunnel subdomain (tunnels rotate on restart)
      {
        protocol: "https",
        hostname: "**.trycloudflare.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kind-panels-machine-participant.trycloudflare.com",
      },     // Local backend fallback
      {
        protocol: "http",
        hostname: "192.168.7.42",
        port: "4222",
        pathname: "/**",
      },
    ],
  },
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
