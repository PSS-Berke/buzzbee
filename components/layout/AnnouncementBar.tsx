'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { announcement } from '@/data/announcements';

const STORAGE_KEY = 'busby-announcement-dismissed';
const DISMISS_DAYS = 7;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Hydration-safe reveal: localStorage is only readable client-side, so the
    // initial render must stay hidden and flip in this mount effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHidden(false);
        return;
      }
      const { v, until } = JSON.parse(raw) as { v: number; until: number };
      if (v !== announcement.version || Date.now() > until) {
        window.localStorage.removeItem(STORAGE_KEY);
        setHidden(false);
        return;
      }
      setHidden(true);
    } catch {
      setHidden(false);
    }
  }, []);

  if (!mounted || hidden) return null;
  if (pathname?.startsWith('/sleep-guide')) return null;

  const handleDismiss = () => {
    const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ v: announcement.version, until })
      );
    } catch {
      // ignore storage failures (private mode, etc.)
    }
    window.gtag?.('event', 'home_announcement_dismiss');
    setHidden(true);
    // The focused dismiss button is about to unmount — land focus on the main
    // landmark instead of dropping keyboard users back to <body>
    document.getElementById('main')?.focus();
  };

  const handleClick = () => {
    window.gtag?.('event', 'home_announcement_click', { destination: 'elmhurst' });
  };

  // Strip the trailing arrow from copy since we render an inline <ArrowRight /> icon.
  const label = announcement.copy.replace(/\s*→\s*$/, '');

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-md sm:max-w-fit"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
      role="region"
      aria-label="Site announcement"
    >
      <div className="flex items-center gap-2 bg-navy text-white shadow-2xl shadow-navy/30 rounded-full pl-5 pr-2 py-2 border border-gold/30">
        <Link
          href={announcement.href}
          onClick={handleClick}
          className="flex items-center gap-2 text-sm font-medium hover:text-gold-light transition-colors min-w-0"
        >
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{label}</span>
          <ArrowRight className="w-4 h-4 flex-shrink-0 text-gold" />
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
