# 🚀 Setup Vercel Environment Variables - Complete Guide

## ⚠️ IMPORTANT: You Must Do This Manually

I cannot access your Vercel account or set environment variables for you. Follow these steps:

---

## STEP 1: Get Your Database Credentials

### Option A: From Your Local .env File

If you have a `.env` file in the `backend` folder:

1. Open: `backend/.env`
2. Find these values:
   ```
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   JWT_SECRET=your-jwt-secret
   ```

### Option B: From Your Database Provider Dashboard

**PlanetScale:**
1. Go to https://app.planetscale.com
2. Select your database
3. Click "Connect"
4. Copy the connection string values

**AWS RDS:**
1. Go to AWS RDS Console
2. Select your database instance
3. Check "Connectivity & security" tab

**Railway:**
1. Go to Railway Dashboard
2. Select your database service
3. Go to "Variables" tab

**Other Providers:**
- Check your database provider's dashboard
- Look for "Connection String" or "Credentials"

---

## STEP 2: Add Environment Variables to Vercel

### 2.1 Go to Vercel Dashboard

1. Visit: **https://vercel.com**
2. **Sign in** to your account
3. Click on **your project** (Internet-Billing-System)

### 2.2 Open Environment Variables

1. Click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)

### 2.3 Add Each Variable

**For EACH variable below, click "Add New" and enter:**

#### Variable 1: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Environments:** ✅ Production, ✅ Preview
- Click **"Save"**

#### Variable 2: DB_HOST
- **Key:** `DB_HOST`
- **Value:** Your database host (e.g., `aws.connect.psdb.cloud`)
- **Environments:** ✅ Production, ✅ Preview
- Click **"Save"**

#### Variable 3: DB_USER
- **Key:** `DB_USER`
- **Value:** Your database username (e.g., `root`)
- **Environments:** ✅ Production, ✅ Preview
- Click **"Save"**

#### Variable 4: DB_PASSWORD ⚠️ REQUIRED
- **Key:** `DB_PASSWORD`
- **Value:** Your database password (MUST be non-empty!)
- **Environments:** ✅ Production, ✅ Preview
- Click **"Save"**

#### Variable 5: DB_NAME
- **Key:** `DB_NAME`
- **Value:** Your database name (e.g., `billing_db`)
- **Environments:** ✅ Production, ✅ Preview
- Click **"Save"**

#### Variable 6: JWT_SECRET
- **Key:** `JWT_SECRET`
- **Value:** Random 32+ character string
  - Generate one: `openssl rand -base64 32`
  - Or use: `my-super-secret-jwt-key-2024-production-xyz123456789`
- **Environments:** ✅ Production, ✅ Preview
- Click **"Save"**

### 2.4 Verify All Variables

You should see **6 variables** in the list:
- ✅ `NODE_ENV`
- ✅ `DB_HOST`
- ✅ `DB_USER`
- ✅ `DB_PASSWORD` ⚠️ **This is the one you're missing!**
- ✅ `DB_NAME`
- ✅ `JWT_SECRET`

---

## STEP 3: Redeploy (CRITICAL!)

**⚠️ VERY IMPORTANT:** Environment variables only apply to NEW deployments!

1. Go to **"Deployments"** tab
2. Find the **latest deployment**
3. Click **"..."** (three dots) → **"Redeploy"**
4. Wait 2-5 minutes for deployment to complete

---

## STEP 4: Verify It's Working

### Test 1: Diagnostic Endpoint

Visit:
```
https://your-app.vercel.app/api/diagnose
```

Should show:
```json
{
  "environmentVariables": {
    "DB_PASSWORD": "✅ SET"
  },
  "connectionTest": {
    "status": "SUCCESS"
  }
}
```

### Test 2: Health Check

Visit:
```
https://your-app.vercel.app/api/health
```

Should show:
```json
{
  "status": "OK",
  "database": "connected"
}
```

### Test 3: Login

1. Go to: `https://your-app.vercel.app`
2. Login with: `admin@billing.com` / `admin123`
3. Should redirect to dashboard ✅

---

## 🔍 Troubleshooting

### Still Getting "Missing DB_PASSWORD"?

**Check 1:** Is it in the list?
- Go to Vercel → Settings → Environment Variables
- Verify `DB_PASSWORD` appears in the list

**Check 2:** Is it set for Production?
- Click on `DB_PASSWORD` in the list
- Verify "Production" is checked

**Check 3:** Is the value non-empty?
- Make sure you entered an actual password (not blank)
- Even a single character is OK

**Check 4:** Did you redeploy?
- Environment variables only apply after redeploy
- Go to Deployments → Latest → Redeploy

**Check 5:** Wait a few minutes
- Sometimes takes time to propagate
- Check again after 2-3 minutes

---

## 📋 Quick Checklist

Before asking for help:

- [ ] All 6 environment variables are added
- [ ] `DB_PASSWORD` is in the list
- [ ] `DB_PASSWORD` value is **non-empty** (not blank)
- [ ] All variables are set for **Production** environment
- [ ] **Redeployed** after adding variables
- [ ] Checked diagnostic endpoint (`/api/diagnose`)
- [ ] Health endpoint shows database connected

---

## 🎯 Summary

1. **Get your database password** from your database provider or `.env` file
2. **Add `DB_PASSWORD` in Vercel** → Settings → Environment Variables
3. **Set value** to your actual password (non-empty)
4. **Set for Production** environment
5. **Redeploy** → Deployments → Latest → Redeploy
6. **Test** → Visit `/api/diagnose` to verify

**That's it!** After redeploying, the error should be gone! 🎉

---

## 🆘 Need Help Finding Your Password?

### If Using PlanetScale:
1. Go to PlanetScale Dashboard
2. Select your database
3. Click "Connect"
4. Password is shown in connection string

### If Using AWS RDS:
1. Go to AWS RDS Console
2. Select your database
3. Check "Connectivity & security" tab
4. Password is the one you set when creating the database

### If Using Railway:
1. Go to Railway Dashboard
2. Select your database service
3. Go to "Variables" tab
4. Look for `MYSQLPASSWORD`

### If You Don't Have a Password:
- You need to create one in your database provider
- Or reset the existing password
- Check your database provider's documentation

---

**Remember: I cannot access your Vercel account. You must add the environment variables manually following the steps above!**

