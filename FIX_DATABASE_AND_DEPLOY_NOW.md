# 🚀 Fix Database Connection & Deploy Full Project

## ❌ Current Error

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
Database connection failed
```

**This means**: Supabase project is **PAUSED** or hostname is wrong.

---

## ✅ STEP 1: Fix Supabase Project (CRITICAL!)

### 1.1 Go to Supabase Dashboard
1. Visit: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Find your project** (look for ID: `qppdkzzmijjyoihzfdxw`)

### 1.2 Check Project Status
- **If you see "Paused"** → Click **"Restore"** button
- **If you see "Active"** → Project is running (go to Step 2)
- **If project is missing** → It may have been deleted (create new project)

### 1.3 Wait for Restoration
- After clicking "Restore", wait **1-2 minutes**
- Status should change to **"Active"**

---

## ✅ STEP 2: Get Fresh Database Credentials

### 2.1 From Supabase Dashboard
1. **Click** on your project
2. **Settings** → **Database**
3. **Connection string** → Click "Show connection string"
4. **Copy** these values:

```
Host: db.qppdkzzmijjyoihzfdxw.supabase.co
User: postgres
Password: [Get from "Reset database password" if needed]
Database: postgres
Port: 5432
```

### 2.2 If Password is Unknown
1. **Settings** → **Database**
2. Click **"Reset database password"**
3. **Copy** the new password (shown only once!)
4. **Save it** - you'll need it for Vercel

---

## ✅ STEP 3: Set Environment Variables in Vercel

### 3.1 Go to Vercel Dashboard
1. Visit: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**

### 3.2 Add/Update These 15 Variables

#### Database Variables (8):
```
Name: DB_DIALECT
Value: postgres

Name: DB_HOST
Value: db.qppdkzzmijjyoihzfdxw.supabase.co

Name: DB_PORT
Value: 5432

Name: DB_USER
Value: postgres

Name: DB_PASSWORD
Value: [Your password from Supabase - use the one you just reset if needed]

Name: DB_NAME
Value: postgres

Name: DB_SSL
Value: true

Name: DB_SSL_REJECT_UNAUTHORIZED
Value: false
```

#### JWT Variables (2):
```
Name: JWT_SECRET
Value: 2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be

Name: JWT_EXPIRE
Value: 7d
```

#### Application Variables (5):
```
Name: FRONTEND_URL
Value: https://your-project.vercel.app

Name: NODE_ENV
Value: production

Name: PORT
Value: 8000

Name: VERCEL
Value: 1

Name: VITE_API_BASE_URL
Value: https://your-project.vercel.app/api
```

**⚠️ IMPORTANT**: 
- Replace `your-project.vercel.app` with your actual Vercel URL
- `VITE_API_BASE_URL` must end with `/api`
- `DB_PASSWORD` must match Supabase password exactly

---

## ✅ STEP 4: Deploy Full Project on Vercel

### 4.1 Import Project (If Not Already Deployed)
1. **Vercel Dashboard** → **Add New Project**
2. **Import** from GitHub: `https://github.com/ahmadkhan32/Internet-Billing-System.git`
3. **Configure**:
   - **Framework Preset**: Vite (or Other)
   - **Root Directory**: `./` (root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

### 4.2 Set Environment Variables
- **Before deploying**, set all 15 variables from Step 3
- **Or** set them after first deployment and redeploy

### 4.3 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete (3-5 minutes)

### 4.4 After First Deployment
1. **Get your Vercel URL** from the dashboard
2. **Update** these variables:
   - `FRONTEND_URL` = `https://your-actual-url.vercel.app`
   - `VITE_API_BASE_URL` = `https://your-actual-url.vercel.app/api`
3. **Redeploy** to apply changes

---

## ✅ STEP 5: Verify Deployment

### 5.1 Test Backend
1. Visit: `https://your-project.vercel.app/api/health`
2. **Should return**:
   ```json
   {
     "status": "ok",
     "database": "connected"
   }
   ```

### 5.2 Test Frontend
1. Visit: `https://your-project.vercel.app`
2. **Should show**: Login page (no errors)

### 5.3 Test Login
1. **Login** with Super Admin credentials
2. **Should redirect** to: `/super-admin/dashboard`
3. **Should have** full access to all routes

---

## 🔍 Troubleshooting

### If Database Still Fails:

#### Check 1: Supabase Project Status
- ✅ Must be **"Active"** (not paused)
- ✅ If paused, restore it first

#### Check 2: Environment Variables
- ✅ All 15 variables must be set
- ✅ `DB_PASSWORD` must match Supabase exactly
- ✅ No extra spaces or quotes

#### Check 3: Redeploy Required
- ✅ After setting variables, **MUST redeploy**
- ✅ Vercel Dashboard → Deployments → Redeploy

#### Check 4: Check Vercel Logs
1. **Vercel Dashboard** → Your Project
2. **Deployments** → Latest → **Functions** tab
3. **Check logs** for detailed error messages

---

## 📋 Complete Deployment Checklist

### Before Deployment:
- [ ] Supabase project is active (not paused)
- [ ] Database credentials obtained from Supabase
- [ ] All 15 environment variables ready to set

### During Deployment:
- [ ] Project imported/configured in Vercel
- [ ] All 15 environment variables set
- [ ] Build command configured correctly
- [ ] Output directory set to `frontend/dist`

### After Deployment:
- [ ] Vercel URL obtained
- [ ] `FRONTEND_URL` updated with actual URL
- [ ] `VITE_API_BASE_URL` updated with actual URL + `/api`
- [ ] Project redeployed with updated URLs

### Verification:
- [ ] `/api/health` returns success
- [ ] Frontend loads correctly
- [ ] Login works
- [ ] Super Admin redirects correctly

---

## 🎯 Quick Summary

1. ✅ **Restore Supabase project** (if paused)
2. ✅ **Get fresh credentials** from Supabase
3. ✅ **Set all 15 variables** in Vercel
4. ✅ **Deploy** project
5. ✅ **Update URLs** after first deployment
6. ✅ **Redeploy** with updated URLs
7. ✅ **Test** everything

---

## 🚀 Most Important Steps

**CRITICAL - Do These First:**
1. ✅ Restore Supabase project (if paused)
2. ✅ Get correct database password
3. ✅ Set all environment variables in Vercel
4. ✅ Redeploy after setting variables

**The ENOTFOUND error means Supabase is paused - restore it first!**

---

**Follow these steps and your full project will be deployed and working! 🎉**

