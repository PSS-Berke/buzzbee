// One-shot migration for paid Stripe orders, written by /api/stripe/webhook.
// Keyed on the Checkout Session id so a webhook Stripe re-delivers is a no-op.
// Idempotent — safe to re-run.
//
// Run with:  node --env-file=.env.local scripts/migrate-orders.mjs

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Did you pass --env-file=.env.local?');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const statements = [
  `create table if not exists orders (
    stripe_session_id text        primary key,
    email             text,
    name              text,
    phone             text,
    amount_total      int         not null,
    currency          text        not null,
    fulfillment       text        not null,
    shipping_address  jsonb,
    line_items        jsonb       not null,
    created_at        timestamptz not null default now()
  )`,
  `create index if not exists orders_created_idx on orders (created_at desc)`,
];

for (const stmt of statements) {
  const label = stmt.split('\n')[0].trim().slice(0, 80);
  process.stdout.write(`→ ${label}… `);
  await sql.query(stmt);
  console.log('ok');
}

console.log('\nDone.');
