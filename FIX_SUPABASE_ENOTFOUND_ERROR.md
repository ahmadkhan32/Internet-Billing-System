# 🔧 Fix: Supabase ENOTFOUND Error

## ❌ Error Message

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
Database connection failed
```

## 🔍 What This Means

**ENOTFOUND** means the DNS lookup failed - the hostname cannot be resolved. This usually means:

1. **❌ Supabase project is PAUSED** (most common - free tier auto-pauses after inactivity)
2. **❌ Database hostname is incorrect**
3. **❌ Supabase project was deleted**

---

## ✅ Step-by-Step Fix

### Step 1: Check Supabase Project Status

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Find your project**: `qppdkzzmijjyoihzfdxw` (or check your project ID)
4. **Check project status**:
   - If you see **"Paused"** or **"Restore"** button → Project is paused
   - If project is **missing** → Project may have been deleted

### Step 2: Restore Paused Project

If project is paused:

1. **Click** "Restore" or "Resume" button
2. **Wait** for project to restore (usually 1-2 minutes)
3. **Verify** project is active (status should be "Active")

### Step 3: Verify Database Hostname

1. **Go to**: Supabase Dashboard → Your Project
2. **Settings** → **Database**
3. **Copy** the connection string or hostname
4. **Verify** it matches: `db.qppdkzzmijjyoihzfdxw.supabase.co`

### Step 4: Update Environment Variables in Vercel

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Verify** these variables are set correctly:

```
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_PORT=5432
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

5. **If any are missing or incorrect**, update them
6. **Redeploy** your project

---

## 🔍 Troubleshooting

### Issue 1: Project is Paused

**Solution**:
1. Go to Supabase Dashboard
2. Click "Restore" on your project
3. Wait for restoration
4. Redeploy on Vercel

### Issue 2: Hostname is Wrong

**Solution**:
1. Get correct hostname from Supabase Dashboard
2. Update `DB_HOST` in Vercel
3. Redeploy

### Issue 3: Project Doesn't Exist

**Solution**:
1. Check if project was deleted
2. Create a new Supabase project
3. Update all environment variables with new credentials
4. Redeploy

### Issue 4: Credentials Changed

**Solution**:
1. Go to Supabase Dashboard → Settings → Database
2. Reset database password if needed
3. Update `DB_PASSWORD` in Vercel
4. Redeploy

---

## 📋 Quick Checklist

- [ ] Check Supabase Dashboard - is project paused?
- [ ] Restore project if paused
- [ ] Verify DB_HOST is correct
- [ ] Verify all environment variables are set in Vercel
- [ ] Check DB_PASSWORD is correct
- [ ] Redeploy on Vercel
- [ ] Test connection: `https://your-project.vercel.app/api/health`

---

## 🎯 Most Common Fix

**90% of the time**, the issue is that the Supabase project is paused:

1. ✅ Go to Supabase Dashboard
2. ✅ Click "Restore" on your project
3. ✅ Wait 1-2 minutes
4. ✅ Redeploy on Vercel
5. ✅ Test again

---

## 📝 Get Fresh Credentials

If you need to get fresh credentials:

1. **Supabase Dashboard** → Your Project
2. **Settings** → **Database**
3. **Connection string** → Copy the values:
   - Host: `db.xxxxx.supabase.co`
   - User: Usually `postgres`
   - Password: Click "Reset database password" if needed
   - Database: Usually `postgres`
   - Port: `5432` (or `6543` for connection pooling)

---

## ✅ After Fixing

### Test Connection:

1. Visit: `https://your-project.vercel.app/api/health`
2. Should return: `{"status":"ok","database":"connected"}`

### If Still Failing:

1. Check Vercel function logs for detailed error
2. Verify all environment variables are set
3. Check Supabase project is active
4. Try connection pooling port `6543` instead of `5432`

---

## 🚀 Summary

**The Fix**:
1. ✅ Check Supabase project is not paused
2. ✅ Restore if paused
3. ✅ Verify environment variables in Vercel
4. ✅ Redeploy

**Most likely cause**: Supabase project is paused (free tier auto-pauses after inactivity)

---

**Follow these steps and the ENOTFOUND error will be fixed! 🎉**

