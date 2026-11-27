import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Year-End Sale: 30% Off Showroom Beds | Busby Elmhurst',
  description:
    'Book a private visit to the Busby showroom in Elmhurst. Every showroom bed is 30% off through December 31.',
  alternates: { canonical: `${SITE_URL}/sale-booking` },
  // Sale Booking: landing page for the Google Ads "Sale" campaign. Kept out of
  // the index so it only gets traffic we send it.
  robots: { index: false, follow: false },
};

export default function SaleBookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
