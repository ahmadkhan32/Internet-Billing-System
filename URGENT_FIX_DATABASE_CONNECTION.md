# 🚨 URGENT: Fix Database Connection Error

## ❌ Your Current Error

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
Database connection failed
```

## 🔍 What This Means

**ENOTFOUND** = DNS lookup failed = **Supabase project is PAUSED**

**99% of the time**, this error means your Supabase project has been paused (free tier auto-pauses after inactivity).

---

## ✅ FIX IT NOW - Follow These Steps

### ⚡ STEP 1: Restore Supabase Project (MOST IMPORTANT!)

1. **Open this URL**: https://supabase.com/dashboard
2. **Login** with your Supabase account
3. **Look for your project** (project ID contains: `qppdkzzmijjyoihzfdxw`)
4. **Check the project status**:
   - If you see a **"Paused"** badge or **"Restore"** button → **CLICK IT**
   - If you see **"Active"** → Skip to Step 2
5. **Wait 1-2 minutes** for the project to restore
6. **Verify** it shows **"Active"** status

**⚠️ THIS IS THE #1 FIX - Do this FIRST before anything else!**

---

### ⚡ STEP 2: Get Your Database Password

1. **Supabase Dashboard** → Click on your project
2. **Settings** (left sidebar) → **Database**
3. **Connection string** section
4. **If you don't know the password**:
   - Click **"Reset database password"** button
   - **Copy the password immediately** (it's shown only once!)
   - Save it somewhere safe

**Your database credentials should be**:
- **Host**: `db.qppdkzzmijjyoihzfdxw.supabase.co`
- **User**: `postgres`
- **Password**: [Get from Supabase Dashboard]
- **Database**: `postgres`
- **Port**: `5432`

---

### ⚡ STEP 3: Set Environment Variables in Vercel

1. **Open**: https://vercel.com/dashboard
2. **Click** on your project
3. **Settings** (top menu) → **Environment Variables** (left sidebar)
4. **Delete** any existing database variables (to avoid conflicts)
5. **Add these 15 variables** (click "Add New" for each):

#### Variable 1: DB_DIALECT
- **Name**: `DB_DIALECT`
- **Value**: `postgres`
- **Environment**: Select all (Production, Preview, Development)
- **Save**

#### Variable 2: DB_HOST
- **Name**: `DB_HOST`
- **Value**: `db.qppdkzzmijjyoihzfdxw.supabase.co`
- **Environment**: Select all
- **Save**

#### Variable 3: DB_PORT
- **Name**: `DB_PORT`
- **Value**: `5432`
- **Environment**: Select all
- **Save**

#### Variable 4: DB_USER
- **Name**: `DB_USER`
- **Value**: `postgres`
- **Environment**: Select all
- **Save**

#### Variable 5: DB_PASSWORD
- **Name**: `DB_PASSWORD`
- **Value**: [Paste the password from Step 2 - NO SPACES!]
- **Environment**: Select all
- **Save**

#### Variable 6: DB_NAME
- **Name**: `DB_NAME`
- **Value**: `postgres`
- **Environment**: Select all
- **Save**

#### Variable 7: DB_SSL
- **Name**: `DB_SSL`
- **Value**: `true`
- **Environment**: Select all
- **Save**

#### Variable 8: DB_SSL_REJECT_UNAUTHORIZED
- **Name**: `DB_SSL_REJECT_UNAUTHORIZED`
- **Value**: `false`
- **Environment**: Select all
- **Save**

#### Variable 9: JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: `2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`
- **Environment**: Select all
- **Save**

#### Variable 10: JWT_EXPIRE
- **Name**: `JWT_EXPIRE`
- **Value**: `7d`
- **Environment**: Select all
- **Save**

#### Variable 11: FRONTEND_URL
- **Name**: `FRONTEND_URL`
- **Value**: `https://your-project.vercel.app` (update after deployment)
- **Environment**: Select all
- **Save**

#### Variable 12: NODE_ENV
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Select all
- **Save**

#### Variable 13: PORT
- **Name**: `PORT`
- **Value**: `8000`
- **Environment**: Select all
- **Save**

#### Variable 14: VERCEL
- **Name**: `VERCEL`
- **Value**: `1`
- **Environment**: Select all
- **Save**

#### Variable 15: VITE_API_BASE_URL
- **Name**: `VITE_API_BASE_URL`
- **Value**: `https://your-project.vercel.app` (update after deployment)
- **Environment**: Select all
- **Save**

**✅ You should now have 15 environment variables set!**

---

### ⚡ STEP 4: Deploy/Redeploy on Vercel

#### If Project Already Exists:
1. **Vercel Dashboard** → Your Project
2. **Deployments** tab (top menu)
3. **Find** the latest deployment
4. **Click** the "..." menu → **"Redeploy"**
5. **Wait 2-3 minutes** for deployment to complete

