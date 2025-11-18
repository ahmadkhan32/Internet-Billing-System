# 🔗 Frontend vs Backend URLs - Complete Guide

## 🎯 Understanding the URLs

When you deploy to Vercel, you get **TWO separate URLs**:

1. **Backend URL** - Your API server (handles `/api/*` routes)
2. **Frontend URL** - Your React app (the user interface)

---

## 📍 How to Get Your URLs

### Step 1: Deploy Backend First

1. **Vercel Dashboard** → **Add New Project**
2. **Import** your GitHub repository
3. **Configure:**
   - **Framework**: `Other`
   - **Root Directory**: `./` (root)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `cd backend && npm install`
4. **Set Environment Variables** (see below)
5. **Deploy**
6. **After deployment**, you'll see your **Backend URL**:
   - Example: `https://internet-billing-backend.vercel.app`
   - **Copy this URL!** ✅

### Step 2: Deploy Frontend Second

1. **Vercel Dashboard** → **Add New Project** (again)
2. **Import** same GitHub repository
3. **Configure:**
   - **Framework**: `Vite` (auto-detected)
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Set Environment Variable** (see below)
5. **Deploy**
6. **After deployment**, you'll see your **Frontend URL**:
   - Example: `https://internet-billing-frontend.vercel.app`
   - **Copy this URL!** ✅

---

## 🔐 Which URL Goes Where?

### Backend Project Environment Variables:

**Set `FRONTEND_URL` to your Frontend URL:**

```
FRONTEND_URL=https://internet-billing-frontend.vercel.app
```

**Why?** Backend needs to know frontend URL for CORS (Cross-Origin Resource Sharing).

### Frontend Project Environment Variable:

**Set `VITE_API_BASE_URL` to your Backend URL:**

```
VITE_API_BASE_URL=https://internet-billing-backend.vercel.app
```

**Why?** Frontend needs to know backend URL to make API calls.

---

## 📋 Complete Example

Let's say after deployment you get:

- **Backend URL**: `https://internet-billing-backend-abc123.vercel.app`
- **Frontend URL**: `https://internet-billing-frontend-xyz789.vercel.app`

### Backend Project Settings:

Go to **Backend Project** → **Settings** → **Environment Variables**:

```
FRONTEND_URL=https://internet-billing-frontend-xyz789.vercel.app
```

### Frontend Project Settings:

Go to **Frontend Project** → **Settings** → **Environment Variables**:

```
VITE_API_BASE_URL=https://internet-billing-backend-abc123.vercel.app
```

---

## ✅ Step-by-Step Setup

### 1. Deploy Backend

1. Create backend project in Vercel
2. Set all backend environment variables (except `FRONTEND_URL`)
3. Deploy
4. **Copy Backend URL** (e.g., `https://my-backend.vercel.app`)

### 2. Deploy Frontend

1. Create frontend project in Vercel
2. Set `VITE_API_BASE_URL` = `https://my-backend.vercel.app` (use your backend URL)
3. Deploy
4. **Copy Frontend URL** (e.g., `https://my-frontend.vercel.app`)

### 3. Update Backend

1. Go back to **Backend Project**
2. **Settings** → **Environment Variables**
3. Add/Update: `FRONTEND_URL` = `https://my-frontend.vercel.app` (use your frontend URL)
4. **Redeploy** backend

---

## 🎯 Quick Reference Table

| Project | Variable Name | Value | Example |
|---------|--------------|-------|---------|
| **Backend** | `FRONTEND_URL` | Your **Frontend URL** | `https://internet-billing-frontend.vercel.app` |
| **Frontend** | `VITE_API_BASE_URL` | Your **Backend URL** | `https://internet-billing-backend.vercel.app` |

---

## 🔍 How to Find Your URLs

### After Deployment:

1. **Vercel Dashboard** → Your Project
2. Click on the **latest deployment**
3. You'll see the **URL** at the top:
   - Example: `https://your-project-name.vercel.app`
4. **Copy this URL**

### Or:

1. **Vercel Dashboard** → Your Project
2. **Settings** → **Domains**
3. You'll see your deployment URL listed

---

## ⚠️ Important Notes

1. **Deploy Backend First** - You need backend URL for frontend
2. **Deploy Frontend Second** - Use backend URL in frontend env var
3. **Update Backend Last** - Add frontend URL to backend after frontend is deployed
4. **Redeploy After Updates** - Changes to env vars require redeployment

---

## 🆘 Common Mistakes

### ❌ WRONG:
- Setting `FRONTEND_URL` to backend URL
- Setting `VITE_API_BASE_URL` to frontend URL
- Using localhost URLs in production
- Forgetting to update `FRONTEND_URL` after frontend deployment

### ✅ CORRECT:
- `FRONTEND_URL` = Frontend Vercel URL (in backend project)
- `VITE_API_BASE_URL` = Backend Vercel URL (in frontend project)
- Both use `https://` URLs
- Update `FRONTEND_URL` after frontend is deployed

---

## 📝 Complete Environment Variables

### Backend Project (All Variables):

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
FRONTEND_URL=https://your-frontend.vercel.app  ← Frontend URL here
NODE_ENV=production
PORT=8000
VERCEL=1
```

### Frontend Project (One Variable):

```
VITE_API_BASE_URL=https://your-backend.vercel.app  ← Backend URL here
```

---

## 🚀 Deployment Order

1. ✅ Deploy Backend → Get Backend URL
2. ✅ Deploy Frontend (use Backend URL) → Get Frontend URL
3. ✅ Update Backend (add Frontend URL) → Redeploy Backend
4. ✅ Test both URLs

---

## ✅ Verification

After setup:

1. **Backend Health**: `https://your-backend.vercel.app/api/health`
   - Should show: `{"status":"ok","database":"connected"}`

2. **Frontend**: `https://your-frontend.vercel.app`
   - Should show login page

3. **Login Test**: Use `admin@billing.com` / `admin123`
   - Should work and redirect to dashboard

---

**Remember: Frontend URL goes in Backend, Backend URL goes in Frontend! 🔄**

