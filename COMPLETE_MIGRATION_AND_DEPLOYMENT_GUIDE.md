# Complete Migration & Deployment Guide
## XAMPP MySQL → Supabase → Vercel

This guide will help you:
1. ✅ Migrate from XAMPP/phpMyAdmin MySQL to Supabase (PostgreSQL)
2. ✅ Preserve all credentials (Super Admin, Business Admin, etc.)
3. ✅ Deploy Frontend and Backend to Vercel
4. ✅ Set up all environment variables

---

## 📋 Prerequisites

- ✅ XAMPP running with your current database
- ✅ Supabase account (free tier works)
- ✅ Vercel account (free tier works)
- ✅ GitHub account (for deployment)

---

## Part 1: Setup Supabase Database

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `internet-billing-system`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to initialize

### Step 2: Get Supabase Credentials

1. Supabase Dashboard → **Settings** → **Database**
2. Find **Connection string** section
3. Copy **URI** connection string
4. Extract these values:

```
Host: db.xxxxx.supabase.co (from connection string)
Port: 5432
User: postgres
Password: [your project password]
Database: postgres
```

**Save these credentials - you'll need them!**

### Step 3: Run Database Schema Migration

1. Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Open `supabase/migrations/001_initial_schema.sql` from your project
4. Copy entire content
5. Paste into Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. Wait for success message ✅

---

## Part 2: Migrate Data from XAMPP to Supabase

### Step 1: Prepare Migration Script

1. Open `backend/.env` file
2. Add these variables for **MySQL (source)**:

```env
# MySQL Connection (XAMPP - Source)
MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3306
MYSQL_DB_USER=root
MYSQL_DB_PASSWORD=
MYSQL_DB_NAME=internet_billing_db
```

3. Add these variables for **Supabase (destination)**:

```env
# Supabase Connection (Destination)
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-supabase-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

**Replace `xxxxx` with your actual Supabase host!**

### Step 2: Run Migration Script

```bash
cd backend
npm install pg pg-hstore  # Install PostgreSQL driver
node migrate-to-supabase.js
```

This will:
- ✅ Connect to your XAMPP MySQL database
- ✅ Connect to Supabase
- ✅ Migrate all data (preserving passwords as bcrypt hashes)
- ✅ Keep all credentials the same

### Step 3: Verify Migration

1. Supabase Dashboard → **Table Editor**
2. Check these tables have data:
   - `users` (should have your admin users)
   - `isps` (should have your businesses)
   - `customers`, `bills`, `payments`, etc.
3. Verify user count matches your MySQL database

---

## Part 3: Deploy to Vercel

### Step 3.1: Prepare Frontend

1. Open `frontend/.env` or `frontend/.env.production`
2. Set production API URL:

```env
VITE_API_BASE_URL=https://your-backend.vercel.app
```

**Note:** You'll update this after backend deployment.

### Step 3.2: Deploy Backend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:

**Project Settings:**
- **Framework Preset**: Other
- **Root Directory**: `./` (root)
- **Build Command**: Leave empty
- **Output Directory**: Leave empty
- **Install Command**: `npm install`

**Environment Variables:**
Click **"Environment Variables"** and add:

```
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-supabase-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=generate-32-char-secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=8000
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. Click **"Deploy"**
6. Wait for deployment (2-3 minutes)
7. Copy your backend URL: `https://your-backend.vercel.app`

### Step 3.3: Deploy Frontend to Vercel

1. Vercel Dashboard → **"Add New Project"**
2. Import same GitHub repository
3. Configure:

**Project Settings:**
- **Framework Preset**: Vite
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Environment Variables:**
```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

**Replace `your-backend.vercel.app` with your actual backend URL!**

4. Click **"Deploy"**
5. Wait for deployment
6. Copy your frontend URL: `https://your-frontend.vercel.app`

### Step 3.4: Update Backend Environment Variables

1. Go to Backend project in Vercel
2. **Settings** → **Environment Variables**
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
4. **Redeploy** backend

---

## Part 4: Verify Deployment

### Test Backend

1. Visit: `https://your-backend.vercel.app/api/health`
2. Should show: `{"status":"ok","database":"connected"}`

### Test Frontend

1. Visit: `https://your-frontend.vercel.app`
2. Try logging in with your existing credentials:
   - **Super Admin**: `admin@billing.com` / `admin123`
   - **Business Admin**: Your business credentials

### Test Login

All your existing credentials should work:
- ✅ Super Admin login
- ✅ Business Admin login
- ✅ Customer login
- ✅ All passwords preserved (bcrypt hashes migrated)

---

## Part 5: Environment Variables Summary

### Backend (Vercel)

```
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-supabase-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=your-32-character-secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=8000
```

### Frontend (Vercel)

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

---

## Troubleshooting

### Migration Issues

**Problem:** Migration script fails
- ✅ Check MySQL is running in XAMPP
- ✅ Verify MySQL credentials in `.env`
- ✅ Check Supabase project is active (not paused)
- ✅ Verify Supabase credentials are correct

**Problem:** Passwords don't work after migration
- ✅ Passwords are preserved as bcrypt hashes
- ✅ If issue persists, reset password in Supabase Table Editor

### Deployment Issues

**Problem:** Backend shows "Database connection failed"
- ✅ Check environment variables in Vercel
- ✅ Verify Supabase credentials
- ✅ Ensure `DB_SSL=true` is set
- ✅ Redeploy after setting variables

**Problem:** Frontend can't connect to backend
- ✅ Check `VITE_API_BASE_URL` in frontend env vars
- ✅ Verify backend URL is correct
- ✅ Check CORS settings in backend

---

## Quick Reference

### Get Supabase Credentials
1. Supabase Dashboard → Settings → Database
2. Copy Connection string (URI)
3. Extract: Host, Port, User, Password

### Get Vercel URLs
1. Vercel Dashboard → Your Project
2. Copy deployment URL
3. Use for `FRONTEND_URL` and `VITE_API_BASE_URL`

### Test Database Connection
```bash
cd backend
npm run test-db
```

### Check Deployment Logs
1. Vercel Dashboard → Your Project → Deployments
2. Click on deployment → Functions → Logs

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database schema migrated to Supabase
- [ ] Data migrated from XAMPP to Supabase
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] Login works with existing credentials
- [ ] All data accessible

---

## 🎉 Success!

Your Internet Billing System is now:
- ✅ Running on cloud database (Supabase)
- ✅ Deployed on Vercel (frontend + backend)
- ✅ All credentials preserved
- ✅ All data migrated
- ✅ Ready for production use!

---

**Need help?** See:
- `DATABASE_CONNECTION_TROUBLESHOOTING.md` - Database issues
- `FIX_DATABASE_CONNECTION_NOW.md` - Quick database fix
- `VERCEL_DEPLOYMENT_CHECKLIST.md` - Deployment checklist

