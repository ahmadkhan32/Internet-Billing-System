# 🔄 Migrate from XAMPP to Cloud Database - Step by Step

## 📋 What You Need to Do

**XAMPP won't work with Vercel. You need a cloud database.**

---

## 🚀 Quick Migration (15 Minutes)

### Step 1: Export Your Data from XAMPP

1. **Open phpMyAdmin:**
   - Go to: http://localhost/phpmyadmin
   - Or: http://127.0.0.1/phpmyadmin

2. **Select your database:**
   - Click on database name in left sidebar
   - Usually: `internet_billing_db` or `billing_db`

3. **Export:**
   - Click **"Export"** tab (top menu)
   - Select **"Quick"** method
   - Format: **SQL**
   - Click **"Go"** button

4. **Save the file:**
   - File will download as `.sql`
   - Save it somewhere safe (Desktop, Documents, etc.)

---

### Step 2: Create Cloud Database (PlanetScale - Recommended)

1. **Sign up:**
   - Go to: https://planetscale.com
   - Click **"Sign up"** (free)
   - Sign up with GitHub (easiest)

2. **Create database:**
   - Click **"Create database"**
   - Name: `internet_billing_db`
   - Region: Choose closest to you
   - Click **"Create"**

3. **Get credentials:**
   - Click **"Connect"** button
   - Copy connection string
   - You'll need:
     - Host: `aws.connect.psdb.cloud`
     - Username: (from connection string)
     - Password: (from connection string)
     - Database: (from connection string)

4. **Allow connections:**
   - Settings → Connectivity
   - Enable **"Allow connections from anywhere"**

---

### Step 3: Import Data to PlanetScale

**Option A: Using PlanetScale Console**

1. Go to PlanetScale dashboard
2. Click on your database
3. Click **"Branches"** → **"main"**
4. Click **"Console"** tab
5. Open your exported `.sql` file in a text editor
6. Copy all SQL commands
7. Paste into Console
8. Click **"Run"**

**Option B: Using PlanetScale CLI**

```bash
# Install CLI
npm install -g pscale

# Login
pscale auth login

# Connect to database
pscale connect your-database-name main

# In another terminal, import
mysql -h 127.0.0.1 -P 3306 -u root -p < your-exported-file.sql
```

---

### Step 4: Update Vercel Environment Variables

1. **Go to Vercel:**
   - https://vercel.com → Your Project
   - Settings → Environment Variables

2. **Update these:**
   - `DB_HOST` = `aws.connect.psdb.cloud`
   - `DB_USER` = (from PlanetScale)
   - `DB_PASSWORD` = (from PlanetScale)
   - `DB_NAME` = (from PlanetScale)

3. **Redeploy:**
   - Deployments → Latest → Redeploy

---

### Step 5: Test

Visit: `https://your-app.vercel.app/api/diagnose`

Should show: `"status": "SUCCESS"` ✅

---

## 🎯 That's It!

**Your app now uses a cloud database and works with Vercel!**

---

## 📚 Alternative: Railway (Also Free)

**If you prefer Railway:**

1. Go to: https://railway.app
2. Sign up (free)
3. New Project → Database → MySQL
4. Get credentials from Variables tab
5. Enable Public Networking
6. Import your SQL file
7. Update Vercel variables
8. Redeploy

**Same process, different provider!**

---

## ✅ Summary

1. **Export** from XAMPP (phpMyAdmin)
2. **Create** cloud database (PlanetScale/Railway)
3. **Import** your data
4. **Update** Vercel environment variables
5. **Redeploy**

**15 minutes, and you're done! 🚀**

---

**See `FIX_XAMPP_DATABASE_FOR_VERCEL.md` for detailed instructions!**

