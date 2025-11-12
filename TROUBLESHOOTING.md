# Troubleshooting Guide

## Login Failed Issues

### 1. Check Environment Variables

Make sure you have a `.env` file in the `backend` directory with the following required variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=internet_billing_db
JWT_SECRET=your_random_secret_key_minimum_32_characters
PORT=8000
FRONTEND_URL=http://localhost:3000
```

**Most Common Issue:** `JWT_SECRET` is missing or not set. This will cause login to fail.

### 2. Check Database Connection

1. Verify MySQL is running:
   ```bash
   # Windows
   net start MySQL
   
   # Linux/Mac
   sudo systemctl status mysql
   ```

2. Verify database exists:
   ```sql
   CREATE DATABASE IF NOT EXISTS internet_billing_db;
   ```

3. Check database credentials in `.env` file match your MySQL setup.

### 3. Check Server Logs

When starting the backend server, you should see:
- ✅ Database connection established successfully
- ✅ Database models synchronized
- ✅ Default super admin created (admin@billing.com / admin123)

If you see errors, check:
- Database connection errors
- JWT_SECRET warnings
- Table creation errors

### 4. Reset Default Admin Password

If the default admin password doesn't work, you can reset it:

**Option 1: Delete and recreate (Development only)**
```sql
DELETE FROM users WHERE email = 'admin@billing.com';
```
Then restart the server - it will recreate the admin user.

**Option 2: Update password directly**
```sql
-- First, generate a bcrypt hash for 'admin123'
-- You can use: https://bcrypt-generator.com/
-- Or Node.js: require('bcryptjs').hashSync('admin123', 10)

UPDATE users 
SET password = '$2a$10$YourHashedPasswordHere' 
WHERE email = 'admin@billing.com';
```

### 5. Check Frontend-Backend Connection

1. Verify backend is running on port 8000 (or your configured port)
2. Check browser console for CORS errors
3. Verify `VITE_API_BASE_URL` in frontend matches backend URL
4. Check Network tab in browser DevTools to see the actual API request/response

### 6. Common Error Messages

**"Invalid credentials"**
- Wrong email or password
- User doesn't exist
- Password hash mismatch

**"JWT_SECRET not configured"**
- Set `JWT_SECRET` in `.env` file
- Restart the backend server

**"Database connection failed"**
- MySQL not running
- Wrong database credentials
- Database doesn't exist

**"CORS error"**
- Check `FRONTEND_URL` in backend `.env`
- Verify frontend URL matches

### 7. Step-by-Step Debugging

1. **Check backend is running:**
   ```bash
   curl http://localhost:8000/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Test login endpoint directly:**
   ```bash
   curl -X POST http://localhost:8000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@billing.com","password":"admin123"}'
   ```

3. **Check browser console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for JavaScript errors
   - Go to Network tab
   - Try login and check the request/response

4. **Check backend console:**
   - Look for error messages
   - Check if login request is received
   - Verify database queries are executing

### 8. Fresh Start (Development)

If nothing works, try a fresh start:

```bash
# 1. Stop both frontend and backend

# 2. Drop and recreate database
mysql -u root -p
DROP DATABASE internet_billing_db;
CREATE DATABASE internet_billing_db;
EXIT;

# 3. Make sure .env file exists with correct values

# 4. Restart backend (will recreate tables and admin)
cd backend
npm start

# 5. Restart frontend
cd frontend
npm run dev
```

### 9. Still Having Issues?

Check:
- Node.js version (should be 14+)
- MySQL version (should be 5.7+)
- All npm packages installed (`npm install` in both directories)
- Ports 8000 and 3000 are available
- Firewall/antivirus not blocking connections

