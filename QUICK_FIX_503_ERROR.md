# 🚨 Quick Fix: 503 Database Connection Error

## The Problem
```
503 - Database connection failed
Error: connect ETIMEDOUT
```

## ✅ Solution (5 Minutes)

### Step 1: Set Environment Variables in Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add these variables:

```
DB_HOST=your-database-host
DB_PORT=3306 (or 5432 for PostgreSQL)
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_DIALECT=mysql (or postgres)
NODE_ENV=production
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
DB_SSL=true (for cloud databases)
```

5. Check **Production**, **Preview**, **Development**
6. Click **Save**

### Step 2: Configure Database Firewall

**Allow connections from anywhere:**
- Database firewall must allow `0.0.0.0/0`
- Vercel uses dynamic IPs, so IP whitelisting won't work

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click **⋯** on latest deployment
3. Click **Redeploy**
4. Wait for completion

### Step 4: Test

Visit: `https://your-app.vercel.app/api/health`

Should show: `{"status":"OK","database":"connected"}`

## 📚 Full Guide

See `VERCEL_DATABASE_SETUP.md` for detailed instructions.

## 🔍 Still Not Working?

1. Check Vercel function logs
2. Verify all environment variables are set
3. Test database connection from your local machine
4. Use `/api/diagnose` endpoint for detailed diagnostics

---

**Remember**: After setting environment variables, you MUST redeploy!
