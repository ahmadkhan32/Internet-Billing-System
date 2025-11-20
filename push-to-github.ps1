# Push Project to GitHub
# Run: powershell -ExecutionPolicy Bypass -File push-to-github.ps1

Write-Host "🚀 Pushing Project to GitHub" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git not initialized!" -ForegroundColor Red
    Write-Host "💡 Run: git init" -ForegroundColor Yellow
    exit 1
}

# Check if .env is in .gitignore
$gitignore = Get-Content ".gitignore" -ErrorAction SilentlyContinue
if ($gitignore -notcontains ".env") {
    Write-Host "⚠️  .env not in .gitignore - adding it..." -ForegroundColor Yellow
    Add-Content ".gitignore" "`n.env`n.env.local`n*.env"
    Write-Host "✅ Added .env to .gitignore" -ForegroundColor Green
}

# Check current status
Write-Host "📋 Checking git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "📦 Staging all changes..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = "Remove MySQL, configure Supabase only, add diagnostic scripts and deployment guides"
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No changes to commit or commit failed" -ForegroundColor Yellow
} else {
    Write-Host "✅ Changes committed" -ForegroundColor Green
}

Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "✅ SUCCESS! Project pushed to GitHub" -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Go to: https://vercel.com" -ForegroundColor White
    Write-Host "   2. Import your GitHub repository" -ForegroundColor White
    Write-Host "   3. Set environment variables (see DEPLOY_TO_GITHUB_AND_VERCEL.md)" -ForegroundColor White
    Write-Host "   4. Deploy!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host "💡 Check your git remote: git remote -v" -ForegroundColor Yellow
    Write-Host "💡 Or set remote: git remote add origin https://github.com/your-username/your-repo.git" -ForegroundColor Yellow
    Write-Host ""
}
