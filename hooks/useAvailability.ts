'use client';

import { useEffect, useState } from 'react';
import { openSlotsForDate } from '@/lib/availability';

export type AvailabilityState = 'idle' | 'loading' | 'error';

/**
 * Which slots are bookable on `date`.
 *
 * Two layers, same as the server: `openSlotsForDate` is the schedule (what the
 * showroom offers that day, including closures), and `booked` is occupancy from
 * the DB. A slot is offered here and greyed out if it is already taken.
 *
 * Shared by every booking form so the three of them cannot drift apart —
 * /appointment, /book-a-fitting and /virtual-consultation all book against the
 * same calendar, because Rob can only be in one place at a time.
 */
export function useAvailability(date: string) {
  const [booked, setBooked] = useState<string[]>([]);
  const [state, setState] = useState<AvailabilityState>('idle');

  // Exposed so a caller can refresh after a 409 slot-taken response.
  const refresh = async (forDate: string) => {
    if (!forDate) {
      setBooked([]);
      setState('idle');
      return;
    }
    setState('loading');
    try {
      const res = await fetch(`/api/availability?date=${encodeURIComponent(forDate)}`);
      const json = (await res.json()) as { ok: boolean; booked?: string[] };
      if (json.ok && json.booked) {
        setBooked(json.booked);
        setState('idle');
      } else {
        setBooked([]);
        setState('error');
      }
    } catch {
      setBooked([]);
      setState('error');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh(date);
  }, [date]);

  const openSlots = date ? openSlotsForDate(date) : [];

  return { openSlots, booked, state, refresh };
}

/** Today in the visitor's own calendar, as YYYY-MM-DD, for a date input's min. */
export function todayLocalISO(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

/** `days` from today in the visitor's calendar, for a date input's max. */
export function localISOPlusDays(days: number): string {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}
