import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: '$779 Studio Go Queen Mattress | Busby',
  description:
    'Online only: a Busby queen mattress for $779. Pick it up at our Elmhurst showroom in 72 hours or get it delivered in 96.',
  alternates: { canonical: `${SITE_URL}/studio-go` },
  // Promo landing page for ads and social. Kept out of the index so it never
  // competes with the product pages in organic search.
  robots: { index: false, follow: false },
};

export default function StudioGoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
