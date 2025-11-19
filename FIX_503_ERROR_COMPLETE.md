# 🔧 Fix 503 Database Connection Error - Complete Guide

## ❌ **Current Error**

```
503 Service Unavailable
Database connection failed. Please check your database configuration.
```

This means your backend can't connect to Supabase.

---

## ✅ **Quick Fix (5 Minutes)**

### **Step 1: Check Supabase Project Status** ⚠️ **MOST IMPORTANT**

**Supabase projects auto-pause after inactivity!**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Check status**:
   - ✅ **Active** → Continue to Step 2
   - ❌ **Paused** → Click **"Restore"** or **"Resume"**
   - ⏸️ **Inactive** → Click **"Restore Project"**

**Wait 1-2 minutes** after restoring, then continue.

---

### **Step 2: Fix Localhost (.env File)**

**Create `backend/.env` file**:

1. **Navigate to**: `backend` folder
2. **Create file**: `.env`
3. **Copy this content**:

```env
NODE_ENV=development
PORT=8000
VERCEL=0

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

FRONTEND_URL=http://localhost:3001
```

4. **Save** the file

**OR use the PowerShell script**:
```powershell
cd backend
.\fix-env-supabase.ps1
```

---

### **Step 3: Test Local Connection**

**Test if connection works**:

```bash
cd backend
node test-supabase-connection.js
```

**Expected output**:
```
✅ Connection successful!
✅ Supabase database is accessible
```

**If it fails**:
- Check Supabase project is active (Step 1)
- Verify `.env` file exists and has correct values
- Check error message for specific issue

---

### **Step 4: Fix Vercel (Environment Variables)**

**Set environment variables in Vercel**:

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
- ✅ No spaces before/after `=`
- ✅ Use port **6543** (connection pooling - better for Vercel)

---

### **Step 5: Redeploy on Vercel**

1. **Go to**: Vercel Dashboard → Your Project
2. **Deployments** → **Latest** → **Redeploy**
3. **Wait** 3-5 minutes

---

### **Step 6: Test Both**

**Test Localhost**:
```bash
cd backend
npm start
```

Visit: `http://localhost:8000/api/health`

**Test Vercel**:
Visit: `https://your-project.vercel.app/api/health`

**Both should return**:
```json
{
  "status": "OK",
  "database": "connected"
}
```

---

## 🔍 **Troubleshooting**

### **Error: "ENOTFOUND" or "Cannot resolve hostname"**

**Cause**: Supabase project is paused

**Fix**:
1. Go to Supabase Dashboard
2. Click **"Restore Project"**
3. Wait 1-2 minutes
4. Try again

---

### **Error: "password authentication failed"**

**Cause**: Wrong password

**Fix**:
1. Go to Supabase Dashboard → Settings → Database
2. Click **"Reset database password"**
3. Copy new password
4. Update `DB_PASSWORD` in `.env` (localhost) and Vercel
5. Redeploy (Vercel)

---

### **Error: "Connection timeout"**

**Cause**: Wrong port or firewall

**Fix**:
1. Use port **6543** (connection pooling) instead of 5432
2. Check Supabase network settings allow `0.0.0.0/0`

---

### **Error: "SSL connection required"**

**Cause**: SSL not enabled

**Fix**:
1. Set `DB_SSL=true` in `.env` and Vercel
2. Set `DB_SSL_REJECT_UNAUTHORIZED=false` in `.env` and Vercel
3. Redeploy (Vercel)

---

## 📋 **Complete Checklist**

### **For Localhost:**

- [ ] ✅ Supabase project is active (not paused)
- [ ] ✅ `backend/.env` file exists
- [ ] ✅ All environment variables are set correctly
- [ ] ✅ Test connection: `node test-supabase-connection.js`
- [ ] ✅ Backend starts: `npm start`
- [ ] ✅ Health check works: `http://localhost:8000/api/health`

### **For Vercel:**

- [ ] ✅ Supabase project is active (not paused)
- [ ] ✅ All environment variables set in Vercel (Production)
- [ ] ✅ Using port **6543** (connection pooling)
- [ ] ✅ Redeployed after setting variables
- [ ] ✅ Health check works: `https://your-project.vercel.app/api/health`

---

## 🚀 **Quick Commands**

### **Create .env file (PowerShell)**:
```powershell
cd backend
.\fix-env-supabase.ps1
```

### **Test connection**:
```bash
cd backend
node test-supabase-connection.js
```

### **Start backend (localhost)**:
```bash
cd backend
npm start
```

### **Check Supabase status**:
```powershell
cd backend
.\check-supabase-status.ps1
```

---

## ✅ **Expected Result**

**After fixing**:

1. **Localhost**: `http://localhost:8000/api/health` → `{"database": "connected"}`
2. **Vercel**: `https://your-project.vercel.app/api/health` → `{"database": "connected"}`
3. **Login works** on both localhost and Vercel
4. **No 503 errors**

---

## 📝 **Summary**

**What's wrong**: Database connection failing (503 error)

**Most common cause**: Supabase project is paused

**Quick fix**:
1. ✅ Restore Supabase project (1 min)
2. ✅ Create `backend/.env` file (1 min)
3. ✅ Set environment variables in Vercel (3 min)
4. ✅ Test connection (1 min)

**Total time**: ~5 minutes

---

**Follow these steps and your project will work on both localhost and Vercel!** 🚀

