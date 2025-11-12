# 🚀 Quick Start Guide

## ✅ Current Status

- ✅ MySQL is running
- ✅ Database `internet_billing_db` is created
- ✅ Frontend is running on http://localhost:3003
- ✅ Backend should be starting...

## 📋 Complete Startup Checklist

### Step 1: Start Backend (Terminal 1)

```bash
cd "C:\Users\asadk\Downloads\Internet Billing System\backend"
npm start
```

**OR use the startup script:**
```powershell
.\start-backend.ps1
```

**Expected output:**
```
✅ Database connection established successfully
✅ Database models synchronized
✅ Monthly scheduler initialized
🚀 Server running on port 8000
```

### Step 2: Start Frontend (Terminal 2)

```bash
cd "C:\Users\asadk\Downloads\Internet Billing System\frontend"
npm run dev
```

**OR use the startup script:**
```powershell
.\start-frontend.ps1
```

**Expected output:**
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:3001/
```

### Step 3: Access Application

1. Open browser: **http://localhost:3001** (or the port shown)
2. Login with:
   - **Email:** `admin@billing.com`
   - **Password:** `admin123`

## 🔧 If Database Error Occurs

If you see "Unknown database" error, run:

```bash
cd backend
node create-database.js
```

This will create the database automatically.

## 📝 Notes

- **Backend runs on:** http://localhost:8000
- **Frontend runs on:** http://localhost:3001 (or next available port)
- **Database:** `internet_billing_db`
- **Default Admin:** admin@billing.com / admin123

## 🎯 Next Steps After Login

1. Create an ISP (if you're not super admin)
2. Add Internet Packages
3. Add Customers
4. Generate Bills
5. Record Payments

Enjoy your Internet Billing System! 🎉

