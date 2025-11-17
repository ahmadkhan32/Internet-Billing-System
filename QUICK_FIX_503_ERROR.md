# ⚡ Quick Fix 503 Error - 2 Minutes

## ❌ Error
```
503 - Database connection failed
```

## ✅ QUICK FIX (90% of cases)

### Step 1: Allow Database Connections from Anywhere

**Your database firewall is blocking Vercel!**

**Fix it:**

1. **Go to your database provider dashboard**
2. **Find firewall/security settings**
3. **Allow connections from:** `0.0.0.0/0` (all IPs)
4. **Save**

**Provider-specific:**
- **PlanetScale:** Settings → Connectivity → Allow from anywhere
- **AWS RDS:** Security Groups → Add rule: MySQL (3306) from `0.0.0.0/0`
- **Railway:** Settings → Enable Public Networking
- **DigitalOcean:** Settings → Trusted Sources → Add `0.0.0.0/0`

### Step 2: Redeploy

1. **Vercel** → Deployments → Latest → Redeploy
2. **Wait** 2-5 minutes

### Step 3: Test

Visit: `https://your-app.vercel.app/api/diagnose`

Should show: `"status": "SUCCESS"` ✅

---

## 🎯 That's It!

**90% of 503 errors are fixed by allowing `0.0.0.0/0` in database firewall!**

**See `FIX_503_DATABASE_CONNECTION.md` for detailed instructions.**

