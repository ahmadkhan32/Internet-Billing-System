# 🔧 Fix 503 Database Connection Error

## ❌ Error You're Seeing

```
503 Service Unavailable
Database connection failed. Please check your database configuration.
```

## 🔍 What This Means

The application cannot connect to your database. This is usually because:

1. **Environment variables not set in Vercel** (most common)
2. **Database credentials incorrect**
3. **Database not accessible from Vercel**
4. **Database firewall blocking connections**

## ✅ Quick Fix Steps

### Step 1: Check Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Verify these variables are set (for **Production**, **Preview**, and **Development**):

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
JWT_SECRET=your-32-character-secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

### Step 2: Verify Database Access

**For PlanetScale:**
1. Go to PlanetScale Dashboard
2. Click on your database
3. Go to **Settings** → **Connectivity**
4. Ensure **"Allow connections from anywhere"** is **ENABLED**
5. If not, enable it and save

**For Other Databases:**
- Ensure firewall allows connections from `0.0.0.0/0` (all IPs)
- Vercel uses dynamic IPs, so IP whitelisting won't work

### Step 3: Test Database Connection

**Option A: Use Health Check Endpoint**
```
GET https://your-app.vercel.app/api/health
```

**Option B: Use Diagnostics Endpoint**
```
GET https://your-app.vercel.app/api/diagnose
```

This will show:
- Which environment variables are set
- Database connection status
- Specific error messages
- Troubleshooting recommendations

### Step 4: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** → Latest Deployment
3. Click **Functions** tab
4. Look for error messages about database connection

Common errors you might see:
- `ECONNREFUSED` - Database host unreachable
- `Access denied` - Wrong username/password
- `Unknown database` - Database name incorrect
- `ETIMEDOUT` - Connection timeout (firewall blocking)

### Step 5: Redeploy

After fixing environment variables:
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

## 🔍 Detailed Troubleshooting

### Missing Environment Variables

**Symptoms:**
- Error message mentions missing variables
- `/api/diagnose` shows variables as "NOT SET"

**Fix:**
1. Add missing variables in Vercel
2. Make sure to set for **all environments** (Production, Preview, Development)
3. Redeploy

### Wrong Database Credentials

**Symptoms:**
- Error: "Access denied" or "password"
- Connection fails but variables are set

**Fix:**
1. Double-check credentials in PlanetScale dashboard
2. Copy credentials exactly (no extra spaces)
3. Regenerate password if needed
4. Update in Vercel and redeploy

### Database Not Accessible

**Symptoms:**
- Error: "ECONNREFUSED" or "timeout"
- Connection fails even with correct credentials

**Fix:**
1. **PlanetScale:** Enable "Allow connections from anywhere"
2. **Other databases:** Check firewall settings
3. Verify database is running (not paused)
4. Check database host is correct

### Database Schema Not Initialized

**Symptoms:**
- Connection works but queries fail
- Error: "Table doesn't exist"

**Fix:**
1. Run database initialization:
   ```bash
   cd backend
   npm run init-db
   ```
2. Or use PlanetScale Console to run migrations

## 📋 Checklist

Before reporting the issue, verify:

- [ ] All environment variables are set in Vercel
- [ ] Variables are set for correct environment (Production/Preview)
- [ ] Database credentials are correct
- [ ] Database allows connections from anywhere (0.0.0.0/0)
- [ ] Database is running (not paused)
- [ ] Redeployed after adding/changing variables
- [ ] Checked Vercel function logs for specific errors
- [ ] Tested `/api/diagnose` endpoint

## 🆘 Still Not Working?

1. **Check `/api/diagnose` endpoint:**
   - Shows detailed connection information
   - Lists missing variables
   - Provides specific recommendations

2. **Check Vercel Logs:**
   - Go to Deployments → Latest → Functions
   - Look for database connection errors
   - Copy error messages for troubleshooting

3. **Verify Database:**
   - Test connection locally with same credentials
   - Use database client (MySQL Workbench, DBeaver, etc.)
   - Verify credentials work outside of Vercel

4. **Common Issues:**
   - Variables set but not redeployed
   - Variables set for wrong environment
   - Database paused (PlanetScale free tier)
   - Firewall blocking connections
   - SSL configuration issues

## 📚 Related Documentation

- `VERCEL_DEPLOYMENT_READY.md` - Complete deployment guide
- `QUICK_VERCEL_DEPLOY.md` - Quick reference
- `DEPLOYMENT_SUMMARY.md` - Configuration summary

---

**Remember:** After adding/changing environment variables in Vercel, you **MUST redeploy** for changes to take effect!

