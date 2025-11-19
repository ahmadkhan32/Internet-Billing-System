# ⚡ Quick Fix for ENOTFOUND Error

## 🚨 **You're Getting This Error**:

```
❌ Connection Failed!
Error: getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

---

## ✅ **3-Step Quick Fix**

### **Step 1: Check What's Wrong**

```bash
cd backend
npm run auto-restore
```

**OR**:
```bash
node backend/auto-restore-supabase.js
```

**This will tell you exactly what's wrong and how to fix it.**

---

### **Step 2: Restore Supabase Project**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Restore**:
   - If shows **"Paused"** → Click **"Restore"**
   - If shows **"Active"** → Click **"Pause"** → Wait 30s → Click **"Restore"**
4. **Wait** 3-5 minutes for database to start

---

### **Step 3: Verify It Works**

```bash
cd backend
npm run check-connection
```

**OR**:
```bash
node backend/check-db.js
```

**Should see**: `✅ Database connection is working!`

---

## 🔍 **Why This Happens**

**Supabase free tier**:
- ✅ Auto-pauses after **1 week of inactivity**
- ✅ When paused → Hostname unreachable → `ENOTFOUND`
- ✅ You restore → Works → Pauses again → Repeat

**This is why it happens "every time"!**

---

## ✅ **Prevent It From Happening Again**

### **Option 1: Set Up Monitoring (Free)**

**UptimeRobot** (free):
1. Sign up: [uptimerobot.com](https://uptimerobot.com)
2. Add monitor: `https://your-api.vercel.app/api/health`
3. Set interval: Every 6 hours
4. **Done!** Keeps project active automatically

### **Option 2: Upgrade to Pro**

**Supabase Pro** ($25/month):
- ✅ No auto-pause
- ✅ Always available

---

## 📋 **Complete Commands**

```bash
# Check what's wrong
cd backend
npm run auto-restore

# After restoring Supabase, verify
npm run check-connection

# Or use direct commands
node backend/auto-restore-supabase.js
node backend/check-db.js
```

---

## 🎯 **Summary**

**Quick fix**:
1. ✅ Run: `npm run auto-restore` (in backend folder)
2. ✅ Restore project in Supabase dashboard
3. ✅ Wait 3-5 minutes
4. ✅ Verify: `npm run check-connection`

**Prevent it**:
- ✅ Set up UptimeRobot monitoring (free)
- ✅ Or upgrade to Supabase Pro

---

**Follow these steps and the error will be fixed!** ✅

