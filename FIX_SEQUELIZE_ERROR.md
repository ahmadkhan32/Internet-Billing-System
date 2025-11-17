# Fix "Cannot read properties of undefined (reading 'define')" Error

## Problem
This error occurs when Sequelize is not properly initialized before models try to use it.

## Root Cause
**Missing environment variables** in Vercel cause the database configuration to fail, which prevents Sequelize from being initialized.

## ✅ Solution: Set Environment Variables in Vercel

**This is REQUIRED** - even with Supabase cloud database, you must set environment variables so Vercel knows how to connect.

### Step 1: Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) → Your Project
2. **Settings** → **Database**
3. Copy **Connection string (URI)**
4. Extract:
   - **Host**: `db.xxxxx.supabase.co`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: (your Supabase password)
   - **Database**: `postgres`

### Step 2: Set in Vercel (REQUIRED)

1. [Vercel Dashboard](https://vercel.com) → Your Project
2. **Settings** → **Environment Variables**
3. Add these variables:

```
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-supabase-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=[generate below]
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
PORT=8000
```

### Step 3: Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output → Use for `JWT_SECRET`

### Step 4: Redeploy

1. Vercel Dashboard → **Deployments**
2. Click **"..."** → **"Redeploy"**
3. Wait for deployment to complete

---

## Why This Error Happens

1. **Models load** → Try to use `sequelize.define()`
2. **Sequelize is undefined** → Because database config failed
3. **Database config failed** → Because environment variables are missing
4. **Result**: "Cannot read properties of undefined (reading 'define')"

## What We Fixed

✅ Sequelize is now always initialized (even with missing env vars)
✅ Better error messages showing what's missing
✅ App won't crash on startup
✅ Connection will fail gracefully with helpful messages

## After Setting Variables

Once you set environment variables and redeploy:
- ✅ Sequelize will initialize properly
- ✅ Models will load successfully
- ✅ Database connection will work
- ✅ App will function normally

---

## Quick Checklist

- [ ] Supabase project created
- [ ] Database migration run (`supabase/migrations/001_initial_schema.sql`)
- [ ] Database seed run (`supabase/seed.sql`)
- [ ] All environment variables set in Vercel
- [ ] JWT secret generated and set
- [ ] Vercel project redeployed
- [ ] Test: `https://your-app.vercel.app/api/health`

---

**See `SIMPLE_SUPABASE_SETUP.md` for complete step-by-step instructions.**

