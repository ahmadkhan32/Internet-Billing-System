# 🤖 n8n Workflow Files

This directory contains ready-to-import n8n workflow JSON files for the Internet Billing System automation.

## 📦 Available Workflows

### 1. **Subscription Lifecycle Automation** (`subscription-lifecycle-workflow.json`)
- **Trigger:** Cron (Daily at 8:00 AM)
- **Actions:**
  - Checks for subscriptions expiring in 3 days
  - Sends reminder notifications
  - Suspends expired businesses
  - Logs all actions

### 2. **Subscription Start Invoice** (`subscription-start-invoice.json`)
- **Trigger:** Webhook (`POST /subscription-start`)
- **Actions:**
  - Generates subscription invoice when business subscribes
  - Sends invoice to Business Admin

### 3. **Installation Invoice** (`installation-invoice.json`)
- **Trigger:** Webhook (`POST /installation-complete`)
- **Actions:**
  - Generates invoice when installation is completed
  - Notifies Business Admin and Customer

### 4. **Business Reactivation** (`business-reactivation.json`)
- **Trigger:** Webhook (`POST /business-reactivate`)
- **Actions:**
  - Reactivates business after renewal payment
  - Sends reactivation notifications

## 🚀 How to Import

### Method 1: Via n8n UI

1. Open your n8n instance: `https://ahmad0021.app.n8n.cloud`
2. Click **"Workflows"** → **"Import from File"**
3. Select the JSON file you want to import
4. Click **"Import"**

### Method 2: Via n8n CLI

```bash
n8n import:workflow --file=subscription-lifecycle-workflow.json
```

## ⚙️ Configuration

After importing, configure these environment variables in n8n:

1. **BACKEND_URL**: Your backend URL (e.g., `http://localhost:8000`)
2. **N8N_API_KEY**: Your API key (same as in backend `.env`)

### Setting Environment Variables in n8n

1. Go to **Settings** → **Environment Variables**
2. Add:
   - `BACKEND_URL` = `http://localhost:8000` (or your backend URL)
   - `N8N_API_KEY` = `your-secret-api-key` (same as `N8N_API_KEY` in backend `.env`)

## 🔗 Webhook URLs

After importing workflows, n8n will provide webhook URLs. Update your backend to call these URLs when events occur:

### Example: Trigger Subscription Start Invoice

```javascript
// In your backend code
const axios = require('axios');

// When subscription starts
await axios.post('https://ahmad0021.app.n8n.cloud/webhook/subscription-start', {
  business_id: isp.id,
  isp_id: isp.id
}, {
  headers: {
    'Content-Type': 'application/json'
  }
});
```

## 📝 Workflow Details

### Subscription Lifecycle Workflow

**Schedule:** Daily at 8:00 AM

**Flow:**
1. Cron triggers at 8 AM
2. Calls `/api/automation/webhook/check-expiry`
3. If reminders sent → Log results
4. Calls `/api/automation/webhook/suspend-expired`
5. If businesses suspended → Log results

### Subscription Start Invoice

**Trigger:** Webhook POST request

**Expected Payload:**
```json
{
  "business_id": 1,
  "isp_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Invoice generated successfully"
}
```

### Installation Invoice

**Trigger:** Webhook POST request

**Expected Payload:**
```json
{
  "customer_id": 123,
  "installation_id": 456
}
```

### Business Reactivation

**Trigger:** Webhook POST request

**Expected Payload:**
```json
{
  "business_id": 1,
  "isp_id": 1
}
```

## 🧪 Testing Workflows

### Test Subscription Lifecycle

1. Manually trigger the workflow in n8n
2. Check backend logs for automation events
3. Verify notifications are created
4. Check `/api/automation/logs` endpoint

### Test Webhook Workflows

Use curl or Postman:

```bash
# Test Subscription Start
curl -X POST https://ahmad0021.app.n8n.cloud/webhook/subscription-start \
  -H "Content-Type: application/json" \
  -d '{"business_id": 1, "isp_id": 1}'

# Test Installation Complete
curl -X POST https://ahmad0021.app.n8n.cloud/webhook/installation-complete \
  -H "Content-Type: application/json" \
  -d '{"customer_id": 123, "installation_id": 456}'

# Test Business Reactivation
curl -X POST https://ahmad0021.app.n8n.cloud/webhook/business-reactivate \
  -H "Content-Type: application/json" \
  -d '{"business_id": 1, "isp_id": 1}'
```

## 🔧 Customization

You can customize these workflows by:

1. Adding email notifications using n8n's Email node
2. Adding SMS notifications using Twilio node
3. Adding Slack/Discord notifications
4. Adding database logging
5. Adding conditional logic based on business type

## 📚 Related Documentation

- **n8n Integration Guide:** `../N8N_INTEGRATION_GUIDE.md`
- **Automation Summary:** `../AUTOMATION_IMPLEMENTATION_SUMMARY.md`
- **Backend API Docs:** Check `backend/routes/automationRoutes.js`

## ⚠️ Important Notes

1. **Webhook URLs** are unique to your n8n instance
2. **API Key** must match between backend and n8n
3. **Backend URL** must be accessible from n8n
4. **Cron schedules** use UTC timezone
5. **Webhook security** - Consider adding authentication

---

**Need Help?** Check the n8n documentation or backend logs for troubleshooting.

