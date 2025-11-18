# ⚡ Fix: ENOTFOUND Error - Simple Solution

## ❌ Your Error

```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

## 🎯 What This Means

**Your Supabase project is PAUSED.**

Free tier Supabase projects automatically pause after 1 week of inactivity. When paused, the database hostname cannot be resolved (ENOTFOUND error).

---

## ✅ THE FIX (2 Steps)

### Step 1: Restore Supabase Project

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Find your project** (look for project ID: `qppdkzzmijjyoihzfdxw`)
4. **You will see**:
   - **"Paused"** status OR
   - **"Restore"** button
5. **Click "Restore"** button
6. **Wait** 1-2 minutes
7. **Verify** status changes to **"Active"**

**That's it! This fixes 90% of cases.**

---

### Step 2: Redeploy on Vercel

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click** your project
3. **Deployments** → **Latest Deployment**
4. **Click** "Redeploy" button
5. **Wait** 2-3 minutes

---

## ✅ Test After Fix

Visit: `https://your-project.vercel.app/api/health`

**Should return**:
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## 🔍 If Project is Not Paused

If your Supabase project shows "Active" but you still get the error:

1. **Check environment variables in Vercel**:
   - Go to Settings → Environment Variables
   - Verify `DB_HOST` = `db.qppdkzzmijjyoihzfdxw.supabase.co`
   - Verify all database variables are set

2. **Get fresh credentials**:
   - Supabase Dashboard → Settings → Database
   - Copy connection string values
   - Update in Vercel if different

3. **Redeploy** after updating variables

---

## 📋 Quick Checklist

- [ ] Go to Supabase Dashboard
- [ ] Find your project
- [ ] Click "Restore" if paused
- [ ] Wait for "Active" status
- [ ] Redeploy on Vercel
- [ ] Test `/api/health` endpoint

---

## 🎯 Summary

**The Problem**: Supabase project is paused

**The Fix**: 
1. Restore project in Supabase Dashboard
2. Redeploy on Vercel

**Time**: 3-5 minutes

---

**That's all you need to do! Restore the Supabase project and redeploy! 🚀**

