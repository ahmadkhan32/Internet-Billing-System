# PowerShell build script for Vercel

Write-Host "📦 Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
npm install
Set-Location ..

Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location frontend
npm install

Write-Host "🏗️  Building frontend..." -ForegroundColor Cyan
npm run build

Write-Host "✅ Build complete!" -ForegroundColor Green

