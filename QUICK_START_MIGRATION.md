# 🚀 Quick Start: XAMPP → Supabase → Vercel

## ⚡ 5-Minute Overview

1. **Setup Supabase** (5 min)
2. **Migrate Data** (10 min)
3. **Deploy Backend** (5 min)
4. **Deploy Frontend** (5 min)
5. **Test** (2 min)

**Total Time: ~30 minutes**

---

## 📋 Step 1: Setup Supabase (5 min)

### 1.1 Create Project
- Go to [supabase.com](https://supabase.com)
- Click **"New Project"**
- Name: `internet-billing-system`
- Set password (save it!)
- Click **"Create"**

### 1.2 Get Credentials
- Settings → Database
- Copy connection string
- Extract: Host, Port, User, Password

### 1.3 Run Schema
- SQL Editor → New Query
- Copy `supabase/migrations/001_initial_schema.sql`
- Paste → Run

---

## 📋 Step 2: Migrate Data (10 min)

### 2.1 Update .env
Add to `backend/.env`:

```env
# MySQL (XAMPP - Source)
MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3306
MYSQL_DB_USER=root
MYSQL_DB_PASSWORD=
MYSQL_DB_NAME=internet_billing_db

# Supabase (Destination)
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

### 2.2 Run Migration
```bash
cd backend
npm install pg pg-hstore
npm run migrate-xampp
```

### 2.3 Verify
- Supabase → Table Editor
- Check `users`, `isps`, `customers` have data

---

## 📋 Step 3: Deploy Backend (5 min)

### 3.1 Create Project
- Vercel → Add New Project
- Import GitHub repo
- Framework: **Other**
- Root: `./`
- Install: `cd backend && npm install`

### 3.2 Set Variables
Add these in Vercel:

```
DB_DIALECT=postgres
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=[generate below]
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=8000
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.3 Deploy
- Click **"Deploy"**
- Wait 2-3 min
- Copy backend URL

### 3.4 Test
Visit: `https://your-backend.vercel.app/api/health`

---

## 📋 Step 4: Deploy Frontend (5 min)

### 4.1 Create Project
- Vercel → Add New Project
- Import same repo
- Framework: **Vite**
- Root: `./frontend`
- Build: `npm run build`
- Output: `dist`

### 4.2 Set Variables
```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

### 4.3 Deploy
- Click **"Deploy"**
- Wait 2-3 min
- Copy frontend URL

### 4.4 Update Backend
- Backend project → Settings → Environment Variables
- Update `FRONTEND_URL` with frontend URL
- Redeploy backend

---

## 📋 Step 5: Test (2 min)

1. Visit frontend URL
2. Login with existing credentials:
   - Super Admin: `admin@billing.com` / `admin123`
   - Business Admin: Your credentials
3. Verify all features work

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Schema migrated
- [ ] Data migrated
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Environment variables set
- [ ] Health check passes
- [ ] Login works

---

## 📚 Detailed Guides

- **Full Guide**: `COMPLETE_MIGRATION_AND_DEPLOYMENT_GUIDE.md`
- **Vercel Steps**: `STEP_BY_STEP_VERCEL_DEPLOYMENT.md`
- **Supabase Creds**: `SUPABASE_CREDENTIALS_GUIDE.md`
- **Troubleshooting**: `DATABASE_CONNECTION_TROUBLESHOOTING.md`

---

## 🆘 Quick Help

**Migration fails?**
- Check XAMPP MySQL is running
- Verify MySQL credentials in `.env`
- Check Supabase project is active

**Deployment fails?**
- Check all environment variables are set
- Verify Supabase credentials
- Check Vercel function logs

**Login doesn't work?**
- Passwords are preserved (bcrypt hashes)
- Try resetting password in Supabase
- Check user exists in `users` table

---

**Ready? Start with Step 1! 🚀**

