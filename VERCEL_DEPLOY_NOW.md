# 🚀 Deploy to Vercel - Step by Step Guide

## ✅ Your Project is Ready!

Your code is already pushed to GitHub: **https://github.com/ahmadkhan32/Internet-Billing-System**

---

## 📋 Quick Deployment Steps

### Step 1: Go to Vercel

1. Open **https://vercel.com** in your browser
2. Click **"Sign Up"** or **"Log In"**
3. **Recommended:** Sign in with your **GitHub account** (makes it easier)

---

### Step 2: Import Your Project

1. After logging in, click **"Add New Project"** or **"Import Project"**
2. You'll see a list of your GitHub repositories
3. Find and click on **"Internet-Billing-System"**
4. Click **"Import"**

---

### Step 3: Configure Project Settings

Vercel should auto-detect your project, but verify these settings:

#### **Framework Preset:**
- Select: **"Vite"** (or it may auto-detect)

#### **Root Directory:**
- Click **"Edit"** next to "Root Directory"
- Change from `/` to: **`frontend`**
- This tells Vercel where your frontend code is

#### **Build Settings:**
- **Build Command:** `npm run build` (should auto-fill)
- **Output Directory:** `dist` (should auto-fill)
- **Install Command:** `npm install` (should auto-fill)

#### **Environment Variables:**
Click **"Environment Variables"** and add:

**Name:** `VITE_API_BASE_URL`  
**Value:** `http://localhost:8000/api` (for now - update after backend deployment)

Click **"Add"** for each variable.

---

### Step 4: Deploy!

1. Click the big **"Deploy"** button
2. Wait 1-2 minutes for the build to complete
3. You'll see a success message with your deployment URL

**Your frontend will be live at:** `https://your-project-name.vercel.app`

---

## 🔧 After Deployment

### Update Environment Variable

After deploying your backend (see below), update the API URL:

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Update `VITE_API_BASE_URL` to your backend URL:
   ```
   https://your-backend-url.com/api
   ```
4. Go to **"Deployments"** tab
5. Click **"Redeploy"** on the latest deployment

---

## 🔧 Backend Deployment

**Important:** Vercel is for frontend only. Deploy your backend separately.

### Option 1: Railway (Recommended) ⭐

1. Go to **https://railway.app**
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select **"Internet-Billing-System"**
5. Add **MySQL** database service
6. Set environment variables (see below)
7. Configure:
   - **Root Directory:** `backend`
   - **Start Command:** `npm start`
8. Deploy!

### Option 2: Render

1. Go to **https://render.com**
2. Sign up with GitHub
3. Create new **Web Service** from GitHub
4. Select **"Internet-Billing-System"**
5. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add **PostgreSQL** database (or use external MySQL)
7. Set environment variables
8. Deploy!

---

## 📝 Backend Environment Variables

Set these in your backend hosting provider:

```env
PORT=8000
NODE_ENV=production
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=https://your-vercel-app.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Important:** Replace all placeholder values!

---

## ✅ Deployment Checklist

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported to Vercel
- [ ] Root directory set to `frontend`
- [ ] Build settings configured
- [ ] Environment variable `VITE_API_BASE_URL` added
- [ ] Frontend deployed successfully
- [ ] Backend deployed (Railway/Render/Heroku)
- [ ] Database configured
- [ ] Backend environment variables set
- [ ] Frontend API URL updated in Vercel
- [ ] Application tested and working

---

## 🎉 Success!

Once deployed:
- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-backend-url.com/api`

Your Internet Billing System will be live! 🚀

---

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure `frontend` is set as root directory
- Verify `package.json` exists in frontend folder

### API Connection Issues
- Verify `VITE_API_BASE_URL` is set correctly
- Check CORS settings in backend
- Ensure backend is deployed and accessible

### 404 Errors
- Check that all routes are properly configured
- Verify `vercel.json` rewrites are correct

---

**Need more help?** Check `VERCEL_DEPLOYMENT_STEPS.md` for detailed instructions.

