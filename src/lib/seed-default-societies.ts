import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const DEFAULT_SOCIETIES = [
  { id: "core-tech", name: "Core Tech Team", password: "TechCore2026!", kind: "GROUP" },
  { id: "core-events", name: "Core Events Team", password: "EventsCore2026!", kind: "GROUP" },
  { id: "core-media", name: "Core Media Team", password: "MediaCore2026!", kind: "GROUP" },
  // 30 BVCOE member societies — auto-seeded as SOCIETY (no login, no password needed — seeded with dummy hash)
  { id: "ieee-bvcoe", name: "IEEE BVCOE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "optica", name: "OPTiCA", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "bvp-iste", name: "BVP ISTE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "dsc-bvcoe", name: "DSC BVCOE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "bvp-csi", name: "BVP CSI", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "mls-sac", name: "Microsoft Learn SAC", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "bvp-acm", name: "BVP ACM", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "bvp-isa", name: "BVP ISA", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "iet-bvcoe", name: "IET BVCOE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "techshuttle", name: "TechShuttle", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "campus-block", name: "Campus Block", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "codechef-bvcoe", name: "CodeChef BVCOE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "iosc-bvcoe", name: "IOSC BVCOE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "gfg-bvcoe", name: "GFG BVCOE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "athena-bvcoe", name: "Athena Society", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "dance-soc", name: "Dance Society", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "music-soc", name: "Music Society", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "nss-bvcoe", name: "NSS BVCOE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "das-bvcoe", name: "DAS Society", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "theatre-soc", name: "Theatre Society", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "blissful-minds", name: "Blissful Minds", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "tedx-bvcoe", name: "TEDx BVCOE", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "eduminerva", name: "Eduminerva", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "qaafila", name: "Qaafila", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "venuva", name: "Venuva", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "bvp-inc", name: "BVP Inc", password: "MemberNoLogin2026!", kind: "SOCIETY" },
  { id: "horizon-soc", name: "Horizon Society", password: "MemberNoLogin2026!", kind: "SOCIETY" },
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
