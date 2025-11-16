# 🚀 Complete Deployment Guide - GitHub + Vercel + Database

## 📋 What This Guide Covers

1. ✅ Push project to GitHub
2. ✅ Deploy frontend and backend to Vercel
3. ✅ Set environment variables
4. ✅ Set up database connection
5. ✅ Verify login and dashboard redirect

---

## STEP 1: Push Project to GitHub

### 1.1 Check Current Status

```bash
git status
```

**If you see uncommitted changes:**
```bash
git add -A
git commit -m "Prepare for deployment"
```

### 1.2 Push to GitHub

```bash
git push origin main
```

**Verify:**
- Go to: https://github.com/your-username/Internet-Billing-System
- You should see all your files

---

## STEP 2: Connect Vercel to GitHub

### 2.1 Import Project in Vercel

1. **Go to:** https://vercel.com
2. **Sign in** to your account
3. **Click** "Add New" → "Project"
4. **Import** from GitHub:
   - Select your repository: `Internet-Billing-System`
   - Click "Import"

### 2.2 Configure Build Settings

Vercel should auto-detect, but verify:

- **Framework Preset:** Vite
- **Root Directory:** `./` (root)
- **Build Command:** `cd frontend && npm install && npm run build`
- **Output Directory:** `frontend/dist`
- **Install Command:** `cd backend && npm install --production=false && cd ../frontend && npm install`

**Click "Deploy"**

---

## STEP 3: Set Up Database

### 3.1 Choose Database Provider

**Option A: PlanetScale (Recommended - Free Tier)**
1. Go to: https://planetscale.com
2. Sign up for free account
3. Create new database
4. Get connection credentials

**Option B: AWS RDS**
1. Go to AWS RDS Console
2. Create MySQL database instance
3. Get endpoint and credentials

**Option C: Railway (Free Tier)**
1. Go to: https://railway.app
2. Sign up for free account
3. Create new MySQL database
4. Get credentials from Variables tab

**Option D: Your Own MySQL Server**
- Use your existing MySQL server
- Make sure it's accessible from the internet

### 3.2 Get Database Credentials

You need these 4 values:
- **DB_HOST** - Database host/endpoint
- **DB_USER** - Database username
- **DB_PASSWORD** - Database password
- **DB_NAME** - Database name

**Save these - you'll need them in Step 4!**

---

## STEP 4: Set Environment Variables in Vercel

### 4.1 Go to Environment Variables

1. **Go to:** Vercel Dashboard → Your Project
2. **Click:** "Settings" (top menu)
3. **Click:** "Environment Variables" (left sidebar)

### 4.2 Add Each Variable

**Click "Add New" for each variable:**

#### Variable 1: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Environments:** ✅ Production, ✅ Preview
- **Save**

#### Variable 2: DB_HOST
- **Key:** `DB_HOST`
- **Value:** Your database host (from Step 3.2)
  - Example: `aws.connect.psdb.cloud` (PlanetScale)
  - Example: `your-db.xxxxx.us-east-1.rds.amazonaws.com` (AWS RDS)
- **Environments:** ✅ Production, ✅ Preview
- **Save**

#### Variable 3: DB_USER
- **Key:** `DB_USER`
- **Value:** Your database username (from Step 3.2)
  - Example: `root`, `admin`, `username`
- **Environments:** ✅ Production, ✅ Preview
- **Save**

#### Variable 4: DB_PASSWORD ⚠️ IMPORTANT
- **Key:** `DB_PASSWORD`
- **Value:** Your database password (from Step 3.2)
  - **MUST be non-empty!**
  - Copy exactly as it appears
- **Environments:** ✅ Production, ✅ Preview
- **Save**

#### Variable 5: DB_NAME
- **Key:** `DB_NAME`
- **Value:** Your database name (from Step 3.2)
  - Example: `billing_db`, `internet_billing_db`
- **Environments:** ✅ Production, ✅ Preview
- **Save**

#### Variable 6: JWT_SECRET
- **Key:** `JWT_SECRET`
- **Value:** Random 32+ character string
  - Generate: `openssl rand -base64 32`
  - Or use: `my-super-secret-jwt-key-2024-production-xyz123456789`
- **Environments:** ✅ Production, ✅ Preview
- **Save**

### 4.3 Verify All Variables

You should see **6 variables** in the list:
- ✅ `NODE_ENV`
- ✅ `DB_HOST`
- ✅ `DB_USER`
- ✅ `DB_PASSWORD`
- ✅ `DB_NAME`
- ✅ `JWT_SECRET`

---

## STEP 5: Configure Database Firewall

**⚠️ IMPORTANT:** Database must allow connections from Vercel!

### 5.1 Allow Connections from Anywhere

**PlanetScale:**
1. Go to PlanetScale Dashboard
2. Select your database
3. Settings → Connectivity
4. Enable "Allow connections from anywhere"

**AWS RDS:**
1. Go to AWS RDS Console
2. Select your database instance
3. Security Groups → Inbound Rules
4. Add rule: MySQL (3306) from `0.0.0.0/0`

**Railway:**
1. Go to Railway Dashboard
2. Select your database service
3. Settings → Enable "Public Networking"

**Other Providers:**
- Allow connections from `0.0.0.0/0` (all IPs)
- Vercel uses dynamic IPs, so IP whitelisting won't work

