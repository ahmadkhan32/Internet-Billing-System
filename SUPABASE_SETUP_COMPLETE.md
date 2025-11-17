# Complete Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Click "New Project"
4. Fill in:
   - **Name**: `internet-billing-system`
   - **Database Password**: Create a strong password (SAVE IT!)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for project to be created

## Step 2: Get Database Credentials

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Find **Connection string** section
3. Copy the **URI** connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
4. Note these values:
   - **Host**: `db.xxxxx.supabase.co`
   - **Port**: `5432` (or `6543` for connection pooling)
   - **Database**: `postgres`
   - **User**: `postgres`
   - **Password**: (the one you created)

## Step 3: Run Database Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and click "Run" (or Ctrl+Enter)
5. Wait for success message

## Step 4: Seed Database

1. In SQL Editor, click "New query"
2. Copy entire contents of `supabase/seed.sql`
3. Paste and click "Run"
4. Wait for success message

## Step 5: Set Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

### Required Variables:

```
NODE_ENV=production
PORT=8000
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-supabase-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=your-random-secret-key-minimum-32-characters-long
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

### Optional Variables:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_...
```

## Step 6: Enable Connection Pooling (Recommended)

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Find **Connection Pooling** section
3. Enable it
4. Use the pooled connection string:
   - **Port**: Change from `5432` to `6543`
   - Update `DB_PORT=6543` in Vercel

## Step 7: Redeploy on Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Deployments**
4. Click "..." on latest deployment → **Redeploy**
5. Or push to GitHub to trigger auto-deploy

## Step 8: Verify Connection

1. Visit: `https://your-app.vercel.app/api/health`
2. Should return database connection status
3. Try login:
   - Email: `admin@billing.com`
   - Password: `admin123`

## Troubleshooting

### Error: "connect ETIMEDOUT"
- Check database host is correct
- Verify database password is correct
- Check firewall allows connections
- Try connection pooling port (6543)

### Error: "SSL required"
- Set `DB_SSL=true` in environment variables
- Set `DB_SSL_REJECT_UNAUTHORIZED=false`

### Error: "Authentication failed"
- Verify `DB_USER=postgres`
- Check password is correct (no extra spaces)
- Try resetting database password in Supabase

### Error: "Database does not exist"
- Use `DB_NAME=postgres` (default Supabase database)

## Quick Checklist

- [ ] Supabase project created
- [ ] Migration SQL run successfully
- [ ] Seed SQL run successfully
- [ ] All environment variables set in Vercel
- [ ] Connection pooling enabled (optional but recommended)
- [ ] Vercel project redeployed
- [ ] Health endpoint working
- [ ] Login working

## Generate JWT Secret

Run this to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use an online generator: https://generate-secret.vercel.app/32

---

**Your database is now in the cloud and ready to use!**

