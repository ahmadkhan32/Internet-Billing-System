# 🚨 URGENT: Fix Database Connection for Vercel

## ❌ Current Error
**"Database connection failed. Please check your database configuration."**

This means Vercel cannot connect to your database. Follow these steps:

---

## ✅ STEP 1: Set Environment Variables in Vercel

**Go to:** https://vercel.com → Your Project → Settings → Environment Variables

### Add These 8 Variables:

1. **NODE_ENV**
   - Value: `production`
   - ✅ Production, ✅ Preview

2. **DB_HOST**
   - Value: Your database host
   - Examples:
     - Cloud: `aws.connect.psdb.cloud` (PlanetScale)
     - ngrok: `0.tcp.ngrok.io` (from ngrok)
   - ✅ Production, ✅ Preview

3. **DB_PORT** (if not default 3306)
   - Value: `3306` (or your port)
   - ✅ Production, ✅ Preview

4. **DB_USER**
   - Value: Your database username
   - Example: `root`
   - ✅ Production, ✅ Preview

5. **DB_PASSWORD** ⚠️ CRITICAL
   - Value: Your database password
   - **MUST be non-empty!**
   - ✅ Production, ✅ Preview

6. **DB_NAME**
   - Value: `internet_billing_db` (or your database name)
   - ✅ Production, ✅ Preview

7. **DB_SSL** (if using ngrok)
   - Value: `false` (for ngrok only)
   - Leave default for cloud databases
   - ✅ Production, ✅ Preview

8. **JWT_SECRET**
   - Value: Random 32+ character string
   - Example: `my-super-secret-jwt-key-2024-production-xyz123456789`
   - ✅ Production, ✅ Preview

**After adding each variable:**
- Click "Save"
- **IMPORTANT:** Redeploy after adding variables!

---

## ✅ STEP 2: Configure Database Firewall

### Your database MUST allow connections from anywhere:

**For Cloud Databases (PlanetScale, AWS RDS, Railway, etc.):**
1. Go to your database provider dashboard
2. Find "Firewall" or "Network" settings
3. Add rule: Allow `0.0.0.0/0` (all IPs)
4. Save

**Why?** Vercel uses dynamic IPs, so IP whitelisting won't work.

**For XAMPP with ngrok:**
1. Configure MySQL for remote access
2. Use ngrok: `ngrok tcp 3306`
3. Use ngrok hostname in `DB_HOST`
4. Set `DB_SSL=false`

---

## ✅ STEP 3: Verify Database is Accessible

### Test from your local machine:
```bash
mysql -h YOUR_DB_HOST -u YOUR_DB_USER -p
```

If you can't connect locally, Vercel won't be able to either.

---

## ✅ STEP 4: Redeploy in Vercel

**After setting environment variables:**

1. Go to: Vercel → Deployments
2. Click "..." on latest deployment
3. Select "Redeploy"
4. Wait 2-5 minutes

**OR** if GitHub is connected, just push to GitHub (auto-deploys)

---

## ✅ STEP 5: Test Connection

### Visit Diagnostic Endpoint:
```
https://your-app.vercel.app/api/diagnose
```

**Should show:**
- ✅ All environment variables SET
- ✅ Database connection SUCCESS

### Visit Health Endpoint:
```
https://your-app.vercel.app/api/health
```

**Should show:**
```json
{
  "status": "OK",
  "database": "connected"
}
```

---

## 🔍 Common Issues & Fixes

### Issue 1: "Missing environment variables"
**Fix:** Set all 8 variables in Vercel (see Step 1)

### Issue 2: "ECONNREFUSED" or "timeout"
**Fix:** 
- Allow `0.0.0.0/0` in database firewall
- Verify database is publicly accessible
- Check database is running

### Issue 3: "Access denied" or "password"
**Fix:**
- Verify `DB_USER` and `DB_PASSWORD` are correct
- Check database user has proper permissions
- Ensure user can connect from external IPs

### Issue 4: "Unknown database"
**Fix:**
- Verify `DB_NAME` is correct
- Create database if it doesn't exist
- Check database name spelling

### Issue 5: SSL/TLS errors
**Fix:**
- Cloud databases require SSL (auto-enabled)
- For ngrok, set `DB_SSL=false`
- Check database provider SSL requirements

---

## 📋 Quick Checklist

- [ ] All 8 environment variables set in Vercel
- [ ] Database firewall allows `0.0.0.0/0`
- [ ] Database credentials are correct
- [ ] Database is accessible from internet
- [ ] Redeployed after setting variables
- [ ] Tested `/api/diagnose` endpoint
- [ ] Tested `/api/health` endpoint

---

## 🚀 After Fixing

1. **Redeploy** in Vercel
2. **Test** login: `admin@billing.com` / `admin123`
3. **Check** console for errors
4. **Verify** database connection works

---

## 📞 Still Having Issues?

1. **Check Vercel Logs:**
   - Vercel → Functions → Logs
   - Look for specific error messages

2. **Check Database Logs:**
   - Database provider dashboard
   - Look for connection attempts

3. **Test Database Connection:**
   - Use database provider's connection test tool
   - Verify credentials work

4. **Check Network:**
   - Database location vs Vercel region
   - Network latency
   - Firewall rules

---

## ✅ Summary

**To fix database connection:**
1. Set all 8 environment variables in Vercel
2. Allow `0.0.0.0/0` in database firewall
3. Redeploy in Vercel
4. Test connection

**Your code is already pushed to GitHub and will auto-deploy!**

Just set the environment variables and redeploy! 🚀

