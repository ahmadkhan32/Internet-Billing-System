# 🚨 URGENT: Set Environment Variables in Vercel

## ❌ Current Error
```
Missing environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
connect ECONNREFUSED 127.0.0.1:3306
```

**This means:** Environment variables are NOT set in Vercel, so it's trying to connect to localhost (which doesn't work in serverless).

## ✅ FIX: Set Environment Variables (5 Minutes)

### Step 1: Go to Vercel Dashboard

1. Visit: **https://vercel.com**
2. **Sign in** to your account
3. **Click on your project** (Internet-Billing-System)

### Step 2: Open Environment Variables Settings

1. Click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)

### Step 3: Add Each Variable

**You need to add 4 variables. Do this for EACH one:**

#### Variable 1: DB_HOST

1. Click **"Add New"** button
2. **Key:** `DB_HOST`
3. **Value:** `your-database-host` (replace with your actual database host)
   - Examples:
     - PlanetScale: `aws.connect.psdb.cloud`
     - AWS RDS: `your-db.xxxxx.us-east-1.rds.amazonaws.com`
     - Railway: `containers-us-west-xxx.railway.app`
     - Your own server: `your-server-ip-or-domain.com`
4. **Environments:** 
   - ✅ Check **Production**
   - ✅ Check **Preview**
   - ✅ Check **Development** (optional)
5. Click **"Save"**

#### Variable 2: DB_USER

1. Click **"Add New"** button
2. **Key:** `DB_USER`
3. **Value:** `your-database-username`
   - Examples: `root`, `admin`, `doadmin`
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 3: DB_PASSWORD

1. Click **"Add New"** button
2. **Key:** `DB_PASSWORD`
3. **Value:** `your-database-password`
   - **Important:** Copy the exact password from your database
   - No spaces, no quotes
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 4: DB_NAME

1. Click **"Add New"** button
2. **Key:** `DB_NAME`
3. **Value:** `your-database-name`
   - Examples: `billing_db`, `internet_billing_db`, `defaultdb`
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 5: JWT_SECRET (Also Required!)

1. Click **"Add New"** button
2. **Key:** `JWT_SECRET`
3. **Value:** Generate a random 32+ character string
   - You can use: `openssl rand -base64 32`
   - Or any random string like: `my-secret-key-2024-production-xyz123456789`
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 6: NODE_ENV (Optional but Recommended)

1. Click **"Add New"** button
2. **Key:** `NODE_ENV`
3. **Value:** `production`
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

### Step 4: Verify All Variables Are Added

You should see **6 variables** in the list:

- ✅ `DB_HOST`
- ✅ `DB_USER`
- ✅ `DB_PASSWORD`
- ✅ `DB_NAME`
- ✅ `JWT_SECRET`
- ✅ `NODE_ENV`

### Step 5: Redeploy (CRITICAL!)

**⚠️ IMPORTANT:** Environment variables only apply to NEW deployments!

1. Go to **"Deployments"** tab
2. Find the **latest deployment**
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Wait for deployment to complete (2-5 minutes)

### Step 6: Verify It Works

1. **Check Health Endpoint:**
   ```
   https://your-app.vercel.app/api/health
   ```
   Should return: `{"status": "OK", "database": "connected"}`

2. **Test Login:**
   - Go to: `https://your-app.vercel.app`
   - Email: `admin@billing.com`
   - Password: `admin123`
   - Should work! ✅

## 📸 Visual Guide

### Vercel Dashboard Navigation:
```
Vercel Dashboard
  └── Your Project
      └── Settings
          └── Environment Variables
              └── [Add New Button]
```

### Adding a Variable:
```
┌─────────────────────────────────────┐
│ Key: DB_HOST                       │
│                                     │
│ Value: aws.connect.psdb.cloud      │
│                                     │
│ Environments:                       │
│ ☑ Production                        │
│ ☑ Preview                           │
│ ☐ Development                       │
│                                     │
│ [Save] [Cancel]                    │
└─────────────────────────────────────┘
```

## 🔍 Where to Find Your Database Credentials

### If Using PlanetScale:
1. Go to PlanetScale Dashboard
2. Select your database
3. Click "Connect"
4. Copy:
   - **Host:** `aws.connect.psdb.cloud`
   - **Username:** (shown in connection string)
   - **Password:** (shown in connection string)
   - **Database:** (database name)

### If Using AWS RDS:
1. Go to AWS RDS Console
2. Select your database instance
3. Check "Connectivity & security" tab
4. Copy:
   - **Host:** Endpoint URL
   - **Username:** Master username
   - **Password:** (you set this when creating)
   - **Database:** Default database name

### If Using Railway:
1. Go to Railway Dashboard
2. Select your database service
3. Go to "Variables" tab
4. Copy:
   - **Host:** `MYSQLHOST` value
   - **Username:** `MYSQLUSER` value
   - **Password:** `MYSQLPASSWORD` value
   - **Database:** `MYSQLDATABASE` value

### If Using Your Own Server:
- **Host:** Your server IP or domain
- **Username:** MySQL username
- **Password:** MySQL password
- **Database:** Database name you created

## ⚠️ Common Mistakes

1. **Forgetting to Redeploy**
   - Variables only apply after redeploy!
   - Always redeploy after adding variables

2. **Wrong Environment Selected**
   - Make sure to check **Production** and **Preview**
   - Variables set only for Development won't work in production

3. **Typos in Variable Names**
   - Must be exactly: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Case-sensitive!

4. **Extra Spaces**
   - No spaces around `=` sign
   - No leading/trailing spaces in values

5. **Using localhost**
   - `127.0.0.1` or `localhost` won't work in Vercel
   - Must use your actual database host

## ✅ Verification Checklist

After setting variables:

- [ ] All 6 variables are added
- [ ] Variables are set for Production environment
- [ ] Values are correct (no typos)
- [ ] Redeployed after adding variables
- [ ] Health endpoint shows database connected
- [ ] Login works successfully

## 🆘 Still Getting Errors?

### Error: "Missing environment variables"

**Check:**
1. Are all 4 database variables added?
2. Are they set for Production environment?
3. Did you redeploy after adding?

### Error: "ECONNREFUSED 127.0.0.1:3306"

**This means:** DB_HOST is not set or is set to localhost

**Fix:**
1. Check DB_HOST variable exists
2. Verify it's set to your actual database host (not localhost)
3. Redeploy

### Error: "Access denied for user"

**This means:** Wrong username or password

**Fix:**
1. Verify DB_USER is correct
2. Verify DB_PASSWORD is correct (no extra spaces)
3. Test connection from your local machine first

---

## 🎯 Quick Summary

1. **Go to:** Vercel → Your Project → Settings → Environment Variables
2. **Add:** DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, NODE_ENV
3. **Set for:** Production and Preview
4. **Redeploy:** Deployments → Latest → Redeploy
5. **Test:** Health endpoint and login

**That's it!** After setting variables and redeploying, your app should work! 🚀

