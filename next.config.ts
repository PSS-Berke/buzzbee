import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['stripe'],
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/home-line',
        destination: '/shop/mattresses',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
