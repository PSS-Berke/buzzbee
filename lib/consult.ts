// How a booked consultation actually happens: in the Elmhurst showroom, or over
// video. Both are the same appointment as far as the database is concerned —
// same `reservations` row, same slot pool, same admin notification — because Rob
// can only be in one place at a time. A video call at 11:00 and a fitting at
// 11:00 are the same conflict, so they deliberately share the schedule.
//
// The mode is carried on the reservation's `source` column rather than a new
// column, so nothing here needs a migration.

export type ConsultMode = 'in-person' | 'virtual';

/** Booked in the showroom from /appointment. */
export const SOURCE_IN_PERSON = 'reserve-elmhurst';
/** Booked as a video call from /appointment (local visitor who chose video). */
export const SOURCE_VIRTUAL = 'reserve-virtual';
/** Booked as a video call from the national /virtual-consultation landing page. */
export const SOURCE_VIRTUAL_NATIONAL = 'virtual-national';

const VIRTUAL_SOURCES: ReadonlySet<string> = new Set([SOURCE_VIRTUAL, SOURCE_VIRTUAL_NATIONAL]);

/** Whether a reservation `source` represents a video call rather than a visit. */
export function isVirtualSource(source: string | null | undefined): boolean {
  return !!source && VIRTUAL_SOURCES.has(source);
}

/** The mode a `source` represents. Anything unrecognised is treated as in-person. */
export function modeFromSource(source: string | null | undefined): ConsultMode {
  return isVirtualSource(source) ? 'virtual' : 'in-person';
}

/** Narrow an untrusted string (e.g. a query param) to a ConsultMode. */
export function parseMode(value: string | null | undefined): ConsultMode {
  return value === 'virtual' ? 'virtual' : 'in-person';
}

/**
 * Booked in the showroom from /senior-booking, the landing page for the senior
 * discount ads (internally "Senior Booking"). An in-person visit like any
 * other, but its own source so senior bookings count separately in the admin
 * list, the team email and the export, and so the store knows to take the
 * extra $300 off a showroom bed.
 */
export const SOURCE_SENIOR = 'senior-booking';

/** Whether a reservation `source` came from the Senior Booking page. */
export function isSeniorSource(source: string | null | undefined): boolean {
  return source === SOURCE_SENIOR;
}

/**
 * The booking landing pages. Each is a paid-ad landing page with the booking
 * form on it, showroom visits only. A booking made on one is saved with its
 * own `source` and carries `?offer=` onto /appointment/confirmed, so every
 * page's bookings count on their own in the admin list, the team email, GA4,
 * Meta, Vercel Analytics and (by URL) Google Ads.
 *
 * - senior: /senior-booking, the senior discount ads
 * - sale: /sale-booking, Google Ads "BUS | Search | Sale"
 * - local: /elmhurst-booking, Google Ads "BUS | Search | Elmhurst Local"
 * - studio-go: /studio-go-booking, Google Ads "BUS | Search | Studio Go"
 */
export type BookingOffer = 'senior' | 'sale' | 'local' | 'studio-go';

export interface BookingOfferInfo {
  /** Internal name, used in the team email and analytics. */
  name: string;
  /** Page the booking is made on. */
  path: string;
  /** `source` saved on the reservation. */
  source: string;
  /** GA4 event for a confirmed booking from this page (import into Google Ads). */
  gaEvent: string;
  /** Meta custom event for a confirmed booking from this page. */
  metaEvent: string;
}

export const BOOKING_OFFERS: Record<BookingOffer, BookingOfferInfo> = {
  senior: {
    name: 'Senior Booking',
    path: '/senior-booking',
    source: SOURCE_SENIOR,
    gaEvent: 'senior_booking',
    metaEvent: 'SeniorBooking',
  },
  sale: {
    name: 'Sale Booking',
    path: '/sale-booking',
    source: 'sale-booking',
    gaEvent: 'sale_booking',
    metaEvent: 'SaleBooking',
  },
  local: {
    name: 'Elmhurst Booking',
    path: '/elmhurst-booking',
    source: 'elmhurst-booking',
    gaEvent: 'elmhurst_booking',
    metaEvent: 'ElmhurstBooking',
  },
  'studio-go': {
    name: 'Studio Go Booking',
    path: '/studio-go-booking',
    source: 'studio-go-booking',
    gaEvent: 'studio_go_booking',
    metaEvent: 'StudioGoBooking',
  },
};

/** Narrow an untrusted string (e.g. a query param) to a BookingOffer. */
export function parseOffer(value: string | null | undefined): BookingOffer | undefined {
  return value && Object.prototype.hasOwnProperty.call(BOOKING_OFFERS, value)
    ? (value as BookingOffer)
    : undefined;
}

/** The booking landing page a reservation `source` came from, if any. */
export function offerFromSource(source: string | null | undefined): BookingOffer | undefined {
  if (!source) return undefined;
  return (Object.keys(BOOKING_OFFERS) as BookingOffer[]).find(
    (k) => BOOKING_OFFERS[k].source === source
  );
}
