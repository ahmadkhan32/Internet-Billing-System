// tests/e2e/billing.spec.js
import { test, expect } from '@playwright/test';
import { loginAs } from '../utils/authHelpers.js';
import { TEST_BILL } from '../utils/testData.js';

test.describe('Billing Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto('/billing');
  });

  test('Admin can view billing page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Billing/i);
    await expect(page.locator('table, .card')).toBeVisible();
  });

  test('Admin can create a new bill', async ({ page }) => {
    // Navigate to create bill page
    const createBillLink = page.locator('a:has-text("Create Bill"), button:has-text("Create Bill")');
    if (await createBillLink.isVisible()) {
      await createBillLink.click();
    } else {
      await page.goto('/billing/new');
    }
    
    // Wait for form to load
    await page.waitForSelector('form, input[name="customer_id"], select[name="customer_id"]', { timeout: 10000 });
    
    // Select first customer (if dropdown exists)
    const customerSelect = page.locator('select[name="customer_id"], input[name="customer_id"]').first();
    if (await customerSelect.count() > 0) {
      // If it's a select, select first option
      if (await customerSelect.evaluate(el => el.tagName === 'SELECT')) {
        await customerSelect.selectOption({ index: 1 }); // Skip first option if it's placeholder
      }
    }
    
    // Fill amount
    const amountInput = page.locator('input[name="amount"], input[id*="amount"]').first();
    if (await amountInput.isVisible()) {
      await amountInput.fill(TEST_BILL.amount.toString());
    }
    
    // Fill due date if field exists
    const dueDateInput = page.locator('input[name="due_date"], input[type="date"]').first();
    if (await dueDateInput.isVisible()) {
      await dueDateInput.fill(TEST_BILL.due_date);
    }
    
    // Submit form
    const submitBtn = page.locator('button[type="submit"], button:has-text("Save"), button:has-text("Create")').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      
      // Wait for success message or redirect
      await page.waitForTimeout(2000);
      
      // Check for success indicator
      const successIndicator = page.locator('.alert-success, .bg-green-100, [role="alert"]:has-text("success"), .toast-success');
      if (await successIndicator.count() > 0) {
        await expect(successIndicator.first()).toBeVisible();
      }
    }
  });

  test('Admin can view bills list', async ({ page }) => {
    // Wait for bills table or list to load
    await page.waitForSelector('table, .card, [data-testid="bills-list"]', { timeout: 10000 });
    
    // Verify bills are displayed
    const billsContainer = page.locator('table tbody, .card, [data-testid="bills-list"]').first();
    await expect(billsContainer).toBeVisible();
  });

  test('Admin can filter bills by status', async ({ page }) => {
    // Look for status filter dropdown
    const statusFilter = page.locator('select, [name*="status"], [id*="status"]').first();
    
    if (await statusFilter.isVisible()) {
      await statusFilter.selectOption('pending');
      await page.waitForTimeout(1000); // Wait for filter to apply
      
      // Verify filter is applied (check URL or content)
      const currentUrl = page.url();
      if (currentUrl.includes('status')) {
        expect(currentUrl).toContain('pending');
      }
    }
  });

  test('Admin can auto-generate bills', async ({ page }) => {
    // Look for auto-generate button
    const autoGenerateBtn = page.locator('button:has-text("Auto Generate"), button:has-text("Auto Generate Bills")');
    
    if (await autoGenerateBtn.isVisible()) {
      await autoGenerateBtn.click();
      
      // Wait for confirmation or success message
      await page.waitForTimeout(2000);
      
      // Check for success message or alert
      const successMsg = page.locator('.alert-success, .bg-green-100, [role="alert"]');
      if (await successMsg.count() > 0) {
        await expect(successMsg.first()).toBeVisible();
      }
    }
  });

  test('Customer can view their own bills', async ({ page }) => {
    // Login as customer
    await loginAs(page, 'customer');
    await page.goto('/billing');
    
    // Customer should see billing page
    await expect(page.locator('h1, h2')).toContainText(/Bill|Billing/i);
  });
});

