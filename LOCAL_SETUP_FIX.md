# 🔧 Local Setup Fix - Step by Step

## ❌ Current Error
```
Missing required environment variables: DB_PASSWORD
```

## ✅ Fix: Create .env File (5 Steps)

### Step 1: Check if MySQL is Running

**Windows:**
```powershell
# Check MySQL service
Get-Service -Name MySQL*

# If not running, start it:
net start MySQL
# or
Start-Service MySQL
```

**Or check manually:**
1. Press `Win + R`
2. Type: `services.msc`
3. Find "MySQL" service
4. Right-click → Start (if stopped)

### Step 2: Test MySQL Connection

Open Command Prompt or PowerShell and run:
```bash
mysql -u root -p
```

- If it asks for password: Enter your MySQL root password
- If it connects without password: Your root has no password (use empty password in .env)
- If it says "command not found": MySQL is not in PATH or not installed

### Step 3: Create Database (if needed)

If connected to MySQL, run:
```sql
CREATE DATABASE IF NOT EXISTS internet_billing_db;
SHOW DATABASES;
EXIT;
```

### Step 4: Create .env File

1. **Navigate to backend folder:**
   ```powershell
   cd "C:\Users\asadk\Downloads\Internet Billing System\backend"
   ```

2. **Create .env file:**
   - Right-click in the folder
   - New → Text Document
   - Name it: `.env` (with the dot at the beginning)
   - **Important:** Remove `.txt` extension if Windows adds it

   **Or use PowerShell:**
   ```powershell
   New-Item -Path ".env" -ItemType File
   ```

3. **Open .env file** in Notepad or any text editor

4. **Copy and paste this content:**

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=internet_billing_db

# JWT Configuration (REQUIRED)
JWT_SECRET=my_super_secret_jwt_key_12345678901234567890
JWT_EXPIRE=7d

# Server Configuration
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

5. **Edit DB_PASSWORD:**
   - **If MySQL has NO password:** Leave it empty: `DB_PASSWORD=`
   - **If MySQL has a password:** Enter it: `DB_PASSWORD=yourpassword`

6. **Save the file**

### Step 5: Verify .env File

**Check if file exists:**
```powershell
cd backend
Get-ChildItem -Filter ".env"
```

**View contents (to verify):**
```powershell
Get-Content .env
```

You should see your database configuration.

### Step 6: Start the Server

```powershell
cd backend
npm start
```

**Or with nodemon (auto-restart):**
```powershell
npm run dev
```

## ✅ Expected Output

If everything is correct, you should see:
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 8000
```

## 🐛 Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

**Fix:**
1. Check `DB_PASSWORD` in `.env` file
2. Test MySQL connection: `mysql -u root -p`
3. If password is wrong, update `.env` file
4. If no password, use: `DB_PASSWORD=`

### Error: "Unknown database 'internet_billing_db'"

**Fix:**
1. Connect to MySQL: `mysql -u root -p`
2. Create database:
   ```sql
   CREATE DATABASE internet_billing_db;
   ```
3. Or change `DB_NAME` in `.env` to an existing database

### Error: "ECONNREFUSED" or "Can't connect to MySQL server"

**Fix:**
1. Check if MySQL is running:
   ```powershell
   Get-Service -Name MySQL*
   ```
2. Start MySQL if stopped:
   ```powershell
   net start MySQL
   ```

### Error: "JWT_SECRET not configured"

**Fix:**
1. Open `.env` file
2. Make sure `JWT_SECRET` is set
3. Must be at least 32 characters
4. Example: `JWT_SECRET=my_secret_key_12345678901234567890`

## 📝 Complete .env File Template

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=internet_billing_db

# JWT Configuration (REQUIRED - Change this!)
JWT_SECRET=my_super_secret_jwt_key_12345678901234567890
JWT_EXPIRE=7d

# Server Configuration
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

## ✅ Verification Checklist

- [ ] MySQL service is running
- [ ] Can connect to MySQL: `mysql -u root -p`
- [ ] Database `internet_billing_db` exists
- [ ] `.env` file exists in `backend` folder
- [ ] `.env` file has `DB_PASSWORD` set (even if empty)
- [ ] `.env` file has `JWT_SECRET` set (32+ characters)
- [ ] Server starts without errors

## 🚀 Quick Commands

**Create .env file:**
```powershell
cd backend
@"
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=internet_billing_db
JWT_SECRET=my_super_secret_jwt_key_12345678901234567890
JWT_EXPIRE=7d
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
"@ | Out-File -FilePath ".env" -Encoding utf8
```

**Then edit DB_PASSWORD if needed!**

---

**After creating .env file, restart the server!**

