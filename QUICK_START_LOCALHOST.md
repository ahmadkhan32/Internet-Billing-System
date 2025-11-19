# ⚡ Quick Start: Run Website on Localhost

## 🚨 **IMPORTANT: Fix Database First!**

**Your Supabase project is PAUSED** - you must restore it before starting servers!

---

## ✅ **Step 1: Restore Supabase (2 minutes)**

1. **Open**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project: `qppdkzzmijjyoihzfdxw`
3. **Click "Restore"** (or Pause → Restore)
4. **Wait 3-5 minutes** for database to start

**Don't skip this step!** Servers won't work without database.

---

## ✅ **Step 2: Check Database (30 seconds)**

```bash
cd backend
npm run pre-start
```

**Should see**: `✅ All checks passed!`

**If still fails**: Wait 2-3 more minutes, then try again.

---

## ✅ **Step 3: Install Dependencies (2 minutes)**

**If you haven't installed dependencies yet**:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## ✅ **Step 4: Start Backend (Terminal 1)**

**Open a new terminal/PowerShell window**:

```bash
cd backend
npm start
```

**You should see**:
```
✅ PostgreSQL connection established successfully.
🚀 Server running on port 8000
```

**Keep this terminal open!** Backend runs on: `http://localhost:8000`

---

## ✅ **Step 5: Start Frontend (Terminal 2)**

**Open another terminal/PowerShell window**:

```bash
cd frontend
npm run dev
```

**You should see**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3001/
```

**Keep this terminal open!** Frontend runs on: `http://localhost:3001`

---

## ✅ **Step 6: Open Website**

**Open your browser** and go to:

```
http://localhost:3001
```

**Login with**:
- **Email**: `admin@billing.com`
- **Password**: `admin123`

---

## 🎯 **Quick Commands Summary**

```bash
# 1. Check database (must pass first!)
cd backend
npm run pre-start

# 2. Start backend (Terminal 1)
cd backend
npm start

# 3. Start frontend (Terminal 2 - new window)
cd frontend
npm run dev

# 4. Open browser
# http://localhost:3001
```

---

## 📋 **Or Use Helper Script**

```bash
npm run setup:localhost
```

**This script will**:
- ✅ Check database connection
- ✅ Guide you through starting servers
- ✅ Show you what to do next

---

## 🔧 **Troubleshooting**

### **"DNS check failed"**:
- ✅ Restore Supabase project (Step 1)
- ✅ Wait 3-5 minutes
- ✅ Try again: `npm run pre-start`

### **"Cannot connect to backend"**:
- ✅ Make sure backend is running (Terminal 1)
- ✅ Check backend shows: `Server running on port 8000`

### **"Port already in use"**:
- ✅ Stop other servers using port 8000 or 3001
- ✅ Or use: `cd backend && npm run kill-port`

---

## ✅ **Summary**

**To run website on localhost**:

1. ✅ **Restore Supabase** (Dashboard → Restore)
2. ✅ **Check database**: `cd backend && npm run pre-start`
3. ✅ **Start backend**: `cd backend && npm start` (Terminal 1)
4. ✅ **Start frontend**: `cd frontend && npm run dev` (Terminal 2)
5. ✅ **Open**: `http://localhost:3001`

**Login**: `admin@billing.com` / `admin123`

---

**Follow these steps and your website will run successfully!** ✅

