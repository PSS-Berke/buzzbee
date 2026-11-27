'use client';

import { useEffect } from 'react';
import { BOOKING_OFFERS, type BookingOffer } from '@/lib/consult';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Counts a visit to a booking landing page so each page's ads can be judged on
 * visits as well as bookings: a GA4 `<gaEvent>_view` event (e.g.
 * `sale_booking_view`) and Meta `ViewContent` tagged with the page's source.
 * Vercel Analytics already counts the page view by path.
 */
export default function BookingPageView({ offer }: { offer: BookingOffer }) {
  useEffect(() => {
    const info = BOOKING_OFFERS[offer];
    window.gtag?.('event', `${info.gaEvent}_view`);
    window.fbq?.('track', 'ViewContent', {
      content_name: info.name,
      content_category: info.source,
    });
  }, [offer]);
  return null;
}
