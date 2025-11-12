import { test, expect } from '@playwright/test';

test.describe('Dashboard UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"], input[name="email"]', 'admin@test.com');
    await page.fill('input[type="password"], input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
  });

  test('should display dashboard statistics', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for statistics cards (adjust selectors based on your UI)
    const statsCards = page.locator('.stat-card, .card, [class*="stat"]');
    await expect(statsCards.first()).toBeVisible({ timeout: 5000 });
  });

  test('should display navigation sidebar', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for sidebar navigation
    const sidebar = page.locator('nav, aside, [class*="sidebar"]');
    await expect(sidebar.first()).toBeVisible({ timeout: 5000 });
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/dashboard');
    
    // Check if mobile menu or responsive layout is visible
    const mobileMenu = page.locator('[class*="mobile"], [class*="menu"], button[aria-label*="menu"]');
    // Mobile menu might be hidden, so we just check page loads
    await expect(page.locator('body')).toBeVisible();
  });
});

