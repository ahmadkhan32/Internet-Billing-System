# Supabase Migration Guide

This guide will help you migrate your Internet Billing System database from MySQL to Supabase (PostgreSQL) and seed it with initial data.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project created
3. Access to Supabase SQL Editor

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: `internet-billing-system`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for project to be created (2-3 minutes)

## Step 2: Get Database Connection Details

1. In your Supabase project, go to **Settings** → **Database**
2. Find the **Connection string** section
3. Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
4. Note down:
   - **Host**: `db.xxxxx.supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **User**: `postgres`
   - **Password**: (the one you set)

## Step 3: Run Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for migration to complete (should take 10-30 seconds)
7. You should see "Success. No rows returned"

## Step 4: Seed Database

1. In the SQL Editor, click "New query"
2. Copy the entire contents of `supabase/seed.sql`
3. Paste it into the SQL Editor
4. Click "Run"
5. You should see "Success. No rows returned"

## Step 5: Update Environment Variables

Update your `.env` file or deployment environment variables:

```env
# Database Configuration (Supabase PostgreSQL)
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-supabase-password
DB_NAME=postgres
DB_DIALECT=postgres

# Optional: For SSL connection
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

## Step 6: Update Backend Configuration

### Option A: Update config/db.js to support PostgreSQL

The current `config/db.js` uses MySQL. You need to:

1. Install PostgreSQL driver:
   ```bash
   cd backend
   npm install pg pg-hstore
   ```

2. Update `backend/config/db.js`:
   - Change `dialect: 'mysql'` to `dialect: 'postgres'`
   - Update connection options for PostgreSQL

### Option B: Use Supabase Connection String

Supabase provides a connection string that you can use directly:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

## Step 7: Verify Migration

1. In Supabase Dashboard, go to **Table Editor**
2. You should see all tables:
   - `saas_packages`
   - `isps`
   - `users`
   - `packages`
   - `customers`
   - `bills`
   - `payments`
   - `recoveries`
   - `installations`
   - `notifications`
   - `activity_logs`
   - `permissions`
   - `roles`
   - `role_permissions`
   - `automation_logs`

3. Check that seed data exists:
   - Go to `users` table - should have Super Admin user
   - Go to `isps` table - should have Demo ISP
   - Go to `packages` table - should have 4 packages
   - Go to `roles` table - should have 7 roles
   - Go to `permissions` table - should have all permissions

## Step 8: Test Connection

1. Update your backend `.env` file with Supabase credentials
2. Start your backend server:
   ```bash
   cd backend
   npm start
   ```
3. Check logs for successful database connection
4. Test login with:
   - **Email**: `admin@billing.com`
   - **Password**: `admin123`

## Important Notes

### Password Hashing
The seed file includes a placeholder password hash. You need to generate the actual bcrypt hash for `admin123`. 

To generate the correct hash, you can:
1. Use Node.js:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = await bcrypt.hash('admin123', 10);
   console.log(hash);
   ```
2. Or let the application create the user on first run (the User model has hooks that hash passwords)

### Differences Between MySQL and PostgreSQL

1. **ENUM Types**: PostgreSQL uses custom ENUM types, which are created in the migration
2. **AUTO_INCREMENT**: PostgreSQL uses `SERIAL` instead of `AUTO_INCREMENT`
3. **JSON**: PostgreSQL uses `JSONB` for better performance
4. **Timestamps**: PostgreSQL uses `TIMESTAMP WITH TIME ZONE`
5. **String Functions**: Some MySQL-specific functions may need adjustment

### Updating Sequelize Models

If you're using Sequelize, make sure:
1. Install `pg` and `pg-hstore` packages
2. Update `config/db.js` to use `dialect: 'postgres'`
3. Test all model operations

## Troubleshooting

### Error: "relation does not exist"
- Make sure you ran the migration first
- Check that tables were created in Supabase Table Editor

### Error: "password authentication failed"
- Verify your database password in environment variables
- Check Supabase project settings for the correct password

### Error: "connection refused"
- Check that your IP is allowed in Supabase (Settings → Database → Connection Pooling)
- Verify host and port are correct

### Error: "ENUM type already exists"
- This means you've run the migration before
- You can either:
  - Drop the ENUM types and recreate them
  - Or comment out the ENUM creation in the migration

## Next Steps

1. ✅ Database migrated to Supabase
2. ✅ Initial data seeded
3. ✅ Environment variables updated
4. ✅ Backend configured for PostgreSQL
5. 🚀 Deploy your application!

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Sequelize PostgreSQL Guide](https://sequelize.org/docs/v6/getting-started/)

