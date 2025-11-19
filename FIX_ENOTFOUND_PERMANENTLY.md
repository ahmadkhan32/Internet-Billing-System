# 🔧 Fix ENOTFOUND Error - Why It Happens Every Time

## ❌ **The Problem**

```
Error: getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

**This happens EVERY TIME because**: **Supabase Free Tier Auto-Pauses Projects**

---

## 🎯 **Root Cause**

### **Why ENOTFOUND Error Happens Every Time:**

1. **Supabase Free Tier Behavior**:
   - ✅ After **1 week of inactivity** → Project **auto-pauses**
   - ✅ When paused → **Hostname doesn't resolve** (ENOTFOUND)
   - ✅ Even if dashboard says "Active" → It might be paused

2. **The Cycle**:
   ```
   Day 1: Restore project → Works ✅
   Day 7: Inactivity → Auto-pauses ⏸️
   Day 8: Try to connect → ENOTFOUND ❌
   ```

3. **Your Current Status**:
   - ✅ `.env` file exists and is correct
   - ✅ Using port 6543 (connection pooling)
   - ❌ **Supabase project is PAUSED** → This is why it fails

---

## ✅ **Complete Fix (Do This Every Time)**

### **Step 1: Restore Supabase Project** (REQUIRED)

**This is the ONLY way to fix ENOTFOUND error:**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project: `qppdkzzmijjyoihzfdxw`
3. **Check status**:
   - If **"Paused"** → Click **"Restore"** button
   - If **"Active"** → Click **"Pause"** → Wait 30 seconds → Click **"Restore"**
4. **Wait 3-5 minutes** for database to fully start
5. **Verify**: Dashboard shows "Active" status

**Why force restore even if "Active"?**
- Sometimes dashboard shows "Active" but project is actually paused
- Force restore ensures it's truly active

---

### **Step 2: Test Connection**

```bash
cd backend
node check-db.js
```

**Should see**: `✅ Database connection is working!`

**If still fails**:
- ✅ Wait 2-3 more minutes (database might still be starting)
- ✅ Try again: `node check-db.js`
- ✅ Check Supabase dashboard shows "Active"

---

## 🔄 **Why It Keeps Happening**

### **The Problem**:

**Supabase Free Tier**:
- ⏸️ **Auto-pauses** after 1 week of inactivity
- ❌ **Paused projects** = Hostname doesn't resolve
- 🔄 **Cycle repeats** every time project pauses

### **Solutions**:

**Option 1: Restore Before Every Use** (Free)
- ✅ Always restore Supabase project before connecting
- ✅ Takes 3-5 minutes
- ✅ Works for development/testing

**Option 2: Upgrade Supabase Plan** (Paid)
- ✅ Paid plans don't auto-pause
- ✅ Always available
- ✅ Better for production

**Option 3: Use Connection Pooling Port** (Already Done)
- ✅ You're using port 6543 (good!)
- ✅ More reliable than port 5432
- ✅ Better for serverless/Vercel

---

## 📋 **Quick Fix Checklist**

**Every time you get ENOTFOUND error**:

1. [ ] ✅ **Restore Supabase project** (Dashboard → Restore)
2. [ ] ✅ **Wait 3-5 minutes** for database to start
3. [ ] ✅ **Test connection**: `node backend/check-db.js`
4. [ ] ✅ **Should see**: `✅ Database connection is working!`

**If still fails**:
- [ ] ✅ Check Supabase dashboard shows "Active"
- [ ] ✅ Verify `.env` file has correct credentials
- [ ] ✅ Try port 6543 (you're already using it)

---

## 🎯 **Your Current Configuration** (Already Correct)

**Your `.env` file**:
```env
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543  ✅ (Connection pooling - good!)
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

**Everything is correct!** The only issue is **Supabase project is paused**.

---

## 💡 **Prevention Tips**

1. **Restore Before Every Use**:
   - Always restore Supabase project before connecting
   - Takes 3-5 minutes but ensures it works

2. **Use Connection Pooling**:
   - ✅ You're already using port 6543 (good!)
   - More reliable than port 5432

3. **Keep Project Active**:
   - Use project regularly (at least once a week)
   - Or upgrade to paid plan (no auto-pause)

4. **For Production**:
   - Consider upgrading Supabase plan
   - Or use a different database provider
   - Or implement auto-restore script

---

## 🚀 **For Vercel Deployment**

**Same issue happens on Vercel**:
- If Supabase project is paused → Vercel deployment fails
- **Solution**: Always restore Supabase before deploying

**Vercel Environment Variables** (Set these):
```
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

**Before deploying**:
1. ✅ Restore Supabase project
2. ✅ Wait 3-5 minutes
3. ✅ Deploy to Vercel

---

## ✅ **Summary**

**Why ENOTFOUND error happens every time**:
- ❌ **Supabase project is paused** (free tier auto-pauses after inactivity)
- ❌ **Paused projects** = Hostname doesn't resolve

**How to fix**:
1. ✅ **Restore Supabase project** (Dashboard → Restore)
2. ✅ **Wait 3-5 minutes** for database to start
3. ✅ **Test connection**: `node backend/check-db.js`

**Your configuration is correct!** Just need to restore Supabase project. ✅

---

**The error happens because Supabase project is paused. Restore it and it will work!** 🚀

