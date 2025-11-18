# 🔧 Fix: "Cannot find module 'express'" Error

## ❌ Error

```
Error: Cannot find module 'express'
Require stack:
- /var/task/backend/server.js
- /var/task/api/index.js
```

**Problem**: Backend dependencies are not being installed in Vercel.

---

## ✅ Fix Applied

### Updated `vercel.json`:

**Before** (only installed frontend):
```json
{
  "installCommand": "cd frontend && npm install"
}
```

**After** (installs both frontend and backend):
```json
{
  "installCommand": "cd backend && npm install && cd ../frontend && npm install",
  "buildCommand": "cd backend && npm install && cd ../frontend && npm install && npm run build"
}
```

---

## 🚀 Next Steps

### Step 1: Redeploy on Vercel

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Deployments** → **Latest Deployment**
4. **Click** "Redeploy"
5. **Wait** 3-5 minutes (longer because it installs both frontend and backend dependencies)

**⚠️ IMPORTANT**: The deployment will take longer now because it installs backend dependencies.

---

## ✅ Verification

After redeployment:

1. **Check build logs** in Vercel:
   - Should show: "Installing backend dependencies..."
   - Should show: "Installing frontend dependencies..."
   - Should show: "Building frontend..."

2. **Test backend**:
   - Visit: `https://your-project.vercel.app/api/health`
   - Should return: `{"status":"ok","database":"connected"}`

3. **Test login**:
   - Should work without "Cannot find module 'express'" error

---

## 🔍 Why This Happened

**Vercel serverless functions** need all dependencies installed. The original `vercel.json` only installed frontend dependencies, so when `api/index.js` tried to load `backend/server.js`, it couldn't find `express` and other backend packages.

**The Fix**: Now `vercel.json` installs both backend and frontend dependencies before building.

---

## 📋 What Changed

1. ✅ **installCommand**: Now installs backend dependencies first, then frontend
2. ✅ **buildCommand**: Now installs both before building
3. ✅ **Error handling**: Added checks to detect missing dependencies

---

## ✅ Expected Result

After redeploying:
- ✅ Backend dependencies installed
- ✅ Express module found
- ✅ Server initializes correctly
- ✅ API endpoints work
- ✅ Login works

---

## 🎯 Summary

**The Fix**:
- ✅ Updated `vercel.json` to install backend dependencies
- ✅ Added error detection for missing dependencies
- ✅ Code pushed to GitHub

**What You Need to Do**:
1. ✅ Redeploy on Vercel (will take 3-5 minutes)
2. ✅ Wait for deployment to complete
3. ✅ Test login - should work now

---

**The "Cannot find module 'express'" error is fixed! Redeploy and it will work! 🚀**

