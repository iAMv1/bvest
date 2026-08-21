import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

function makePrisma(): PrismaClient {
  const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  // Build guard: if adapter mismatches schema provider (e.g. postgres schema but sqlite url at build), don't throw — return dummy that will be recreated at runtime with correct env
  try {
    if (url.startsWith("postgres")) {
      const adapter = new PrismaNeon({ connectionString: url });
      return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
    }
    const adapter = new PrismaBetterSqlite3({ url });
    return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
  } catch (e) {
    // At build time without DB, return a proxied dummy that throws only on actual query, not on import
    console.warn("Prisma init at build without DB, using lazy dummy:", (e as Error)?.message?.slice(0, 120));
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        if (prop === "then" || prop === "catch" || prop === "finally") return undefined;
        return () => {
          throw new Error(`Prisma not ready at build — ${String(prop)} called without DATABASE_URL`);
        };
      },
    });
  }
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const p = makePrisma();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = p;
  return p;
}
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_, prop) {
    const target = getPrisma();
    const val = (target as any)[prop];
    return typeof val === "function" ? val.bind(target) : val;
  },
});
