export interface Giveaway {
  slug: string;
  month: string;
  prize: string;
  question: string;
  /** ISO instants. Times are Central — write them with an explicit offset. */
  startsAt: string;
  endsAt: string;
  announceDate: string;
  /** Instagram handle of the winner once announced, without the @. */
  winner?: string;
}

// Newest last. To run next month's giveaway, append an entry — the /giveaway
// page and the /links button pick it up automatically.
export const giveaways: Giveaway[] = [
  {
    slug: '2026-10',
    month: 'October',
    prize: 'a Busby mattress',
    question: 'What type of sleeper are you? Back, side or stomach?',
    startsAt: '2026-09-22T00:00:00-05:00',
    endsAt: '2026-10-22T23:59:00-05:00',
    announceDate: 'October 23, 2026',
  },
];

export type GiveawayStatus =
  | { state: 'live'; giveaway: Giveaway }
  | { state: 'upcoming'; giveaway: Giveaway; last?: Giveaway }
  | { state: 'ended'; last: Giveaway }
  | { state: 'none' };

export function getGiveawayStatus(now: number = Date.now()): GiveawayStatus {
  const live = giveaways.find((g) => now >= Date.parse(g.startsAt) && now <= Date.parse(g.endsAt));
  if (live) return { state: 'live', giveaway: live };

  const past = giveaways.filter((g) => now > Date.parse(g.endsAt));
  const last = past[past.length - 1];
  const next = giveaways.find((g) => now < Date.parse(g.startsAt));
  if (next) return { state: 'upcoming', giveaway: next, last };
  if (last) return { state: 'ended', last };
  return { state: 'none' };
}

export function formatDeadline(iso: string): string {
  const date = new Date(iso).toLocaleDateString('en-US', {
    timeZone: 'America/Chicago',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const time = new Date(iso).toLocaleTimeString('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${date} at ${time} CT`;
}

export function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    timeZone: 'America/Chicago',
    month: 'long',
    day: 'numeric',
  });
}