#### If New Project:
1. **Vercel Dashboard** → **"Add New Project"** button
2. **Import** from GitHub: `https://github.com/ahmadkhan32/Internet-Billing-System.git`
3. **Configure**:
   - **Framework Preset**: Select "Vite" or "Other"
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`
4. **Environment Variables**: Should auto-load (or set in Settings)
5. **Click** "Deploy" button
6. **Wait** for deployment (2-3 minutes)

**⚠️ CRITICAL**: Environment variables only take effect after redeployment!

---

### ⚡ STEP 5: Update URLs After First Deployment

1. **Get your Vercel URL**:
   - Vercel Dashboard → Your Project
   - Look at the top - you'll see your deployment URL
   - Copy it (e.g., `https://internet-billing-system.vercel.app`)

2. **Update Environment Variables**:
   - Go to **Settings** → **Environment Variables**
   - **Find** `FRONTEND_URL` → Click to edit
   - **Change** value to your actual Vercel URL
   - **Save**
   - **Find** `VITE_API_BASE_URL` → Click to edit
   - **Change** value to your actual Vercel URL
   - **Save**

3. **Redeploy Again**:
   - **Deployments** → **Redeploy**
   - Wait for completion

---

## ✅ VERIFY IT WORKS

### Test 1: Backend Health Check
Visit: `https://your-project.vercel.app/api/health`

**Expected Result**:
```json
{
  "status": "ok",
  "database": "connected"
}
```

### Test 2: Frontend
Visit: `https://your-project.vercel.app`

**Expected Result**: Login page loads (no errors)

### Test 3: Login
1. Login with: `admin@billing.com` / `admin123`
2. **Should redirect** to: `/super-admin/dashboard`
3. **Should have** access to all routes

---

## 🔍 If Still Not Working

### Check 1: Supabase Project
- Go back to Supabase Dashboard
- Verify project shows **"Active"** (not paused)
- If still paused, restore it again

### Check 2: Environment Variables
- Vercel Dashboard → Settings → Environment Variables
- Count them - should be **15 variables**
- Verify `DB_PASSWORD` matches Supabase
- Check `DB_HOST` has no typos

### Check 3: Vercel Logs
- Vercel Dashboard → Your Project → **Functions** tab
- Click on `api/index.js`
- Scroll through logs
- Look for database connection errors

### Check 4: Try Connection Pooling Port
- Change `DB_PORT` from `5432` to `6543`
- Save
- Redeploy
- Test again

---

## 📋 Complete Checklist

Before Deployment:
- [ ] Supabase project is **Active** (not paused)
- [ ] Database password copied from Supabase
- [ ] All 15 environment variables set in Vercel
- [ ] No typos in variable values

After Deployment:
- [ ] Deployment completed successfully
- [ ] `/api/health` returns `{"status":"ok","database":"connected"}`
- [ ] Frontend loads without errors
- [ ] Login works
- [ ] URLs updated after first deployment

---

## 🎯 Quick Reference

### Your Supabase Credentials:
```
Host: db.qppdkzzmijjyoihzfdxw.supabase.co
User: postgres
Password: [Get from Supabase Dashboard]
Database: postgres
Port: 5432
```

### All 15 Environment Variables:
1. `DB_DIALECT=postgres`
2. `DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co`
3. `DB_PORT=5432`
4. `DB_USER=postgres`
5. `DB_PASSWORD=[From Supabase]`
6. `DB_NAME=postgres`
7. `DB_SSL=true`
8. `DB_SSL_REJECT_UNAUTHORIZED=false`
9. `JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`
10. `JWT_EXPIRE=7d`
11. `FRONTEND_URL=https://your-project.vercel.app`
12. `NODE_ENV=production`
13. `PORT=8000`
14. `VERCEL=1`
15. `VITE_API_BASE_URL=https://your-project.vercel.app`

---

## ✅ Success!

After following all steps:
- ✅ Database connection works
- ✅ Backend API accessible
- ✅ Frontend loads correctly
- ✅ Login works
- ✅ Super Admin has full access
- ✅ All routes work

---

## 🚀 Summary

**The Fix**:
1. ✅ **Restore Supabase project** (if paused) - **DO THIS FIRST!**
2. ✅ **Get database password** from Supabase
3. ✅ **Set 15 environment variables** in Vercel
4. ✅ **Deploy/redeploy** on Vercel
5. ✅ **Update URLs** after deployment
6. ✅ **Test** everything works

**Time Required**: ~15 minutes

**Most Important**: Restore the Supabase project first - this fixes the ENOTFOUND error!

---

**Follow these steps exactly and your database connection will work! 🎉**

