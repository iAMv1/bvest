const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on("response", (r) => {
    if (r.url().includes("/society/login") && r.request().method() === "POST")
      console.log("[res]", r.status(), r.url());
  });
  page.on("framenavigated", (f) => console.log("[nav]", f.url()));

  await page.goto("http://localhost:3000/society/login");
  await page.fill("#societyId", "corebvest");
  await page.fill('input[name="password"]', "wrongpass");
  await page.click("#login-submit, button[type=submit]");
  await page.waitForTimeout(2500);
  console.log("[after-error]", page.url());

  await page.fill("#societyId", "corebvest");
  await page.fill('input[name="password"]', "Bvest2026!");
  await page.click("#login-submit, button[type=submit]");
  await page.waitForTimeout(6000);
  console.log("[after-good]", page.url());
  await browser.close();
})();