# 🚀 Complete Vercel Deployment Guide - Supabase + PostgreSQL

## 📋 **Important Clarification**

**Sequelize is NOT a database** - it's a tool (ORM) that helps connect to databases. Your project uses:
- **Database**: PostgreSQL (Supabase) ✅
- **Tool**: Sequelize (to connect to PostgreSQL) ✅

**You're already using PostgreSQL/Supabase!** We just need to configure it correctly.

---

## ✅ **Step 1: Required Environment Variables for Vercel**

### **Copy these EXACT variables to Vercel:**

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Add these variables** (one by one):

```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
VERCEL=1
NODE_ENV=production
```

**Important**:
- ✅ Set all for **Production** environment
- ✅ Use port **6543** (connection pooling - better for Vercel)
- ✅ No spaces before/after `=`
- ✅ Copy values exactly as shown

---

## ✅ **Step 2: Verify Supabase Project is Active**

**Supabase projects auto-pause after inactivity!**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Check status**:
   - ✅ **Active** → Good, continue
   - ❌ **Paused** → Click **"Restore"** or **"Resume"**
   - ⏸️ **Inactive** → Click **"Restore Project"**

**Wait 1-2 minutes** after restoring, then continue.

---

## ✅ **Step 3: Verify Vercel Configuration**

### **Check `vercel.json` is correct:**

Your `vercel.json` should have:
```json
{
  "version": 2,
  "buildCommand": "cd backend && npm install && cd ../frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd backend && npm install && cd ../frontend && npm install",
  "framework": "vite",
  "functions": {
    "api/index.js": {
      "maxDuration": 60,
      "memory": 1024
    }
  },
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

**This is already correct!** ✅

---

## ✅ **Step 4: Local .env File (For Development)**

**Create `backend/.env` file** (for local testing):

```env
# Server Configuration
NODE_ENV=development
PORT=8000
VERCEL=0

# Database Configuration - Supabase (PostgreSQL)
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false

# JWT Configuration
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d

# Frontend URL (for local development)
FRONTEND_URL=http://localhost:3001
```

**Save this file as**: `backend/.env`

---

## ✅ **Step 5: Deploy to Vercel**

### **Option A: Auto-Deploy from GitHub** (Recommended)

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Vercel will auto-deploy** (if connected to GitHub)

3. **Wait 3-5 minutes** for deployment

### **Option B: Manual Deploy**

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Deployments** → **Redeploy**
4. **Wait** 3-5 minutes

---

## ✅ **Step 6: Verify Deployment**

### **Test Backend Health:**

Visit: `https://your-project.vercel.app/api/health`

**Expected response**:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

**If you see**:
```json
{
  "status": "ERROR",
  "database": "disconnected"
}
```

Then check:
1. ✅ Supabase project is active (not paused)
2. ✅ All environment variables are set in Vercel
3. ✅ Check Vercel function logs for errors

---

## ✅ **Step 7: Test Login**

1. **Go to**: `https://your-project.vercel.app/login`
2. **Use credentials**:
   - Email: `admin@billing.com`
   - Password: `admin123`
3. **Should redirect** to `/super-admin/dashboard`

---

## 🔍 **Troubleshooting**

### **Error: "Database connection failed"**

**Fix**:
1. ✅ Check Supabase project is **active** (not paused)
2. ✅ Verify all environment variables in Vercel
3. ✅ Use port **6543** (connection pooling)
4. ✅ Redeploy after updating variables

### **Error: "Cannot find module 'express'"**

**Fix**:
- Already fixed in `vercel.json` - it installs backend dependencies
- Just redeploy

### **Error: "Route not found"**

**Fix**:
- Set `VITE_API_BASE_URL` in Vercel (frontend environment variables):
  ```
  VITE_API_BASE_URL=/api
  ```
  Or leave it empty (it will auto-detect)

---

## 📋 **Complete Environment Variables Checklist**

### **For Vercel (Backend):**

```
✅ DB_DIALECT=postgres
✅ DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
✅ DB_PORT=6543
✅ DB_USER=postgres
✅ DB_PASSWORD=3oqj6vL2Tr5BZLaf
✅ DB_NAME=postgres
✅ DB_SSL=true
✅ DB_SSL_REJECT_UNAUTHORIZED=false
✅ JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
✅ JWT_EXPIRE=7d
✅ VERCEL=1
✅ NODE_ENV=production
```

### **For Vercel (Frontend - Optional):**

```
VITE_API_BASE_URL=/api
```

(Or leave empty - it will auto-detect)

---

## 🎯 **Quick Summary**

1. ✅ **Set environment variables** in Vercel (copy from above)
2. ✅ **Verify Supabase** project is active
3. ✅ **Push to GitHub** (auto-deploys) or **Redeploy** manually
4. ✅ **Test** `/api/health` endpoint
5. ✅ **Test login** with `admin@billing.com` / `admin123`

---

## 📝 **What's Already Configured**

✅ `vercel.json` - Correct build commands  
✅ `api/index.js` - Serverless function handler  
✅ Database config - Uses PostgreSQL (Supabase)  
✅ Sequelize - Already configured for PostgreSQL  

**You just need to set the environment variables!** 🚀

---

## 🚨 **Important Notes**

1. **Sequelize is NOT a database** - it's a tool to connect to PostgreSQL
2. **You're already using PostgreSQL** (Supabase)
3. **No need to remove Sequelize** - it's required for the project
4. **Environment variables MUST be set in Vercel** - they're not optional
5. **Supabase project must be active** - check if it's paused

---

## ✅ **Final Checklist**

Before deploying:

- [ ] All environment variables set in Vercel (Production)
- [ ] Supabase project is active (not paused)
- [ ] `vercel.json` is correct (already done ✅)
- [ ] Code pushed to GitHub
- [ ] Ready to deploy!

**After deployment**:

- [ ] Test `/api/health` endpoint
- [ ] Test login functionality
- [ ] Check Vercel function logs if errors occur

---

**Your project is ready! Just set the environment variables in Vercel and deploy!** 🚀

