# 🚀 Deploy Full Project - Complete Guide

## ❌ Current Error

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
Database connection failed
```

**Cause**: Supabase project is **PAUSED** (must restore first)

---

## ✅ COMPLETE DEPLOYMENT STEPS

### STEP 1: Restore Supabase Project (CRITICAL - Do This First!)

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Find project** with ID: `qppdkzzmijjyoihzfdxw`
4. **Check status**:
   - If **"Paused"** → Click **"Restore"** button
   - Wait 1-2 minutes until status shows **"Active"**
5. **Get database password**:
   - Settings → Database
   - If password unknown → Click "Reset database password"
   - **Copy password immediately** (shown only once!)

**⚠️ THIS MUST BE DONE FIRST - 90% of errors are from paused projects!**

---

### STEP 2: Set ALL Environment Variables in Vercel

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project (or create new if needed)
3. **Settings** → **Environment Variables**
4. **Add these 15 variables**:

#### Database Variables (8):
```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=[Paste from Supabase - Step 1]
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

#### JWT Variables (2):
```
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
```

#### Application Variables (5):
```
FRONTEND_URL=https://your-project.vercel.app
NODE_ENV=production
PORT=8000
VERCEL=1
VITE_API_BASE_URL=https://your-project.vercel.app
```

**For each variable**:
- Click "Add New"
- Paste Name and Value
- Select: Production, Preview, Development
- Click Save

---

### STEP 3: Deploy on Vercel

#### Option A: New Project
1. **Vercel Dashboard** → **"Add New Project"**
2. **Import**: `https://github.com/ahmadkhan32/Internet-Billing-System.git`
3. **Configure**:
   - Framework: **Vite** (or Other)
   - Root Directory: `./`
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd frontend && npm install`
4. **Environment Variables**: Should auto-load (or set in Settings)
5. **Click** "Deploy"

#### Option B: Existing Project
1. **Vercel Dashboard** → Your Project
2. **Deployments** → **Latest Deployment**
3. **Click** "Redeploy"
4. **Wait** 2-3 minutes

**⚠️ IMPORTANT**: After setting environment variables, you MUST redeploy!

---

### STEP 4: Update URLs After First Deployment

1. **Get your Vercel URL**:
   - Vercel Dashboard → Your Project
   - Copy the deployment URL (e.g., `https://internet-billing-system.vercel.app`)

2. **Update 2 variables**:
   - Settings → Environment Variables
   - Update `FRONTEND_URL` = your actual URL
   - Update `VITE_API_BASE_URL` = your actual URL
   - Save

3. **Redeploy** again to apply URL changes

---

### STEP 5: Verify Everything Works

#### Test 1: Backend Health
Visit: `https://your-project.vercel.app/api/health`

**Should return**:
```json
{
  "status": "ok",
  "database": "connected"
}
```

#### Test 2: Frontend
Visit: `https://your-project.vercel.app`

**Should show**: Login page (no errors)

#### Test 3: Login with Super Admin
1. **Email**: `admin@billing.com`
2. **Password**: `admin123`
3. **Should redirect** to: `/super-admin/dashboard` ✅
4. **Should have** full access to all routes ✅

---

## 🔐 Login Credentials

### Super Admin (Full Access):
- **Email**: `admin@billing.com`
- **Password**: `admin123`
- **Redirects to**: `/super-admin/dashboard`

### Other Users (All use password `admin123`):
- ISP Admin: `ispadmin@billing.com`
- Account Manager: `accountmanager@billing.com`
- Technical Officer: `technical@billing.com`
- Recovery Officer: `recovery@billing.com`
- Customer: `customer@billing.com`

---

## 📋 Complete Checklist

### Before Deployment:
- [ ] Supabase project is **Active** (not paused)
- [ ] Database password copied from Supabase
- [ ] All 15 environment variables set in Vercel
- [ ] Project ready to deploy

### After Deployment:
- [ ] Deployment completed successfully
- [ ] `/api/health` returns success
- [ ] Frontend loads without errors
- [ ] Login works with `admin@billing.com` / `admin123`
- [ ] Super Admin redirects to `/super-admin/dashboard`
- [ ] All routes accessible

---

## 🎯 Expected Behavior

### After Login with Super Admin:
1. **Login** with `admin@billing.com` / `admin123`
2. **Redirects** to: `/super-admin/dashboard` ✅
3. **Has access** to:
   - ✅ All customer routes
   - ✅ All billing routes
   - ✅ All payment routes
   - ✅ All admin routes
   - ✅ All super admin routes
   - ✅ **EVERYTHING** - Full control!

---

## 🔍 Troubleshooting

### If Database Still Fails:
1. **Check Supabase** - Project must be Active
2. **Check Password** - Get fresh password from Supabase
3. **Check Variables** - All 8 database variables must be set
4. **Redeploy** - Required after setting variables

### If Login Fails:
1. **Check Backend** - `/api/health` should work first
2. **Check Credentials** - `admin@billing.com` / `admin123`
3. **Check Browser Console** - Look for errors
4. **Check Vercel Logs** - Function logs for errors

### If Redirect Fails:
1. **Check User Role** - Should be `super_admin`
2. **Check Login Logic** - Should redirect to `/super-admin/dashboard`
3. **Check Routes** - All routes should be accessible

---

## ✅ Summary

**The Fix**:
1. ✅ Restore Supabase project (if paused)
2. ✅ Set 15 environment variables in Vercel
3. ✅ Deploy/redeploy on Vercel
4. ✅ Update URLs after first deployment
5. ✅ Test login with `admin@billing.com` / `admin123`

**Expected Result**:
- ✅ Database connected
- ✅ Login works
- ✅ Super Admin redirects to `/super-admin/dashboard`
- ✅ Full access to all routes

---

**Follow these steps and your full project will be deployed and working! 🚀**

