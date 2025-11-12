# 🧾 SRS: Automated AI Testing System for Internet Billing System

## 1. Introduction

### 1.1 Purpose

This SRS defines the **Automated AI Testing System** for your **Internet Billing System**, designed to:

* Automatically test backend APIs, frontend UI, and database operations.
* Integrate **Cursor AI** to auto-generate test scripts when code changes.
* Run tests in a CI/CD pipeline (GitHub Actions or local terminal).

### 1.2 Scope

The testing system ensures:

* Continuous testing (every commit or deployment).
* Automated bug detection.
* Performance, functional, and integration testing.
* AI-assisted test coverage expansion (Cursor AI).

---

## 2. System Overview

```
┌────────────────────────────────────────┐
│          Cursor AI Assistant           │
│ - Reads project structure              │
│ - Suggests / Generates test cases      │
│ - Improves coverage                    │
└────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────┐
│       Automated Test Framework          │
│  - Jest (Backend)                      │
│  - Playwright (Frontend)               │
│  - Artillery (Load Testing)            │
└────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────┐
│        Internet Billing System          │
│ (Frontend + Backend + MySQL Database)  │
└────────────────────────────────────────┘
```

---

## 3. System Features

| Feature                | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| **AI Test Generation** | Cursor AI analyzes your source code and auto-generates missing tests. |
| **API Testing**        | Backend routes tested via Jest + Supertest.                            |
| **UI Testing**         | React app tested using Playwright.                                    |
| **Integration Tests**  | Verify flow: Login → Bill Creation → Payment → Invoice.              |
| **Load Testing**       | Simulate 1000+ users via Artillery.                                   |
| **Reporting**          | Generate HTML reports via Jest HTML Reporter and Playwright.            |
| **CI/CD Testing**      | Auto-runs tests in GitHub Actions.                                    |

---

## 4. Functional Requirements

### 4.1 Backend Test

* Verify APIs: `/api/customers`, `/api/bills`, `/api/payments`.
* Ensure correct HTTP codes (200, 400, 401, 404, 500).
* Validate database records after CRUD actions.

### 4.2 Frontend Test

* Test customer login, admin dashboard, billing view, payment form.
* Validate form validations and navigation flow.
* Check UI responsiveness (desktop, mobile).

### 4.3 Integration Test

* Simulate user creating account → bill generated → payment → invoice PDF.

### 4.4 Performance Test

* Run load testing for concurrent users.
* Validate system under stress conditions.

### 4.5 AI Test Enhancement

* Cursor AI analyzes source code for untested functions.
* Suggests or autogenerates Jest/Playwright tests.

---

## 5. Non-Functional Requirements

| Attribute       | Requirement                               |
| --------------- | ----------------------------------------- |
| **Scalability** | Handle 10k+ test executions               |
| **Automation**  | All tests triggered by `npm run test:all` |
| **Portability** | Runs on Windows, Linux, CI/CD             |
| **Security**    | Test credentials stored in `.env`         |
| **Reporting**   | HTML reports after each test run          |

---

## 6. Tools & Technology Stack

| Category          | Tool                            |
| ----------------- | ------------------------------- |
| AI Assistant      | **Cursor AI**                   |
| Backend Testing   | **Jest + Supertest**            |
| Frontend Testing  | **Playwright**                  |
| Load Testing      | **Artillery**                   |
| Reporting         | **Jest HTML Reporter**          |
| CI/CD Integration | **GitHub Actions**              |

---

## 7. Folder Structure

```
/internet-billing-system/
│
├── backend/
│   ├── src/
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── payment.test.js
│   │   │   ├── billing.test.js
│   │   ├── integration/
│   │   │   └── api-integration.test.js
│   │   ├── setup.js
│   │   └── reports/
│   │       └── backend-report.html
│   ├── jest.config.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── tests/
│   │   ├── e2e/
│   │   │   ├── login.spec.js
│   │   │   └── billing.spec.js
│   │   ├── ui/
│   │   │   └── dashboard.test.js
│   │   └── reports/
│   │       └── playwright-report/
│   ├── playwright.config.js
│   └── package.json
│
├── tests/
│   ├── load/
│   │   └── performance.yml (Artillery)
│   └── reports/
│
├── .github/
│   └── workflows/
│       └── test-ci.yml
│
├── package.json (root)
└── README.md
```

