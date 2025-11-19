# Start Frontend and Backend on Localhost
# This script starts both servers for local development

Write-Host "🚀 Starting Internet Billing System on Localhost..." -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "❌ backend/.env file not found!" -ForegroundColor Red
    Write-Host "💡 Creating .env file..." -ForegroundColor Yellow
    
    $envContent = @"
NODE_ENV=development
PORT=8000
VERCEL=0

DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false

JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3001
"@
    
    Set-Content -Path "backend\.env" -Value $envContent
    Write-Host "✅ Created backend/.env file" -ForegroundColor Green
    Write-Host ""
}

# Check Supabase connection
Write-Host "📋 Checking Supabase project status..." -ForegroundColor Yellow
Write-Host "⚠️  IMPORTANT: Make sure your Supabase project is ACTIVE (not paused)" -ForegroundColor Yellow
Write-Host "   Go to: https://supabase.com/dashboard" -ForegroundColor White
Write-Host "   If paused → Click 'Restore' or 'Resume'" -ForegroundColor White
Write-Host ""

# Start Backend
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
Write-Host "   Backend will run on: http://localhost:8000" -ForegroundColor White
Write-Host ""

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Starting Backend...' -ForegroundColor Cyan; npm start"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Cyan
Write-Host "   Frontend will run on: http://localhost:3001" -ForegroundColor White
Write-Host ""

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host '🌐 Starting Frontend...' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Wait for backend to show: '✅ PostgreSQL connection established successfully'" -ForegroundColor White
Write-Host "   2. Wait for frontend to show: 'Local: http://localhost:3001/'" -ForegroundColor White
Write-Host "   3. Open browser: http://localhost:3001/login" -ForegroundColor White
Write-Host "   4. Login with: admin@billing.com / admin123" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  If you see database connection errors:" -ForegroundColor Yellow
Write-Host "   - Check Supabase project is active (not paused)" -ForegroundColor White
Write-Host "   - Verify backend/.env file has correct credentials" -ForegroundColor White
Write-Host ""
