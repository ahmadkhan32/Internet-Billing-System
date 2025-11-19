# 🚨 Fix 503 Error - Final Solution

## ❌ **Your Current Error**

```
503 Service Unavailable
Database connection failed
```

**This means**: Your Supabase project is **PAUSED** or environment variables are missing.

---

## ✅ **IMMEDIATE FIX (3 Steps, 5 Minutes)**

### **STEP 1: Restore Supabase Project** ⚠️ **MOST IMPORTANT - DO THIS FIRST**

**The error `getaddrinfo EAI_AGAIN` means Supabase is paused!**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Click** your project: `qppdkzzmijjyoihzfdxw`
4. **Check the status**:
   - ❌ **"Paused"** → Click **"Restore"** or **"Resume"** button
   - ⏸️ **"Inactive"** → Click **"Restore Project"** button
   - ✅ **"Active"** → Good! Continue to Step 2

5. **Wait 2-3 minutes** after clicking Restore (database needs time to start)

**This fixes 90% of 503 errors!**

---

### **STEP 2: Fix Localhost (.env File)**

**Update your `backend/.env` file**:

**Option A: Use PowerShell Script** (Easiest):
```powershell
cd backend
.\fix-env-supabase.ps1
```

**Option B: Manual Update**:
1. Open `backend/.env` file
2. **Make sure it has these EXACT values**:

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

3. **Save** the file

**Important**: Use port **6543** (connection pooling) - better for both localhost and Vercel!

---

### **STEP 3: Fix Vercel Environment Variables**

**Set these in Vercel Dashboard**:

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Add/Update these variables** (one by one):

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
- ✅ Use port **6543** (not 5432)
- ✅ No spaces before/after `=`
- ✅ Copy values exactly

5. **After adding all variables**:
   - Go to **Deployments** → **Latest**
   - Click **"Redeploy"**
   - Wait 3-5 minutes

---

## 🧪 **Test After Fixing**

### **Test 1: Test Database Connection (Localhost)**

```bash
cd backend
node test-supabase-connection.js
```

**Expected output**:
```
✅ Connection successful!
✅ Supabase database is accessible
```

**If you see this**: ✅ **Connection works!**

**If you see error**:
- Wait 2 more minutes (Supabase needs time to fully start)
- Check Supabase Dashboard shows "Active"
- Try again

---

### **Test 2: Start Backend (Localhost)**

```bash
cd backend
npm start
```

**Expected output**:
```
✅ PostgreSQL connection established successfully.
Server running on port 8000
```

**Visit**: `http://localhost:8000/api/health`

**Should return**:
```json
{
  "status": "OK",
  "database": "connected"
}
```

---

### **Test 3: Test Vercel**

**Visit**: `https://your-project.vercel.app/api/health`

**Should return**:
```json
{
  "status": "OK",
  "database": "connected"
}
```

**If still 503**:
- Check Vercel function logs for specific error
- Verify all environment variables are set
- Wait 2-3 minutes after redeploy

---

### **Test 4: Test Login**

**Localhost**:
1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Visit: `http://localhost:3001/login`
4. Login: `admin@billing.com` / `admin123`

**Vercel**:
1. Visit: `https://your-project.vercel.app/login`
2. Login: `admin@billing.com` / `admin123`

**Should work without 503 error!**

---

## 🔍 **Why This Error Happens**

### **Error: `getaddrinfo EAI_AGAIN`**

**Meaning**: Cannot resolve hostname (DNS lookup failed)

**Causes**:
1. ❌ **Supabase project is PAUSED** (90% of cases) ← **YOUR ISSUE**
2. ❌ Wrong hostname in .env
3. ❌ Network connectivity issue

**Fix**: **Restore Supabase project** (Step 1 above)

---

## 📋 **Complete Checklist**

### **Before Testing:**

- [ ] ✅ Supabase project is **Active** (not paused) - **MOST IMPORTANT**
- [ ] ✅ `backend/.env` file exists and has correct values
- [ ] ✅ `DB_PORT=6543` in `.env` (not 5432)
- [ ] ✅ All environment variables set in Vercel
- [ ] ✅ `DB_PORT=6543` in Vercel (not 5432)
- [ ] ✅ Vercel project redeployed after setting variables

### **After Testing:**

- [ ] ✅ Connection test works: `node test-supabase-connection.js`
- [ ] ✅ Backend starts: `npm start`
- [ ] ✅ Health check works: `/api/health` returns `{"database": "connected"}`
- [ ] ✅ Login works on localhost
- [ ] ✅ Login works on Vercel
- [ ] ✅ No more 503 errors

---

## 🚀 **Quick Commands Reference**

### **Update .env file**:
```powershell
cd backend
.\fix-env-supabase.ps1
```

### **Test connection**:
```bash
cd backend
node test-supabase-connection.js
```

### **Start backend**:
```bash
cd backend
npm start
```

### **Start frontend**:
```bash
cd frontend
npm run dev
```

---

## ✅ **Expected Result**

**After completing all steps**:

1. ✅ **Localhost**: 
   - Backend: `http://localhost:8000/api/health` → `{"database": "connected"}`
   - Frontend: `http://localhost:3001/login` → Login works
   
2. ✅ **Vercel**: 
   - Backend: `https://your-project.vercel.app/api/health` → `{"database": "connected"}`
   - Frontend: `https://your-project.vercel.app/login` → Login works

3. ✅ **No more 503 errors** on both localhost and Vercel

---

## 🎯 **Summary**

**Problem**: Supabase project is paused → DNS lookup fails → 503 error

**Solution**:
1. ✅ **Restore Supabase project** (Step 1) - **DO THIS FIRST!**
2. ✅ Update `.env` file with port 6543 (Step 2)
3. ✅ Set environment variables in Vercel with port 6543 (Step 3)
4. ✅ Test connection (Step 4)

**Total time**: ~5 minutes

---

## ⚠️ **IMPORTANT**

**The #1 cause of 503 errors is a PAUSED Supabase project!**

**Always check Supabase Dashboard first** before troubleshooting other issues.

**After restoring, wait 2-3 minutes** for the database to fully start before testing.

---

**Follow these steps in order, and your project will work on both localhost and Vercel!** 🚀

