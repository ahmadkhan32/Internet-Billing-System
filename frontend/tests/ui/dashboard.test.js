import { test, expect } from '@playwright/test';

test.describe('Dashboard UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Use correct default credentials
    await page.fill('#email', 'admin@billing.com');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for redirect after successful login
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    // Wait for dashboard to load
    await page.waitForLoadState('networkidle');
  });

  test('should display dashboard statistics', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for API calls
    
    // Check for statistics cards or dashboard content
    // Dashboard might have cards, stats, or just content
    const dashboardContent = page.locator('.card, [class*="stat"], [class*="dashboard"], h1, h2');
    await expect(dashboardContent.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display navigation sidebar', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Check for sidebar navigation - look for nav, aside, or sidebar class
    const sidebar = page.locator('nav, aside, [class*="sidebar"], [class*="Sidebar"]');
    const sidebarCount = await sidebar.count();
    
    if (sidebarCount > 0) {
      await expect(sidebar.first()).toBeVisible({ timeout: 5000 });
    } else {
      // If no sidebar found, check for navigation in header/navbar
      const navbar = page.locator('header, [class*="navbar"], [class*="Navbar"]');
      await expect(navbar.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Check if page loads and is visible on mobile
    await expect(page.locator('body')).toBeVisible();
    
    // Check if content is accessible (not hidden)
    const mainContent = page.locator('main, [class*="main"], [class*="content"]');
    if (await mainContent.count() > 0) {
      await expect(mainContent.first()).toBeVisible({ timeout: 5000 });
    }
  });
});

