import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: false, 
  webpack(config) {
    return config;
  },
};

export default nextConfig;