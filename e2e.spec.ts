import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

test.describe('Bvest End-to-End', () => {
  const baseUrl = 'http://127.0.0.1:3000';

  test.beforeAll(async () => {
    execSync('npm run prisma:seed');
  });

  test.afterAll(async () => {
    execSync('npm run prisma:seed');
  });

  test('unauthenticated redirects', async ({ page }) => {
    await page.goto(`${baseUrl}/society/preferences`);
    await expect(page).toHaveURL(/.*\/society\/login/);

    await page.goto(`${baseUrl}/admin/allocations`);
    await expect(page).toHaveURL(/.*\/admin\/login/);
  });

  test('society preference flow', async ({ page }) => {
    // 1. Log in
    await page.goto(`${baseUrl}/society/login`);
    await page.fill('input[name="societyId"]', 'corebvest');
    await page.fill('input[name="password"]', 'Bvest2026!');
    await page.click('button[type="submit"]');

    // Should redirect to preferences
    await expect(page).toHaveURL(/.*\/society\/preferences/);
    
    // Check it's unlocked
    await expect(page.locator('text=Select your society\'s 3 domain preferences')).toBeVisible();

    // Submit button should be disabled
    const submitBtn = page.locator('#submit-preferences');
    await expect(submitBtn).toBeDisabled();

    // 2. Select 3 domains
    // The cards have id like domain-card-sdg-debates
    await page.click('#domain-card-sdg-debates');
    await page.click('#domain-card-sustainable-robotics');
    await expect(submitBtn).toBeDisabled(); // 2 selected
    await page.click('#domain-card-sdg-ideation');
    
    // Button should be enabled now
    await expect(submitBtn).toBeEnabled();

    // 3. Submit and confirm
    await submitBtn.click();
    
    // Modal should appear
    await expect(page.locator('text=Confirm your choices?')).toBeVisible();
    await page.click('text=Yes, Submit');

    // 4. Verify locked view
    await expect(page.locator('text=Preferences Submitted')).toBeVisible();
    await expect(page.locator('text=Preferences are now locked')).toBeVisible();

    // 5. Refresh to confirm it persists
    await page.reload();
    await expect(page.locator('text=Preferences are now locked')).toBeVisible();
  });

  test('admin allocation view', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`);
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*\/admin\/allocations/);
    
    // Find the row for corebvest
    const row = page.locator('tr:has-text("corebvest")');
    await expect(row).toBeVisible();
    
    // Check status is Locked
    await expect(row.locator('text=Locked')).toBeVisible();
    
    // Check ranks
    await expect(row).toContainText('SDG Debates');
    await expect(row).toContainText('Sustainable Robotics');
    await expect(row).toContainText('SDG Ideation');
  });
});
