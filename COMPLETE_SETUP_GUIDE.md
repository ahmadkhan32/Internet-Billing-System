# 🚀 Complete Setup Guide - Supabase + Localhost

## ✅ Current Status

- ✅ Backend configured for Supabase (PostgreSQL)
- ✅ Frontend configured for localhost
- ✅ Environment variables template ready
- ⚠️  **Need to connect to your Supabase project**

## 🔧 Fix Supabase Connection (REQUIRED)

### The Error: `ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co`

This means your Supabase project is **PAUSED** or the hostname is wrong.

### Step-by-Step Fix:

#### 1. Resume Supabase Project

1. Go to **https://supabase.com**
2. **Login** to your account
3. Find your project in the dashboard
4. **If you see "Paused" or "Restore" button:**
   - Click **"Restore"** or **"Resume"**
   - Wait 1-2 minutes for project to resume
   - Free tier projects auto-pause after 1 week of inactivity

#### 2. Get Connection String

1. In Supabase Dashboard → **Your Project**
2. Go to **Settings** → **Database**
3. Scroll to **"Connection string"** section
4. Click **"URI"** tab
5. **Copy the entire connection string**

Example:
```
postgresql://postgres:YourPassword@db.xxxxx.supabase.co:5432/postgres
```

#### 3. Update .env File

**Option A: Use Script (Recommended)**
```powershell
cd backend
npm run setup-supabase
# Or: .\get-supabase-credentials.ps1
```
Paste your connection string when prompted.

**Option B: Manual Update**

Edit `backend\.env` file:
```env
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co        # From connection string
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_actual_password     # From connection string
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

#### 4. Test Connection

```powershell
cd backend
npm run test-db
```

Should show:
```
✅ Connection successful!
✅ Supabase database is accessible
```

#### 5. Run Database Migrations

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Open `supabase/migrations/001_initial_schema.sql` from your project
4. Copy and paste entire SQL
5. Click **"Run"** (or Ctrl+Enter)
6. Wait for completion

#### 6. (Optional) Seed Initial Data

1. In SQL Editor, click **"New query"**
2. Open `supabase/seed.sql`
3. Copy and paste
4. Click **"Run"**

## 🚀 Start Both Servers

### Option 1: Use Start Script

```powershell
# From project root
.\start-full-project.ps1
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```powershell
cd backend
npm run kill-port
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## ✅ Verify Everything Works

### 1. Check Backend
```powershell
curl http://localhost:8000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

### 2. Check Frontend
- Open: http://localhost:3001
- You should see the login page

### 3. Test Login
- Email: `admin@billing.com`
- Password: `admin123`

## 🔐 Default Login Credentials

After running migrations and seed data:
- **Super Admin:** `admin@billing.com` / `admin123`
- **ISP Admin:** `ispadmin@billing.com` / `admin123`
- **Account Manager:** `accountmanager@billing.com` / `admin123`
- **Technical Officer:** `technical@billing.com` / `admin123`
- **Recovery Officer:** `recovery@billing.com` / `admin123`
- **Customer:** `customer@billing.com` / `admin123`

## 🐛 Troubleshooting

### Still Getting ENOTFOUND?

1. **Verify Supabase project is active:**
   - Dashboard should show "Active" status
   - Not "Paused" or "Restoring"

2. **Test hostname resolution:**
   ```powershell
   nslookup db.qppdkzzmijjyoihzfdxw.supabase.co
   ```
   Should return an IP address

3. **Get fresh credentials:**
   - Supabase Dashboard → Settings → Database
   - Copy connection string again
   - Update .env file

4. **Try connection pooling port:**
   ```env
   DB_PORT=6543
   ```

### Server Not Starting?

1. **Kill port:**
   ```powershell
   npm run kill-port
   ```

2. **Check .env file:**
   ```powershell
   Get-Content .env | Select-String "DB_"
   ```

3. **Verify VERCEL=0:**
   ```powershell
   Get-Content .env | Select-String "VERCEL"
   ```

## ✅ Success Checklist

- [ ] Supabase project is active (not paused)
- [ ] .env file has correct DB_HOST
- [ ] .env file has correct DB_PASSWORD
- [ ] Database migrations have been run
- [ ] Backend server starts without errors
- [ ] Health endpoint returns "database: connected"
- [ ] Frontend loads at http://localhost:3001
- [ ] Can login with admin@billing.com

---

**Once Supabase project is resumed and .env is updated, everything will work!**

