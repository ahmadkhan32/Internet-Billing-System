# Quick Setup Guide: GitHub & Vercel Deployment

## ✅ What's Already Done

- ✅ Git repository initialized
- ✅ All files committed
- ✅ `.gitignore` configured
- ✅ Vercel configuration files created
- ✅ Deployment documentation created

## 🚀 Step 1: Push to GitHub

### 1.1 Create a GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `internet-billing-system` (or your preferred name)
3. Description: "SaaS Internet Billing System - Full Stack Application"
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### 1.2 Push Your Code

After creating the repository, GitHub will show you commands. Use these in your terminal:

```powershell
# Navigate to your project (if not already there)
cd "C:\Users\asadk\Downloads\Internet Billing System"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/yourusername/internet-billing-system.git
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub username and password (or personal access token).

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Sign Up / Login to Vercel

1. Go to **https://vercel.com**
2. Sign up or log in with your GitHub account (recommended)

### 2.2 Import Your Project

1. Click **"Add New Project"** or **"Import Project"**
2. Select **"Import Git Repository"**
3. Find and select your `internet-billing-system` repository
4. Click **"Import"**

### 2.3 Configure Project Settings

**Framework Preset:** Vite

**Root Directory:** 
- Click "Edit" next to Root Directory
- Set to: `frontend`

**Build Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:**
Click "Environment Variables" and add:
- **Name:** `VITE_API_BASE_URL`
- **Value:** `https://your-backend-url.com/api` (update after backend deployment)

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your frontend will be live at: `https://your-project-name.vercel.app`

---

## 🔧 Step 3: Backend Deployment

**Important:** Vercel is primarily for frontend/static sites. Your backend needs a different hosting solution.

### Recommended Options:

#### Option A: Railway (Easiest) ⭐
1. Go to **https://railway.app**
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add MySQL database service
6. Set environment variables (see below)
7. Deploy!

#### Option B: Render
1. Go to **https://render.com**
2. Create new **Web Service** from GitHub
3. Add **PostgreSQL** database (or use external MySQL)
4. Configure build and start commands

#### Option C: Heroku
1. Go to **https://heroku.com**
2. Create new app
3. Connect GitHub repository
4. Add ClearDB MySQL addon
5. Deploy

### Backend Environment Variables Needed:

```env
PORT=8000
NODE_ENV=production
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-vercel-app.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 🔄 Step 4: Update Frontend API URL

After deploying your backend:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Update `VITE_API_BASE_URL` to your backend URL:
   ```
   https://your-backend-url.com/api
   ```
4. Go to **Deployments** tab
5. Click **"Redeploy"** on the latest deployment

---

## 📝 Quick Commands Reference

### Git Commands
```powershell
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

### Local Development
```powershell
# Backend (from backend directory)
npm install
npm start

# Frontend (from frontend directory)
npm install
npm run dev
```

---

## 🐛 Troubleshooting

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify `package-lock.json` is committed

### API Connection Issues
- Verify `VITE_API_BASE_URL` environment variable is set
- Check CORS settings in backend
- Ensure backend is deployed and accessible

### Database Connection Issues
- Verify database credentials in environment variables
- Check if database is accessible from hosting provider
- Ensure database is initialized (run setup scripts)

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **GitHub Docs:** https://docs.github.com

---

## ✅ Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed (Railway/Render/Heroku)
- [ ] Environment variables configured
- [ ] Frontend API URL updated
- [ ] Database initialized
- [ ] Application tested and working

---

**Need Help?** Check `DEPLOYMENT.md` for detailed instructions.

