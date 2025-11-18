# ⚡ Quick Fix: Database Connection Failed

## 🎯 Most Common Issues & Fixes

### Issue 1: Supabase Project is Paused (90% of cases)

**Fix**:
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Find your project
3. Click **"Restore"** if paused
4. Wait 1-2 minutes
5. Redeploy on Vercel

---

### Issue 2: Environment Variables Not Set

**Fix**:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Your Project → **Settings** → **Environment Variables**
3. **Add/Verify** these 8 variables:

```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

4. **Redeploy** project

---

### Issue 3: Wrong Password

**Fix**:
1. Supabase Dashboard → **Settings** → **Database**
2. Click **"Reset database password"**
3. Copy new password
4. Update `DB_PASSWORD` in Vercel
5. **Redeploy**

---

### Issue 4: Variables Set But Not Applied

**Fix**:
1. **Redeploy** is required after setting variables
2. Vercel Dashboard → **Deployments** → **Redeploy**
3. Wait for deployment to complete

---

## ✅ Quick Test

After fixing, test:
```
https://your-project.vercel.app/api/health
```

Should return:
```json
{"status":"ok","database":"connected"}
```

---

## 🚀 Most Likely Fix

**90% of the time**: Supabase project is paused

1. ✅ Restore project in Supabase Dashboard
2. ✅ Redeploy on Vercel
3. ✅ Test connection

**That's it!** 🎉

