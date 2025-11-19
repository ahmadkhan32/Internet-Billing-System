# 🔧 Fix Supabase Connection Error (ENOTFOUND)

## ❌ Error You're Seeing

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

## 🔍 What This Means

The Supabase database hostname cannot be resolved. This usually means:

1. **Supabase Project is PAUSED** (most common - free tier auto-pauses)
2. **Wrong hostname** in `.env` file
3. **Supabase project was deleted**

## ✅ Quick Fix

### Step 1: Check Supabase Project Status

1. Go to https://supabase.com
2. Login to your account
3. Find your project
4. **If you see "Paused" or "Restore" button:**
   - Click **"Restore"** or **"Resume"**
   - Wait 1-2 minutes for project to resume
   - The database will be available again

### Step 2: Get Fresh Connection Details

1. In Supabase Dashboard → Your Project
2. Go to **Settings** → **Database**
3. Scroll to **"Connection string"** section
4. Click **"URI"** tab
5. Copy the connection string

It looks like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### Step 3: Update .env File

**Extract from connection string:**
- **DB_HOST:** `db.xxxxx.supabase.co` (the part after @ and before :5432)
- **DB_PORT:** `5432` (or `6543` for connection pooling)
- **DB_USER:** `postgres`
- **DB_PASSWORD:** (the password in brackets)
- **DB_NAME:** `postgres`

**Update `backend\.env` file:**
```env
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_actual_password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

### Step 4: Restart Server

After updating `.env`:
```powershell
cd backend
npm run kill-port
npm start
```

## 🔍 Verify Connection

**Test connection:**
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

## ✅ Common Solutions

### Solution 1: Resume Paused Project
- Most common issue
- Free tier projects auto-pause after 1 week of inactivity
- Just click "Restore" in Supabase Dashboard

### Solution 2: Use Connection Pooling Port
If direct connection doesn't work, try port 6543:
```env
DB_PORT=6543
```

### Solution 3: Verify Hostname
- Make sure DB_HOST doesn't have `https://` prefix
- Should be: `db.xxxxx.supabase.co`
- NOT: `https://db.xxxxx.supabase.co`

## 🎯 After Fixing

Once Supabase project is resumed and `.env` is updated:
1. Restart backend server
2. Check health endpoint
3. Try login at http://localhost:3001

---

**The servers are running - just need to fix the Supabase connection!**
