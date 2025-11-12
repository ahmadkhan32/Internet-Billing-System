# Test Setup Guide

## ✅ Fixed Issues

### 1. **Backend Syntax Error - RESOLVED**
- **Problem:** Using `package` as a variable name (reserved word in JavaScript)
- **Fix:** Changed all instances of `const package` to `const pkg` in `backend/controllers/packageController.js`

### 2. **Playwright Configuration - RESOLVED**
- **Problem:** Tests were trying to connect to port 3003, but Vite runs on port 3001
- **Fix:** Updated `frontend/playwright.config.js` to use port 3001 (matching Vite config)
- **Fix:** Disabled Firefox and WebKit browsers (only Chromium enabled for now)

## 🚀 Running Tests

### Prerequisites

1. **Backend Server Must Be Running**
   ```powershell
   cd backend
   npm start
   ```
   The backend should be running on `http://localhost:8000`

2. **Database Must Be Initialized**
   - Ensure MySQL is running
   - Database should be created and migrated
   - Default users should exist (for login tests)

### Running Frontend Tests

1. **Navigate to frontend directory:**
   ```powershell
   cd frontend
   ```

2. **Run all tests:**
   ```powershell
   npm test
   ```
   or
   ```powershell
   npx playwright test
   ```

3. **Run tests in headed mode (see browser):**
   ```powershell
   npm run test:ui
   ```

4. **View test report:**
   ```powershell
   npm run test:report
   ```

### Test Structure

- **E2E Tests:** `frontend/tests/e2e/`
  - `billing.spec.js` - Billing management tests
  - `login.spec.js` - Login functionality tests

- **UI Tests:** `frontend/tests/ui/`
  - `dashboard.test.js` - Dashboard UI tests

### Test Credentials

The tests use these default credentials (from `backend/server.js`):
- **Email:** `admin@billing.com` or `admin@test.com`
- **Password:** `admin123`

**Note:** Make sure these users exist in your database. They are created automatically when the backend server starts.

## 🔧 Configuration

### Playwright Config (`frontend/playwright.config.js`)

- **Base URL:** `http://localhost:3001` (matches Vite dev server)
- **Browser:** Only Chromium enabled (Firefox/WebKit commented out)
- **Web Server:** Automatically starts Vite dev server before tests
- **Timeout:** 120 seconds for server startup

### Installing Additional Browsers

To test with Firefox and WebKit:

```powershell
npx playwright install firefox
npx playwright install webkit
```

Then uncomment the browser projects in `playwright.config.js`.

## 🐛 Troubleshooting

### Tests Fail with "Connection Refused"

**Problem:** Frontend server not running or wrong port

**Solution:**
1. Check if Vite is running on port 3001
2. Verify `frontend/vite.config.js` has `port: 3001`
3. Check `frontend/playwright.config.js` baseURL matches

### Tests Fail with "Invalid Credentials"

**Problem:** Test users don't exist in database

**Solution:**
1. Restart backend server (creates default users)
2. Or manually create test users in database

### Tests Fail with "ERR_CONNECTION_RESET"

**Problem:** Backend API not running

**Solution:**
1. Start backend server: `cd backend && npm start`
2. Verify backend is running on `http://localhost:8000`
3. Check database connection

### Syntax Error: "Unexpected reserved word 'package'"

**Problem:** Using `package` as variable name

**Solution:** ✅ **FIXED** - All instances changed to `pkg` in `backend/controllers/packageController.js`

## 📝 Test Best Practices

1. **Always start backend before running tests**
2. **Use test-specific credentials** (don't use production data)
3. **Clean up test data** after tests complete
4. **Run tests in CI/CD** with proper environment setup
5. **Use `reuseExistingServer`** to speed up local development

## 🎯 Next Steps

1. ✅ Fixed syntax errors
2. ✅ Fixed Playwright configuration
3. ⏳ Add more test coverage
4. ⏳ Set up CI/CD test pipeline
5. ⏳ Add API mocking for faster tests

---

**Status:** Tests should now run successfully with Chromium browser!

