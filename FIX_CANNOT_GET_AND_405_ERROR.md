# 🔧 Fix "Cannot GET /" and 405 Error

## ❌ Error Messages

1. **"Cannot GET /"** - Frontend routing issue
2. **"Request failed with status code 405"** - API method not allowed

## ✅ Solutions

### Issue 1: "Cannot GET /" - Frontend Routing

**Problem:** Vercel doesn't know how to handle React Router routes.

**Solution:** Fixed `frontend/vercel.json` to properly serve `index.html` for all routes.

**Fixed:**
- Removed incorrect `/api` rewrite (not needed for separate frontend)
- Kept SPA rewrite to serve `index.html` for all routes

### Issue 2: 405 Error - API Method Not Allowed

**Problem:** `VITE_API_BASE_URL` not set or incorrect, causing API calls to fail.

**Solution:** Set `VITE_API_BASE_URL` environment variable in Vercel.

---

## 🔧 What Was Fixed

### 1. Frontend vercel.json

**Before:**
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"  // ❌ Wrong - not needed for separate frontend
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**After:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"  // ✅ Correct - serves index.html for all routes
    }
  ]
}
```

### 2. Environment Variable

**Must Set in Vercel Frontend Project:**
```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

**Where to Set:**
- Vercel Dashboard → Frontend Project → Settings → Environment Variables

---

## 📋 Step-by-Step Fix

### Step 1: Set VITE_API_BASE_URL

1. **Vercel Dashboard** → Your Frontend Project
2. **Settings** → **Environment Variables**
3. **Add New:**
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend.vercel.app` (your actual backend URL)
   - **Environment**: Production
4. **Save**

### Step 2: Redeploy Frontend

1. **Deployments** tab
2. Click **"..."** → **"Redeploy"**
3. Wait for deployment

### Step 3: Verify

1. Visit: `https://your-frontend.vercel.app`
2. Should show login page (not "Cannot GET /")
3. Try login - should work (not 405 error)

---

## 🔍 How API_BASE_URL Works

### In Code (`frontend/src/utils/constants.js`):

```javascript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
```

**If `VITE_API_BASE_URL` is set:**
- Uses that URL (e.g., `https://backend.vercel.app`)
- Makes API calls to backend domain

**If NOT set:**
- Defaults to `/api` (relative path)
- Only works if frontend and backend are on same domain
- **Won't work for separate deployments!**

---

## ✅ Correct Configuration

### Frontend Project in Vercel:

**Settings:**
- Framework: `Vite`
- Root: `./` (or `./frontend` if using monorepo)
- Build: `npm run build`
- Output: `dist`

**Environment Variable:**
- `VITE_API_BASE_URL` = `https://your-backend.vercel.app`

**vercel.json:**
- Rewrites all routes to `index.html` (SPA routing)

### Backend Project in Vercel:

**Settings:**
- Framework: `Other`
- Root: `./`
- Install: `cd backend && npm install`

**Environment Variables:**
- All 14 backend variables (see other guides)

---

## 🆘 Troubleshooting

### Still Getting "Cannot GET /":

1. **Check vercel.json:**
   - Should have rewrite to `/index.html`
   - Should NOT have `/api` rewrite

2. **Check Vercel Settings:**
   - Output Directory: `dist`
   - Framework: `Vite`

3. **Redeploy:**
   - Deployments → Redeploy

### Still Getting 405 Error:

1. **Check Environment Variable:**
   - `VITE_API_BASE_URL` is set
   - Value is correct backend URL
   - No trailing slash

2. **Check Backend:**
   - Backend is deployed and running
   - Health check works: `https://backend.vercel.app/api/health`

3. **Check Browser Console:**
   - See what URL is being called
   - Check for CORS errors

### Check API URL:

Open browser console and check:
```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
```

Should show your backend URL, not undefined!

---

## 📊 Expected Behavior

### After Fix:

1. **Visit Frontend:**
   - `https://your-frontend.vercel.app` → Shows login page ✅
   - `https://your-frontend.vercel.app/dashboard` → Shows dashboard ✅
   - All routes work (no "Cannot GET /") ✅

2. **API Calls:**
   - Login request → `https://your-backend.vercel.app/api/auth/login` ✅
   - No 405 errors ✅
   - API works correctly ✅

---

## ✅ Verification Checklist

- [ ] `VITE_API_BASE_URL` is set in Vercel Frontend Project
- [ ] Value is correct backend URL (no trailing slash)
- [ ] Frontend redeployed after setting variable
- [ ] `vercel.json` has correct rewrites
- [ ] Frontend loads without "Cannot GET /"
- [ ] Login works without 405 error
- [ ] API calls go to correct backend URL

---

## 🚀 Quick Fix

1. **Set Environment Variable:**
   - Frontend Project → Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend.vercel.app`

2. **Redeploy Frontend**

3. **Test:**
   - Visit frontend URL
   - Should work! ✅

---

**The fix is applied! Set VITE_API_BASE_URL and redeploy! 🚀**

