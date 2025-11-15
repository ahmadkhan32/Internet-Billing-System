# 🔧 Vercel Environment Variables Setup Guide

## 📋 Required Environment Variables

You **MUST** set these environment variables in Vercel for the application to work:

### 1. Database Configuration (Required)

```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```

**Examples:**
- **Local MySQL:** `DB_HOST=localhost` or `DB_HOST=127.0.0.1`
- **Remote MySQL:** `DB_HOST=your-database-server.com` or `DB_HOST=123.456.789.0`
- **Cloud Database (PlanetScale, AWS RDS, etc.):** Use the provided host URL

### 2. Application Configuration (Required)

```
NODE_ENV=production
JWT_SECRET=your-secret-key-minimum-32-characters-long
```

**JWT_SECRET:**
- Must be at least 32 characters long
- Use a strong, random string
- Example: `JWT_SECRET=my-super-secret-jwt-key-12345678901234567890`

### 3. Frontend URL (Optional but Recommended)

```
FRONTEND_URL=https://your-app.vercel.app
```

**Note:** Replace `your-app.vercel.app` with your actual Vercel deployment URL (you'll get this after first deployment)

---

## 🚀 How to Set Environment Variables in Vercel

### Step 1: Go to Your Project Settings

1. Log in to [Vercel Dashboard](https://vercel.com)
2. Click on your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Each Variable

For each environment variable:

1. Click **"Add New"** button
2. Enter the **Key** (variable name)
3. Enter the **Value** (variable value)
4. Select environments:
   - ✅ **Production** (for live site)
   - ✅ **Preview** (for preview deployments)
   - ✅ **Development** (optional, for local development)
5. Click **"Save"**

### Step 3: Add All Required Variables

Add these variables one by one:

```
Key: NODE_ENV
Value: production
Environments: Production, Preview

Key: DB_HOST
Value: your-database-host
Environments: Production, Preview

Key: DB_USER
Value: your-database-user
Environments: Production, Preview

Key: DB_PASSWORD
Value: your-database-password
Environments: Production, Preview

Key: DB_NAME
Value: your-database-name
Environments: Production, Preview

Key: JWT_SECRET
Value: your-secret-key-minimum-32-characters
Environments: Production, Preview

Key: FRONTEND_URL
Value: https://your-app.vercel.app
Environments: Production, Preview
```

### Step 4: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

---

## 🔍 How to Get Database Credentials

### If Using Local MySQL:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=internet_billing_db
```

### If Using Cloud Database:

#### PlanetScale:
1. Go to your PlanetScale dashboard
2. Click on your database
3. Click "Connect"
4. Copy the connection details:
   ```
   DB_HOST=aws.connect.psdb.cloud
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=your-database-name
   ```

#### AWS RDS:
1. Go to AWS RDS Console
2. Select your database instance
3. Check "Connectivity & security" tab
4. Use:
   ```
   DB_HOST=your-instance.region.rds.amazonaws.com
   DB_USER=admin (or your username)
   DB_PASSWORD=your-password
   DB_NAME=your-database-name
   ```

#### Railway:
1. Go to Railway dashboard
2. Select your MySQL service
3. Go to "Variables" tab
4. Copy the connection details

#### Other Cloud Providers:
Check your database provider's documentation for connection details.

---

## ✅ Verification Checklist

After setting environment variables:

- [ ] All 7 variables are added
- [ ] Variables are set for Production and Preview
- [ ] Database credentials are correct
- [ ] JWT_SECRET is at least 32 characters
- [ ] Deployment has been redeployed after adding variables

---

## 🧪 Test Your Configuration

### 1. Check Health Endpoint

After deployment, test:
```
https://your-app.vercel.app/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

### 2. Test Login

1. Go to: `https://your-app.vercel.app`
2. Try to login with: `admin@billing.com` / `admin123`
3. If it works, configuration is correct!

### 3. Check Vercel Logs

If you get errors:

1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Click on **`api/index.js`**
4. Check the logs for error messages

---

## 🐛 Common Issues

### Issue: "Missing required environment variables"

**Solution:**
- Check that all variables are added in Vercel
- Ensure variables are set for the correct environment (Production/Preview)
- Redeploy after adding variables

### Issue: "Database connection failed"

**Solution:**
- Verify database credentials are correct
- Check that database allows connections from Vercel IPs
- Ensure database is accessible from the internet
- Check firewall rules

### Issue: "Authentication failed"

**Solution:**
- Verify JWT_SECRET is set and is at least 32 characters
- Check that JWT_SECRET is the same across all environments

---

## 📝 Quick Reference

**Minimum Required Variables:**
```
NODE_ENV=production
DB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-database
JWT_SECRET=your-32-char-secret
```

**Optional but Recommended:**
```
FRONTEND_URL=https://your-app.vercel.app
```

---

## 🆘 Still Having Issues?

1. **Check Vercel Function Logs** - Most important!
2. **Verify all variables are set** - Double-check spelling
3. **Test database connection** - Use a MySQL client to verify credentials
4. **Redeploy after changes** - Always redeploy after adding/changing variables

---

**Last Updated:** After fixing serverless initialization
**Status:** ✅ Ready for configuration

