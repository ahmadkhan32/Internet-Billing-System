# Start Complete Website on Localhost
# This script helps you start both backend and frontend servers

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Start Internet Billing System" -ForegroundColor Cyan
Write-Host "  Complete Website on Localhost" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Database
Write-Host "Step 1: Checking database connection..." -ForegroundColor Yellow
Write-Host ""

$backendPath = Join-Path $PSScriptRoot "backend"
Set-Location $backendPath

# Check if .env exists
$envPath = Join-Path $backendPath ".env"
if (-not (Test-Path $envPath)) {
    Write-Host "ERROR: .env file not found in backend directory!" -ForegroundColor Red
    Write-Host "Please create backend/.env file first." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Run: cd backend && .\get-supabase-credentials.ps1" -ForegroundColor Cyan
    exit 1
}

# Run pre-start check
Write-Host "Running database check..." -ForegroundColor Cyan
node pre-start-check.js

$dbCheckExit = $LASTEXITCODE

if ($dbCheckExit -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Database check failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix database connection first:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://supabase.com/dashboard" -ForegroundColor White
    Write-Host "2. Click your project" -ForegroundColor White
    Write-Host "3. Click 'Restore' (even if it shows 'Active')" -ForegroundColor White
    Write-Host "4. Wait 3-5 minutes" -ForegroundColor White
    Write-Host "5. Run this script again" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "Database check passed!" -ForegroundColor Green
Write-Host ""

# Step 2: Check Dependencies
Write-Host "Step 2: Checking dependencies..." -ForegroundColor Yellow
Write-Host ""

$backendNodeModules = Join-Path $backendPath "node_modules"
$frontendPath = Join-Path $PSScriptRoot "frontend"
$frontendNodeModules = Join-Path $frontendPath "node_modules"

if (-not (Test-Path $backendNodeModules)) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    npm install
    Write-Host ""
}

Set-Location $frontendPath

if (-not (Test-Path $frontendNodeModules)) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
    Write-Host ""
}

# Step 3: Start Servers
Write-Host "Step 3: Starting servers..." -ForegroundColor Yellow
Write-Host ""

Write-Host "IMPORTANT: You need TWO terminal windows!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Terminal 1 (Backend):" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""

$startBackend = Read-Host "Start backend server now? (y/n)"

if ($startBackend -eq "y" -or $startBackend -eq "Y") {
    Write-Host ""
    Write-Host "Starting backend server..." -ForegroundColor Cyan
    Write-Host "Backend will run on: http://localhost:8000" -ForegroundColor Green
    Write-Host ""
    Write-Host "Press Ctrl+C to stop backend server" -ForegroundColor Yellow
    Write-Host ""
    
    Set-Location $backendPath
    npm start
} else {
    Write-Host ""
    Write-Host "To start backend manually:" -ForegroundColor Yellow
    Write-Host "  cd backend" -ForegroundColor White
    Write-Host "  npm start" -ForegroundColor White
    Write-Host ""
    Write-Host "To start frontend manually:" -ForegroundColor Yellow
    Write-Host "  cd frontend" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Then open: http://localhost:3001" -ForegroundColor Cyan
    Write-Host ""
}
