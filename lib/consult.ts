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