---

## 8. Commands to Integrate Testing

### 🧠 Step 1 — Install Testing Dependencies

#### **Backend**

```bash
cd backend
npm install --save-dev jest supertest @types/jest jest-html-reporter
```

#### **Frontend**

```bash
cd frontend
npm install --save-dev @playwright/test playwright
npx playwright install
```

#### **Root (Load Testing)**

```bash
npm install --save-dev artillery
```

---

### 🧪 Step 2 — Run Tests

#### **Backend Tests**

```bash
cd backend
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage
npm run test:report         # Generate HTML report
```

#### **Frontend Tests**

```bash
cd frontend
npm test                    # Run all tests
npm run test:ui             # Run with browser UI
npm run test:report         # Show HTML report
```

#### **All Tests (Root)**

```bash
npm run test:all            # Run backend + frontend tests
npm run test:backend        # Backend only
npm run test:frontend       # Frontend only
npm run test:load           # Load testing only
```

---

### 🧰 Step 3 — AI Test Integration (Cursor AI)

If you're using **Cursor IDE** (powered by Cursor AI):

1. Open your project folder in Cursor.

2. Type in the Cursor Command Palette:

   ```
   /test generate all
   ```

   This triggers **Cursor AI** to analyze your entire codebase and **auto-generate missing Jest & Playwright test cases**.

3. Then run:

   ```bash
   npm run test:all
   ```

---

### 🚀 Step 4 — CI/CD Test Automation

Tests automatically run on every push to `main` or `develop` branch via GitHub Actions.

Workflow file: `.github/workflows/test-ci.yml`

---

## 9. Expected Results

✅ Automated tests run on every code change  
✅ AI-generated coverage (Cursor AI)  
✅ Reports automatically stored in `/tests/reports`  
✅ Bug alerts for failed tests  
✅ Load testing ensures system stability  

---

## 10. Test Coverage

### Backend Coverage

- ✅ Payment API endpoints
- ✅ Billing API endpoints
- ✅ Customer API endpoints
- ✅ Authentication & Authorization
- ✅ Database operations
- ✅ Integration workflows

### Frontend Coverage

- ✅ Login/Authentication flow
- ✅ Dashboard UI
- ✅ Billing management
- ✅ Payment forms
- ✅ Responsive design

---

## 11. Future Enhancements

* Integrate AI-based **bug prediction** using Cursor.
* Enable **Slack/Email test alerts**.
* Add **visual regression testing** for the billing dashboard.
* Implement **accessibility testing** (a11y).
* Add **security testing** (OWASP).

---

## 12. Summary

| Type                            | Tool       | Command                 |
| ------------------------------- | ---------- | ----------------------- |
| **Backend Unit Tests**          | Jest       | `npm run test:backend`  |
| **Frontend E2E Tests**          | Playwright | `npm run test:frontend` |
| **Load Testing**                | Artillery  | `npm run test:load`     |
| **All Tests (Full System)**     | Combined   | `npm run test:all`      |
| **AI Test Generation (Cursor)** | Cursor IDE | `/test generate all`    |

---

## 13. Troubleshooting

### Common Issues

1. **Tests failing due to database connection**
   - Ensure test database is set up
   - Check `.env` file for test database credentials

2. **Playwright browsers not installed**
   - Run: `npx playwright install`

3. **Port conflicts**
   - Ensure test port (8001) is different from dev port (8000)

4. **CI/CD failures**
   - Check GitHub Actions logs
   - Verify MySQL service is running in CI

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Author:** Automated Testing System

