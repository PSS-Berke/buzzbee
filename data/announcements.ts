import { elmhurstStore, type LaunchPhase } from './store';

export interface Announcement {
  version: number;
  copy: string;
  href: string;
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
