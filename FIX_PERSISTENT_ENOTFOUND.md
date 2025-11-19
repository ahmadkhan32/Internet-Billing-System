# 🔧 Fix Persistent ENOTFOUND Error

## ❌ **Your Problem**

```
Error: getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

**Even though Supabase project shows "Active"**, connection keeps failing.

---

## 🎯 **Why This Happens**

### **Most Common Reasons**:

1. **Project is Actually Paused** (90% of cases)
   - Dashboard might show "Active" but project is paused
   - Free tier projects auto-pause after 1 week
   - Dashboard status might not update immediately

2. **Wrong Hostname**
   - Hostname might be outdated
   - Project might have been recreated
   - Connection string might be from different project

3. **Project Doesn't Exist**
   - Project might have been deleted
   - Account might have been suspended
   - Project might be in wrong region

4. **Network/DNS Issue**
   - Internet connection problem
   - DNS server not resolving
   - Firewall blocking

---

## ✅ **Complete Fix (Try All Solutions)**

### **Solution 1: Force Restore Project** ⚠️ **MOST IMPORTANT**

**Even if dashboard says "Active", force restore it:**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Check status**:
   - If you see **"Paused"** → Click **"Restore"**
   - If you see **"Active"** → Do this:
     - Click **"Pause"** (if available)
     - Wait 30 seconds
     - Click **"Restore"** or **"Resume"**
4. **Wait 3-5 minutes** for database to fully start
5. **Verify it's truly active**:
   - Go to **SQL Editor**
   - Run: `SELECT 1;`
   - If it works, database is active

**Why this works**: Sometimes dashboard shows "Active" but project is actually paused. Force restoring refreshes the connection.

---

### **Solution 2: Verify Hostname is Correct**

**Get fresh hostname from Supabase:**

1. **Go to**: Supabase Dashboard → Settings → Database
2. **Connection string** → **URI** tab
3. **Copy** the connection string
4. **Extract hostname** (between `@` and `:`)
5. **Compare** with `DB_HOST` in `backend/.env`
6. **If different**, update `backend/.env`:

```env
DB_HOST=db.xxxxx.supabase.co  # Use the NEW hostname from Supabase
```

---

### **Solution 3: Get Fresh Connection String**

**Update all credentials:**

1. **Go to**: Supabase Dashboard → Settings → Database
2. **Connection string** → **URI** tab
3. **Copy** the FULL connection string
4. **Run**:
   ```powershell
   cd backend
   .\get-supabase-credentials.ps1
   ```
5. **Paste** connection string
6. **Confirm** update

**This updates**:
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME

---

### **Solution 4: Use Connection Pooling Port**

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
4. **Test** connection

**Why**: Connection pooling (port 6543) is more reliable and faster.

---

### **Solution 5: Create New Supabase Project**

**If project keeps failing, create a new one:**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** **"New Project"**
3. **Create** new project:
   - Name: `Internet Billing System`
   - Database Password: (choose strong password)
   - Region: (choose closest)
4. **Wait** 2-3 minutes for project to be created
5. **Get connection string**:
   - Settings → Database → Connection string → URI tab
6. **Update credentials**:
   ```powershell
   cd backend
   .\get-supabase-credentials.ps1
   ```
7. **Run migrations**:
   - Go to SQL Editor in Supabase
   - Run: `supabase/migrations/001_initial_schema.sql`

---

### **Solution 6: Check Project Region**

**Verify project is in correct region:**

1. **Go to**: Supabase Dashboard → Settings → General
2. **Check** project region
3. **If wrong region**, you might need to create new project in correct region

---

## 🔍 **Run Comprehensive Diagnostic**

**I created a diagnostic tool**:

```bash
node comprehensive-db-diagnostic.js
```

**This will**:
- ✅ Check hostname format
- ✅ Test DNS resolution
- ✅ Test hostname reachability
- ✅ Provide specific fix steps
- ✅ Suggest alternative solutions

---

## 📋 **Step-by-Step Fix Checklist**

**Follow these in order**:

- [ ] ✅ **Step 1**: Force restore Supabase project (even if says active)
- [ ] ✅ **Step 2**: Wait 3-5 minutes after restoring
- [ ] ✅ **Step 3**: Get fresh connection string from Supabase
- [ ] ✅ **Step 4**: Update credentials using `get-supabase-credentials.ps1`
- [ ] ✅ **Step 5**: Use port 6543 (connection pooling)
- [ ] ✅ **Step 6**: Test connection: `node backend/check-db.js`
- [ ] ✅ **Step 7**: If still fails, create new Supabase project

---

## 🎯 **Most Likely Fix**

**Since connection keeps failing, try this**:

1. **Create a NEW Supabase project** (fresh start)
2. **Get connection string** from new project
3. **Update credentials** using the script
4. **Use port 6543** (connection pooling)
5. **Run migrations** in new project

**This usually fixes persistent connection issues.**

---

## 🔧 **Quick Fix Right Now**

**Run this diagnostic**:
```bash
node comprehensive-db-diagnostic.js
```

**Then follow the specific fix steps it provides.**

---

## 💡 **Why Dashboard Shows "Active" But Connection Fails**

**Possible reasons**:
1. **Dashboard cache** - Status might be cached
2. **Project in transition** - Restoring but not fully active
3. **Different project** - You might be looking at wrong project
4. **Region issue** - Project in different region than expected

**Solution**: Always force restore, even if says active.

---

## ✅ **Expected Result After Fix**

**When fixed, you should see**:
```
✅ DNS Resolution SUCCESS!
✅ Database connection is working!
```

**Then**:
- ✅ Start backend: `cd backend && npm start`
- ✅ Should see: `✅ PostgreSQL connection established successfully.`
- ✅ Test health: `http://localhost:8000/api/health`
- ✅ Should return: `{"database": "connected"}`

---

## 📝 **Summary**

**Persistent ENOTFOUND Error** = DNS cannot resolve hostname

**Most Common Cause**: Supabase project is paused (even if dashboard says active)

**Best Fix**:
1. Force restore project (pause → restore)
2. Get fresh connection string
3. Use port 6543 (connection pooling)
4. If still fails, create new project

**Time**: 5-10 minutes

---

**Run `node comprehensive-db-diagnostic.js` to get specific fix steps!** 🔧

