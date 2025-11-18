# 🧪 Quick Test Guide for Error Handling

## ✅ **Error Handling is Already Implemented!**

This guide shows you how to **test** each error type to verify the error handling is working.

---

## 🚀 **Quick Test Steps**

### **1. Test Network Error**

**Stop your backend server** and try to login:

```bash
# Stop backend (if running locally)
# Or set wrong API URL in Vercel
```

**Expected Result**:
```
Cannot connect to backend API. Please check:
1. Backend is deployed on Vercel
2. API routes are configured correctly
3. Check Vercel function logs for errors
```

---

### **2. Test Route Not Found (404)**

**Set wrong API endpoint** in Vercel:

```
VITE_API_BASE_URL = https://wrong-url.com/api
```

**Or** if backend is running, temporarily change route in backend.

**Expected Result**:
```
Backend API route not found. Please check:
1. VITE_API_BASE_URL is set correctly in Vercel
   - Should end with /api (e.g., https://internet-billing-system.vercel.app/api)
   - OR use /api for same-domain deployment
2. Backend is deployed and accessible
3. API routes are configured correctly

Current API Base URL: https://wrong-url.com/api
Trying to access: /auth/login
Full URL: https://wrong-url.com/api/auth/login
```

---

### **3. Test Database Error (503)**

**Pause your Supabase project**:

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click "Pause Project"
4. Try to login

**Expected Result**:
```
Database connection failed. Please check your database configuration.
Troubleshooting steps:
1. Verify database credentials are correct in Vercel environment variables
2. Check database is accessible from internet (not private network)
3. For Supabase: Verify project is active (not paused) and credentials are correct
4. Check database firewall allows connections from 0.0.0.0/0
5. Verify database is running and not paused

💡 See VERCEL_DEPLOYMENT_READY.md for detailed setup instructions
Technical details: getaddrinfo ENOTFOUND db.xxx.supabase.co
```

**Then restore your Supabase project** (click "Restore Project").

---

### **4. Test Server Init Error (500)**

**Remove backend dependencies** (temporarily):

In `vercel.json`, change:
```json
"installCommand": "cd frontend && npm install"
```

This will cause "Cannot find module 'express'" error.

**Expected Result**:
```
Server initialization error. Please check:
1. Environment variables are set in Vercel
2. Database connection is configured
3. Backend dependencies are installed
4. Check Vercel function logs for details

Error: Cannot find module 'express'
```

**Then restore** the correct `installCommand`.

---

### **5. Test Invalid Credentials (401)**

**Use wrong credentials**:

```
Email: wrong@email.com
Password: wrongpassword
```

**Expected Result**:
```
Invalid email or password
```

---

### **6. Test Valid Login (Success)**

**Use correct credentials**:

```
Email: admin@billing.com
Password: admin123
```

**Expected Result**:
- ✅ Login successful
- ✅ Redirects to `/super-admin/dashboard` (for Super Admin)
- ✅ No error message

---

## 📋 **Visual Verification**

When testing, you should see:

1. **Error Message Box** (red background):
   ```
   ┌─────────────────────────────────────┐
   │ ❌ Error message appears here      │
   │ (red background, red border)       │
   │ Multi-line messages are supported   │
   └─────────────────────────────────────┘
   ```

2. **Console Logs** (for debugging):
   ```
   ❌ Login error: [error details]
   Error response: [response data]
   Error status: [status code]
   ```

3. **Network Tab** (browser DevTools):
   - Shows failed request
   - Shows status code (404, 500, 503, etc.)

---

## ✅ **All Tests Pass Checklist**

After testing, verify:

- [ ] Network error shows clear message
- [ ] 404 error shows API URL troubleshooting
- [ ] 503 error shows database troubleshooting
- [ ] 500 error shows server initialization steps
- [ ] 401 error shows "Invalid email or password"
- [ ] Valid login works and redirects correctly
- [ ] Error messages are readable (multi-line supported)
- [ ] Console shows detailed error info

---

## 🎯 **Summary**

**The error handling is already implemented!** 

Just test each scenario to verify it's working correctly. All error types are handled with user-friendly, actionable messages.

**No code changes needed** - just test and verify! ✅

