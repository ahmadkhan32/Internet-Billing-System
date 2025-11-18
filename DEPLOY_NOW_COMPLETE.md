# 🚀 Complete Deployment Guide - Ready to Deploy!

## ✅ Your Credentials (Already Set)

### Supabase Database:
- **Host**: `db.qppdkzzmijjyoihzfdxw.supabase.co`
- **Port**: `5432`
- **User**: `postgres`
- **Password**: `3oqj6vL2Tr5BZLaf`
- **Database**: `postgres`
- **Supabase URL**: `https://qppdkzzmijjyoihzfdxw.supabase.co`

### JWT Secret:
- **JWT_SECRET**: `2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`

---

## 📋 Step 1: Deploy Backend to Vercel

### 1.1 Create Backend Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `https://github.com/ahmadkhan32/Internet-Billing-System.git`
4. Configure project:

**Project Settings:**
- **Project Name**: `internet-billing-backend` (or any name you prefer)
- **Framework Preset**: **Other**
- **Root Directory**: `./` (leave as root)
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `cd backend && npm install`

**DO NOT CLICK DEPLOY YET!**

### 1.2 Set Environment Variables

1. Click **"Environment Variables"** button
2. Add these variables **ONE BY ONE** (click "Add" after each):

```
DB_DIALECT=postgres
```

```
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
```

```
DB_PORT=5432
```

```
DB_USER=postgres
```

```
DB_PASSWORD=3oqj6vL2Tr5BZLaf
```

```
DB_NAME=postgres
```

```
DB_SSL=true
```

```
DB_SSL_REJECT_UNAUTHORIZED=false
```

```
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
```

```
JWT_EXPIRE=7d
```

```
FRONTEND_URL=https://your-frontend.vercel.app
```
*(We'll update this after deploying frontend)*

```
NODE_ENV=production
```

```
PORT=8000
```

```
VERCEL=1
```

3. Make sure all variables are set for **Production** environment
4. Click **"Deploy"** button
5. Wait 2-3 minutes for deployment

### 1.3 Get Backend URL

1. After deployment completes, copy your backend URL
2. It will look like: `https://internet-billing-backend.vercel.app`
3. **Save this URL!** You'll need it for frontend

### 1.4 Test Backend

Visit: `https://your-backend.vercel.app/api/health`

Should show: `{"status":"ok","database":"connected"}`

---

## 📋 Step 2: Deploy Frontend to Vercel

### 2.1 Create Frontend Project

1. In Vercel Dashboard, click **"Add New Project"** again
2. Import the same GitHub repository
3. Configure project:

**Project Settings:**
- **Project Name**: `internet-billing-frontend` (or any name you prefer)
- **Framework Preset**: **Vite**
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**DO NOT CLICK DEPLOY YET!**

### 2.2 Set Environment Variable

1. Click **"Environment Variables"** button
2. Add this variable:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

**IMPORTANT:** Replace `your-backend.vercel.app` with your **actual backend URL** from Step 1.3!

For example, if your backend URL is `https://internet-billing-backend.vercel.app`, then:

```
VITE_API_BASE_URL=https://internet-billing-backend.vercel.app
```

3. Make sure it's set for **Production** environment
4. Click **"Deploy"** button
5. Wait 2-3 minutes for deployment

### 2.3 Get Frontend URL

1. After deployment completes, copy your frontend URL
2. It will look like: `https://internet-billing-frontend.vercel.app`
3. **Save this URL!**

---

## 📋 Step 3: Update Backend FRONTEND_URL

### 3.1 Update Environment Variable

1. Go back to your **Backend** project in Vercel
2. Click **"Settings"** tab
3. Click **"Environment Variables"**
4. Find `FRONTEND_URL`
5. Click **"Edit"**
6. Update value to your frontend URL from Step 2.3
7. Click **"Save"**

### 3.2 Redeploy Backend

1. Go to **"Deployments"** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment to complete

---

## 📋 Step 4: Verify Everything Works

### 4.1 Test Backend Health

Visit: `https://your-backend.vercel.app/api/health`

Expected response:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2024-..."
}
```

### 4.2 Test Frontend

1. Visit: `https://your-frontend.vercel.app`
2. Should see the login page

### 4.3 Test Login

Login with Super Admin credentials:
- **Email**: `admin@billing.com`
- **Password**: `admin123`

**Expected:**
- ✅ Login successful
- ✅ Redirected to Super Admin Dashboard
- ✅ All features working

---

## ✅ Deployment Checklist

- [ ] Backend project created in Vercel
- [ ] All backend environment variables set
- [ ] Backend deployed successfully
- [ ] Backend health check passes
- [ ] Frontend project created in Vercel
- [ ] Frontend environment variable set (with backend URL)
- [ ] Frontend deployed successfully
- [ ] Frontend loads correctly
- [ ] Backend FRONTEND_URL updated
- [ ] Backend redeployed
- [ ] Login works with Super Admin
- [ ] Dashboard loads correctly

---

## 🆘 Troubleshooting

### Backend Issues

**Problem:** "Database connection failed"
- ✅ Check all environment variables are set correctly
- ✅ Verify Supabase project is active (not paused)
- ✅ Check Vercel function logs for errors

**Problem:** "Cannot read properties of undefined"
- ✅ Redeploy after setting all environment variables
- ✅ Check Vercel function logs

**How to check logs:**
1. Vercel Dashboard → Your Backend Project
2. Click **"Deployments"** tab
3. Click on latest deployment
4. Click **"Functions"** tab
5. Click on function
6. View **"Logs"**

### Frontend Issues

**Problem:** "API Error" or "Network Error"
- ✅ Check `VITE_API_BASE_URL` is correct (must be your backend URL)
- ✅ Verify backend is deployed and running
- ✅ Check browser console for errors

**Problem:** "404 Not Found" on routes
- ✅ This is normal for Vite SPA - routes are handled by frontend
- ✅ Check `vercel.json` rewrites are configured

### Login Issues

**Problem:** "Invalid credentials"
- ✅ Verify database has been migrated to Supabase
- ✅ Check if Super Admin user exists in Supabase
- ✅ Try resetting password in Supabase Table Editor

**How to check users in Supabase:**
1. Supabase Dashboard → **Table Editor**
2. Select **`users`** table
3. Check if `admin@billing.com` exists

---

## 📊 Quick Reference

### Your URLs (After Deployment)

- **Backend**: `https://your-backend.vercel.app`
- **Frontend**: `https://your-frontend.vercel.app`
- **Supabase**: `https://qppdkzzmijjyoihzfdxw.supabase.co`

### Test Endpoints

- **Health Check**: `https://your-backend.vercel.app/api/health`
- **Diagnostics**: `https://your-backend.vercel.app/api/diagnose`

### Login Credentials

- **Super Admin**:
  - Email: `admin@billing.com`
  - Password: `admin123`

---

## 🎉 Success!

Once all steps are complete:
- ✅ Your app is live on Vercel
- ✅ Database is on Supabase (cloud)
- ✅ Frontend and Backend are connected
- ✅ Login works with Super Admin
- ✅ Dashboard is accessible

**Everything is ready! Follow the steps above to deploy! 🚀**

---

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel function logs
2. Check Supabase project status
3. Verify all environment variables are set
4. See `DATABASE_CONNECTION_TROUBLESHOOTING.md` for database issues
5. See `STEP_BY_STEP_VERCEL_DEPLOYMENT.md` for detailed deployment steps
