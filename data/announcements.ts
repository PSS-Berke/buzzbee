import { elmhurstStore, type LaunchPhase } from './store';

export interface Announcement {
  version: number;
  copy: string;
  href: string;
  /** Last day (YYYY-MM-DD, showroom local) the notice shows. Omit for evergreen. */
  until?: string;
}

const phaseCopy: Record<LaunchPhase, (city: string, date: string | null) => string> = {
  'coming-soon': (city) => `Coming soon: Visit Busby in ${city} →`,
  'opening-on-date': (city, date) =>
    date
      ? `Opening ${date}: Visit Busby in ${city} →`
      : `Coming soon: Visit Busby in ${city} →`,
  'now-open': (city) => `Now Open: Visit Busby in ${city} →`,
  'steady-state': (city) => `Try every Busby mattress in person — ${city} →`,
};

function formatOpeningDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export const announcement: Announcement = {
  version: 2,
  copy: phaseCopy[elmhurstStore.launchPhase](
    elmhurstStore.shortName,
    formatOpeningDate(elmhurstStore.openingDate)
  ),
  href: `/locations/${elmhurstStore.slug}`,
};

// Temporary notice. While `until` hasn't passed it replaces the evergreen pill
// above; afterwards the site falls back to `announcement` on its own. Keep the
// dates in sync with WEEK_OVERRIDE in lib/availability.ts, and bump `version`
// so people who dismissed the previous pill see this one.
export const temporaryNotice: Announcement | null = {
  version: 3,
  copy: 'Showroom closed Sat–Sun, Aug 29–30 · Book a weekday visit →',
  href: '/appointment',
  until: '2026-08-30',
};

/** The announcement to show on `todayISO` (YYYY-MM-DD, local). */
export function activeAnnouncement(todayISO: string): Announcement {
  if (temporaryNotice && (!temporaryNotice.until || todayISO <= temporaryNotice.until)) {
    return temporaryNotice;
  }
  return announcement;
}
