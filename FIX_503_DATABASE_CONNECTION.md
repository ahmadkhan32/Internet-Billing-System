# 🔧 Fix 503 Database Connection Error - Complete Guide

## ❌ Your Error
```
Database connection failed. Please check your database configuration and ensure database is accessible from Vercel.
Status: 503
```

**This means:** Environment variables are set, but the database connection is failing.

---

## 🔍 STEP 1: Check What's Wrong

### Visit Diagnostic Endpoint

**Go to:**
```
https://your-app.vercel.app/api/diagnose
```

**This will show you:**
- ✅ Which environment variables are set
- ❌ What the exact error is
- 💡 Specific recommendations to fix it

**Look for:**
- Error code (ECONNREFUSED, timeout, Access denied, etc.)
- Recommendations section with specific fixes

---

## 🔥 MOST COMMON FIX: Database Firewall

**90% of 503 errors are caused by database firewall blocking Vercel!**

### Fix: Allow Connections from Anywhere

**Vercel uses dynamic IPs** - you must allow connections from `0.0.0.0/0` (all IPs).

#### For PlanetScale:

1. Go to: https://app.planetscale.com
2. Sign in
3. Click on your database
4. Click **"Settings"** (left sidebar)
5. Click **"Connectivity"** tab
6. Find **"Allow connections from"**
7. Select **"Anywhere"** or enable **"Allow connections from anywhere"**
8. **Save**

**That's it!** Vercel can now connect.

#### For AWS RDS:

1. Go to: https://console.aws.amazon.com/rds
2. Sign in to AWS
3. Click **"Databases"** (left sidebar)
4. Click on your database instance
5. Scroll to **"Connectivity & security"** tab
6. Find **"VPC security groups"** → Click on the security group link
7. In Security Group page:
   - Click **"Inbound rules"** tab
   - Click **"Edit inbound rules"**
   - Click **"Add rule"**
   - Configure:
     - **Type:** `MySQL/Aurora`
     - **Port:** `3306`
     - **Source:** `0.0.0.0/0` (allows all IPs)
   - Click **"Save rules"**

**That's it!** Vercel can now connect.

#### For Railway:

1. Go to: https://railway.app
2. Sign in
3. Click on your project
4. Click on your database service
5. Click **"Settings"** tab
6. Find **"Public Networking"**
7. **Enable** it (toggle ON)
8. **Save**

**That's it!** Vercel can now connect.

#### For DigitalOcean:

1. Go to: https://cloud.digitalocean.com
2. Sign in
3. Click **"Databases"** (left sidebar)
4. Click on your database
5. Click **"Settings"** tab
6. Scroll to **"Trusted Sources"**
7. Click **"Add trusted source"**
8. Enter: `0.0.0.0/0`
9. Click **"Add"**

**That's it!** Vercel can now connect.

#### For Other Providers:

**General Steps:**
1. Find **"Firewall"**, **"Security Groups"**, **"Network Access"**, or **"Allowed IPs"** settings
2. Add rule to allow:
   - **Port:** `3306` (MySQL)
   - **Source:** `0.0.0.0/0` (all IPs)
3. **Save**

**Why `0.0.0.0/0`?**
- Vercel uses **dynamic IPs** (they change)
- You can't whitelist specific IPs
- You must allow **all IPs** (`0.0.0.0/0`)

---

## 🔐 STEP 2: Verify Database Credentials

### Check Environment Variables in Vercel

1. Go to: Vercel → Your Project → Settings → Environment Variables
2. Verify these are correct:
   - `DB_HOST` - Your database host
   - `DB_USER` - Your database username
   - `DB_PASSWORD` - Your database password
   - `DB_NAME` - Your database name

### Test Connection Locally (If Possible)

**If you can test from your local machine:**

```bash
mysql -h your-db-host -u your-db-user -p your-db-name
```

**If this works but Vercel doesn't:**
- It's a firewall issue (see Step 1)

**If this doesn't work:**
- Credentials are wrong
- Fix credentials in Vercel

---

## 🌐 STEP 3: Verify Database is Publicly Accessible

**Your database must be accessible from the internet, not just private network.**

### Check Database Settings:

- **Public Networking:** Must be enabled
- **Private Network Only:** Must be disabled
- **Public IP:** Must be assigned

**If using private network only:**
- Enable public networking
- Or use a VPN/bastion host (advanced)

---

## 🔒 STEP 4: Check SSL/TLS Configuration

**Most cloud databases require SSL connections.**

**The code automatically enables SSL for:**
- PlanetScale (`.psdb.cloud`)
- AWS RDS (`.rds.amazonaws.com`)
- Railway (`.railway.app`)
- Any production environment

**If you see SSL errors:**
- Verify your database supports SSL
- Check database provider documentation
- SSL is automatically configured - no action needed

---

## 📋 STEP 5: Check Vercel Function Logs

**Get detailed error information:**

1. Go to: Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Click on **`api/index.js`**
4. Click **"Logs"** tab
5. Look for specific error messages

**Common errors you might see:**

- `ECONNREFUSED` → Firewall issue (Step 1)
- `ETIMEDOUT` → Firewall or network issue (Step 1)
- `Access denied` → Wrong credentials (Step 2)
- `Unknown database` → Wrong DB_NAME (Step 2)
- `SSL error` → SSL configuration (Step 4)

---

## ✅ STEP 6: Verify Fix

### After Making Changes:

1. **Redeploy in Vercel:**
   - Deployments → Latest → Redeploy
   - Wait 2-5 minutes

2. **Test Diagnostic Endpoint:**
   ```
   https://your-app.vercel.app/api/diagnose
   ```
   Should show: `"status": "SUCCESS"`

3. **Test Health Endpoint:**
   ```
   https://your-app.vercel.app/api/health
   ```
   Should show: `"database": "connected"`

4. **Test Login:**
   - Go to your app
   - Try to login
   - Should work! ✅

---

## 📋 Complete Checklist

- [ ] Checked diagnostic endpoint (`/api/diagnose`)
- [ ] Database firewall allows `0.0.0.0/0` (all IPs)
- [ ] Database credentials are correct in Vercel
- [ ] Database is publicly accessible (not private only)
- [ ] Tested connection locally (if possible)
- [ ] Checked Vercel function logs for specific errors
- [ ] Redeployed after making changes
- [ ] Verified fix with diagnostic endpoint

---

## 🎯 Quick Summary

**Most likely issue:** Database firewall blocking Vercel

**Quick fix:**
1. Go to your database provider dashboard
2. Allow connections from `0.0.0.0/0`
3. Redeploy in Vercel
4. Test again

**That's it!** 90% of the time, this fixes it! 🎉

---

## 🆘 Still Not Working?

### Check These:

1. **Database Status:**
   - Is database running?
   - Check database provider status page

2. **Network Connectivity:**
   - Can you connect from your local machine?
   - If yes → Firewall issue
   - If no → Database/credentials issue

3. **Vercel Logs:**
   - Check function logs for specific error codes
   - Look for detailed error messages

4. **Contact Database Provider:**
   - If firewall configuration is unclear
   - If database is not accessible

---

**The most common fix is allowing `0.0.0.0/0` in your database firewall!**

