# 🤖 n8n Automation Integration Guide

This guide explains how to integrate n8n workflows with the Internet Billing System for automated subscription lifecycle management.

## 📋 Overview

The system provides webhook endpoints that n8n can call to:
- Check for expiring subscriptions
- Suspend expired businesses
- Generate invoices automatically
- Reactivate businesses after renewal
- Handle installation invoices

## 🔗 Webhook Endpoints

All webhook endpoints are available at: `http://your-backend-url/api/automation/webhook/`

### 1. Check Expiring Subscriptions
**Endpoint:** `POST /api/automation/webhook/check-expiry`

**Description:** Checks for subscriptions expiring in 3 days and sends reminder notifications.

**Request Body:**
```json
{
  "api_key": "your-n8n-api-key" // Optional if N8N_API_KEY is not set in .env
}
```

**Response:**
```json
{
  "success": true,
  "message": "Expiry reminders processed",
  "reminders_sent": 2,
  "results": [
    {
      "business": "ISP 1",
      "business_id": "BIZ-2025-0001",
      "expiry_date": "Jan 15, 2025",
      "status": "reminder_sent"
    }
  ]
}
```

---

### 2. Suspend Expired Businesses
**Endpoint:** `POST /api/automation/webhook/suspend-expired`

**Description:** Suspends businesses whose subscriptions have expired.

**Request Body:**
```json
{
  "api_key": "your-n8n-api-key"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Expired businesses processed",
  "suspended": 1,
  "results": [
    {
      "business": "ISP 2",
      "business_id": "BIZ-2025-0002",
      "expiry_date": "Jan 10, 2025",
      "status": "suspended"
    }
  ]
}
```

---

### 3. Generate Subscription Invoice
**Endpoint:** `POST /api/automation/webhook/subscription-start`

**Description:** Generates an invoice when a subscription starts.

**Request Body:**
```json
{
  "api_key": "your-n8n-api-key",
  "business_id": 1,
  "isp_id": 1  // Alternative to business_id
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription invoice generated successfully"
}
```

---

### 4. Generate Installation Invoice
**Endpoint:** `POST /api/automation/webhook/installation`

**Description:** Generates an invoice when a customer installation is completed.

**Request Body:**
```json
{
  "api_key": "your-n8n-api-key",
  "customer_id": 123,
  "installation_id": 456  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Installation invoice generated successfully"
}
```

---

### 5. Reactivate Business
**Endpoint:** `POST /api/automation/webhook/reactivate`

**Description:** Reactivates a business after renewal payment.

**Request Body:**
```json
{
  "api_key": "your-n8n-api-key",
  "business_id": 1,
  "isp_id": 1  // Alternative to business_id
}
```

**Response:**
```json
{
  "success": true,
  "message": "Business reactivated successfully"
}
```

---

## 🔐 API Key Security

To secure webhook endpoints, set `N8N_API_KEY` in your `.env` file:

```env
N8N_API_KEY=your-secret-api-key-here
```

Then include it in webhook requests:
- **Header:** `X-API-Key: your-secret-api-key-here`
- **Body:** `{ "api_key": "your-secret-api-key-here" }`

---

## 📅 n8n Workflow Examples

### Workflow 1: Daily Subscription Expiry Check

**Trigger:** Cron (Every day at 8:00 AM)

**Steps:**
1. **Cron Node**
   - Schedule: `0 8 * * *` (8 AM daily)

2. **HTTP Request Node** → Check Expiring Subscriptions
   - Method: `POST`
   - URL: `http://localhost:8000/api/automation/webhook/check-expiry`
   - Headers:
     ```json
     {
       "Content-Type": "application/json",
       "X-API-Key": "{{ $env.N8N_API_KEY }}"
     }
     ```
   - Body:
     ```json
     {
       "api_key": "{{ $env.N8N_API_KEY }}"
     }
     ```

3. **IF Node** → Check if reminders were sent
   - Condition: `{{ $json.reminders_sent }} > 0`

4. **Send Email Node** (Optional) → Notify Super Admin
   - Send email to Super Admin if reminders were sent

---

### Workflow 2: Daily Expired Business Suspension

**Trigger:** Cron (Every day at 9:00 AM)

**Steps:**
1. **Cron Node**
   - Schedule: `0 9 * * *` (9 AM daily)

2. **HTTP Request Node** → Suspend Expired Businesses
   - Method: `POST`
   - URL: `http://localhost:8000/api/automation/webhook/suspend-expired`
   - Headers:
     ```json
     {
       "Content-Type": "application/json",
       "X-API-Key": "{{ $env.N8N_API_KEY }}"
     }
     ```

3. **IF Node** → Check if businesses were suspended
   - Condition: `{{ $json.suspended }} > 0`

