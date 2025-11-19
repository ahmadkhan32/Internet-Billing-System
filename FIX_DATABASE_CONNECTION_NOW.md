# 🔧 Fix Database Connection - Step by Step Guide

## ❌ **Current Error**

```
❌ Database connection failed before query: getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
Status: 503 Service Unavailable
```

**This means**: Supabase project is **PAUSED** and needs to be restored.

---

## ✅ **Quick Fix (5 Minutes)**

### **Step 1: Restore Supabase Project** (2 minutes)

1. **Open**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your Supabase account
3. **Find** your project: `qppdkzzmijjyoihzfdxw`
4. **Click** on the project
5. **Look for** "Paused" or "Restore" button
6. **Click "Restore"** (or "Pause" → Wait 30s → "Restore")
7. **Wait 3-5 minutes** for database to start

**Visual Guide**:
- If you see **"Paused"** → Click **"Restore"**
- If you see **"Active"** → Click **"Pause"** → Wait 30s → Click **"Restore"**
- Wait until status shows **"Active"** and green indicator

---

### **Step 2: Verify Database is Ready** (1 minute)

**Option A: Use Check Script** (Recommended)
```bash
cd backend
npm run check-connection
```

**Should see**:
```
✅ PostgreSQL connection established successfully.
```

**Option B: Use Hostname Check**
```bash
cd backend
npm run check-hostname
```

**Should see**:
```
✅ DNS Resolution: SUCCESS!
✅ Hostname is valid and database is accessible!
```

**If still failing**: Wait 2-3 more minutes and try again.

---

### **Step 3: Restart Backend Server** (30 seconds)

**Stop current backend**:
- Press `Ctrl+C` in the backend terminal

**Start backend again**:
```bash
cd backend
npm start
```

**Should see**:
```
✅ PostgreSQL connection established successfully.
✅ Database connection established successfully.
🚀 Server running on port 8000
```

**No more ENOTFOUND errors!**

---

### **Step 4: Test Login** (30 seconds)

**Option A: Via Frontend**
1. Open: http://localhost:3002
2. Enter email: `admin@billing.com`
3. Enter password: `admin123`
4. Click "Login"
5. Should redirect to dashboard ✅

**Option B: Via Test Script**
```bash
cd backend
npm run test-login
```

**Should see**:
```
✅ Login SUCCESS!
✅ All login credentials are working!
```

---

## 🔍 **Verify Supabase is Restored**

### **Check 1: Supabase Dashboard**

1. Go to: https://supabase.com/dashboard
2. Click your project
3. **Status should show**: "Active" (green indicator)
4. **Settings → Database** should show connection info

### **Check 2: DNS Resolution**

```bash
cd backend
npm run check-hostname
```

**Success looks like**:
```
✅ DNS Resolution: SUCCESS!
📋 Resolved IP Addresses:
   1. xxx.xxx.xxx.xxx
```

### **Check 3: Database Connection**

```bash
cd backend
npm run check-connection
```

**Success looks like**:
```
✅ PostgreSQL connection established successfully.
```

---

## ⚠️ **Common Issues**

### **Issue 1: "Still getting ENOTFOUND after restore"**

**Solution**:
- Wait 5-10 minutes (database takes time to fully start)
- Check Supabase dashboard shows "Active"
- Try DNS check: `npm run check-hostname`
- Restart backend: Stop and run `npm start` again

### **Issue 2: "Dashboard shows Active but still failing"**

**Solution**:
- Click "Pause" → Wait 30 seconds → Click "Restore"
- Wait 5 minutes
- Check DNS: `npm run check-hostname`
- Restart backend

### **Issue 3: "Can't find Restore button"**

**Solution**:
- Look for "Pause" button (project is active but paused internally)
- Click "Pause" → Wait 30s → Click "Restore"
- Or look in Settings → General → Project Status

---

## 📋 **Complete Checklist**

- [ ] Step 1: Restore Supabase project
- [ ] Step 2: Wait 3-5 minutes
- [ ] Step 3: Verify Supabase dashboard shows "Active"
- [ ] Step 4: Run `npm run check-hostname` (should succeed)
- [ ] Step 5: Run `npm run check-connection` (should succeed)
- [ ] Step 6: Restart backend server
- [ ] Step 7: Test login via frontend or test script
- [ ] Step 8: Verify login works ✅

---

## 🎯 **Expected Result**

**After completing all steps**:

1. ✅ Backend shows: `✅ PostgreSQL connection established successfully.`
2. ✅ No more ENOTFOUND errors
3. ✅ Login works: `admin@billing.com` / `admin123`
4. ✅ Frontend redirects to dashboard
5. ✅ All API endpoints work

---

## 💡 **Quick Commands Reference**

```bash
# Check if Supabase is ready
cd backend
npm run check-hostname

# Test database connection
cd backend
npm run check-connection

# Test all login credentials
cd backend
npm run test-login

# Restart backend
cd backend
npm start
```

---

## 🚀 **After Fix**

**Your system will be fully functional**:
- ✅ Database connected
- ✅ Login working
- ✅ All API endpoints working
- ✅ Frontend and backend communicating
- ✅ Ready for development/testing

---

**Follow these steps and your database connection will be fixed!** ✅
