# 🚀 Supabase + Vercel Quick Setup

## ✅ What's Configured

- ✅ **Database:** PostgreSQL (Supabase) - Default
- ✅ **Deployment:** Vercel serverless functions
- ✅ **SSL:** Enabled for Supabase
- ✅ **Connection Pooling:** Available on port 6543

## 📋 3-Step Setup

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up (free)
3. Create new project
4. Save your database password!

### Step 2: Run Migrations

1. Supabase Dashboard → **SQL Editor**
2. Copy `supabase/migrations/001_initial_schema.sql`
3. Paste and **Run**
4. (Optional) Run `supabase/seed.sql`

### Step 3: Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:

```
NODE_ENV=production
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=generate-with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

4. **Redeploy**

## ✅ Done!

Your app is live at: `https://your-app.vercel.app`

See `VERCEL_SUPABASE_DEPLOY.md` for detailed instructions.

