# 📝 Create .env File - Step by Step

## ✅ How to Create .env File Correctly

### Step 1: Navigate to Backend Folder

1. Open your file explorer
2. Go to: `Internet Billing System/backend/`
3. You should be in the `backend` folder

### Step 2: Create .env File

**Option A: Using File Explorer (Windows)**

1. Right-click in the `backend` folder
2. Select **"New"** → **"Text Document"**
3. Name it exactly: `.env` (with the dot at the beginning)
   - ⚠️ Windows might warn you about the dot - click "Yes"
4. If Windows adds `.txt` extension, rename it to remove `.txt`

**Option B: Using Command Line**

1. Open PowerShell or Command Prompt
2. Navigate to backend folder:
   ```powershell
   cd "C:\Users\asadk\Downloads\Internet Billing System\backend"
   ```
3. Create the file:
   ```powershell
   New-Item -Path .env -ItemType File
   ```

**Option C: Copy Template**

1. In the `backend` folder, you'll find `env.template`
2. Copy it and rename to `.env`
3. Remove `.template` from the name

### Step 3: Fill in Your Values

1. **Open** the `.env` file with Notepad or any text editor
2. **Copy** the content from `backend/env.template`
3. **Replace** the placeholder values with your actual values:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password_here
DB_NAME=internet_billing_db

# JWT Configuration
JWT_SECRET=your_random_secret_key_minimum_32_characters_long

# Server Configuration
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

**Important:**
- Replace `your_actual_password_here` with your real MySQL password
- Replace `your_random_secret_key_minimum_32_characters_long` with a 32+ character string
- If MySQL has no password, use: `DB_PASSWORD=`

### Step 4: Save the File

1. **Save** the file (Ctrl+S)
2. **Close** the editor
3. **Verify** the file is named `.env` (not `.env.txt`)

---

## ✅ Verify .env File is Created

**Check if file exists:**

1. In `backend` folder, you should see `.env` file
2. It should NOT have `.txt` extension
3. It should be a plain text file

**If you see `.env.txt`:**
- Rename it to `.env` (remove `.txt`)

---

## 📋 What to Put in .env File

### For Local Development:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=internet_billing_db
JWT_SECRET=my_super_secret_jwt_key_12345678901234567890
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

### For Vercel (Copy These Values):

When you set up Vercel, copy these same values:
- `DB_HOST` → Copy to Vercel as `DB_HOST`
- `DB_USER` → Copy to Vercel as `DB_USER`
- `DB_PASSWORD` → Copy to Vercel as `DB_PASSWORD`
- `DB_NAME` → Copy to Vercel as `DB_NAME`
- `JWT_SECRET` → Copy to Vercel as `JWT_SECRET`
- `NODE_ENV` → Set to `production` in Vercel

---

## 🔐 Get Your Database Password

**If you don't know your database password:**

1. **Check your database provider dashboard:**
   - PlanetScale: Dashboard → Database → Connect
   - AWS RDS: RDS Console → Database → Connectivity tab
   - Railway: Dashboard → Database → Variables

2. **Or check if you have it saved somewhere:**
   - Previous .env file
   - Database creation email
   - Password manager

3. **Or reset it:**
   - Most providers let you reset the password
   - Check your database provider's documentation

---

## ✅ After Creating .env File

1. **Test locally:**
   ```bash
   cd backend
   node server.js
   ```
   Should connect to database successfully

2. **Copy values to Vercel:**
   - See `SET_DB_PASSWORD_VERCEL_STEP_BY_STEP.md` for instructions

---

## 🆘 Troubleshooting

### Problem: File is named `.env.txt`

**Solution:**
- Rename it to `.env` (remove `.txt`)
- Windows might hide extensions - enable "Show file extensions" in View settings

### Problem: Can't see .env file

**Solution:**
- Windows might hide files starting with dot
- Enable "Show hidden files" in View settings
- Or use: `dir /a` in command prompt

### Problem: File not working

**Solution:**
- Make sure it's in the `backend` folder (not root folder)
- Make sure it's named exactly `.env` (not `.env.txt`)
- Make sure values don't have quotes (unless needed)
- Make sure there are no extra spaces

---

**Remember:**
- ✅ Create `.env` in `backend` folder
- ✅ Use `env.template` as a guide
- ✅ Fill in your actual values
- ✅ Copy same values to Vercel

