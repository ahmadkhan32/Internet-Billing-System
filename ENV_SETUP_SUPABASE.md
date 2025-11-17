# Environment Variables Setup for Supabase

## Quick Setup

### Step 1: Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Find **Connection string** section
5. Copy the connection string or extract these values:
   - **Host**: `db.xxxxx.supabase.co`
   - **Port**: `5432` (or `6543` for connection pooling)
   - **User**: `postgres`
   - **Password**: (your database password)
   - **Database**: `postgres`

### Step 2: Generate JWT Secret

Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Create .env File

1. **For Local Development**:
   ```bash
   cd backend
   cp env.template .env
   ```

2. **Edit `.env` file** with your Supabase credentials:
   ```env
   DB_DIALECT=postgres
   DB_HOST=db.xxxxx.supabase.co
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your-supabase-password
   DB_NAME=postgres
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   JWT_SECRET=your-generated-secret-key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

### Step 4: Set Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

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

### Step 5: Test Connection

```bash
cd backend
npm start
```

Check for: `✅ Database connection established successfully.`

## Environment Variables Reference

### Required Variables

```env
# Database
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false

# Server
NODE_ENV=production
PORT=8000

# Authentication
JWT_SECRET=your-secret-key-32-chars-minimum
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=https://your-app.vercel.app
```

### Optional Variables

```env
# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# SMS
SMS_API_KEY=your-sms-api-key
SMS_API_URL=https://api.sms-provider.com
```

## Connection Pooling (Recommended)

For better performance, use Supabase connection pooling:

1. In Supabase Dashboard → **Settings** → **Database**
2. Enable **Connection Pooling**
3. Use port `6543` instead of `5432`:
   ```env
   DB_PORT=6543
   ```

## Troubleshooting

### Error: "connect ETIMEDOUT"
- Check `DB_HOST` is correct (no `https://` prefix)
- Verify `DB_PASSWORD` is correct
- Check database firewall settings

### Error: "SSL required"
- Set `DB_SSL=true`
- Set `DB_SSL_REJECT_UNAUTHORIZED=false`

### Error: "Authentication failed"
- Verify `DB_USER=postgres`
- Check password is correct
- Reset password in Supabase if needed

## Files Reference

- `backend/env.template` - Full template with all options
- `backend/.env.supabase.example` - Supabase-specific template
- This file - Setup instructions

---

**Note**: Never commit `.env` files to Git. They're already in `.gitignore`.

