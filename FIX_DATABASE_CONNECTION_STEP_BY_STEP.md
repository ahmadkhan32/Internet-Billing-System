# 🔧 Fix Database Connection Error - Step by Step

## ❌ **Current Error**

```
Database connection failed. Please check your database configuration.

Troubleshooting:
1. Verify database credentials are correct in Vercel environment variables
2. Check database is accessible from internet (not private network)
3. For Supabase: Verify project is active (not paused) and credentials are correct
4. Check database firewall allows connections from 0.0.0.0/0
5. Verify database is running and not paused
```

---

## ✅ **Step-by-Step Fix**

### **Step 1: Check Supabase Project Status** ⚠️ **MOST COMMON ISSUE**

**Supabase free tier projects auto-pause after inactivity!**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Check status**:
   - ✅ **Active** → Project is running (go to Step 2)
   - ❌ **Paused** → Click **"Restore"** or **"Resume"** button
   - ⏸️ **Inactive** → Click **"Restore Project"**

**After restoring**, wait 1-2 minutes for the database to start, then try login again.

---

### **Step 2: Verify Environment Variables in Vercel**

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Verify these variables are set**:

```
✅ DB_DIALECT=postgres
✅ DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
✅ DB_PORT=5432
✅ DB_USER=postgres
✅ DB_PASSWORD=3oqj6vL2Tr5BZLaf
✅ DB_NAME=postgres
✅ DB_SSL=true
✅ DB_SSL_REJECT_UNAUTHORIZED=false
✅ JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
```

**Important**:
- ✅ All variables must be set for **Production** environment
- ✅ Check for typos (especially in `DB_HOST` and `DB_PASSWORD`)
- ✅ No extra spaces before/after values

---

### **Step 3: Get Fresh Supabase Credentials** (If Step 2 fails)

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Settings** → **Database**
4. **Connection string** section:
   - **Host**: Copy the hostname (e.g., `db.xxxxx.supabase.co`)
   - **Port**: `5432` (or `6543` for connection pooling)
   - **Database**: Usually `postgres`
   - **User**: Usually `postgres`
   - **Password**: Click **"Reset database password"** if you don't have it
   - **Connection pooling**: Use port `6543` for better performance

5. **Update in Vercel**:
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Update `DB_HOST`, `DB_PASSWORD` with fresh values
   - **Redeploy** after updating

---

### **Step 4: Test Database Connection**

**Option A: Use Supabase Dashboard**

1. **Go to**: Supabase Dashboard → Your Project
2. **SQL Editor** → **New Query**
3. **Run**: `SELECT 1;`
4. **If it works**: Database is accessible ✅
5. **If it fails**: Database is paused or credentials are wrong ❌

**Option B: Use Backend Health Endpoint**

After deploying, visit:
```
https://your-backend.vercel.app/api/health
```

**Expected response**:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

**If you see**:
```json
{
  "status": "ERROR",
  "message": "Server is running but database connection failed",
  "database": "disconnected"
}
```

Then the connection is still failing - continue to Step 5.

---

### **Step 5: Check Supabase Network Settings**

1. **Go to**: Supabase Dashboard → Your Project
2. **Settings** → **Database**
3. **Connection pooling**: 
   - ✅ Should be **enabled**
   - Use port **6543** for connection pooling (better for Vercel)
4. **Network restrictions**:
   - ✅ Should allow connections from **0.0.0.0/0** (all IPs)
   - ❌ If restricted to specific IPs, Vercel won't work (Vercel uses dynamic IPs)

**To fix**:
- Go to **Settings** → **Database** → **Connection pooling**
- Ensure **"Allow connections from anywhere"** is enabled

---

### **Step 6: Try Connection Pooling Port**

**Connection pooling is better for serverless (Vercel):**

1. **In Vercel**, update environment variable:
   ```
   DB_PORT=6543
   ```
   (Instead of `5432`)

2. **Redeploy** your project

3. **Test again**

**Why?**:
- Port `6543` = Connection pooling (better for serverless)
- Port `5432` = Direct connection (can timeout on serverless)

---

### **Step 7: Verify SSL Settings**

**Supabase requires SSL connections:**

