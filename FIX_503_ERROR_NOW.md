# 🚨 Fix 503 Error NOW - Step by Step

## ❌ **Current Error**

```
503 Service Unavailable
Database connection failed
Error: getaddrinfo EAI_AGAIN
```

**This means**: Supabase project is **PAUSED** or hostname cannot be resolved.

---

## ✅ **IMMEDIATE FIX (2 Minutes)**

### **Step 1: Restore Supabase Project** ⚠️ **DO THIS FIRST**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Look for**:
   - ❌ **"Paused"** button → Click **"Restore"**
   - ⏸️ **"Inactive"** → Click **"Restore Project"**
   - ✅ **"Active"** → Continue to Step 2

**Wait 1-2 minutes** after restoring.

---

### **Step 2: Update .env File (Localhost)**

**Your .env file exists but needs port 6543**:

**Option A: Use PowerShell Script** (Easiest):
```powershell
cd backend
.\fix-env-supabase.ps1
```

**Option B: Manual Update**:
1. Open `backend/.env`
2. Change `DB_PORT=5432` to `DB_PORT=6543`
3. Save file

---

### **Step 3: Test Connection**

```bash
cd backend
node test-supabase-connection.js
```

**Expected**: `✅ Connection successful!`

**If still fails**:
- Wait 2 more minutes (Supabase needs time to start)
- Check Supabase Dashboard shows "Active"
- Try again

---

### **Step 4: Fix Vercel Environment Variables**

**Go to Vercel Dashboard**:
1. **Settings** → **Environment Variables**
2. **Update `DB_PORT`** to `6543` (if it's 5432)
3. **Verify all variables are set**:
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
4. **Redeploy** after updating

---

### **Step 5: Test Both**

**Test Localhost**:
```bash
cd backend
npm start
```

Visit: `http://localhost:8000/api/health`

**Test Vercel**:
Visit: `https://your-project.vercel.app/api/health`

**Both should show**: `{"database": "connected"}`

---

## 🔍 **Why This Error Happens**

### **Error: `getaddrinfo EAI_AGAIN`**

**Meaning**: Cannot resolve hostname (DNS lookup failed)

**Causes**:
1. ❌ **Supabase project is PAUSED** (90% of cases)
2. ❌ Wrong hostname
3. ❌ Network issue

**Fix**: Restore Supabase project (Step 1)

---

## 📋 **Quick Checklist**

- [ ] ✅ Supabase project is **Active** (not paused)
- [ ] ✅ `backend/.env` has `DB_PORT=6543`
- [ ] ✅ Vercel has `DB_PORT=6543`
- [ ] ✅ Test connection works: `node test-supabase-connection.js`
- [ ] ✅ Health check works: `/api/health` returns `{"database": "connected"}`

---

## 🚀 **Quick Commands**

**Update .env file**:
```powershell
cd backend
.\fix-env-supabase.ps1
```

**Test connection**:
```bash
cd backend
node test-supabase-connection.js
```

**Start backend**:
```bash
cd backend
npm start
```

---

## ✅ **Expected Result**

**After fixing**:

1. ✅ Connection test: `✅ Connection successful!`
2. ✅ Health check: `{"database": "connected"}`
3. ✅ Login works on localhost and Vercel
4. ✅ No more 503 errors

---

## 🎯 **Summary**

**Problem**: Supabase project is paused → DNS lookup fails → 503 error

**Solution**:
1. ✅ Restore Supabase project (1 min)
2. ✅ Update `.env` to use port 6543 (30 sec)
3. ✅ Update Vercel to use port 6543 (1 min)
4. ✅ Test connection (30 sec)

**Total time**: ~3 minutes

---

**Do Step 1 FIRST (Restore Supabase) - that's the main issue!** 🚀

