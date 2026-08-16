import path from "node:path";
import { defineConfig } from "prisma/config";

// In Prisma 7, the datasource url is provided here for CLI commands (migrate, introspect, etc.)
// The PrismaClient itself uses the adapter passed in db.ts.
import "dotenv/config";

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  },
});
