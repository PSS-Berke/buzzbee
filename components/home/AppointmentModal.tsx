'use client';

import { useEffect, useRef, useState } from 'react';
import { X, CalendarCheck, Check } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import ReserveForm from '@/components/locations/ReserveForm';

// Once dismissed, don't show again for this many days
const SUPPRESS_DAYS = 7;
const STORAGE_KEY = 'busby_appt_modal_dismissed';

const perks = [
  'A salaried Sleep Guide — never a commission',
  'Same online prices & 100-night home trial',
  'No pressure to buy, ever',
];

export default function AppointmentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Open immediately on load, unless dismissed within the suppression window
  useEffect(() => {
    let suppressed = false;
    try {
      const dismissedAt = Number(localStorage.getItem(STORAGE_KEY) || 0);
      suppressed =
        dismissedAt > 0 &&
        Date.now() - dismissedAt < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
    } catch {
      // localStorage unavailable (private mode / SSR) — show anyway
    }
    if (suppressed) return;

    // Defer to the next tick so we open right after mount without a
    // synchronous cascading render.
    const timer = window.setTimeout(() => setIsOpen(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  };

  // Prevent body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Everything outside the dialog is inert while open
  useEffect(() => {
    if (!isOpen) return;
    const root = rootRef.current;
    if (!root) return;
    const others = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement &&
        el !== root &&
        !el.contains(root) &&
        el.tagName !== 'SCRIPT' &&
        !el.hasAttribute('data-live-region') &&
        !el.hasAttribute('inert')
    );
    others.forEach((el) => el.setAttribute('inert', ''));
    return () => others.forEach((el) => el.removeAttribute('inert'));
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop — pointer convenience only; keyboard users close via Escape
          or the labeled Close button */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="fixed inset-0 bg-navy/40 backdrop-blur-sm"
        onClick={close}
      />

      {/* Centering wrapper — scrolls the whole dialog on mobile. pointer-events
          pass through the padding to the backdrop so tapping outside closes. */}
      <div className="relative flex min-h-full items-center justify-center p-4 pointer-events-none">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="appt-modal-title"
          className="pointer-events-auto relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-popIn flex flex-col lg:grid lg:grid-cols-5 lg:h-[min(90vh,680px)]"
        >
          {/* Close */}
          <button
            onClick={close}
            data-autofocus
            className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-navy" />
          </button>

          {/* Pitch panel — compact header on mobile, full column on desktop */}
          <div className="lg:col-span-2 relative bg-navy text-white px-6 py-6 lg:p-10 flex flex-col justify-center overflow-hidden">
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-gold/15 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-gold-light mb-3 lg:mb-5">
                <CalendarCheck className="w-4 h-4" />
                <span>Free Sleep Consultation</span>
              </div>
              <h2
                id="appt-modal-title"
                className="text-2xl lg:text-4xl font-serif leading-tight mb-0 lg:mb-4"
              >
                Book a <span className="text-gold">Sleep Guide</span> in person.
              </h2>
              <p className="hidden lg:block text-gray-300 leading-relaxed mb-6">
                The Elmhurst showroom is open 24/7 and self-serve. Pick a time and
                one of our guides will meet you there — to walk you through the
                lineup and help you narrow the choice.
              </p>
              <ul className="hidden lg:block space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-gray-200">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-gold-light" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form panel — flows within the scrolling dialog on mobile; scrolls
              in its own column on desktop */}
          <div className="lg:col-span-3 p-6 sm:p-8 lg:min-h-0 lg:overflow-y-auto bg-[#faf8f5]">
            <h3 className="text-xl font-serif text-navy mb-1">Pick a time</h3>
            <p className="text-sm text-gray-600 mb-5">
              We&rsquo;ll have a guide waiting and email you a confirmation.
            </p>
            <ReserveForm />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-popIn {
          animation: popIn 0.28s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-popIn {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
