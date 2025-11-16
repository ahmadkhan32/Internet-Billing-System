# ⚡ Quick Deploy Reference - All Steps

## 🚀 Complete Deployment in 9 Steps

### Step 1: Push to GitHub ✅
```bash
git add -A
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Import to Vercel
1. Go to: https://vercel.com
2. Add New → Project
3. Import from GitHub
4. Select repository
5. Click Deploy

### Step 3: Create Database
- **PlanetScale:** https://planetscale.com (Free)
- **Railway:** https://railway.app (Free)
- **AWS RDS:** AWS Console
- Get credentials: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

### Step 4: Add Environment Variables in Vercel
1. Vercel → Your Project → Settings → Environment Variables
2. Add these 6 variables:

```
NODE_ENV = production
DB_HOST = your-database-host
DB_USER = your-database-username
DB_PASSWORD = your-database-password
DB_NAME = your-database-name
JWT_SECRET = random-32-character-string
```

3. For each: Check Production and Preview, then Save

### Step 5: Configure Database Firewall
- Allow connections from `0.0.0.0/0` (all IPs)
- Vercel uses dynamic IPs

### Step 6: Initialize Database
- Run `backend/database/setup.sql` in your database
- Or app will create tables automatically

### Step 7: Redeploy
1. Vercel → Deployments
2. Latest → "..." → Redeploy
3. Wait 2-5 minutes

### Step 8: Test
- Visit: `https://your-app.vercel.app/api/diagnose`
- Should show all variables ✅ SET
- Should show database connected

### Step 9: Login
- Go to: `https://your-app.vercel.app`
- Login: `admin@billing.com` / `admin123`
- Should redirect to dashboard ✅

---

## 📋 Environment Variables Quick Copy

Copy these to Vercel:

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `DB_HOST` | Your DB host | `aws.connect.psdb.cloud` |
| `DB_USER` | Your DB user | `root` |
| `DB_PASSWORD` | Your DB password | `your-password` |
| `DB_NAME` | Your DB name | `billing_db` |
| `JWT_SECRET` | 32+ chars | `my-secret-2024-xyz123456789` |

---

## ✅ Success Checklist

- [ ] Pushed to GitHub
- [ ] Imported to Vercel
- [ ] Database created
- [ ] All 6 variables added in Vercel
- [ ] Database firewall configured
- [ ] Redeployed
- [ ] Diagnostic shows all ✅
- [ ] Login works and redirects to dashboard

---

## 🆘 Quick Troubleshooting

**Missing Variables?**
→ Add them in Vercel → Settings → Environment Variables

**Database Connection Failed?**
→ Allow `0.0.0.0/0` in database firewall

**Login Not Working?**
→ Check Vercel function logs
→ Verify database connection

---

**See `COMPLETE_DEPLOYMENT_GUIDE.md` for detailed instructions!**

