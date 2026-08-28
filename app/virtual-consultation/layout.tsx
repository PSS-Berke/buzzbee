import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Talk to a Mattress Maker | Free Video Consultation | Busby',
  description:
    'Fifteen minutes on video with the founder. Tell us how you sleep, see the beds up close, get a straight recommendation. Free, no obligation, anywhere in the US.',
  alternates: { canonical: `${SITE_URL}/virtual-consultation` },
  // Paid landing page for the national campaign. Kept out of the index so it
  // never competes with the local pages for organic search.
  robots: { index: false, follow: false },
};

export default function VirtualConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
