// One-shot migration for the abuse-prevention + notification tables:
//   - rate_limits            : throttles the public form endpoints across serverless instances
//   - welcomed_emails        : send-once ledger so the sleep-guide welcome can't be mail-bombed
//   - notification_recipients: DB-managed booking-alert list (edited at /admin/notifications)
// Idempotent — safe to re-run.
//
// Run with:  node --env-file=.env.local scripts/migrate-rate-limits.mjs

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Did you pass --env-file=.env.local?');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const statements = [
  `create table if not exists rate_limits (
    bucket     text        primary key,
    count      int         not null default 1,
    expires_at timestamptz not null
  )`,
  `create index if not exists rate_limits_expires_idx on rate_limits (expires_at)`,
  `create table if not exists welcomed_emails (
    email_canonical text        primary key,
    created_at      timestamptz not null default now()
  )`,
  `create table if not exists notification_recipients (
    id         bigserial   primary key,
    email      text        not null unique,
    label      text,
    created_at timestamptz not null default now()
  )`,
];

for (const stmt of statements) {
  const label = stmt.split('\n')[0].trim().slice(0, 80);
  process.stdout.write(`→ ${label}… `);
  await sql.query(stmt);
  console.log('ok');
}

console.log('\nDone.');
