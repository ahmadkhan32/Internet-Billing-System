# ⚠️ Environment Variables ARE Required for Vercel

## Why Environment Variables Are Needed

**Even with Supabase (cloud database), you MUST set environment variables in Vercel.**

Here's why:
- **Supabase** = Your database (in the cloud)
- **Vercel** = Your app server (also in the cloud)
- **Environment Variables** = The connection info Vercel needs to reach Supabase

**Without environment variables, Vercel doesn't know:**
- Where your Supabase database is (DB_HOST)
- How to authenticate (DB_USER, DB_PASSWORD)
- Which database to use (DB_NAME)

---

## ✅ Quick Fix (5 Minutes)

### Step 1: Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) → Your Project
2. **Settings** → **Database**
3. Copy the **Connection string (URI)**
4. Extract:
   - **Host**: `db.xxxxx.supabase.co`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: (your Supabase password)
   - **Database**: `postgres`

### Step 2: Set in Vercel

1. [Vercel Dashboard](https://vercel.com) → Your Project
2. **Settings** → **Environment Variables**
3. Add these **ONE BY ONE**:

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

Copy output → Use for `JWT_SECRET`

### Step 4: Redeploy

1. Vercel Dashboard → **Deployments**
2. Click **"..."** → **"Redeploy"**
3. Wait 2-3 minutes

---

## 🧪 Test

Visit: `https://your-app.vercel.app/api/health`

Should show: `{"status":"ok","database":"connected"}`

---

## 📋 Complete Variable List

Copy-paste this template (replace values):

```
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password-here
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=your-generated-secret-32-chars-minimum
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
PORT=8000
```

---

## ❓ FAQ

**Q: Why do I need env vars if Supabase is cloud?**  
A: Vercel needs the connection credentials to reach Supabase. Think of it like giving someone your home address and key.

**Q: Can I skip setting env vars?**  
A: No. The app will deploy but database operations will fail with 503 errors.

**Q: Where do I get Supabase credentials?**  
A: Supabase Dashboard → Settings → Database → Connection string

**Q: Do I need to redeploy after adding vars?**  
A: Yes! Vercel only reads env vars during deployment.

---

## 🚨 Common Errors

### "Cannot read properties of undefined (reading 'define')"
- **Cause**: Sequelize not initialized (missing env vars)
- **Fix**: Set all environment variables in Vercel

### "Database connection failed"
- **Cause**: Missing or incorrect env vars
- **Fix**: Verify all variables are set correctly

### "503 Service Unavailable"
- **Cause**: Database connection timeout
- **Fix**: Check DB_HOST, DB_PASSWORD are correct

---

**See `SIMPLE_SUPABASE_SETUP.md` for detailed step-by-step guide.**

