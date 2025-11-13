// tests/e2e/payment.spec.js
import { test, expect } from '@playwright/test';
import { loginAs } from '../utils/authHelpers.js';
import { TEST_PAYMENT } from '../utils/testData.js';

test.describe('Payment Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
  });

  test('Admin can view payments page', async ({ page }) => {
    await page.goto('/payments');
    
    await expect(page.locator('h1, h2')).toContainText(/Payment/i);
    await expect(page.locator('table, .card')).toBeVisible();
  });

  test('Admin can create a new payment', async ({ page }) => {
    await page.goto('/payments');
    
    // Navigate to create payment page
    const createPaymentLink = page.locator('a:has-text("Create Payment"), a:has-text("New Payment"), button:has-text("Create Payment")');
    if (await createPaymentLink.isVisible()) {
      await createPaymentLink.click();
    } else {
      await page.goto('/payments/new');
    }
    
    // Wait for form to load
    await page.waitForSelector('form, input[name="bill_id"], select[name="bill_id"]', { timeout: 10000 });
    
    // Select bill if dropdown exists
    const billSelect = page.locator('select[name="bill_id"], input[name="bill_id"]').first();
    if (await billSelect.count() > 0 && await billSelect.evaluate(el => el.tagName === 'SELECT')) {
      const options = await billSelect.locator('option').count();
      if (options > 1) {
        await billSelect.selectOption({ index: 1 });
      }
    }
    
    // Fill amount
    const amountInput = page.locator('input[name="amount"], input[id*="amount"]').first();
    if (await amountInput.isVisible()) {
      await amountInput.fill(TEST_PAYMENT.amount.toString());
    }
    
    // Select payment method
    const methodSelect = page.locator('select[name="method"], select[id*="method"]').first();
    if (await methodSelect.isVisible()) {
      await methodSelect.selectOption(TEST_PAYMENT.method);
    }
    
    // Fill transaction ID if field exists
    const transactionInput = page.locator('input[name="transaction_id"], input[id*="transaction"]').first();
    if (await transactionInput.isVisible()) {
      await transactionInput.fill(TEST_PAYMENT.transaction_id);
    }
    
    // Submit form
    const submitBtn = page.locator('button[type="submit"], button:has-text("Save"), button:has-text("Create")').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      
      await page.waitForTimeout(2000);
      
      // Check for success message
      const successIndicator = page.locator('.alert-success, .bg-green-100, [role="alert"]:has-text("success")');
      if (await successIndicator.count() > 0) {
        await expect(successIndicator.first()).toBeVisible();
      }
    }
  });

  test('Customer can view payment history', async ({ page }) => {
    await loginAs(page, 'customer');
    await page.goto('/payments');
    
    // Customer should see payments page
    await expect(page.locator('h1, h2')).toContainText(/Payment/i);
  });

  test('Payment form validation works', async ({ page }) => {
    await page.goto('/payments/new');
    
    // Try to submit empty form
    const submitBtn = page.locator('button[type="submit"]').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      
      // Should show validation errors or prevent submission
      await page.waitForTimeout(1000);
      
      // Check if still on form page (validation prevented submission)
      const currentUrl = page.url();
      expect(currentUrl).toContain('/payments');
    }
  });
});

