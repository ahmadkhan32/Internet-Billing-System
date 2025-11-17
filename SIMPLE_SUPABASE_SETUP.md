# Simple Supabase Setup - 3 Steps

## ⚠️ IMPORTANT: Environment Variables ARE Required

Even with Supabase (cloud database), you MUST set environment variables in Vercel so your app knows how to connect to Supabase.

---

## Step 1: Get Supabase Credentials (2 minutes)

1. Go to [supabase.com](https://supabase.com) → Your Project
2. Click **Settings** → **Database**
3. Find **Connection string** section
4. Copy the **URI** connection string

It looks like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

**Extract these values:**
- **Host**: `db.xxxxx.supabase.co` (the part after `@` and before `:5432`)
- **Port**: `5432`
- **User**: `postgres`
- **Password**: `[YOUR-PASSWORD]` (the password you set when creating the project)
- **Database**: `postgres`

---

## Step 2: Set Environment Variables in Vercel (3 minutes)

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"** and add these **ONE BY ONE**:

```
DB_DIALECT = postgres
DB_HOST = db.xxxxx.supabase.co
DB_PORT = 5432
DB_USER = postgres
DB_PASSWORD = your-supabase-password
DB_NAME = postgres
DB_SSL = true
DB_SSL_REJECT_UNAUTHORIZED = false
JWT_SECRET = [generate below]
JWT_EXPIRE = 7d
FRONTEND_URL = https://your-app.vercel.app
NODE_ENV = production
PORT = 8000
```

### Generate JWT Secret:

Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it for `JWT_SECRET`.

---

## Step 3: Redeploy (1 minute)

1. Vercel Dashboard → **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## ✅ Test

1. Visit: `https://your-app.vercel.app/api/health`
2. Should show: `{"status":"ok","database":"connected"}`
3. Try login: `admin@billing.com` / `admin123`

---

## ❓ Why Environment Variables Are Needed

**Even with cloud databases like Supabase, your Vercel app needs to know:**
- Where to connect (DB_HOST)
- How to authenticate (DB_USER, DB_PASSWORD)
- Which database to use (DB_NAME)

**Think of it like this:**
- Supabase = Your house (the database)
- Environment variables = The address and key to get in
- Without the address/key, Vercel can't find or access your database

---

## 🚨 Common Mistakes

1. **Wrong Host**: Make sure it's `db.xxxxx.supabase.co` (not `https://` or `http://`)
2. **Wrong Password**: Use the password you set when creating Supabase project
3. **Forgot to Redeploy**: After adding variables, you MUST redeploy
4. **Missing DB_SSL**: Must be `true` for Supabase

---

## 📋 Quick Copy-Paste Template

Replace `xxxxx` and `your-password` with your actual values:

```
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=your-generated-secret-here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
PORT=8000
```

---

**That's it! After setting these variables and redeploying, your database connection will work.**

