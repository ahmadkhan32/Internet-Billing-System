# 🚂 Railway Deployment Guide

## ✅ Configuration Complete

**Your project is now configured for Railway deployment!**

---

## 🚀 Quick Deploy Steps

### Step 1: Connect to Railway

1. Go to: https://railway.app
2. Sign up / Login
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository: `Internet-Billing-System`

### Step 2: Configure Environment Variables

**Go to:** Railway → Your Project → Variables

**Add these 8 variables:**

1. **NODE_ENV** = `production`
2. **DB_HOST** = Your database host
3. **DB_USER** = Your database username
4. **DB_PASSWORD** = Your database password
5. **DB_NAME** = `internet_billing_db` (or your database name)
6. **DB_PORT** = `3306` (if not default)
7. **DB_SSL** = `false` (if using local/ngrok, otherwise leave default)
8. **JWT_SECRET** = Random 32+ character string

**Optional:**
- **PORT** = Railway will set this automatically
- **FRONTEND_URL** = Your Railway app URL (auto-set)

### Step 3: Add MySQL Database (Optional)

**Railway provides MySQL databases:**

1. In Railway project, click "+ New"
2. Select "Database" → "MySQL"
3. Railway will create a MySQL database
4. Use the connection details in environment variables:
   - `DB_HOST` = From Railway database
   - `DB_USER` = From Railway database
   - `DB_PASSWORD` = From Railway database
   - `DB_NAME` = From Railway database

### Step 4: Deploy

**Railway will automatically:**
1. Detect Node.js
2. Run `npm run build` (builds frontend)
3. Run `npm start` (starts backend server)
4. Serve frontend from backend

**Wait 2-5 minutes for deployment**

---

## ✅ What's Configured

### ✅ Start Command
- Root `package.json` has `"start": "cd backend && node server.js"`
- Railway will use this automatically

### ✅ Build Command
- Root `package.json` has `"build"` script
- Builds both backend and frontend

### ✅ Frontend Serving
- Backend serves frontend static files in production
- All routes (except `/api/*`) serve React app

### ✅ Port Configuration
- Server listens on `process.env.PORT` (Railway sets this)
- Falls back to port 8000 if not set

### ✅ Railway Configuration
- `railway.json` - Railway configuration
- `railway.toml` - Alternative configuration

---

## 🔍 Verify Deployment

### Step 1: Check Build Logs
- Railway → Deployments → Latest
- Should show: "Build successful" ✅

### Step 2: Check Service Status
- Railway → Your Service
- Should show: "Running" ✅

### Step 3: Test API
Visit: `https://your-app.railway.app/api/health`

Should show:
```json
{
  "status": "OK",
  "database": "connected"
}
```

### Step 4: Test Frontend
Visit: `https://your-app.railway.app`

Should show:
- Login page ✅
- Can login: `admin@billing.com` / `admin123`
- Redirects to dashboard ✅

---

## 🔧 Troubleshooting

### Build Fails?

**Check:**
- Railway build logs for errors
- Verify `backend` and `frontend` folders exist
- Check Node.js version (Railway auto-detects)

### Database Connection Fails?

**Check:**
- All environment variables are set
- Database credentials are correct
- Database is accessible from Railway
- Visit `/api/diagnose` for detailed error info

### Frontend Not Loading?

**Check:**
- Build completed successfully
- `frontend/dist` folder exists
- Check Railway logs for errors

### Port Issues?

**Railway automatically sets PORT:**
- Don't hardcode port 8000
- Use `process.env.PORT` (already configured)

---

## 📋 Environment Variables Checklist

- [ ] `NODE_ENV` = `production`
- [ ] `DB_HOST` = Database host
- [ ] `DB_USER` = Database username
- [ ] `DB_PASSWORD` = Database password
- [ ] `DB_NAME` = Database name
- [ ] `DB_PORT` = `3306` (if not default)
- [ ] `JWT_SECRET` = Random 32+ char string
- [ ] `DB_SSL` = `false` (if needed)

---

## 🎯 Summary

**To deploy to Railway:**
1. ✅ Connect GitHub repository
2. ✅ Set environment variables
3. ✅ (Optional) Add Railway MySQL database
4. ✅ Deploy (automatic)

**Your project is ready! Just connect to Railway and deploy! 🚂**

---

## 📚 Files Changed

- ✅ `package.json` - Added start command
- ✅ `backend/server.js` - Added frontend static serving
- ✅ `railway.json` - Railway configuration
- ✅ `railway.toml` - Alternative configuration

---

## 🚀 Next Steps

1. **Push to GitHub** (already done)
2. **Connect Railway to GitHub**
3. **Set environment variables**
4. **Deploy!**

**Your code is ready for Railway! 🚂**

