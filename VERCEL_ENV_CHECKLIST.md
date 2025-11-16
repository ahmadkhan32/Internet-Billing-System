# ✅ Vercel Environment Variables Checklist

## 📋 Copy This Checklist and Check Off Each Step

### Step 1: Get Database Credentials
- [ ] Found DB_HOST value: `___________________________`
- [ ] Found DB_USER value: `___________________________`
- [ ] Found DB_PASSWORD value: `___________________________`
- [ ] Found DB_NAME value: `___________________________`

### Step 2: Go to Vercel
- [ ] Opened https://vercel.com
- [ ] Signed in to account
- [ ] Selected project: Internet-Billing-System
- [ ] Clicked Settings → Environment Variables

### Step 3: Add Variables (Check each after adding)
- [ ] Added NODE_ENV = `production` (Production ✅, Preview ✅)
- [ ] Added DB_HOST = `___________________________` (Production ✅, Preview ✅)
- [ ] Added DB_USER = `___________________________` (Production ✅, Preview ✅)
- [ ] Added DB_PASSWORD = `***` (Production ✅, Preview ✅)
- [ ] Added DB_NAME = `___________________________` (Production ✅, Preview ✅)
- [ ] Added JWT_SECRET = `***` (Production ✅, Preview ✅)

### Step 4: Verify in Vercel
- [ ] All 6 variables appear in the list
- [ ] Each variable shows "Production" environment
- [ ] No typos in variable names
- [ ] Values are correct (no extra spaces)

### Step 5: Redeploy
- [ ] Went to Deployments tab
- [ ] Clicked "..." on latest deployment
- [ ] Clicked "Redeploy"
- [ ] Waited for deployment to complete (2-5 minutes)
- [ ] Deployment status shows "Ready" ✅

### Step 6: Test
- [ ] Visited `/api/diagnose` endpoint
- [ ] All variables show "✅ SET"
- [ ] Connection test shows "SUCCESS"
- [ ] Visited `/api/health` endpoint
- [ ] Shows `"database": "connected"`
- [ ] Tested login - works! ✅

---

## 🎯 If All Checked, You're Done! 🎉

---

## 📝 Notes Section

**DB_HOST:** _________________________________

**DB_USER:** _________________________________

**DB_NAME:** _________________________________

**JWT_SECRET:** _________________________________

**Deployment URL:** _________________________________

**Date Completed:** _________________________________

---

## 🆘 If Something's Not Working

1. Check Vercel function logs for specific errors
2. Visit `/api/diagnose` for detailed diagnostics
3. Verify database firewall allows `0.0.0.0/0`
4. Double-check all values are correct (no typos)

---

**Print this page and check off each item as you complete it!**

