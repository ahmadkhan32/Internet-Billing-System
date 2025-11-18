# 🚀 Complete Environment Variables for Deployment

## 📋 All Variables You Need

### Backend Project (14 Variables)

**Copy these EXACTLY into Vercel Backend Project:**

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

### Frontend Project (1 Variable)

**Copy this into Vercel Frontend Project:**

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

---

## 🎯 Deployment Order

1. **Deploy Backend** → Get Backend URL
2. **Deploy Frontend** → Use Backend URL → Get Frontend URL
3. **Update Backend** → Set FRONTEND_URL → Redeploy

---

## ✅ That's All You Need!

**Total: 15 environment variables** (14 backend + 1 frontend)

All values are ready - just copy-paste into Vercel!

---

**See `ALL_ENV_VARIABLES_NEEDED.md` for detailed explanation.**

