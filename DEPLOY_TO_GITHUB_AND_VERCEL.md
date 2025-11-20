# 🚀 Deploy to GitHub & Vercel - Complete Guide

## 📋 Step 1: Push to GitHub

### 1.1 Check Current Status
```bash
git status
```

### 1.2 Add All Changes
```bash
git add .
```

### 1.3 Commit Changes
```bash
git commit -m "Remove MySQL, configure Supabase only, add diagnostic scripts"
```

### 1.4 Push to GitHub
```bash
git push origin main
```

---

## 📋 Step 2: Deploy to Vercel

### 2.1 Connect Repository to Vercel

1. **Go to**: https://vercel.com
2. **Sign in** (or create account)
3. **Click "Add New Project"**
4. **Import Git Repository**:
   - Select: `ahmadkhan32/Internet-Billing-System`
   - Click "Import"

### 2.2 Configure Project Settings

**Framework Preset**: Vite (or Other)
**Root Directory**: `./` (root)
**Build Command**: `cd backend && npm install && cd ../frontend && npm install && npm run build`
**Output Directory**: `frontend/dist`
**Install Command**: `cd backend && npm install && cd ../frontend && npm install`

### 2.3 Set Environment Variables

**CRITICAL**: Add these environment variables in Vercel:

#### Database Configuration (Supabase)
```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

#### JWT Configuration
```
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
```

#### Application Configuration
```
NODE_ENV=production
VERCEL=1
FRONTEND_URL=https://your-app.vercel.app
```

#### Optional (if using email/SMS)
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SMS_API_KEY=your-sms-api-key
```

### 2.4 Deploy

1. **Click "Deploy"**
2. **Wait for build to complete** (3-5 minutes)
3. **Check deployment logs** for any errors

---

## 📋 Step 3: Verify Deployment

### 3.1 Check Health Endpoint
```
https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-01-XX..."
}
```

### 3.2 Check Diagnostic Endpoint
```
https://your-app.vercel.app/api/diagnose
```

This will show:
- Environment variables status
- Database connection status
- Recommendations

### 3.3 Test Frontend
```
https://your-app.vercel.app
```

Login with:
- Email: `admin@billing.com`
- Password: `admin123`

---

## 🔧 Troubleshooting

### Build Fails

**Issue**: Build command fails
**Fix**: 
1. Check build logs in Vercel
2. Ensure `backend/node_modules` and `frontend/node_modules` are installed
3. Verify build command is correct

### Database Connection Fails

**Issue**: 503 error, database disconnected
**Fix**:
1. Check environment variables are set in Vercel
2. Verify Supabase project is active (not paused)
3. Check `DB_HOST` is correct
4. Ensure `DB_SSL=true`

### Frontend Not Loading

**Issue**: Blank page or 404
**Fix**:
1. Check `outputDirectory` is `frontend/dist`
2. Verify frontend build completed successfully
3. Check Vercel rewrites in `vercel.json`

---

## 📝 Important Notes

1. **Never commit `.env` file** - it's in `.gitignore`
2. **Set all environment variables in Vercel** - they're not in the repo
3. **Supabase must be active** - restore if paused
4. **Redeploy after changing environment variables** - changes require redeploy

---

## 🎯 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Repository connected to Vercel
- [ ] Environment variables set in Vercel
- [ ] Build command configured
- [ ] Output directory set to `frontend/dist`
- [ ] Deployed successfully
- [ ] Health endpoint working
- [ ] Frontend accessible
- [ ] Login working

---

## 🚀 After Deployment

1. **Update FRONTEND_URL** in Vercel environment variables with your actual Vercel URL
2. **Redeploy** after updating FRONTEND_URL
3. **Test all features**:
   - Login
   - Dashboard
   - CRUD operations
   - File uploads

---

**Your project is ready for deployment!** 🎉

