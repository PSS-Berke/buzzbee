import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Block crawlers on Vercel preview deployments so they don't index
  // duplicate content under preview URLs.
  if (process.env.VERCEL_ENV === 'preview') {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/checkout', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
