// One-shot migration: replace `time_window` column with `time_slot`,
// add the partial unique index that prevents double-booking.
// Idempotent — safe to re-run.
//
// Run with:  node --env-file=.env.local scripts/migrate-time-slot.mjs

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Did you pass --env-file=.env.local?');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const cols = await sql.query(
  `select column_name from information_schema.columns
   where table_schema='public' and table_name='reservations'`
);
const names = new Set(cols.map((c) => c.column_name));

if (names.has('time_window')) {
  process.stdout.write('→ drop column time_window… ');
  await sql.query(`alter table reservations drop column time_window`);
  console.log('ok');
} else {
  console.log('→ time_window already absent.');
}

if (!names.has('time_slot')) {
  process.stdout.write('→ add column time_slot… ');
  await sql.query(`alter table reservations add column time_slot text`);
  console.log('ok');
} else {
  console.log('→ time_slot already present.');
}

const idx = await sql.query(
  `select indexname from pg_indexes
   where schemaname='public' and indexname='reservations_date_slot_uniq'`
);
if (idx.length === 0) {
  process.stdout.write('→ create unique index reservations_date_slot_uniq… ');
  await sql.query(
    `create unique index reservations_date_slot_uniq
       on reservations (preferred_date, time_slot)
       where preferred_date is not null and time_slot is not null`
  );
  console.log('ok');
} else {
  console.log('→ unique index already exists.');
}

console.log('\nDone.');
