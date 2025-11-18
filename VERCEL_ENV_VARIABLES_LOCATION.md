# 📍 Environment Variables Location in Vercel

## 🎯 Exact Location

**Path:** `Vercel Dashboard → Your Project → Settings → Environment Variables`

---

## 🔐 Backend Variables Location

### Step-by-Step:

1. **Go to:** [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click:** Your Backend Project name
3. **Click:** **"Settings"** tab (top navigation)
4. **Click:** **"Environment Variables"** (left sidebar)
5. **Click:** **"Add New"** button (top right)

### All 14 Backend Variables:

Copy from `backend/env.template` or use these values:

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

---

## 🎨 Frontend Variable Location

### Step-by-Step:

1. **Go to:** [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click:** Your Frontend Project name
3. **Click:** **"Settings"** tab
4. **Click:** **"Environment Variables"** (left sidebar)
5. **Click:** **"Add New"** button

### Frontend Variable:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

---

## 📁 File Locations

### In Your Project:

- **Backend Variables**: `backend/env.template`
- **All Values**: Listed in this guide above

### In Vercel:

- **Backend**: Project Settings → Environment Variables
- **Frontend**: Project Settings → Environment Variables

---

**See `WHERE_TO_SET_ENV_VARIABLES.md` for complete guide!**

