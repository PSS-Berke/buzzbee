import 'server-only';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { env } from './env';

let _sql: NeonQueryFunction<false, false> | null = null;

function sql(): NeonQueryFunction<false, false> {
  if (!_sql) _sql = neon(env.DATABASE_URL);
  return _sql;
}

export interface SubscribeRow {
  id: number;
  email: string;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
}

export interface ReservationRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  preferred_date: string | null;
  time_slot: string | null;
  mattresses: string[];
  notes: string | null;
  source: string;
  location: string;
  created_at: string;
}

export interface SubscribeInput {
  email: string;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export interface ReservationInput {
  name: string;
  email: string;
  phone: string | null;
  preferred_date: string | null;
  time_slot: string | null;
  mattresses: string[];
  notes: string | null;
  source: string;
  location: string;
}

/**
 * Insert a subscribe row. Returns `{ duplicate: true }` if (email, source) already exists,
 * so callers can skip the user-facing confirmation email on a returning visitor.
 */
export async function insertSubscribe(
  input: SubscribeInput
): Promise<{ duplicate: boolean }> {
  const rows = (await sql()`
    insert into subscribes (email, source, utm_source, utm_medium, utm_campaign)
    values (${input.email}, ${input.source}, ${input.utm_source}, ${input.utm_medium}, ${input.utm_campaign})
    on conflict (email, source) do nothing
    returning id
  `) as Array<{ id: number }>;
  return { duplicate: rows.length === 0 };
}

export class SlotTakenError extends Error {
  constructor() {
    super('That time slot is already booked.');
    this.name = 'SlotTakenError';
  }
}

export async function insertReservation(input: ReservationInput): Promise<void> {
  try {
    await sql()`
      insert into reservations
        (name, email, phone, preferred_date, time_slot, mattresses, notes, source, location)
      values
        (${input.name}, ${input.email}, ${input.phone}, ${input.preferred_date},
         ${input.time_slot}, ${input.mattresses}, ${input.notes}, ${input.source}, ${input.location})
    `;
  } catch (err: unknown) {
    // Postgres unique-violation code = 23505. The only unique index on this table
    // is reservations_date_slot_uniq, so any 23505 here is the slot-taken case.
    if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
      throw new SlotTakenError();
    }
    throw err;
  }
}

export async function getBookedSlots(date: string): Promise<string[]> {
  const rows = (await sql()`
    select time_slot from reservations
    where preferred_date = ${date} and time_slot is not null
  `) as Array<{ time_slot: string }>;
  return rows.map((r) => r.time_slot);
}

export async function listSubscribes(limit = 200): Promise<SubscribeRow[]> {
  return (await sql()`
    select id, email, source, utm_source, utm_medium, utm_campaign, created_at
    from subscribes
    order by created_at desc
    limit ${limit}
  `) as SubscribeRow[];
}

export async function listReservations(limit = 200): Promise<ReservationRow[]> {
  return (await sql()`
    select id, name, email, phone, preferred_date, time_slot, mattresses, notes,
           source, location, created_at
    from reservations
    order by created_at desc
    limit ${limit}
  `) as ReservationRow[];
}

// For CSV export — no limit. If row counts grow past ~50k, switch to streaming.
export async function listAllSubscribes(): Promise<SubscribeRow[]> {
  return (await sql()`
    select id, email, source, utm_source, utm_medium, utm_campaign, created_at
    from subscribes
    order by created_at desc
  `) as SubscribeRow[];
}

export async function listAllReservations(): Promise<ReservationRow[]> {
  return (await sql()`
    select id, name, email, phone, preferred_date, time_slot, mattresses, notes,
           source, location, created_at
    from reservations
    order by created_at desc
  `) as ReservationRow[];
}
