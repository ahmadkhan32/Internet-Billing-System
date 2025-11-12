# 🔧 Port Troubleshooting Guide

## Error: `EADDRINUSE: address already in use :::8000`

This error means port 8000 is already being used by another process.

---

## Quick Fix (Windows PowerShell)

### Option 1: Use the Helper Script

```powershell
cd backend
.\kill-port.ps1
```

### Option 2: Manual Commands

1. **Find the process:**
   ```powershell
   netstat -ano | findstr :8000
   ```

2. **Kill the process:**
   ```powershell
   taskkill /PID <PID_NUMBER> /F
   ```
   Replace `<PID_NUMBER>` with the actual process ID from step 1.

### Option 3: Change the Port

Edit `backend/.env`:
```env
PORT=8001
```

Or set it in `backend/server.js`:
```javascript
const PORT = process.env.PORT || 8001;
```

---

## Quick Fix (Linux/Mac)

1. **Find the process:**
   ```bash
   lsof -i :8000
   ```

2. **Kill the process:**
   ```bash
   kill -9 <PID>
   ```

---

## Common Causes

1. **Previous server instance still running**
   - Solution: Kill the process (see above)

2. **Multiple terminal windows running the server**
   - Solution: Close other terminals or kill duplicate processes

3. **Server crashed but process didn't exit**
   - Solution: Kill the zombie process

4. **Another application using port 8000**
   - Solution: Change the port or stop the other application

---

## Prevention

### Use the Helper Script

Create `backend/kill-port.ps1` (already created) and run it before starting the server:

```powershell
.\kill-port.ps1
npm start
```

### Check Before Starting

Add this to your startup script or run manually:

```powershell
# Check if port is in use
$portInUse = netstat -ano | findstr :8000
if ($portInUse) {
    Write-Host "⚠️  Port 8000 is in use. Killing process..." -ForegroundColor Yellow
    .\kill-port.ps1
}
```

---

## Alternative: Use Different Ports

### Backend Ports
- Development: `8000` (default)
- Alternative: `8001`, `3000`, `5000`

### Frontend Ports
- Development: `3001` (default)
- Alternative: `3002`, `3003`, `5173` (Vite default)

### Update Configuration

**Backend `.env`:**
```env
PORT=8001
```

**Frontend `.env`:**
```env
VITE_API_BASE_URL=http://localhost:8001/api
```

**Frontend `vite.config.js`:**
```javascript
server: {
  port: 3002,
  proxy: {
    '/api': {
      target: 'http://localhost:8001',
      changeOrigin: true
    }
  }
}
```

---

## Verify Port is Free

After killing the process, verify:

```powershell
netstat -ano | findstr :8000
```

Should return nothing if the port is free.

---

## Still Having Issues?

1. **Restart your computer** (nuclear option)
2. **Check Windows Firewall** - might be blocking
3. **Check antivirus** - might be interfering
4. **Use a different port** - simplest solution

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `netstat -ano \| findstr :8000` | Find process on port 8000 |
| `taskkill /PID <PID> /F` | Kill process by PID |
| `.\kill-port.ps1` | Kill process on port 8000 (script) |
| `Get-Process -Id <PID>` | Get process details |

---

**Last Updated:** Created for Internet Billing System

