# 🚨 QUICK FIX: 503 Database Connection Error

## ❌ **Your Error**

```
503 Service Unavailable
Database connection failed
```

---

## ✅ **FAST FIX (3 Steps - 5 Minutes)**

### **Step 1: Check Supabase Project** (1 minute) ⚠️ **MOST COMMON**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **If paused** → Click **"Restore"** or **"Resume"**
4. **Wait** 1-2 minutes

**This fixes 90% of cases!**

---

### **Step 2: Create Local .env File** (2 minutes)

**Create file**: `backend/.env`

**Copy this EXACT content**:
```env
NODE_ENV=development
PORT=8000
VERCEL=0

DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false

JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3001
```

**Save as**: `backend/.env` (in the backend folder)

---

### **Step 3: Set Vercel Environment Variables** (2 minutes)

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Add these** (one by one):

```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
VERCEL=1
NODE_ENV=production
```

**Important**: Set all for **Production** environment

---

## 🚀 **Run on Localhost**

### **Start Backend**:

```bash
cd backend
npm install
npm start
```

**Should see**: `✅ PostgreSQL connection established successfully.`

### **Start Frontend** (new terminal):

```bash
cd frontend
npm install
npm run dev
```

**Open**: [http://localhost:3001](http://localhost:3001)

---

## ✅ **Test**

1. **Backend Health**: [http://localhost:8000/api/health](http://localhost:8000/api/health)
   - Should return: `{"database": "connected"}`

2. **Login**: [http://localhost:3001/login](http://localhost:3001/login)
   - Email: `admin@billing.com`
   - Password: `admin123`

---

## 🔍 **If Still Failing**

### **Check 1: Supabase Project Status**
- Must be **Active** (not paused)
- If paused → Restore it

### **Check 2: Environment Variables**
- All variables must be set
- No typos in values
- Use port **6543** (not 5432)

### **Check 3: Network Connection**
- Check internet connection
- Supabase must be accessible

---

## 📋 **Quick Checklist**

- [ ] ✅ Supabase project is **active** (not paused)
- [ ] ✅ `backend/.env` file exists with correct values
- [ ] ✅ Vercel environment variables are set
- [ ] ✅ Using port **6543** (connection pooling)
- [ ] ✅ Backend starts without errors
- [ ] ✅ Frontend connects to backend

---

## 🎯 **Summary**

**The 503 error means database connection failed.**

**Most common cause**: Supabase project is paused

**Quick fix**:
1. Restore Supabase project
2. Create `backend/.env` file
3. Set Vercel environment variables
4. Restart servers

**Time**: 5 minutes

---

**Follow these 3 steps and your project will work!** ✅
