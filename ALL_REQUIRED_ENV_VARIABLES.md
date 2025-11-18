# 📋 ALL Required Environment Variables for Vercel Deployment

## ⚠️ Important: Environment Variables ARE Required

**You CANNOT deploy without environment variables** - Vercel needs them to:
- Connect to Supabase database
- Authenticate users (JWT)
- Configure CORS
- Run the application

However, this guide makes it **super easy** - just copy and paste!

---

## 🔐 Backend Environment Variables (14 Required)

### Critical - Must Have (9 variables):

| Variable Name | Value | Why Required |
|--------------|-------|--------------|
| `DB_DIALECT` | `postgres` | Tells app to use PostgreSQL |
| `DB_HOST` | `db.qppdkzzmijjyoihzfdxw.supabase.co` | Database server address |
| `DB_PORT` | `5432` | Database port |
| `DB_USER` | `postgres` | Database username |
| `DB_PASSWORD` | `3oqj6vL2Tr5BZLaf` | Database password |
| `DB_NAME` | `postgres` | Database name |
| `DB_SSL` | `true` | Required for Supabase |
| `DB_SSL_REJECT_UNAUTHORIZED` | `false` | Required for Supabase SSL |
| `JWT_SECRET` | `2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be` | For user authentication |

### Important - Should Have (5 variables):

| Variable Name | Value | Why Important |
|--------------|-------|---------------|
| `JWT_EXPIRE` | `7d` | Token expiration time |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | For CORS (update after frontend deploys) |
| `NODE_ENV` | `production` | Production mode |
| `PORT` | `8000` | Server port |
| `VERCEL` | `1` | Enables Vercel mode |

---

## 🎨 Frontend Environment Variable (1 Required)

| Variable Name | Value | Why Required |
|--------------|-------|--------------|
| `VITE_API_BASE_URL` | `https://your-backend.vercel.app` | Frontend needs backend URL for API calls |

---

## 📋 Complete Copy-Paste List

### Backend Project - Copy These:

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

### Frontend Project - Copy This:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

---

## 🚀 Quick Deployment Steps

### Step 1: Deploy Backend

1. **Vercel** → **Add New Project** → Import `ahmadkhan32/Internet-Billing-System`
2. **Settings:**
   - Framework: `Other`
   - Root: `./`
   - Install: `cd backend && npm install`
3. **Environment Variables** → Add all 14 variables above
4. **Deploy** → Copy Backend URL

### Step 2: Deploy Frontend

1. **Vercel** → **Add New Project** → Same repo
2. **Settings:**
   - Framework: `Vite`
   - Root: `./frontend`
   - Build: `npm run build`
   - Output: `dist`
3. **Environment Variables** → Add `VITE_API_BASE_URL` with Backend URL
4. **Deploy** → Copy Frontend URL

### Step 3: Update Backend

1. **Backend Project** → **Settings** → **Environment Variables**
2. Update `FRONTEND_URL` with Frontend URL
3. **Redeploy** Backend

---

## ✅ What Happens Without Variables?

### Missing Database Variables:
- ❌ Cannot connect to Supabase
- ❌ All API calls fail
- ❌ Login doesn't work
- ❌ Error: "Database connection failed"

### Missing JWT_SECRET:
- ❌ Cannot create login tokens
- ❌ Login fails
- ❌ Error: "JWT_SECRET is required"

### Missing FRONTEND_URL:
- ❌ CORS errors
- ❌ Frontend can't call backend
- ❌ Error: "CORS policy blocked"

### Missing VITE_API_BASE_URL:
- ❌ Frontend doesn't know backend URL
- ❌ All API calls fail
- ❌ Error: "Network Error"

---

## 🔍 How to Verify Variables Are Set

### In Vercel:

1. **Project** → **Settings** → **Environment Variables**
2. **Check list** - all variables should be there
3. **Verify values** - no typos

### Test After Deployment:

1. **Backend Health**: `https://your-backend.vercel.app/api/health`
   - Should return: `{"status":"ok","database":"connected"}`
   
2. **Frontend**: `https://your-frontend.vercel.app`
   - Should show login page
   
3. **Login**: `admin@billing.com` / `admin123`
   - Should work successfully

---

## 📊 Variable Priority

### Must Set First (Critical):
1. `DB_DIALECT`
2. `DB_HOST`
3. `DB_USER`
4. `DB_PASSWORD`
5. `DB_NAME`
6. `DB_SSL`
7. `JWT_SECRET`

### Set Second (Important):
8. `DB_PORT`
9. `DB_SSL_REJECT_UNAUTHORIZED`
10. `JWT_EXPIRE`
11. `NODE_ENV`
12. `PORT`
13. `VERCEL`

### Set Last (After Frontend Deploys):
14. `FRONTEND_URL` (Backend)
15. `VITE_API_BASE_URL` (Frontend)

---

## 🆘 Troubleshooting

### "Database connection failed":
- ✅ Check all DB_* variables are set
- ✅ Verify Supabase project is active
- ✅ Check DB_PASSWORD is correct

### "JWT_SECRET is required":
- ✅ Set JWT_SECRET variable
- ✅ Verify it's 32+ characters

### "CORS error":
- ✅ Set FRONTEND_URL in backend
- ✅ Verify it matches frontend URL exactly

### "Network Error" in frontend:
- ✅ Set VITE_API_BASE_URL
- ✅ Verify it's your backend URL
- ✅ Check backend is deployed

---

## ✅ Summary

**Total Variables Needed:**
- **Backend**: 14 variables
- **Frontend**: 1 variable
- **Total**: 15 variables

**All values are provided above - just copy and paste!**

**Time to Set:**
- Backend: ~5 minutes (copy-paste 14 variables)
- Frontend: ~1 minute (copy-paste 1 variable)
- **Total: ~6 minutes**

---

## 🎯 Quick Reference

**Backend Variables (14):**
```
DB_DIALECT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME,
DB_SSL, DB_SSL_REJECT_UNAUTHORIZED, JWT_SECRET, JWT_EXPIRE,
FRONTEND_URL, NODE_ENV, PORT, VERCEL
```

**Frontend Variables (1):**
```
VITE_API_BASE_URL
```

---

**All variables are listed above with exact values - just copy and paste into Vercel! 🚀**

