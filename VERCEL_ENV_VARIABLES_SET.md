# ✅ Vercel Environment Variables - Ready to Set

## 🔐 Backend Environment Variables

Copy and paste these **EXACTLY** into Vercel Backend Project:

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

**Important:** Replace `your-frontend.vercel.app` with your actual frontend URL after deploying frontend.

---

## 🎨 Frontend Environment Variable

Copy and paste this into Vercel Frontend Project:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

**Important:** Replace `your-backend.vercel.app` with your actual backend URL after deploying backend.

---

## 📋 Step-by-Step Deployment

### Step 1: Deploy Backend

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Project Name**: `internet-billing-backend`
   - **Framework Preset**: **Other**
   - **Root Directory**: `./` (root)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `cd backend && npm install`
5. Click **"Environment Variables"**
6. Add ALL backend variables from above (one by one)
7. Click **"Deploy"**
8. Wait 2-3 minutes
9. **Copy your backend URL** (e.g., `https://internet-billing-backend.vercel.app`)

### Step 2: Deploy Frontend

1. Vercel Dashboard → **"Add New Project"**
2. Import same GitHub repository
3. Configure:
   - **Project Name**: `internet-billing-frontend`
   - **Framework Preset**: **Vite**
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **"Environment Variables"**
5. Add: `VITE_API_BASE_URL=https://your-backend.vercel.app`
   - **Replace with your actual backend URL from Step 1!**
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. **Copy your frontend URL** (e.g., `https://internet-billing-frontend.vercel.app`)

### Step 3: Update Backend FRONTEND_URL

1. Go to Backend project in Vercel
2. **Settings** → **Environment Variables**
3. Find `FRONTEND_URL`
4. Update to your frontend URL from Step 2
5. **Redeploy** backend

### Step 4: Test

1. Visit: `https://your-backend.vercel.app/api/health`
   - Should show: `{"status":"ok","database":"connected"}`
2. Visit: `https://your-frontend.vercel.app`
   - Should show login page
3. Login with:
   - **Email**: `admin@billing.com`
   - **Password**: `admin123`

---

## ✅ Verification Checklist

- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] All environment variables set
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] Login works with Super Admin credentials
- [ ] Dashboard loads correctly

---

## 🆘 If Something Doesn't Work

### Backend Issues:
1. Check Vercel function logs
2. Verify all environment variables are set
3. Check Supabase project is active (not paused)

### Frontend Issues:
1. Check `VITE_API_BASE_URL` is correct
2. Verify backend is running
3. Check browser console for errors

---

**All credentials are set and ready! Just follow the deployment steps above.**

