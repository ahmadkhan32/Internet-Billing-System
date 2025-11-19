# 🚨 FAST FIX: 503 Error + Localhost Setup

## ❌ **Your Error**

```
503 Service Unavailable
Database connection failed
```

---

## ⚡ **ULTRA QUICK FIX (3 Steps)**

### **Step 1: Run Fix Script** (30 seconds)

**Run this in PowerShell** (in project root):
```powershell
.\fix-503-error.ps1
```

**Or manually create** `backend/.env` file (see Step 2)

---

### **Step 2: Create `backend/.env` File** (1 minute)

**Create file**: `backend/.env`

**Copy this EXACT content**:
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

**Save as**: `backend/.env`

---

### **Step 3: Check Supabase Project** (1 minute) ⚠️ **CRITICAL**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Check status**:
   - ✅ **Active** → Good, continue
   - ❌ **Paused** → Click **"Restore"** or **"Resume"**
   - ⏸️ **Inactive** → Click **"Restore Project"**
4. **Wait** 1-2 minutes after restoring

**This fixes 90% of 503 errors!**

---

## 🚀 **Run on Localhost**

### **Terminal 1 - Start Backend**:

```bash
cd backend
npm install
npm start
```

**Expected output**:
```
✅ PostgreSQL connection established successfully.
Server running on port 8000
```

### **Terminal 2 - Start Frontend**:

```bash
cd frontend
npm install
npm run dev
```

**Expected output**:
```
VITE ready in XXX ms
➜  Local:   http://localhost:3001/
```

---

## ✅ **Test Everything**

### **1. Test Backend Health**:
Visit: [http://localhost:8000/api/health](http://localhost:8000/api/health)

**Should see**:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

### **2. Test Login**:
1. Open: [http://localhost:3001/login](http://localhost:3001/login)
2. Email: `admin@billing.com`
3. Password: `admin123`
4. Click **Login**

**Should redirect** to `/super-admin/dashboard`

---

## 🔧 **For Vercel Deployment**

### **Set Environment Variables in Vercel**:

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Add these** (set for **Production**):

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

5. **Redeploy** after adding variables

---

## 🔍 **Troubleshooting**

### **Error: "Cannot connect to database"**

**Fix**:
1. ✅ Check Supabase project is **active** (not paused)
2. ✅ Verify `backend/.env` file exists
3. ✅ Check all environment variables are set
4. ✅ Use port **6543** (connection pooling)

### **Error: "ENOTFOUND db.xxx.supabase.co"**

**Fix**:
- Supabase project is **paused**
- Go to Supabase Dashboard → Restore project
- Wait 1-2 minutes

### **Error: "password authentication failed"**

**Fix**:
- Wrong `DB_PASSWORD` in `.env` file
- Get fresh password from Supabase Dashboard
- Update `backend/.env` file

---

## 📋 **Quick Checklist**

**Before starting**:
- [ ] ✅ Supabase project is **active** (not paused)
- [ ] ✅ `backend/.env` file exists
- [ ] ✅ All environment variables are set

**After starting**:
- [ ] ✅ Backend shows "PostgreSQL connection established"
- [ ] ✅ Frontend runs on `http://localhost:3001`
- [ ] ✅ `/api/health` returns `{"database": "connected"}`
- [ ] ✅ Login works

---

## 🎯 **Summary**

**503 Error = Database Connection Failed**

**Most Common Cause**: Supabase project is paused

**Quick Fix**:
1. ✅ Restore Supabase project (1 min)
2. ✅ Create `backend/.env` file (1 min)
3. ✅ Start backend and frontend (2 min)

**Total Time**: 4 minutes

---

## 🚀 **One-Line Commands**

**Create .env file**:
```powershell
.\fix-503-error.ps1
```

**Start backend**:
```bash
cd backend && npm install && npm start
```

**Start frontend** (new terminal):
```bash
cd frontend && npm install && npm run dev
```

---

**Follow these steps and your project will work on localhost!** ✅

