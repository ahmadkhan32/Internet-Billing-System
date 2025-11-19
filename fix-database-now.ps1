# Fix Database Connection - Quick Script
# Run this when you see ENOTFOUND errors

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Fix Database Connection" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Your server is running but database is PAUSED!" -ForegroundColor Yellow
Write-Host ""

Write-Host "STEP 1: Restore Supabase Project" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open: https://supabase.com/dashboard" -ForegroundColor White
Write-Host "2. Click your project: qppdkzzmijjyoihzfdxw" -ForegroundColor White
Write-Host "3. Click 'Restore' (or Pause -> Restore)" -ForegroundColor White
Write-Host "4. Wait 3-5 minutes for database to start" -ForegroundColor White
Write-Host ""

$restored = Read-Host "Have you restored the Supabase project? (y/n)"

if ($restored -ne "y" -and $restored -ne "Y") {
    Write-Host ""
    Write-Host "Please restore Supabase project first!" -ForegroundColor Red
    Write-Host "Then run this script again." -ForegroundColor Yellow
    Write-Host ""
    exit
}

Write-Host ""
Write-Host "STEP 2: Testing Database Connection..." -ForegroundColor Yellow
Write-Host ""

$backendPath = Join-Path $PSScriptRoot "backend"
Set-Location $backendPath

node pre-start-check.js

$checkExit = $LASTEXITCODE

if ($checkExit -ne 0) {
    Write-Host ""
    Write-Host "Database check failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Wait 2-3 more minutes (database might still be starting)" -ForegroundColor White
    Write-Host "2. Check Supabase dashboard shows 'Active'" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "STEP 3: Restart Backend Server" -ForegroundColor Yellow
Write-Host ""
Write-Host "Your backend server needs to be restarted to connect to database." -ForegroundColor White
Write-Host ""
Write-Host "In your backend terminal:" -ForegroundColor Cyan
Write-Host "1. Press Ctrl+C to stop the server" -ForegroundColor White
Write-Host "2. Run: npm start" -ForegroundColor White
Write-Host ""

$restart = Read-Host "Do you want to restart the server now? (y/n)"

if ($restart -eq "y" -or $restart -eq "Y") {
    Write-Host ""
    Write-Host "Stopping any running server on port 8000..." -ForegroundColor Cyan
    
    # Try to kill port 8000
    try {
        $process = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
        if ($process) {
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Write-Host "Stopped process on port 8000" -ForegroundColor Green
            Start-Sleep -Seconds 2
        }
    } catch {
        # Ignore errors
    }
    
    Write-Host ""
    Write-Host "Starting backend server..." -ForegroundColor Cyan
    Write-Host "Backend will run on: http://localhost:8000" -ForegroundColor Green
    Write-Host ""
    Write-Host "Press Ctrl+C to stop server" -ForegroundColor Yellow
    Write-Host ""
    
    npm start
} else {
    Write-Host ""
    Write-Host "To restart manually:" -ForegroundColor Yellow
    Write-Host "1. Go to your backend terminal" -ForegroundColor White
    Write-Host "2. Press Ctrl+C" -ForegroundColor White
    Write-Host "3. Run: npm start" -ForegroundColor White
    Write-Host ""
    Write-Host "Then open: http://localhost:3001" -ForegroundColor Cyan
    Write-Host ""
}

