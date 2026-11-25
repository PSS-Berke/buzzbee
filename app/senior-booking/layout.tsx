import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Senior Discount: $300 Off Your Bed | Busby Elmhurst',
  description:
    'Book a private visit to the Busby showroom in Elmhurst. Guests 65 and older get an extra $300 off any showroom bed, on top of 30% off through December 31.',
  alternates: { canonical: `${SITE_URL}/senior-booking` },
  // Senior Booking: the landing page for the senior discount ads. Kept out of
  // the index (like /book-a-fitting) so it only gets traffic we send it.
  robots: { index: false, follow: false },
};

export default function SeniorBookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
