# 🚀 Complete Vercel Deployment Guide

## ✅ All Fixes Applied and Pushed to GitHub

All error fixes have been committed and pushed to: **https://github.com/ahmadkhan32/Internet-Billing-System**

---

## 📋 Step-by-Step Deployment

### Step 1: Set Up Database (Required!)

**You MUST have a MySQL database before deploying!**

#### Option A: PlanetScale (Recommended - Free Tier Available)
1. Go to https://planetscale.com
2. Sign up for free account
3. Create a new database
4. Note the connection details:
   - Host
   - Username
   - Password
   - Database name

#### Option B: Railway (Free Tier Available)
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → Add MySQL database
4. Get connection details from database service

#### Option C: Render (Free Tier Available)
1. Go to https://render.com
2. Sign up with GitHub
3. Create new PostgreSQL database (or use external MySQL)
4. Get connection details

---

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in (or sign up)

2. **Import Project**
   - Click **"Add New Project"**
   - Select **"Import Git Repository"**
   - Find: **Internet-Billing-System**
   - Click **"Import"**

3. **Configure Project Settings**

   **Project Name:** `internet-billing-system` (or your choice)
   
   **Framework Preset:** Vite (should auto-detect)
   
   **Root Directory:** `/` (root of repository)
   
   **Build Command:** `cd frontend && npm install && npm run build`
   
   **Output Directory:** `frontend/dist`
   
   **Install Command:** `cd backend && npm install && cd ../frontend && npm install`

4. **Add Environment Variables** ⚠️ **CRITICAL!**

   Click **"Environment Variables"** and add ALL of these:

   ```
   NODE_ENV=production
   ```
   
   ```
   DB_HOST=your-mysql-host
   ```
   (Replace with your database host, e.g., `aws.connect.psdb.cloud`)
   
   ```
   DB_USER=your-mysql-username
   ```
   (Replace with your database username)
   
   ```
   DB_PASSWORD=your-mysql-password
   ```
   (Replace with your database password)
   
   ```
   DB_NAME=your-database-name
   ```
   (Replace with your database name)
   
   ```
   JWT_SECRET=your-super-secret-random-string
   ```
   (Generate a random string - use: `openssl rand -base64 32` or any random string generator)
   
   ```
   JWT_EXPIRE=7d
   ```
   
   ```
   FRONTEND_URL=https://your-project-name.vercel.app
   ```
   (Replace with your actual Vercel URL after first deployment)

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build to complete
   - Note your deployment URL: `https://your-project-name.vercel.app`

6. **Update FRONTEND_URL** (After First Deployment)
   - Go to **Settings** → **Environment Variables**
   - Update `FRONTEND_URL` to your actual Vercel URL
   - Go to **Deployments** → Click **"Redeploy"**

---

## 🧪 Testing Your Deployment

### 1. Test Health Check
Visit: `https://your-project.vercel.app/api/health`

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

**If database is not connected:**
```json
{
  "status": "ERROR",
  "message": "Server is running but database connection failed",
  "database": "disconnected"
}
```

### 2. Test Login
- Visit: `https://your-project.vercel.app`
- Try logging in with default credentials:
  - Email: `admin@billing.com`
  - Password: `admin123`

**Note:** If this is a fresh database, you'll need to create users first (see Database Setup below).

---

## 🗄️ Database Setup

### Option 1: Auto-Create Tables (Recommended)

The backend will automatically create tables on first request if:
- Database is empty
- Environment variables are correct
- Database allows table creation

### Option 2: Manual Database Setup

If you need to set up the database manually:

1. **Connect to your database** (using MySQL client or database dashboard)

2. **Run the setup script:**
   ```sql
   -- Create database if it doesn't exist
   CREATE DATABASE IF NOT EXISTS your_database_name;
   USE your_database_name;
   ```

3. **The backend will create tables automatically** on first API call

### Option 3: Create Default Users

After tables are created, you can create default users by:

1. **Using the API:**
   ```bash
   POST https://your-project.vercel.app/api/auth/register
   {
     "name": "Super Admin",
     "email": "admin@billing.com",
     "password": "admin123",
     "role": "customer",
     "isp_id": 1
   }
   ```

2. **Or manually in database:**
   - Insert users directly into the `users` table
   - Make sure to hash passwords using bcrypt

---

## 🐛 Troubleshooting

### Error: 500 Internal Server Error

