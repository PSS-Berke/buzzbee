// One-shot migration for the customer-facing error log (shown on /admin).
// Every error message a visitor sees is recorded here with a stable code, the
// form it happened on, and technical detail for us. Idempotent — safe to re-run.
//
// Run with:  node --env-file=.env.local scripts/migrate-error-log.mjs

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Did you pass --env-file=.env.local?');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const statements = [
  `create table if not exists error_events (
    id         bigserial   primary key,
    code       text        not null,
    form       text        not null,
    path       text,
    email      text,
    detail     text,
    created_at timestamptz not null default now()
  )`,
  `create index if not exists error_events_created_idx on error_events (created_at desc)`,
];

for (const stmt of statements) {
  const label = stmt.split('\n')[0].trim().slice(0, 80);
  process.stdout.write(`→ ${label}… `);
  await sql.query(stmt);
  console.log('ok');
}

console.log('\nDone.');
