# ⚡ Quick Fix - Local Development Setup

## ❌ Error: Missing DB_PASSWORD

## ✅ Solution: Create .env File (2 Minutes)

### Option 1: Use PowerShell Script (Easiest)

1. **Open PowerShell in backend folder:**
   ```powershell
   cd "C:\Users\asadk\Downloads\Internet Billing System\backend"
   ```

2. **Run the script:**
   ```powershell
   .\create-env.ps1
   ```

3. **Follow the prompts:**
   - Enter MySQL host (default: localhost)
   - Enter MySQL user (default: root)
   - Enter MySQL password (press Enter if no password)
   - Enter database name (default: internet_billing_db)

4. **Done!** The script creates `.env` file automatically.

### Option 2: Create Manually

1. **Go to backend folder:**
   ```powershell
   cd backend
   ```

2. **Create .env file:**
   ```powershell
   New-Item -Path ".env" -ItemType File
   ```

3. **Open .env in Notepad:**
   ```powershell
   notepad .env
   ```

4. **Copy and paste this:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=internet_billing_db
   JWT_SECRET=my_super_secret_jwt_key_12345678901234567890
   JWT_EXPIRE=7d
   PORT=8000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3001
   ```

5. **Edit DB_PASSWORD:**
   - If MySQL has NO password: Leave empty `DB_PASSWORD=`
   - If MySQL has password: `DB_PASSWORD=yourpassword`

6. **Save and close**

### Step 2: Check MySQL is Running

```powershell
# Check MySQL service
Get-Service -Name MySQL*

# If not running, start it:
net start MySQL
```

### Step 3: Create Database (if needed)

```powershell
mysql -u root -p
```

Then in MySQL:
```sql
CREATE DATABASE IF NOT EXISTS internet_billing_db;
EXIT;
```

### Step 4: Start Server

```powershell
cd backend
npm start
```

## ✅ Success!

You should see:
```
✅ Database connection established successfully.
🚀 Server running on port 8000
```

## 🐛 Still Having Issues?

### "Access denied"
- Wrong password in `.env`
- Test: `mysql -u root -p`

### "Unknown database"
- Create it: `CREATE DATABASE internet_billing_db;`

### "ECONNREFUSED"
- MySQL not running: `net start MySQL`

---

**That's it!** Your server should start now! 🚀

