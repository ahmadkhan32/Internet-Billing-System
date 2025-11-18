# ✅ Vercel Environment Variables - Correct Format

## ⚠️ Important Rules

**Environment Variable Names:**
- ✅ Only letters, digits, and underscores
- ✅ Cannot start with a digit
- ✅ No hyphens, spaces, or special characters
- ✅ Case-sensitive (use UPPERCASE)

**All variable names below are VALID and ready to use!**

---

## 🔐 Backend Environment Variables (13 Required)

**Copy these EXACTLY - Variable Name on LEFT, Value on RIGHT:**

| Variable Name | Value |
|--------------|-------|
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

---

## 🎨 Frontend Environment Variable (1 Required)

| Variable Name | Value |
|--------------|-------|
| `VITE_API_BASE_URL` | `https://your-backend.vercel.app` |

---

## 📝 How to Set in Vercel (Step-by-Step)

### For Backend Project:

1. **Vercel Dashboard** → Your Backend Project
2. **Settings** → **Environment Variables**
3. Click **"Add New"** button
4. For EACH variable:
   - **Key** (Variable Name): Type exactly as shown (e.g., `DB_DIALECT`)
   - **Value**: Type the value (e.g., `postgres`)
   - **Environment**: Select **Production** (and Preview/Development if needed)
   - Click **"Save"**
5. Repeat for all 14 variables

### For Frontend Project:

1. **Vercel Dashboard** → Your Frontend Project
2. **Settings** → **Environment Variables**
3. Click **"Add New"**
4. **Key**: `VITE_API_BASE_URL`
5. **Value**: `https://your-backend.vercel.app` (replace with your actual backend URL)
6. **Environment**: Select **Production**
7. Click **"Save"**

---

## ✅ Valid Variable Names (All Correct)

All these names are **VALID** and follow Vercel rules:

✅ `DB_DIALECT`  
✅ `DB_HOST`  
✅ `DB_PORT`  
✅ `DB_USER`  
✅ `DB_PASSWORD`  
✅ `DB_NAME`  
✅ `DB_SSL`  
✅ `DB_SSL_REJECT_UNAUTHORIZED`  
✅ `JWT_SECRET`  
✅ `JWT_EXPIRE`  
✅ `FRONTEND_URL`  
✅ `NODE_ENV`  
✅ `PORT`  
✅ `VERCEL`  
✅ `VITE_API_BASE_URL`  

---

## ❌ Common Mistakes to Avoid

### ❌ WRONG:
- `DB-HOST` (hyphen not allowed)
- `DB HOST` (space not allowed)
- `db_host` (should be uppercase - convention)
- `2DB_HOST` (starts with digit)
- `DB.HOST` (dot not allowed)

### ✅ CORRECT:
- `DB_HOST` (underscore, uppercase)

---

## 🔍 Which Variables Are Most Important?

### Critical (Required for Database Connection):
1. `DB_DIALECT=postgres`
2. `DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co`
3. `DB_USER=postgres`
4. `DB_PASSWORD=3oqj6vL2Tr5BZLaf`
5. `DB_NAME=postgres`
6. `DB_SSL=true`
7. `DB_SSL_REJECT_UNAUTHORIZED=false`

### Critical (Required for Authentication):
8. `JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`
9. `JWT_EXPIRE=7d`

### Important (Required for CORS):
10. `FRONTEND_URL=https://your-frontend.vercel.app`

### Standard (Recommended):
11. `NODE_ENV=production`
12. `PORT=8000`
13. `VERCEL=1`

### Frontend (Required):
14. `VITE_API_BASE_URL=https://your-backend.vercel.app`

---

## 🚀 Quick Copy-Paste (One by One)

### Backend - Add These One by One:

```
DB_DIALECT
postgres
```

```
DB_HOST
db.qppdkzzmijjyoihzfdxw.supabase.co
```

```
DB_PORT
5432
```

```
DB_USER
postgres
```

```
DB_PASSWORD
3oqj6vL2Tr5BZLaf
```

```
DB_NAME
postgres
```

```
DB_SSL
true
```

```
DB_SSL_REJECT_UNAUTHORIZED
false
```

```
JWT_SECRET
2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
```

```
JWT_EXPIRE
7d
```

```
FRONTEND_URL
https://your-frontend.vercel.app
```

```
NODE_ENV
production
```

```
PORT
8000
```

```
VERCEL
1
```

### Frontend - Add This:

```
VITE_API_BASE_URL
https://your-backend.vercel.app
```

---

## 🆘 If You Still Get Errors

1. **Check Variable Name:**
   - No spaces
   - No hyphens
   - Only underscores
   - Uppercase letters

2. **Check Value:**
   - No quotes needed (Vercel adds them automatically)
   - Copy exact value

3. **Try One at a Time:**
   - Add one variable
   - Save
   - Check if it appears in the list
   - Then add the next one

4. **Check for Typos:**
   - Variable names are case-sensitive
   - `DB_HOST` not `db_host` or `Db_Host`

---

## ✅ Verification

After adding all variables:

1. **Backend Project** → **Settings** → **Environment Variables**
2. You should see all 14 variables listed
3. **Frontend Project** → **Settings** → **Environment Variables**
4. You should see `VITE_API_BASE_URL` listed

---

**All variable names are valid! Follow the format above exactly. 🚀**

