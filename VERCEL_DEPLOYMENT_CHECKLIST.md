# Vercel Deployment Checklist - Complete Setup

## ✅ Pre-Deployment Checklist

### 1. Database Setup (Supabase)

- [ ] **Create Supabase Project**
  - Go to: https://supabase.com
  - Create new project
  - Save database password

- [ ] **Run Database Migration**
  - Supabase Dashboard → SQL Editor
  - Run: `supabase/migrations/001_initial_schema.sql`
  - Verify: "Success. No rows returned"

- [ ] **Seed Database**
  - SQL Editor → New query
  - Run: `supabase/seed.sql`
  - Verify: "Success. No rows returned"

- [ ] **Get Database Credentials**
  - Settings → Database
  - Copy connection string
  - Extract: Host, Port, User, Password

- [ ] **Enable Connection Pooling** (Recommended)
  - Settings → Database → Connection Pooling
  - Enable pooling
  - Use port `6543` instead of `5432`

### 2. Environment Variables Setup

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Set in Vercel Dashboard → Settings → Environment Variables:**

#### Required Variables:

```env
NODE_ENV=production
PORT=8000
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
# Or use 6543 for connection pooling
DB_USER=postgres
DB_PASSWORD=your-supabase-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=your-generated-secret-32-chars-minimum
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

#### Optional Variables:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_...
```

### 3. Verify Configuration Files

- [ ] **vercel.json** exists and is correct
- [ ] **api/index.js** exists (serverless function handler)
- [ ] **backend/package.json** has all dependencies
- [ ] **frontend/package.json** has all dependencies
- [ ] **backend/config/db-postgres.js** exists (PostgreSQL config)

### 4. GitHub Repository

- [ ] Code is pushed to GitHub
- [ ] Repository: `ahmadkhan32/Internet-Billing-System`
- [ ] All files are committed

---

## 🚀 Deployment Steps

### Step 1: Connect to Vercel

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import: `ahmadkhan32/Internet-Billing-System`

### Step 2: Configure Project

**Framework Preset:** Vite (or auto-detect)

**Build Settings:**
- **Root Directory:** `./` (leave as is)
- **Build Command:** 
  ```
  npm install --include=dev --prefix backend && npm install --include=dev --prefix frontend && npm run build --prefix frontend
  ```
- **Output Directory:** `frontend/dist`
- **Install Command:**
  ```
  npm install --include=dev --prefix backend && npm install --include=dev --prefix frontend
  ```

### Step 3: Set Environment Variables

1. Click **"Environment Variables"** before deploying
2. Add all variables from checklist above
3. Set for **Production**, **Preview**, and **Development**
4. Click **"Save"**

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Check build logs for errors

### Step 5: Verify Deployment

1. **Test Health Endpoint:**
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

2. **Test Login:**
   - Go to: `https://your-app.vercel.app`
   - Email: `admin@billing.com`
   - Password: `admin123`

---

## 🔍 Troubleshooting

### Error: "Database connection failed"

**Check:**
1. ✅ All environment variables are set in Vercel
2. ✅ Database credentials are correct
3. ✅ Database migration and seed are run
4. ✅ Database firewall allows connections (0.0.0.0/0)
5. ✅ `DB_SSL=true` is set
6. ✅ `DB_DIALECT=postgres` is set

**Solution:**
- Check Vercel function logs for detailed error
- Verify Supabase connection string
- Test connection using Supabase SQL Editor

### Error: "504 Gateway Timeout"

**Check:**
1. ✅ Connection pooling is enabled
2. ✅ Using port `6543` for pooling
3. ✅ Database is accessible
4. ✅ Function timeout is set to 60 seconds (Pro plan)

**Solution:**
- Enable connection pooling in Supabase
- Use pooled port `6543`
- Check database performance

### Error: "Module not found"

**Check:**
1. ✅ All dependencies are in `package.json`
2. ✅ Build command installs dependencies
3. ✅ `node_modules` are not in `.gitignore` incorrectly

**Solution:**
- Verify build logs show dependency installation
- Check `backend/package.json` has `pg` and `pg-hstore`
- Redeploy after fixing

### Error: "503 Service Unavailable"

**Check:**
1. ✅ Database is running
2. ✅ Environment variables are correct
3. ✅ Database migration is complete

**Solution:**
- Check `/api/diagnose` endpoint for details
- Review Vercel function logs
- Verify database connection

---

## 📋 Post-Deployment Verification

### 1. Health Check
```bash
curl https://your-app.vercel.app/api/health
```

### 2. Diagnostic Check
```bash
curl https://your-app.vercel.app/api/diagnose
```

### 3. Test Login
- Visit: `https://your-app.vercel.app`
- Login with: `admin@billing.com` / `admin123`

### 4. Check Logs
- Vercel Dashboard → Functions → View logs
- Check for any errors or warnings

---

## 🎯 Quick Reference

### Environment Variables Template

Copy this to Vercel:

```env
NODE_ENV=production
PORT=8000
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=your-secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

### Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test Database Connection

```bash
# In Supabase SQL Editor
SELECT version();
```

---

## ✅ Success Criteria

- [ ] Health endpoint returns `"database": "connected"`
- [ ] Login works with `admin@billing.com` / `admin123`
- [ ] No errors in Vercel function logs
- [ ] Frontend loads correctly
- [ ] API endpoints respond correctly

---

## 📞 Need Help?

1. Check **Vercel Function Logs** for detailed errors
2. Check **Supabase Logs** for database errors
3. Use `/api/diagnose` endpoint for diagnostics
4. Review `COMPLETE_DEPLOYMENT_SETUP.md` for detailed guide

---

**🎉 Once all checkboxes are checked, your deployment is complete!**

