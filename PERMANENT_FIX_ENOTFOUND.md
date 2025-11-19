# 🔧 Permanent Fix for ENOTFOUND Error

## 🎯 **Quick Answer**

**Why it happens every time**:
- ✅ Supabase free tier **auto-pauses after 1 week of inactivity**
- ✅ When paused → Hostname unreachable → `ENOTFOUND` error
- ✅ You restore → Works → Pauses again → Repeat cycle

---

## ✅ **3 Permanent Solutions**

### **Solution 1: Keep Project Active (Free)**

**Set up a weekly health check** to ping your API:

#### **Option A: Using UptimeRobot (Free)**

1. **Sign up**: [uptimerobot.com](https://uptimerobot.com)
2. **Add Monitor**:
   - Type: HTTP(s)
   - URL: `https://your-api.vercel.app/api/health`
   - Interval: Every 6 hours
3. **Save** → Keeps Supabase active automatically

#### **Option B: Using Cron Job**

**If you have a server**:
```bash
# Add to crontab (runs every Monday at 9 AM)
0 9 * * 1 curl https://your-api.vercel.app/api/health
```

#### **Option C: GitHub Actions (Free)**

Create `.github/workflows/keep-alive.yml`:
```yaml
name: Keep Supabase Active

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM
  workflow_dispatch:

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping API
        run: |
          curl -f https://your-api.vercel.app/api/health || exit 0
```

**This keeps your project active automatically!**

---

### **Solution 2: Upgrade to Supabase Pro ($25/month)**

**Benefits**:
- ✅ No auto-pause
- ✅ Always available
- ✅ Better performance
- ✅ Production-ready

**Upgrade**: [supabase.com/dashboard](https://supabase.com/dashboard) → Your Project → Settings → Billing

---

### **Solution 3: Use Connection Pooling Port**

**Always use port `6543`** (connection pooling):
- ✅ More reliable
- ✅ Better for serverless
- ✅ Handles pauses better

**Update `backend/.env`**:
```env
DB_PORT=6543
```

---

## 🔧 **Immediate Fix (When Error Happens)**

### **Step 1: Check Status**

```bash
cd backend
node auto-restore-supabase.js
```

**This will tell you**:
- ✅ If DNS is working
- ✅ If database is accessible
- ✅ Exact steps to fix

### **Step 2: Restore Project**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Restore**:
   - If "Paused" → Click **"Restore"**
   - If "Active" → Click **"Pause"** → Wait 30s → Click **"Restore"**
4. **Wait** 3-5 minutes

### **Step 3: Verify**

```bash
node backend/check-db.js
```

**Should see**: `✅ Database connection is working!`

---

## 📋 **Complete Setup Checklist**

### **1. Fix Current Error**

- [ ] ✅ Run: `node backend/auto-restore-supabase.js`
- [ ] ✅ Restore Supabase project
- [ ] ✅ Wait 3-5 minutes
- [ ] ✅ Verify: `node backend/check-db.js`

### **2. Prevent Future Errors**

**Choose one**:
- [ ] ✅ Set up UptimeRobot monitoring (free)
- [ ] ✅ Set up GitHub Actions cron (free)
- [ ] ✅ Upgrade to Supabase Pro ($25/month)

### **3. Use Best Practices**

- [ ] ✅ Use port `6543` (connection pooling)
- [ ] ✅ Set `DB_PORT=6543` in `.env`
- [ ] ✅ Test connection before deploying

---

## 🎯 **Recommended Setup**

### **For Free Tier**:

1. ✅ **Set up UptimeRobot** (monitors every 6 hours)
2. ✅ **Use port 6543** in `.env`
3. ✅ **Keep `auto-restore-supabase.js`** for quick checks

### **For Production**:

1. ✅ **Upgrade to Supabase Pro** (no auto-pause)
2. ✅ **Use port 6543** (connection pooling)
3. ✅ **Set up monitoring** (UptimeRobot or similar)

---

## 📊 **Error Prevention Timeline**

**Before (Current)**:
```
Day 1-7: Works ✅
Day 8: Auto-pause → ENOTFOUND ❌
You restore → Works ✅
Day 9-15: Works ✅
Day 16: Auto-pause → ENOTFOUND ❌
...repeat forever
```

**After (With Monitoring)**:
```
Day 1-∞: Works ✅ (monitoring keeps it active)
No more ENOTFOUND errors! ✅
```

---

## 🔍 **Quick Diagnostic**

**When you get ENOTFOUND**:

```bash
cd backend
node auto-restore-supabase.js
```

**This will**:
- ✅ Check DNS resolution
- ✅ Test database connection
- ✅ Provide exact fix steps
- ✅ Tell you if project is paused

---

## ✅ **Summary**

**Why it happens**:
- ✅ Supabase free tier auto-pauses after 1 week
- ✅ When paused → `ENOTFOUND` error

**Permanent fixes**:
1. ✅ **Set up monitoring** (UptimeRobot - free)
2. ✅ **Upgrade to Pro** ($25/month - no auto-pause)
3. ✅ **Use port 6543** (more reliable)

**Immediate fix**:
- ✅ Run: `node backend/auto-restore-supabase.js`
- ✅ Restore project in Supabase dashboard
- ✅ Wait 3-5 minutes

---

**Follow these steps and you'll never see ENOTFOUND again!** ✅

