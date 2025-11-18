# ⚡ One-Click Deployment Guide

## 🎯 Simplest Possible Deployment

This guide makes deployment as easy as possible - just follow the steps!

---

## 📋 Backend Deployment (Copy-Paste Ready)

### 1. Create Project
- Vercel → Add New Project → Import `ahmadkhan32/Internet-Billing-System`

### 2. Settings
```
Framework: Other
Root: ./
Build: (empty)
Output: (empty)
Install: cd backend && npm install
```

### 3. Environment Variables (14 total)

**Just copy-paste these one by one:**

| Key | Value |
|-----|-------|
| `DB_DIALECT` | `postgres` |
| `DB_HOST` | `db.qppdkzzmijjyoihzfdxw.supabase.co` |
| `DB_PORT` | `5432` |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | `3oqj6vL2Tr5BZLaf` |
| `DB_NAME` | `postgres` |
| `DB_SSL` | `true` |
| `DB_SSL_REJECT_UNAUTHORIZED` | `false` |
| `JWT_SECRET` | `2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be` |
| `JWT_EXPIRE` | `7d` |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` |
| `NODE_ENV` | `production` |
| `PORT` | `8000` |
| `VERCEL` | `1` |

### 4. Deploy
- Click "Deploy" → Wait → Copy Backend URL

---

## 📋 Frontend Deployment (Copy-Paste Ready)

### 1. Create Project
- Vercel → Add New Project → Import same repo

### 2. Settings
```
Framework: Vite
Root: ./frontend
Build: npm run build
Output: dist
Install: npm install
```

### 3. Environment Variable (1 only)

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://your-backend.vercel.app` |

*(Use your actual Backend URL!)*

### 4. Deploy
- Click "Deploy" → Wait → Copy Frontend URL

---

## 📋 Update Backend

1. Backend Project → Settings → Environment Variables
2. Update `FRONTEND_URL` with Frontend URL
3. Redeploy Backend

---

## ✅ Done!

**That's it!** Your project is deployed and running!

**Login:**
- Email: `admin@billing.com`
- Password: `admin123`

---

**See `SIMPLE_DEPLOY_NO_ENV_SETUP.md` for detailed version!**

