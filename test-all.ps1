# Test All Script for Internet Billing System
# Runs both backend and frontend tests

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Internet Billing System - Test Suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if backend and frontend directories exist
if (-not (Test-Path "backend")) {
    Write-Host "❌ Error: backend directory not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "frontend")) {
    Write-Host "❌ Error: frontend directory not found!" -ForegroundColor Red
    exit 1
}

$backendFailed = $false
$frontendFailed = $false

# Run Backend Tests
Write-Host "🧪 Running Backend Tests..." -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
try {
    Push-Location backend
    npm test
    if ($LASTEXITCODE -ne 0) {
        $backendFailed = $true
        Write-Host "❌ Backend tests failed!" -ForegroundColor Red
    } else {
        Write-Host "✅ Backend tests passed!" -ForegroundColor Green
    }
} catch {
    $backendFailed = $true
    Write-Host "❌ Error running backend tests: $_" -ForegroundColor Red
} finally {
    Pop-Location
}

Write-Host ""

# Run Frontend Tests
Write-Host "🧪 Running Frontend Tests..." -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
try {
    Push-Location frontend
    npm test
    if ($LASTEXITCODE -ne 0) {
        $frontendFailed = $true
        Write-Host "❌ Frontend tests failed!" -ForegroundColor Red
    } else {
        Write-Host "✅ Frontend tests passed!" -ForegroundColor Green
    }
} catch {
    $frontendFailed = $true
    Write-Host "❌ Error running frontend tests: $_" -ForegroundColor Red
} finally {
    Pop-Location
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($backendFailed -and $frontendFailed) {
    Write-Host "❌ All tests failed!" -ForegroundColor Red
    exit 1
} elseif ($backendFailed) {
    Write-Host "⚠️  Backend tests failed, Frontend tests passed" -ForegroundColor Yellow
    exit 1
} elseif ($frontendFailed) {
    Write-Host "⚠️  Frontend tests failed, Backend tests passed" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "✅ All tests passed!" -ForegroundColor Green
    exit 0
}

