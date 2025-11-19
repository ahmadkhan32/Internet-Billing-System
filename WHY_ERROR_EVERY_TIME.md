# 🔴 Why You Get ENOTFOUND Error Every Time

## 🎯 **The Root Cause**

**The `ENOTFOUND` error happens because your Supabase project keeps getting PAUSED.**

### **Why Supabase Projects Pause:**

1. **Free Tier Auto-Pause**: Supabase free tier projects automatically pause after **7 days of inactivity**
2. **Even if dashboard shows "Active"**: Sometimes the dashboard doesn't update immediately
3. **DNS becomes unreachable**: When paused, the hostname `db.qppdkzzmijjyoihzfdxw.supabase.co` cannot be resolved

---

## 🔍 **What Happens When Project is Paused:**

```
❌ DNS Lookup: db.qppdkzzmijjyoihzfdxw.supabase.co
   → Cannot resolve hostname
   → Error: getaddrinfo ENOTFOUND
```

**This is why you see the error every time!**

---

## ✅ **Permanent Solutions**

### **Solution 1: Restore Project Every Time (Quick Fix)**

**Every time you get the error:**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **If you see "Paused"** → Click **"Restore"**
4. **If you see "Active"** → Click **"Pause"** → Wait 30 seconds → Click **"Restore"**
5. **Wait 2-3 minutes** for database to start
6. **Test connection**: `cd backend && node check-db.js`

**This fixes it temporarily, but it will pause again after 7 days of inactivity.**

---

### **Solution 2: Upgrade to Paid Plan (Permanent Fix)**

**Supabase Pro Plan ($25/month)**:
- ✅ Projects never auto-pause
- ✅ Always available
- ✅ No more ENOTFOUND errors

**Upgrade**: [supabase.com/dashboard/project/_/settings/billing](https://supabase.com/dashboard/project/_/settings/billing)

---

### **Solution 3: Keep Project Active (Workaround)**

**Keep your project active by:**

1. **Setting up a cron job** to ping your database every 6 days
2. **Using a monitoring service** that checks your database regularly
3. **Making regular API calls** to your backend (keeps it active)

**But**: This is a workaround, not a permanent solution.

---

## 🔧 **Immediate Fix Steps**

### **Step 1: Restore Supabase Project**

1. **Visit**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project: `qppdkzzmijjyoihzfdxw`
3. **Check status**:
   - If **"Paused"** → Click **"Restore"**
   - If **"Active"** → Click **"Pause"** → Wait 30s → Click **"Restore"**
4. **Wait 2-3 minutes** for database to fully start

### **Step 2: Verify Connection String**

1. **Go to**: Supabase Dashboard → Settings → Database
2. **Connection string** → **URI** tab
3. **Copy** the full connection string
4. **Update your `.env` file**:
   ```powershell
   cd backend
   .\get-supabase-credentials.ps1
   ```
5. **Paste** the connection string

### **Step 3: Use Connection Pooling Port**

**In `backend/.env`**:
```env
DB_PORT=6543
```

**Why**: Port 6543 (connection pooling) is more reliable for serverless/Vercel.

### **Step 4: Test Connection**

```powershell
cd backend
node check-db.js
```

**Should see**: `✅ SUCCESS! Database connection is working!`

---

## 📋 **Why This Keeps Happening**

### **Free Tier Limitations:**

| Feature | Free Tier | Pro Tier |
|---------|-----------|----------|
| Auto-pause | ✅ Yes (after 7 days) | ❌ No |
| Always available | ❌ No | ✅ Yes |
| Connection reliability | ⚠️ Low | ✅ High |

**Your project is on FREE tier, so it auto-pauses.**

---

## 🎯 **Best Solution for Production**

### **For Production Deployment:**

1. **Upgrade to Supabase Pro** ($25/month)
   - ✅ Projects never pause
   - ✅ Always available
   - ✅ Better for production

2. **OR Use a Different Database**:
   - **Neon** (PostgreSQL) - Free tier doesn't pause
   - **Railway** (PostgreSQL) - Free tier available
   - **Render** (PostgreSQL) - Free tier available

---

## 🔄 **Automated Fix Script**

**Create a script to check and restore automatically:**

```javascript
// auto-restore-supabase.js
// Run this daily to keep project active

const https = require('https');

// Check if database is reachable
const checkDatabase = () => {
  // Your database connection check
  // If fails, send alert to restore
};
```

**But**: This requires Supabase API access and is complex.

---

## ✅ **Quick Checklist**

**Every time you get ENOTFOUND error:**

- [ ] ✅ Go to Supabase Dashboard
- [ ] ✅ Check project status
- [ ] ✅ If paused → Click "Restore"
- [ ] ✅ Wait 2-3 minutes
- [ ] ✅ Test connection: `node backend/check-db.js`
- [ ] ✅ If still fails → Get fresh connection string
- [ ] ✅ Update `.env` file
- [ ] ✅ Use port 6543 (connection pooling)

---

## 📊 **Summary**

**Why error happens every time:**
- ❌ Supabase free tier auto-pauses after 7 days
- ❌ When paused, DNS cannot resolve hostname
- ❌ This causes ENOTFOUND error

**Permanent solutions:**
1. ✅ Upgrade to Supabase Pro ($25/month) - **Best for production**
2. ✅ Switch to Neon/Railway/Render - **Free alternatives**
3. ✅ Restore manually every time - **Temporary fix**

**Immediate fix:**
1. ✅ Restore Supabase project
2. ✅ Get fresh connection string
3. ✅ Use port 6543
4. ✅ Test connection

---

**The error happens because Supabase free tier auto-pauses. This is expected behavior, not a bug!** 🔴
