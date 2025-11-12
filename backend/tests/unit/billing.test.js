const request = require('supertest');
const { app } = require('../../server');
const { Bill, Customer, Package, User } = require('../../models');
const jwt = require('jsonwebtoken');

describe('Billing API Tests', () => {
  let authToken;
  let testCustomer;
  let testPackage;
  let testUser;

  beforeAll(async () => {
    // Create test user
    testUser = await User.create({
      name: 'Test Admin',
      email: `admin${Date.now()}@test.com`,
      password: 'hashedpassword',
      role: 'admin',
      isp_id: 1
    });

    authToken = jwt.sign(
      { id: testUser.id, email: testUser.email, role: testUser.role, isp_id: testUser.isp_id },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );

    // Create test customer
    testCustomer = await Customer.create({
      name: 'Test Customer',
      email: `customer${Date.now()}@test.com`,
      phone: '1234567890',
      isp_id: 1,
      status: 'active'
    });

    // Create test package
    testPackage = await Package.create({
      name: 'Test Package',
      speed: 50,
      price: 1000,
      duration: 30,
      isp_id: 1
    });
  });

  afterAll(async () => {
    // Cleanup
    await Bill.destroy({ where: {}, force: true });
    await Package.destroy({ where: { id: testPackage.id }, force: true });
    await Customer.destroy({ where: { id: testCustomer.id }, force: true });
    await User.destroy({ where: { id: testUser.id }, force: true });
  });

  describe('POST /api/bills', () => {
    it('should create a bill successfully', async () => {
      const response = await request(app)
        .post('/api/bills')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: testCustomer.id,
          package_id: testPackage.id,
          amount: 1000,
          due_date: new Date().toISOString(),
          billing_period_start: new Date().toISOString(),
          billing_period_end: new Date().toISOString()
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.bill).toBeDefined();
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/bills')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: testCustomer.id
          // Missing amount and other required fields
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/bills', () => {
    it('should get all bills', async () => {
      const response = await request(app)
        .get('/api/bills')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.bills)).toBe(true);
    });
  });
});

