# Vercel Deployment Checklist - Complete Setup

## ⚠️ IMPORTANT: Environment Variables Required

**You MUST set environment variables in Vercel for the database to work.**

The app will deploy without them, but database operations will fail until variables are set.

---

## ✅ Step-by-Step Deployment

### Step 1: Push to GitHub (Already Done ✅)

Your code is at: `https://github.com/ahmadkhan32/Internet-Billing-System`

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select: `ahmadkhan32/Internet-Billing-System`
   - Click "Import"

3. **Configure Project** (Vercel auto-detects, but verify):
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm install --include=dev --prefix backend && npm install --include=dev --prefix frontend && npm run build --prefix frontend`
   - **Output Directory**: `frontend/dist`

4. **Click "Deploy"** (don't set env vars yet - we'll do that after)

### Step 3: Set Up Supabase Database

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Save your database password

2. **Run Migration**:
   - Supabase Dashboard → SQL Editor
   - Run: `supabase/migrations/001_initial_schema.sql`
   - Run: `supabase/seed.sql`

3. **Get Credentials**:
   - Settings → Database
   - Copy connection string
   - Extract: Host, Port, User, Password

### Step 4: Set Environment Variables in Vercel

**CRITICAL STEP** - Without this, database won't work!

1. Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

2. **Add these variables** (one by one):

```
NODE_ENV = production
PORT = 8000
DB_DIALECT = postgres
DB_HOST = db.xxxxx.supabase.co
DB_PORT = 5432
DB_USER = postgres
DB_PASSWORD = your-supabase-password
DB_NAME = postgres
DB_SSL = true
DB_SSL_REJECT_UNAUTHORIZED = false
JWT_SECRET = [generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
JWT_EXPIRE = 7d
FRONTEND_URL = https://your-app.vercel.app
```

3. **Generate JWT Secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Copy the output and use it for `JWT_SECRET`

### Step 5: Redeploy

1. Vercel Dashboard → **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

### Step 6: Verify

1. **Test Health Endpoint**:
   ```
   https://your-app.vercel.app/api/health
   ```
   Should return: `{"status":"ok","database":"connected"}`

2. **Test Login**:
   - Go to: `https://your-app.vercel.app`
   - Email: `admin@billing.com`
   - Password: `admin123`

---

## 🔧 Troubleshooting

### Error: "Database connection failed"

**Cause**: Environment variables not set or incorrect

**Fix**:
1. Check Vercel → Settings → Environment Variables
2. Verify all variables are set correctly
3. Check Supabase credentials
4. Redeploy after adding variables

### Error: "504 Gateway Timeout"

**Cause**: Database connection too slow

**Fix**:
1. Enable Supabase Connection Pooling
2. Use port `6543` instead of `5432`
3. Update `DB_PORT=6543` in Vercel

### Error: "503 Service Unavailable"

**Cause**: Missing environment variables

**Fix**:
1. Set all required variables in Vercel
2. Redeploy

---

## 📋 Quick Reference

### Required Environment Variables:

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `DB_DIALECT` | `postgres` | - |
| `DB_HOST` | `db.xxxxx.supabase.co` | Supabase Dashboard |
| `DB_PORT` | `5432` or `6543` | Supabase Dashboard |
| `DB_USER` | `postgres` | Supabase Dashboard |
| `DB_PASSWORD` | Your password | Supabase Dashboard |
| `DB_NAME` | `postgres` | Supabase Dashboard |
| `DB_SSL` | `true` | - |
| `JWT_SECRET` | Generated secret | See Step 4 |
| `FRONTEND_URL` | Your Vercel URL | After deployment |

---

## ⚡ Quick Setup Script

After deploying to Vercel, run this to get your JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then copy all variables to Vercel Dashboard.

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Project deployed to Vercel
- [ ] Supabase project created
- [ ] Database migration run
- [ ] Database seed run
- [ ] All environment variables set in Vercel
- [ ] JWT secret generated and set
- [ ] Vercel project redeployed
- [ ] Health endpoint working
- [ ] Login working

---

## 🎯 Summary

1. **Deploy to Vercel** (works without env vars, but database won't work)
2. **Set up Supabase** (5 minutes)
3. **Set environment variables in Vercel** (REQUIRED for database)
4. **Redeploy**
5. **Test**

**The app WILL deploy without environment variables, but you MUST set them for the database to work.**

---

## 📚 Additional Resources

- `QUICK_START_SUPABASE.md` - Quick Supabase setup
- `COMPLETE_DEPLOYMENT_SETUP.md` - Detailed deployment guide
- `ENV_SETUP_GUIDE.md` - Environment variables guide

