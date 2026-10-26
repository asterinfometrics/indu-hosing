import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/Career',
        destination: '/career',
      },
      {
        source: '/Careers',
        destination: '/career',
      },
    ];
  },
};

export default nextConfig;