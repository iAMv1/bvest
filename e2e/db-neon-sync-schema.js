// One-time additive schema sync for Neon production DB.
// Creates MISSING tables/columns/indexes/FKs only. Never drops, never deletes, never touches existing rows or password fields.
// Usage: node e2e/db-neon-sync-schema.js <neon-pooled-connection-string>
const { Pool } = require("@neondatabase/serverless");

const CONNECTION_STRING = process.argv[2];
if (!CONNECTION_STRING) {
  console.error("Usage: node e2e/db-neon-sync-schema.js <neon-pooled-connection-string>");
  process.exit(1);
}

// Desired state (mirrors prisma/schema.pg.prisma)
const EXPECTED = {
  Event: {
    columns: {
      id: "text NOT NULL",
      slug: "text NOT NULL",
      title: "text NOT NULL",
      hostSocietyId: "text",
      sdgDomainId: "text NOT NULL",
      description: "text NOT NULL",
      venue: "text",
      startDate: "timestamp(3)",
      endDate: "timestamp(3)",
      registrationUrl: "text",
      status: "text NOT NULL DEFAULT 'DRAFT'",
      resultsPublished: "boolean NOT NULL DEFAULT false",
      publishedAt: "timestamp(3)",
      createdAt: "timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP",
    },
    primaryKey: ["id"],
    uniques: { Event_slug_key: ["slug"] },
  },
  EventResult: {
    columns: {
      id: "text NOT NULL",
      eventId: "text NOT NULL",
      rank: "integer NOT NULL",
      teamName: "text NOT NULL",
      points: "integer",
      createdAt: "timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP",
    },
    primaryKey: ["id"],
    uniques: { EventResult_eventId_rank_key: ["eventId", "rank"] },
    fks: [{ name: "EventResult_eventId_fkey", col: "eventId", refTable: "Event", refCol: "id", onDelete: "CASCADE" }],
  },
  Domain: {
    columns: {
      id: "text NOT NULL",
      name: "text NOT NULL",
      description: "text NOT NULL",
      colorToken: "text NOT NULL",
      createdAt: "timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP",
    },
    primaryKey: ["id"],
    uniques: {},
  },
  Page: {
    columns: {
      id: "text NOT NULL",
      slug: "text NOT NULL",
      title: "text NOT NULL",
      navLabel: "text",
      order: "integer NOT NULL DEFAULT 0",
      showInNav: "boolean NOT NULL DEFAULT true",
      adminOnly: "boolean NOT NULL DEFAULT false",
      section: "text NOT NULL DEFAULT 'main'",
      enabled: "boolean NOT NULL DEFAULT true",
      createdAt: "timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP",
    },
    primaryKey: ["id"],
    uniques: { Page_slug_key: ["slug"] },
  },
};

const q = (s) => `"${s.replace(/"/g, '""')}"`;

(async () => {
  const pool = new Pool({ connectionString: CONNECTION_STRING });

  // 1. Snapshot current state
  const { rows: existingCols } = await pool.query(
    `SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public'`
  );
  const have = {};
  for (const r of existingCols) (have[r.table_name] ||= new Set()).add(r.column_name);

  const { rows: existingConstraints } = await pool.query(
    `SELECT conname FROM pg_constraint WHERE connamespace = 'public'::regnamespace`
  );
  const haveConstraints = new Set(existingConstraints.map((r) => r.conname));

  const { rows: existingIndexes } = await pool.query(
    `SELECT indexname FROM pg_indexes WHERE schemaname = 'public'`
  );
  const haveIndexes = new Set(existingIndexes.map((r) => r.indexname));

  const stmts = [];

  for (const [table, spec] of Object.entries(EXPECTED)) {
    const tableExists = !!have[table];
    if (!tableExists) {
      const cols = Object.entries(spec.columns)
        .map(([c, def]) => `${q(c)} ${def}`)
        .join(",\n  ");
      const pk = spec.primaryKey.map(q).join(", ");
      stmts.push({
        why: `table ${table} missing`,
        sql: `CREATE TABLE IF NOT EXISTS ${q(table)} (\n  ${cols},\n  PRIMARY KEY (${pk})\n);`,
      });
    } else {
      for (const [col, def] of Object.entries(spec.columns)) {
        if (!have[table].has(col)) {
          stmts.push({ why: `column ${table}.${col} missing`, sql: `ALTER TABLE ${q(table)} ADD COLUMN IF NOT EXISTS ${q(col)} ${def};` });
        }
      }
    }
    for (const [idxName, cols] of Object.entries(spec.uniques)) {
      if (!haveIndexes.has(idxName)) {
        const collist = cols.map(q).join(", ");
        stmts.push({ why: `unique index ${idxName}`, sql: `CREATE UNIQUE INDEX IF NOT EXISTS ${q(idxName)} ON ${q(table)} (${collist});` });
      }
    }
    for (const fk of spec.fks || []) {
      if (!haveConstraints.has(fk.name)) {
        stmts.push({
          why: `foreign key ${fk.name}`,
          sql: `DO $$ BEGIN\n  ALTER TABLE ${q(table)} ADD CONSTRAINT ${q(fk.name)} FOREIGN KEY (${q(fk.col)}) REFERENCES ${q(fk.refTable)}(${q(fk.refCol)}) ON DELETE ${fk.onDelete} ON UPDATE CASCADE;\nEXCEPTION WHEN duplicate_object THEN NULL; END $$;`,
        });
      }
    }
  }

  console.log(`Tables checked: ${Object.keys(EXPECTED).join(", ")}`);
  console.log(stmts.length === 0 ? "\nSchema already in sync — nothing to do." : `\n${stmts.length} additive statement(s) to run:\n`);
  stmts.forEach((s, i) => console.log(`[${i + 1}] -- ${s.why}\n${s.sql}\n`));

  for (const s of stmts) {
    await pool.query(s.sql);
    console.log(`APPLIED: ${s.why}`);
  }

  // 2. Verify post-state
  const { rows: after } = await pool.query(
    `SELECT table_name, column_name FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('Event','EventResult','Domain','Page') ORDER BY table_name, ordinal_position`
  );
  console.log("\n--- POST-STATE ---");
  let cur = "";
  for (const r of after) {
    if (r.table_name !== cur) { cur = r.table_name; console.log(`${cur}:`); }
    console.log(`  ${r.column_name}`);
  }

  await pool.end();
  console.log("\nDONE — additive sync complete.");
})().catch((e) => { console.error("SYNC FAILED:", e.message); process.exit(1); });
