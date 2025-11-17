# Environment Variables Setup Guide

## 📁 File Structure

```
Internet Billing System/
├── .env.example              # Root template (reference only)
├── backend/
│   ├── .env                  # Backend environment variables (create this)
│   ├── .env.example          # Backend template
│   └── .env.supabase         # Supabase-specific template
└── frontend/
    ├── .env                  # Frontend environment variables (create this)
    └── .env.example          # Frontend template
```

## 🚀 Quick Setup

### For Local Development

1. **Backend Setup**:
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env with your API URL
   ```

### For Vercel Deployment

Set all environment variables in:
- **Vercel Dashboard** → **Settings** → **Environment Variables**

## 📋 Required Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_DIALECT` | Database type | `postgres` |
| `DB_HOST` | Supabase host | `db.xxxxx.supabase.co` |
| `DB_PORT` | Database port | `5432` or `6543` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `your-password` |
| `DB_NAME` | Database name | `postgres` |
| `DB_SSL` | Enable SSL | `true` |
| `JWT_SECRET` | JWT secret key | `generated-secret` |
| `FRONTEND_URL` | Frontend URL | `http://localhost:3000` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api` |

## 🔐 Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📝 Supabase Credentials

Get from: **Supabase Dashboard** → **Settings** → **Database**

1. **Connection String**:
   ```
   postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

2. **Extract**:
   - Host: `db.xxxxx.supabase.co`
   - Port: `5432` (or `6543` for pooling)
   - User: `postgres`
   - Password: (your password)
   - Database: `postgres`

## ⚙️ Connection Pooling (Recommended)

For better performance, use connection pooling:

1. **Enable** in Supabase Dashboard → Settings → Database
2. **Change port** to `6543`:
   ```
   DB_PORT=6543
   ```

## 🔒 Security Notes

- ✅ Never commit `.env` files to git
- ✅ `.env` files are in `.gitignore`
- ✅ Use `.env.example` as template
- ✅ For production, set variables in Vercel Dashboard

## 🧪 Test Configuration

### Backend:
```bash
cd backend
node check-env.js
```

### Test Database Connection:
```bash
cd backend
node -e "require('./config/db').testConnection()"
```

## 📚 See Also

- `COMPLETE_DEPLOYMENT_SETUP.md` - Full deployment guide
- `QUICK_START_SUPABASE.md` - Quick Supabase setup
- `SUPABASE_MIGRATION_GUIDE.md` - Database migration guide

