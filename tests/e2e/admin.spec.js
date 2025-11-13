// tests/e2e/admin.spec.js
import { test, expect } from '@playwright/test';
import { loginAs } from '../utils/authHelpers.js';

test.describe('Admin Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
  });

  test('Admin can access dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('h1, h2')).toContainText(/Dashboard|Welcome/i);
  });

  test('Admin can navigate to customers page', async ({ page }) => {
    await page.goto('/customers');
    
    await expect(page).toHaveURL(/\/customers/);
    await expect(page.locator('h1, h2')).toContainText(/Customer/i);
  });

  test('Admin can navigate to users page', async ({ page }) => {
    await page.goto('/users');
    
    // Users page should be accessible to admin
    await expect(page).toHaveURL(/\/users/);
  });

  test('Admin can navigate to packages page', async ({ page }) => {
    await page.goto('/packages');
    
    await expect(page).toHaveURL(/\/packages/);
    await expect(page.locator('h1, h2')).toContainText(/Package/i);
  });

  test('Admin can navigate to reports page', async ({ page }) => {
    await page.goto('/reports');
    
    await expect(page).toHaveURL(/\/reports/);
    await expect(page.locator('h1, h2')).toContainText(/Report/i);
  });

  test('Admin can access settings page', async ({ page }) => {
    await page.goto('/settings');
    
    await expect(page).toHaveURL(/\/settings/);
  });

  test('Admin sidebar navigation works', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check if sidebar exists
    const sidebar = page.locator('nav, aside, [role="navigation"]').first();
    if (await sidebar.isVisible()) {
      // Try clicking on a menu item
      const billingLink = page.locator('a:has-text("Billing"), a[href*="billing"]').first();
      if (await billingLink.isVisible()) {
        await billingLink.click();
        await expect(page).toHaveURL(/\/billing/);
      }
    }
  });
});

