# 🔧 Fix Database Connection - Step-by-Step Manual Guide

## ❌ Your Error
```
Database connection failed. Please check your database configuration and ensure database is accessible from Vercel.
```

## ✅ FIX IT IN 5 STEPS

---

## STEP 1: Check Environment Variables in Vercel

### 1.1 Go to Vercel Dashboard
1. Open: **https://vercel.com**
2. **Sign in** to your account
3. Click on **your project** (Internet-Billing-System)

### 1.2 Open Environment Variables
1. Click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)

### 1.3 Verify These 4 Variables Exist

Check if you have these **4 variables**:

- ✅ `DB_HOST`
- ✅ `DB_USER`
- ✅ `DB_PASSWORD`
- ✅ `DB_NAME`

**If ANY are missing → Go to STEP 2**

**If ALL exist → Go to STEP 3**

---

## STEP 2: Add Missing Environment Variables

### 2.1 Add Each Missing Variable

For **EACH** missing variable:

1. Click **"Add New"** button
2. Enter the **Key** (variable name)
3. Enter the **Value** (your actual value)
4. Check these boxes:
   - ✅ **Production**
   - ✅ **Preview**
5. Click **"Save"**

### 2.2 What Values to Use?

**DB_HOST:**
- PlanetScale: `aws.connect.psdb.cloud`
- AWS RDS: `your-db.xxxxx.us-east-1.rds.amazonaws.com`
- Railway: `containers-us-west-xxx.railway.app`
- Your server: `your-server-ip-or-domain.com`

**DB_USER:**
- Your database username (e.g., `root`, `admin`)

**DB_PASSWORD:**
- Your database password (must be non-empty)

**DB_NAME:**
- Your database name (e.g., `billing_db`, `internet_billing_db`)

### 2.3 After Adding Variables

**⚠️ IMPORTANT:** You MUST redeploy!

1. Go to **"Deployments"** tab
2. Find the **latest deployment**
3. Click **"..."** (three dots)
4. Click **"Redeploy"**
5. Wait 2-5 minutes

---

## STEP 3: Fix Database Firewall (MOST COMMON ISSUE)

**This is the #1 cause of connection failures!**

Your database is **blocking connections from Vercel**. You need to allow connections from anywhere.

### 3.1 Find Your Database Provider

Check your `DB_HOST` value to identify your provider:

- Contains `.psdb.cloud` → **PlanetScale**
- Contains `.rds.amazonaws.com` → **AWS RDS**
- Contains `.railway.app` → **Railway**
- Contains `.digitalocean.com` → **DigitalOcean**
- Other → **Custom/Other Provider**

---

## STEP 4: Configure Firewall Based on Provider

### 4.1 If Using PlanetScale

1. Go to: **https://app.planetscale.com**
2. Sign in
3. Click on **your database**
4. Click **"Settings"** (left sidebar)
5. Click **"Connectivity"** tab
6. Find **"Allow connections from"**
7. Select **"Anywhere"** or enable **"Allow connections from anywhere"**
8. **Save**

**That's it!** Vercel can now connect.

---

### 4.2 If Using AWS RDS

1. Go to: **https://console.aws.amazon.com/rds**
2. Sign in to AWS
3. Click **"Databases"** (left sidebar)
4. Click on **your database instance**
5. Scroll down to **"Connectivity & security"** tab
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

---

### 4.3 If Using Railway

1. Go to: **https://railway.app**
2. Sign in
3. Click on **your project**
4. Click on **your database service**
5. Click **"Settings"** tab
6. Find **"Public Networking"**
7. **Enable** it (toggle ON)
8. **Save**

**That's it!** Vercel can now connect.

---

### 4.4 If Using DigitalOcean

1. Go to: **https://cloud.digitalocean.com**
2. Sign in
3. Click **"Databases"** (left sidebar)
4. Click on **your database**
5. Click **"Settings"** tab
6. Scroll to **"Trusted Sources"**
7. Click **"Add trusted source"**
8. Enter: `0.0.0.0/0`
9. Click **"Add"**

**That's it!** Vercel can now connect.

---

### 4.5 If Using Other Provider

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

## STEP 5: Verify Database Credentials

### 5.1 Test Connection Locally (Optional but Recommended)

**If you have MySQL client installed:**

```bash
mysql -h YOUR_DB_HOST -u YOUR_DB_USER -p YOUR_DB_NAME
```

**Replace:**
- `YOUR_DB_HOST` with your actual DB_HOST value
- `YOUR_DB_USER` with your actual DB_USER value
- `YOUR_DB_NAME` with your actual DB_NAME value

**If connection works:**
- ✅ Credentials are correct
- Issue is firewall (see Step 4)

**If connection fails:**
- ❌ Credentials might be wrong
- Check your database provider dashboard for correct values

### 5.2 Verify in Vercel

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. **Double-check:**
   - No typos in values
   - No extra spaces
   - Values match your database exactly

---

## ✅ VERIFY IT'S FIXED

### Test 1: Health Endpoint

1. Go to: `https://your-app.vercel.app/api/health`
2. Should show: `{"status": "OK", "database": "connected"}`

**If it shows "connected" → ✅ FIXED!**

**If it shows "disconnected" → Continue troubleshooting**

### Test 2: Login

1. Go to: `https://your-app.vercel.app`
2. Try to login:
   - Email: `admin@billing.com`
   - Password: `admin123`
3. Should redirect to dashboard

**If login works → ✅ FIXED!**

**If login fails → Check Vercel logs (see below)**

---

## 🔍 CHECK VERCEL LOGS FOR DETAILS

If still not working:

1. Go to **Vercel Dashboard** → Your Project
2. Click **"Functions"** tab
3. Click on **`api/index.js`**
4. Click **"Logs"** tab
5. Look for error messages

**Common errors you might see:**

- `ECONNREFUSED` → Firewall issue (Step 4)
- `Access denied` → Wrong credentials (Step 5)
- `Unknown database` → Wrong DB_NAME (Step 2)
- `SSL error` → SSL is auto-enabled, check database supports SSL

---

## 📋 QUICK CHECKLIST

Before asking for help, verify:

- [ ] All 4 environment variables are set in Vercel
- [ ] Variables are set for **Production** environment
- [ ] **Redeployed** after adding/changing variables
- [ ] Database firewall allows `0.0.0.0/0` (all IPs)
- [ ] Database credentials are correct
- [ ] Database is running and accessible
- [ ] Checked Vercel function logs for specific errors

---

## 🆘 STILL NOT WORKING?

### Option 1: Check Database Provider Status

- Go to your database provider's status page
- Verify database service is running
- Check for any outages

### Option 2: Test from Different Location

- Try connecting from your local machine
- If local works but Vercel doesn't → Firewall issue (Step 4)
- If local doesn't work → Database/credentials issue (Step 5)

### Option 3: Contact Database Provider Support

- If firewall configuration is unclear
- If database is not accessible
- If you need help with security settings

---

## 🎯 SUMMARY

**The fix is usually one of these:**

1. **Missing environment variables** → Add them in Vercel (Step 2)
2. **Database firewall blocking Vercel** → Allow `0.0.0.0/0` (Step 4) ⚠️ **MOST COMMON**
3. **Wrong credentials** → Fix in Vercel (Step 5)
4. **Not redeployed** → Redeploy after changes (Step 2.3)

**Most likely issue:** Database firewall blocking connections. Fix it in Step 4!

---

## ✅ SUCCESS!

When everything works:
- ✅ Health endpoint shows database connected
- ✅ Login works successfully
- ✅ No errors in Vercel logs
- ✅ App functions normally

**You're done!** 🎉

