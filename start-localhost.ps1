# PowerShell script to start both backend and frontend for localhost development
# Usage: .\start-localhost.ps1

Write-Host "🚀 Starting Internet Billing System on Localhost..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "💡 Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Kill existing processes on ports
Write-Host "🔍 Checking for existing processes..." -ForegroundColor Yellow
Write-Host ""

# Kill port 8000 (backend)
Write-Host "Checking port 8000 (backend)..." -ForegroundColor Yellow
$backendProcess = netstat -ano | findstr ":8000"
if ($backendProcess) {
    Write-Host "⚠️  Port 8000 is in use. Killing process..." -ForegroundColor Yellow
    & "$PSScriptRoot\backend\kill-port.ps1" 8000
    Start-Sleep -Seconds 2
} else {
    Write-Host "✅ Port 8000 is available" -ForegroundColor Green
}

# Kill port 3001 (frontend)
Write-Host "Checking port 3001 (frontend)..." -ForegroundColor Yellow
$frontendProcess = netstat -ano | findstr ":3001"
if ($frontendProcess) {
    Write-Host "⚠️  Port 3001 is in use. Please close it manually." -ForegroundColor Yellow
} else {
    Write-Host "✅ Port 3001 is available" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Installing dependencies (if needed)..." -ForegroundColor Cyan
Write-Host ""

# Install backend dependencies
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
} else {
    Write-Host "✅ Backend dependencies already installed" -ForegroundColor Green
}

# Install frontend dependencies
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
} else {
    Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Starting servers..." -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  .env file not found in backend folder!" -ForegroundColor Yellow
    Write-Host "💡 Creating .env from template..." -ForegroundColor Yellow
    Copy-Item "backend\env.template" "backend\.env"
    Write-Host "✅ .env file created. Please update it with your database credentials." -ForegroundColor Green
}

# Start backend in new window
Write-Host "Starting backend server (port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '🔵 Backend Server (Port 8000)' -ForegroundColor Cyan; npm start"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting frontend server (port 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '🟢 Frontend Server (Port 3001)' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "✅ Servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Access URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3001" -ForegroundColor White
Write-Host "   Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "   API Health: http://localhost:8000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "💡 Two PowerShell windows will open - one for backend, one for frontend" -ForegroundColor Yellow
Write-Host "💡 Press Ctrl+C in each window to stop the servers" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 Happy coding!" -ForegroundColor Green

