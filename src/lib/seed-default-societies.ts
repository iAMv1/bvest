import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const DEFAULT_SOCIETIES = [
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

let isSeeded = false;

export async function ensureDefaultSocieties(): Promise<void> {
  if (isSeeded) return;
  try {
    for (const s of DEFAULT_SOCIETIES) {
      const existing = await prisma.society.findUnique({ where: { id: s.id } });
      if (!existing) {
        const hashed = await bcrypt.hash(s.password, 12);
        await prisma.society.create({
          data: {
            id: s.id,
            name: s.name,
            password: hashed,
            locked: false,
            kind: s.kind,
          },
        });
        console.log(`✓ Auto-seeded core society [${s.id}] to database`);
      }
    }
    isSeeded = true;
  } catch (e) {
    console.error("Failed to auto-seed default societies:", e);
  }
}
