# Get Supabase Credentials and Update .env File
# This script helps you get the correct Supabase connection details

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Supabase Connection Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Follow these steps to get your Supabase credentials:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://supabase.com" -ForegroundColor White
Write-Host "2. Login to your account" -ForegroundColor White
Write-Host "3. Select your project (or create a new one)" -ForegroundColor White
Write-Host "4. Check if project is PAUSED - if so, click 'Restore' or 'Resume'" -ForegroundColor Yellow
Write-Host "5. Go to: Settings → Database" -ForegroundColor White
Write-Host "6. Scroll to 'Connection string' section" -ForegroundColor White
Write-Host "7. Click 'URI' tab" -ForegroundColor White
Write-Host "8. Copy the connection string" -ForegroundColor White
Write-Host ""
Write-Host "The connection string looks like:" -ForegroundColor Cyan
Write-Host "postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres" -ForegroundColor Gray
Write-Host ""

$connectionString = Read-Host "Paste your Supabase connection string here"

if ([string]::IsNullOrWhiteSpace($connectionString)) {
    Write-Host "[ERROR] Connection string is required!" -ForegroundColor Red
    exit 1
}

# Parse connection string
# Format: postgresql://postgres:password@host:port/database
try {
    if ($connectionString -match "postgresql://postgres:([^@]+)@([^:]+):(\d+)/(.+)") {
        $password = $matches[1]
        $host = $matches[2]
        $port = $matches[3]
        $database = $matches[4]
        
        Write-Host ""
        Write-Host "Extracted credentials:" -ForegroundColor Green
        Write-Host "  Host: $host" -ForegroundColor White
        Write-Host "  Port: $port" -ForegroundColor White
        Write-Host "  User: postgres" -ForegroundColor White
        Write-Host "  Password: $($password.Length) characters" -ForegroundColor White
        Write-Host "  Database: $database" -ForegroundColor White
        Write-Host ""
        
        $confirm = Read-Host "Update .env file with these credentials? (y/n)"
        
        if ($confirm -eq "y" -or $confirm -eq "Y") {
            $envPath = Join-Path $PSScriptRoot ".env"
            
            # Read current .env
            $envContent = @"
NODE_ENV=development
PORT=8000
VERCEL=0

DB_DIALECT=postgres
DB_HOST=$host
DB_PORT=$port
DB_USER=postgres
DB_PASSWORD=$password
DB_NAME=$database
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false

JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3001
"@
            
            $envContent | Out-File -FilePath $envPath -Encoding utf8 -NoNewline
            Write-Host ""
            Write-Host "[OK] .env file updated successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Cyan
            Write-Host "1. Make sure Supabase project is active (not paused)" -ForegroundColor White
            Write-Host "2. Run migrations in Supabase SQL Editor:" -ForegroundColor White
            Write-Host "   - Go to SQL Editor in Supabase Dashboard" -ForegroundColor Gray
            Write-Host "   - Run: supabase/migrations/001_initial_schema.sql" -ForegroundColor Gray
            Write-Host "3. Restart the server: npm start" -ForegroundColor White
        } else {
            Write-Host "Cancelled." -ForegroundColor Yellow
        }
    } else {
        Write-Host "[ERROR] Invalid connection string format!" -ForegroundColor Red
        Write-Host "Expected format: postgresql://postgres:password@host:port/database" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[ERROR] Failed to parse connection string: $_" -ForegroundColor Red
}

