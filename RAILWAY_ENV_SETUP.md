# 🚂 Railway Environment Variables Setup

## ❌ Current Error
**"Missing required environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME"**

The app is crashing because environment variables are not set in Railway.

---

## ✅ FIX: Set Environment Variables in Railway

### Step 1: Go to Railway Dashboard

1. Go to: https://railway.app
2. Login to your account
3. Select your project: **Internet-Billing-System**

### Step 2: Add Environment Variables

**Click on your service → "Variables" tab**

**Add these 8 variables:**

1. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`
   - Click "Add"

2. **DB_HOST**
   - Key: `DB_HOST`
   - Value: Your database host
   - Examples:
     - Railway MySQL: `containers-us-west-xxx.railway.app` (from Railway database)
     - Cloud: `aws.connect.psdb.cloud` (PlanetScale)
     - ngrok: `0.tcp.ngrok.io` (from ngrok)
   - Click "Add"

3. **DB_PORT** (if not default 3306)
   - Key: `DB_PORT`
   - Value: `3306` (or your port)
   - Click "Add"

4. **DB_USER**
   - Key: `DB_USER`
   - Value: Your database username
   - Example: `root` or from Railway database
   - Click "Add"

5. **DB_PASSWORD** ⚠️ CRITICAL
   - Key: `DB_PASSWORD`
   - Value: Your database password
   - **MUST be non-empty!**
   - Click "Add"

6. **DB_NAME**
   - Key: `DB_NAME`
   - Value: `internet_billing_db` (or your database name)
   - Click "Add"

7. **DB_SSL** (if using ngrok)
   - Key: `DB_SSL`
   - Value: `false` (for ngrok only)
   - Leave default for cloud databases
   - Click "Add"

8. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: Random 32+ character string
   - Example: `my-super-secret-jwt-key-2024-production-xyz123456789`
   - Click "Add"

---

## 🗄️ Option: Use Railway MySQL Database

**Railway provides MySQL databases:**

1. In Railway project, click **"+ New"**
2. Select **"Database"** → **"MySQL"**
3. Railway will create a MySQL database
4. Railway will automatically set these variables:
   - `MYSQL_HOST` → Use as `DB_HOST`
   - `MYSQL_USER` → Use as `DB_USER`
   - `MYSQLPASSWORD` → Use as `DB_PASSWORD`
   - `MYSQL_DATABASE` → Use as `DB_NAME`
   - `MYSQL_PORT` → Use as `DB_PORT`

**To use Railway database variables:**
- Railway creates variables like `MYSQL_HOST`, `MYSQL_USER`, etc.
- You need to map them to your app's expected names:
  - `DB_HOST` = `${{MySQL.MYSQL_HOST}}`
  - `DB_USER` = `${{MySQL.MYSQL_USER}}`
  - `DB_PASSWORD` = `${{MySQL.MYSQLPASSWORD}}`
  - `DB_NAME` = `${{MySQL.MYSQL_DATABASE}}`
  - `DB_PORT` = `${{MySQL.MYSQL_PORT}}`

**Or set them manually:**
- Copy values from Railway database service
- Set them as `DB_HOST`, `DB_USER`, etc.

---

## 🔄 Redeploy After Setting Variables

**After adding environment variables:**

1. Railway will **automatically redeploy** when you add variables
2. **OR** manually redeploy:
   - Click "Deployments"
   - Click "..." on latest deployment
   - Select "Redeploy"

**Wait 2-5 minutes for deployment**

---

## ✅ Verify Deployment

### Step 1: Check Logs
- Railway → Your Service → Logs
- Should show: "Server running on port XXXX" ✅
- No more "Missing environment variables" errors ✅

### Step 2: Test API
Visit: `https://your-app.railway.app/api/health`

Should show:
```json
{
  "status": "OK",
  "database": "connected"
}
```

### Step 3: Test Frontend
Visit: `https://your-app.railway.app`

Should show:
- Login page ✅
- Can login: `admin@billing.com` / `admin123` ✅

---

## 🔍 Troubleshooting

### Still Getting "Missing environment variables"?

**Check:**
1. Variables are set in Railway (not just in code)
2. Variable names are correct (case-sensitive)
3. Values are not empty
4. Redeployed after adding variables

### Database Connection Fails?

**Check:**
1. All database variables are set
2. Database credentials are correct
3. Database is accessible from Railway
4. Visit `/api/diagnose` for detailed error info

### App Still Crashing?

**Check Railway logs:**
1. Railway → Your Service → Logs
2. Look for specific error messages
3. Check if variables are being read correctly

---

## 📋 Quick Checklist

- [ ] `NODE_ENV` = `production`
- [ ] `DB_HOST` = Database host
- [ ] `DB_USER` = Database username
- [ ] `DB_PASSWORD` = Database password (non-empty)
- [ ] `DB_NAME` = Database name
- [ ] `DB_PORT` = `3306` (if not default)
- [ ] `JWT_SECRET` = Random 32+ char string
- [ ] `DB_SSL` = `false` (if using ngrok)
- [ ] Redeployed after setting variables

---

## 🎯 Summary

**To fix the crash:**
1. ✅ Go to Railway → Your Project → Variables
2. ✅ Add all 8 environment variables
3. ✅ Redeploy (automatic or manual)
4. ✅ Test deployment

**Your app will start successfully after setting variables! 🚂**

