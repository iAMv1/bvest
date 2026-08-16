const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto("http://localhost:3000/events/13", { waitUntil: "networkidle" });
  await page.waitForTimeout(3300);
  await page.screenshot({ path: "e2e/shots/17-error-404.png" });
  console.log("404 url:", page.url());

  await page.goto("http://localhost:3000/society/preferences", { waitUntil: "networkidle" });
  await page.waitForTimeout(3300);
  await page.screenshot({ path: "e2e/shots/18-preferences-redirect.png" });
  console.log("prefs url:", page.url());

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/nope", { waitUntil: "networkidle" });
  await page.waitForTimeout(3300);
  await page.screenshot({ path: "e2e/shots/19-404-mobile.png" });
  console.log("mobile 404 url:", page.url());
  console.log("JS errors:", errors.length ? errors : "none");
  await browser.close();
})();