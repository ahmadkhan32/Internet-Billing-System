# 🚨 URGENT: Set Environment Variables in Vercel

## ❌ Current Error
```
Missing environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
connect ECONNREFUSED 127.0.0.1:3306
```

**This means:** Environment variables are NOT set in Vercel, so it's trying to connect to localhost (which doesn't exist on Vercel).

## ✅ IMMEDIATE FIX - 5 Minutes

### Step 1: Go to Vercel Dashboard
1. Visit: **https://vercel.com**
2. **Sign in** to your account
3. **Click on your project** (Internet Billing System)

### Step 2: Open Environment Variables
1. Click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)
3. You should see a list of variables (or empty if none set)

### Step 3: Add These 4 REQUIRED Variables

**Click "Add New" for EACH variable below:**

#### Variable 1: DB_HOST
```
Key: DB_HOST
Value: your-database-host-here
Environments: ✅ Production, ✅ Preview
```
**Example values:**
- PlanetScale: `aws.connect.psdb.cloud`
- AWS RDS: `your-db.xxxxx.us-east-1.rds.amazonaws.com`
- Railway: `containers-us-west-xxx.railway.app`
- DigitalOcean: `your-db-do-user-xxx.db.ondigitalocean.com`

#### Variable 2: DB_USER
```
Key: DB_USER
Value: your-database-username
Environments: ✅ Production, ✅ Preview
```
**Example values:**
- `root`
- `admin`
- `doadmin` (DigitalOcean)

#### Variable 3: DB_PASSWORD
```
Key: DB_PASSWORD
Value: your-database-password
Environments: ✅ Production, ✅ Preview
```
**Important:** 
- Use your actual database password
- No quotes, no spaces
- Copy exactly as it appears

#### Variable 4: DB_NAME
```
Key: DB_NAME
Value: your-database-name
Environments: ✅ Production, ✅ Preview
```
**Example values:**
- `billing_db`
- `internet_billing_db`
- `defaultdb` (DigitalOcean)
- `railway` (Railway)

### Step 4: Also Add These 2 Variables

#### Variable 5: NODE_ENV
```
Key: NODE_ENV
Value: production
Environments: ✅ Production, ✅ Preview
```

#### Variable 6: JWT_SECRET
```
Key: JWT_SECRET
Value: your-random-32-character-string
Environments: ✅ Production, ✅ Preview
```
**Generate one:**
- Use: `openssl rand -base64 32`
- Or any random 32+ character string
- Example: `my-super-secret-jwt-key-2024-production-xyz123`

### Step 5: Save and Redeploy

**After adding ALL 6 variables:**

1. **Verify all variables are saved:**
   - You should see 6 variables in the list
   - Each should have ✅ Production and ✅ Preview checked

2. **Redeploy:**
   - Go to **"Deployments"** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - **Wait 2-5 minutes** for deployment

3. **Test:**
   - Go to: `https://your-app.vercel.app/api/health`
   - Should return: `{"status": "OK", "database": "connected"}`

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
│ Key: DB_HOST                        │
│ Value: [your-database-host]         │
│                                     │
│ Environments:                       │
│ ☑ Production                        │
│ ☑ Preview                           │
│ ☐ Development                       │
│                                     │
│ [Save] [Cancel]                    │
└─────────────────────────────────────┘
```

## 🔍 How to Find Your Database Credentials

### If Using PlanetScale:
1. Go to PlanetScale Dashboard
2. Select your database
3. Click "Connect"
4. Copy:
   - Host: `aws.connect.psdb.cloud`
   - Username: (shown in connection string)
   - Password: (shown in connection string)
   - Database: (your database name)

### If Using AWS RDS:
1. Go to AWS RDS Console
2. Select your database instance
3. Check "Connectivity & security" tab
4. Copy:
   - Host: Endpoint URL
   - Username: Master username
   - Password: (the one you set)
   - Database: (default or custom name)

### If Using Railway:
1. Go to Railway Dashboard
2. Select your database service
3. Click "Connect" tab
4. Copy credentials from connection string

### If Using DigitalOcean:
1. Go to DigitalOcean Dashboard
2. Select your database
3. Go to "Connection Details"
4. Copy:
   - Host: Host field
   - Username: User field
   - Password: (the one you set)
   - Database: Database field

## ⚠️ Common Mistakes

1. **Using localhost:**
   - ❌ `DB_HOST=localhost` (won't work on Vercel)
   - ✅ Use your actual database host URL

2. **Wrong environment:**
   - ❌ Only set for Development
   - ✅ Must set for Production AND Preview

3. **Typos:**
   - ❌ `DB_HOS` (missing T)
   - ✅ `DB_HOST` (correct)

4. **Spaces in values:**
   - ❌ `DB_HOST = your-host` (has spaces)
   - ✅ `DB_HOST=your-host` (no spaces)

5. **Quotes in values:**
   - ❌ `DB_PASSWORD="mypassword"` (has quotes)
   - ✅ `DB_PASSWORD=mypassword` (no quotes)

## ✅ Verification Checklist

After setting variables:

- [ ] All 6 variables are added
- [ ] Each variable has Production checked
- [ ] Each variable has Preview checked
- [ ] Values are correct (no typos)
- [ ] No spaces around `=` sign
- [ ] No quotes around values
- [ ] Redeployed after adding variables
- [ ] Health endpoint works
- [ ] Login works

## 🆘 Still Getting Error?

### Check Function Logs:
1. Vercel Dashboard → Functions → `api/index.js` → Logs
2. Look for:
   - `Missing environment variables: ...` (which ones?)
   - Connection details (what host is it trying?)

### Verify Variables Are Set:
1. Go to Settings → Environment Variables
2. Count: Should see 6 variables
3. Check: Each has Production checked
4. Verify: Values are correct

### Test Connection:
Try connecting from your local machine:
```bash
mysql -h your-db-host -u your-user -p your-database
```

If this works but Vercel doesn't:
- Database firewall issue
- Check database allows external connections

---

## 📝 Quick Reference

**Required Variables:**
```
DB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-database
NODE_ENV=production
JWT_SECRET=your-32-char-secret
```

**After Adding:**
1. ✅ Save all variables
2. ✅ Redeploy
3. ✅ Test health endpoint
4. ✅ Test login

---

**This is the #1 cause of database connection errors!**  
**Set the variables and redeploy - it will work!** 🚀

