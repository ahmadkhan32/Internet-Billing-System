# ⚡ Quick Fix - Set All Environment Variables

## ❌ Error
```
Missing environment variables: DB_HOST, DB_USER, DB_NAME, DB_PASSWORD
```

## ✅ FIX IN 5 MINUTES

### Step 1: Get Your Database Info

**From your database provider, get:**
- Host (e.g., `aws.connect.psdb.cloud`)
- Username (e.g., `root`)
- Password (your actual password)
- Database name (e.g., `billing_db`)

### Step 2: Add to Vercel

1. Go to: **https://vercel.com** → Your Project
2. **Settings** → **Environment Variables**
3. Click **"Add New"** for each:

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `DB_HOST` | Your database host | `aws.connect.psdb.cloud` |
| `DB_USER` | Your database username | `root` |
| `DB_PASSWORD` | Your database password | `your-password-here` |
| `DB_NAME` | Your database name | `billing_db` |
| `JWT_SECRET` | Random 32+ chars | `my-secret-2024-xyz123456789` |

**For each:**
- ✅ Check **Production**
- ✅ Check **Preview**
- Click **Save**

### Step 3: Redeploy

1. **Deployments** tab
2. Latest deployment → **"..."** → **"Redeploy"**
3. Wait 2-5 minutes

### Step 4: Test

Visit: `https://your-app.vercel.app/api/diagnose`

Should show: All variables ✅ SET and `"status": "SUCCESS"`

---

## 🎯 That's It!

After redeploy, everything should work! 🚀

**See `SET_ALL_ENV_VARIABLES_NOW.md` for detailed instructions.**

