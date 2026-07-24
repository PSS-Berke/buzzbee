// Adds the day-of reminder tracking column to `reservations`.
// Idempotent — safe to re-run.
//
// Run with:  node --env-file=.env.local scripts/migrate-reminders.mjs

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Did you pass --env-file=.env.local?');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const statements = [
  `alter table reservations add column if not exists reminder_sent_at timestamptz`,
  // Partial index: the cron only ever scans un-reminded rows for one date.
  `create index if not exists reservations_reminder_pending_idx
     on reservations (preferred_date)
     where reminder_sent_at is null`,
];

for (const stmt of statements) {
  const label = stmt.split('\n')[0].trim().slice(0, 80);
  process.stdout.write(`→ ${label}… `);
  await sql.query(stmt);
  console.log('ok');
}

// Backfill: don't send a "today's the day" email to anyone whose visit already
// happened. Mark every past-dated reservation as already reminded.
const backfilled = await sql.query(
  `update reservations
      set reminder_sent_at = now()
    where reminder_sent_at is null
      and (preferred_date is null or preferred_date < current_date)
    returning id`
);
console.log(`\nBackfilled ${backfilled.length} past/undated reservation(s) as already reminded.`);
