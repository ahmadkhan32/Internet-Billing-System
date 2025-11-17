# Complete Deployment Setup - Supabase + Vercel

## 🎯 Overview
This guide will help you:
1. ✅ Set up Supabase (Cloud Database)
2. ✅ Migrate database schema
3. ✅ Configure Vercel environment variables
4. ✅ Deploy to Vercel
5. ✅ Test the deployment

---

## Step 1: Create Supabase Project

1. **Go to Supabase**: https://supabase.com
2. **Sign up/Login** with GitHub
3. **Create New Project**:
   - Name: `internet-billing-system`
   - Database Password: **Create a strong password** (SAVE IT!)
   - Region: Choose closest to you
4. **Wait 2-3 minutes** for project creation

---

## Step 2: Get Database Credentials

1. In Supabase Dashboard → **Settings** → **Database**
2. Find **Connection string** section
3. Copy the **URI** (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
4. **Extract these values**:
   - **Host**: `db.xxxxx.supabase.co` (from connection string)
   - **Port**: `5432` (or `6543` for connection pooling)
   - **Database**: `postgres`
   - **User**: `postgres`
   - **Password**: (the one you created)

---

## Step 3: Run Database Migration

1. In Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Open file: `supabase/migrations/001_initial_schema.sql`
4. **Copy entire contents** and paste into SQL Editor
5. Click **"Run"** (or press Ctrl+Enter)
6. Wait for **"Success. No rows returned"**

---

## Step 4: Seed Database

1. In SQL Editor, click **"New query"**
2. Open file: `supabase/seed.sql`
3. **Copy entire contents** and paste into SQL Editor
4. Click **"Run"**
5. Wait for **"Success. No rows returned"**

---

## Step 5: Generate JWT Secret

Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Save the output** - you'll need it for environment variables.

---

## Step 6: Set Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project: `Internet-Billing-System`
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"** for each variable:

### Required Variables:

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `PORT` | `8000` | `8000` |
| `DB_DIALECT` | `postgres` | `postgres` |
| `DB_HOST` | Your Supabase host | `db.xxxxx.supabase.co` |
| `DB_PORT` | `5432` or `6543` | `5432` |
| `DB_USER` | `postgres` | `postgres` |
| `DB_PASSWORD` | Your Supabase password | `your-password` |
| `DB_NAME` | `postgres` | `postgres` |
| `DB_SSL` | `true` | `true` |
| `DB_SSL_REJECT_UNAUTHORIZED` | `false` | `false` |
| `JWT_SECRET` | Generated secret | `abc123...` (32+ chars) |
| `JWT_EXPIRE` | `7d` | `7d` |
| `FRONTEND_URL` | Your Vercel URL | `https://your-app.vercel.app` |

### Optional Variables (if needed):

| Variable | Value |
|----------|-------|
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `your-email@gmail.com` |
| `EMAIL_PASS` | `your-app-password` |
| `STRIPE_SECRET_KEY` | `sk_test_...` |

---

## Step 7: Enable Connection Pooling (Recommended)

1. In Supabase Dashboard → **Settings** → **Database**
2. Find **Connection Pooling** section
3. **Enable Connection Pooling**
4. **Update `DB_PORT`** in Vercel to `6543` (pooled port)

**Why?** Connection pooling reduces connection time and improves performance.

---

## Step 8: Redeploy on Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Deployments** tab
4. Click **"..."** on latest deployment → **"Redeploy"**
5. Or **push to GitHub** to trigger auto-deploy:
   ```bash
   git push origin main
   ```

---

## Step 9: Verify Deployment

### Test Health Endpoint:
```
https://your-app.vercel.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "database": "connected"
}
```

### Test Login:
1. Go to: `https://your-app.vercel.app`
2. Login with:
   - **Email**: `admin@billing.com`
   - **Password**: `admin123`

---

## Step 10: Test Locally (Optional)

### Backend:
```bash
cd backend
npm install
# Create .env file with Supabase credentials
npm start
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## Troubleshooting

### Error: "connect ETIMEDOUT"
**Solution**:
- ✅ Check `DB_HOST` is correct (no `https://` prefix)
- ✅ Verify `DB_PASSWORD` is correct (no extra spaces)
- ✅ Check database firewall allows connections
- ✅ Try connection pooling port `6543` instead of `5432`

### Error: "SSL required"
**Solution**:
- ✅ Set `DB_SSL=true` in Vercel
- ✅ Set `DB_SSL_REJECT_UNAUTHORIZED=false`

### Error: "Authentication failed"
**Solution**:
- ✅ Verify `DB_USER=postgres`
- ✅ Check password is correct
- ✅ Reset password in Supabase if needed

### Error: "Database does not exist"
**Solution**:
- ✅ Use `DB_NAME=postgres` (default Supabase database)

### Error: "504 Gateway Timeout"
**Solution**:
- ✅ Enable connection pooling
- ✅ Use port `6543` for pooled connections
- ✅ Check Vercel function logs
- ✅ Verify database is accessible

---

## Quick Checklist

- [ ] Supabase project created
- [ ] Database migration run successfully
- [ ] Database seed run successfully
- [ ] JWT secret generated
- [ ] All environment variables set in Vercel
- [ ] Connection pooling enabled (optional)
- [ ] Vercel project redeployed
- [ ] Health endpoint working (`/api/health`)
- [ ] Login working (`admin@billing.com` / `admin123`)

---

## Environment Variables Template

Copy this template and fill in your values:

```env
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
JWT_SECRET=your-generated-secret-key-32-chars-minimum
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

---

## Support

If you encounter issues:
1. Check **Vercel Function Logs** for detailed errors
2. Check **Supabase Logs** for database errors
3. Verify all environment variables are set correctly
4. Test database connection using Supabase SQL Editor

---

**🎉 Your application is now deployed with cloud database!**

