# 🔧 Fix Build Error 127 - Vercel Build Command

## ❌ Error
```
Command "cd backend && npm install && cd ../frontend && npm install && npm run build" exited with 127
```

**Error 127 means:** "Command not found" - usually a shell/command issue.

---

## ✅ Fix Applied

**Updated `vercel.json` to use `npm --prefix` instead of `cd` commands:**

### Before (Problematic):
```json
"buildCommand": "cd backend && npm install && cd ../frontend && npm install && npm run build"
```

### After (Fixed):
```json
"buildCommand": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend"
```

**Why this works:**
- `npm --prefix` runs commands in a directory without changing directories
- More reliable in Vercel's build environment
- Avoids shell path issues

---

## 📋 What Changed

1. **Build Command:**
   - Uses `npm --prefix` instead of `cd` commands
   - More reliable for Vercel builds

2. **Install Command:**
   - Also updated to use `npm --prefix`
   - Consistent approach

3. **Build Scripts Created:**
   - `build.sh` - Bash script (backup option)
   - `build.ps1` - PowerShell script (for local testing)

---

## ✅ Next Steps

1. **Vercel will auto-deploy** from GitHub
2. **Or manually redeploy:**
   - Vercel → Deployments → Latest → Redeploy
3. **Build should now succeed!** ✅

---

## 🔍 If Still Getting Errors

### Check Vercel Build Logs:

1. Go to Vercel Dashboard → Your Project
2. Click on the failed deployment
3. Check "Build Logs" tab
4. Look for specific error messages

### Common Issues:

**Issue:** "npm: command not found"
- **Fix:** Vercel should have npm installed automatically
- Check Node.js version in Vercel settings

**Issue:** "Directory not found"
- **Fix:** Verify `backend` and `frontend` folders exist in repository
- Check file structure in GitHub

**Issue:** "Permission denied"
- **Fix:** Make sure build script is executable (if using script)
- Or use `npm --prefix` approach (already done)

---

## ✅ Summary

- **Fixed:** Build command now uses `npm --prefix`
- **More reliable:** Works better in Vercel environment
- **Pushed:** Changes are on GitHub
- **Ready:** Next deployment should work!

---

**The build error should be fixed now! Try deploying again!**

