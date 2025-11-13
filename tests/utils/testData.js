// tests/utils/testData.js
// Test data and credentials for E2E tests

export const TEST_CREDENTIALS = {
  superAdmin: {
    email: 'admin@billing.com',
    password: 'admin123',
    businessId: undefined,
  },
  admin: {
    email: 'admin@isp.com',
    password: 'Admin@123',
    businessId: undefined,
  },
  accountManager: {
    email: 'account@isp.com',
    password: 'Account@123',
    businessId: undefined,
  },
  customer: {
    email: 'customer@isp.com',
    password: 'Customer@123',
    businessId: undefined,
  },
  businessAdmin: {
    email: 'business@billing.com',
    password: 'Business@123',
    businessId: 'BIZ-2024-0001', // Example business ID
  },
};

export const TEST_CUSTOMER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: '123 Test Street',
  cnic: '12345-1234567-1',
};

export const TEST_BILL = {
  amount: 4000,
  due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
  description: 'Monthly internet bill',
};

export const TEST_PAYMENT = {
  amount: 4000,
  method: 'cash',
  transaction_id: 'TXN-' + Date.now(),
  notes: 'Test payment',
};

// API endpoints
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  bills: {
    list: '/bills',
    create: '/bills',
    get: (id) => `/bills/${id}`,
    invoice: (id) => `/bills/${id}/invoice`,
  },
  payments: {
    list: '/payments',
    create: '/payments',
    get: (id) => `/payments/${id}`,
  },
  customers: {
    list: '/customers',
    create: '/customers',
    get: (id) => `/customers/${id}`,
  },
};

