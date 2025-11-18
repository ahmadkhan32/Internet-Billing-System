# 🔍 Step-by-Step: Verify Database Connection

## ❌ Current Error

```
Database connection failed. Please check your database configuration.
```

---

## ✅ Step 1: Check Supabase Project Status

### Go to Supabase Dashboard:
1. Visit: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Find your project** (look for project ID: `qppdkzzmijjyoihzfdxw`)

### Check Project Status:
- ✅ **Active** → Project is running (go to Step 2)
- ❌ **Paused** → Click "Restore" button and wait 1-2 minutes
- ❌ **Not Found** → Project may have been deleted (create new project)

---

## ✅ Step 2: Get Fresh Database Credentials

### From Supabase Dashboard:
1. **Click** on your project
2. **Settings** → **Database**
3. **Connection string** section → Click "Show connection string"
4. **Copy** the values:

```
Host: db.qppdkzzmijjyoihzfdxw.supabase.co
User: postgres
Password: [Click "Reset database password" if needed]
Database: postgres
Port: 5432
```

**Important**: If you reset the password, you MUST update it in Vercel!

---

## ✅ Step 3: Verify Environment Variables in Vercel

### Go to Vercel Dashboard:
1. Visit: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**

### Check These Variables Exist:

#### Required Variables (8):
```
✅ DB_DIALECT=postgres
✅ DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
✅ DB_PORT=5432
✅ DB_USER=postgres
✅ DB_PASSWORD=3oqj6vL2Tr5BZLaf
✅ DB_NAME=postgres
✅ DB_SSL=true
✅ DB_SSL_REJECT_UNAUTHORIZED=false
```

### Verify Each Variable:
1. **Click** on each variable to view its value
2. **Compare** with values from Supabase Dashboard
3. **Update** if they don't match

### Common Issues:
- ❌ Variable is **missing** → Add it
- ❌ Variable has **wrong value** → Update it
- ❌ Variable has **extra spaces** → Remove spaces
- ❌ Variable has **quotes** → Remove quotes (Vercel adds them automatically)

---

## ✅ Step 4: Test Database Connection

### Option A: Test from Supabase Dashboard
1. **Supabase Dashboard** → Your Project
2. **SQL Editor** → New Query
3. **Run**: `SELECT version();`
4. **Should return**: PostgreSQL version

### Option B: Test from Vercel
1. **Vercel Dashboard** → Your Project → **Deployments**
2. **Click** latest deployment
3. **Functions** tab → Check logs
4. **Look for**: Database connection errors

---

## ✅ Step 5: Redeploy After Changes

### After Updating Environment Variables:
1. **Vercel Dashboard** → Your Project
2. **Deployments** → **Latest Deployment**
3. **Click** "Redeploy" button
4. **Wait** for deployment to complete (2-3 minutes)

**⚠️ IMPORTANT**: Environment variable changes require a redeploy to take effect!

---

## ✅ Step 6: Verify Connection After Redeploy

### Test Health Endpoint:
1. Visit: `https://your-project.vercel.app/api/health`
2. **Should return**:
   ```json
   {
     "status": "ok",
     "database": "connected"
   }
   ```

### Test Diagnostic Endpoint:
1. Visit: `https://your-project.vercel.app/api/diagnose`
2. **Check**:
   - `connectionTest.status` should be `"SUCCESS"`
   - `environmentVariables` should show all variables set
   - `recommendations` should be empty or show info only

---

## 🔍 Troubleshooting Specific Errors

### Error: "ENOTFOUND" or "getaddrinfo"
**Cause**: Supabase project is paused or hostname is wrong
**Fix**:
1. Restore paused project in Supabase Dashboard
2. Verify `DB_HOST` is correct
3. Redeploy

### Error: "password authentication failed"
**Cause**: Wrong password
**Fix**:
1. Reset password in Supabase Dashboard
2. Update `DB_PASSWORD` in Vercel
3. Redeploy

### Error: "SSL required"
**Cause**: SSL not enabled
**Fix**:
1. Set `DB_SSL=true` in Vercel
2. Set `DB_SSL_REJECT_UNAUTHORIZED=false`
3. Redeploy

### Error: "Connection timeout"
**Cause**: Firewall blocking or project paused
**Fix**:
1. Check Supabase project is active
2. Verify firewall allows connections (Supabase allows by default)
3. Try connection pooling port `6543` instead of `5432`

---

## 📋 Complete Checklist

### Supabase:
- [ ] Project is active (not paused)
- [ ] Database credentials are correct
- [ ] Connection string is valid
- [ ] Project is not deleted

### Vercel Environment Variables:
- [ ] `DB_DIALECT=postgres` is set
- [ ] `DB_HOST` matches Supabase hostname
- [ ] `DB_PORT=5432` is set
- [ ] `DB_USER=postgres` is set
- [ ] `DB_PASSWORD` matches Supabase password
- [ ] `DB_NAME=postgres` is set
- [ ] `DB_SSL=true` is set
- [ ] `DB_SSL_REJECT_UNAUTHORIZED=false` is set

### Deployment:
- [ ] All variables are set before deployment
- [ ] Project redeployed after setting variables
- [ ] Deployment completed successfully
- [ ] No errors in Vercel function logs

### Testing:
- [ ] `/api/health` returns `{"status":"ok","database":"connected"}`
- [ ] `/api/diagnose` shows connection success
- [ ] Login works correctly

---

## 🚀 Quick Fix Summary

1. ✅ **Check Supabase** - Project must be active
2. ✅ **Get credentials** - From Supabase Dashboard
3. ✅ **Set in Vercel** - All 8 database variables
4. ✅ **Redeploy** - Required after variable changes
5. ✅ **Test** - `/api/health` should work

---

## 📝 Current Credentials (Verify These)

Based on your setup, these should be your credentials:

```
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_PORT=5432
```

**⚠️ Verify these match your Supabase Dashboard!**

---

## ✅ After Fixing

### Expected Result:
- ✅ `/api/health` returns success
- ✅ Database connection works
- ✅ Login works
- ✅ All API endpoints work

---

**Follow these steps systematically and the database connection will work! 🚀**