In Vercel, ensure:
```
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

**If SSL errors occur**:
- ✅ `DB_SSL=true` is correct
- ✅ `DB_SSL_REJECT_UNAUTHORIZED=false` is correct for Supabase
- ❌ Don't set `DB_SSL=false` (Supabase requires SSL)

---

### **Step 8: Check Vercel Deployment Logs**

1. **Go to**: Vercel Dashboard → Your Project
2. **Deployments** → **Latest Deployment**
3. **View Function Logs** → **api/index.js**
4. **Look for**:
   - ✅ `✅ PostgreSQL connection established successfully.`
   - ❌ `❌ Unable to connect to PostgreSQL database:`
   - ❌ `ENOTFOUND` → Supabase project is paused
   - ❌ `ECONNREFUSED` → Firewall blocking
   - ❌ `password authentication failed` → Wrong password

---

### **Step 9: Redeploy After Changes**

**After updating environment variables:**

1. **Go to**: Vercel Dashboard → Your Project
2. **Deployments** → **Latest Deployment**
3. **Click** **"Redeploy"**
4. **Wait** 2-3 minutes for deployment
5. **Test login** again

---

## 🎯 **Quick Checklist**

Before testing, verify:

- [ ] Supabase project is **active** (not paused)
- [ ] All environment variables are set in **Vercel** (Production)
- [ ] `DB_HOST` is correct (e.g., `db.xxxxx.supabase.co`)
- [ ] `DB_PASSWORD` is correct (no typos)
- [ ] `DB_SSL=true` and `DB_SSL_REJECT_UNAUTHORIZED=false`
- [ ] Using port `6543` for connection pooling (recommended)
- [ ] Redeployed after updating environment variables
- [ ] Checked Vercel function logs for specific error

---

## 🔍 **Common Error Messages & Fixes**

### **Error: `getaddrinfo ENOTFOUND db.xxx.supabase.co`**

**Cause**: Supabase project is **paused**

**Fix**:
1. Go to Supabase Dashboard
2. Click **"Restore Project"**
3. Wait 1-2 minutes
4. Try again

---

### **Error: `password authentication failed`**

**Cause**: Wrong `DB_PASSWORD`

**Fix**:
1. Go to Supabase Dashboard → Settings → Database
2. Click **"Reset database password"**
3. Copy new password
4. Update `DB_PASSWORD` in Vercel
5. Redeploy

---

### **Error: `ECONNREFUSED` or `timeout`**

**Cause**: Firewall blocking or wrong port

**Fix**:
1. Use port `6543` (connection pooling) instead of `5432`
2. Check Supabase network settings allow `0.0.0.0/0`
3. Verify `DB_HOST` is correct

---

### **Error: `SSL connection required`**

**Cause**: SSL not enabled

**Fix**:
1. Set `DB_SSL=true` in Vercel
2. Set `DB_SSL_REJECT_UNAUTHORIZED=false` in Vercel
3. Redeploy

---

## ✅ **Expected Result After Fix**

**When connection is fixed:**

1. **Health endpoint** (`/api/health`):
   ```json
   {
     "status": "OK",
     "database": "connected"
   }
   ```

2. **Login works**:
   - ✅ No database error
   - ✅ Login successful
   - ✅ Redirects to dashboard

3. **Vercel logs show**:
   ```
   ✅ PostgreSQL connection established successfully.
   ```

---

## 🚀 **Quick Fix Summary**

**Most common issue**: Supabase project is paused

**Quick fix**:
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click your project
3. Click **"Restore"** or **"Resume"**
4. Wait 1-2 minutes
5. Try login again

**If still failing**:
1. Check environment variables in Vercel
2. Use port `6543` for connection pooling
3. Verify `DB_PASSWORD` is correct
4. Redeploy after changes

---

## 📞 **Still Having Issues?**

**Check these in order**:

1. ✅ Supabase project is active (not paused)
2. ✅ Environment variables are set correctly in Vercel
3. ✅ Using connection pooling port `6543`
4. ✅ SSL settings are correct
5. ✅ Checked Vercel function logs for specific error
6. ✅ Redeployed after updating variables

**The error message you're seeing means the error handling is working correctly - now we just need to fix the actual database connection!** 🔧

