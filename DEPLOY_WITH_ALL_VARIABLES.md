# 🚀 Deploy Frontend & Backend - Complete Guide with ALL Variables

## 📋 This Guide Includes EVERYTHING

- ✅ All 14 backend environment variables
- ✅ All 1 frontend environment variable
- ✅ Exact values to copy-paste
- ✅ Step-by-step instructions
- ✅ Login credentials

---

## Part 1: Deploy Backend (5 minutes)

### Step 1: Create Backend Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select: `ahmadkhan32/Internet-Billing-System`
5. Click **"Import"**

### Step 2: Configure Backend

**Project Settings:**
- **Project Name**: `internet-billing-backend`
- **Framework Preset**: `Other` ⚠️ **IMPORTANT!**
- **Root Directory**: `./` (root, NOT `./backend`)
- **Build Command**: (leave **EMPTY**)
- **Output Directory**: (leave **EMPTY**)
- **Install Command**: `cd backend && npm install`

### Step 3: Set ALL 14 Environment Variables

Click **"Environment Variables"** → Click **"Add"** for each:

**Copy these EXACTLY (one by one):**

```
Key: DB_DIALECT
Value: postgres
Environment: Production
```

```
Key: DB_HOST
Value: db.qppdkzzmijjyoihzfdxw.supabase.co
Environment: Production
```

```
Key: DB_PORT
Value: 5432
Environment: Production
```

```
Key: DB_USER
Value: postgres
Environment: Production
```

```
Key: DB_PASSWORD
Value: 3oqj6vL2Tr5BZLaf
Environment: Production
```

```
Key: DB_NAME
Value: postgres
Environment: Production
```

```
Key: DB_SSL
Value: true
Environment: Production
```

```
Key: DB_SSL_REJECT_UNAUTHORIZED
Value: false
Environment: Production
```

```
Key: JWT_SECRET
Value: 2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
Environment: Production
```

```
Key: JWT_EXPIRE
Value: 7d
Environment: Production
```

```
Key: FRONTEND_URL
Value: https://your-frontend.vercel.app
Environment: Production
```
*(We'll update this after frontend deploys)*

```
Key: NODE_ENV
Value: production
Environment: Production
```

```
Key: PORT
Value: 8000
Environment: Production
```

```
Key: VERCEL
Value: 1
Environment: Production
```

### Step 4: Deploy Backend

1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. **Copy your Backend URL** (e.g., `https://internet-billing-backend.vercel.app`)
4. **Save this URL!** You'll need it for frontend

### Step 5: Test Backend

Visit: `https://your-backend.vercel.app/api/health`

**Expected:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## Part 2: Deploy Frontend (3 minutes)

### Step 1: Create Frontend Project

1. **Vercel Dashboard** → **"Add New Project"**
2. Click **"Import Git Repository"**
3. Select: `ahmadkhan32/Internet-Billing-System` (same repo)
4. Click **"Import"**

### Step 2: Configure Frontend

**Project Settings:**
- **Project Name**: `internet-billing-frontend`
- **Framework Preset**: `Vite` (auto-detected)
- **Root Directory**: `./frontend` ⚠️ **IMPORTANT!**
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### Step 3: Set Environment Variable

Click **"Environment Variables"** → Click **"Add"**:

```
Key: VITE_API_BASE_URL
Value: https://your-backend.vercel.app
Environment: Production
```

**⚠️ IMPORTANT:** Replace `your-backend.vercel.app` with your **actual Backend URL** from Part 1, Step 4!

For example, if your backend URL is `https://internet-billing-backend.vercel.app`, then:
```
Key: VITE_API_BASE_URL
Value: https://internet-billing-backend.vercel.app
```

### Step 4: Deploy Frontend

1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. **Copy your Frontend URL** (e.g., `https://internet-billing-frontend.vercel.app`)
4. **Save this URL!**

### Step 5: Test Frontend

Visit: `https://your-frontend.vercel.app`

**Expected:** Login page appears

---

## Part 3: Update Backend (2 minutes)

### Step 1: Update FRONTEND_URL

1. Go to **Backend Project** in Vercel
2. **Settings** → **Environment Variables**
3. Find `FRONTEND_URL`
4. Click **"Edit"**
5. Update value to your **Frontend URL** from Part 2, Step 4
6. Click **"Save"**

### Step 2: Redeploy Backend

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for completion

---

## Part 4: Test Everything

### Test 1: Backend Health

Visit: `https://your-backend.vercel.app/api/health`

**Expected:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2024-..."
}
```

### Test 2: Frontend Loads

Visit: `https://your-frontend.vercel.app`

**Expected:** Login page appears

### Test 3: Login Works

**Super Admin Credentials:**
- **Email**: `admin@billing.com`
- **Password**: `admin123`

**Expected:**
- ✅ Login successful
- ✅ Redirected to Dashboard
- ✅ All features working

---

## ✅ Complete Checklist

### Backend:
- [ ] Project created
- [ ] Framework set to `Other`
- [ ] Root Directory: `./`
- [ ] Install Command: `cd backend && npm install`
- [ ] All 14 environment variables set
- [ ] Deployed successfully
- [ ] Backend URL copied
- [ ] Health check passes

### Frontend:
- [ ] Project created
- [ ] Framework set to `Vite`
- [ ] Root Directory: `./frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] `VITE_API_BASE_URL` set with backend URL
- [ ] Deployed successfully
- [ ] Frontend URL copied
- [ ] Frontend loads correctly

### Final:
- [ ] Backend `FRONTEND_URL` updated
- [ ] Backend redeployed
- [ ] Login works
- [ ] Dashboard accessible

---

## 🎯 Login Credentials

### Super Admin (Default):
- **Email**: `admin@billing.com`
- **Password**: `admin123`

### Business Admin:
- Use credentials from your database

### Customer:
- Use customer credentials from your database

---

## 📊 All Environment Variables Summary

### Backend (14 variables):
1. `DB_DIALECT=postgres`
2. `DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co`
3. `DB_PORT=5432`
4. `DB_USER=postgres`
5. `DB_PASSWORD=3oqj6vL2Tr5BZLaf`
6. `DB_NAME=postgres`
7. `DB_SSL=true`
8. `DB_SSL_REJECT_UNAUTHORIZED=false`
9. `JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`
10. `JWT_EXPIRE=7d`
11. `FRONTEND_URL=https://your-frontend.vercel.app`
12. `NODE_ENV=production`
13. `PORT=8000`
14. `VERCEL=1`

### Frontend (1 variable):
1. `VITE_API_BASE_URL=https://your-backend.vercel.app`

**Total: 15 environment variables**

---

## 🚀 Auto-Deployment

**After first deployment:**
- ✅ Every `git push` to GitHub
- ✅ Vercel automatically deploys both projects
- ✅ No manual steps needed!

---

## 🆘 Troubleshooting

### Backend Issues:
- Check all 14 variables are set
- Verify Supabase project is active
- Check deployment logs

### Frontend Issues:
- Check `VITE_API_BASE_URL` is correct
- Verify backend is deployed
- Check browser console

### Login Issues:
- Verify database has users
- Check Supabase Table Editor
- Try resetting password

---

## ✅ You're Done!

Your Internet Billing System is now:
- ✅ **Live on Vercel** (frontend + backend)
- ✅ **Connected to Supabase** (cloud database)
- ✅ **Auto-deploying** on every push
- ✅ **Login working** with correct credentials
- ✅ **Ready for production!**

**Just follow the steps above - all variables are provided! 🎉**

