import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // Your existing one:
      {
        protocol: "https",
        hostname: "www.opencityinc.com",
      },
      // --- ADD THESE ---
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "decisive-strength-90c2dfde98.strapiapp.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "receptionhousestorageacc.blob.core.windows.net"
      }
      // --- END ---
    ],
  },
};

export default nextConfig;
