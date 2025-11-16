# 🔍 Quick Diagnostic & Fix Guide

## Step 1: Run Diagnostic Endpoint

**Visit this URL in your browser:**
```
https://your-app.vercel.app/api/diagnose
```

**This will show you:**
- ✅ Which environment variables are set/missing
- ✅ Database connection test results
- ✅ Specific error codes
- ✅ Actionable recommendations

---

## Step 2: Follow the Recommendations

The diagnostic endpoint will tell you exactly what's wrong and how to fix it.

### Common Issues & Quick Fixes:

#### Issue 1: Missing Environment Variables
**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Add missing variables
3. Redeploy

#### Issue 2: Database Firewall Blocking
**Fix:**
- **PlanetScale:** Settings → Connectivity → Allow from anywhere
- **AWS RDS:** Security Groups → Add rule: MySQL (3306) from 0.0.0.0/0
- **Railway:** Settings → Enable Public Networking
- **DigitalOcean:** Settings → Trusted Sources → Add 0.0.0.0/0

#### Issue 3: Wrong Credentials
**Fix:**
- Verify DB_USER and DB_PASSWORD in Vercel
- Test connection locally to confirm credentials work

#### Issue 4: Database Not Running
**Fix:**
- Check database provider dashboard
- Verify database service is active

---

## Step 3: Verify Fix

**After making changes:**

1. **Redeploy in Vercel** (if you changed environment variables or code)

2. **Check diagnostic again:**
   ```
   https://your-app.vercel.app/api/diagnose
   ```
   Should show: `"status": "SUCCESS"`

3. **Test health endpoint:**
   ```
   https://your-app.vercel.app/api/health
   ```
   Should show: `"database": "connected"`

4. **Test login:**
   - Go to your app
   - Login should work ✅

---

## 🎯 That's It!

The diagnostic endpoint tells you exactly what's wrong and how to fix it. Just follow the recommendations!

