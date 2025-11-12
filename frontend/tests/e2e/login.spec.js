import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display login form', async ({ page }) => {
    // Check for email input by ID
    await expect(page.locator('#email')).toBeVisible({ timeout: 5000 });
    // Check for password input by ID
    await expect(page.locator('#password')).toBeVisible({ timeout: 5000 });
    // Check for submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible({ timeout: 5000 });
    // Check for title
    await expect(page.locator('h2:has-text("Internet Billing System")')).toBeVisible({ timeout: 5000 });
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('#email', 'invalid@test.com');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Wait for API call to complete and error message to appear
    // The error div has class "bg-red-100"
    await page.waitForTimeout(2000); // Wait for API response
    
    // Check for error message - look for the specific error div class
    const errorMessage = page.locator('.bg-red-100, div:has-text(/invalid|error|incorrect|credentials|failed/i)');
    await expect(errorMessage.first()).toBeVisible({ timeout: 15000 });
    
    // Also verify we're still on login page (not redirected)
    await expect(page).toHaveURL(/.*login/);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Use correct default credentials from backend
    await page.fill('#email', 'admin@billing.com');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for redirect after successful login
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Verify we're on dashboard
    await expect(page.locator('body')).toBeVisible();
  });
});

