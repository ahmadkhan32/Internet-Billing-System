import { test, expect } from '@playwright/test';

test.describe('Billing Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"], input[name="email"]', 'admin@test.com');
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
  });

  test('should navigate to billing page', async ({ page }) => {
    await page.goto('/billing');
    await expect(page).toHaveURL(/.*billing/);
    await expect(page.locator('h1')).toContainText(/bill/i);
  });

  test('should display bills list', async ({ page }) => {
    await page.goto('/billing');
    // Wait for bills to load
    await page.waitForTimeout(2000);
    // Check if bills table or list is visible
    const billsContainer = page.locator('table, .bills-list, [data-testid="bills-list"]');
    await expect(billsContainer.first()).toBeVisible({ timeout: 5000 });
  });

  test('should open create bill form', async ({ page }) => {
    await page.goto('/billing');
    // Look for "Create Bill" or "New Bill" button
    const createButton = page.locator('a:has-text("Create"), button:has-text("Create"), a:has-text("New"), button:has-text("New")');
    if (await createButton.count() > 0) {
      await createButton.first().click();
      await page.waitForURL('**/billing/new', { timeout: 5000 });
      await expect(page).toHaveURL(/.*billing.*new/);
    }
  });
});

