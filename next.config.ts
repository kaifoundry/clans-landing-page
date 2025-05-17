import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
    domains: ['pbs.twimg.com'], 
  },

    turbopack: {
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  productionBrowserSourceMaps: false, 
  webpack(config) {
    return config;
  },
};

export default nextConfig;