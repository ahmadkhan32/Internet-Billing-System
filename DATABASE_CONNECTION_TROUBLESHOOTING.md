# Database Connection Troubleshooting Guide

## 🔍 Step-by-Step Diagnosis

### Step 1: Check Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these variables exist and have correct values:

**Required Variables:**
- ✅ `DB_DIALECT` = `postgres`
- ✅ `DB_HOST` = `db.xxxxx.supabase.co` (your Supabase host)
- ✅ `DB_PORT` = `5432` (or `6543` for connection pooling)
- ✅ `DB_USER` = `postgres`
- ✅ `DB_PASSWORD` = (your Supabase password)
- ✅ `DB_NAME` = `postgres`
- ✅ `DB_SSL` = `true`
- ✅ `DB_SSL_REJECT_UNAUTHORIZED` = `false`
- ✅ `JWT_SECRET` = (32+ character string)
- ✅ `FRONTEND_URL` = `https://your-app.vercel.app`

### Step 2: Verify Supabase Project Status

1. Go to [Supabase Dashboard](https://supabase.com)
2. Check your project status:
   - ✅ Project should be **Active** (not paused)
   - ✅ Free tier projects pause after inactivity
   - ✅ Click "Restore" if paused

### Step 3: Get Correct Supabase Credentials

1. Supabase Dashboard → **Settings** → **Database**
2. Find **Connection string** section
3. Copy the **URI** connection string
4. It looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

**Extract these values:**
- **Host**: The part after `@` and before `:5432`
  - Example: `db.abcdefghijk.supabase.co`
- **Port**: Usually `5432` (or `6543` for pooling)
- **User**: `postgres`
- **Password**: The password you set when creating the project
- **Database**: `postgres`

### Step 4: Test Database Connection

#### Option A: Test via Supabase SQL Editor

1. Supabase Dashboard → **SQL Editor**
2. Run this query:
   ```sql
   SELECT version();
   ```
3. If it works, your database is accessible

#### Option B: Test via Health Endpoint

After setting env vars and redeploying:
1. Visit: `https://your-app.vercel.app/api/health`
2. Should return: `{"status":"ok","database":"connected"}`

### Step 5: Common Issues & Fixes

#### Issue: "Missing environment variables"

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Add ALL required variables (see Step 1)
3. **Redeploy** after adding variables

#### Issue: "connect ETIMEDOUT"

**Possible Causes:**
- Wrong `DB_HOST` (check for typos)
- Supabase project is paused
- Wrong port number

**Fix:**
1. Verify `DB_HOST` is exactly: `db.xxxxx.supabase.co` (no `https://`)
2. Check Supabase project is active
3. Try connection pooling port: `DB_PORT=6543`

#### Issue: "Authentication failed"

**Possible Causes:**
- Wrong password
- Wrong username
- Extra spaces in password

**Fix:**
1. Reset password in Supabase if needed
2. Copy password exactly (no extra spaces)
3. Verify `DB_USER=postgres` (exactly)

#### Issue: "SSL required"

**Fix:**
- Set `DB_SSL=true`
- Set `DB_SSL_REJECT_UNAUTHORIZED=false`

### Step 6: Enable Connection Pooling (Recommended)

1. Supabase Dashboard → **Settings** → **Database**
2. Enable **Connection Pooling**
3. Update in Vercel:
   - Change `DB_PORT` from `5432` to `6543`
4. Redeploy

### Step 7: Verify Variables Are Set Correctly

Check Vercel function logs:
1. Vercel Dashboard → Your Project → **Deployments**
2. Click on latest deployment
3. Go to **Functions** tab
4. Click on the function
5. Check **Logs** for:
   - `✅ PostgreSQL connection established successfully`
   - Or error messages showing what's wrong

### Step 8: Redeploy After Setting Variables

**IMPORTANT:** After adding/changing environment variables:
1. Go to **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

---

## 📋 Quick Checklist

- [ ] All environment variables set in Vercel
- [ ] Supabase project is active (not paused)
- [ ] Database credentials are correct
- [ ] `DB_HOST` has no `https://` prefix
- [ ] `DB_SSL=true` is set
- [ ] Vercel project redeployed after setting variables
- [ ] Health endpoint tested: `/api/health`
- [ ] Checked Vercel function logs for errors

---

## 🧪 Test Connection Locally (Optional)

If you want to test the connection locally:

1. Create `backend/.env` file:
   ```env
   DB_DIALECT=postgres
   DB_HOST=db.xxxxx.supabase.co
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your-password
   DB_NAME=postgres
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   ```

2. Test connection:
   ```bash
   cd backend
   node -e "require('./config/db').testConnection().then(() => console.log('✅ Connected')).catch(e => console.error('❌', e.message))"
   ```

---

## 📞 Still Having Issues?

1. **Check Vercel Logs**: Most detailed error info is in function logs
2. **Check Supabase Logs**: Supabase Dashboard → Logs
3. **Verify Connection String**: Copy directly from Supabase Dashboard
4. **Test in Supabase SQL Editor**: If SQL Editor works, database is fine

---

## 🔗 Related Guides

- `SIMPLE_SUPABASE_SETUP.md` - Quick setup guide
- `VERCEL_DEPLOYMENT_CHECKLIST.md` - Complete deployment guide
- `VERCEL_ENV_VARIABLES_REQUIRED.md` - Why env vars are needed
