# 📋 Vercel Environment Variables - Copy & Paste

## 🔐 Backend Environment Variables

Copy these **EXACTLY** into Vercel Backend Project → Environment Variables:

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

**Note:** Update `FRONTEND_URL` after deploying frontend.

---

## 🎨 Frontend Environment Variable

Copy this into Vercel Frontend Project → Environment Variables:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

**Note:** Replace `your-backend.vercel.app` with your actual backend URL.

---

## 📝 Instructions

1. **Backend Project:**
   - Go to Vercel → Your Backend Project → Settings → Environment Variables
   - Add each variable one by one
   - Set for **Production** environment
   - Deploy

2. **Frontend Project:**
   - Go to Vercel → Your Frontend Project → Settings → Environment Variables
   - Add `VITE_API_BASE_URL` with your backend URL
   - Set for **Production** environment
   - Deploy

3. **Update Backend:**
   - After frontend is deployed, update `FRONTEND_URL` in backend
   - Redeploy backend

---

**See `DEPLOY_NOW_COMPLETE.md` for complete deployment steps.**

