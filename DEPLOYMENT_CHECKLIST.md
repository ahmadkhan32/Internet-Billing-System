# ✅ Complete Deployment Checklist

## 🚨 CRITICAL: Before Deploying

### 1. Set Environment Variables in Vercel ⚠️ REQUIRED

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Add ALL 6 variables:**

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `DB_HOST` | Your database host | `aws.connect.psdb.cloud` |
| `DB_USER` | Your database username | `root` or `admin` |
| `DB_PASSWORD` | Your database password | `your-password` |
| `DB_NAME` | Your database name | `billing_db` |
| `JWT_SECRET` | Random 32+ character string | `my-secret-key-2024-xyz123` |

**For EACH variable:**
1. Click **"Add New"**
2. Enter **Key** (variable name)
3. Enter **Value** (your actual value)
4. ✅ Check **Production**
5. ✅ Check **Preview**
6. Click **"Save"**

**⚠️ IMPORTANT:** 
- Replace ALL placeholder values with your ACTUAL database credentials
- `JWT_SECRET` must be at least 32 characters long
- You can generate one: `openssl rand -base64 32`

### 2. Verify Code is Pushed ✅

Code is already pushed to GitHub:
- Repository: `https://github.com/ahmadkhan32/Internet-Billing-System.git`
- Latest commit: `e060d4e` - Fix mysql2 installation issue

### 3. Deploy/Redeploy on Vercel

1. **Go to:** https://vercel.com
2. **Select your project**
3. **Click "Deployments"** tab
4. **Click "..."** on latest deployment
5. **Click "Redeploy"**
6. **Wait for build** (2-5 minutes)

### 4. Check Build Logs

During deployment, verify:
- ✅ `cd backend && npm install` runs successfully
- ✅ `mysql2` package is installed
- ✅ No errors about missing packages
- ✅ Frontend builds successfully

### 5. Test Deployment

#### Health Check:
```
https://your-app.vercel.app/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

#### Login Test:
1. Go to: `https://your-app.vercel.app`
2. Email: `admin@billing.com`
3. Password: `admin123`
4. Should redirect to dashboard ✅

## 🐛 Troubleshooting

### Error: "Please install mysql2 package manually"

**Solution:**
1. Check build logs - verify `npm install` ran in backend directory
2. Verify `backend/package.json` has `mysql2` in dependencies
3. Ensure `vercel.json` has correct install command
4. Redeploy after fixing

### Error: "Missing required environment variables"

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Add ALL 6 required variables
3. Ensure they're set for Production environment
4. **Redeploy** after adding variables

### Error: "Database connection failed"

**Solution:**
1. Verify database credentials are correct
2. Check database allows connections from Vercel IPs
3. Ensure database is accessible from internet
4. Test connection from your local machine first

### Error: "JWT_SECRET not configured"

**Solution:**
1. Add `JWT_SECRET` environment variable
2. Must be at least 32 characters
3. Redeploy after adding

## 📋 Post-Deployment Checklist

- [ ] Environment variables are set
- [ ] Build completed successfully
- [ ] Health endpoint returns OK
- [ ] Database connection works
- [ ] Login works with default credentials
- [ ] Dashboard loads after login
- [ ] No errors in Vercel Function Logs

## 🔍 Verify Everything Works

### 1. Check Function Logs:
- Vercel Dashboard → Functions → `api/index.js` → Logs
- Should see: `✅ Database connection verified`
- No error messages

### 2. Test API Endpoints:
- Health: `/api/health` ✅
- Login: `/api/auth/login` ✅

### 3. Test Frontend:
- Homepage loads ✅
- Login form works ✅
- Redirects to dashboard ✅

## 📝 Default Login Credentials

All users use password: `admin123`

- **Super Admin:** `admin@billing.com`
- **ISP Admin:** `ispadmin@billing.com`
- **Account Manager:** `accountmanager@billing.com`
- **Technical Officer:** `technical@billing.com`
- **Recovery Officer:** `recovery@billing.com`
- **Customer:** `customer@billing.com`

---

## 🆘 Still Having Issues?

1. **Check Vercel Function Logs** - Most important!
2. **Review Build Logs** - Look for errors
3. **Verify Environment Variables** - All 6 are set?
4. **Test Database Connection** - Works from local machine?
5. **Check Error Response** - API returns detailed error info

---

**Status:** ✅ Ready for deployment  
**Next Step:** Set environment variables and redeploy!

