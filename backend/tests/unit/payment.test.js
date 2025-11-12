const request = require('supertest');
const { app } = require('../../server');
const { Payment, Bill, Customer, User } = require('../../models');
const jwt = require('jsonwebtoken');

describe('Payment API Tests', () => {
  let authToken;
  let testCustomer;
  let testBill;
  let testUser;

  beforeAll(async () => {
    // Create test user and get auth token
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

    // Create test bill
    testBill = await Bill.create({
      bill_number: `TEST-${Date.now()}`,
      customer_id: testCustomer.id,
      amount: 1000,
      total_amount: 1000,
      due_date: new Date(),
      billing_period_start: new Date(),
      billing_period_end: new Date(),
      isp_id: 1,
      status: 'pending'
    });
  });

  afterAll(async () => {
    // Cleanup test data
    await Payment.destroy({ where: {}, force: true });
    await Bill.destroy({ where: { id: testBill.id }, force: true });
    await Customer.destroy({ where: { id: testCustomer.id }, force: true });
    await User.destroy({ where: { id: testUser.id }, force: true });
  });

  describe('POST /api/payments', () => {
    it('should create a payment successfully', async () => {
      const response = await request(app)
        .post('/api/payments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          bill_id: testBill.id,
          amount: 500,
          method: 'cash',
          notes: 'Test payment'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.payment).toBeDefined();
      expect(response.body.payment.amount).toBe(500);
    });

    it('should return 400 for invalid payment data', async () => {
      const response = await request(app)
        .post('/api/payments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          bill_id: testBill.id,
          amount: -100, // Invalid amount
          method: 'cash'
        });

      expect(response.status).toBe(400);
    });

    it('should return 404 for non-existent bill', async () => {
      const response = await request(app)
        .post('/api/payments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          bill_id: 99999,
          amount: 500,
          method: 'cash'
        });

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/payments', () => {
    it('should get all payments', async () => {
      const response = await request(app)
        .get('/api/payments')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.payments)).toBe(true);
    });
  });
});

