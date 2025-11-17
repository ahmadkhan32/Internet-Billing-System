# Quick Start - Supabase Setup (5 Minutes)

## 1. Create Supabase Project (2 min)

1. Go to: https://supabase.com
2. Sign up/Login
3. Click "New Project"
4. Name: `internet-billing-system`
5. Set password (SAVE IT!)
6. Click "Create"

## 2. Run Migration (1 min)

1. Supabase Dashboard → **SQL Editor**
2. **New query**
3. Copy/paste: `supabase/migrations/001_initial_schema.sql`
4. Click **Run**

## 3. Run Seed (1 min)

1. **New query**
2. Copy/paste: `supabase/seed.sql`
3. Click **Run**

## 4. Get Credentials (30 sec)

1. **Settings** → **Database**
2. Copy connection string
3. Extract:
   - Host: `db.xxxxx.supabase.co`
   - Password: (your password)

## 5. Set Vercel Variables (1 min)

In Vercel → Settings → Environment Variables:

```
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=postgres
DB_SSL=true
JWT_SECRET=run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
FRONTEND_URL=https://your-app.vercel.app
```

## 6. Redeploy

Vercel Dashboard → Deployments → Redeploy

## ✅ Done!

Test: `https://your-app.vercel.app/api/health`

Login: `admin@billing.com` / `admin123`

