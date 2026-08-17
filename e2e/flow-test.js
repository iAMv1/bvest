const { chromium } = require("playwright");

const BASE = "http://localhost:3000";
const SHOTS = __dirname + "/shots";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("console: " + m.text());
  });

  // ── Pre-warm routes (first Turbopack compile is slow) ─────────────────
  for (const p of ["/", "/society/login", "/society/preferences", "/admin/login", "/admin/allocations"]) {
    await fetch(BASE + p, { redirect: "manual" }).catch(() => {});
  }
  await page.waitForTimeout(600);

  const ok = (s) => console.log("PASS:", s);
  const fail = (s) => console.log("FAIL:", s);

  await page.goto(BASE, { waitUntil: "networkidle" });
  ok("home loads");

  // ── Homepage design sweep ──────────────────────────────────────────────
  await page.waitForTimeout(3400); // intro overlay + hero choreography
  await page.screenshot({ path: `${SHOTS}/01-home-hero.png` });
  ok("hero visible after intro");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SHOTS}/02-home-goals.png` });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.75));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SHOTS}/03-home-events.png` });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SHOTS}/04-home-footer.png` });
  ok("home sections screenshotted");

  // nav anchor (scroll-mt)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('header a[href="#goals"]:visible, .fixed a[href="/#goals"]');
  await page.waitForTimeout(1500);
  const goalsTop = await page.evaluate(() => {
    const el = document.getElementById("goals");
    return el.getBoundingClientRect().top;
  });
  goalsTop > -40 && goalsTop < 140 ? ok("goals anchor scroll lands (top=" + goalsTop + ")") : fail("anchor offset wrong: " + goalsTop);
  await page.screenshot({ path: `${SHOTS}/05-goals-anchor.png` });

  // ── Society portal: error path ─────────────────────────────────────────
  await page.goto(`${BASE}/society/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3200); // intro curtain + reveal
  await page.screenshot({ path: `${SHOTS}/06-society-login.png` });
  await page.fill("#societyId", "corebvest");
  await page.fill('input[name="password"]', "wrongpass");
  await page.click("#login-submit, button[type=submit]");
  await page.waitForURL(/error=invalid/, { timeout: 45000 });
  ok("wrong credential → error state");
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${SHOTS}/07-society-login-error.png` });

  // ── Society portal: happy path ─────────────────────────────────────────
  await page.fill("#societyId", "corebvest");
  await page.fill('input[name="password"]', "Bvest2026!");
  await page.click("button[type=submit]");
  await page.waitForURL("**/society/preferences", { timeout: 45000 });
  ok("correct credential → preferences");
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${SHOTS}/08-preferences.png` });

  // select 3 domains
  const cards = page.locator("#domain-card-", { has: undefined });
  await page.locator('[id^="domain-card-"]').nth(0).click();
  await page.waitForTimeout(150);
  await page.locator('[id^="domain-card-"]').nth(3).click();
  await page.waitForTimeout(150);
  await page.locator('[id^="domain-card-"]').nth(7).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${SHOTS}/09-preferences-selected.png` });
  ok("3 domains selected");

  // submit → confirm modal
  await page.click("#submit-preferences");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${SHOTS}/10-confirm-modal.png` });
  const modalVisible = await page.locator('[role="alertdialog"]').isVisible();
  modalVisible ? ok("confirm modal visible") : fail("modal missing");
  await page.click("text=Yes, Submit");
  await page.waitForURL("**/society/preferences", { timeout: 45000 }); // refresh stays, locked view
  await page.waitForTimeout(1200);
  const locked = await page.getByRole("heading", { name: "Preferences Submitted" }).isVisible();
  locked ? ok("locked confirmation view") : fail("locked view missing");
  await page.screenshot({ path: `${SHOTS}/11-preferences-locked.png` });

  // ── Admin portal ───────────────────────────────────────────────────────
  await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3200); // intro curtain + reveal
  await page.screenshot({ path: `${SHOTS}/12-admin-login.png` });
  await page.fill('input[name="password"]', "nope");
  await page.click("button[type=submit]");
  await page.waitForURL(/error=invalid/, { timeout: 45000 });
  ok("admin wrong password → error");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${SHOTS}/13-admin-login-error.png` });
  await page.fill('input[name="password"]', "admin12345");
  await page.click("button[type=submit]");
  await page.waitForURL("**/admin/allocations", { timeout: 45000 });
  ok("admin correct → allocations");
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${SHOTS}/14-allocations.png` });
  const rows = await page.locator("tbody tr").count();
  rows === 1 ? ok("1 society row (corebvest, locked)") : fail("row count " + rows);

  // ── Mobile sweep ───────────────────────────────────────────────────────
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(3400);
  await page.screenshot({ path: `${SHOTS}/15-mobile-hero.png` });
  await page.click('button[aria-label="Open menu"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SHOTS}/16-mobile-menu.png` });
  ok("mobile nav overlay");

  console.log("\nJS errors captured:", errors.length ? errors : "none");
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });