'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function StoreViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    window.gtag?.('event', 'store_view', { slug });
  }, [slug]);
  return null;
}
