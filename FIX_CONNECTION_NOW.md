# 🔧 Fix Supabase Connection - Step by Step

## ❌ Current Error

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

## ✅ Solution (Follow These Steps)

### Step 1: Check Supabase Project Status

1. **Go to:** https://supabase.com/dashboard
2. **Login** to your account
3. **Find your project** in the list
4. **Check the status:**
   - If you see **"Paused"** → Click **"Restore"** or **"Resume"**
   - Wait **2-3 minutes** for the project to fully resume
   - The status should change to **"Active"**

### Step 2: Get Fresh Connection String

1. In Supabase Dashboard → **Your Project**
2. Click **Settings** (gear icon) → **Database**
3. Scroll to **"Connection string"** section
4. Click the **"URI"** tab
5. **Copy the entire connection string**

It should look like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### Step 3: Update .env File

**Run this command:**
```powershell
cd backend
npm run setup-supabase
```

**When prompted, paste your connection string.**

**Or manually edit `backend\.env`:**
```env
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co        # From connection string
DB_PORT=5432                        # Or 6543 for connection pooling
DB_USER=postgres
DB_PASSWORD=your_actual_password    # From connection string
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
VERCEL=0                            # Important for localhost!
```

### Step 4: Test Connection

**Run diagnostics:**
```powershell
cd backend
npm run check-supabase
```

This will:
- ✅ Test DNS resolution
- ✅ Test TCP connection
- ✅ Test Node.js connection

**Or test directly:**
```powershell
npm run test-db
```

Should show: `✅ Connection successful!`

### Step 5: If Still Failing - Try Connection Pooling

If port 5432 doesn't work, try port 6543 (connection pooling):

1. Edit `backend\.env`
2. Change: `DB_PORT=6543`
3. Test again: `npm run test-db`

### Step 6: Start Server

Once connection works:

```powershell
cd backend
npm run kill-port
npm start
```

Should see:
```
✅ PostgreSQL connection established successfully.
🚀 Server running on port 8000
```

## 🔍 Common Issues

### Issue 1: "ENOTFOUND" Error
**Cause:** Supabase project is paused  
**Fix:** Resume project in Supabase Dashboard

### Issue 2: DNS Resolves But Node.js Can't Connect
**Cause:** Project is still resuming  
**Fix:** Wait 2-3 minutes after clicking "Restore"

### Issue 3: "Connection Timeout"
**Cause:** Firewall or wrong port  
**Fix:** Try port 6543 (connection pooling)

### Issue 4: "Authentication Failed"
**Cause:** Wrong password  
**Fix:** Get fresh connection string from Supabase Dashboard

## ✅ Success Checklist

- [ ] Supabase project is **Active** (not paused)
- [ ] Got fresh connection string from Supabase Dashboard
- [ ] Updated `.env` file with correct credentials
- [ ] `npm run test-db` shows "Connection successful!"
- [ ] `VERCEL=0` is set in `.env`
- [ ] Server starts without errors

## 🚀 After Fixing

1. **Start Backend:**
   ```powershell
   cd backend
   npm start
   ```

2. **Start Frontend (new terminal):**
   ```powershell
   cd frontend
   npm run dev
   ```

3. **Access:**
   - Frontend: http://localhost:3001
   - Login: `admin@billing.com` / `admin123`

---

**The main issue is usually a paused Supabase project. Resume it first!**

