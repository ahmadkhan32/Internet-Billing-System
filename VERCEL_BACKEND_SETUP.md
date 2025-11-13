# 🚀 Vercel Backend Deployment Guide

## Why Backend Wasn't Running on Vercel

Vercel is designed for **serverless functions**, not traditional Express servers that run continuously. Your backend was configured as a traditional server, which doesn't work on Vercel.

## ✅ Solution: Serverless Function Setup

I've configured your backend to work as Vercel serverless functions. Here's what was changed:

### Changes Made:

1. **Created `api/index.js`** - Serverless function entry point
2. **Updated `backend/server.js`** - Now supports both traditional and serverless modes
3. **Updated `vercel.json`** - Routes API requests to serverless functions
4. **Updated CORS** - Now allows Vercel domains

## 📋 Deployment Steps

### Option 1: Deploy Backend as Separate Vercel Project (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click **"Add New Project"**

2. **Import Your Repository**
   - Select **"Internet-Billing-System"** repository
   - Click **"Import"**

3. **Configure Project Settings**
   - **Framework Preset:** Other
   - **Root Directory:** Leave as `/` (root of repository)
   - **Build Command:** Leave empty (not needed for serverless)
   - **Output Directory:** Leave empty
   - **Install Command:** `cd backend && npm install`

4. **Environment Variables**
   Add these in Vercel project settings:
   ```
   NODE_ENV=production
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-app.vercel.app
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. **Deploy**
   - Click **"Deploy"**
   - Wait for deployment to complete
   - Your backend will be available at: `https://your-project.vercel.app/api`

### Option 2: Deploy Backend and Frontend in Same Project

If you want both in one Vercel project:

1. **Update Your Existing Vercel Project**
   - Go to your project settings
   - Update `vercel.json` (already updated in the repo)
   - Set **Root Directory** to `/` (project root)

2. **Configure Build Settings**
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `cd backend && npm install && cd ../frontend && npm install`

3. **Add Environment Variables** (same as above)

4. **Redeploy**
   - Go to **Deployments** tab
   - Click **"Redeploy"**

## 🔧 Important Notes

### Database Connection

- **Vercel serverless functions are stateless** - database connections need to be managed carefully
- Consider using a connection pooler like **PlanetScale** or **Railway** for MySQL
- Or use **Vercel Postgres** (if you can migrate from MySQL)

### File Uploads

- **Static file serving** (`/uploads`) won't work in serverless mode
- Consider using:
  - **Vercel Blob Storage** for file uploads
  - **AWS S3** or **Cloudinary** for file storage
  - Update `uploadMiddleware.js` to use cloud storage

### Scheduled Jobs

- The monthly scheduler (`initializeScheduler()`) is disabled in serverless mode
- Use **Vercel Cron Jobs** or external services like **n8n** for scheduled tasks

### Cold Starts

- Serverless functions have **cold start** delays (first request may be slow)
- Consider using **Vercel Pro** for better performance
- Or use **Railway/Render** for traditional server deployment

## 🎯 Recommended Setup

For production, I recommend:

1. **Frontend:** Vercel (already working ✅)
2. **Backend:** Railway or Render (better for traditional Express servers)
   - Easier database management
   - File uploads work out of the box
   - Scheduled jobs work normally
   - No cold starts

## 🧪 Testing the Deployment

After deployment, test your API:

```bash
# Health check
curl https://your-backend.vercel.app/api/health

# Should return:
# {"status":"OK","message":"Server is running"}
```

## 🐛 Troubleshooting

### Error: "Cannot find module"
- Make sure `backend/package.json` has all dependencies
- Check that `Install Command` includes `cd backend && npm install`

### Error: "Database connection failed"
- Verify environment variables are set correctly
- Check database allows connections from Vercel IPs
- Consider using a connection pooler

### Error: "CORS error"
- Verify `FRONTEND_URL` environment variable matches your frontend URL
- Check CORS settings in `backend/server.js`

### Cold Start Issues
- First request after inactivity may take 5-10 seconds
- This is normal for serverless functions
- Consider keeping functions warm with a cron job

## 📚 Additional Resources

- [Vercel Serverless Functions Docs](https://vercel.com/docs/functions)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Railway Deployment](https://railway.app)
- [Render Deployment](https://render.com)

---

**Need Help?** Check the deployment logs in Vercel dashboard for detailed error messages.

