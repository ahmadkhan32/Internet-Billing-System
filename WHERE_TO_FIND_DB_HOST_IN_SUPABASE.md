# 📍 Where to Find DB_HOST Value in Supabase

## 🎯 **Quick Answer**

**DB_HOST** is found in: **Supabase Dashboard → Your Project → Settings → Database → Connection string**

---

## 📋 **Step-by-Step Guide**

### **Step 1: Go to Supabase Dashboard**

1. **Visit**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** to your account
3. **Click** your project (or create a new one)

---

### **Step 2: Navigate to Database Settings**

1. **Click** **"Settings"** in the left sidebar (gear icon ⚙️)
2. **Click** **"Database"** in the settings menu

---

### **Step 3: Find Connection String**

1. **Scroll down** to the **"Connection string"** section
2. You'll see different tabs:
   - **URI** (full connection string)
   - **JDBC** (Java connection)
   - **Golang** (Go connection)
   - **Python** (Python connection)
   - **Node.js** (JavaScript connection)

---

### **Step 4: Get DB_HOST Value**

#### **Option A: From URI Tab** (Easiest)

1. **Click** the **"URI"** tab
2. You'll see a connection string like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
3. **The DB_HOST is**: `db.xxxxx.supabase.co`
   - It's the part between `@` and `:`
   - Example: `db.qppdkzzmijjyoihzfdxw.supabase.co`

---

#### **Option B: From Connection Info** (Direct)

1. **Scroll down** in the Database settings
2. Look for **"Connection info"** or **"Connection parameters"**
3. You'll see:
   - **Host**: `db.xxxxx.supabase.co` ← This is your DB_HOST
   - **Port**: `5432` or `6543`
   - **Database name**: `postgres`
   - **User**: `postgres`
   - **Password**: `[YOUR-PASSWORD]`

---

## 📸 **Visual Guide**

```
Supabase Dashboard
├── Your Project
    ├── Settings (⚙️)
        ├── Database
            ├── Connection string
                ├── URI Tab
                    └── postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
                                                          ↑
                                                      DB_HOST is here
```

---

## 🔍 **What DB_HOST Looks Like**

**Format**: `db.xxxxx.supabase.co`

**Examples**:
- `db.qppdkzzmijjyoihzfdxw.supabase.co`
- `db.abcdefghijklmnop.supabase.co`
- `db.xyz1234567890.supabase.co`

**Important**:
- ✅ Always starts with `db.`
- ✅ Always ends with `.supabase.co`
- ✅ No `https://` prefix
- ✅ No port number (port is separate)

---

## 📋 **Complete Connection Details Location**

**In Supabase Dashboard → Settings → Database**, you'll find:

| Field | Location | Example |
|-------|----------|---------|
| **DB_HOST** | Connection string (between `@` and `:`) | `db.xxxxx.supabase.co` |
| **DB_PORT** | Connection string (after `:`) or Connection info | `5432` or `6543` |
| **DB_USER** | Connection string (after `postgresql://`) | `postgres` |
| **DB_PASSWORD** | Connection string (between `:` and `@`) | `[YOUR-PASSWORD]` |
| **DB_NAME** | Connection string (after last `/`) | `postgres` |

---

## 🚀 **Quick Method: Use Connection String**

**Easiest way to get all values**:

1. **Go to**: Settings → Database → Connection string → **URI** tab
2. **Copy** the full connection string:
   ```
   postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
3. **Run**:
   ```powershell
   cd backend
   .\get-supabase-credentials.ps1
   ```
4. **Paste** the connection string
5. **Script will extract** all values automatically:
   - DB_HOST
   - DB_PORT
   - DB_USER
   - DB_PASSWORD
   - DB_NAME

---

## 🔧 **Manual Extraction**

**If you want to extract manually from connection string**:

```
postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
         │      │        │         │                    │    │
         │      │        │         │                    │    └─ DB_NAME
         │      │        │         │                    └─ DB_PORT
         │      │        │         └─ DB_HOST (this is what you need!)
         │      │        └─ DB_PASSWORD
         │      └─ DB_USER
         └─ Protocol
```

**DB_HOST** = Everything between `@` and `:`

---

## ✅ **Verify Your DB_HOST**

**Your current DB_HOST** (from .env):
```
db.qppdkzzmijjyoihzfdxw.supabase.co
```

**To verify**:
1. Go to Supabase Dashboard → Settings → Database
2. Check if the hostname matches
3. If different, update `backend/.env` with the correct value

---

## 🎯 **Summary**

**Where to find DB_HOST**:
1. ✅ Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. ✅ Click your project
3. ✅ Settings → Database
4. ✅ Connection string → URI tab
5. ✅ DB_HOST is between `@` and `:` in the connection string

**Or use the script**:
```powershell
cd backend
.\get-supabase-credentials.ps1
```
Paste the connection string and it extracts everything automatically!

---

**The DB_HOST is in the connection string between `@` and `:`!** 📍

