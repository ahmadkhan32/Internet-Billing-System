# Create .env file for Supabase connection
$envContent = @"
# Internet Billing System - Environment Variables
# Supabase Database Configuration

NODE_ENV=development
PORT=8000
VERCEL=0

# Supabase (PostgreSQL) Configuration
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false

# JWT Configuration
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3001
"@

$envPath = Join-Path $PSScriptRoot ".env"
$envContent | Out-File -FilePath $envPath -Encoding utf8 -Force

Write-Host "✅ Created .env file at: $envPath" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Supabase Configuration:" -ForegroundColor Cyan
Write-Host "   Host: db.qppdkzzmijjyoihzfdxw.supabase.co" -ForegroundColor White
Write-Host "   Port: 6543 (Connection Pooling)" -ForegroundColor White
Write-Host "   Database: postgres" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: If you see ENOTFOUND errors:" -ForegroundColor Yellow
Write-Host "   1. Go to: https://supabase.com/dashboard" -ForegroundColor White
Write-Host "   2. Select your project" -ForegroundColor White
Write-Host "   3. Click Restore if project is paused" -ForegroundColor White
Write-Host "   4. Wait 3-5 minutes for project to resume" -ForegroundColor White

