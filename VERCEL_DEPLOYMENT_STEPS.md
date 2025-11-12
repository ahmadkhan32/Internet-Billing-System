# 🚀 Vercel Deployment Steps

Your project is now on GitHub: **https://github.com/ahmadkhan32/Internet-Billing-System**

## Step 1: Deploy Frontend to Vercel

### 1.1 Sign Up / Login to Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"**
3. **Recommended:** Sign in with your **GitHub account** (makes deployment easier)

### 1.2 Import Your Project

1. After logging in, click **"Add New Project"** or **"Import Project"**
2. You'll see a list of your GitHub repositories
3. Find and select **"Internet-Billing-System"**
4. Click **"Import"**

### 1.3 Configure Project Settings

**Important Settings:**

1. **Framework Preset:** Select **"Vite"** (or it may auto-detect)

2. **Root Directory:** 
   - Click **"Edit"** next to "Root Directory"
   - Change from `/` to `frontend`
   - This tells Vercel where your frontend code is

3. **Build Settings:**
   - **Build Command:** `npm run build` (should auto-fill)
   - **Output Directory:** `dist` (should auto-fill)
   - **Install Command:** `npm install` (should auto-fill)

4. **Environment Variables:**
   - Click **"Environment Variables"**
   - Add the following:
     - **Name:** `VITE_API_BASE_URL`
     - **Value:** `http://localhost:8000/api` (for now, update after backend deployment)
     - Click **"Add"**

### 1.4 Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 1-2 minutes)
3. Once done, you'll get a URL like: `https://internet-billing-system.vercel.app`

### 1.5 Verify Deployment

- Visit your Vercel URL
- The frontend should load (though API calls won't work until backend is deployed)

---

## Step 2: Backend Deployment Options

**Important:** Vercel is primarily for frontend/static sites. Your backend needs a different hosting solution.

### Option A: Railway (Recommended) ⭐

1. Go to **https://railway.app**
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select **"Internet-Billing-System"** repository
5. Add **MySQL** database service
6. Set environment variables (see below)
7. Configure build settings:
   - **Root Directory:** `backend`
   - **Start Command:** `npm start`
8. Deploy!

### Option B: Render

1. Go to **https://render.com**
2. Sign up with GitHub
3. Create new **Web Service** from GitHub
4. Select **"Internet-Billing-System"** repository
5. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add **PostgreSQL** database (or use external MySQL)
7. Set environment variables
8. Deploy!

### Option C: Heroku

1. Go to **https://heroku.com**
2. Create new app
3. Connect GitHub repository
4. Add **ClearDB MySQL** addon
5. Set environment variables
6. Deploy!

---

## Step 3: Backend Environment Variables

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

**Important:** Replace all placeholder values with your actual credentials!

---

## Step 4: Update Frontend API URL

After deploying your backend:

1. Go to your **Vercel project dashboard**
2. Navigate to **Settings** → **Environment Variables**
3. Update `VITE_API_BASE_URL` to your backend URL:
   ```
   https://your-backend-url.com/api
   ```
4. Go to **Deployments** tab
5. Click **"Redeploy"** on the latest deployment
6. Wait for redeployment to complete

---

## Step 5: Database Setup

### On Railway/Render/Heroku:

1. Create a MySQL database service
2. Note the connection details (host, user, password, database name)
3. Update environment variables with these details
4. The backend will automatically create tables on first run

### Manual Database Initialization (if needed):

If tables don't auto-create, you may need to run:
```bash
cd backend
npm run init-db
```

---

## ✅ Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed (Railway/Render/Heroku)
- [ ] Database created and connected
- [ ] Environment variables configured
- [ ] Frontend API URL updated in Vercel
- [ ] Application tested and working
- [ ] CORS configured in backend to allow Vercel domain

---

## 🔧 Troubleshooting

### Frontend Build Fails on Vercel

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify `package-lock.json` is committed
- Check that `frontend` is set as root directory

### API Connection Issues

- Verify `VITE_API_BASE_URL` environment variable is set correctly
- Check CORS settings in backend (should allow Vercel domain)
- Ensure backend is deployed and accessible
- Check browser console for errors

### Database Connection Issues

- Verify database credentials in environment variables
- Check if database is accessible from hosting provider
- Ensure database service is running
- Check backend logs for connection errors

### CORS Errors

Update backend `server.js` to include your Vercel URL:
```javascript
const allowedOrigins = [
  'https://your-vercel-app.vercel.app',
  'http://localhost:3001'
];
```

---

## 📚 Quick Links

- **Your GitHub Repo:** https://github.com/ahmadkhan32/Internet-Billing-System
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Railway Dashboard:** https://railway.app/dashboard
- **Render Dashboard:** https://dashboard.render.com

---

## 🎉 Success!

Once everything is deployed:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend-url.com/api`

Your Internet Billing System will be live and accessible worldwide!

---

**Need help?** Check the build logs in your hosting provider's dashboard for detailed error messages.

