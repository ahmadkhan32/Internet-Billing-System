// tests/e2e/customer.spec.js
import { test, expect } from '@playwright/test';
import { loginAs } from '../utils/authHelpers.js';

test.describe('Customer Portal Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'customer');
  });

  test('Customer can access dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('Customer can view their bills', async ({ page }) => {
    await page.goto('/billing');
    
    await expect(page).toHaveURL(/\/billing/);
    await expect(page.locator('h1, h2')).toContainText(/Bill|Billing/i);
  });

  test('Customer can view their payments', async ({ page }) => {
    await page.goto('/payments');
    
    await expect(page).toHaveURL(/\/payments/);
  });

  test('Customer cannot access admin-only pages', async ({ page }) => {
    // Try to access users page (admin only)
    await page.goto('/users');
    
    // Should be redirected or show access denied
    const currentUrl = page.url();
    const bodyText = await page.locator('body').textContent();
    
    // Either redirected away or shows error
    expect(currentUrl).not.toContain('/users') || 
    expect(bodyText).toMatch(/access denied|unauthorized|forbidden/i);
  });

  test('Customer can view user portal', async ({ page }) => {
    await page.goto('/portal');
    
    // User portal should be accessible
    await expect(page).toHaveURL(/\/portal/);
  });
});

