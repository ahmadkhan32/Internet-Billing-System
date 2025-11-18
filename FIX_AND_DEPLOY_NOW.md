# 🚀 Fix Database Error & Deploy Full Project - Step by Step

## ❌ Current Error

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
Database connection failed
```

**Root Cause**: Supabase project is **PAUSED** (free tier auto-pauses after inactivity)

---

## ✅ FIX IT NOW - 5 Steps

### STEP 1: Restore Supabase Project (2 minutes)

1. **Open**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Find** your project (look for ID: `qppdkzzmijjyoihzfdxw`)
4. **Check status**:
   - If you see **"Paused"** → Click **"Restore"** button
   - Wait 1-2 minutes for restoration
   - Status should change to **"Active"**

**⚠️ THIS IS THE #1 CAUSE - Do this first!**

---

### STEP 2: Get Database Password (1 minute)

1. **Supabase Dashboard** → Your Project
2. **Settings** → **Database**
3. **Connection string** section
4. **If password is unknown**:
   - Click **"Reset database password"**
   - **Copy the password immediately** (shown only once!)
   - Save it somewhere safe

**Your credentials should be**:
```
Host: db.qppdkzzmijjyoihzfdxw.supabase.co
User: postgres
Password: [Copy from Supabase]
Database: postgres
Port: 5432
```

---

### STEP 3: Set Environment Variables in Vercel (5 minutes)

1. **Open**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Delete** any old database variables (to avoid conflicts)
5. **Add these 15 variables** (one by one):

#### Copy-Paste These Variables:

**Database (8 variables)**:
```
DB_DIALECT
postgres

DB_HOST
db.qppdkzzmijjyoihzfdxw.supabase.co

DB_PORT
5432

DB_USER
postgres

DB_PASSWORD
[Paste password from Supabase - Step 2]

DB_NAME
postgres

DB_SSL
true

DB_SSL_REJECT_UNAUTHORIZED
false
```

**JWT (2 variables)**:
```
JWT_SECRET
2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be

JWT_EXPIRE
7d
```

**Application (5 variables)**:
```
FRONTEND_URL
https://your-project.vercel.app

NODE_ENV
production

PORT
8000

VERCEL
1

VITE_API_BASE_URL
https://your-project.vercel.app
```

**For each variable**:
- Click **"Add New"**
- Paste **Name** (left side)
- Paste **Value** (right side)
- Select **Production, Preview, Development**
- Click **"Save"**

---

### STEP 4: Deploy on Vercel (3 minutes)

#### If Project Already Exists:
1. **Vercel Dashboard** → Your Project
2. **Deployments** → **Latest Deployment**
3. **Click** "Redeploy" button
4. **Wait** 2-3 minutes for deployment

#### If New Project:
1. **Vercel Dashboard** → **"Add New Project"**
2. **Import** from GitHub: `https://github.com/ahmadkhan32/Internet-Billing-System.git`
3. **Configure**:
   - Framework: **Vite** (or Other)
   - Root Directory: `./`
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
4. **Environment Variables**: Should auto-load (or set in Settings)
5. **Click** "Deploy"

**⚠️ CRITICAL**: After setting environment variables, you MUST redeploy!

---

### STEP 5: Update URLs After Deployment (2 minutes)

1. **Get your Vercel URL**:
   - Vercel Dashboard → Your Project
   - Copy the URL (e.g., `https://internet-billing-system.vercel.app`)

2. **Update 2 variables**:
   - Go to **Settings** → **Environment Variables**
   - **Find** `FRONTEND_URL` → Update to your actual URL
   - **Find** `VITE_API_BASE_URL` → Update to your actual URL
   - **Save**

3. **Redeploy** again:
   - **Deployments** → **Redeploy**
   - Wait for completion

---

## ✅ Verify It Works

### Test 1: Backend Health
Visit: `https://your-project.vercel.app/api/health`

**Should return**:
```json
{
  "status": "ok",
  "database": "connected"
}
```

### Test 2: Frontend
Visit: `https://your-project.vercel.app`

**Should show**: Login page (no errors)

### Test 3: Login
1. Login with: `admin@billing.com` / `admin123`
2. **Should redirect** to: `/super-admin/dashboard`
3. **Should have** access to all routes

---

## 🔍 If Still Not Working

### Check 1: Supabase Project Status
- Go to Supabase Dashboard
- Verify project shows **"Active"** (not paused)
- If paused, restore it again

### Check 2: Environment Variables
- Vercel Dashboard → Settings → Environment Variables
- Verify all 15 variables are set
- Check `DB_PASSWORD` matches Supabase
- Check no typos in `DB_HOST`

### Check 3: Vercel Logs
- Vercel Dashboard → Your Project → **Functions** tab
- Click on `api/index.js`
- Check logs for errors
- Look for database connection errors

### Check 4: Try Connection Pooling
- Change `DB_PORT` from `5432` to `6543`
- Redeploy
- Test again

---

## 📋 Quick Checklist

- [ ] Step 1: Supabase project restored (Active status)
- [ ] Step 2: Database password copied from Supabase
- [ ] Step 3: All 15 environment variables set in Vercel
- [ ] Step 4: Project deployed/redeployed on Vercel
- [ ] Step 5: URLs updated after first deployment
- [ ] Test: `/api/health` returns success
- [ ] Test: Frontend loads correctly
- [ ] Test: Login works

---

## 🎯 Most Common Mistakes

1. ❌ **Forgot to restore Supabase project** → Do Step 1!
2. ❌ **Set variables but didn't redeploy** → Do Step 4!
3. ❌ **Wrong password** → Get fresh password from Supabase
4. ❌ **Typo in DB_HOST** → Double-check the hostname
5. ❌ **Forgot to update URLs** → Do Step 5!

---

## ✅ Success Criteria

After all steps:
- ✅ `/api/health` returns `{"status":"ok","database":"connected"}`
- ✅ Frontend loads without errors
- ✅ Login works
- ✅ Super Admin redirects correctly
- ✅ All routes accessible

---

## 🚀 Summary

**The Fix**:
1. ✅ Restore Supabase project (if paused)
2. ✅ Set 15 environment variables in Vercel
3. ✅ Deploy/redeploy on Vercel
4. ✅ Update URLs after deployment
5. ✅ Test everything

**Time Required**: ~15 minutes

**Most Important**: Restore the Supabase project first - this fixes 90% of cases!

---

**Follow these 5 steps exactly and your project will be fully deployed and working! 🎉**

