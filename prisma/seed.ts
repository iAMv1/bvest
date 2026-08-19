import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";

// ── Add more societies here — id must be unique ──────────────────────────────
const SOCIETIES: { id: string; name: string; password: string; kind?: string }[] = [
  {
    id: "core-tech",
    name: "Core Tech Team",
    password: "TechCore2026!",
    kind: "GROUP",
  },
  {
    id: "core-events",
    name: "Core Events Team",
    password: "EventsCore2026!",
    kind: "GROUP",
  },
  {
    id: "core-media",
    name: "Core Media Team",
    password: "MediaCore2026!",
    kind: "GROUP",
  },
];


// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  const adapter = url.startsWith("postgres")
    ? new PrismaNeon({ connectionString: url })
    : new PrismaBetterSqlite3({ url });
  const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

  const plaintextLog: string[] = ["Society Credentials (KEEP PRIVATE)\n", "=".repeat(40)];

  try {
    for (const society of SOCIETIES) {
      const hashed = await bcrypt.hash(society.password, 12);

      // Clear any existing preferences to reset state
      await prisma.preference.deleteMany({
        where: { societyId: society.id },
      });

      await prisma.society.upsert({
        where: { id: society.id },
        update: { name: society.name, password: hashed, locked: false, submittedAt: null, kind: society.kind },
        create: { id: society.id, name: society.name, password: hashed, locked: false, kind: society.kind },
      });

      const line = `id: ${society.id}  |  password: ${society.password}`;
      console.log("✓ Seeded:", line);
      plaintextLog.push(line);
    }

    // Write plaintext credentials to a gitignored file for safe offline reference
    const outPath = path.join(__dirname, "..", "docs", "seeds-plaintext.txt");
    fs.writeFileSync(outPath, plaintextLog.join("\n") + "\n");
    console.log("\nPlaintext credentials saved to:", outPath, "(gitignored — do not commit)");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
