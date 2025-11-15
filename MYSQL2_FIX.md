# 🔧 mysql2 Package Missing - Complete Fix

## ❌ Error
```
Error: Please install mysql2 package manually
```

## 🔍 Root Cause

The `mysql2` package is not being installed in the Vercel deployment. This happens because:
1. Vercel needs to install backend dependencies
2. The build command might not be installing dependencies correctly
3. Environment variables are also missing

## ✅ Fix Applied

### 1. Updated `vercel.json`
- Added `--production=false` to ensure all dependencies are installed
- Updated build command to install backend dependencies first
- Ensured both backend and frontend dependencies are installed

### 2. Updated `backend/config/db.js`
- Added check for mysql2 package before using it
- Better error messages for Vercel deployment
- Clear instructions on what to do

### 3. Created `.vercelignore`
- Ensures unnecessary files aren't deployed

## 🚀 Deployment Steps

### Step 1: Set Environment Variables in Vercel

**CRITICAL:** You MUST set these in Vercel before deploying:

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
NODE_ENV=production
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-32-character-secret-key
```

**For each variable:**
- ✅ Check **Production**
- ✅ Check **Preview**
- Click **Save**

### Step 2: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. **Wait for build to complete**

### Step 3: Check Build Logs

During deployment, check the build logs for:
- ✅ `cd backend && npm install` - Should install all dependencies
- ✅ `mysql2` should be installed
- ✅ No errors about missing packages

## 🐛 If Still Getting mysql2 Error

### Option 1: Check Build Logs
1. Go to Vercel Dashboard → Deployments
2. Click on the latest deployment
3. Check **Build Logs**
4. Look for `npm install` output
5. Verify `mysql2` is being installed

### Option 2: Verify package.json
Ensure `backend/package.json` has:
```json
"dependencies": {
  "mysql2": "^3.6.5",
  ...
}
```

### Option 3: Manual Fix
If build logs show mysql2 is not installing:

1. **Check vercel.json:**
   ```json
   {
     "installCommand": "cd backend && npm install --production=false && cd ../frontend && npm install"
   }
   ```

2. **Verify backend directory exists** in your repository

3. **Check that backend/package.json** is committed to Git

## 📋 Verification Checklist

After deployment:

- [ ] Environment variables are set in Vercel
- [ ] Build logs show `mysql2` being installed
- [ ] No errors in build logs
- [ ] Health endpoint works: `https://your-app.vercel.app/api/health`
- [ ] Login works: `admin@billing.com` / `admin123`

## 🔍 Debugging

### Check Function Logs:
1. Vercel Dashboard → Functions → `api/index.js`
2. Check logs for:
   - `mysql2` installation messages
   - Database connection errors
   - Environment variable status

### Test Locally:
```bash
cd backend
npm install
node server.js
```

If it works locally but not on Vercel, it's a deployment configuration issue.

---

**Status:** ✅ Fix applied and ready for deployment

