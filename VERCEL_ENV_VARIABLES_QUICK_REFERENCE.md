# ⚡ Quick Reference: Vercel Environment Variables

## 📋 Copy-Paste All Variables

### Step 1: Go to Vercel Dashboard
1. Visit: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. **Settings** → **Environment Variables**
4. Click **Add New** for each variable

---

## 🔐 Database Variables (8)

```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

---

## 🔑 JWT Variables (2)

```
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
```

---

## 🌐 Application Variables (5)

**⚠️ IMPORTANT**: Replace `your-project.vercel.app` with your actual Vercel URL!

```
FRONTEND_URL=https://your-project.vercel.app
NODE_ENV=production
PORT=8000
VERCEL=1
VITE_API_BASE_URL=https://your-project.vercel.app
```

---

## 📝 How to Set Variables

### For Each Variable:
1. **Name**: Copy the name (e.g., `DB_HOST`)
2. **Value**: Copy the value (e.g., `db.qppdkzzmijjyoihzfdxw.supabase.co`)
3. **Environment**: Select **Production**, **Preview**, and **Development**
4. Click **Save**

---

## ⚠️ Critical Variables

### Most Important (Set These First):
1. ✅ `VITE_API_BASE_URL` - **MUST** be your Vercel URL
2. ✅ `DB_HOST` - Supabase database host
3. ✅ `DB_PASSWORD` - Supabase database password
4. ✅ `JWT_SECRET` - For authentication

---

## 🔄 After First Deployment

1. **Get your Vercel URL** from the dashboard
2. **Update** these variables:
   - `FRONTEND_URL` = `https://your-actual-url.vercel.app`
   - `VITE_API_BASE_URL` = `https://your-actual-url.vercel.app`
3. **Redeploy** the project

---

## ✅ Total Variables: 15

- Database: 8
- JWT: 2
- Application: 5

**All must be set for the application to work!**

---

**Quick copy-paste reference for all environment variables! ⚡**

