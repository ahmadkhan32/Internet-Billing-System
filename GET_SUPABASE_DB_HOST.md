# 🔍 How to Get DB_HOST from Supabase

## 📍 **Location**

**Supabase Dashboard → Your Project → Settings → Database → Connection string**

---

## 🚀 **Quick Steps**

1. **Go to**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click** your project
3. **Click** **Settings** (⚙️ icon) in left sidebar
4. **Click** **Database** in settings menu
5. **Scroll** to **"Connection string"** section
6. **Click** **"URI"** tab
7. **Copy** the connection string

**Example connection string**:
```
postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

**DB_HOST is**: `db.xxxxx.supabase.co` (the part between `@` and `:`)

---

## 📋 **Visual Example**

```
Connection String:
postgresql://postgres:password123@db.qppdkzzmijjyoihzfdxw.supabase.co:5432/postgres
                              │                                    │
                              │                                    │
                              └────────── DB_HOST ────────────────┘
```

**Your DB_HOST**: `db.qppdkzzmijjyoihzfdxw.supabase.co`

---

## ✅ **Current Value**

**From your .env file**:
```
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
```

**To verify this is correct**:
1. Go to Supabase Dashboard
2. Settings → Database → Connection string → URI tab
3. Check if the hostname matches `db.qppdkzzmijjyoihzfdxw.supabase.co`

---

## 🔧 **Easy Way: Use Script**

**Instead of manual extraction, use the script**:

```powershell
cd backend
.\get-supabase-credentials.ps1
```

**Then**:
1. Paste the full connection string
2. Script extracts DB_HOST automatically
3. Updates .env file

---

**DB_HOST is in the connection string between `@` and `:`!** 📍

