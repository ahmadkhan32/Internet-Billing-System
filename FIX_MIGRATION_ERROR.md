# 🔧 Fix Migration Error: "more than one row returned by a subquery"

## ❌ Error

```
ERROR: 21000: more than one row returned by a subquery used as an expression
```

## 🔍 What This Means

This error occurs when:
1. The migration is run multiple times and ENUM types already exist
2. Triggers already exist and are being recreated
3. There are conflicts with existing database objects

## ✅ Solution

I've updated the migration file to handle these cases:

### Changes Made:

1. **ENUM Types** - Now use `DO $$ BEGIN ... EXCEPTION` blocks to handle duplicates
2. **Triggers** - Now drop existing triggers before creating new ones
3. **Idempotent** - Migration can now be run multiple times safely

## 📋 How to Fix

### Option 1: Use Updated Migration (Recommended)

1. The migration file has been updated: `supabase/migrations/001_initial_schema.sql`
2. Copy the updated file content
3. In Supabase SQL Editor:
   - Click **"New query"**
   - Paste the entire updated migration
   - Click **"Run"**

### Option 2: Clean Start (If Option 1 Doesn't Work)

If you're still getting errors, you may need to reset your Supabase database:

1. **Warning:** This will delete all data!
2. In Supabase Dashboard → **Settings** → **Database**
3. Scroll to **"Danger Zone"**
4. Click **"Reset Database"**
5. Confirm the reset
6. Run the updated migration again

### Option 3: Manual Fix

If you want to keep existing data:

1. **Check what exists:**
   ```sql
   -- Check existing ENUMs
   SELECT typname FROM pg_type WHERE typtype = 'e';
   
   -- Check existing tables
   SELECT tablename FROM pg_tables WHERE schemaname = 'public';
   ```

2. **Drop conflicting objects manually:**
   ```sql
   -- Drop ENUMs (only if safe to do so)
   DROP TYPE IF EXISTS user_role_enum CASCADE;
   -- Repeat for other ENUMs if needed
   ```

3. **Then run the updated migration**

## ✅ Updated Migration Features

The updated migration now:
- ✅ Handles existing ENUM types gracefully
- ✅ Drops and recreates triggers safely
- ✅ Can be run multiple times (idempotent)
- ✅ Uses `IF NOT EXISTS` for tables
- ✅ Uses `CREATE OR REPLACE` for functions

## 🚀 Next Steps

1. Use the updated migration file
2. Run it in Supabase SQL Editor
3. If errors persist, check Vercel logs for specific issues
4. Verify tables were created: Go to **Table Editor** in Supabase

## 📝 Verification

After running the migration, verify:

1. **Check tables exist:**
   ```sql
   SELECT tablename FROM pg_tables 
   WHERE schemaname = 'public' 
   ORDER BY tablename;
   ```

2. **Check ENUMs exist:**
   ```sql
   SELECT typname FROM pg_type 
   WHERE typtype = 'e' 
   ORDER BY typname;
   ```

3. **Check triggers exist:**
   ```sql
   SELECT trigger_name, event_object_table 
   FROM information_schema.triggers 
   WHERE trigger_schema = 'public';
   ```

---

**The migration file has been fixed and is now safe to run multiple times!**

