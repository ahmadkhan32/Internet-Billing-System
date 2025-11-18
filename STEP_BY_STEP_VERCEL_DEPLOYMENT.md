# Step-by-Step Vercel Deployment Guide

## 🎯 Two Deployment Options

### Option 1: Separate Projects (Recommended)
- Deploy Frontend and Backend as separate Vercel projects
- Easier to manage and scale independently
- Better for production

### Option 2: Monorepo (Single Project)
- Deploy both from same repository
- Uses `vercel.json` configuration
- Simpler for small projects

---

## Option 1: Separate Projects (Recommended)

### Part A: Deploy Backend

#### Step 1: Create Backend Project in Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:

**Project Settings:**
- **Project Name**: `internet-billing-backend`
- **Framework Preset**: **Other**
- **Root Directory**: `./` (leave as root)
- **Build Command**: Leave empty
- **Output Directory**: Leave empty
- **Install Command**: `cd backend && npm install`

**DO NOT CLICK DEPLOY YET!**

#### Step 2: Set Environment Variables

Click **"Environment Variables"** and add these **ONE BY ONE**:

```
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-supabase-password-here
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=generate-this-below
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=8000
VERCEL=1
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Important:**
- Replace `xxxxx` with your Supabase host
- Replace `your-supabase-password-here` with your Supabase password
- Replace `your-frontend.vercel.app` with your frontend URL (after deploying frontend)

#### Step 3: Configure Build Settings

1. Click **"Settings"** tab
2. Go to **"General"**
3. Under **"Build & Development Settings"**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `cd backend && npm install`

#### Step 4: Configure Serverless Function

1. Go to **"Settings"** → **"Functions"**
2. Ensure `api/index.js` is configured
3. Set **Max Duration**: 60 seconds

#### Step 5: Deploy Backend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Copy your backend URL: `https://internet-billing-backend.vercel.app`
4. **Save this URL!** You'll need it for frontend

#### Step 6: Test Backend

Visit: `https://internet-billing-backend.vercel.app/api/health`

Should show: `{"status":"ok","database":"connected"}`

---

### Part B: Deploy Frontend

#### Step 1: Create Frontend Project in Vercel

1. Vercel Dashboard → **"Add New Project"**
2. Import same GitHub repository
3. Configure:

**Project Settings:**
- **Project Name**: `internet-billing-frontend`
- **Framework Preset**: **Vite**
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**DO NOT CLICK DEPLOY YET!**

#### Step 2: Set Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_BASE_URL=https://internet-billing-backend.vercel.app
```

**Replace with your actual backend URL!**

#### Step 3: Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Copy your frontend URL: `https://internet-billing-frontend.vercel.app`

#### Step 4: Update Backend FRONTEND_URL

1. Go to Backend project in Vercel
2. **Settings** → **Environment Variables**
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://internet-billing-frontend.vercel.app
   ```
4. **Redeploy** backend

---

## Option 2: Monorepo (Single Project)

### Step 1: Update vercel.json

Your `vercel.json` should look like this:

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd backend && npm install && cd ../frontend && npm install",
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

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect settings from `vercel.json`
5. Set environment variables (same as Option 1)
6. Click **"Deploy"**

---

## Environment Variables Checklist

### Backend (Required)

- [ ] `DB_DIALECT=postgres`
- [ ] `DB_HOST=db.xxxxx.supabase.co`
- [ ] `DB_PORT=5432`
- [ ] `DB_USER=postgres`
- [ ] `DB_PASSWORD=your-password`
- [ ] `DB_NAME=postgres`
- [ ] `DB_SSL=true`
- [ ] `DB_SSL_REJECT_UNAUTHORIZED=false`
- [ ] `JWT_SECRET=32-char-secret`
- [ ] `JWT_EXPIRE=7d`
- [ ] `FRONTEND_URL=https://your-frontend.vercel.app`
- [ ] `NODE_ENV=production`
- [ ] `PORT=8000`
- [ ] `VERCEL=1`

### Frontend (Required)

- [ ] `VITE_API_BASE_URL=https://your-backend.vercel.app`

---

## Getting Supabase Credentials

1. **Supabase Dashboard** → Your Project
2. **Settings** → **Database**
3. Find **"Connection string"** section
4. Copy **URI** connection string
5. Extract:
   - **Host**: `db.xxxxx.supabase.co`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: (your project password)
   - **Database**: `postgres`

---

## Testing After Deployment

### 1. Test Backend Health
```
https://your-backend.vercel.app/api/health
```
Expected: `{"status":"ok","database":"connected"}`

### 2. Test Frontend
```
https://your-frontend.vercel.app
```
Expected: Login page loads

### 3. Test Login
- Use your existing credentials
- Super Admin: `admin@billing.com` / `admin123`
- Business Admin: Your business credentials

---

## Troubleshooting

### Backend Issues

**Problem:** "Database connection failed"
- ✅ Check all environment variables are set
- ✅ Verify Supabase credentials
- ✅ Ensure `DB_SSL=true`
- ✅ Check Supabase project is active

**Problem:** "Cannot read properties of undefined"
- ✅ Redeploy after setting all environment variables
- ✅ Check Vercel function logs

### Frontend Issues

**Problem:** "API Error" or "Network Error"
- ✅ Check `VITE_API_BASE_URL` is correct
- ✅ Verify backend is deployed and running
- ✅ Check CORS settings in backend

**Problem:** "404 Not Found" on routes
- ✅ Check `vercel.json` rewrites configuration
- ✅ Ensure `outputDirectory` is `frontend/dist`

---

## Quick Reference

### Backend URL Format
```
https://your-backend-name.vercel.app
```

### Frontend URL Format
```
https://your-frontend-name.vercel.app
```

### API Endpoints
```
https://your-backend.vercel.app/api/health
https://your-backend.vercel.app/api/auth/login
https://your-backend.vercel.app/api/diagnose
```

---

## ✅ Deployment Checklist

- [ ] Supabase project created
- [ ] Database schema migrated
- [ ] Data migrated from XAMPP
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] All environment variables set
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] Login works with existing credentials
- [ ] All features working

---

**See `COMPLETE_MIGRATION_AND_DEPLOYMENT_GUIDE.md` for full migration guide.**