**Check Vercel Function Logs:**
1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Click on `api/index.js`
4. Check **"Logs"** tab for error messages

**Common Causes:**

1. **Missing Environment Variables**
   - Check all required variables are set
   - Verify no typos in variable names
   - Make sure values are correct

2. **Database Connection Failed**
   - Verify database credentials
   - Check database allows connections from Vercel IPs
   - Test connection from your local machine first
   - Check database is accessible from internet

3. **JWT_SECRET Not Set**
   - Make sure `JWT_SECRET` is set
   - Generate a new random string if needed

### Error: Database Connection Failed

**Solutions:**
1. **Check Environment Variables:**
   - `DB_HOST` - Should be your database host (not `localhost`)
   - `DB_USER` - Your database username
   - `DB_PASSWORD` - Your database password
   - `DB_NAME` - Your database name

2. **Check Database Access:**
   - Database must be accessible from the internet
   - Some databases require IP whitelisting
   - Check firewall settings

3. **Test Connection:**
   ```bash
   # Test from your local machine
   mysql -h your-db-host -u your-username -p your-database-name
   ```

### Error: Login Failed / Invalid Credentials

**Solutions:**
1. **Check if users exist in database:**
   - Query the `users` table
   - Verify email and password are correct

2. **Create a test user:**
   - Use the registration endpoint
   - Or insert directly into database

3. **Check password hashing:**
   - Passwords must be hashed with bcrypt
   - Use the same hashing method as the backend

### Error: CORS Error

**Solutions:**
1. **Check FRONTEND_URL:**
   - Must match your Vercel URL exactly
   - Include `https://` protocol
   - No trailing slash

2. **Update CORS settings:**
   - Already configured to allow Vercel domains
   - Should work automatically

---

## 📊 Monitoring Your Deployment

### Check Function Logs
1. Vercel Dashboard → Your Project → Functions → `api/index.js` → Logs
2. Look for error messages
3. Check request/response logs

### Check Build Logs
1. Vercel Dashboard → Your Project → Deployments
2. Click on a deployment
3. Check build logs for errors

### Test API Endpoints
```bash
# Health check
curl https://your-project.vercel.app/api/health

# Login (replace with your credentials)
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@billing.com","password":"admin123"}'
```

---

## ✅ Deployment Checklist

- [ ] Database created and accessible
- [ ] All environment variables set in Vercel
- [ ] Project deployed successfully
- [ ] Health check returns OK
- [ ] Database connection working
- [ ] Frontend loads correctly
- [ ] Login works
- [ ] Navigation works
- [ ] All routes accessible

---

## 🎯 Default Login Credentials

After setting up the database, you can use these default credentials (if they exist):

- **Super Admin:** `admin@billing.com` / `admin123`
- **ISP Admin:** `ispadmin@billing.com` / `admin123`
- **Account Manager:** `accountmanager@billing.com` / `admin123`
- **Technical Officer:** `technical@billing.com` / `admin123`
- **Recovery Officer:** `recovery@billing.com` / `admin123`
- **Customer:** `customer@billing.com` / `admin123`

**Note:** These users are created automatically on first server start (in traditional mode). In serverless mode, you may need to create them manually or via API.

---

## 🔧 Important Notes

### File Uploads
- Static file serving (`/uploads`) won't work in serverless mode
- Consider using Vercel Blob Storage or AWS S3 for file uploads

### Scheduled Jobs
- Monthly scheduler is disabled in serverless mode
- Use Vercel Cron Jobs for scheduled tasks

### Cold Starts
- First request after inactivity may take 5-10 seconds
- This is normal for serverless functions
- Consider Vercel Pro for better performance

### Database Connections
- Connection pooling is optimized for serverless
- Connections are cached to reduce overhead
- Database must support connection pooling

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Functions:** https://vercel.com/docs/functions
- **PlanetScale:** https://planetscale.com/docs
- **Railway:** https://docs.railway.app
- **Render:** https://render.com/docs

---

## 🆘 Need Help?

1. **Check Vercel Function Logs** - Most errors are logged there
2. **Check Environment Variables** - Verify all are set correctly
3. **Test Database Connection** - Ensure database is accessible
4. **Check Build Logs** - Look for build errors
5. **Test API Endpoints** - Use curl or Postman to test

---

**Your deployment URL:** `https://your-project-name.vercel.app`

**API Base URL:** `https://your-project-name.vercel.app/api`

Good luck! 🚀

