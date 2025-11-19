# Quick Fix for 503 Database Connection Error
# This script creates the .env file and helps fix the database connection

Write-Host "🚨 Fixing 503 Database Connection Error..." -ForegroundColor Yellow
Write-Host ""

# Check if backend directory exists
if (-not (Test-Path "backend")) {
    Write-Host "❌ Backend directory not found!" -ForegroundColor Red
    Write-Host "💡 Make sure you're in the project root directory" -ForegroundColor Yellow
    exit 1
}

# Create .env file in backend directory
$envPath = "backend\.env"
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

# Write .env file
try {
    Set-Content -Path $envPath -Value $envContent -Force
    Write-Host "✅ Created backend/.env file" -ForegroundColor Green
} catch {
    Write-Host "❌ Error creating .env file: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. ⚠️  CHECK SUPABASE PROJECT STATUS:" -ForegroundColor Yellow
Write-Host "   - Go to: https://supabase.com/dashboard" -ForegroundColor White
Write-Host "   - Click your project" -ForegroundColor White
Write-Host "   - If PAUSED → Click 'Restore' or 'Resume'" -ForegroundColor White
Write-Host "   - Wait 1-2 minutes" -ForegroundColor White
Write-Host ""
Write-Host "2. ✅ SET VERCEL ENVIRONMENT VARIABLES:" -ForegroundColor Yellow
Write-Host "   - Go to: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   - Click your project → Settings → Environment Variables" -ForegroundColor White
Write-Host "   - Add these variables (see VERCEL_ENV_VARIABLES_COPY_PASTE.md)" -ForegroundColor White
Write-Host ""
Write-Host "3. 🚀 START BACKEND:" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   npm install" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "4. 🌐 START FRONTEND (new terminal):" -ForegroundColor Yellow
Write-Host "   cd frontend" -ForegroundColor White
Write-Host "   npm install" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "✅ .env file created! Follow the steps above to complete the fix." -ForegroundColor Green

