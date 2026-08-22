// One-time schema setup for the leads/reservations DB.
// Idempotent — uses CREATE TABLE IF NOT EXISTS so it's safe to re-run.
//
// Run with:  node --env-file=.env.local scripts/init-db.mjs

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Did you pass --env-file=.env.local?');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const statements = [
  `create table if not exists subscribes (
    id           bigserial primary key,
    email        text        not null,
    source       text        not null default 'unknown',
    utm_source   text,
    utm_medium   text,
    utm_campaign text,
    created_at   timestamptz not null default now(),
    unique (email, source)
  )`,
  `create index if not exists subscribes_created_at_idx on subscribes (created_at desc)`,
  `create table if not exists reservations (
    id             bigserial primary key,
    name           text        not null,
    email          text        not null,
    phone          text,
    preferred_date date,
    time_slot      text,
    mattresses     text[]      not null default '{}',
    notes          text,
    source         text        not null default 'reserve-elmhurst',
    location       text        not null,
    created_at     timestamptz not null default now(),
    reminder_sent_at       timestamptz,
    final_reminder_sent_at timestamptz
  )`,
  `create index if not exists reservations_created_at_idx on reservations (created_at desc)`,
  `create index if not exists reservations_reminder_pending_idx
     on reservations (preferred_date)
     where reminder_sent_at is null`,
  `create index if not exists reservations_final_reminder_pending_idx
     on reservations (preferred_date, time_slot)
     where final_reminder_sent_at is null`,
  `create unique index if not exists reservations_date_slot_uniq
     on reservations (preferred_date, time_slot)
     where preferred_date is not null and time_slot is not null`,
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

const tables = await sql.query(
  `select table_name from information_schema.tables where table_schema='public' order by table_name`
);
console.log('\nPublic tables:', tables.map((r) => r.table_name).join(', '));
