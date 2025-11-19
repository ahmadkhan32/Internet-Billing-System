# 🔍 How to Run Database Diagnostic

## ✅ **Fixed! Now You Can Run From Anywhere**

I've fixed the scripts so they work from **any directory**.

---

## 🚀 **How to Run**

### **Option 1: From Project Root** (Recommended)

```bash
# From project root directory
node diagnose-database-connection.js
```

**Or quick check**:
```bash
node quick-check-connection.js
```

---

### **Option 2: From Backend Directory**

```bash
# From backend directory
cd backend
node check-db.js
```

**Or from root**:
```bash
node backend/check-db.js
```

---

## 📋 **All Available Diagnostic Scripts**

### **1. Full Diagnostic** (Root directory)
```bash
node diagnose-database-connection.js
```
- ✅ Comprehensive check
- ✅ Checks environment variables
- ✅ Tests DNS resolution
- ✅ Tests database connection
- ✅ Provides detailed error analysis

### **2. Quick Check** (Root directory)
```bash
node quick-check-connection.js
```
- ✅ Quick connection test
- ✅ Shows environment variables
- ✅ Tests connection
- ✅ Fast results

### **3. Backend Check** (Backend directory)
```bash
cd backend
node check-db.js
```
- ✅ Works from backend directory
- ✅ Uses local .env file
- ✅ Quick connection test

---

## 🎯 **Recommended: Use This**

**From project root**:
```bash
node quick-check-connection.js
```

**This will**:
- ✅ Find .env file automatically
- ✅ Check all variables
- ✅ Test connection
- ✅ Show exact error if fails

---

## ✅ **What Was Fixed**

1. ✅ Scripts now find `.env` file automatically
2. ✅ Works from root or backend directory
3. ✅ Better error messages if .env not found
4. ✅ Created `backend/check-db.js` for backend directory

---

## 🚀 **Try It Now**

**From project root**:
```bash
node quick-check-connection.js
```

**Should see**:
- ✅ All environment variables checked
- ✅ Connection test results
- ✅ Specific fix instructions if fails

---

**The scripts are fixed! Run from project root now!** ✅

