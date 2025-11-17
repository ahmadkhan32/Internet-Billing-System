# Fix Database Connection - Quick Steps

## ⚠️ Current Error
"Database connection failed. Please check your database configuration."

## ✅ Solution (5 Minutes)

### Step 1: Get Supabase Credentials (2 min)

1. Go to [supabase.com](https://supabase.com) → Your Project
2. **Settings** → **Database**
3. Copy **Connection string (URI)**
4. Extract:
   - **Host**: `db.xxxxx.supabase.co` (from connection string)
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: (your Supabase password)
   - **Database**: `postgres`

### Step 2: Set in Vercel (2 min)

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

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Redeploy (1 min)

1. Vercel Dashboard → **Deployments**
2. Click **"..."** → **"Redeploy"**
3. Wait 2-3 minutes

### Step 4: Test

Visit: `https://your-app.vercel.app/api/health`

Should show: `{"status":"ok","database":"connected"}`

---

## 🔍 Verify Variables Are Set

### Check in Vercel:
1. Settings → Environment Variables
2. Make sure all variables are listed
3. Check values are correct (no typos)

### Common Mistakes:
- ❌ `DB_HOST=https://db.xxxxx.supabase.co` (remove `https://`)
- ❌ `DB_HOST=db.xxxxx.supabase.co/` (remove trailing slash)
- ❌ Password has extra spaces
- ❌ Missing `DB_SSL=true`
- ❌ Forgot to redeploy after adding variables

---

## 🧪 Test Locally (Optional)

```bash
cd backend
npm run test-db
```

This will show exactly what's missing.

---

## 📋 Complete Variable List

Copy this and replace values:

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

## ✅ After Setting Variables

1. **Redeploy** (required!)
2. **Wait** for deployment to complete
3. **Test** health endpoint
4. **Check** Vercel function logs if still failing

---

**See `DATABASE_CONNECTION_TROUBLESHOOTING.md` for detailed troubleshooting.**
