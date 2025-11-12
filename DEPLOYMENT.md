# Deployment Guide

This guide will help you deploy the Internet Billing System to GitHub and Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed on your machine

## Step 1: Push to GitHub

### 1.1 Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `internet-billing-system`)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)

### 1.2 Push Your Code

Run these commands in your terminal:

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Internet Billing System"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy Frontend to Vercel

### 2.1 Connect GitHub to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository you just pushed

### 2.2 Configure Frontend Deployment

**Project Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:**
Add these in Vercel project settings:
```
VITE_API_URL=https://your-backend-url.com/api
```

### 2.3 Deploy

Click "Deploy" and wait for the build to complete.

## Step 3: Backend Deployment Options

The backend requires a MySQL database and file storage. Vercel is not ideal for this. Consider these alternatives:

### Option A: Railway (Recommended)
1. Go to https://railway.app
2. Create new project from GitHub repo
3. Add MySQL database service
4. Deploy backend service
5. Set environment variables

### Option B: Render
1. Go to https://render.com
2. Create new Web Service from GitHub
3. Add PostgreSQL database (or use external MySQL)
4. Configure build and start commands

### Option C: Heroku
1. Go to https://heroku.com
2. Create new app
3. Add ClearDB MySQL addon
4. Deploy from GitHub

### Backend Environment Variables Needed:
```
PORT=8000
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-jwt-secret
FRONTEND_URL=https://your-vercel-app.vercel.app
```

## Step 4: Update Frontend API URL

After deploying the backend, update the frontend's API URL:

1. In Vercel, go to your project settings
2. Add/Update environment variable:
   - `VITE_API_URL` = `https://your-backend-url.com/api`
3. Redeploy the frontend

## Important Notes

- **Database:** You'll need to set up your MySQL database on your hosting provider
- **File Uploads:** Backend uploads folder needs persistent storage (consider using cloud storage like AWS S3)
- **CORS:** Update backend CORS settings to allow your Vercel frontend URL
- **Environment Variables:** Never commit `.env` files to GitHub

## Troubleshooting

- If build fails, check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly
- Check that API URLs are correct and accessible

