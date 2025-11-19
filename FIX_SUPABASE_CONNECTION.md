# 🔧 Fix Supabase Connection - Complete Guide

## ❌ Error: `ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co`

This error means the Supabase hostname cannot be resolved. **Most likely your Supabase project is PAUSED.**

## ✅ Quick Fix (3 Steps)

### Step 1: Resume Supabase Project

1. **Go to:** https://supabase.com
2. **Login** to your account
3. **Find your project** in the dashboard
4. **If you see "Paused" or "Restore" button:**
   - Click **"Restore"** or **"Resume"**
   - Wait 1-2 minutes for project to resume
   - The database will be available again

### Step 2: Get Fresh Connection String

1. In Supabase Dashboard → Your Project
2. Go to **Settings** → **Database**
3. Scroll to **"Connection string"** section
4. Click **"URI"** tab
5. **Copy the entire connection string**

It looks like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### Step 3: Update .env File

**Option A: Use the Script (Easiest)**
```powershell
cd backend
.\get-supabase-credentials.ps1
```
Paste your connection string when prompted.

**Option B: Manual Update**

1. Open `backend\.env` file
2. Update these values from your connection string:

```env
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co        # From connection string (after @ and before :5432)
DB_PORT=5432                        # Or 6543 for connection pooling
DB_USER=postgres
DB_PASSWORD=your_actual_password   # From connection string (in brackets)
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

## 🚀 After Updating

**1. Kill port and restart:**
```powershell
cd backend
npm run kill-port
npm start
```

**2. Verify connection:**
```powershell
curl http://localhost:8000/api/health
```

Should return:
```json
{
  "status": "OK",
  "database": "connected"
}
```

## 🔍 Verify Supabase Project Status

**Check if project is active:**
1. Supabase Dashboard → Your Project
2. Look at the project status
3. If paused, click "Restore"

**Test connection in Supabase:**
1. Go to SQL Editor
2. Run: `SELECT version();`
3. If it works, your project is active

## 📋 Connection String Format

Your connection string should be:
```
postgresql://postgres:PASSWORD@HOST:PORT/DATABASE
```

**Extract:**
- **HOST:** The part after `@` and before `:5432`
- **PASSWORD:** The part after `postgres:` and before `@`
- **PORT:** Usually `5432` or `6543` (for pooling)
- **DATABASE:** Usually `postgres`

## ✅ Example

**Connection String:**
```
postgresql://postgres:MyPassword123@db.abcdefghijk.supabase.co:5432/postgres
```

**Extracted Values:**
- DB_HOST: `db.abcdefghijk.supabase.co`
- DB_PORT: `5432`
- DB_USER: `postgres`
- DB_PASSWORD: `MyPassword123`
- DB_NAME: `postgres`

## 🎯 After Fixing

Once you've:
1. ✅ Resumed Supabase project
2. ✅ Updated .env with correct credentials
3. ✅ Restarted the server

You should see:
```
✅ PostgreSQL connection established successfully.
🚀 Server running on port 8000
```

Then you can:
- Login at http://localhost:3001
- Use: `admin@billing.com` / `admin123`

---

**The main issue is usually a paused Supabase project. Resume it first!**

