# 🚀 Deploy Frontend & Backend Together on Vercel

## ✅ Complete Setup Guide

### 📋 Prerequisites
- ✅ Both frontend and backend code in the same repository
- ✅ `vercel.json` configured in root directory
- ✅ `api/index.js` for backend serverless function
- ✅ All environment variables ready

---

## 🔧 Step 1: Verify Project Structure

Your project should have:
```
Internet Billing System/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vercel.json (optional - for separate deployment)
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
├── api/
│   └── index.js (Vercel serverless function)
├── vercel.json (ROOT - for combined deployment)
└── package.json (root)
```

---

## ⚙️ Step 2: Root vercel.json Configuration

The root `vercel.json` should be:

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd frontend && npm install",
  "framework": "vite",
  "functions": {
    "api/index.js": {
      "maxDuration": 60,
      "memory": 1024
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔐 Step 3: Set Environment Variables in Vercel

### Go to Vercel Dashboard:
1. **Select your project**
2. **Settings** → **Environment Variables**
3. **Add all these variables:**

#### Database (Supabase):
```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

#### JWT:
```
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
```

#### URLs:
```
FRONTEND_URL=https://your-project.vercel.app
NODE_ENV=production
PORT=8000
VERCEL=1
```

#### Frontend API URL:
```
VITE_API_BASE_URL=https://your-project.vercel.app
```

**Important**: Replace `your-project.vercel.app` with your actual Vercel deployment URL!

---

## 📦 Step 4: Push to GitHub

### Option A: Single Repository (Recommended for Combined Deployment)

```bash
# In root directory
git add .
git commit -m "Deploy frontend and backend together on Vercel"
git push origin main
```

### Option B: Separate Repositories

**Frontend Repository:**
```bash
cd frontend
git add .
git commit -m "Update frontend for Vercel deployment"
git push origin main
```

**Backend Repository:**
```bash
cd backend
git add .
git commit -m "Update backend for Vercel deployment"
git push origin main
```

---

## 🚀 Step 5: Deploy on Vercel

### Method 1: Deploy from GitHub (Auto-Deploy)

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click**: "Add New Project"
3. **Import**: Your GitHub repository
4. **Configure**:
   - **Framework Preset**: Vite (or Other)
   - **Root Directory**: `./` (root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`
5. **Environment Variables**: Add all from Step 3
6. **Deploy**: Click "Deploy"

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## ✅ Step 6: Verify Deployment

### Test Backend:
1. Visit: `https://your-project.vercel.app/api/health`
2. Should return: `{"status":"ok","database":"connected"}`

### Test Frontend:
1. Visit: `https://your-project.vercel.app`
2. Should show: Login page or redirect based on auth

### Test API:
1. Visit: `https://your-project.vercel.app/api/auth/login`
2. Should return: API response (not 404)

---

## 🔧 Step 7: Update Frontend API URL

After deployment, get your Vercel URL and update:

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. **Update**: `VITE_API_BASE_URL` = `https://your-actual-vercel-url.vercel.app`
3. **Redeploy**: Trigger a new deployment

---

## 📋 Deployment Checklist

- [ ] Root `vercel.json` configured correctly
- [ ] `api/index.js` exists and is correct
- [ ] All environment variables set in Vercel
- [ ] Frontend builds successfully
- [ ] Backend serverless function works
- [ ] API routes accessible (`/api/*`)
- [ ] Frontend routes work (React Router)
- [ ] Database connection works
- [ ] Login works
- [ ] Super Admin redirects to `/super-admin/dashboard`

---

## 🎯 URLs After Deployment

### Your Deployment URLs:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.vercel.app/api/*`
- **Health Check**: `https://your-project.vercel.app/api/health`

### Set in Environment Variables:
- `FRONTEND_URL` = `https://your-project.vercel.app`
- `VITE_API_BASE_URL` = `https://your-project.vercel.app`

---

## 🐛 Troubleshooting

### Issue: "Route not found" on login page
**Fix**: Ensure `vercel.json` has the rewrite rule:
```json
{
  "source": "/(.*)",
  "destination": "/index.html"
}
```

### Issue: API returns 404
**Fix**: Ensure `vercel.json` has the API rewrite:
```json
{
  "source": "/api/(.*)",
  "destination": "/api/index.js"
}
```

### Issue: Database connection fails
**Fix**: 
1. Check all database environment variables are set
2. Verify Supabase credentials
3. Check database firewall settings

### Issue: Frontend can't connect to backend
**Fix**: 
1. Set `VITE_API_BASE_URL` = your Vercel URL
2. Redeploy frontend

---

## ✅ Success!

After deployment:
- ✅ Frontend accessible at root URL
- ✅ Backend API accessible at `/api/*`
- ✅ Both work together seamlessly
- ✅ Super Admin redirects correctly
- ✅ All routes work properly

---

**Your frontend and backend are now deployed together on Vercel! 🚀**

