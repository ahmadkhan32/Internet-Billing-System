// tests/utils/authHelpers.js
// Helper functions for authentication in tests

import { TEST_CREDENTIALS } from './testData.js';

/**
 * Login helper function for Playwright tests
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} role - User role (superAdmin, admin, accountManager, customer, businessAdmin)
 * @returns {Promise<void>}
 */
export async function loginAs(page, role = 'admin') {
  const credentials = TEST_CREDENTIALS[role];
  
  if (!credentials) {
    throw new Error(`Invalid role: ${role}. Available roles: ${Object.keys(TEST_CREDENTIALS).join(', ')}`);
  }

  await page.goto('/login');
  
  // Fill email
  await page.fill('input[id="email"]', credentials.email);
  
  // Fill password
  await page.fill('input[id="password"]', credentials.password);
  
  // Fill business ID if provided
  if (credentials.businessId) {
    // Click show business ID button if it exists
    const showBusinessIdBtn = page.locator('button:has-text("Show")');
    if (await showBusinessIdBtn.isVisible()) {
      await showBusinessIdBtn.click();
    }
    await page.fill('input[id="businessId"]', credentials.businessId);
  }
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL(/\/dashboard/, { timeout: 10000 });
}

/**
 * Wait for page to be fully loaded
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
export async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Get authentication token from localStorage
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<string|null>}
 */
export async function getAuthToken(page) {
  return await page.evaluate(() => {
    return localStorage.getItem('token');
  });
}

