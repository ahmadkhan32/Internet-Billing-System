# 🚀 Simple Deployment - Frontend & Backend to Vercel

## ⚠️ Important Note

**Environment variables ARE required** for Vercel to connect to your Supabase database. However, this guide makes it **super simple** - just copy and paste!

---

## 📋 Quick Deployment (10 Minutes)

### Part 1: Deploy Backend (5 min)

#### Step 1: Create Backend Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select: `ahmadkhan32/Internet-Billing-System`
5. Click **"Import"**

#### Step 2: Configure Backend

**Project Settings:**
- **Project Name**: `internet-billing-backend`
- **Framework Preset**: `Other`
- **Root Directory**: `./` (root)
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `cd backend && npm install`

#### Step 3: Set Environment Variables (Copy-Paste)

Click **"Environment Variables"** → Click **"Add"** for each:

**Just copy these EXACTLY:**

```
Key: DB_DIALECT
Value: postgres
```

```
Key: DB_HOST
Value: db.qppdkzzmijjyoihzfdxw.supabase.co
```

```
Key: DB_PORT
Value: 5432
```

```
Key: DB_USER
Value: postgres
```

```
Key: DB_PASSWORD
Value: 3oqj6vL2Tr5BZLaf
```

```
Key: DB_NAME
Value: postgres
```

```
Key: DB_SSL
Value: true
```

```
Key: DB_SSL_REJECT_UNAUTHORIZED
Value: false
```

```
Key: JWT_SECRET
Value: 2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
```

```
Key: JWT_EXPIRE
Value: 7d
```

```
Key: FRONTEND_URL
Value: https://your-frontend.vercel.app
```
*(Update this after frontend deploys)*

```
Key: NODE_ENV
Value: production
```

```
Key: PORT
Value: 8000
```

```
Key: VERCEL
Value: 1
```

#### Step 4: Deploy Backend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy Backend URL** (e.g., `https://internet-billing-backend.vercel.app`)

---

### Part 2: Deploy Frontend (3 min)

#### Step 1: Create Frontend Project

1. Vercel Dashboard → **"Add New Project"**
2. **Import** same repository: `ahmadkhan32/Internet-Billing-System`
3. Click **"Import"**

#### Step 2: Configure Frontend

**Project Settings:**
- **Project Name**: `internet-billing-frontend`
- **Framework Preset**: `Vite` (auto-detected)
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

#### Step 3: Set Environment Variable

Click **"Environment Variables"** → Click **"Add"**:

```
Key: VITE_API_BASE_URL
Value: https://your-backend.vercel.app
```

**Replace `your-backend.vercel.app` with your actual Backend URL from Part 1!**

#### Step 4: Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy Frontend URL** (e.g., `https://internet-billing-frontend.vercel.app`)

---

### Part 3: Update Backend (2 min)

#### Step 1: Update FRONTEND_URL

1. Go to **Backend Project** in Vercel
2. **Settings** → **Environment Variables**
3. Find `FRONTEND_URL`
4. Click **"Edit"**
5. Update value to your **Frontend URL**
6. Click **"Save"**

#### Step 2: Redeploy Backend

1. **Deployments** tab
2. Click **"..."** → **"Redeploy"**
3. Wait for completion

---

## ✅ Test Your Deployment

### 1. Test Backend

Visit: `https://your-backend.vercel.app/api/health`

**Expected:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

### 2. Test Frontend

Visit: `https://your-frontend.vercel.app`

**Expected:** Login page appears

### 3. Test Login

**Super Admin Credentials:**
- **Email**: `admin@billing.com`
- **Password**: `admin123`

**Expected:** Login successful → Redirected to Dashboard

---

## 🎯 Login Credentials

### Super Admin (Default):
- **Email**: `admin@billing.com`
- **Password**: `admin123`

### Business Admin:
- Use credentials you created in your system

### Customer:
- Use customer credentials from your database

---

## 📊 What Happens After Deployment

✅ **Backend**: Running on Vercel serverless functions  
✅ **Frontend**: Running on Vercel CDN  
✅ **Database**: Connected to Supabase (cloud)  
✅ **Auto-Deploy**: Enabled (every push to GitHub)  
✅ **Login**: Works with existing credentials  

---

## 🔄 Auto-Deployment

**After first deployment:**
- Every `git push` to GitHub
- Vercel automatically deploys both projects
- No manual steps needed!

---

## 🆘 Troubleshooting

### Backend Not Working:
1. Check environment variables are all set
2. Verify Supabase project is active
3. Check deployment logs in Vercel

### Frontend Not Working:
1. Check `VITE_API_BASE_URL` is correct
2. Verify backend is deployed
3. Check browser console for errors

### Login Not Working:
1. Verify database has users
2. Check Supabase Table Editor → `users` table
3. Try resetting password if needed

---

## ✅ Checklist

- [ ] Backend project created
- [ ] All 14 backend env vars set
- [ ] Backend deployed successfully
- [ ] Backend URL copied
- [ ] Frontend project created
- [ ] Frontend env var set (with backend URL)
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied
- [ ] Backend FRONTEND_URL updated
- [ ] Backend redeployed
- [ ] Health check passes
- [ ] Frontend loads
- [ ] Login works

---

## 🚀 You're Done!

Your Internet Billing System is now:
- ✅ Live on Vercel
- ✅ Connected to Supabase
- ✅ Auto-deploying on every push
- ✅ Ready for production use!

**Just follow the steps above - it's that simple! 🎉**

