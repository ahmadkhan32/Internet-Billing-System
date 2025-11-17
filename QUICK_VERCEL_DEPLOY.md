# ⚡ Quick Vercel Deployment Guide

## 🎯 What's Configured

✅ **Database:** MySQL Cloud (PlanetScale) - Default  
✅ **Vercel Config:** Optimized for serverless deployment  
✅ **Frontend:** Configured to use `/api` (same domain)  
✅ **SSL:** Enabled for cloud databases  
✅ **Build:** Configured for Vercel

## 🚀 Deploy in 3 Steps

### Step 1: Create PlanetScale Database

1. Go to https://planetscale.com (free signup)
2. Create database: `internet_billing_db`
3. Get connection credentials from "Connect" button
4. Enable "Allow connections from anywhere" in Settings → Connectivity

### Step 2: Deploy to Vercel

```bash
# Option A: Via Vercel Dashboard
1. Go to vercel.com
2. Import your GitHub repository
3. Click "Deploy" (don't worry about env vars yet)
```

```bash
# Option B: Via CLI
npm i -g vercel
vercel login
vercel
```

### Step 3: Add Environment Variables

**In Vercel Dashboard → Settings → Environment Variables:**

```
NODE_ENV=production
DB_DIALECT=mysql
DB_HOST=aws.connect.psdb.cloud
DB_PORT=3306
DB_USER=your_planetscale_username
DB_PASSWORD=your_planetscale_password
DB_NAME=your_database_name
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=generate-with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

**Then redeploy!**

## ✅ Verify It Works

1. Check health: `https://your-app.vercel.app/api/health`
2. Check diagnostics: `https://your-app.vercel.app/api/diagnose`

## 📝 Initialize Database Schema

After deployment, initialize the database schema:

**Option 1: Run locally (recommended)**
```bash
# Set .env file with PlanetScale credentials
# Then run:
cd backend
npm run init-db
```

**Option 2: Use PlanetScale Console**
- Go to PlanetScale Dashboard → Your Database → Console
- Run SQL from `backend/database/setup.sql` (if exists)

## 🎉 Done!

Your app is now live at: `https://your-app.vercel.app`

---

**Note:** Environment variables are REQUIRED for database connection. The app is configured correctly - you just need to add your PlanetScale credentials in Vercel.
