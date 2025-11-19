# Start both Frontend and Backend for localhost development
# This script starts both servers for you

Write-Host "🚀 Starting Internet Billing System (Frontend + Backend)" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if .env exists in backend
$backendEnv = Join-Path (Get-Location) "backend\.env"
if (-not (Test-Path $backendEnv)) {
    Write-Host "⚠️  .env file not found in backend folder!" -ForegroundColor Yellow
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    
    $envContent = @"
NODE_ENV=development
PORT=8000
VERCEL=0

DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false

JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3001
"@
    
    $envContent | Out-File -FilePath $backendEnv -Encoding utf8 -NoNewline
    Write-Host "✅ .env file created!" -ForegroundColor Green
}

# Kill ports
Write-Host "🔍 Checking ports..." -ForegroundColor Yellow
$backendPort = netstat -ano | findstr ":8000"
$frontendPort = netstat -ano | findstr ":3001"

if ($backendPort) {
    Write-Host "Killing process on port 8000..." -ForegroundColor Yellow
    & "$PSScriptRoot\backend\kill-port.ps1" 8000 | Out-Null
    Start-Sleep -Seconds 1
}

if ($frontendPort) {
    Write-Host "⚠️  Port 3001 is in use. Please close it manually." -ForegroundColor Yellow
}

# Install dependencies if needed
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow

if (-not (Test-Path "backend\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

Write-Host ""
Write-Host "🚀 Starting servers..." -ForegroundColor Cyan
Write-Host ""

# Start backend in new window
Write-Host "Starting Backend (Port 8000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '🔵 BACKEND SERVER (Port 8000)' -ForegroundColor Cyan; Write-Host ''; npm start"

# Wait for backend to start
Start-Sleep -Seconds 5

# Start frontend in new window
Write-Host "Starting Frontend (Port 3001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '🟢 FRONTEND SERVER (Port 3001)' -ForegroundColor Green; Write-Host ''; npm run dev"

Write-Host ""
Write-Host "✅ Servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Access URLs:" -ForegroundColor Cyan
Write-Host "   🌐 Frontend: http://localhost:3001" -ForegroundColor White
Write-Host "   🔧 Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "   ❤️  Health:   http://localhost:8000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Login Credentials:" -ForegroundColor Cyan
Write-Host "   Email: admin@billing.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "💡 Two PowerShell windows will open:" -ForegroundColor Yellow
Write-Host "   - One for Backend (port 8000)" -ForegroundColor White
Write-Host "   - One for Frontend (port 3001)" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  If you see database connection errors:" -ForegroundColor Yellow
Write-Host "   1. Check Supabase project is active (not paused)" -ForegroundColor White
Write-Host "   2. Verify DB_HOST in backend\.env file" -ForegroundColor White
Write-Host "   3. Get fresh credentials from Supabase Dashboard" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding!" -ForegroundColor Green

