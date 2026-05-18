// Quick sanity-check of the schema. Run with:
//   node --env-file=.env.local scripts/verify-db.mjs
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

for (const table of ['subscribes', 'reservations']) {
  const cols = await sql.query(
    `select column_name, data_type from information_schema.columns
     where table_schema='public' and table_name=$1 order by ordinal_position`,
    [table]
  );
  console.log(`\n${table}:`);
  for (const c of cols) console.log(`  ${c.column_name.padEnd(20)} ${c.data_type}`);
}
