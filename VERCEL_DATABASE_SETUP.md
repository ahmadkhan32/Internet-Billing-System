# Vercel Database Setup Guide - Fix 503 Connection Errors

## 🔴 Current Error
```
503 - Database connection failed
Error: connect ETIMEDOUT
```

This means your database is not accessible from Vercel. Follow these steps to fix it.

## ✅ Step 1: Set Environment Variables in Vercel

### Go to Vercel Dashboard

1. **Open Your Project**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project: `Internet-Billing-System`

2. **Navigate to Settings**
   - Click on **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add These Variables** (Click "Add New" for each):

#### Required Database Variables:

```
Name: DB_HOST
Value: your-database-host
Example: db.xxxxx.supabase.co (for Supabase)
         or your-mysql-host.com
```

```
Name: DB_PORT
Value: 3306 (for MySQL) or 5432 (for PostgreSQL/Supabase)
```

```
Name: DB_USER
Value: your-database-username
Example: postgres (for Supabase)
         or root (for MySQL)
```

```
Name: DB_PASSWORD
Value: your-database-password
⚠️ Keep this secret! Never share it.
```

```
Name: DB_NAME
Value: your-database-name
Example: postgres (for Supabase)
         or internet_billing_db (for MySQL)
```

```
Name: DB_DIALECT
Value: mysql (for MySQL) or postgres (for Supabase/PostgreSQL)
```

#### Required Application Variables:

```
Name: NODE_ENV
Value: production
```

```
Name: JWT_SECRET
Value: your-random-secret-key-minimum-32-characters-long
Example: my-super-secret-jwt-key-2024-internet-billing-system
```

```
Name: JWT_EXPIRE
Value: 7d
```

```
Name: FRONTEND_URL
Value: https://your-vercel-app.vercel.app
Replace with your actual Vercel app URL
```

#### Optional (For Supabase/Cloud Databases):

```
Name: DB_SSL
Value: true
```

```
Name: DB_SSL_REJECT_UNAUTHORIZED
Value: false
```

### 4. Apply to All Environments
- Check **Production**, **Preview**, and **Development**
- Click **Save**

### 5. Redeploy
- Go to **Deployments** tab
- Click **⋯** (three dots) on latest deployment
- Click **Redeploy**
- Wait for deployment to complete

## ✅ Step 2: Configure Database Firewall

### For Supabase:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Under **Connection Pooling**, enable it
5. Under **Network Restrictions**, allow connections from:
   - `0.0.0.0/0` (all IPs) - Required for Vercel

### For MySQL (PlanetScale, AWS RDS, etc.):
1. Go to your database provider dashboard
2. Find **Firewall** or **Security Groups** settings
3. Add rule: Allow `0.0.0.0/0` on port 3306 (MySQL) or 5432 (PostgreSQL)
4. Save changes

### For Local MySQL (XAMPP):
⚠️ **Not Recommended for Production**
- Local databases are not accessible from Vercel
- Use a cloud database instead (Supabase, PlanetScale, etc.)

## ✅ Step 3: Test Database Connection

### Option A: Use Health Check Endpoint
After deploying, test:
```
https://your-app.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

### Option B: Use Diagnostic Endpoint
```
https://your-app.vercel.app/api/diagnose
```

This shows detailed connection information and troubleshooting tips.

## ✅ Step 4: Quick Setup Examples

### Example 1: Using Supabase (Recommended)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Wait for database to be ready

2. **Get Connection Details**
   - Go to **Settings** → **Database**
   - Copy connection details

3. **Set in Vercel**:
   ```
   DB_HOST=db.xxxxx.supabase.co
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your-supabase-password
   DB_NAME=postgres
   DB_DIALECT=postgres
   DB_SSL=true
   ```

4. **Run Migrations**
   - Go to Supabase SQL Editor
   - Run `supabase/migrations/001_initial_schema.sql`
   - Run `supabase/seed.sql`

### Example 2: Using PlanetScale (MySQL)

1. **Create PlanetScale Database**
   - Go to [planetscale.com](https://planetscale.com)
   - Create new database

2. **Get Connection String**
   - Copy connection string from dashboard

3. **Set in Vercel**:
   ```
   DB_HOST=xxxxx.psdb.cloud
   DB_PORT=3306
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=your-database-name
   DB_DIALECT=mysql
   DB_SSL=true
   ```

## 🔍 Troubleshooting

### Error: "connect ETIMEDOUT"
**Cause**: Database is not accessible from Vercel
**Fix**:
1. Check database firewall allows `0.0.0.0/0`
2. Verify database host and port are correct
3. Ensure database is publicly accessible (not private network)

### Error: "Access denied"
**Cause**: Wrong username/password
**Fix**:
1. Double-check `DB_USER` and `DB_PASSWORD` in Vercel
2. Verify credentials in your database provider dashboard
3. Ensure user has proper permissions

### Error: "Unknown database"
**Cause**: Database doesn't exist
**Fix**:
1. Verify `DB_NAME` is correct
2. Create the database if it doesn't exist
3. Run migrations to create tables

### Error: "SSL required"
**Cause**: Cloud database requires SSL
**Fix**:
1. Set `DB_SSL=true` in Vercel
2. For Supabase, SSL is automatically handled

## 📋 Checklist

Before deploying, verify:

- [ ] All environment variables are set in Vercel
- [ ] Database firewall allows connections from `0.0.0.0/0`
- [ ] Database credentials are correct
- [ ] Database is publicly accessible
- [ ] `DB_DIALECT` matches your database type (mysql/postgres)
- [ ] `DB_SSL=true` for cloud databases
- [ ] Redeployed after setting environment variables
- [ ] Tested `/api/health` endpoint

## 🚀 After Setup

1. **Redeploy** your Vercel project
2. **Test** the health endpoint
3. **Try logging in** with:
   - Email: `admin@billing.com`
   - Password: `admin123`

## 📞 Need Help?

1. Check Vercel function logs for detailed errors
2. Use `/api/diagnose` endpoint for diagnostics
3. Verify all environment variables are set correctly
4. Test database connection from your local machine first

---

**Important**: After setting environment variables, you MUST redeploy for changes to take effect!

