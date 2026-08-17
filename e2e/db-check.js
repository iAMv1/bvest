const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

(async () => {
  const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
  const prisma = new PrismaClient({ adapter });
  const societies = await prisma.society.findMany();
  console.log("societies:", JSON.stringify(societies.map((s) => ({ id: s.id, locked: s.locked, passLen: s.password.length }))));
  if (societies[0]) {
    const ok = await bcrypt.compare("Bvest2026!", societies[0].password);
    console.log("bcrypt compare Bvest2026!: ", ok);
  }
  await prisma.$disconnect();
})();