# 🔧 Database Initialization Fix Guide

## Quick Fix

If you're seeing the error: **"Database error. Please ensure the database is properly initialized."**

### Step 1: Check MySQL is Running

**Windows:**
```powershell
# Check if MySQL service is running
Get-Service | Where-Object {$_.DisplayName -like "*mysql*"}

# Start MySQL (run PowerShell as Administrator)
net start MySQL80
# or
net start MySQL
# or
net start MySQL57
```

**Alternative (Easiest):**
1. Press `Win + R`
2. Type: `services.msc` and press Enter
3. Find **MySQL** service (might be "MySQL80", "MySQL", "MySQL57")
4. Right-click → **Start** (or **Restart** if already running)

### Step 2: Check .env File

Make sure you have a `.env` file in the `backend` directory with:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=internet_billing_db

# JWT Configuration (REQUIRED)
JWT_SECRET=your_random_secret_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Server Configuration
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

**Important:**
- If MySQL root has no password, use: `DB_PASSWORD=`
- `JWT_SECRET` must be at least 32 characters long

### Step 3: Initialize Database

Run the initialization script:

```bash
cd backend
npm run init-db
```

This will:
- ✅ Check MySQL connection
- ✅ Create database if it doesn't exist
- ✅ Create all required tables
- ✅ Initialize RBAC system
- ✅ Verify everything is set up correctly

### Step 4: Start the Server

```bash
npm start
```

You should see:
```
✅ Database connection established successfully
✅ Database models synchronized
🚀 Server running on port 8000
```

## Alternative: Manual Database Creation

If the initialization script doesn't work, create the database manually:

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE IF NOT EXISTS internet_billing_db;
EXIT;
```

Then run:
```bash
npm run init-db
```

## Troubleshooting

### Error: "ECONNREFUSED" or "Cannot connect to MySQL"

**Solution:** MySQL is not running
- Start MySQL service (see Step 1)
- Verify MySQL is installed

### Error: "Access denied for user"

**Solution:** Wrong credentials
- Check `DB_USER` and `DB_PASSWORD` in `.env` file
- Verify MySQL user exists and has permissions

### Error: "Unknown database"

**Solution:** Database doesn't exist
- Run: `npm run create-db` to create the database
- Or create manually: `CREATE DATABASE internet_billing_db;`

### Error: "JWT_SECRET is not set"

**Solution:** Missing JWT_SECRET
- Add `JWT_SECRET=your_random_secret_key_minimum_32_characters` to `.env`
- Generate a random key: https://randomkeygen.com/

### Error: "Table doesn't exist"

**Solution:** Tables not synced
- Run: `npm run init-db` to sync all tables
- Or restart the server (it will auto-sync)

## Available Commands

```bash
# Initialize database (recommended)
npm run init-db

# Create database only
npm run create-db

# Fix database issues
npm run fix-db

# Start server
npm start
```

## Verification

After initialization, verify everything works:

1. **Check database connection:**
   ```bash
   mysql -u root -p internet_billing_db
   ```

2. **Check tables exist:**
   ```sql
   SHOW TABLES;
   ```
   Should show: `isps`, `users`, `customers`, `packages`, `bills`, etc.

3. **Start server and check logs:**
   ```bash
   npm start
   ```
   Should see: `✅ Database connection established successfully`

## Still Having Issues?

1. **Check MySQL logs:**
   - Windows: `C:\ProgramData\MySQL\MySQL Server X.X\Data\*.err`

2. **Verify MySQL port:**
   - Default: 3306
   - Check if port is in use: `netstat -an | findstr 3306`

3. **Check firewall:**
   - Ensure MySQL port (3306) is not blocked

4. **Reinstall MySQL (last resort):**
   - Download from: https://dev.mysql.com/downloads/installer/
   - Install and set root password
   - Update `.env` with correct password

## Summary

The error "Database error. Please ensure the database is properly initialized" typically means:

1. ❌ MySQL is not running → **Start MySQL service**
2. ❌ Database doesn't exist → **Run: npm run init-db**
3. ❌ Tables not created → **Run: npm run init-db**
4. ❌ Wrong credentials → **Check .env file**
5. ❌ Missing .env file → **Create .env file**

**Quick fix:** Run `npm run init-db` in the backend directory!

