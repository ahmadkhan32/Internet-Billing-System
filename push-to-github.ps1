# Script to push project to GitHub
# Usage: .\push-to-github.ps1 -RepoUrl "https://github.com/username/repo-name.git"

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl
)

Write-Host "🚀 Pushing project to GitHub..." -ForegroundColor Green

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to update it? (y/n)"
    if ($overwrite -eq 'y' -or $overwrite -eq 'Y') {
        git remote set-url origin $RepoUrl
        Write-Host "✅ Remote URL updated" -ForegroundColor Green
    } else {
        Write-Host "❌ Aborted. Using existing remote." -ForegroundColor Red
        exit
    }
} else {
    git remote add origin $RepoUrl
    Write-Host "✅ Remote 'origin' added" -ForegroundColor Green
}

# Ensure we're on main branch
git branch -M main

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 Repository URL: $RepoUrl" -ForegroundColor Cyan
} else {
    Write-Host "❌ Push failed. Please check:" -ForegroundColor Red
    Write-Host "   1. Repository exists on GitHub" -ForegroundColor Yellow
    Write-Host "   2. You have access to the repository" -ForegroundColor Yellow
    Write-Host "   3. You're authenticated (username/password or token)" -ForegroundColor Yellow
}

