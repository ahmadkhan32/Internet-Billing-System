# ✅ Quick Deploy Checklist - Copy & Paste

## 🔐 Backend Environment Variables

Copy these into **Backend Project** → **Environment Variables**:

```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=8000
VERCEL=1
```

## 🎨 Frontend Environment Variable

Copy this into **Frontend Project** → **Environment Variables**:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

## ⚙️ Backend Project Settings

- **Framework**: `Other`
- **Root Directory**: `./`
- **Build Command**: (empty)
- **Output Directory**: (empty)
- **Install Command**: `cd backend && npm install`

## ⚙️ Frontend Project Settings

- **Framework**: `Vite`
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 📋 Deployment Order

1. ✅ Deploy Backend → Get Backend URL
2. ✅ Deploy Frontend → Get Frontend URL (use Backend URL in env var)
3. ✅ Update Backend → Set FRONTEND_URL → Redeploy

## ✅ Auto-Deploy

✅ **Enabled by default!** Just push to GitHub and Vercel deploys automatically.

---

**See `AUTO_DEPLOY_VERCEL_SETUP.md` for complete guide.**

