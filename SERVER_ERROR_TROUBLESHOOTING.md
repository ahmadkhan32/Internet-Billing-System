# 🔧 Server Error Troubleshooting Guide

## Quick Diagnosis Steps

### 1. Check Backend Server Status

**Test if server is running:**
```bash
curl http://localhost:8000/api/health
```

**Expected response:**
```json
{"status":"OK","message":"Server is running"}
```

**If you get connection refused:**
- Backend server is not running
- Start it: `cd backend && npm start`

### 2. Check Backend Console Logs

Look for error messages in the terminal where the backend is running. Common errors:

#### Database Connection Error
```
❌ Unable to connect to the database
```
**Solution:**
- Check MySQL is running
- Verify `.env` file has correct database credentials
- Ensure database `internet_billing_db` exists

#### JWT_SECRET Missing
```
⚠️  WARNING: JWT_SECRET is not set
```
**Solution:**
- Add `JWT_SECRET=your_random_secret_key_here` to `backend/.env`
- Restart backend server

#### Table Sync Error
```
❌ Error syncing database
```
**Solution:**
- Check database permissions
- Verify all models are properly defined
- Try restarting the server (it will attempt to sync again)

### 3. Check Browser Console

Open browser DevTools (F12) and check:

**Console Tab:**
- JavaScript errors
- Network errors
- CORS errors

**Network Tab:**
- Failed API requests (red)
- Response status codes
- Response body (click on failed request → Response tab)

### 4. Common Server Error Types

#### 500 Internal Server Error

**Possible Causes:**
1. **Database constraint violation**
   - Foreign key constraint (e.g., invalid ISP ID)
   - Unique constraint (e.g., duplicate email)
   - NOT NULL constraint (missing required field)

2. **Validation error**
   - Invalid data type (string instead of number)
   - Missing required fields
   - Invalid format (email, date, etc.)

3. **Database connection lost**
   - MySQL service stopped
   - Network issue
   - Connection timeout

4. **Missing environment variables**
   - `JWT_SECRET` not set
   - Database credentials missing

**How to Fix:**
- Check backend console for detailed error
- Verify all required fields are provided
- Check data types match expected format
- Ensure database is running

#### 400 Bad Request

**Possible Causes:**
- Validation errors (missing/invalid fields)
- Invalid data format
- Business logic violations

**How to Fix:**
- Check error response body for specific field errors
- Verify all required fields are filled
- Check data format (numbers, dates, emails)

#### 403 Forbidden

