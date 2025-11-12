const request = require('supertest');
const { app } = require('../../server');
const { User, Customer, Bill, Payment } = require('../../models');
const jwt = require('jsonwebtoken');

describe('End-to-End Integration Tests', () => {
  let authToken;
  let testUser;
  let testCustomer;
  let testBill;

  beforeAll(async () => {
    // Create test user
    testUser = await User.create({
      name: 'Integration Test Admin',
      email: `integration${Date.now()}@test.com`,
      password: 'hashedpassword',
      role: 'admin',
      isp_id: 1
    });

    authToken = jwt.sign(
      { id: testUser.id, email: testUser.email, role: testUser.role, isp_id: testUser.isp_id },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    // Cleanup
    await Payment.destroy({ where: {}, force: true });
    await Bill.destroy({ where: {}, force: true });
    await Customer.destroy({ where: {}, force: true });
    await User.destroy({ where: { id: testUser.id }, force: true });
  });

  describe('Complete Billing Workflow', () => {
    it('should complete full workflow: Create Customer → Create Bill → Record Payment', async () => {
      // Step 1: Create Customer
      const customerResponse = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Integration Test Customer',
          email: `integrationcustomer${Date.now()}@test.com`,
          phone: '9876543210',
          status: 'active'
        });

      expect(customerResponse.status).toBe(201);
      testCustomer = customerResponse.body.customer;

      // Step 2: Create Bill
      const billResponse = await request(app)
        .post('/api/bills')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: testCustomer.id,
          amount: 2000,
          due_date: new Date().toISOString(),
          billing_period_start: new Date().toISOString(),
          billing_period_end: new Date().toISOString()
        });

      expect(billResponse.status).toBe(201);
      testBill = billResponse.body.bill;

      // Step 3: Record Payment
      const paymentResponse = await request(app)
        .post('/api/payments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          bill_id: testBill.id,
          amount: 2000,
          method: 'cash',
          notes: 'Integration test payment'
        });

      expect(paymentResponse.status).toBe(201);
      expect(paymentResponse.body.payment).toBeDefined();

      // Step 4: Verify Bill Status Updated
      const updatedBillResponse = await request(app)
        .get(`/api/bills/${testBill.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(updatedBillResponse.status).toBe(200);
      expect(updatedBillResponse.body.bill.status).toBe('paid');
    });
  });
});

