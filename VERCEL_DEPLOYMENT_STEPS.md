# Vercel Deployment Guide - Step by Step

## ✅ Step 1: Push to GitHub (Already Done!)

Your code has been pushed to: `https://github.com/ahmadkhan32/Internet-Billing-System`

## 🚀 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub (if not already signed in)

2. **Import Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Find and select: `ahmadkhan32/Internet-Billing-System`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (or leave as auto-detected)
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm install --include=dev --prefix backend && npm install --include=dev --prefix frontend && npm run build --prefix frontend`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install --include=dev --prefix backend && npm install --include=dev --prefix frontend`

4. **Environment Variables**
   Click "Environment Variables" and add:

   **Required Variables:**
   ```
   NODE_ENV=production
   PORT=8000
   DB_HOST=your-database-host
   DB_PORT=3306 (or 5432 for PostgreSQL)
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   DB_DIALECT=mysql (or postgres for Supabase)
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

   **Optional Variables:**
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   STRIPE_SECRET_KEY=sk_test_...
   DB_SSL=true (for Supabase/cloud databases)
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - Your app will be live at: `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add DB_HOST
   vercel env add DB_USER
   vercel env add DB_PASSWORD
   vercel env add DB_NAME
   vercel env add JWT_SECRET
   # ... add all other variables
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 📋 Step 3: Verify Deployment

1. **Check Build Logs**
   - Go to your project in Vercel Dashboard
   - Click on the latest deployment
   - Check "Build Logs" for any errors

2. **Test Your App**
   - Visit your Vercel URL: `https://your-project.vercel.app`
   - Test the health endpoint: `https://your-project.vercel.app/api/health`
   - Try logging in with:
     - Email: `admin@billing.com`
     - Password: `admin123`

## 🔧 Step 4: Configure API Routes

Your `vercel.json` is already configured, but verify:

- **API Routes**: `/api/*` → `/api/index.js`
- **Frontend Routes**: `/*` → `/index.html`
- **Build Output**: `frontend/dist`

## ⚠️ Common Issues & Solutions

### Issue: Build Fails - "Cannot find module"
**Solution**: Make sure all dependencies are in `package.json` and install commands are correct.

### Issue: Database Connection Error
**Solution**: 
- Verify all database environment variables are set
- Check database allows connections from Vercel IPs (0.0.0.0/0)
- For Supabase, ensure `DB_SSL=true`

### Issue: API Routes Not Working
**Solution**: 
- Check `vercel.json` configuration
- Verify `api/index.js` exists and exports the handler
- Check function timeout settings (max 30s on free tier)

### Issue: Frontend Not Loading
**Solution**:
- Verify `outputDirectory` is `frontend/dist`
- Check build command completed successfully
- Ensure `index.html` exists in `frontend/dist`

## 🔄 Step 5: Continuous Deployment

Vercel automatically deploys when you push to GitHub:
- **Main branch** → Production deployment
- **Other branches** → Preview deployments

To trigger a new deployment:
```bash
git push origin main
```

## 📝 Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `NODE_ENV=production`
- [ ] `DB_HOST` (your database host)
- [ ] `DB_USER` (database username)
- [ ] `DB_PASSWORD` (database password)
- [ ] `DB_NAME` (database name)
- [ ] `DB_PORT` (3306 for MySQL, 5432 for PostgreSQL)
- [ ] `DB_DIALECT` (mysql or postgres)
- [ ] `JWT_SECRET` (random secret string, min 32 chars)
- [ ] `JWT_EXPIRE=7d`
- [ ] `FRONTEND_URL` (your Vercel app URL)
- [ ] `DB_SSL=true` (if using Supabase/cloud database)

## 🎉 Success!

Once deployed, your app will be available at:
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions)

---

**Need Help?** Check the build logs in Vercel Dashboard for detailed error messages.