---

## STEP 6: Initialize Database Schema

### 6.1 Run Database Setup

**Option A: Using Database Provider Console**

1. Connect to your database using provider's console
2. Run the SQL from `backend/database/setup.sql`

**Option B: Using Local Setup Script**

1. Create `backend/.env` file with your database credentials
2. Run:
   ```bash
   cd backend
   npm run init-db
   ```

**Option C: Using Database Migration**

The app will create tables automatically on first connection if they don't exist.

---

## STEP 7: Redeploy in Vercel

### 7.1 Redeploy After Adding Variables

1. **Go to:** Vercel Dashboard → Your Project
2. **Click:** "Deployments" tab
3. **Find:** Latest deployment
4. **Click:** "..." (three dots) → "Redeploy"
5. **Wait:** 2-5 minutes for deployment to complete

**Status should show "Ready" ✅**

---

## STEP 8: Verify Deployment

### 8.1 Test Diagnostic Endpoint

Visit:
```
https://your-app.vercel.app/api/diagnose
```

**Should show:**
```json
{
  "environmentVariables": {
    "DB_HOST": "aws.connect.psdb.cloud...",
    "DB_USER": "your-username",
    "DB_PASSWORD": "✅ SET",
    "DB_NAME": "your-database-name",
    "JWT_SECRET": "✅ SET"
  },
  "connectionTest": {
    "status": "SUCCESS"
  }
}
```

### 8.2 Test Health Check

Visit:
```
https://your-app.vercel.app/api/health
```

**Should show:**
```json
{
  "status": "OK",
  "database": "connected"
}
```

### 8.3 Test Login and Dashboard Redirect

1. **Go to:** `https://your-app.vercel.app`
2. **Login with:**
   - Email: `admin@billing.com`
   - Password: `admin123`
3. **Should redirect to:** `/dashboard` ✅

**If login fails:**
- Check Vercel function logs
- Verify database connection
- Check diagnostic endpoint

---

## STEP 9: Create Initial Admin User (If Needed)

### 9.1 If Database is Empty

If you're starting fresh, you may need to create the admin user:

**Option A: Using Database Console**

Run this SQL:
```sql
INSERT INTO users (email, password, role, isp_id, created_at, updated_at)
VALUES (
  'admin@billing.com',
  '$2a$10$YourHashedPasswordHere',
  'super_admin',
  NULL,
  NOW(),
  NOW()
);
```

**Option B: Using Local Script**

1. Create `backend/.env` with database credentials
2. Run initialization script (if available)

**Note:** The password hash is bcrypt. Use a password hasher or the app's registration endpoint.

---

## 📋 Complete Checklist

### Before Deployment:
- [ ] Project pushed to GitHub
- [ ] Vercel project created and connected to GitHub
- [ ] Database created and accessible
- [ ] Database credentials saved

### During Deployment:
- [ ] All 6 environment variables added in Vercel
- [ ] Variables set for Production environment
- [ ] Database firewall allows `0.0.0.0/0`
- [ ] Database schema initialized
- [ ] Redeployed in Vercel

### After Deployment:
- [ ] Diagnostic endpoint shows all variables ✅
- [ ] Health endpoint shows database connected
- [ ] Login works successfully
- [ ] Redirects to dashboard after login
- [ ] All features working

---

## 🔍 Troubleshooting

### Problem: "Missing Environment Variables"

**Solution:**
- Verify all 6 variables are in Vercel
- Check they're set for Production
- Redeploy after adding variables

### Problem: "Database Connection Failed"

**Solution:**
- Check database firewall allows `0.0.0.0/0`
- Verify credentials are correct
- Test connection locally if possible
- See `FIX_DATABASE_CONNECTION_NOW.md`

### Problem: "Login Not Redirecting to Dashboard"

**Solution:**
- Check browser console for errors
- Verify JWT_SECRET is set
- Check Vercel function logs
- Verify user exists in database

### Problem: "404 on API Routes"

**Solution:**
- Check `vercel.json` configuration
- Verify API routes are in `api/` folder
- Check Vercel function logs

---

## 🎯 Quick Summary

1. **Push to GitHub:** `git push origin main`
2. **Import to Vercel:** Add project from GitHub
3. **Create Database:** Choose provider and create database
4. **Add Variables:** Set all 6 environment variables in Vercel
5. **Configure Firewall:** Allow `0.0.0.0/0` in database
6. **Initialize Schema:** Run database setup
7. **Redeploy:** Deployments → Latest → Redeploy
8. **Test:** Login and verify dashboard redirect

---

## 📚 Additional Resources

- `DEPLOY_TO_VERCEL_NOW.md` - Detailed Vercel deployment
- `SET_DB_PASSWORD_VERCEL_STEP_BY_STEP.md` - Environment variable setup
- `FIX_DATABASE_CONNECTION_NOW.md` - Database connection troubleshooting
- `CREATE_ENV_FILE.md` - Local .env file setup

---

## ✅ Success Indicators

When everything is working:
- ✅ All environment variables show "✅ SET" in diagnostic
- ✅ Database connection shows "SUCCESS"
- ✅ Health endpoint shows "connected"
- ✅ Login works and redirects to dashboard
- ✅ All app features function normally

---

**Your app is now fully deployed and ready to use! 🎉**

