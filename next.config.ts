import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
    domains: ['pbs.twimg.com'], // ✅ Add this line
  },
  productionBrowserSourceMaps: false, 
  webpack(config) {
    return config;
  },
};

export default nextConfig;