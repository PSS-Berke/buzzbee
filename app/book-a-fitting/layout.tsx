import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a Free Mattress Fitting | Busby Elmhurst',
  description:
    'Try every Busby mattress in private at our Elmhurst showroom. Pick a day and time online and it is confirmed straight away. Free, no obligation.',
  alternates: { canonical: `${SITE_URL}/book-a-fitting` },
  // Paid landing page. Kept out of the index so it never competes with
  // /appointment or /locations/elmhurst for organic search.
  robots: { index: false, follow: false },
};

export default function BookAFittingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
