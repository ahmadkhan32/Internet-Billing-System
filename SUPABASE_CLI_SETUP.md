# 🔧 Supabase CLI Setup & Usage Guide

## ⚠️ **Important Notes**

1. **Supabase CLI is for local development** - `supabase start` starts a LOCAL Supabase instance
2. **To restore your PAUSED remote project** - Use the dashboard (not CLI)
3. **Your project is currently PAUSED** - Restore it first before using CLI

---

## 📋 **Step 1: Install Supabase CLI**

### **For Windows (PowerShell)**:

```powershell
# Install using Scoop (recommended)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# OR using npm
npm install -g supabase
```

### **For Windows (Chocolatey)**:

```powershell
choco install supabase
```

### **Verify Installation**:

```bash
supabase --version
```

**Should show**: `supabase version X.X.X`

---

## 📋 **Step 2: Restore Your Remote Project First**

**Before using CLI, restore your paused project**:

1. **Go to**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project: `qppdkzzmijjyoihzfdxw`
3. **Click "Restore"** (or Pause → Restore)
4. **Wait 3-5 minutes** for database to start

**Why?** CLI can't connect to a paused project!

---

## 📋 **Step 3: Link to Your Remote Project**

**Your command was almost correct, but needs fixing**:

### **❌ Wrong**:
```bash
supabase link --project-ref @https://qppdkzzmijjyoihzfdxw.supabase.co
```

### **✅ Correct**:
```bash
# First, login to Supabase
supabase login

# Then link to your project (project-ref is just the ID, not the full URL)
supabase link --project-ref qppdkzzmijjyoihzfdxw
```

**Project Ref** is just the ID part: `qppdkzzmijjyoihzfdxw` (not the full URL)

---

## 📋 **Step 4: Push Database Schema**

**After linking, push your migrations**:

```bash
# Push migrations to remote Supabase project
supabase db push
```

**This will**:
- ✅ Apply all migrations from `supabase/migrations/` folder
- ✅ Create/update tables in your remote database
- ✅ Only push changes that haven't been applied

---

## 📋 **Step 5: About `supabase start`**

**⚠️ Important**: `supabase start` is for **LOCAL development**, not for restoring your remote project!

### **What `supabase start` does**:
- ✅ Starts a **local** Supabase instance on your computer
- ✅ Creates a local PostgreSQL database
- ✅ Runs on `http://localhost:54321`
- ✅ **Does NOT** restore your paused remote project

### **When to use `supabase start`**:
- ✅ For local development
- ✅ Testing migrations locally
- ✅ Development without internet

### **When NOT to use `supabase start`**:
- ❌ To restore a paused remote project (use dashboard)
- ❌ To fix DNS errors (restore project in dashboard)
- ❌ For production deployment

---

## 🎯 **Complete Workflow**

### **For Remote Project (Your Current Setup)**:

```bash
# 1. Restore project in dashboard first!
# 2. Login to Supabase
supabase login

# 3. Link to your remote project
supabase link --project-ref qppdkzzmijjyoihzfdxw

# 4. Push migrations
supabase db push

# 5. Check status
supabase status
```

### **For Local Development**:

```bash
# 1. Initialize Supabase locally
supabase init

# 2. Start local Supabase
supabase start

# 3. Apply migrations locally
supabase db push

# 4. Stop when done
supabase stop
```

---

## 📋 **Alternative: Use SQL Editor (Easier)**

**Instead of CLI, you can use Supabase Dashboard**:

1. **Go to**: Supabase Dashboard → **SQL Editor**
2. **Click "New query"**
3. **Open**: `supabase/migrations/001_initial_schema.sql`
4. **Copy** entire content
5. **Paste** into SQL Editor
6. **Click "Run"** (or Ctrl+Enter)

**This is easier and doesn't require CLI!**

---

## 🔍 **Your Current Situation**

**Your project is PAUSED**, so:

1. **First**: Restore project in dashboard
2. **Then**: You can use CLI commands
3. **Or**: Use SQL Editor (easier, no CLI needed)

---

## ✅ **Quick Commands Reference**

```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link to remote project
supabase link --project-ref qppdkzzmijjyoihzfdxw

# Push migrations
supabase db push

# Check status
supabase status

# Start local Supabase (for local dev only)
supabase start

# Stop local Supabase
supabase stop
```

---

## 📋 **Summary**

**Your commands**:
- ❌ `supabase link --project-ref @https://qppdkzzmijjyoihzfdxw.supabase.co` → Wrong format
- ✅ `supabase link --project-ref qppdkzzmijjyoihzfdxw` → Correct

**About `supabase start`**:
- ⚠️ This is for **local development**, not for restoring remote project
- ✅ Use dashboard to restore paused project

**Easier alternative**:
- ✅ Use Supabase SQL Editor (no CLI needed)

---

**Install CLI first, then use correct commands!** ✅

