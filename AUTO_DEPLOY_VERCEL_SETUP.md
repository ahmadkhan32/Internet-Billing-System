# 🚀 Auto-Deploy to Vercel - Complete Setup Guide

## ✅ What You'll Get

After setup:
- ✅ **Auto-deployment** on every Git push
- ✅ **Frontend** deployed automatically
- ✅ **Backend** deployed automatically
- ✅ **Environment variables** configured
- ✅ **Both projects** connected to GitHub

---

## 📋 Step 1: Deploy Backend (First Time)

### 1.1 Create Backend Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your repository: `ahmadkhan32/Internet-Billing-System`
5. Click **"Import"**

### 1.2 Configure Backend Project

**Project Settings:**
- **Project Name**: `internet-billing-backend` (or any name)
- **Framework Preset**: `Other`
- **Root Directory**: `./` (leave as root - don't change)
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `cd backend && npm install`

### 1.3 Set Environment Variables

Click **"Environment Variables"** and add these **ONE BY ONE**:

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
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=8000
VERCEL=1
```

**Note:** Set `FRONTEND_URL` after deploying frontend (Step 2).

### 1.4 Deploy Backend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy your Backend URL** (e.g., `https://internet-billing-backend.vercel.app`)
4. **Save this URL!** You'll need it for frontend

### 1.5 Enable Auto-Deploy

✅ **Auto-deploy is ENABLED by default!**

Every time you push to GitHub:
- Vercel will automatically detect changes
- Rebuild and redeploy your backend
- Update the deployment

**No additional setup needed!**

---

## 📋 Step 2: Deploy Frontend (First Time)

### 2.1 Create Frontend Project

1. In Vercel Dashboard, click **"Add New Project"** again
2. Click **"Import Git Repository"**
3. Select the **same repository**: `ahmadkhan32/Internet-Billing-System`
4. Click **"Import"**

### 2.2 Configure Frontend Project

**Project Settings:**
- **Project Name**: `internet-billing-frontend` (or any name)
- **Framework Preset**: `Vite` (Vercel will auto-detect)
- **Root Directory**: `./frontend` ⚠️ **IMPORTANT!**
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### 2.3 Set Environment Variable

Click **"Environment Variables"** and add:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

**Replace `your-backend.vercel.app` with your actual Backend URL from Step 1.4!**

### 2.4 Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy your Frontend URL** (e.g., `https://internet-billing-frontend.vercel.app`)
4. **Save this URL!**

### 2.5 Enable Auto-Deploy

✅ **Auto-deploy is ENABLED by default!**

Every time you push to GitHub:
- Vercel will automatically detect changes
- Rebuild and redeploy your frontend
- Update the deployment

**No additional setup needed!**

---

## 📋 Step 3: Update Backend with Frontend URL

### 3.1 Update Environment Variable

1. Go to **Backend Project** in Vercel
2. **Settings** → **Environment Variables**
3. Find `FRONTEND_URL`
4. Click **"Edit"**
5. Update value to your **Frontend URL** from Step 2.4
6. Click **"Save"**

### 3.2 Redeploy Backend

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment

---

## ✅ Auto-Deployment is Now Active!

### How It Works:

1. **You push code to GitHub:**
   ```bash
   git add .
   git commit -m "Update code"
   git push origin main
   ```

2. **Vercel automatically:**
   - Detects the push
   - Builds your backend
   - Builds your frontend
   - Deploys both
   - Updates your URLs

3. **You see updates:**
   - Check Vercel Dashboard → Deployments
   - See new deployment with your commit message
   - Visit your URLs to see changes

---

## 🔧 Configure Auto-Deploy Settings

### For Each Project:

1. **Vercel Dashboard** → Your Project
2. **Settings** → **Git**
3. **Production Branch**: `main` (or `master`)
4. **Auto-deploy**: ✅ Enabled (default)

### Branch Protection:

- **Production**: Auto-deploys from `main` branch
- **Preview**: Auto-deploys from other branches
- **Pull Requests**: Creates preview deployments

---

## 📊 Deployment Status

### Check Deployments:

1. **Vercel Dashboard** → Your Project
2. **Deployments** tab
3. See all deployments with:
   - ✅ Status (Ready, Building, Error)
   - 📝 Commit message
   - 🕐 Time
   - 🔗 URL

### View Logs:

1. Click on any deployment
2. **"Functions"** tab → Click function
3. **"Logs"** tab → See build and runtime logs

---

## 🎯 Quick Reference

### Your URLs (After Deployment):

- **Backend**: `https://internet-billing-backend.vercel.app`
- **Frontend**: `https://internet-billing-frontend.vercel.app`

### Test Endpoints:

- **Backend Health**: `https://your-backend.vercel.app/api/health`
- **Frontend**: `https://your-frontend.vercel.app`

### Environment Variables:

**Backend:**
- All database variables
- JWT secret
- Frontend URL

**Frontend:**
- Backend API URL

---

## ✅ Verification Checklist

- [ ] Backend project created
- [ ] Frontend project created
- [ ] All environment variables set
- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Backend URL copied
- [ ] Frontend URL copied
- [ ] `VITE_API_BASE_URL` set with backend URL
- [ ] `FRONTEND_URL` set with frontend URL
- [ ] Backend redeployed
- [ ] Health check passes
- [ ] Frontend loads correctly
- [ ] Login works
- [ ] Auto-deploy enabled (default)

---

## 🆘 Troubleshooting

### Auto-Deploy Not Working:

1. **Check Git Integration:**
   - Settings → Git
   - Verify repository is connected
   - Check branch is `main`

2. **Check Webhook:**
   - Settings → Git → Webhook URL
   - Should be active

3. **Manual Trigger:**
   - Deployments → "..." → Redeploy

### Build Fails:

1. **Check Logs:**
   - Click on failed deployment
   - View build logs
   - Fix errors

2. **Check Environment Variables:**
   - Settings → Environment Variables
   - Verify all are set

3. **Check Configuration:**
   - Settings → General
   - Verify build settings

---

## 🚀 You're All Set!

After completing these steps:

- ✅ **Auto-deployment** is active
- ✅ **Every push** triggers deployment
- ✅ **Both projects** deploy automatically
- ✅ **No manual steps** needed

**Just push to GitHub and Vercel handles the rest! 🎉**

---

## 📝 Next Steps

1. **Push code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Watch Vercel:**
   - Dashboard → Deployments
   - See automatic deployment

3. **Visit your URLs:**
   - Frontend: `https://your-frontend.vercel.app`
   - Backend: `https://your-backend.vercel.app`

**Everything is automated! 🚀**

