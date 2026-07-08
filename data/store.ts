export type LaunchPhase =
  | 'coming-soon'
  | 'opening-on-date'
  | 'now-open'
  | 'steady-state';

export interface StoreAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface StoreLocation {
  slug: string;
  name: string;
  shortName: string;
  address: StoreAddress;
  phone: string;
  phoneE164: string;
  email: string;
  hours: string;
  openingHours: { day: string; opens: string; closes: string }[] | null;
  openingDate: string | null;
  launchPhase: LaunchPhase;
  parking: string;
  transit: string;
  accessibility: string;
  geo: { lat: number; lng: number };
  mapsEmbedSrc: string;
  mapsLink: string;
}

export const elmhurstStore: StoreLocation = {
  slug: 'elmhurst',
  name: 'Busby Elmhurst Showroom',
  shortName: 'Elmhurst',
  address: {
    street: '665 W North Ave',
    city: 'Elmhurst',
    state: 'IL',
    zip: '60126',
  },
  phone: '(844) 886-1640',
  phoneE164: '+18448861640',
  email: 'showroom@mybusby.com',
  hours: 'Open 24/7 · self-serve',
  openingHours: [
    { day: 'Monday', opens: '00:00', closes: '23:59' },
    { day: 'Tuesday', opens: '00:00', closes: '23:59' },
    { day: 'Wednesday', opens: '00:00', closes: '23:59' },
    { day: 'Thursday', opens: '00:00', closes: '23:59' },
    { day: 'Friday', opens: '00:00', closes: '23:59' },
    { day: 'Saturday', opens: '00:00', closes: '23:59' },
    { day: 'Sunday', opens: '00:00', closes: '23:59' },
  ],
  openingDate: null,
  launchPhase: 'now-open',
  parking: 'Free parking in the lot on site, available anytime.',
  transit: 'Elmhurst Metra (UP-W line) is in downtown Elmhurst, a short drive south of the showroom.',
  accessibility: 'Call us at (844) 886-1640 with any accessibility questions and we’ll walk you through what to expect.',
  geo: { lat: 41.9091, lng: -87.9670 },
  // TODO: replace with the official `pb=` iframe URL from
  // Google Business Profile → Share → Embed a map. Until then, querying by
  // business name + address resolves to the listing card in most cases.
  mapsEmbedSrc:
    'https://www.google.com/maps?q=Busby+Mattress,+665+W+North+Ave,+Elmhurst,+IL+60126&output=embed',
  mapsLink:
    'https://www.google.com/maps/dir/?api=1&destination=665+W+North+Ave%2C+Elmhurst%2C+IL+60126',
};

export const allLocations: StoreLocation[] = [elmhurstStore];

export function formatAddress(address: StoreAddress): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
}
