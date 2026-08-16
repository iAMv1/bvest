const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const { PrismaClient } = require("@prisma/client");

(async () => {
  const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
  const prisma = new PrismaClient({ adapter });
  await prisma.preference.deleteMany();
  await prisma.society.updateMany({ data: { locked: false, submittedAt: null } });
  const s = await prisma.society.findMany();
  console.log("reset:", JSON.stringify(s.map((x) => ({ id: x.id, locked: x.locked }))));
  await prisma.$disconnect();
})();