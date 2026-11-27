import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Studio Go $599 Mattress | Book a Visit | Busby Elmhurst',
  description:
    'Ask about the $599 Studio Go at a free visit to the Busby showroom in Elmhurst, and compare it with our showroom beds at 30% off.',
  alternates: { canonical: `${SITE_URL}/studio-go-booking` },
  // Studio Go Booking: landing page for the Google Ads "Studio Go" campaign.
  // Kept out of the index so it never competes with /studio-go.
  robots: { index: false, follow: false },
};

export default function StudioGoBookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
