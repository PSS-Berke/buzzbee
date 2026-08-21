import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a Free Mattress Fitting | Busby Elmhurst',
  description:
    'Try every Busby mattress in private at our Elmhurst showroom. Tell us when suits you and we will text you back to lock in a time. Free, no obligation.',
  alternates: { canonical: `${SITE_URL}/book-a-fitting` },
  // Paid landing page. Kept out of the index so it never competes with
  // /appointment or /locations/elmhurst for organic search.
  robots: { index: false, follow: false },
};

export default function BookAFittingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
