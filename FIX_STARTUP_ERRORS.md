# 🔧 Fix Startup Errors

## ❌ Errors You're Seeing

1. **Database Connection Refused:**
   ```
   SequelizeConnectionRefusedError
   ```

2. **Port Already in Use:**
   ```
   Error: listen EADDRINUSE: address already in use 0.0.0.0:8000
   ```

## ✅ Solutions

### Fix 1: Port Already in Use

**Quick Fix:**
```bash
# Kill process on port 8000
npm run kill-port

# Or manually:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Alternative: Use Different Port:**
```bash
# Set different port in .env file
PORT=8001

# Or run with:
PORT=8001 npm start
```

### Fix 2: Database Connection Refused

**Check Your .env File:**

Make sure you have a `.env` file in the `backend` folder with:

```env
NODE_ENV=development
PORT=8000
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=your-32-character-secret
JWT_EXPIRE=7d
```

**Steps to Fix:**

1. **Create .env file** (if it doesn't exist):
   ```bash
   cd backend
   copy env.template .env
   ```

2. **Update .env with your Supabase credentials:**
   - Get credentials from Supabase Dashboard → Settings → Database
   - Copy connection string and extract values

3. **Verify Supabase Project:**
   - Check project is active (not paused)
   - Verify database migrations have been run
   - Test connection in Supabase SQL Editor

4. **Restart Server:**
   ```bash
   # Kill port first
   npm run kill-port
   
   # Then start
   npm start
   ```

## 🔍 Troubleshooting

### Check if .env file exists:
```bash
cd backend
dir .env
```

### Check environment variables are loaded:
The server will show connection details in the error message if variables are missing.

### Test Database Connection:
```bash
# In Supabase SQL Editor, run:
SELECT version();
```

If this works, your database is accessible.

### Common Issues:

1. **Missing .env file:**
   - Create it from `env.template`
   - Fill in Supabase credentials

2. **Wrong credentials:**
   - Double-check DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
   - Get fresh credentials from Supabase Dashboard

3. **Database not accessible:**
   - Verify Supabase project is active
   - Check if migrations have been run
   - Test connection in Supabase SQL Editor

4. **Port conflict:**
   - Run `npm run kill-port` first
   - Or use different port: `PORT=8001 npm start`

## ✅ After Fixing

Once both issues are resolved, you should see:
```
✅ Database connection established successfully.
🚀 Server running on port 8000
```

---

**The server will now start even if database connection fails initially, but database operations will fail until connection is fixed.**

