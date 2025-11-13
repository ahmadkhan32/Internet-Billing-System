# ✅ Vercel Deployment Fix - Complete Solution

## 🐛 Issues Found and Fixed

### Problem 1: 404 NOT_FOUND Error
**Root Cause:** The `vercel.json` was only configured for the backend API, not the frontend. When users visited the root URL, Vercel couldn't find the frontend build.

**Fix:** Updated `vercel.json` to:
- Build the frontend using Vite
- Serve the frontend from `frontend/dist`
- Route `/api/*` requests to the serverless function
- Route all other requests to the frontend `index.html`

### Problem 2: API Handler Configuration
**Root Cause:** The API handler wasn't properly exporting the Express app for Vercel serverless functions.

**Fix:** Simplified `api/index.js` to directly export the Express app (Vercel handles this automatically).

### Problem 3: Frontend API URL
**Root Cause:** Frontend was hardcoded to use `http://localhost:8000/api`, which wouldn't work on Vercel.

**Fix:** Changed `frontend/src/utils/constants.js` to use relative path `/api` when no environment variable is set, allowing same-domain deployment.

---

## 📋 Changes Made

### 1. `vercel.json` - Complete Rewrite
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd backend && npm install && cd ../frontend && npm install",
  "framework": "vite",
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

**What this does:**
- Installs dependencies for both backend and frontend
- Builds the frontend using Vite
- Routes API requests to the serverless function
- Routes all other requests to the frontend

### 2. `api/index.js` - Simplified Export
```javascript
const app = require('../backend/server');
module.exports = app;
```

**What this does:**
- Exports the Express app directly (Vercel handles the serverless wrapper)

### 3. `frontend/src/utils/constants.js` - Relative API Path
```javascript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
```

**What this does:**
- Uses environment variable if set (for separate deployments)
- Falls back to relative path `/api` (for same-domain deployment)

---

## 🚀 Deployment Steps

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Sign in to your account

### Step 2: Import/Update Project
**If you already have a project:**
1. Go to your project settings
2. Click **"Redeploy"** on the latest deployment
3. Vercel will automatically pull the latest changes from GitHub

**If creating a new project:**
1. Click **"Add New Project"**
2. Import from GitHub: **Internet-Billing-System**
3. Click **"Import"**

### Step 3: Configure Project Settings

**Framework Preset:** Vite (should auto-detect)

**Root Directory:** `/` (root of repository)

**Build Settings:**
- **Build Command:** `cd frontend && npm install && npm run build` (auto-filled)
- **Output Directory:** `frontend/dist` (auto-filled)
- **Install Command:** `cd backend && npm install && cd ../frontend && npm install` (auto-filled)

**⚠️ Important:** Make sure these match exactly!

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

#### Required Variables:
```
NODE_ENV=production
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=your-database-name
JWT_SECRET=your-random-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-project.vercel.app
```

#### Optional Variables (for email):
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Note:** You don't need to set `VITE_API_BASE_URL` - the frontend will use `/api` automatically!

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://your-project.vercel.app`

---

## ✅ Verification

After deployment, test these URLs:

1. **Frontend:** `https://your-project.vercel.app`
   - Should show your login page

2. **API Health Check:** `https://your-project.vercel.app/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

3. **API Login:** `https://your-project.vercel.app/api/auth/login`
   - Should be accessible (test with Postman or curl)

---

## 🔧 How It Works

### Request Flow:
1. User visits `https://your-project.vercel.app`
   - Vercel serves the frontend from `frontend/dist/index.html`

2. Frontend makes API call to `/api/auth/login`
   - Vercel routes `/api/*` to `api/index.js` serverless function
   - Express app handles the request
   - Response sent back to frontend

3. All routes work:
   - `/` → Frontend
   - `/dashboard` → Frontend (React Router handles it)
   - `/api/*` → Backend serverless function

---

## 🐛 Troubleshooting

### Still Getting 404?
1. **Check Build Logs:**
   - Go to Vercel dashboard → Your project → Deployments → Latest deployment
   - Check if frontend build succeeded
   - Look for errors in the logs

2. **Verify vercel.json:**
   - Make sure it's in the root directory
   - Check that paths are correct

3. **Check Environment Variables:**
   - Ensure all required variables are set
   - Verify database connection details are correct

### API Returns 404?
1. **Check API Function:**
   - Go to Vercel dashboard → Functions tab
   - Verify `api/index.js` is listed
   - Check function logs for errors

2. **Test API Directly:**
   ```bash
   curl https://your-project.vercel.app/api/health
   ```

3. **Check Database Connection:**
   - Verify database credentials in environment variables
   - Ensure database allows connections from Vercel IPs

### Frontend Can't Connect to API?
1. **Check Browser Console:**
   - Open DevTools → Console
   - Look for CORS or network errors

2. **Verify API_BASE_URL:**
   - Should be `/api` (relative path)
   - Check `frontend/src/utils/constants.js`

3. **Check CORS Settings:**
   - Verify `FRONTEND_URL` environment variable matches your Vercel URL
   - Check `backend/server.js` CORS configuration

---

## 📝 Important Notes

### Database Requirements
- You need a **MySQL database** accessible from the internet
- Recommended providers:
  - **PlanetScale** (free tier) - https://planetscale.com
  - **Railway** (free tier) - https://railway.app
  - **Render** (free tier) - https://render.com

### File Uploads
- Static file serving (`/uploads`) **won't work** in serverless mode
- Consider using:
  - **Vercel Blob Storage** (recommended)
  - **AWS S3**
  - **Cloudinary**

### Cold Starts
- First request after inactivity may take 5-10 seconds
- This is normal for serverless functions
- Consider Vercel Pro for better performance

### Scheduled Jobs
- The monthly scheduler is disabled in serverless mode
- Use **Vercel Cron Jobs** or external services for scheduled tasks

---

## 🎉 Success!

Your application should now be fully deployed on Vercel with both frontend and backend working!

**Your URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-project.vercel.app/api`

**Next Steps:**
1. Test all functionality
2. Set up your database
3. Configure email settings (if needed)
4. Set up file storage for uploads (if needed)

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Serverless Functions:** https://vercel.com/docs/functions
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html#vercel

---

**Need Help?** Check the deployment logs in Vercel dashboard for detailed error messages.

