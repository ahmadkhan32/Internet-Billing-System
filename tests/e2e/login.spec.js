// tests/e2e/login.spec.js
import { test, expect } from '@playwright/test';
import { loginAs } from '../utils/authHelpers.js';
import { TEST_CREDENTIALS } from '../utils/testData.js';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Admin can log in successfully', async ({ page }) => {
    await loginAs(page, 'admin');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verify dashboard content is visible
    await expect(page.locator('h1, h2')).toContainText(/Welcome|Dashboard|Billing/i);
  });

  test('Super Admin can log in successfully', async ({ page }) => {
    await loginAs(page, 'superAdmin');
    
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('body')).not.toContainText('Invalid credentials');
  });

  test('Account Manager can log in successfully', async ({ page }) => {
    await loginAs(page, 'accountManager');
    
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('Customer can log in successfully', async ({ page }) => {
    await loginAs(page, 'customer');
    
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('Login fails with invalid credentials', async ({ page }) => {
    await page.fill('input[id="email"]', 'invalid@example.com');
    await page.fill('input[id="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('.bg-red-100, .text-red-700, [role="alert"]')).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('Login form validation works', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // HTML5 validation should prevent submission
    const emailInput = page.locator('input[id="email"]');
    const passwordInput = page.locator('input[id="password"]');
    
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('Business Admin can log in with Business ID', async ({ page }) => {
    const credentials = TEST_CREDENTIALS.businessAdmin;
    
    await page.fill('input[id="email"]', credentials.email);
    await page.fill('input[id="password"]', credentials.password);
    
    // Show business ID field
    const showBtn = page.locator('button:has-text("Show")');
    if (await showBtn.isVisible()) {
      await showBtn.click();
      await page.fill('input[id="businessId"]', credentials.businessId);
    }
    
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });
});

