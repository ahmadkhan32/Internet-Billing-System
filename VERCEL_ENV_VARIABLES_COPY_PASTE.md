# 📋 Vercel Environment Variables - Copy & Paste

## 🚀 **Quick Setup - Copy These to Vercel**

### **Step 1: Go to Vercel Dashboard**

1. Visit: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. **Settings** → **Environment Variables**
4. **Add each variable** below (one by one)

---

## ✅ **Required Variables (Copy Each One)**

### **1. Database Type**
```
DB_DIALECT
```
Value:
```
postgres
```

---

### **2. Database Host**
```
DB_HOST
```
Value:
```
db.qppdkzzmijjyoihzfdxw.supabase.co
```

---

### **3. Database Port** (Use connection pooling)
```
DB_PORT
```
Value:
```
6543
```

---

### **4. Database User**
```
DB_USER
```
Value:
```
postgres
```

---

### **5. Database Password**
```
DB_PASSWORD
```
Value:
```
3oqj6vL2Tr5BZLaf
```

---

### **6. Database Name**
```
DB_NAME
```
Value:
```
postgres
```

---

### **7. SSL Enabled**
```
DB_SSL
```
Value:
```
true
```

---

### **8. SSL Reject Unauthorized**
```
DB_SSL_REJECT_UNAUTHORIZED
```
Value:
```
false
```

---

### **9. JWT Secret**
```
JWT_SECRET
```
Value:
```
2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
```

---

### **10. JWT Expire**
```
JWT_EXPIRE
```
Value:
```
7d
```

---

### **11. Vercel Flag**
```
VERCEL
```
Value:
```
1
```

---

### **12. Node Environment**
```
NODE_ENV
```
Value:
```
production
```

---

## 📋 **Complete List (For Quick Reference)**

```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
VERCEL=1
NODE_ENV=production
```

---

## ⚠️ **Important Notes**

1. ✅ Set all for **Production** environment
2. ✅ **No spaces** before/after `=`
3. ✅ Copy values **exactly** as shown
4. ✅ Use port **6543** (connection pooling - better for Vercel)
5. ✅ After adding all variables, **Redeploy** your project

---

## 🔄 **After Adding Variables**

1. **Redeploy** your project:
   - Go to **Deployments** → **Latest** → **Redeploy**
2. **Wait** 3-5 minutes
3. **Test**: Visit `https://your-project.vercel.app/api/health`

---

## ✅ **Verification**

After deployment, check:

- [ ] `/api/health` returns `{"database": "connected"}`
- [ ] Login works with `admin@billing.com` / `admin123`
- [ ] No database connection errors

---

**That's it! Copy these variables to Vercel and deploy!** 🚀
