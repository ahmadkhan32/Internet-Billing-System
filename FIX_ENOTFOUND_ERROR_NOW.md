# 🔴 FIX ENOTFOUND ERROR NOW - Step by Step

## 🎯 **The Problem**

**Error**: `getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co`

**Cause**: Your Supabase project is **PAUSED** (even if dashboard shows "Active")

---

## ✅ **IMMEDIATE FIX (Do This Now)**

### **Step 1: Restore Supabase Project**

1. **Open**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Click** your project (the one with ID: `qppdkzzmijjyoihzfdxw`)
4. **Check the status**:
   - **If you see "Paused"** → Click the **"Restore"** button
   - **If you see "Active"** → Click **"Pause"** → Wait 30 seconds → Click **"Restore"**
5. **Wait 2-3 minutes** for the database to fully start

**Why force restore even if "Active"?**
- Sometimes the dashboard doesn't update immediately
- A pause/restore cycle ensures the database is actually running

---

### **Step 2: Get Fresh Connection String**

1. **In Supabase Dashboard** → **Settings** (gear icon)
2. **Database** → **Connection string** tab
3. **URI** tab → **Copy** the full connection string
   - Format: `postgresql://postgres:[PASSWORD]@db.qppdkzzmijjyoihzfdxw.supabase.co:5432/postgres`

---

### **Step 3: Update Your .env File**

**Option A: Use PowerShell Script (Easiest)**

```powershell
cd backend
.\get-supabase-credentials.ps1
```

**Paste** the connection string when prompted.

**Option B: Manual Update**

1. **Open**: `backend/.env`
2. **Update** these values:
   ```env
   DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
   DB_PORT=6543
   DB_USER=postgres
   DB_PASSWORD=YOUR_PASSWORD_HERE
   DB_NAME=postgres
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   ```
3. **Save** the file

**Important**: Use port **6543** (connection pooling) instead of 5432 for better reliability.

---

### **Step 4: Test Connection**

```powershell
cd backend
node check-db.js
```

**Expected output**:
```
✅ SUCCESS! Database connection is working!
```

**If you still see error**:
- ✅ Wait 2 more minutes (database might still be starting)
- ✅ Try again: `node check-db.js`
- ✅ Verify connection string is correct

---

## 🔄 **Why This Error Happens Every Time**

### **Root Cause: Supabase Free Tier Auto-Pause**

**Supabase free tier projects**:
- ✅ Auto-pause after **7 days of inactivity**
- ✅ When paused, DNS cannot resolve hostname
- ✅ This causes `ENOTFOUND` error

**This is expected behavior, not a bug!**

---

## 🎯 **Permanent Solutions**

### **Solution 1: Upgrade to Supabase Pro** (Recommended for Production)

**Cost**: $25/month

**Benefits**:
- ✅ Projects never auto-pause
- ✅ Always available
- ✅ No more ENOTFOUND errors
- ✅ Better for production

**Upgrade**: [supabase.com/dashboard/project/_/settings/billing](https://supabase.com/dashboard/project/_/settings/billing)

---

### **Solution 2: Switch to Alternative Database** (Free Options)

**Option A: Neon** (PostgreSQL)
- ✅ Free tier doesn't auto-pause
- ✅ Always available
- ✅ Similar to Supabase

**Option B: Railway** (PostgreSQL)
- ✅ Free tier available
- ✅ No auto-pause
- ✅ Easy setup

**Option C: Render** (PostgreSQL)
- ✅ Free tier available
- ✅ No auto-pause
- ✅ Good for production

---

### **Solution 3: Keep Project Active** (Workaround)

**Set up a monitoring service** that pings your database every 6 days:

1. **Use UptimeRobot** (free)
2. **Set up HTTP monitor** for your backend health endpoint
3. **Check every 6 days** to keep project active

**But**: This is a workaround, not a permanent solution.

---

## 📋 **Complete Checklist**

**Every time you get ENOTFOUND error:**

- [ ] ✅ Go to [supabase.com/dashboard](https://supabase.com/dashboard)
- [ ] ✅ Click your project
- [ ] ✅ Check status (Paused/Active)
- [ ] ✅ Click "Restore" (or Pause → Restore)
- [ ] ✅ Wait 2-3 minutes
- [ ] ✅ Get fresh connection string from Supabase
- [ ] ✅ Update `backend/.env` file
- [ ] ✅ Use port 6543 (connection pooling)
- [ ] ✅ Test: `node backend/check-db.js`
- [ ] ✅ Should see: `✅ SUCCESS! Database connection is working!`

---

## 🔧 **For Vercel Deployment**

**After fixing locally, update Vercel environment variables:**

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Your project** → **Settings** → **Environment Variables**
3. **Update** these values:
   ```
   DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
   DB_PORT=6543
   DB_USER=postgres
   DB_PASSWORD=YOUR_PASSWORD_HERE
   DB_NAME=postgres
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   ```
4. **Redeploy** your project

---

## ✅ **Quick Test Commands**

**Test connection**:
```powershell
cd backend
node check-db.js
```

**Check environment variables**:
```powershell
cd backend
node check-env.js
```

**Diagnose full issue**:
```powershell
node diagnose-database-connection.js
```

---

## 📊 **Summary**

**Why error happens**:
- ❌ Supabase free tier auto-pauses after 7 days
- ❌ When paused, DNS cannot resolve → ENOTFOUND error

**Immediate fix**:
1. ✅ Restore Supabase project
2. ✅ Get fresh connection string
3. ✅ Update `.env` file
4. ✅ Use port 6543
5. ✅ Test connection

**Permanent solutions**:
1. ✅ Upgrade to Supabase Pro ($25/month) - **Best**
2. ✅ Switch to Neon/Railway/Render - **Free alternatives**
3. ✅ Restore manually every time - **Temporary**

---

**Follow these steps and your connection will work!** ✅

