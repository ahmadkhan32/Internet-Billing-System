# 🚀 Separate Frontend & Backend Deployment to Vercel

## 📋 Deploy Backend and Frontend as Separate Projects

This guide shows you how to deploy frontend and backend **separately** in Vercel with correct install and build commands.

---

## 🔧 Part 1: Deploy Backend (Separate Project)

### Step 1: Create Backend Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select: `ahmadkhan32/Internet-Billing-System`
5. Click **"Import"**

### Step 2: Configure Backend Project Settings

**Project Settings:**
- **Project Name**: `internet-billing-backend`
- **Framework Preset**: `Other`
- **Root Directory**: `./` (root of repository)
- **Build Command**: (leave **EMPTY** - no build needed for backend)
- **Output Directory**: (leave **EMPTY**)
- **Install Command**: `cd backend && npm install`

**Important:**
- ✅ Root Directory must be `./` (root, NOT `./backend`)
- ✅ Build Command must be **EMPTY**
- ✅ Output Directory must be **EMPTY**
- ✅ Install Command: `cd backend && npm install`

### Step 3: Set Backend Environment Variables

Click **"Environment Variables"** → Add these **ONE BY ONE**:

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

**Note:** Update `FRONTEND_URL` after frontend deploys.

### Step 4: Deploy Backend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy your Backend URL** (e.g., `https://internet-billing-backend.vercel.app`)
4. **Save this URL!** You'll need it for frontend

### Step 5: Test Backend

Visit: `https://your-backend.vercel.app/api/health`

**Expected Response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## 🎨 Part 2: Deploy Frontend (Separate Project)

### Step 1: Create Frontend Project

1. In Vercel Dashboard, click **"Add New Project"** again
2. Click **"Import Git Repository"**
3. Select the **same repository**: `ahmadkhan32/Internet-Billing-System`
4. Click **"Import"**

### Step 2: Configure Frontend Project Settings

**Project Settings:**
- **Project Name**: `internet-billing-frontend`
- **Framework Preset**: `Vite` (Vercel will auto-detect)
- **Root Directory**: `./frontend` ⚠️ **IMPORTANT!**
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Important:**
- ✅ Root Directory must be `./frontend` (NOT root)
- ✅ Framework Preset: `Vite` (auto-detected)
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

### Step 3: Set Frontend Environment Variable

Click **"Environment Variables"** → Add:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

**Replace `your-backend.vercel.app` with your actual Backend URL from Part 1!**

### Step 4: Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy your Frontend URL** (e.g., `https://internet-billing-frontend.vercel.app`)
4. **Save this URL!**

### Step 5: Test Frontend

Visit: `https://your-frontend.vercel.app`

**Expected:** Login page appears

---

## 🔄 Part 3: Update Backend with Frontend URL

### Step 1: Update Environment Variable

1. Go to **Backend Project** in Vercel
2. **Settings** → **Environment Variables**
3. Find `FRONTEND_URL`
4. Click **"Edit"**
5. Update value to your **Frontend URL** from Part 2
6. Click **"Save"**

### Step 2: Redeploy Backend

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment to complete

---

## ✅ Configuration Summary

### Backend Project Configuration:

```
Project Name: internet-billing-backend
Framework: Other
Root Directory: ./
Build Command: (empty)
Output Directory: (empty)
Install Command: cd backend && npm install
```

**Environment Variables:** 14 variables (see Step 3 above)

### Frontend Project Configuration:

```
Project Name: internet-billing-frontend
Framework: Vite
Root Directory: ./frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Environment Variables:** 1 variable (`VITE_API_BASE_URL`)

---

## 🎯 Why Separate Projects?

### Benefits:
- ✅ **Independent Scaling**: Scale frontend and backend separately
- ✅ **Independent Deployments**: Deploy one without affecting the other
- ✅ **Better Organization**: Clear separation of concerns
- ✅ **Easier Management**: Manage each project independently
- ✅ **Different Settings**: Different configurations for each

---

## 📊 Build Process

### Backend Build:
1. **Install**: `cd backend && npm install`
   - Installs all backend dependencies
   - No build step needed (serverless functions)
2. **Deploy**: Vercel creates serverless functions from `api/index.js`

### Frontend Build:
1. **Install**: `npm install` (in `./frontend` directory)
   - Installs all frontend dependencies (including Vite)
2. **Build**: `npm run build`
   - Vite builds the React app
   - Outputs to `dist` directory
3. **Deploy**: Vercel serves static files from `dist`

---

## ✅ Verification Checklist

### Backend:
- [ ] Project created with correct settings
- [ ] Root Directory: `./` (root)
- [ ] Install Command: `cd backend && npm install`
- [ ] Build Command: (empty)
- [ ] All 14 environment variables set
- [ ] Deployed successfully
- [ ] Health check passes: `/api/health`
- [ ] Backend URL copied

### Frontend:
- [ ] Project created with correct settings
- [ ] Root Directory: `./frontend`
- [ ] Framework: `Vite`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`
- [ ] Environment variable set (`VITE_API_BASE_URL`)
- [ ] Deployed successfully
- [ ] Frontend URL copied

### Final:
- [ ] Backend `FRONTEND_URL` updated
- [ ] Backend redeployed
- [ ] Frontend loads correctly
- [ ] Login works: `admin@billing.com` / `admin123`

---

## 🆘 Troubleshooting

### Backend Issues:

**Problem:** Build fails
- ✅ Check Root Directory is `./` (not `./backend`)
- ✅ Check Install Command: `cd backend && npm install`
- ✅ Check Build Command is **EMPTY**

**Problem:** "Cannot find module"
- ✅ Check `backend/package.json` exists
- ✅ Check Install Command is correct
- ✅ Check deployment logs

### Frontend Issues:

**Problem:** "Vite: command not found"
- ✅ Check Root Directory is `./frontend`
- ✅ Check Install Command: `npm install`
- ✅ Check `frontend/package.json` has `vite` in dependencies

**Problem:** Build fails
- ✅ Check Build Command: `npm run build`
- ✅ Check Output Directory: `dist`
- ✅ Check `frontend/vite.config.js` exists

---

## 🚀 Auto-Deployment

**After first deployment:**
- ✅ Both projects are connected to GitHub
- ✅ Every `git push` triggers automatic deployment
- ✅ Frontend and backend deploy independently
- ✅ No manual steps needed!

---

## 📝 Quick Reference

### Backend URLs:
- **API Health**: `https://your-backend.vercel.app/api/health`
- **API Base**: `https://your-backend.vercel.app/api`

### Frontend URLs:
- **App**: `https://your-frontend.vercel.app`
- **Login**: `https://your-frontend.vercel.app/login`

### Login Credentials:
- **Email**: `admin@billing.com`
- **Password**: `admin123`

---

## ✅ You're Done!

After following these steps:

- ✅ **Backend**: Deployed separately with correct install command
- ✅ **Frontend**: Deployed separately with correct build command
- ✅ **Both**: Running correctly and independently
- ✅ **Auto-Deploy**: Enabled for both projects

**Your Internet Billing System is now fully deployed! 🎉**

---

**Follow the steps above to deploy frontend and backend separately in Vercel! 🚀**

