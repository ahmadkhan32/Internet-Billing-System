# 🚀 Start Project Now - Quick Guide

## ⚠️ IMPORTANT: Fix Supabase First!

The error `ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co` means your **Supabase project is PAUSED**.

## ✅ Quick Fix (2 Minutes)

### Step 1: Resume Supabase Project

1. Go to **https://supabase.com**
2. Login → Find your project
3. **If you see "Paused" → Click "Restore"**
4. Wait 1-2 minutes

### Step 2: Get Connection String & Update .env

1. Supabase Dashboard → **Settings** → **Database**
2. Copy the **connection string** (URI tab)
3. Run this in backend folder:
   ```powershell
   cd backend
   npm run setup-supabase
   ```
4. Paste your connection string when prompted

### Step 3: Test Connection

```powershell
cd backend
npm run test-db
```

Should show: `✅ Connection successful!`

### Step 4: Run Migrations

1. Supabase Dashboard → **SQL Editor**
2. Copy content from `supabase/migrations/001_initial_schema.sql`
3. Paste and **Run**

### Step 5: Start Servers

**Backend:**
```powershell
cd backend
npm run kill-port
npm start
```

**Frontend (new terminal):**
```powershell
cd frontend
npm run dev
```

## 🌐 Access

- **Frontend:** http://localhost:3001
- **Backend:** http://localhost:8000
- **Login:** `admin@billing.com` / `admin123`

## ✅ Success!

Once Supabase is resumed and .env is updated, you'll see:
```
✅ PostgreSQL connection established successfully.
🚀 Server running on port 8000
```

---

**The main issue is your Supabase project is paused. Resume it first!**

