# How to Start the Project

## ⚠️ Prerequisites

1. **MySQL must be running**
2. **Database must exist**
3. **.env file configured**

## Step-by-Step Startup

### Step 1: Start MySQL Service

**Option A: Using Services (Easiest)**
1. Press `Win + R`
2. Type: `services.msc` and press Enter
3. Find **MySQL** (might be "MySQL80", "MySQL", "MySQL57")
4. Right-click → **Start** (or Restart if already running)

**Option B: Using Command (Run as Administrator)**
```powershell
# Try one of these:
net start MySQL80
# or
net start MySQL
# or
net start MySQL57
```

**Option C: Check if MySQL is installed**
- Open "Programs and Features" (Win + R → `appwiz.cpl`)
- Look for "MySQL Server"
- If not found, download from: https://dev.mysql.com/downloads/installer/

### Step 2: Create Database (if needed)

Open MySQL command line:
```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE IF NOT EXISTS internet_billing_db;
EXIT;
```

### Step 3: Start Backend Server

Open **Terminal 1** (PowerShell or Command Prompt):
```bash
cd "C:\Users\asadk\Downloads\Internet Billing System\backend"
npm start
```

**OR for development with auto-reload:**
```bash
npm run dev
```

You should see:
```
✅ Database connection established successfully
✅ Database models synchronized
✅ Monthly scheduler initialized
🚀 Server running on port 8000
```

### Step 4: Start Frontend Server

Open **Terminal 2** (New PowerShell or Command Prompt window):
```bash
cd "C:\Users\asadk\Downloads\Internet Billing System\frontend"
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:3001/
➜  Network: use --host to expose
```

### Step 5: Access the Application

1. Open browser: **http://localhost:3001**
2. Login with:
   - **Email:** `admin@billing.com`
   - **Password:** `admin123`

## Quick Start Scripts

### Windows PowerShell Script

Save as `start-backend.ps1` in backend folder:
```powershell
# Check MySQL
$mysql = Get-Service | Where-Object {$_.Name -like "*mysql*"}
if ($mysql.Status -ne 'Running') {
    Write-Host "Starting MySQL..." -ForegroundColor Yellow
    Start-Service $mysql.Name
    Start-Sleep -Seconds 3
}

# Start backend
Write-Host "Starting backend server..." -ForegroundColor Green
npm start
```

Save as `start-frontend.ps1` in frontend folder:
```powershell
Write-Host "Starting frontend server..." -ForegroundColor Green
npm run dev
```

## Troubleshooting

### "ETIMEDOUT" or "Connection refused"
- **MySQL is not running** → Start MySQL service (Step 1)

### "Access denied for user"
- Check `.env` file has correct `DB_PASSWORD`
- If MySQL root has no password: `DB_PASSWORD=`
- If MySQL root has password: `DB_PASSWORD=yourpassword`

### "Unknown database"
- Database doesn't exist → Create it (Step 2)

### Port already in use
- Backend (8000): Another process is using port 8000
- Frontend (3001): Another process is using port 3001
- Solution: Close the other process or change port in `.env`/`vite.config.js`

### "Cannot find module"
- Run: `npm install` in both backend and frontend folders

## Running Both Servers

You need **TWO terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Keep both terminals open while using the application!

