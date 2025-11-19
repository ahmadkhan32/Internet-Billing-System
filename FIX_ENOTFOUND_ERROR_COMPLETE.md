# 🔧 Fix ENOTFOUND Error - Complete Guide

## ❌ **Your Error**

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

**This means**: DNS cannot resolve the Supabase hostname.

---

## 🎯 **Root Cause**

### **90% of Cases: Supabase Project is Paused**

Even if the dashboard shows "Active", the project might be:
- ⏸️ **Actually paused** (dashboard might not update immediately)
- ⏸️ **In transition** (restoring but not fully active)
- ⏸️ **Inactive** (needs manual restore)

---

## ✅ **Complete Fix (5 Steps)**

### **Step 1: Verify Supabase Project Status**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Check status carefully**:
   - Look for **"Paused"** badge or button
   - Look for **"Inactive"** status
   - Check **Settings → General** for project status

**Even if it says "Active"**, try Step 2.

---

### **Step 2: Force Restore Project**

**Sometimes dashboard shows "Active" but project is actually paused:**

1. **Pause the project** (if option available):
   - Click **"Pause"** button
   - Wait 30 seconds

2. **Restore the project**:
   - Click **"Restore"** or **"Resume"** button
   - **Wait 2-3 minutes** for database to fully start

3. **Verify it's truly active**:
   - Check **Settings → Database**
   - Try running a SQL query in SQL Editor
   - If SQL Editor works, database is active

---

### **Step 3: Get Fresh Connection String**

**Get new credentials from Supabase:**

1. **Go to**: Supabase Dashboard → Your Project
2. **Settings** → **Database**
3. **Connection string** section:
   - Click **"URI"** tab
   - Copy the **full connection string**
   - It looks like: `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

4. **Update credentials**:
   ```powershell
   cd backend
   .\get-supabase-credentials.ps1
   ```
   - Paste the connection string
   - Confirm update

---

### **Step 4: Use Connection Pooling Port**

**Port 6543 is more reliable:**

1. **Open** `backend/.env`
2. **Change**:
   ```
   DB_PORT=5432
   ```
   **To**:
   ```
   DB_PORT=6543
   ```
3. **Save** file

**Why**: Connection pooling (port 6543) is more reliable and faster.

---

### **Step 5: Test Connection**

**Run diagnostic**:
```bash
node fix-enotfound-error.js
```

**Or quick test**:
```bash
cd backend
node check-db.js
```

**Should see**: `✅ Database connection is working!`

---

## 🔍 **Run Comprehensive Diagnostic**

**I created a diagnostic tool**:

```bash
node fix-enotfound-error.js
```

**This will**:
- ✅ Test DNS resolution
- ✅ Test database connection
- ✅ Try both ports (5432 and 6543)
- ✅ Show exact error and fix steps

---

## 📋 **Quick Fix Checklist**

- [ ] ✅ Check Supabase project status (even if says "Active")
- [ ] ✅ Force restore project (pause → restore)
- [ ] ✅ Wait 2-3 minutes after restoring
- [ ] ✅ Get fresh connection string from Supabase
- [ ] ✅ Update credentials using `get-supabase-credentials.ps1`
- [ ] ✅ Use port 6543 (connection pooling)
- [ ] ✅ Test connection with `fix-enotfound-error.js`

---

## 🚀 **One-Command Fix**

**Run this to diagnose and fix**:

```bash
node fix-enotfound-error.js
```

**This will**:
1. Check DNS resolution
2. Test connection on current port
3. Try connection pooling port (6543)
4. Show exact fix steps

---

## 💡 **Why This Happens**

**Supabase Free Tier Behavior**:
- Projects **auto-pause** after 1 week of inactivity
- Dashboard might show "Active" but project is actually paused
- DNS hostname becomes unreachable when paused
- This causes `ENOTFOUND` error

**Solution**:
- ✅ Restore project (even if dashboard says active)
- ✅ Use connection pooling port 6543
- ✅ Get fresh credentials

---

## 🔧 **Alternative: Verify Hostname**

**If restore doesn't work, verify hostname**:

1. **Go to**: Supabase Dashboard → Settings → Database
2. **Check** the hostname shown
3. **Compare** with `DB_HOST` in `backend/.env`
4. **Must match exactly** (no `https://`, no port)

**Correct format**:
```
DB_HOST=db.xxxxx.supabase.co
```

**Wrong formats**:
```
DB_HOST=https://db.xxxxx.supabase.co  ❌
DB_HOST=db.xxxxx.supabase.co:5432    ❌
DB_HOST=xxxxx.supabase.co             ❌
```

---

## ✅ **Expected Result After Fix**

**When fixed, you should see**:
```
✅ DNS Resolution SUCCESS!
✅ Database connection is working!
```

**Then you can**:
- ✅ Start backend: `cd backend && npm start`
- ✅ Test health: `http://localhost:8000/api/health`
- ✅ Should return: `{"database": "connected"}`

---

## 📝 **Summary**

**ENOTFOUND Error = DNS Cannot Resolve Hostname**

**Most Common Cause**: Supabase project is paused

**Quick Fix**:
1. Restore Supabase project (even if says active)
2. Get fresh connection string
3. Use port 6543 (connection pooling)
4. Test connection

**Time**: 3-5 minutes

---

**Run `node fix-enotfound-error.js` to diagnose and fix automatically!** 🔧

