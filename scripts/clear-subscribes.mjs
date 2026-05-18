import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const before = await sql`
  select id, email, source, created_at from subscribes order by created_at desc
`;
console.log(`subscribes — ${before.length} row(s) before:`);
for (const r of before) {
  console.log(`  ${r.id.toString().padStart(3)}  ${r.email.padEnd(40)} ${r.source.padEnd(20)} ${r.created_at}`);
}

await sql`truncate table subscribes restart identity`;

const after = await sql`select count(*)::int as n from subscribes`;
console.log(`\nsubscribes — ${after[0].n} row(s) after.`);
