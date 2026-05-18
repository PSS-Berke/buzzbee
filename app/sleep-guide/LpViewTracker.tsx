'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function LpViewTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    window.gtag?.('event', 'lp_view', {
      utm_source: params.get('utm_source') ?? undefined,
      utm_medium: params.get('utm_medium') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
    });
  }, []);
  return null;
}
