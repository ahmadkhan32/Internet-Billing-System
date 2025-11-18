# 🚀 Complete Fix & Deploy - Full Project

## ❌ Current Error

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
Database connection failed
```

**This means**: Supabase project is **PAUSED** or hostname is wrong.

---

## ✅ STEP-BY-STEP FIX (Follow Exactly)

### STEP 1: Restore Supabase Project (CRITICAL!)

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Find project** with ID: `qppdkzzmijjyoihzfdxw`
4. **Check status**:
   - If you see **"Paused"** → Click **"Restore"** button
   - If you see **"Active"** → Skip to Step 2
   - If project **doesn't exist** → Create new project
5. **Wait** 1-2 minutes for restoration

**⚠️ THIS IS THE MOST COMMON ISSUE - 90% of cases!**

---

### STEP 2: Get Fresh Database Credentials

1. **Supabase Dashboard** → Your Project
2. **Settings** → **Database**
3. **Connection string** → Click "Show connection string"
4. **Copy these values**:

```
Host: db.qppdkzzmijjyoihzfdxw.supabase.co
User: postgres
Password: [Get from Supabase - may need to reset]
Database: postgres
Port: 5432
```

**If password is unknown**:
- Click **"Reset database password"**
- Copy the new password immediately (shown only once!)

---

### STEP 3: Set ALL Environment Variables in Vercel

#### Go to Vercel Dashboard:
1. Visit: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Delete** old variables if they exist (to avoid conflicts)
5. **Add NEW** variables one by one:

#### Database Variables (8):
```
Name: DB_DIALECT
Value: postgres
Environment: Production, Preview, Development

Name: DB_HOST
Value: db.qppdkzzmijjyoihzfdxw.supabase.co
Environment: Production, Preview, Development

Name: DB_PORT
Value: 5432
Environment: Production, Preview, Development

Name: DB_USER
Value: postgres
Environment: Production, Preview, Development

Name: DB_PASSWORD
Value: [Paste password from Supabase - no spaces!]
Environment: Production, Preview, Development

Name: DB_NAME
Value: postgres
Environment: Production, Preview, Development

Name: DB_SSL
Value: true
Environment: Production, Preview, Development

Name: DB_SSL_REJECT_UNAUTHORIZED
Value: false
Environment: Production, Preview, Development
```

#### JWT Variables (2):
```
Name: JWT_SECRET
Value: 2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
Environment: Production, Preview, Development

Name: JWT_EXPIRE
Value: 7d
Environment: Production, Preview, Development
```

#### Application Variables (5):
```
Name: FRONTEND_URL
Value: https://your-project.vercel.app
Environment: Production, Preview, Development
(Update this after first deployment with actual URL)

Name: NODE_ENV
Value: production
Environment: Production, Preview, Development

Name: PORT
Value: 8000
Environment: Production, Preview, Development

Name: VERCEL
Value: 1
Environment: Production, Preview, Development

Name: VITE_API_BASE_URL
Value: https://your-project.vercel.app
Environment: Production, Preview, Development
(Update this after first deployment with actual URL)
```

**Total: 15 environment variables**

---

### STEP 4: Deploy on Vercel

#### Option A: New Deployment

1. **Vercel Dashboard** → **Add New Project**
2. **Import** from GitHub: `https://github.com/ahmadkhan32/Internet-Billing-System.git`
3. **Configure**:
   - **Framework Preset**: Vite (or Other)
   - **Root Directory**: `./` (root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`
4. **Environment Variables**: Should be auto-loaded (or set them in Settings)
5. **Click** "Deploy"

#### Option B: Redeploy Existing Project

1. **Vercel Dashboard** → Your Project
2. **Deployments** → **Latest Deployment**
3. **Click** "Redeploy" button
4. **Wait** for deployment (2-3 minutes)

**⚠️ IMPORTANT**: After setting environment variables, you MUST redeploy!

---

### STEP 5: Update URLs After First Deployment

1. **Get your Vercel URL**:
   - Vercel Dashboard → Your Project
   - Copy the deployment URL (e.g., `https://internet-billing-system.vercel.app`)

2. **Update Environment Variables**:
   - Go to **Settings** → **Environment Variables**
   - **Update**:
     - `FRONTEND_URL` = `https://your-actual-url.vercel.app`
     - `VITE_API_BASE_URL` = `https://your-actual-url.vercel.app`
   - **Save**

3. **Redeploy** again to apply URL changes

---

### STEP 6: Verify Deployment

#### Test Backend:
1. Visit: `https://your-project.vercel.app/api/health`
2. **Should return**:
   ```json
   {
     "status": "ok",
     "database": "connected"
   }
   ```

#### Test Frontend:
1. Visit: `https://your-project.vercel.app`
2. **Should show**: Login page (no errors)

#### Test Login:
1. **Login** with Super Admin credentials
2. **Should redirect** to: `/super-admin/dashboard`
3. **Should have** full access to all routes

---

## 🔍 Troubleshooting

### If `/api/health` still shows error:

1. **Check Vercel Function Logs**:
   - Vercel Dashboard → Your Project → **Functions** tab
   - Click on `api/index.js`
   - Check logs for errors

2. **Verify Supabase Project**:
   - Go to Supabase Dashboard
   - Verify project is **Active** (not paused)
   - Test connection from Supabase SQL Editor

3. **Double-Check Environment Variables**:
   - Verify all 15 variables are set
   - Check for typos in values
   - Ensure no extra spaces

4. **Try Connection Pooling**:
   - Change `DB_PORT` from `5432` to `6543`
   - Redeploy

---

## 📋 Complete Checklist

### Before Deployment:
- [ ] Supabase project is **Active** (not paused)
- [ ] All 15 environment variables are set in Vercel
- [ ] Database credentials match Supabase Dashboard
- [ ] Project is ready to deploy

### After Deployment:
- [ ] Deployment completed successfully
- [ ] `/api/health` returns success
- [ ] Frontend loads without errors
- [ ] Login works correctly
- [ ] Super Admin redirects to `/super-admin/dashboard`

---

## 🎯 Quick Summary

1. ✅ **Restore Supabase project** (if paused)
2. ✅ **Set 15 environment variables** in Vercel
3. ✅ **Deploy** on Vercel
4. ✅ **Update URLs** after first deployment
5. ✅ **Redeploy** to apply URL changes
6. ✅ **Test** everything works

---

## 📝 Exact Values to Use

### Database (Supabase):
```
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_USER=postgres
DB_PASSWORD=[Get from Supabase Dashboard]
DB_NAME=postgres
DB_PORT=5432
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

### JWT:
```
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
```

### URLs (Update after deployment):
```
FRONTEND_URL=https://your-actual-vercel-url.vercel.app
VITE_API_BASE_URL=https://your-actual-vercel-url.vercel.app
```

---

## ✅ Expected Result

After following all steps:
- ✅ Database connection works
- ✅ Backend API accessible
- ✅ Frontend loads correctly
- ✅ Login works
- ✅ Super Admin has full access
- ✅ All routes work

---

**Follow these steps exactly and your project will be fully deployed and working! 🚀**

