# 🔧 Fix Database Connection (Supabase is Active)

## ✅ **Your Supabase Project is Active - Good!**

Since your Supabase project is **already active**, the issue is likely one of these:

---

## 🔍 **Most Common Issues (When Supabase is Active)**

### **1. Wrong Port** ⚠️ **MOST COMMON**

**Problem**: Using port `5432` (direct connection) instead of `6543` (connection pooling)

**Fix**:
1. Open `backend/.env`
2. Change:
   ```
   DB_PORT=5432
   ```
   To:
   ```
   DB_PORT=6543
   ```
3. Save and restart backend

**Why**: Port `6543` uses connection pooling, which is more reliable for serverless/server applications.

---

### **2. Wrong Database Credentials**

**Problem**: Password or hostname is incorrect

**Fix**:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project
2. **Settings** → **Database**
3. **Connection string** section:
   - Copy the **hostname** (e.g., `db.xxxxx.supabase.co`)
   - Click **"Reset database password"** if needed
   - Copy the **password**
4. Update `backend/.env`:
   ```
   DB_HOST=db.xxxxx.supabase.co
   DB_PASSWORD=your_new_password
   ```
5. Save and restart backend

---

### **3. Environment Variables Not Loaded**

**Problem**: Backend can't read `.env` file

**Fix**:
1. Make sure `backend/.env` file exists
2. Check file is in correct location: `backend/.env` (not root `.env`)
3. Restart backend server
4. Check backend logs for environment variable values

---

### **4. SSL Configuration Issue**

**Problem**: SSL settings are incorrect

**Fix**:
Ensure in `backend/.env`:
```
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

**Important**: Both must be set exactly as above for Supabase.

---

## 🚀 **Quick Diagnostic**

### **Run This to Check Everything**:

```bash
node quick-check-connection.js
```

**This will**:
- ✅ Check all environment variables
- ✅ Test database connection
- ✅ Show exact error if connection fails
- ✅ Provide specific fix instructions

---

## 📋 **Step-by-Step Fix**

### **Step 1: Check Environment Variables**

**Run diagnostic**:
```bash
node quick-check-connection.js
```

**Or check manually**:
1. Open `backend/.env`
2. Verify these are set:
   ```
   DB_DIALECT=postgres
   DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
   DB_PORT=6543
   DB_USER=postgres
   DB_PASSWORD=3oqj6vL2Tr5BZLaf
   DB_NAME=postgres
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   ```

---

### **Step 2: Try Connection Pooling Port**

**Most reliable fix** - Use port `6543`:

1. Open `backend/.env`
2. Set:
   ```
   DB_PORT=6543
   ```
3. Save file
4. Restart backend:
   ```bash
   cd backend
   npm start
   ```

**Why this works**: Connection pooling is more reliable and faster.

---

### **Step 3: Verify Credentials**

**Get fresh credentials from Supabase**:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click your project
3. **Settings** → **Database**
4. **Connection string** section:
   - **Host**: Copy the hostname
   - **Port**: Use `6543` for connection pooling
   - **Database**: Usually `postgres`
   - **User**: Usually `postgres`
   - **Password**: Click "Reset database password" if you don't have it
5. Update `backend/.env` with fresh values
6. Restart backend

---

### **Step 4: Test Connection**

**After making changes**:

```bash
node quick-check-connection.js
```

**Should see**: `✅ SUCCESS! Database connection is working!`

---

## 🔧 **Common Fixes**

### **Fix 1: Use Connection Pooling Port**

**In `backend/.env`**:
```env
DB_PORT=6543
```

**Instead of**:
```env
DB_PORT=5432
```

---

### **Fix 2: Verify SSL Settings**

**In `backend/.env`**:
```env
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

**Both must be set exactly as above.**

---

### **Fix 3: Check Hostname Format**

**Correct format**:
```
DB_HOST=db.xxxxx.supabase.co
```

**Wrong formats**:
```
DB_HOST=https://db.xxxxx.supabase.co  ❌
DB_HOST=db.xxxxx.supabase.co:5432     ❌
DB_HOST=xxxxx.supabase.co             ❌
```

---

## 📋 **Complete .env File (Copy This)**

**Create/Update `backend/.env`**:

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

**Important**:
- ✅ Use port `6543` (connection pooling)
- ✅ `DB_SSL=true`
- ✅ `DB_SSL_REJECT_UNAUTHORIZED=false`
- ✅ No spaces before/after `=`

---

## ✅ **Verification Steps**

### **1. Test Connection**:
```bash
node quick-check-connection.js
```

**Expected**: `✅ SUCCESS! Database connection is working!`

### **2. Start Backend**:
```bash
cd backend
npm start
```

**Expected**: `✅ PostgreSQL connection established successfully.`

### **3. Test Health Endpoint**:
Visit: [http://localhost:8000/api/health](http://localhost:8000/api/health)

**Expected**:
```json
{
  "status": "OK",
  "database": "connected"
}
```

---

## 🎯 **Most Likely Fix**

**Since Supabase is active, try this first**:

1. **Change port to 6543** in `backend/.env`:
   ```
   DB_PORT=6543
   ```

2. **Restart backend**

3. **Test connection**:
   ```bash
   node quick-check-connection.js
   ```

**This fixes 80% of connection issues when Supabase is active!**

---

## 📋 **Troubleshooting Checklist**

- [ ] ✅ Supabase project is active (you confirmed this ✅)
- [ ] ✅ Using port `6543` (connection pooling)
- [ ] ✅ `DB_SSL=true` and `DB_SSL_REJECT_UNAUTHORIZED=false`
- [ ] ✅ `DB_HOST` is correct (no `https://`, no port)
- [ ] ✅ `DB_PASSWORD` is correct
- [ ] ✅ `backend/.env` file exists and is in correct location
- [ ] ✅ Backend restarted after changing `.env`

---

## 🚀 **Quick Fix Summary**

**Since Supabase is active, the issue is likely**:

1. **Wrong port** → Use `6543` instead of `5432`
2. **Wrong credentials** → Get fresh from Supabase Dashboard
3. **SSL config** → Ensure both SSL variables are set correctly

**Quick fix**:
1. Update `backend/.env` with port `6543`
2. Run `node quick-check-connection.js`
3. If still fails, get fresh credentials from Supabase

---

**Run the diagnostic tool to find the exact issue!** 🔍

