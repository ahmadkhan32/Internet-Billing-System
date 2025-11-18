# 🔧 Fix Vercel Build Error: "vite: command not found"

## ❌ Error Message

```
sh: line 1: vite: command not found
Error: Command "cd frontend && npm install && npm run build" exited with 127
```

## ✅ Solution

The issue is that Vercel needs to install dependencies **before** building. The current configuration tries to build without proper setup.

### Option 1: Fix vercel.json (Recommended)

The `vercel.json` is already updated, but if you're using **separate projects**, configure in Vercel UI:

**For Frontend Project:**
1. **Vercel Dashboard** → Your Frontend Project
2. **Settings** → **General**
3. **Build & Development Settings:**
   - **Framework Preset**: `Vite` (auto-detected)
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Save**

### Option 2: Use Separate Projects (Easier)

**Deploy Backend and Frontend as separate projects:**

#### Backend Project:
- **Root Directory**: `./` (root)
- **Framework**: `Other`
- **Build Command**: (empty)
- **Output Directory**: (empty)
- **Install Command**: `cd backend && npm install`

#### Frontend Project:
- **Root Directory**: `./frontend`
- **Framework**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Vercel will auto-detect Vite and handle everything!**

---

## 🔍 Why This Happens

The error occurs because:
1. Vite is not installed globally
2. The build command runs before dependencies are installed
3. The working directory is incorrect

**Solution:** Let Vercel auto-detect Vite framework, or set correct root directory.

---

## ✅ Correct Configuration

### For Frontend Project in Vercel:

**Settings → General → Build & Development Settings:**

```
Framework Preset: Vite
Root Directory: ./frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Vercel will:**
1. ✅ Change to `./frontend` directory
2. ✅ Run `npm install` (installs vite)
3. ✅ Run `npm run build` (builds the app)
4. ✅ Serve from `dist` directory

---

## 🚀 Quick Fix Steps

1. **Delete** the failed deployment (optional)
2. **Go to** Vercel Dashboard → Your Frontend Project
3. **Settings** → **General**
4. **Update** Build Settings (see above)
5. **Redeploy**

---

## 📋 Alternative: Use Monorepo Configuration

If deploying as single project, ensure `vercel.json` is correct:

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd frontend && npm install",
  "framework": "vite"
}
```

But **separate projects are recommended** for easier management.

---

## ✅ Verification

After fixing:

1. **Deploy** frontend project
2. **Check** build logs - should see:
   - ✅ `npm install` running
   - ✅ `vite` installing
   - ✅ `npm run build` running
   - ✅ Build successful

3. **Visit** your frontend URL
4. **Should see** login page

---

## 🆘 Still Having Issues?

1. **Check** `frontend/package.json` has `vite` in dependencies
2. **Verify** `frontend/vite.config.js` exists
3. **Ensure** Root Directory is `./frontend` (not `./`)
4. **Try** deleting and recreating the project

---

**The fix is to set Root Directory to `./frontend` and let Vercel auto-detect Vite! 🚀**

