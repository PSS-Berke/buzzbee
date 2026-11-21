import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['stripe'],
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        // Low-risk hardening that can't break third-party scripts. A full
        // Content-Security-Policy would need gtag, Google Ads, Stripe, Vercel
        // Analytics and the map/video embeds allow-listed, so it's left for a
        // separate, report-only rollout.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // No one else may frame the site (clickjacking on checkout/booking).
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
    ];
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
      {
        // Studio Go launched as Grab and Go. Keeps ad, social and in-flight
        // Stripe cancel links working; query strings carry over. Temporary, so
        // the name can still change without a redirect cached in browsers.
        source: '/grab-and-go',
        destination: '/studio-go',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
