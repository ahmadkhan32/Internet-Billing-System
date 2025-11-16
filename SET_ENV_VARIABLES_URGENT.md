# 🚨 URGENT: Set Environment Variables NOW

## ❌ Current Error
```
Missing required environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
```

**This is the ONLY issue preventing your app from working!**

## ✅ FIX: Set Environment Variables (5 Minutes)

### Step 1: Go to Vercel Dashboard

1. **Visit:** https://vercel.com
2. **Sign in** to your account
3. **Click on your project** (Internet-Billing-System)

### Step 2: Open Environment Variables

1. Click **"Settings"** (top menu bar)
2. Click **"Environment Variables"** (left sidebar, under Configuration)

### Step 3: Add Each Variable (One by One)

**⚠️ IMPORTANT:** You must add ALL 6 variables. Do this for EACH one:

#### Variable 1: NODE_ENV
1. Click **"Add New"** button
2. **Key:** `NODE_ENV`
3. **Value:** `production`
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 2: DB_HOST
1. Click **"Add New"** button
2. **Key:** `DB_HOST`
3. **Value:** `your-actual-database-host`
   - **Examples:**
     - PlanetScale: `aws.connect.psdb.cloud`
     - AWS RDS: `your-db.xxxxx.us-east-1.rds.amazonaws.com`
     - Railway: `containers-us-west-xxx.railway.app`
     - Your server: `your-server-ip-or-domain.com`
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 3: DB_USER
1. Click **"Add New"** button
2. **Key:** `DB_USER`
3. **Value:** `your-database-username`
   - Examples: `root`, `admin`, `doadmin`
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 4: DB_PASSWORD
1. Click **"Add New"** button
2. **Key:** `DB_PASSWORD`
3. **Value:** `your-database-password`
   - **Important:** Copy the exact password from your database
   - No spaces, no quotes
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 5: DB_NAME
1. Click **"Add New"** button
2. **Key:** `DB_NAME`
3. **Value:** `your-database-name`
   - Examples: `billing_db`, `internet_billing_db`, `defaultdb`
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

#### Variable 6: JWT_SECRET
1. Click **"Add New"** button
2. **Key:** `JWT_SECRET`
3. **Value:** Generate a random 32+ character string
   - You can use: `openssl rand -base64 32`
   - Or any random string like: `my-secret-key-2024-production-xyz123456789`
   - **Must be at least 32 characters!**
4. **Environments:**
   - ✅ Check **Production**
   - ✅ Check **Preview**
5. Click **"Save"**

### Step 4: Verify All Variables Are Added

You should see **6 variables** in the list:

- ✅ `NODE_ENV`
- ✅ `DB_HOST`
- ✅ `DB_USER`
- ✅ `DB_PASSWORD`
- ✅ `DB_NAME`
- ✅ `JWT_SECRET`

### Step 5: Redeploy (CRITICAL!)

**⚠️ VERY IMPORTANT:** Environment variables only apply to NEW deployments!

1. Go to **"Deployments"** tab
2. Find the **latest deployment**
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Wait for deployment to complete (2-5 minutes)

### Step 6: Test

1. **Health Check:**
   ```
   https://your-app.vercel.app/api/health
   ```
   Should return: `{"status": "OK", "database": "connected"}`

2. **Login:**
   - Go to: `https://your-app.vercel.app`
   - Email: `admin@billing.com`
   - Password: `admin123`
   - Should work! ✅

## 📸 Visual Guide

### Navigation Path:
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
│ Key: DB_HOST                        │
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
3. Click **"Connect"**
4. Copy:
   - **Host:** `aws.connect.psdb.cloud`
   - **Username:** (shown in connection string)
   - **Password:** (shown in connection string)
   - **Database:** (database name)

### If Using AWS RDS:
1. Go to AWS RDS Console
2. Select your database instance
3. Check **"Connectivity & security"** tab
4. Copy:
   - **Host:** Endpoint URL
   - **Username:** Master username
   - **Password:** (you set this when creating)
   - **Database:** Default database name

### If Using Railway:
1. Go to Railway Dashboard
2. Select your database service
3. Go to **"Variables"** tab
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
   - Must be exactly: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`
   - Case-sensitive!

4. **Extra Spaces**
   - No spaces around `=` sign
   - No leading/trailing spaces in values

5. **Using localhost**
   - `127.0.0.1` or `localhost` won't work in Vercel
   - Must use your actual database host

## ✅ After Setting Variables

1. ✅ All 6 variables are added
2. ✅ Variables are set for Production environment
3. ✅ **Redeployed** (most important!)
4. ✅ Health endpoint shows database connected
5. ✅ Login works successfully
6. ✅ Redirects to dashboard

## 🆘 Still Getting Errors?

### Check Vercel Function Logs:
1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Click on `api/index.js`
4. Check **Logs** for detailed error messages

### Verify Variables:
1. Go to Settings → Environment Variables
2. Make sure all 6 variables are listed
3. Check they're set for Production
4. Verify values are correct (no typos)

### Test Database Connection:
1. Try connecting from your local machine:
   ```bash
   mysql -h your-host -u your-user -p your-database
   ```
2. If this works but Vercel doesn't:
   - Database firewall issue
   - Check database allows connections from anywhere (0.0.0.0/0)

---

## 🎯 Quick Summary

1. **Go to:** Vercel → Your Project → Settings → Environment Variables
2. **Add:** NODE_ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
3. **Set for:** Production and Preview
4. **Redeploy:** Deployments → Latest → Redeploy
5. **Test:** Health endpoint and login

**That's it!** After setting variables and redeploying, your app will work! 🚀

---

**The error messages are telling you exactly what to do - just set the environment variables!**

