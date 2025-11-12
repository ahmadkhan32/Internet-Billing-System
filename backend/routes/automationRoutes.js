const express = require('express');
const router = express.Router();
const {
  checkExpiringSubscriptions,
  suspendExpiredBusinesses,
  generateSubscriptionInvoice,
  generateSubscriptionEndInvoice,
  reactivateBusiness,
  generateInstallationInvoice,
  getAutomationLogs
} = require('../controllers/automationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

// Public webhook endpoints for n8n (with API key validation)
// These can be called by n8n without authentication
router.post('/webhook/check-expiry', async (req, res) => {
  // Validate API key if provided
  const apiKey = req.headers['x-api-key'] || req.body.api_key;
  if (process.env.N8N_API_KEY && apiKey !== process.env.N8N_API_KEY) {
    return res.status(401).json({ message: 'Invalid API key' });
  }
  await checkExpiringSubscriptions(req, res);
});

router.post('/webhook/suspend-expired', async (req, res) => {
  const apiKey = req.headers['x-api-key'] || req.body.api_key;
  if (process.env.N8N_API_KEY && apiKey !== process.env.N8N_API_KEY) {
    return res.status(401).json({ message: 'Invalid API key' });
  }
  await suspendExpiredBusinesses(req, res);
});

router.post('/webhook/subscription-start', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.body.api_key;
    if (process.env.N8N_API_KEY && apiKey !== process.env.N8N_API_KEY) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    const { business_id, isp_id } = req.body;
    const ispId = isp_id || business_id;
    
    if (!ispId) {
      return res.status(400).json({ message: 'ISP ID or Business ID is required' });
    }

    await generateSubscriptionInvoice(ispId, 'n8n');
    res.json({
      success: true,
      message: 'Subscription invoice generated successfully'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Error generating invoice', error: error.message });
  }
});

router.post('/webhook/installation', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.body.api_key;
    if (process.env.N8N_API_KEY && apiKey !== process.env.N8N_API_KEY) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    const { customer_id, installation_id } = req.body;
    
    if (!customer_id) {
      return res.status(400).json({ message: 'Customer ID is required' });
    }

    await generateInstallationInvoice(customer_id, installation_id, 'n8n');
    res.json({
      success: true,
      message: 'Installation invoice generated successfully'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Error generating invoice', error: error.message });
  }
});

router.post('/webhook/reactivate', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.body.api_key;
    if (process.env.N8N_API_KEY && apiKey !== process.env.N8N_API_KEY) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    const { business_id, isp_id } = req.body;
    const ispId = isp_id || business_id;
    
    if (!ispId) {
      return res.status(400).json({ message: 'ISP ID or Business ID is required' });
    }

    await reactivateBusiness(ispId, 'n8n');
    res.json({
      success: true,
      message: 'Business reactivated successfully'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Error reactivating business', error: error.message });
  }
});

// Protected routes (require authentication)
router.use(authMiddleware);

// Manual trigger endpoints (for testing or manual execution)
router.post('/check-expiry', roleMiddleware('super_admin'), checkExpiringSubscriptions);
router.post('/suspend-expired', roleMiddleware('super_admin'), suspendExpiredBusinesses);
router.get('/logs', getAutomationLogs);

module.exports = router;

