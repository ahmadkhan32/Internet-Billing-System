# 📍 Where to Set Environment Variables in Vercel

## 🎯 Quick Answer

**Environment Variables are set in:**
- **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

---

## 🔐 Backend Environment Variables (14 Variables)

### Where to Set:
1. Go to **Vercel Dashboard**
2. Select your **Backend Project** (e.g., `internet-billing-backend`)
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar
5. Click **"Add New"** button
6. Add each variable one by one

### All Backend Variables to Set:

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

### Step-by-Step for Backend:

1. **Vercel Dashboard** → Your Backend Project
2. **Settings** → **Environment Variables**
3. Click **"Add New"**
4. For each variable:
   - **Key**: Type variable name (e.g., `DB_DIALECT`)
   - **Value**: Type value (e.g., `postgres`)
   - **Environment**: Select **Production** (and Preview/Development if needed)
   - Click **"Save"**
5. Repeat for all 14 variables

---

## 🎨 Frontend Environment Variables (1 Variable)

### Where to Set:
1. Go to **Vercel Dashboard**
2. Select your **Frontend Project** (e.g., `internet-billing-frontend`)
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar
5. Click **"Add New"** button
6. Add the variable

### Frontend Variable to Set:

| Variable Name | Value | Required? |
|--------------|-------|-----------|
| `VITE_API_BASE_URL` | `https://your-backend.vercel.app` | ✅ Yes |

**Important:** Replace `your-backend.vercel.app` with your actual Backend URL!

### Step-by-Step for Frontend:

1. **Vercel Dashboard** → Your Frontend Project
2. **Settings** → **Environment Variables**
3. Click **"Add New"**
4. **Key**: `VITE_API_BASE_URL`
5. **Value**: `https://your-backend.vercel.app` (use your actual backend URL)
6. **Environment**: Select **Production**
7. Click **"Save"**

---

## 📋 Complete Copy-Paste List

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

## 🖼️ Visual Guide

### Backend Project:
```
Vercel Dashboard
  └── Your Backend Project
      └── Settings
          └── Environment Variables  ← Click here
              └── Add New  ← Click to add each variable
```

### Frontend Project:
```
Vercel Dashboard
  └── Your Frontend Project
      └── Settings
          └── Environment Variables  ← Click here
              └── Add New  ← Click to add variable
```

---

## 📝 Detailed Steps

### For Backend:

1. **Navigate to Project:**
   - Vercel Dashboard → Click on your backend project name

2. **Open Settings:**
   - Click **"Settings"** tab (top navigation)

3. **Find Environment Variables:**
   - In left sidebar, click **"Environment Variables"**

4. **Add Variables:**
   - Click **"Add New"** button
   - Enter **Key** and **Value**
   - Select **Environment** (Production, Preview, Development)
   - Click **"Save"**
   - Repeat for all 14 variables

5. **Verify:**
   - All 14 variables should be listed
   - Each shows the value (password is hidden)

### For Frontend:

1. **Navigate to Project:**
   - Vercel Dashboard → Click on your frontend project name

2. **Open Settings:**
   - Click **"Settings"** tab

3. **Find Environment Variables:**
   - In left sidebar, click **"Environment Variables"**

4. **Add Variable:**
   - Click **"Add New"**
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your backend URL
   - **Environment**: Production
   - Click **"Save"**

5. **Verify:**
   - `VITE_API_BASE_URL` should be listed

---

## 🔍 Where to Find Values

### From `backend/env.template`:
All backend values are in: `backend/env.template`

### From This Guide:
All values are listed above - just copy-paste!

### From Supabase:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD` - From Supabase Dashboard → Settings → Database

### From Your Deployment:
- `FRONTEND_URL` - Your frontend Vercel URL
- `VITE_API_BASE_URL` - Your backend Vercel URL

---

## ✅ Verification Checklist

### Backend:
- [ ] Go to Backend Project → Settings → Environment Variables
- [ ] All 14 variables are listed
- [ ] Each variable has correct value
- [ ] Environment is set to Production

### Frontend:
- [ ] Go to Frontend Project → Settings → Environment Variables
- [ ] `VITE_API_BASE_URL` is listed
- [ ] Value is your backend URL
- [ ] Environment is set to Production

---

## 🆘 Common Issues

### "Can't find Environment Variables option"
- ✅ Make sure you're in **Settings** tab
- ✅ Look in **left sidebar** (not top menu)
- ✅ You must be project owner/admin

### "Variable not working after setting"
- ✅ **Redeploy** after adding variables
- ✅ Check variable name is correct (case-sensitive)
- ✅ Check value has no extra spaces

### "Where is the Add button?"
- ✅ It's at the top of Environment Variables page
- ✅ Blue button labeled **"Add New"**

---

## 📊 Quick Reference

### Backend Project:
- **Location**: Settings → Environment Variables
- **Count**: 14 variables
- **File Reference**: `backend/env.template`

### Frontend Project:
- **Location**: Settings → Environment Variables
- **Count**: 1 variable
- **Variable**: `VITE_API_BASE_URL`

---

## 🚀 After Setting Variables

1. **Redeploy** both projects
2. **Test** backend: `https://your-backend.vercel.app/api/health`
3. **Test** frontend: `https://your-frontend.vercel.app`
4. **Test** login: `admin@billing.com` / `admin123`

---

**Environment Variables are in: Vercel Dashboard → Your Project → Settings → Environment Variables 📍**

