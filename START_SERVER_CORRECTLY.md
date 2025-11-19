# 🚀 How to Start Your Server Correctly

## ❌ **Don't Start Server If Database is Paused**

**If you start the server when Supabase is paused**, you'll see:
- ❌ Multiple ENOTFOUND errors
- ❌ ISPs not created
- ❌ Users not created
- ❌ RBAC not initialized
- ❌ Auto-suspension fails

---

## ✅ **Correct Way to Start Server**

### **Step 1: Check Database First**

**Before starting server, always check database**:

```bash
cd backend
npm run pre-start
```

**This will**:
- ✅ Check if Supabase project is active
- ✅ Test database connection
- ✅ Tell you exactly what to fix if there's an issue

**If you see errors**:
- ✅ Follow the fix steps shown
- ✅ Restore Supabase project
- ✅ Run `npm run pre-start` again

---

### **Step 2: Start Server Only After Database is Ready**

**Once `npm run pre-start` shows success**:

```bash
npm start
```

**Now your server will start without errors!** ✅

---

## 📋 **Complete Startup Checklist**

**Every time you start your server**:

1. [ ] ✅ **Check database**: `npm run pre-start`
2. [ ] ✅ **If errors** → Restore Supabase project
3. [ ] ✅ **Wait 3-5 minutes** after restoring
4. [ ] ✅ **Check again**: `npm run pre-start`
5. [ ] ✅ **Should see**: `✅ All checks passed!`
6. [ ] ✅ **Start server**: `npm start`

---

## 🎯 **Quick Commands**

**Check database**:
```bash
cd backend
npm run pre-start
```

**Start server**:
```bash
npm start
```

**Check connection anytime**:
```bash
npm run check-connection
```

---

## ⚠️ **What Happens If You Start Without Checking**

**If you start server when database is paused**:

```
❌ Error checking ISP ISP 1: getaddrinfo ENOTFOUND
❌ Error checking user admin@billing.com: getaddrinfo ENOTFOUND
❌ Error initializing RBAC: getaddrinfo ENOTFOUND
❌ Database connection check failed: getaddrinfo ENOTFOUND
```

**All operations fail!**

**Fix**: Stop server (Ctrl+C), restore Supabase, wait 3-5 minutes, then restart.

---

## ✅ **Summary**

**Always check database before starting**:
```bash
npm run pre-start
```

**Only start server after check passes**:
```bash
npm start
```

**This prevents all ENOTFOUND errors!** ✅

