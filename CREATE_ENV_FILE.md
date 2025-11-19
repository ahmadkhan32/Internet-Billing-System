# 📝 Create .env File for Localhost

## ✅ **Quick Method (PowerShell Script)**

**Run this command**:
```powershell
cd backend
.\fix-env-supabase.ps1
```

This will automatically create the `.env` file with all correct values.

---

## 📋 **Manual Method**

### **Step 1: Navigate to Backend Folder**

```bash
cd backend
```

### **Step 2: Create .env File**

**Create a new file** named `.env` (no extension)

### **Step 3: Copy This Content**

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

### **Step 4: Save the File**

**Save as**: `.env` (in the `backend` folder)

**Important**:
- ✅ File name is exactly `.env` (no extension)
- ✅ Location: `backend/.env` (not root folder)
- ✅ No spaces before/after `=`
- ✅ Use port **6543** (connection pooling)

---

## ✅ **Verify .env File**

**Test connection**:
```bash
cd backend
node test-supabase-connection.js
```

**Expected output**:
```
✅ Connection successful!
✅ Supabase database is accessible
```

---

## 🔍 **Troubleshooting**

### **File not found**

**Check**:
- ✅ File is in `backend` folder (not root)
- ✅ File name is exactly `.env` (not `.env.txt`)
- ✅ File is not hidden (show hidden files in Windows)

### **Connection still fails**

**Check**:
1. ✅ Supabase project is active (not paused)
2. ✅ All values are correct (no typos)
3. ✅ No extra spaces in values
4. ✅ Port is **6543** (not 5432)

---

## 📝 **File Location**

```
Internet Billing System/
├── backend/
│   ├── .env          ← CREATE THIS FILE HERE
│   ├── server.js
│   └── ...
└── frontend/
```

---

**After creating the file, test the connection and start the server!** ✅
