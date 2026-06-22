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

export interface NotificationRecipient {
  id: number;
  email: string;
  label: string | null;
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
 * Record a subscribe row for attribution. Idempotent on (email, source);
 * `inserted` is false when that exact pair already existed. This is just the
 * log — whether to actually send the welcome email is decided by `claimWelcome`.
 */
export async function insertSubscribe(
  input: SubscribeInput
): Promise<{ inserted: boolean }> {
  const rows = (await sql()`
    insert into subscribes (email, source, utm_source, utm_medium, utm_campaign)
    values (${input.email}, ${input.source}, ${input.utm_source}, ${input.utm_medium}, ${input.utm_campaign})
    on conflict (email, source) do nothing
    returning id
  `) as Array<{ id: number }>;
  return { inserted: rows.length > 0 };
}

/**
 * Atomically claim the one-and-only welcome email for a canonical address.
 * Returns true exactly once per address, for the first caller — every later
 * call (any source, any alias mapping to the same canonical form) returns false.
 *
 * The send-once guarantee lives in the unique constraint, so it is race-proof:
 * concurrent requests for a brand-new victim all hit the same INSERT and only
 * one wins the row. This is what actually closes the mail-bomb vector; a prior
 * SELECT-then-INSERT in the app layer is not atomic on the Neon HTTP driver.
 */
export async function claimWelcome(emailCanonical: string): Promise<boolean> {
  const rows = (await sql()`
    insert into welcomed_emails (email_canonical)
    values (${emailCanonical})
    on conflict (email_canonical) do nothing
    returning email_canonical
  `) as Array<{ email_canonical: string }>;
  return rows.length > 0;
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

/**
 * Atomic fixed-window rate-limit counter, backed by Postgres so the limit holds
 * across serverless instances (in-memory counters reset per cold start and are
 * useless on Vercel).
 *
 * The window index is baked into the bucket key (`key:windowIndex`), so each
 * window is a fresh INSERT that simply increments — no perpetually-updated hot
 * row, and expired rows fall out of every query. Returns the post-increment
 * count for this window and seconds until it resets.
 */
export async function bumpRateLimit(
  key: string,
  windowSec: number
): Promise<{ count: number; resetSec: number }> {
  const nowMs = Date.now();
  const windowMs = windowSec * 1000;
  const windowIndex = Math.floor(nowMs / windowMs);
  const bucket = `${key}:${windowIndex}`;
  const expiresAt = new Date((windowIndex + 1) * windowMs);

  const rows = (await sql()`
    insert into rate_limits (bucket, count, expires_at)
    values (${bucket}, 1, ${expiresAt.toISOString()})
    on conflict (bucket) do update set count = rate_limits.count + 1
    returning count
  `) as Array<{ count: number }>;

  return {
    count: rows[0]?.count ?? 1,
    resetSec: Math.max(1, Math.ceil((expiresAt.getTime() - nowMs) / 1000)),
  };
}

/** Drop expired rate-limit rows. Index-driven (rate_limits_expires_idx) and
 *  called opportunistically so the table stays bounded without a cron. */
export async function cleanupRateLimits(): Promise<void> {
  await sql()`delete from rate_limits where expires_at < now()`;
}

// --- Notification recipients (DB-managed booking-alert list) -----------------

export async function listNotificationRecipients(): Promise<NotificationRecipient[]> {
  return (await sql()`
    select id, email, label, created_at
    from notification_recipients
    order by created_at asc
  `) as NotificationRecipient[];
}

/** Add a recipient. Idempotent on email; `added` is false if it already existed. */
export async function addNotificationRecipient(
  email: string,
  label: string | null
): Promise<{ added: boolean }> {
  const rows = (await sql()`
    insert into notification_recipients (email, label)
    values (${email}, ${label})
    on conflict (email) do nothing
    returning id
  `) as Array<{ id: number }>;
  return { added: rows.length > 0 };
}

export async function removeNotificationRecipient(id: number): Promise<void> {
  await sql()`delete from notification_recipients where id = ${id}`;
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
