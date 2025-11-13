// tests/api/invoice.api.spec.js
import { test, expect, request } from '@playwright/test';
import { API_BASE_URL, API_ENDPOINTS, TEST_CREDENTIALS } from '../utils/testData.js';

let authToken = '';

test.describe('Invoice API Tests', () => {
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

  test('GET all bills (API)', async ({ request: apiRequest }) => {
    const response = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.bills.list}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('bills');
    expect(Array.isArray(data.bills)).toBeTruthy();
  });

  test('GET single bill by ID (API)', async ({ request: apiRequest }) => {
    // First get all bills to find an ID
    const billsResponse = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.bills.list}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    const billsData = await billsResponse.json();
    
    if (billsData.bills && billsData.bills.length > 0) {
      const billId = billsData.bills[0].id;
      
      const response = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.bills.get(billId)}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      expect(response.status()).toBe(200);
      const billData = await response.json();
      expect(billData).toHaveProperty('bill');
      expect(billData.bill.id).toBe(billId);
    }
  });

  test('POST create bill (API)', async ({ request: apiRequest }) => {
    // First get a customer ID
    const customersResponse = await apiRequest.get(`${API_BASE_URL}/customers`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    const customersData = await customersResponse.json();
    
    if (customersData.customers && customersData.customers.length > 0) {
      const customerId = customersData.customers[0].id;
      const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await apiRequest.post(`${API_BASE_URL}${API_ENDPOINTS.bills.create}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          customer_id: customerId,
          amount: 5000,
          due_date: dueDate,
          description: 'Test bill from Playwright API test',
        },
      });
      
      // Should be 201 Created or 200 OK
      expect([200, 201]).toContain(response.status());
      const data = await response.json();
      expect(data).toHaveProperty('bill');
    }
  });

  test('GET invoice PDF (API)', async ({ request: apiRequest }) => {
    // First get a bill ID
    const billsResponse = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.bills.list}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    const billsData = await billsResponse.json();
    
    if (billsData.bills && billsData.bills.length > 0) {
      const billId = billsData.bills[0].id;
      
      const response = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.bills.invoice(billId)}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      // Should return PDF (binary content)
      expect([200, 201]).toContain(response.status());
      const contentType = response.headers()['content-type'];
      expect(contentType).toMatch(/pdf|application\/pdf|octet-stream/i);
    }
  });

  test('API returns 401 for unauthorized requests', async ({ request: apiRequest }) => {
    const response = await apiRequest.get(`${API_BASE_URL}${API_ENDPOINTS.bills.list}`);
    
    // Should return 401 Unauthorized
    expect(response.status()).toBe(401);
  });
});

