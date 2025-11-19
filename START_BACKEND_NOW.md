# 🚀 Start Backend Server - Quick Guide

## ✅ Quick Start

**Open a new PowerShell terminal and run:**

```powershell
cd "C:\Users\asadk\Downloads\Internet Billing System\backend"
npm start
```

## 🔍 What You Should See

**If everything is correct, you'll see:**
```
🔒 SSL enabled for PostgreSQL connection (Supabase)
✅ PostgreSQL connection established successfully.
🚀 Server running on port 8000
📊 Environment: development
```

## ❌ If You See Errors

### Error: "Missing environment variables: DB_PASSWORD"

**Fix:**
```powershell
.\fix-env-supabase.ps1
npm start
```

### Error: "Port 8000 is already in use"

**Fix:**
```powershell
npm run kill-port
npm start
```

### Error: Database connection failed

**Check:**
1. Verify `.env` file exists: `dir .env`
2. Check DB_PASSWORD is set: `Get-Content .env | Select-String "DB_PASSWORD"`
3. Make sure Supabase project is active (not paused)

## ✅ Verify Server is Running

**In another terminal, test:**
```powershell
curl http://localhost:8000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

## 🎯 Alternative: Use the Start Script

```powershell
cd backend
.\start-backend.ps1
```

This script will:
- ✅ Check .env file exists
- ✅ Verify DB_PASSWORD is set
- ✅ Kill port 8000 if needed
- ✅ Start the server

---

**The server is configured correctly - just run `npm start` in the backend folder!**

