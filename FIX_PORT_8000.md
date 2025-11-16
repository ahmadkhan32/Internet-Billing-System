# 🔧 Fix Port 8000 Already in Use Error

## ❌ Error
```
Error: listen EADDRINUSE: address already in use :::8000
```

**This means:** Another process is already using port 8000.

## ✅ Quick Fix (Choose One Method)

### Method 1: Use Kill Port Script (Easiest)

```powershell
cd backend
npm run kill-port
```

This will automatically find and kill the process on port 8000.

### Method 2: Kill Process Manually

1. **Find the process:**
   ```powershell
   netstat -ano | findstr :8000
   ```
   
2. **Kill the process (replace PID with the number shown):**
   ```powershell
   taskkill /PID [PID_NUMBER] /F
   ```
   
   Example: `taskkill /PID 29944 /F`

### Method 3: Use Task Manager

1. Press `Ctrl + Shift + Esc` to open Task Manager
2. Go to "Details" tab
3. Find `node.exe` or process using port 8000
4. Right-click → End Task

## 🚀 After Killing the Process

Start the server again:
```powershell
cd backend
npm start
```

Or with nodemon:
```powershell
npm run dev
```

## ✅ Verify Port is Free

Check if port 8000 is now free:
```powershell
netstat -ano | findstr :8000
```

If nothing shows up, the port is free! ✅

## 🔄 Alternative: Use Different Port

If you want to use a different port instead:

1. **Edit `.env` file:**
   ```env
   PORT=8001
   ```

2. **Start server:**
   ```powershell
   npm start
   ```

## 📝 Quick Commands

**Kill port 8000:**
```powershell
cd backend
npm run kill-port
```

**Or manually:**
```powershell
# Find process
netstat -ano | findstr :8000

# Kill it (replace PID)
taskkill /PID [PID] /F
```

**Start server:**
```powershell
npm start
```

---

**After killing the process, your server should start successfully!** 🚀

