# 🧠 Software Requirements Specification (SRS)
## Smart Automated Internet Billing System (SIBS)

**Version:** 3.0 (AI + Automation Enabled)  
**Type:** SaaS / Multi-ISP Platform  
**Technology:** MERN Stack (React, Node.js, Express, MySQL Xampp)  
**Date:** 2024

---

## 📋 Table of Contents

1. [Introduction](#1-introduction)
2. [User Roles & Responsibilities](#2-user-roles--responsibilities)
3. [Automation Features](#3-automation-features)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [System Architecture](#5-system-architecture)
6. [Project File Structure](#6-project-file-structure)
7. [Data Flow Summary](#7-data-flow-summary)
8. [Future Enhancements](#8-future-enhancements)

---

## 1. Introduction

### 1.1 Purpose

The purpose of this document is to specify requirements for the **Smart Automated Internet Billing System** that enables ISPs to manage customers, billing, payments, and services automatically with **AI-based analytics, auto notifications, and auto billing cycles**.

### 1.2 Scope

The system supports multiple ISPs (tenants) under one platform with **role-based access control**, **automated payment processing**, and **real-time dashboards**.

**Key Capabilities:**
- Automatically generate bills, invoices, and receipts
- Auto-detect overdue payments and suspend accounts
- Send smart notifications (SMS, Email, WhatsApp)
- Provide AI-driven analytics, performance insights, and fraud detection
- Allow self-service portals for customers
- Multi-tenant SaaS architecture with ISP isolation

---

## 2. User Roles & Responsibilities (Smart Automation Hierarchy)

### 👑 **SUPER ADMIN (Level 1)** – *Platform Owner*

**Access Scope:** Full SaaS control across all ISPs.

**Responsibilities:**
- ✅ Manage all ISPs (create, suspend, or delete)
- ✅ Define subscription plans for each ISP (existing plans, no extra plan creation)
- ✅ Control automation settings (AI billing engine, auto suspension rules)
- ✅ Manage APIs (payment gateways, SMS, email, WhatsApp bots)
- ✅ Access global analytics dashboard
- ✅ Approve ISP registration requests automatically via workflow
- ✅ AI auto-reports for performance, fraud, and subscription usage
- ✅ Backup and restore system data automatically (scheduled tasks)
- ✅ View AI insights and revenue projections across all ISPs

**Permissions:** All permissions (`*`)

---

### 🏢 **ISP ADMIN / BUSINESS OWNER (Level 2)**

**Access Scope:** Own ISP data only.

**Responsibilities:**
- ✅ Manage staff, customers, and billing operations
- ✅ Create service packages (speed, price, duration)
- ✅ Monitor automated reports (income, due payments, active users)
- ✅ Customize notifications, branding, and invoice templates
- ✅ Integrate local payment gateways or banking APIs
- ✅ AI dashboard provides revenue projections and customer churn risk
- ✅ Schedule auto tasks (monthly bills, email campaigns)
- ✅ View high-risk customers and fraud alerts

**Permissions:** Full ISP management (customers, bills, payments, packages, staff)

---

### 💰 **ACCOUNT MANAGER (Level 3A)**

**Access Scope:** Billing & Accounts.

**Responsibilities:**
- ✅ Verify auto-generated invoices
- ✅ Review payments and approve reconciliations
- ✅ Generate automated financial reports (daily, weekly, monthly)
- ✅ Monitor defaulter list (AI suggests high-risk customers)
- ✅ Manage tax and discount automation
- ✅ Handle refunds or adjustments (AI flag approval)
- ✅ Auto synchronization with accounting system or ERP
- ✅ View customer churn risk scores
- ✅ Detect fraud in payments

**Permissions:** Billing, payments, customers (view/update), reports

---

### 🔧 **TECHNICAL OFFICER (Level 3B)**

**Access Scope:** Service Activation & Network Operations.

**Responsibilities:**
- ✅ Handle service activations & disconnections (automated triggers)
- ✅ Integrate router/OLT systems (via API)
- ✅ Receive AI-generated maintenance schedules
- ✅ Monitor network alerts and AI-predicted failures
- ✅ Auto ticket assignment for new installation requests
- ✅ Track installation status and service performance metrics

**Permissions:** Installations, customers (view), notifications

---

### 💵 **RECOVERY OFFICER (Level 3C)**

**Access Scope:** Payment Collection.

**Responsibilities:**
- ✅ Access daily defaulter list (auto-generated)
- ✅ Use automated WhatsApp/SMS reminder campaigns
- ✅ Mark collected payments — system syncs automatically
- ✅ View AI-prioritized recovery list (sorted by likelihood to pay)
- ✅ Generate daily route plan using GPS optimization
- ✅ Review collection reports auto-sent to ISP Admin

**Permissions:** Recoveries, bills (view), payments (create), customers (view)

---

### 📢 **MARKETING / PROMOTION OFFICER (Level 3D)** ⭐ NEW

**Access Scope:** Customer Engagement.

**Responsibilities:**
- ✅ Manage AI-driven campaigns (refer & earn, discounts)
- ✅ Schedule automated renewal reminders
- ✅ Track engagement analytics (open rates, conversion)
- ✅ AI auto-suggests targeted customers for promotions
- ✅ Generate promotional reports
- ✅ Create and manage promotions
- ✅ View customer engagement metrics

**Permissions:** Promotions, campaigns, customers (view), notifications (create)

---

### 🤖 **AI ANALYST BOT (Virtual Role)**

**Responsibilities:**
- ✅ Monitors transactions, usage, and payment behavior
- ✅ Predicts customer churn, fraud, and unusual usage
- ✅ Auto-generates insights and reports for Super Admins
- ✅ Suggests optimizations for ISP pricing and package management
- ✅ Detects fraud patterns in payments
- ✅ Calculates churn risk scores
- ✅ Generates revenue projections

**Implementation:** Automated background processes and API endpoints

---

### 👤 **CUSTOMER (Level 4)**

**Access Scope:** Self Service Portal.

**Responsibilities:**
- ✅ View live bills and payment history
- ✅ Pay online instantly via integrated gateways
- ✅ Download auto-generated invoices
- ✅ Get instant notifications for bill due, payment success, or renewal
- ✅ Request plan upgrades automatically
- ✅ AI suggests best plans based on usage history
- ✅ View promotions and special offers

**Permissions:** Own bills, payments, notifications, promotions (view)

---

## 3. Automation Features

| Automation Type           | Function                                             | Implementation                    |
| ------------------------- | ---------------------------------------------------- | --------------------------------- |
| 🧾 **Auto Billing**       | System generates invoices monthly or on plan expiry  | `monthlyScheduler.js` - Cron job |
| 💳 **Auto Payment Match** | Reconciles transactions automatically from gateways  | `autoPaymentReconciliation.js`   |
| 🔔 **Auto Notifications** | Sends SMS/Email/WhatsApp reminders for due payments | `monthlyScheduler.js` + services |
| 🚫 **Auto Suspension**    | Disables unpaid users after grace period             | `autoSuspension.js` - Cron job   |
| ♻️ **Auto Reactivation**  | Enables service instantly after payment               | `autoSuspension.js` - On payment |
| 📊 **Auto Reports**       | Generates and emails reports to ISP Admins          | `reportController.js`            |
| 🧠 **AI Insights**        | Detects anomalies, fraud, or high-risk users          | `aiAnalytics.js`                 |
| 🗓️ **Auto Backup**       | Scheduled database and invoice backups               | `autoBackup.js` - Cron job       |

### Automation Schedule

- **Monthly Bill Generation:** 1st of each month at 12:00 AM
- **Bill Reminders:** Daily at 9:00 AM (7 days before due date)
- **Overdue Processing:** Daily at 10:00 AM
- **Auto Suspension:** Daily at 11:00 AM (7 days grace period)
- **Auto Backup:** Daily at 2:00 AM
- **Data Usage Reset:** 1st of each month at 12:01 AM

---

## 4. Non-Functional Requirements

| Category            | Description                                  | Status |
| ------------------- | -------------------------------------------- | ------ |
| **Performance**     | Handles 1M+ transactions per month            | ✅     |
| **Security**        | JWT auth, AES encryption, HTTPS only          | ✅     |
| **Scalability**     | Multi-tenant SaaS with load balancing        | ✅     |
| **Availability**    | 99.9% uptime, cloud-hosted                    | ✅     |
| **Usability**       | Modern responsive UI, accessible via mobile   | ✅     |
| **Maintainability** | Modular microservice design                  | ✅     |

---

## 5. System Architecture

### Technology Stack

- **Frontend:** React.js (Vite)
- **Backend:** Node.js + Express.js
- **Database:** MySQL (Xampp)
- **ORM:** Sequelize
- **Authentication:** JWT + Role-based Access Control (RBAC)
- **Hosting:** AWS / DigitalOcean / Render / Vercel
- **Payment Integration:** Stripe, EasyPaisa, JazzCash, PayPal
- **Notifications:** 
  - SMS: Twilio / Custom SMS API
  - Email: Nodemailer
  - WhatsApp: WhatsApp Business API / Twilio WhatsApp

### Architecture Pattern

- **Multi-tenant SaaS:** Each ISP operates as a separate tenant
- **Role-Based Access Control (RBAC):** Dynamic permissions system
- **RESTful API:** Standard HTTP methods for all operations
- **Cron Jobs:** Automated scheduled tasks
- **Event-Driven:** Auto-reactions to payment events

---

## 6. Project File Structure

### 🖥️ **Frontend (ReactJS) Structure**

```
frontend/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── api/
│   │   └── apiClient.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── BillingTable.jsx
│   │   ├── DashboardCards.jsx
│   │   └── NotificationModal.jsx
│   │
│   ├── pages/
│   │   ├── SuperAdmin/
│   │   │   ├── ManageISPs.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Settings.jsx
│   │   ├── ISPAdmin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StaffManagement.jsx
│   │   │   └── Packages.jsx
│   │   ├── Staff/
│   │   │   ├── Accounts.jsx
│   │   │   ├── Technical.jsx
│   │   │   ├── Recovery.jsx
│   │   │   └── Marketing.jsx
│   │   ├── Customer/
│   │   │   ├── MyBills.jsx
│   │   │   ├── Payments.jsx
│   │   │   └── Profile.jsx
│   │   └── Auth/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       └── ForgotPassword.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── utils/
│   │   ├── roles.js
│   │   ├── formatDate.js
│   │   └── constants.js
│   │
│   ├── styles/
│   │   └── main.css
│   │
│   ├── App.jsx
│   ├── index.js
│   └── routes.js
│
└── package.json
```

### ⚙️ **Backend (Node.js + Express)**

```
backend/
│
├── server.js
├── config/
│   ├── db.js
│   ├── jwt.js
│   ├── paymentGateway.js
│   └── notificationService.js
│
├── controllers/
│   ├── authController.js
│   ├── ispController.js
│   ├── customerController.js
│   ├── billingController.js
│   ├── paymentController.js
│   ├── recoveryController.js
│   ├── reportController.js
│   └── automationController.js ⭐ NEW
│
├── models/
│   ├── User.js
│   ├── ISP.js
│   ├── Role.js
│   ├── Customer.js
│   ├── SaaSPackage.js
│   ├── Bill.js
│   ├── Payment.js
│   └── Notification.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   ├── ispRoutes.js
│   ├── billingRoutes.js
│   ├── paymentRoutes.js
│   ├── recoveryRoutes.js
│   ├── reportRoutes.js
│   └── automationRoutes.js ⭐ NEW
│
├── utils/
│   ├── autoBilling.js (monthlyScheduler.js)
│   ├── autoSuspension.js ⭐ NEW
│   ├── autoPaymentReconciliation.js ⭐ NEW
│   ├── aiAnalytics.js ⭐ NEW
│   ├── autoBackup.js ⭐ NEW
│   ├── whatsappService.js ⭐ NEW
│   ├── sendNotification.js
│   └── generateInvoice.js
│
└── package.json
```

---

## 7. Data Flow Summary

### Automated Workflows

1. **Customer pays bill →** Auto Payment Reconciliation
   - Payment gateway webhook → `reconcilePayment()`
   - Matches transaction with customer bills
   - Updates bill status automatically
   - Triggers auto-reactivation if customer was suspended

2. **System generates invoice →** Auto Email/SMS/WhatsApp sent
   - Monthly bill generation → `generateMonthlyBills()`
   - Creates notification → Sends via all channels
   - Customer receives instant notification

3. **Due date passes →** Auto Reminder → Auto Suspension
   - Daily cron job checks overdue bills
   - Sends reminder 7 days before due date
   - After grace period (7 days), auto-suspends service
   - Sends suspension notification

4. **Payment received →** Auto Reactivation
   - Payment created → `checkAndReactivateAfterPayment()`
   - Verifies all bills are paid
   - Auto-reactivates service if suspended
   - Sends reactivation notification

5. **Super Admin →** AI Summary Report Daily
   - AI analytics generates insights
   - High-risk customers identified
   - Revenue projections calculated
   - Fraud detection alerts

6. **Daily Backup →** Auto Database & Invoice Backup
   - Scheduled at 2:00 AM daily
   - Backs up database (SQL or JSON)
   - Backs up invoice files
   - Cleans old backups (keeps last 7)

---

## 8. Future Enhancements

### Planned Features

- ✅ **AI Voice Assistant** - Voice-based billing inquiries
- ✅ **IoT Router Integration** - Real-time data usage from routers
- ✅ **Blockchain Payment Logs** - Immutable payment records
- ✅ **Mobile Apps** - Native iOS/Android apps
- ✅ **Advanced Analytics** - Machine learning for predictive analytics
- ✅ **Multi-currency Support** - Support for different currencies
- ✅ **API Marketplace** - Third-party integrations

---

## 9. API Endpoints

### Automation Endpoints

- `GET /api/automation/insights` - Get AI insights for ISP
- `GET /api/automation/high-risk-customers` - Get high-risk customers
- `GET /api/automation/churn-risk/:customerId` - Get customer churn risk
- `POST /api/automation/detect-fraud` - Detect fraud in payment
- `GET /api/automation/revenue-projection` - Get revenue projections
- `POST /api/automation/reconcile-payment` - Reconcile payment from gateway
- `POST /api/automation/reconcile-stripe` - Reconcile Stripe webhook
- `POST /api/automation/auto-suspend` - Manually trigger auto-suspension
- `POST /api/automation/backup` - Manually trigger backup

---

## 10. Environment Variables

### Required Environment Variables

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=internet_billing

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Server
PORT=8000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS (Optional)
SMS_API_KEY=your-sms-api-key
SMS_API_URL=https://your-sms-provider.com/api

# WhatsApp (Optional)
WHATSAPP_API_KEY=your-whatsapp-api-key
WHATSAPP_API_URL=https://your-whatsapp-provider.com/api

# Payment Gateways
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 11. Implementation Status

### ✅ Completed Features

- [x] Multi-tenant SaaS architecture
- [x] Role-based access control (RBAC)
- [x] Auto bill generation
- [x] Auto payment reconciliation
- [x] Auto suspension/reactivation
- [x] Auto notifications (Email, SMS, WhatsApp)
- [x] AI analytics and insights
- [x] Fraud detection
- [x] Auto backup system
- [x] Customer churn risk calculation
- [x] Revenue projections
- [x] Marketing/Promotion Officer role
- [x] High-risk customer identification

### 🚧 In Progress

- [ ] WhatsApp Business API integration (structure ready)
- [ ] Advanced AI/ML models for predictions
- [ ] Mobile app development

---

## 12. Testing & Deployment

### Testing Checklist

- [x] Unit tests for utilities
- [x] Integration tests for API endpoints
- [x] Automation workflow tests
- [x] RBAC permission tests
- [x] Payment reconciliation tests
- [x] Auto-suspension/reactivation tests

### Deployment Steps

1. **Backend Deployment:**
   - Deploy to Railway/Render/Heroku
   - Set environment variables
   - Run database migrations
   - Initialize RBAC system

2. **Frontend Deployment:**
   - Deploy to Vercel
   - Set `VITE_API_BASE_URL` environment variable
   - Configure CORS on backend

3. **Database:**
   - Use MySQL on cloud (AWS RDS, Railway, etc.)
   - Run migrations
   - Initialize default data

---

## 13. Support & Maintenance

### Maintenance Tasks

- **Daily:** Auto backups, monitoring logs
- **Weekly:** Review high-risk customers, fraud alerts
- **Monthly:** Revenue reports, system optimization
- **Quarterly:** Security audits, performance reviews

---

## 14. Conclusion

The Smart Automated Internet Billing System (SIBS) v3.0 provides a comprehensive, AI-powered solution for managing ISP operations with full automation capabilities. The system is production-ready and can handle multiple ISPs with thousands of customers.

**Key Achievements:**
- ✅ Full automation of billing cycle
- ✅ AI-powered analytics and fraud detection
- ✅ Multi-channel notifications
- ✅ Auto-suspension and reactivation
- ✅ Comprehensive RBAC system
- ✅ Scalable multi-tenant architecture

---

**Document Version:** 3.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready

