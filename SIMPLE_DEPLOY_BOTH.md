# 🚀 Simple Deploy - Frontend & Backend to Vercel

## ⚠️ Important Note

**Environment variables ARE required** - but this guide makes it super easy with copy-paste ready values!

---

## 📋 Step 1: Deploy Backend (5 minutes)

### 1.1 Create Backend Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select: `ahmadkhan32/Internet-Billing-System`
5. Click **"Import"**

### 1.2 Configure Backend

**Project Settings:**
- **Project Name**: `internet-billing-backend`
- **Framework Preset**: `Other`
- **Root Directory**: `./` (root - don't change)
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `cd backend && npm install`

### 1.3 Set Environment Variables (Copy-Paste)

Click **"Environment Variables"** → **"Add New"** → Add these **ONE BY ONE**:

**Variable 1:**
- Key: `DB_DIALECT`
- Value: `postgres`

**Variable 2:**
- Key: `DB_HOST`
- Value: `db.qppdkzzmijjyoihzfdxw.supabase.co`

**Variable 3:**
- Key: `DB_PORT`
- Value: `5432`

**Variable 4:**
- Key: `DB_USER`
- Value: `postgres`

**Variable 5:**
- Key: `DB_PASSWORD`
- Value: `3oqj6vL2Tr5BZLaf`

**Variable 6:**
- Key: `DB_NAME`
- Value: `postgres`

**Variable 7:**
- Key: `DB_SSL`
- Value: `true`

**Variable 8:**
- Key: `DB_SSL_REJECT_UNAUTHORIZED`
- Value: `false`

**Variable 9:**
- Key: `JWT_SECRET`
- Value: `2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`

**Variable 10:**
- Key: `JWT_EXPIRE`
- Value: `7d`

**Variable 11:**
- Key: `FRONTEND_URL`
- Value: `https://your-frontend.vercel.app` *(We'll update this after frontend deploys)*

**Variable 12:**
- Key: `NODE_ENV`
- Value: `production`

**Variable 13:**
- Key: `PORT`
- Value: `8000`

**Variable 14:**
- Key: `VERCEL`
- Value: `1`

**For each variable:**
- Select **Production** environment
- Click **"Save"**

### 1.4 Deploy Backend

1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. **Copy your Backend URL** (e.g., `https://internet-billing-backend.vercel.app`)
4. **SAVE THIS URL!** You'll need it for frontend

---

## 📋 Step 2: Deploy Frontend (5 minutes)

### 2.1 Create Frontend Project

1. **Vercel Dashboard** → Click **"Add New Project"** (again)
2. Click **"Import Git Repository"**
3. Select: `ahmadkhan32/Internet-Billing-System` (same repo)
4. Click **"Import"**

### 2.2 Configure Frontend

**Project Settings:**
- **Project Name**: `internet-billing-frontend`
- **Framework Preset**: `Vite` (auto-detected)
- **Root Directory**: `./frontend` ⚠️ **IMPORTANT!**
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### 2.3 Set Environment Variable

Click **"Environment Variables"** → **"Add New"**:

**Variable:**
- Key: `VITE_API_BASE_URL`
- Value: `https://your-backend.vercel.app` 
  - **⚠️ REPLACE `your-backend.vercel.app` with your ACTUAL Backend URL from Step 1.4!**
  - Example: `https://internet-billing-backend.vercel.app`

**Select:** Production environment
**Click:** Save

### 2.4 Deploy Frontend

1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. **Copy your Frontend URL** (e.g., `https://internet-billing-frontend.vercel.app`)
4. **SAVE THIS URL!**

---

## 📋 Step 3: Update Backend (2 minutes)

### 3.1 Update FRONTEND_URL

1. Go to **Backend Project** in Vercel
2. **Settings** → **Environment Variables**
3. Find `FRONTEND_URL`
4. Click **"Edit"**
5. Update value to your **Frontend URL** from Step 2.4
   - Example: `https://internet-billing-frontend.vercel.app`
6. Click **"Save"**

### 3.2 Redeploy Backend

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment (1-2 minutes)

---

## ✅ Step 4: Test Everything (2 minutes)

### 4.1 Test Backend

Visit: `https://your-backend.vercel.app/api/health`

**Expected Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2024-..."
}
```

### 4.2 Test Frontend

Visit: `https://your-frontend.vercel.app`

**Expected:** Login page should load

### 4.3 Test Login

**Super Admin Credentials:**
- **Email**: `admin@billing.com`
- **Password**: `admin123`

**Expected:**
- ✅ Login successful
- ✅ Redirected to Super Admin Dashboard
- ✅ All features working

---

## 📊 Quick Reference

### Your URLs (After Deployment):

- **Backend**: `https://internet-billing-backend.vercel.app`
- **Frontend**: `https://internet-billing-frontend.vercel.app`

### Login Credentials:

- **Super Admin**:
  - Email: `admin@billing.com`
  - Password: `admin123`

### Test Endpoints:

- **Backend Health**: `https://your-backend.vercel.app/api/health`
- **Frontend**: `https://your-frontend.vercel.app`

---

## ✅ Deployment Checklist

- [ ] Backend project created
- [ ] Backend configured (Framework: Other, Root: ./)
- [ ] All 14 backend environment variables set
- [ ] Backend deployed successfully
- [ ] Backend URL copied
- [ ] Frontend project created
- [ ] Frontend configured (Framework: Vite, Root: ./frontend)
- [ ] Frontend environment variable set (with backend URL)
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied
- [ ] Backend FRONTEND_URL updated
- [ ] Backend redeployed
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] Login works with Super Admin credentials

---

## 🆘 Troubleshooting

### Backend Issues:

**Problem:** "Database connection failed"
- ✅ Check all environment variables are set
- ✅ Verify Supabase credentials are correct
- ✅ Check Supabase project is active (not paused)

**Problem:** "404 NOT_FOUND"
- ✅ Check Root Directory is `./` (not `./backend`)
- ✅ Check Framework is `Other` (not Vite)
- ✅ Verify `api/index.js` exists

### Frontend Issues:

**Problem:** "API Error" or "Network Error"
- ✅ Check `VITE_API_BASE_URL` is correct (must be backend URL)
- ✅ Verify backend is deployed and running
- ✅ Check browser console for errors

**Problem:** "vite: command not found"
- ✅ Check Root Directory is `./frontend`
- ✅ Check Framework is `Vite`
- ✅ Verify `frontend/package.json` has vite in dependencies

### Login Issues:

**Problem:** "Invalid credentials"
- ✅ Verify database has been migrated to Supabase
- ✅ Check if Super Admin user exists in Supabase
- ✅ Try: `admin@billing.com` / `admin123`

---

## 🎯 Summary

**Total Time:** ~15 minutes

1. **Deploy Backend** (5 min) - Set 14 environment variables
2. **Deploy Frontend** (5 min) - Set 1 environment variable
3. **Update Backend** (2 min) - Update FRONTEND_URL
4. **Test** (2 min) - Verify everything works

**After deployment:**
- ✅ Auto-deployment enabled (every push to GitHub)
- ✅ Both projects connected
- ✅ Login works with Super Admin
- ✅ All features working

---

## 📝 Environment Variables Summary

### Backend (14 variables):
1. `DB_DIALECT=postgres`
2. `DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co`
3. `DB_PORT=5432`
4. `DB_USER=postgres`
5. `DB_PASSWORD=3oqj6vL2Tr5BZLaf`
6. `DB_NAME=postgres`
7. `DB_SSL=true`
8. `DB_SSL_REJECT_UNAUTHORIZED=false`
9. `JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`
10. `JWT_EXPIRE=7d`
11. `FRONTEND_URL=https://your-frontend.vercel.app`
12. `NODE_ENV=production`
13. `PORT=8000`
14. `VERCEL=1`

### Frontend (1 variable):
1. `VITE_API_BASE_URL=https://your-backend.vercel.app`

---

## 🚀 You're Done!

Follow these steps and your project will be deployed and working! 🎉

**Note:** Environment variables are required for cloud deployments, but this guide makes it as easy as copy-paste! ✅

