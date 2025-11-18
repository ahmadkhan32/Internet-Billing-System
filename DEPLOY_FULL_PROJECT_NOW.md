# 🚀 Deploy Full Project - Complete Guide

## ❌ Current Issue

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

**This means**: Your Supabase project is **PAUSED**. You must restore it first!

---

## ✅ FIX STEP 1: Restore Supabase Project (DO THIS FIRST!)

### 1.1 Go to Supabase
1. Visit: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login**
3. **Find your project** (ID: `qppdkzzmijjyoihzfdxw`)

### 1.2 Restore Project
- **If you see "Paused"** → Click **"Restore"**
- **Wait 1-2 minutes** for restoration
- **Status should be "Active"**

**⚠️ CRITICAL**: You cannot connect to a paused project!

---

## ✅ FIX STEP 2: Get Database Password

### 2.1 From Supabase Dashboard
1. **Your Project** → **Settings** → **Database**
2. **Connection string** → Copy the password
3. **OR** Click **"Reset database password"** to get a new one
4. **Save the password** - you'll need it!

---

## ✅ FIX STEP 3: Set All Environment Variables in Vercel

### 3.1 Go to Vercel
1. Visit: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Your Project** → **Settings** → **Environment Variables**

### 3.2 Add These 15 Variables

**Copy and paste each one:**

```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
FRONTEND_URL=https://your-project.vercel.app
NODE_ENV=production
PORT=8000
VERCEL=1
VITE_API_BASE_URL=https://your-project.vercel.app/api
```

**⚠️ IMPORTANT**:
- Replace `your-project.vercel.app` with your actual Vercel URL
- `DB_PASSWORD` must match Supabase password
- `VITE_API_BASE_URL` must end with `/api`

---

## ✅ DEPLOY STEP 4: Deploy on Vercel

### 4.1 Import Project (If New)
1. **Vercel Dashboard** → **Add New Project**
2. **Import**: `https://github.com/ahmadkhan32/Internet-Billing-System.git`
3. **Configure**:
   - Framework: **Vite** (or **Other**)
   - Root Directory: `./`
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd frontend && npm install`

### 4.2 Set Environment Variables
- **Set all 15 variables** from Step 3
- **Click "Save"** for each

### 4.3 Deploy
1. Click **"Deploy"**
2. **Wait** 3-5 minutes for build to complete

### 4.4 After First Deployment
1. **Copy your Vercel URL** (e.g., `https://internet-billing-system.vercel.app`)
2. **Update** these 2 variables:
   - `FRONTEND_URL` = your actual URL
   - `VITE_API_BASE_URL` = your actual URL + `/api`
3. **Redeploy**

---

## ✅ VERIFY STEP 5: Test Everything

### 5.1 Test Backend
```
https://your-project.vercel.app/api/health
```
**Should return**: `{"status":"ok","database":"connected"}`

### 5.2 Test Frontend
```
https://your-project.vercel.app
```
**Should show**: Login page (no errors)

### 5.3 Test Login
1. **Login** with: `admin@billing.com` / `admin123`
2. **Should redirect** to: `/super-admin/dashboard`
3. **Should work** perfectly!

---

## 🔍 If Still Failing

### Check 1: Supabase Status
- ✅ Project must be **"Active"**
- ✅ If paused, restore it

### Check 2: Environment Variables
- ✅ All 15 must be set
- ✅ No typos or extra spaces
- ✅ `DB_PASSWORD` matches Supabase

### Check 3: Redeploy
- ✅ **MUST redeploy** after setting variables
- ✅ Vercel → Deployments → Redeploy

### Check 4: Vercel Logs
1. **Vercel Dashboard** → Your Project
2. **Deployments** → Latest → **Functions**
3. **Check logs** for errors

---

## 📋 Quick Checklist

- [ ] Supabase project restored (Active status)
- [ ] Database password obtained
- [ ] All 15 environment variables set in Vercel
- [ ] Project deployed on Vercel
- [ ] URLs updated after first deployment
- [ ] Project redeployed
- [ ] `/api/health` returns success
- [ ] Frontend loads correctly
- [ ] Login works

---

## 🎯 Summary

**The Fix**:
1. ✅ **Restore Supabase project** (if paused)
2. ✅ **Get database password**
3. ✅ **Set all 15 variables** in Vercel
4. ✅ **Deploy** project
5. ✅ **Update URLs** and **redeploy**

**Most Important**: Restore the Supabase project first - it's paused!

---

**Follow these steps and your full project will be deployed and working! 🚀**

