import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Private Mattress Showroom in Elmhurst | Book a Visit | Busby',
  description:
    'Book a private visit to the Busby mattress showroom on North Avenue in Elmhurst. Free, no obligation, free parking.',
  alternates: { canonical: `${SITE_URL}/elmhurst-booking` },
  // Elmhurst Booking: landing page for the Google Ads "Elmhurst Local"
  // campaign. Kept out of the index so it never competes with
  // /locations/elmhurst in organic search.
  robots: { index: false, follow: false },
};

export default function ElmhurstBookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
