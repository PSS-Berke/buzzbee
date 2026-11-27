'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { BOOKING_OFFERS, type BookingOffer } from '@/lib/consult';

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
 * A booking from one of the booking landing pages (`offer`, e.g. "sale" from
 * /sale-booking, see BOOKING_OFFERS) sends the same two events tagged with that
 * page's source, plus its own events so it can be counted apart: a GA4 event
 * (e.g. `sale_booking`), a Meta custom event (e.g. `SaleBooking`) and a Vercel
 * Analytics event named after the page (e.g. `Sale Booking`). The Google Ads
 * URL conversion on this page still counts it as a booking too; a Google Ads
 * conversion per page can match `offer=<offer>` in this page's URL.
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
    const info = offer ? BOOKING_OFFERS[offer] : undefined;
    window.gtag?.('event', 'generate_lead', {
      lead_source: info ? info.source : 'booking',
      booking_type: mode,
    });
    window.fbq?.('track', 'Schedule', {
      booking_type: mode,
      ...(info ? { content_category: info.source } : {}),
    });
    if (info) {
      window.gtag?.('event', info.gaEvent, { booking_type: mode });
      window.fbq?.('trackCustom', info.metaEvent, { booking_type: mode });
      track(info.name);
    }
  }, [date, slot, mode, offer]);
  return null;
}
