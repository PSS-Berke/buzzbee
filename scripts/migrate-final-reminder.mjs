// Adds tracking for the "starting soon" reminder sent shortly before the visit.
// Idempotent — safe to re-run.
//
// Run with:  node --env-file=.env.local scripts/migrate-final-reminder.mjs

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Did you pass --env-file=.env.local?');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const statements = [
  `alter table reservations add column if not exists final_reminder_sent_at timestamptz`,
  // The soon-cron runs every few minutes and only ever looks at unsent, dated
  // rows — keep that scan off the full table.
  `create index if not exists reservations_final_reminder_pending_idx
     on reservations (preferred_date, time_slot)
     where final_reminder_sent_at is null`,
];

for (const stmt of statements) {
  const label = stmt.split('\n')[0].trim().slice(0, 80);
  process.stdout.write(`→ ${label}… `);
  await sql.query(stmt);
  console.log('ok');
}

// Same backfill logic as the day-of reminder: never surprise someone whose visit
// is already in the past with a "starting soon" email.
const backfilled = await sql.query(
  `update reservations
      set final_reminder_sent_at = now()
    where final_reminder_sent_at is null
      and (preferred_date is null
           or time_slot is null
           or ((preferred_date + time_slot::time) at time zone 'America/Chicago') < now())
    returning id`
);
console.log(`\nBackfilled ${backfilled.length} past/undated reservation(s) as already reminded.`);
