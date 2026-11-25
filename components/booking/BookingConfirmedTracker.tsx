'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import type { BookingOffer } from '@/lib/consult';

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
 * A Senior Booking (`offer="senior"`, from /senior-booking) sends the same two
 * events tagged `senior-booking`, plus its own events so it can be counted
 * apart: GA4 `senior_booking`, Meta custom event `SeniorBooking`, and a Vercel
 * Analytics `Senior Booking` event. The Google Ads URL conversion on this page
 * still counts it as a booking too.
 *
 * A refresh or a back-button return must not count the same booking twice, so
 * each date + slot + mode is remembered in sessionStorage once it has fired.
 */
export default function BookingConfirmedTracker({
  date,
  slot,
  mode,
  offer,
}: {
  date?: string;
  slot?: string;
  mode: 'in-person' | 'virtual';
  offer?: BookingOffer;
}) {
  useEffect(() => {
    const key = `busby_lead_${date ?? ''}_${slot ?? ''}_${mode}${offer ? `_${offer}` : ''}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // Storage can be unavailable (private mode); still send the event.
    }
    const senior = offer === 'senior';
    window.gtag?.('event', 'generate_lead', {
      lead_source: senior ? 'senior-booking' : 'booking',
      booking_type: mode,
    });
    window.fbq?.('track', 'Schedule', {
      booking_type: mode,
      ...(senior ? { content_category: 'senior-booking' } : {}),
    });
    if (senior) {
      window.gtag?.('event', 'senior_booking', { booking_type: mode });
      window.fbq?.('trackCustom', 'SeniorBooking', { booking_type: mode });
      track('Senior Booking');
    }
  }, [date, slot, mode, offer]);
  return null;
}
