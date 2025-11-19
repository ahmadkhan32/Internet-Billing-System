# 🚀 Run Complete Website on Localhost - Step by Step

## 🎯 **Goal**: Run Frontend + Backend on Localhost Successfully

---

## ✅ **Step 1: Fix Database Connection** (CRITICAL - Do This First!)

**Before starting servers, ensure database is ready**:

### **1.1: Restore Supabase Project**

1. **Go to**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project: `qppdkzzmijjyoihzfdxw`
3. **Click "Restore"** (or Pause → Restore)
4. **Wait 3-5 minutes** for database to start

### **1.2: Test Database Connection**

```bash
cd backend
npm run pre-start
```

**Should see**: `✅ All checks passed!`

**If you see errors**:
- ✅ Wait 2-3 more minutes
- ✅ Check Supabase dashboard shows "Active"
- ✅ Try again: `npm run pre-start`

---

## ✅ **Step 2: Install Dependencies**

### **2.1: Install Backend Dependencies**

```bash
cd backend
npm install
```

**Wait for installation to complete** (1-2 minutes)

### **2.2: Install Frontend Dependencies**

```bash
cd frontend
npm install
```

**Wait for installation to complete** (1-2 minutes)

---

## ✅ **Step 3: Start Backend Server**

**Open Terminal 1** (or PowerShell window 1):

```bash
cd backend
npm start
```

**You should see**:
```
✅ PostgreSQL connection established successfully.
🚀 Server running on port 8000
📊 Environment: development
```

**Keep this terminal open!** Backend runs on: `http://localhost:8000`

---

## ✅ **Step 4: Start Frontend Server**

**Open Terminal 2** (or PowerShell window 2):

```bash
cd frontend
npm run dev
```

**You should see**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: use --host to expose
```

**Keep this terminal open!** Frontend runs on: `http://localhost:3001`

---

## ✅ **Step 5: Access Your Website**

**Open your browser** and go to:

```
http://localhost:3001
```

**You should see**: Login page

**Default Login Credentials**:
- **Email**: `admin@billing.com`
- **Password**: `admin123`

---

## 📋 **Complete Checklist**

**Before starting**:
- [ ] ✅ Restore Supabase project (Dashboard → Restore)
- [ ] ✅ Wait 3-5 minutes
- [ ] ✅ Test: `cd backend && npm run pre-start` → Should pass
- [ ] ✅ Install backend dependencies: `cd backend && npm install`
- [ ] ✅ Install frontend dependencies: `cd frontend && npm install`

**Starting servers**:
- [ ] ✅ Terminal 1: `cd backend && npm start` → Running on port 8000
- [ ] ✅ Terminal 2: `cd frontend && npm run dev` → Running on port 3001
- [ ] ✅ Open browser: `http://localhost:3001`
- [ ] ✅ Login with: `admin@billing.com` / `admin123`

---

## 🎯 **Quick Start Commands**

**All in one go** (run these in order):

```bash
# 1. Check database
cd backend
npm run pre-start

# 2. Install dependencies (if not installed)
cd ..
cd backend && npm install
cd ../frontend && npm install

# 3. Start backend (Terminal 1)
cd ../backend
npm start

# 4. Start frontend (Terminal 2 - new window)
cd frontend
npm run dev
```

---

## 🔧 **Troubleshooting**

### **Backend won't start**:

**Error**: `Database connection failed`

**Fix**:
1. ✅ Restore Supabase project
2. ✅ Wait 3-5 minutes
3. ✅ Test: `npm run pre-start`
4. ✅ Try starting again: `npm start`

---

### **Frontend won't connect to backend**:

**Error**: `Cannot connect to backend API`

**Fix**:
1. ✅ Make sure backend is running on port 8000
2. ✅ Check `frontend/.env` or `frontend/.env.local` has:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
3. ✅ Or leave empty (auto-detects localhost)

---

### **Port already in use**:

**Error**: `Port 8000 is already in use`

**Fix**:
```bash
cd backend
npm run kill-port
```

**Or manually kill process**:
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

## 📊 **Server URLs**

**Backend API**: `http://localhost:8000`
- Health check: `http://localhost:8000/api/health`
- API endpoints: `http://localhost:8000/api/*`

**Frontend**: `http://localhost:3001`
- Login page: `http://localhost:3001/login`
- Dashboard: `http://localhost:3001/super-admin/dashboard`

---

## ✅ **Summary**

**To run complete website on localhost**:

1. ✅ **Fix database**: Restore Supabase project
2. ✅ **Install dependencies**: Both backend and frontend
3. ✅ **Start backend**: `cd backend && npm start` (Terminal 1)
4. ✅ **Start frontend**: `cd frontend && npm run dev` (Terminal 2)
5. ✅ **Access**: `http://localhost:3001`

**Login**: `admin@billing.com` / `admin123`

---

**Follow these steps and your website will run successfully on localhost!** ✅

