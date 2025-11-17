# 🚀 Vercel + Supabase Deployment Guide

## ✅ Configuration Complete

Your project is now configured for **Vercel + Supabase** deployment.

## 📋 Quick Deployment Steps

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up (free tier available)
3. Click **"New Project"**
4. Fill in:
   - **Name:** `internet-billing-system`
   - **Database Password:** (save this - you'll need it!)
   - **Region:** Choose closest to you
5. Click **"Create new project"**
6. Wait for project to be ready (2-3 minutes)

### Step 2: Get Database Credentials

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Scroll to **"Connection string"** section
3. Click **"URI"** tab
4. You'll see connection string like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Extract these values:
   - **DB_HOST:** `https://qppdkzzmijjyoihzfdxw.supabase.co`
   - **DB_PORT:** `5432` (or `6543` for connection pooling)
   - **DB_USER:** `postgres`
   - **DB_PASSWORD:** (the password you set)
   - **DB_NAME:** `postgres`

### Step 3: Run Database Migrations

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Open `supabase/migrations/001_initial_schema.sql` from your project
4. Copy and paste the entire SQL into the editor
5. Click **"Run"** (or press Ctrl+Enter)
6. Wait for execution to complete
7. (Optional) Run `supabase/seed.sql` for initial data

### Step 4: Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import your Git repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (root)
   - **Build Command:** (auto-detected)
   - **Output Directory:** `frontend/dist`
5. Click **"Deploy"** (don't set env vars yet)

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts
```

### Step 5: Add Environment Variables in Vercel

**CRITICAL STEP** - Without this, database won't work!

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Add these variables (for **Production**, **Preview**, and **Development**):

```
NODE_ENV=production
PORT=8000
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=your-generated-jwt-secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**For Better Performance (Connection Pooling):**
- Use `DB_PORT=6543` instead of `5432`
- This uses Supabase's connection pooler for better performance

### Step 6: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

## ✅ Verify Deployment

### 1. Check Health Endpoint
```
https://your-app.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

### 2. Check Diagnostics
```
https://your-app.vercel.app/api/diagnose
```

Shows detailed connection information and troubleshooting tips.

### 3. Test Login
- Go to: `https://your-app.vercel.app`
- Email: `admin@billing.com`
- Password: `admin123`

## 🔧 Configuration Details

### Database Configuration
- **Type:** PostgreSQL (Supabase)
- **SSL:** Enabled (required for Supabase)
- **Connection Pooling:** Available on port 6543
- **Optimized:** For Vercel serverless functions

### Vercel Configuration
- **Framework:** Vite (React)
- **Backend:** Express serverless functions
- **API Routes:** `/api/*` → `/api/index.js`
- **Frontend:** Served from `frontend/dist`

## 🐛 Troubleshooting

### Database Connection Failed

1. **Check Environment Variables:**
   - Verify all variables are set in Vercel
   - Check for typos in values
   - Ensure variables are set for correct environment

2. **Check Supabase:**
   - Verify project is active (not paused)
   - Check database credentials are correct
   - Ensure migrations have been run

3. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Deployments → Latest → Functions
   - Look for database connection errors

### Common Issues

**Error: "password authentication failed"**
- Verify DB_PASSWORD is correct
- Get password from Supabase Dashboard → Settings → Database
- Password is shown only once when project is created

**Error: "connection refused" or "timeout"**
- Check DB_HOST is correct (db.xxxxx.supabase.co)
- Verify Supabase project is not paused
- Try using connection pooling port 6543

**Error: "SSL required"**
- Ensure DB_SSL=true
- Set DB_SSL_REJECT_UNAUTHORIZED=false
- Supabase requires SSL connections

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `PORT` | Yes | Server port | `8000` |
| `DB_DIALECT` | Yes | Database type | `postgres` |
| `DB_HOST` | Yes | Supabase host | `db.xxxxx.supabase.co` |
| `DB_PORT` | Yes | Database port | `5432` or `6543` |
| `DB_USER` | Yes | Database username | `postgres` |
| `DB_PASSWORD` | Yes | Database password | (from Supabase) |
| `DB_NAME` | Yes | Database name | `postgres` |
| `DB_SSL` | Yes | Enable SSL | `true` |
| `DB_SSL_REJECT_UNAUTHORIZED` | Yes | SSL validation | `false` |
| `JWT_SECRET` | Yes | JWT secret key | (32+ characters) |
| `JWT_EXPIRE` | No | JWT expiry | `7d` |
| `FRONTEND_URL` | No | Frontend URL | `https://your-app.vercel.app` |

## 🎉 Success!

Once deployed, your application will be available at:
```
https://your-app.vercel.app
```

**Default Login Credentials:**
- Super Admin: `admin@billing.com` / `admin123`
- ISP Admin: `ispadmin@billing.com` / `admin123`
- Account Manager: `accountmanager@billing.com` / `admin123`
- Technical Officer: `technical@billing.com` / `admin123`
- Recovery Officer: `recovery@billing.com` / `admin123`
- Customer: `customer@billing.com` / `admin123`

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Connection Pooling:** https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler
- **Project README:** See `README.md` for more details

---

**Note:** Make sure to run database migrations in Supabase SQL Editor before testing the application!

