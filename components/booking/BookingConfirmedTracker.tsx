'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Sends one GA4 `generate_lead` event and one Meta Pixel `Schedule` event per
 * booking when /appointment/confirmed
 * loads. Every booking form (home pop-up, quick-book, /appointment,
 * /book-a-fitting, /virtual-consultation) redirects here, so this counts them
 * all in one place. Mark `generate_lead` as a key event in GA4 for it to show
 * up as a conversion.
 *
 * A refresh or a back-button return must not count the same booking twice, so
 * each date + slot + mode is remembered in sessionStorage once it has fired.
 */
export default function BookingConfirmedTracker({
  date,
  slot,
  mode,
}: {
  date?: string;
  slot?: string;
  mode: 'in-person' | 'virtual';
}) {
  useEffect(() => {
    const key = `busby_lead_${date ?? ''}_${slot ?? ''}_${mode}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // Storage can be unavailable (private mode); still send the event.
    }
    window.gtag?.('event', 'generate_lead', {
      lead_source: 'booking',
      booking_type: mode,
    });
    window.fbq?.('track', 'Schedule', { booking_type: mode });
  }, [date, slot, mode]);
  return null;
}
