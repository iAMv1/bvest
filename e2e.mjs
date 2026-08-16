import assert from "assert";

const baseUrl = "http://localhost:3000";

async function run() {
  console.log("Testing unauthenticated access...");
  let res = await fetch(`${baseUrl}/society/preferences`, { redirect: "manual" });
  assert(res.status === 307 || res.status === 303 || res.status === 302 || res.status === 308);
  assert(res.headers.get("location").includes("/society/login"));

  res = await fetch(`${baseUrl}/admin/allocations`, { redirect: "manual" });
  assert(res.status === 307 || res.status === 303 || res.status === 302 || res.status === 308);
  assert(res.headers.get("location").includes("/admin/login"));
  console.log("✓ Unauthenticated redirects work");

  console.log("Logging into society portal...");
  const formData = new FormData();
  formData.append("societyId", "corebvest");
  formData.append("password", "Bvest2026!");
  // The login is a server action. It's tricky to trigger server actions via fetch without the exact headers.
  // Wait, let's just use regular fetch with x-action headers or just test the DB logic.
}

run().catch(console.error);
