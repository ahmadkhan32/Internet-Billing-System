// Test setup file
// This runs before all tests

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-testing-only';
process.env.JWT_EXPIRE = '1h';
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_USER = process.env.DB_USER || 'root';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || '';
// Use regular database for tests (tests will clean up after themselves)
// If you want a separate test DB, create it first: CREATE DATABASE internet_billing_test;
process.env.DB_NAME = process.env.DB_NAME || 'internet_billing';
process.env.PORT = process.env.PORT || 8001; // Different port for testing

// Increase timeout for database operations
jest.setTimeout(30000);

// Global test utilities
global.testUtils = {
  // Helper to create test user
  createTestUser: async (User, role = 'customer') => {
    return await User.create({
      name: 'Test User',
      email: `test${Date.now()}@test.com`,
      password: 'hashedpassword',
      role: role,
      isp_id: null
    });
  }
};