4. **Send Email Node** → Notify Super Admin
   - Subject: `{{ $json.suspended }} Business(es) Suspended`
   - Body: List of suspended businesses

---

### Workflow 3: Subscription Start Invoice

**Trigger:** Webhook (when subscription is activated)

**Steps:**
1. **Webhook Node**
   - Method: `POST`
   - Path: `/subscription-start`

2. **HTTP Request Node** → Generate Invoice
   - Method: `POST`
   - URL: `http://localhost:8000/api/automation/webhook/subscription-start`
   - Body:
     ```json
     {
       "api_key": "{{ $env.N8N_API_KEY }}",
       "business_id": "{{ $json.business_id }}"
     }
     ```

3. **Send Email Node** → Notify Business Admin
   - Send invoice email to business admin

---

### Workflow 4: Installation Invoice

**Trigger:** Webhook (when installation is completed)

**Steps:**
1. **Webhook Node**
   - Method: `POST`
   - Path: `/installation-complete`

2. **HTTP Request Node** → Generate Invoice
   - Method: `POST`
   - URL: `http://localhost:8000/api/automation/webhook/installation`
   - Body:
     ```json
     {
       "api_key": "{{ $env.N8N_API_KEY }}",
       "customer_id": "{{ $json.customer_id }}",
       "installation_id": "{{ $json.installation_id }}"
     }
     ```

---

## 🚀 Setting Up n8n Workflows

### Step 1: Import Workflow JSON

1. Go to your n8n instance: `https://ahmad0021.app.n8n.cloud`
2. Click **"Workflows"** → **"Import from File"**
3. Import the workflow JSON files (see below)

### Step 2: Configure Environment Variables

In n8n, set these environment variables:
- `N8N_API_KEY`: Your API key (same as in backend `.env`)
- `BACKEND_URL`: `http://localhost:8000` (or your backend URL)

### Step 3: Update Webhook URLs

Replace `http://localhost:8000` with your actual backend URL in all HTTP Request nodes.

---

## 📦 Workflow JSON Files

### Daily Expiry Check Workflow

```json
{
  "name": "Daily Subscription Expiry Check",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 8 * * *"
            }
          ]
        }
      },
      "name": "Cron",
      "type": "n8n-nodes-base.cron",
      "position": [250, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $env.BACKEND_URL }}/api/automation/webhook/check-expiry",
        "options": {
          "headers": {
            "X-API-Key": "={{ $env.N8N_API_KEY }}"
          }
        },
        "body": {
          "api_key": "={{ $env.N8N_API_KEY }}"
        }
      },
      "name": "Check Expiry",
      "type": "n8n-nodes-base.httpRequest",
      "position": [450, 300]
    }
  ],
  "connections": {
    "Cron": {
      "main": [[{ "node": "Check Expiry", "type": "main", "index": 0 }]]
    }
  }
}
```

---

## 🔄 Backend Cron Jobs (Fallback)

The backend also runs cron jobs as a fallback:

- **8:00 AM Daily:** Check expiring subscriptions
- **9:00 AM Daily:** Suspend expired businesses

These run automatically even if n8n is not configured.

---

## 📊 Monitoring Automation Logs

View automation logs via API:

**Endpoint:** `GET /api/automation/logs`

**Query Parameters:**
- `type`: Filter by type (e.g., `subscription_expiry_reminder`)
- `status`: Filter by status (`success`, `failed`, `pending`)
- `business_id`: Filter by business
- `page`: Page number
- `limit`: Items per page

**Example:**
```
GET /api/automation/logs?type=subscription_expiry_reminder&status=success&page=1&limit=20
```

---

## 🛠️ Troubleshooting

### Webhook Returns 401 Unauthorized
- Check that `N8N_API_KEY` is set in backend `.env`
- Verify API key is included in request (header or body)

### Webhook Returns 500 Error
- Check backend logs for detailed error messages
- Verify database connection
- Ensure all required models are synced

### Cron Jobs Not Running
- Verify `node-cron` is installed: `npm install node-cron`
- Check server logs for cron job initialization
- Ensure server timezone is correct

---

## 📝 Next Steps

1. **Set up n8n workflows** using the examples above
2. **Configure API key** in both backend and n8n
3. **Test webhooks** using n8n's webhook testing feature
4. **Monitor logs** via `/api/automation/logs` endpoint
5. **Customize email templates** in `backend/utils/sendEmail.js`

---

## 🔗 Related Files

- **Automation Controller:** `backend/controllers/automationController.js`
- **Automation Routes:** `backend/routes/automationRoutes.js`
- **Monthly Scheduler:** `backend/utils/monthlyScheduler.js`
- **Email Service:** `backend/utils/sendEmail.js`
- **Invoice Generator:** `backend/utils/generateInvoice.js`

---

**Need Help?** Check the backend logs or contact support.

