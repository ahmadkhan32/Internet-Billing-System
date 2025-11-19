# 🔍 Why ENOTFOUND Error Happens Every Time

## ❌ **The Error**

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

**This means**: DNS cannot resolve the hostname → **Database is unreachable**

---

## 🎯 **Root Causes (Why It Keeps Happening)**

### **1. Supabase Project is PAUSED** ⚠️ **MOST COMMON**

**Supabase Free Tier Auto-Pauses Projects**:
- After 1 week of inactivity → Project pauses
- Even if dashboard says "Active" → It might be paused
- Paused projects = Hostname doesn't resolve (ENOTFOUND)

**Why it keeps happening**:
- ✅ You restore it → Works for a while
- ❌ After inactivity → Auto-pauses again
- ❌ You try to connect → ENOTFOUND error

**Solution**: **Restore project EVERY TIME before connecting**

---

### **2. Missing .env File** ⚠️ **YOUR CURRENT ISSUE**

**Your `.env` file is missing**:
- ❌ No `.env` file in `backend/` directory
- ❌ Environment variables not loaded
- ❌ Connection fails immediately

**Solution**: **Create `.env` file with correct credentials**

---

### **3. Wrong Hostname or Credentials**

**Possible issues**:
- ❌ Wrong `DB_HOST` value
- ❌ Project was deleted/recreated
- ❌ Credentials changed

**Solution**: **Get fresh credentials from Supabase Dashboard**

---

### **4. Using Wrong Port**

**Issue**:
- ❌ Using port `5432` (direct connection) → Less reliable
- ✅ Should use port `6543` (connection pooling) → More reliable

**Solution**: **Use port 6543 for better reliability**

---

## ✅ **Complete Fix (Step-by-Step)**

### **Step 1: Restore Supabase Project** (CRITICAL)

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project: `qppdkzzmijjyoihzfdxw`
3. **Check status**:
   - If **"Paused"** → Click **"Restore"**
   - If **"Active"** → Click **"Pause"** → Wait 30 seconds → Click **"Restore"**
4. **Wait 3-5 minutes** for database to fully start

**Why**: Even if it says "Active", forcing a restore refreshes the connection.

---

### **Step 2: Get Fresh Connection String**

1. **Supabase Dashboard** → **Settings** → **Database**
2. **Connection string** → **URI** tab
3. **Copy** the full connection string:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.qppdkzzmijjyoihzfdxw.supabase.co:5432/postgres
   ```

---

### **Step 3: Create .env File** (YOUR MAIN ISSUE)

**Your `.env` file is missing!** Create it:

**Option A: Use PowerShell Script** (Easiest)

```powershell
cd backend
.\get-supabase-credentials.ps1
```

**Paste** the connection string when prompted.

**Option B: Create Manually**

1. **Create file**: `backend/.env`
2. **Add this content** (replace password with your actual password):

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

**Important**:
- ✅ Use port **6543** (connection pooling - more reliable)
- ✅ Replace `DB_PASSWORD` with your actual password from Supabase
- ✅ Save file as `.env` (not `.env.txt`)

---

### **Step 4: Test Connection**

```bash
cd backend
node check-db.js
```

**Should see**: `✅ Database connection is working!`

**If still fails**:
- ✅ Verify Supabase project is restored
- ✅ Check `.env` file exists and has correct values
- ✅ Try port 6543 instead of 5432

---

## 🔄 **Why It Keeps Happening**

### **The Cycle**:

1. ✅ You restore Supabase → Works
2. ⏰ After 1 week of inactivity → Auto-pauses
3. ❌ You try to connect → ENOTFOUND error
4. 🔄 Repeat...

### **Solutions**:

**Option 1: Restore Before Every Use**
- Always restore Supabase project before connecting
- Takes 3-5 minutes

**Option 2: Upgrade Supabase Plan**
- Paid plans don't auto-pause
- More reliable for production

**Option 3: Use Connection Pooling Port**
- Port 6543 is more reliable
- Better for serverless/Vercel

---

## 📋 **Quick Checklist**

**Before connecting**:
- [ ] ✅ Supabase project is restored (not paused)
- [ ] ✅ `.env` file exists in `backend/` directory
- [ ] ✅ All environment variables are set correctly
- [ ] ✅ Using port 6543 (connection pooling)
- [ ] ✅ Password is correct (from Supabase Dashboard)

**To test**:
```bash
cd backend
node check-db.js
```

---

## 🎯 **Your Current Issue**

**You're missing the `.env` file!**

**Fix now**:
1. ✅ Restore Supabase project
2. ✅ Create `backend/.env` file (use template above)
3. ✅ Test: `node backend/check-db.js`

---

## 💡 **Pro Tips**

1. **Always restore Supabase before connecting** (even if it says "Active")
2. **Use port 6543** (connection pooling) for better reliability
3. **Keep `.env` file** in `backend/` directory (never commit to Git)
4. **Test connection** before deploying: `node backend/check-db.js`

---

**The main issue: Your `.env file is missing!** Create it and the connection will work! ✅

