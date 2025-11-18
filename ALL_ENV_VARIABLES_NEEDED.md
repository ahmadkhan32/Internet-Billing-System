# 📋 All Environment Variables Needed for Deployment

## ⚠️ Important: Environment Variables ARE Required

**You CANNOT deploy without environment variables** - Vercel needs them to connect to your Supabase database. However, I'll show you the **simplest way** to set them all.

---

## 🎯 Minimum Required Variables (Must Have)

### Backend (9 Critical Variables):

These are **ABSOLUTELY REQUIRED** for the app to work:

1. **`DB_DIALECT`** = `postgres`
2. **`DB_HOST`** = `db.qppdkzzmijjyoihzfdxw.supabase.co`
3. **`DB_USER`** = `postgres`
4. **`DB_PASSWORD`** = `3oqj6vL2Tr5BZLaf`
5. **`DB_NAME`** = `postgres`
6. **`DB_SSL`** = `true`
7. **`DB_SSL_REJECT_UNAUTHORIZED`** = `false`
8. **`JWT_SECRET`** = `2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`
9. **`FRONTEND_URL`** = `https://your-frontend.vercel.app` *(set after frontend deploys)*

### Frontend (1 Critical Variable):

1. **`VITE_API_BASE_URL`** = `https://your-backend.vercel.app`

---

## ✅ Recommended Variables (Should Have)

These improve functionality but aren't critical:

### Backend:
- **`DB_PORT`** = `5432` (default, but good to set)
- **`JWT_EXPIRE`** = `7d` (default, but good to set)
- **`NODE_ENV`** = `production`
- **`PORT`** = `8000` (default, but good to set)
- **`VERCEL`** = `1` (helps with serverless detection)

---

## 📋 Complete List (All 14 Backend Variables)

Here are **ALL** environment variables you need for backend:

| Variable Name | Value | Required? |
|--------------|-------|-----------|
| `DB_DIALECT` | `postgres` | ✅ Yes |
| `DB_HOST` | `db.qppdkzzmijjyoihzfdxw.supabase.co` | ✅ Yes |
| `DB_PORT` | `5432` | ⚠️ Recommended |
| `DB_USER` | `postgres` | ✅ Yes |
| `DB_PASSWORD` | `3oqj6vL2Tr5BZLaf` | ✅ Yes |
| `DB_NAME` | `postgres` | ✅ Yes |
| `DB_SSL` | `true` | ✅ Yes |
| `DB_SSL_REJECT_UNAUTHORIZED` | `false` | ✅ Yes |
| `JWT_SECRET` | `2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be` | ✅ Yes |
| `JWT_EXPIRE` | `7d` | ⚠️ Recommended |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | ✅ Yes |
| `NODE_ENV` | `production` | ⚠️ Recommended |
| `PORT` | `8000` | ⚠️ Recommended |
| `VERCEL` | `1` | ⚠️ Recommended |

---

## 🚀 Simplest Deployment Process

### Step 1: Deploy Backend (5 minutes)

1. **Vercel** → **Add New Project** → Import GitHub repo
2. **Configure:**
   - Framework: `Other`
   - Root: `./`
   - Install: `cd backend && npm install`
3. **Set Environment Variables:**
   - Click **"Environment Variables"**
   - **Copy-paste ALL 14 variables** from the table above
   - Set `FRONTEND_URL` to a placeholder first (update later)
4. **Deploy** → Copy Backend URL

### Step 2: Deploy Frontend (3 minutes)

1. **Vercel** → **Add New Project** → Same repo
2. **Configure:**
   - Framework: `Vite`
   - Root: `./frontend`
   - Build: `npm run build`
   - Output: `dist`
3. **Set Environment Variable:**
   - `VITE_API_BASE_URL` = Your Backend URL
4. **Deploy** → Copy Frontend URL

### Step 3: Update Backend (2 minutes)

1. **Backend Project** → Settings → Environment Variables
2. **Update** `FRONTEND_URL` with Frontend URL
3. **Redeploy** Backend

---

## 📝 Copy-Paste Ready Format

### Backend Variables (Copy These):

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

### Frontend Variable (Copy This):

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

---

## 🎯 Why Environment Variables Are Required

1. **Database Connection**: Vercel needs Supabase credentials to connect
2. **Security**: JWT secret is required for authentication
3. **CORS**: Frontend URL is needed for CORS configuration
4. **API Communication**: Frontend needs backend URL to make API calls

**Without these, your app cannot:**
- ❌ Connect to database
- ❌ Authenticate users
- ❌ Make API calls
- ❌ Handle CORS properly

---

## ✅ Quick Setup Checklist

### Backend:
- [ ] All 14 variables set in Vercel
- [ ] `FRONTEND_URL` updated after frontend deploys
- [ ] Backend deployed successfully
- [ ] Health check passes: `/api/health`

### Frontend:
- [ ] `VITE_API_BASE_URL` set with backend URL
- [ ] Frontend deployed successfully
- [ ] Frontend loads correctly

---

## 🔍 Where to Get Values

### Already Provided (In env.template):
- ✅ All Supabase credentials
- ✅ JWT secret
- ✅ All configuration values

### You Need to Provide:
- ⚠️ `FRONTEND_URL` - After frontend deploys
- ⚠️ `VITE_API_BASE_URL` - After backend deploys

---

## 🆘 If You Skip Variables

### Missing Database Variables:
- ❌ App won't connect to database
- ❌ All API calls will fail
- ❌ Login won't work

### Missing JWT_SECRET:
- ❌ Authentication won't work
- ❌ Login will fail
- ❌ Protected routes won't work

### Missing FRONTEND_URL:
- ❌ CORS errors
- ❌ Frontend can't communicate with backend

### Missing VITE_API_BASE_URL:
- ❌ Frontend can't find backend
- ❌ All API calls fail
- ❌ App won't work

---

## 📊 Summary

**Total Variables Needed:**
- **Backend**: 14 variables (9 critical, 5 recommended)
- **Frontend**: 1 variable (critical)

**All values are provided** in `backend/env.template` - just copy-paste them into Vercel!

---

## 🚀 Next Steps

1. **Read** `SIMPLE_DEPLOY_NO_ENV_SETUP.md` for step-by-step guide
2. **Copy** all variables from this document
3. **Paste** into Vercel Environment Variables
4. **Deploy** both projects
5. **Test** login with `admin@billing.com` / `admin123`

---

**All environment variables are documented above. Just copy-paste them into Vercel! 🚀**

