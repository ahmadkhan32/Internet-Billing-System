# How to Get Supabase Credentials for Vercel

## 📍 Step-by-Step Guide

### Step 1: Access Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project (or create one if you haven't)

### Step 2: Get Database Credentials

1. In Supabase Dashboard, click **"Settings"** (gear icon in left sidebar)
2. Click **"Database"** in the settings menu
3. Scroll down to **"Connection string"** section

### Step 3: Copy Connection String

You'll see a connection string that looks like:

```
postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijk.supabase.co:5432/postgres
```

### Step 4: Extract Credentials

From the connection string, extract:

| Variable | Value | Example |
|----------|-------|---------|
| **DB_HOST** | Text after `@` and before `:5432` | `db.abcdefghijk.supabase.co` |
| **DB_PORT** | Port number (usually `5432`) | `5432` |
| **DB_USER** | Always `postgres` | `postgres` |
| **DB_PASSWORD** | Your project password | `your-password-here` |
| **DB_NAME** | Always `postgres` | `postgres` |

### Step 5: Get Password

**Important:** The password is shown only once when you create the project.

If you forgot it:
1. Go to **Settings** → **Database**
2. Click **"Reset database password"**
3. Enter new password
4. **Save it immediately!**

---

## 🔐 Complete Environment Variables

Use these values in Vercel:

```
DB_DIALECT=postgres
DB_HOST=db.abcdefghijk.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password-here
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

**Replace:**
- `db.abcdefghijk.supabase.co` with your actual host
- `your-password-here` with your actual password

---

## 📋 Quick Copy Template

Copy this and fill in your values:

```
DB_DIALECT=postgres
DB_HOST=
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

---

## 🔍 Alternative: Connection Pooling

For better performance, use connection pooling:

1. Supabase Dashboard → **Settings** → **Database**
2. Enable **"Connection Pooling"**
3. Use port `6543` instead of `5432`:

```
DB_PORT=6543
```

---

## ✅ Verification

After setting variables, test connection:

1. Visit: `https://your-backend.vercel.app/api/health`
2. Should show: `{"status":"ok","database":"connected"}`

If it fails:
- ✅ Double-check all values are correct
- ✅ No extra spaces in password
- ✅ Host has no `https://` prefix
- ✅ Supabase project is active (not paused)

---

## 🆘 Troubleshooting

### "Authentication failed"
- ✅ Check password is correct
- ✅ No extra spaces before/after password
- ✅ Password copied exactly

### "Connection refused"
- ✅ Check `DB_HOST` is correct
- ✅ Verify Supabase project is active
- ✅ Check port number (5432 or 6543)

### "SSL required"
- ✅ Set `DB_SSL=true`
- ✅ Set `DB_SSL_REJECT_UNAUTHORIZED=false`

---

**See `COMPLETE_MIGRATION_AND_DEPLOYMENT_GUIDE.md` for full setup guide.**

