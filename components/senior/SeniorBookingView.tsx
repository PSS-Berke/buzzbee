'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Counts a visit to /senior-booking so the senior ads can be judged on visits as
 * well as bookings: GA4 `senior_booking_view` and Meta `ViewContent` tagged
 * `senior-booking`. Vercel Analytics already counts the page view by path.
 */
export default function SeniorBookingView() {
  useEffect(() => {
    window.gtag?.('event', 'senior_booking_view');
    window.fbq?.('track', 'ViewContent', {
      content_name: 'Senior Booking',
      content_category: 'senior-booking',
    });
  }, []);
  return null;
}
