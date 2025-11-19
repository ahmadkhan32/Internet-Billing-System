# 🚀 Run Project - Frontend + Backend

## ✅ Quick Start

I've started both servers for you! Two PowerShell windows should have opened:

1. **Backend Server** (Port 8000) - Blue window
2. **Frontend Server** (Port 3001) - Green window

## 🌐 Access URLs

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:8000
- **Health Check:** http://localhost:8000/api/health

## 🔐 Login Credentials

- **Email:** `admin@billing.com`
- **Password:** `admin123`

## ✅ What Was Fixed

1. ✅ **Serverless Mode** - Fixed detection (now checks for VERCEL=1, not VERCEL=0)
2. ✅ **Environment Variables** - All set correctly in `.env` file
3. ✅ **Supabase Connection** - Configured with your credentials
4. ✅ **Ports** - Both ports (8000, 3001) are ready

## 🔍 Verify Servers Are Running

**Check Backend:**
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

**Check Frontend:**
- Open browser: http://localhost:3001
- You should see the login page

## ⚠️ If You See Database Connection Errors

The error `ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co` means:

1. **Supabase Project is Paused** (most common)
   - Go to https://supabase.com
   - Open your project
   - Click **"Restore"** or **"Resume"** if it's paused
   - Free tier projects auto-pause after inactivity

2. **Wrong Hostname**
   - Go to Supabase Dashboard → Settings → Database
   - Copy the correct connection string
   - Update `DB_HOST` in `backend\.env` file

3. **Get Fresh Credentials**
   - Supabase Dashboard → Settings → Database
   - Copy connection string
   - Update `.env` file with correct values

## 🎯 Next Steps

1. **Wait for servers to start** (5-10 seconds)
2. **Open browser:** http://localhost:3001
3. **Login** with: `admin@billing.com` / `admin123`
4. **If database errors:** Resume your Supabase project

## ✅ Success!

Once both servers are running:
- ✅ Backend on port 8000
- ✅ Frontend on port 3001
- ✅ Database connected to Supabase
- ✅ Ready to login!

---

**The servers are starting in separate windows. Check the PowerShell windows for status!**

