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
      {
        // Short alias for the floor tablet. mybusby.com/tv is typeable on an
        // iPad; /showroom/videos is not. Temporary, so the staff page can move
        // later without a permanent redirect cached in everyone's browser.
        source: '/tv',
        destination: '/showroom/videos',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
