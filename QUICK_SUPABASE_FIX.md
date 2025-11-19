# ⚡ Quick Fix: Connect to Supabase

## 🎯 The Problem

Your Supabase project hostname cannot be resolved. This usually means:
- **Supabase project is PAUSED** (most common)
- Wrong hostname in .env file

## ✅ 3-Step Fix

### Step 1: Resume Supabase Project

1. Go to https://supabase.com
2. Login → Your Project
3. **If you see "Paused" → Click "Restore"**
4. Wait 1-2 minutes

### Step 2: Get Connection String

1. Supabase Dashboard → **Settings** → **Database**
2. Scroll to **"Connection string"**
3. Click **"URI"** tab
4. **Copy the connection string**

### Step 3: Update .env

**Run this script:**
```powershell
cd backend
.\get-supabase-credentials.ps1
```

Paste your connection string when prompted.

**Or manually edit `backend\.env`:**
```env
DB_HOST=db.xxxxx.supabase.co        # Get from connection string
DB_PASSWORD=your_password           # Get from connection string
```

## 🚀 Restart Server

```powershell
cd backend
npm run kill-port
npm start
```

## ✅ Success!

You should see:
```
✅ PostgreSQL connection established successfully.
🚀 Server running on port 8000
```

Then login at: http://localhost:3001

---

**Most likely your Supabase project just needs to be resumed!**

