# 🔧 Fix "Vite install vite" Error

## ❌ Error Message

```
sh: line 1: vite: command not found
Error: Command "cd frontend && npm install && npm run build" exited with 127
```

or

```
Vite install vite
```

## ✅ Solution

The issue is that Vite needs to be installed **before** the build command runs. I've fixed this by:

1. ✅ Moving `vite` to `dependencies` (was in `devDependencies`)
2. ✅ Moving `@vitejs/plugin-react` to `dependencies`
3. ✅ Ensuring Vercel installs all dependencies

---

## 🔧 What I Fixed

### Updated `frontend/package.json`:

**Before:**
- `vite` was in `devDependencies`
- Vercel might skip devDependencies in production

**After:**
- `vite` moved to `dependencies`
- `@vitejs/plugin-react` moved to `dependencies`
- Ensures Vite is always installed

---

## ✅ Vercel Configuration

### For Frontend Project:

**Settings → General → Build & Development Settings:**

```
Framework Preset: Vite
Root Directory: ./frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Important:** 
- ✅ Root Directory must be `./frontend`
- ✅ Install Command must be `npm install` (not `npm ci` or `npm install --production`)
- ✅ This ensures all dependencies (including Vite) are installed

---

## 🚀 Quick Fix Steps

### Option 1: Update Vercel Settings

1. **Vercel Dashboard** → Your Frontend Project
2. **Settings** → **General**
3. **Build & Development Settings:**
   - **Root Directory**: `./frontend` ✅
   - **Install Command**: `npm install` ✅
   - **Build Command**: `npm run build` ✅
4. **Save**
5. **Redeploy**

### Option 2: Delete and Recreate

If the above doesn't work:

1. **Delete** the frontend project in Vercel
2. **Create new project**
3. **Import** same GitHub repository
4. **Configure:**
   - Framework: `Vite` (auto-detected)
   - Root: `./frontend`
   - Build: `npm run build`
   - Output: `dist`
5. **Deploy**

---

## ✅ Verification

After fix, the build should:

1. ✅ Run `npm install` (installs Vite)
2. ✅ Run `npm run build` (uses Vite)
3. ✅ Build successfully
4. ✅ Output to `dist` directory

---

## 📋 Updated package.json

The `frontend/package.json` now has:

```json
{
  "dependencies": {
    "vite": "^5.0.8",
    "@vitejs/plugin-react": "^4.2.1",
    // ... other dependencies
  }
}
```

This ensures Vite is **always installed** during deployment.

---

## 🆘 Still Having Issues?

1. **Check Vercel Logs:**
   - Deployments → Failed deployment → Logs
   - Look for "vite: command not found"

2. **Verify Root Directory:**
   - Must be `./frontend` (not `./`)

3. **Check Install Command:**
   - Must be `npm install` (not `npm ci --production`)

4. **Try Manual Install:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```
   If this works locally, Vercel should work too.

---

## ✅ Fixed!

The `package.json` has been updated and pushed to GitHub. 

**Next steps:**
1. Pull latest changes: `git pull origin main`
2. Redeploy in Vercel (or wait for auto-deploy)
3. Build should succeed! ✅

---

**Vite is now in dependencies and will always be installed! 🚀**

