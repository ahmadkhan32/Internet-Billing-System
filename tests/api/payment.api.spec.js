// tests/api/payment.api.spec.js
import { test, expect, request } from '@playwright/test';
import { API_BASE_URL, API_ENDPOINTS, TEST_CREDENTIALS } from '../utils/testData.js';

let authToken = '';

test.describe('Payment API Tests', () => {
  test.beforeAll(async ({ request: apiRequest }) => {
    // Login to get auth token
    const loginResponse = await apiRequest.post(`${API_BASE_URL}${API_ENDPOINTS.auth.login}`, {
      data: {
        email: TEST_CREDENTIALS.admin.email,
        password: TEST_CREDENTIALS.admin.password,
      },
    });
    
    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    authToken = loginData.token || loginData.data?.token || '';
  });

  test('GET all payments (API)', async ({ request: apiRequest }) => {
    const response = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.payments.list}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('payments');
    expect(Array.isArray(data.payments)).toBeTruthy();
  });

  test('POST create payment (API)', async ({ request: apiRequest }) => {
    // First get a bill ID
    const billsResponse = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.bills.list}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    const billsData = await billsResponse.json();
    
    if (billsData.bills && billsData.bills.length > 0) {
      const billId = billsData.bills[0].id;
      const billAmount = billsData.bills[0].amount || 1000;
      
      const response = await apiRequest.post(`${API_BASE_URL}${API_ENDPOINTS.payments.create}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          bill_id: billId,
          amount: billAmount,
          method: 'cash',
          transaction_id: 'TXN-' + Date.now(),
          notes: 'Test payment from Playwright API test',
        },
      });
      
      // Should be 201 Created or 200 OK
      expect([200, 201]).toContain(response.status());
      const data = await response.json();
      expect(data).toHaveProperty('payment');
    }
  });

  test('GET payment by ID (API)', async ({ request: apiRequest }) => {
    // First get all payments to find an ID
    const paymentsResponse = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.payments.list}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    const paymentsData = await paymentsResponse.json();
    
    if (paymentsData.payments && paymentsData.payments.length > 0) {
      const paymentId = paymentsData.payments[0].id;
      
      const response = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.payments.get(paymentId)}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      expect(response.status()).toBe(200);
      const paymentData = await response.json();
      expect(paymentData).toHaveProperty('payment');
      expect(paymentData.payment.id).toBe(paymentId);
    }
  });
});

