# 🔐 Fix GitHub Authentication & Push to Repository

## ❌ Current Error
**"Permission denied to ahmadkhan32"**

You're trying to push to `AhmadCracks/Internet-Bill-System.git` but authenticated as `ahmadkhan32`.

---

## ✅ Quick Fix Options

### Option 1: Use SSH (Easiest)

**Step 1: Check if you have SSH key**
```bash
ls ~/.ssh/id_ed25519.pub
```

**If file doesn't exist, create one:**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for all prompts
```

**Step 2: Copy your SSH public key**
```bash
cat ~/.ssh/id_ed25519.pub
# Copy the entire output
```

**Step 3: Add SSH key to GitHub**
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: "My Computer"
4. Paste your key
5. Click "Add SSH key"

**Step 4: Change remote to SSH and push**
```bash
git remote set-url origin git@github.com:AhmadCracks/Internet-Bill-System.git
git push -u origin main
```

---

### Option 2: Use Personal Access Token

**Step 1: Create Token**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Vercel Deployment"
4. Select scope: ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

**Step 2: Push with Token**
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/AhmadCracks/Internet-Bill-System.git
git push -u origin main
```

**Replace `YOUR_TOKEN` with the token you copied.**

---

### Option 3: Use GitHub CLI

**Step 1: Install GitHub CLI**
- Download: https://cli.github.com/

**Step 2: Authenticate**
```bash
gh auth login
# Follow prompts to authenticate
```

**Step 3: Push**
```bash
git push -u origin main
```

---

## 🚀 After Successful Push

### Step 1: Verify on GitHub
Visit: https://github.com/AhmadCracks/Internet-Bill-System

Should show all your files ✅

### Step 2: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Click "Add New Project"**
3. **Import from GitHub**
4. **Select:** `AhmadCracks/Internet-Bill-System`
5. **Configure:**
   - Framework: Vite (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: Already in `vercel.json`
   - Output Directory: `frontend/dist`
6. **Set Environment Variables** (see below)
7. **Click "Deploy"**

---

## ⚙️ Environment Variables for Vercel

**Go to:** Vercel → Your Project → Settings → Environment Variables

**Add these 8 variables:**

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | ✅ |
| `DB_HOST` | Your database host | ✅ |
| `DB_USER` | Your database username | ✅ |
| `DB_PASSWORD` | Your database password | ✅ |
| `DB_NAME` | `internet_billing_db` | ✅ |
| `DB_PORT` | `3306` | ⚠️ Optional |
| `DB_SSL` | `false` (if ngrok) | ⚠️ Optional |
| `JWT_SECRET` | Random 32+ char string | ✅ |

**For each:**
- ✅ Check "Production"
- ✅ Check "Preview"
- Click "Save"

---

## ✅ Verify Deployment

1. **Build Status:** Should show "Ready" ✅
2. **Test:** `https://your-app.vercel.app/api/diagnose`
3. **Login:** `admin@billing.com` / `admin123`

---

## 📋 Summary

**To push to new repository:**
1. Fix authentication (SSH recommended)
2. Push to GitHub
3. Connect Vercel
4. Set environment variables
5. Deploy!

**See `PUSH_TO_NEW_REPO.md` for more details!**