**Possible Causes:**
- Insufficient permissions
- ISP mismatch (trying to access another ISP's data)
- User not associated with ISP

**How to Fix:**
- Check user role has required permissions
- Verify user is assigned to correct ISP
- Contact administrator

#### 404 Not Found

**Possible Causes:**
- Route doesn't exist
- Resource not found (e.g., customer ID doesn't exist)
- Wrong API endpoint

**How to Fix:**
- Verify route path is correct
- Check if resource exists in database
- Check API documentation

### 5. Package Creation Specific Errors

#### "ISP ID is required"
**Cause:** User account is not associated with an ISP

**Solution:**
- Super Admin can create packages without ISP (for testing)
- Other roles need to be assigned to an ISP first
- Contact Super Admin to assign your account to an ISP

#### "Price must be a valid positive number"
**Cause:** Price field contains invalid value

**Solution:**
- Enter a valid number (e.g., 1000, 1500.50)
- Don't use negative numbers
- Don't use text or special characters

#### "Validation error"
**Cause:** One or more fields failed validation

**Solution:**
- Check error response for specific field errors
- Ensure all required fields are filled
- Verify data format matches requirements

#### "Database error" or "Foreign key constraint"
**Cause:** Invalid ISP ID or database constraint violation

**Solution:**
- If you're Super Admin, you can create packages without ISP
- If you're Admin, ensure your account has a valid `isp_id`
- Check database to verify ISP exists

### 6. Database Schema Issues

If you recently changed the Package model to allow `null` isp_id:

**You may need to update the database schema:**

```sql
-- Connect to MySQL
mysql -u root -p internet_billing_db

-- Check current schema
DESCRIBE packages;

-- If isp_id is NOT NULL, update it:
ALTER TABLE packages MODIFY COLUMN isp_id INT NULL;
```

**Or restart the backend server** - it will attempt to sync the schema automatically.

### 7. Step-by-Step Debugging

1. **Check Backend Console:**
   - Look for error stack traces
   - Note the exact error message
   - Check which route/controller failed

2. **Check Browser Network Tab:**
   - Find the failed request
   - Check Request payload (what was sent)
   - Check Response body (what server returned)

3. **Test API Directly:**
   ```bash
   # Get your auth token first (from browser localStorage or login)
   TOKEN="your_jwt_token_here"
   
   # Test package creation
   curl -X POST http://localhost:8000/api/packages \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d '{
       "name": "Test Package",
       "speed": "10Mbps",
       "price": 1000,
       "duration": 1
     }'
   ```

4. **Check Database:**
   ```sql
   -- Verify packages table exists
   SHOW TABLES LIKE 'packages';
   
   -- Check table structure
   DESCRIBE packages;
   
   -- Check if ISP exists (if using isp_id)
   SELECT * FROM isps;
   ```

### 8. Environment Check

**Verify `.env` file exists and has:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=internet_billing_db
JWT_SECRET=your_random_secret_key_minimum_32_characters
PORT=8000
FRONTEND_URL=http://localhost:3001
NODE_ENV=development
```

### 9. Common Fixes

#### Fix 1: Restart Backend Server
```bash
# Stop server (Ctrl+C)
# Then restart
cd backend
npm start
```

#### Fix 2: Clear and Recreate Database (Development Only)
```sql
DROP DATABASE internet_billing_db;
CREATE DATABASE internet_billing_db;
```
Then restart backend - it will recreate all tables.

#### Fix 3: Update Database Schema
If you changed models, the database might need updating:
```bash
# Backend will attempt auto-sync on restart
# Or manually sync:
cd backend
node -e "require('./config/db').sequelize.sync({ alter: true })"
```

#### Fix 4: Check Node Modules
```bash
cd backend
rm -rf node_modules
npm install
```

### 10. Getting Detailed Error Information

**Enable detailed error logging:**

In `backend/server.js`, the error handler already shows detailed errors in development:

```javascript
error: process.env.NODE_ENV === 'development' ? err.stack : undefined
```

**To see full error details:**
1. Set `NODE_ENV=development` in `.env`
2. Check backend console for full stack trace
3. Check browser Network tab → Response for error details

### 11. Package-Specific Error Messages

The improved error handling now provides specific messages:

- **"Price must be a valid positive number"** - Invalid price value
- **"ISP ID is required. Your account must be associated with an ISP"** - User needs ISP assignment
- **"Invalid ISP ID. Please ensure the ISP exists"** - Foreign key constraint error
- **"Validation error"** - Check the `errors` array for field-specific issues

### 12. Still Getting "Server error"?

**Collect this information:**
1. Backend console error (full stack trace)
2. Browser Network tab → Failed request → Response body
3. Browser Console errors
4. What action were you performing? (Create/Update/Delete Package)
5. What data were you entering?
6. Your user role (Super Admin, Admin, etc.)

**Then check:**
- Database is running
- Backend server is running
- `.env` file is configured
- All npm packages are installed
- Database schema is up to date

---

## Quick Test Commands

```bash
# Test backend health
curl http://localhost:8000/api/health

# Test database connection (from backend directory)
node -e "require('./config/db').testConnection()"

# Check if port 8000 is in use
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Linux/Mac
```

---

**Last Updated:** [Current Date]
**If issues persist, check backend console logs for specific error details.**

