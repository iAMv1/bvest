import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";

neonConfig.webSocketConstructor = ws;

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

  // Load custom societies created via Admin panel
  let customSocieties: { id: string; name: string; password?: string; hashedPassword?: string; kind?: string }[] = [];
  const customPath = path.join(__dirname, "custom-societies.json");
  if (fs.existsSync(customPath)) {
    try {
      customSocieties = JSON.parse(fs.readFileSync(customPath, "utf-8"));
    } catch (e) {
      console.error("Failed to parse custom-societies.json:", e);
    }
  }

  const allToSeedMap = new Map<string, { id: string; name: string; password?: string; hashedPassword?: string; kind?: string }>();
  for (const s of SOCIETIES) {
    allToSeedMap.set(s.id, s);
  }
  for (const s of customSocieties) {
    allToSeedMap.set(s.id, s);
  }

  try {
    for (const society of allToSeedMap.values()) {
      let hashed = society.hashedPassword;
      if (!hashed && society.password) {
        hashed = await bcrypt.hash(society.password, 12);
      }
      if (!hashed) {
        hashed = await bcrypt.hash("BvestSociety2026!", 12);
      }

      await prisma.society.upsert({
        where: { id: society.id },
        // NEVER overwrite password/name/kind on existing societies — deploys must not
        // revert admin-changed credentials. Password only set on first creation.
        update: {},
        create: { id: society.id, name: society.name, password: hashed, locked: false, kind: society.kind ?? "GROUP" },
      });

      const line = `id: ${society.id}  |  password: ${society.password ?? "(hashed/custom)"}`;
      console.log("✓ Seeded:", line);
      plaintextLog.push(line);
    }

    const outDir = path.join(__dirname, "..", "docs");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outPath = path.join(outDir, "seeds-plaintext.txt");
    fs.writeFileSync(outPath, plaintextLog.join("\n") + "\n");
    console.log("\nPlaintext credentials saved to:", outPath);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
