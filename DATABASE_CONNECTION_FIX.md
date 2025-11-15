# 🔧 Database Connection Failed - Complete Fix Guide

## ❌ Error Message
```
Database connection failed. Please check your database configuration.
```

## 🔍 Common Causes

### 1. Missing Environment Variables ⚠️ MOST COMMON

**Symptoms:**
- Error shows "Missing environment variables"
- Login fails with database connection error
- Health endpoint shows database disconnected

**Fix:**
1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Add these **4 required variables**:

```
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```

**For each variable:**
- ✅ Check **Production**
- ✅ Check **Preview**
- Click **Save**

4. **Redeploy** after adding variables

### 2. Incorrect Database Credentials

**Symptoms:**
- Error: "Access denied for user"
- Error: "Unknown database"
- Connection timeout

**Fix:**
1. Verify credentials are correct:
   - Check database host is correct
   - Verify username and password
   - Ensure database name exists

2. Test connection locally:
   ```bash
   mysql -h your-host -u your-user -p your-database
   ```

3. Update environment variables in Vercel if needed
4. Redeploy

### 3. Database Not Accessible from Internet

**Symptoms:**
- Connection timeout
- "Host not reachable" error
- Works locally but not on Vercel

**Fix:**
1. **Check Database Firewall:**
   - Ensure database allows connections from anywhere (0.0.0.0/0)
   - Or add Vercel IP ranges to allowlist

2. **Vercel IP Ranges:**
   - Vercel uses dynamic IPs
   - Most cloud databases need to allow all IPs (0.0.0.0/0)
   - Check your database provider's documentation

3. **Database Provider Settings:**
   - **PlanetScale:** Enable "Allow connections from anywhere"
   - **AWS RDS:** Update security group to allow inbound connections
   - **Railway:** Should work by default
   - **DigitalOcean:** Update firewall rules

### 4. Database Not Running

**Symptoms:**
- Connection refused
- Timeout errors

**Fix:**
1. Check if database is running
2. Verify database service is active
3. Check database provider status page

## 📋 Step-by-Step Fix

### Step 1: Verify Environment Variables

**Check in Vercel:**
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Verify all 4 database variables are set:
   - `DB_HOST` ✅
   - `DB_USER` ✅
   - `DB_PASSWORD` ✅
   - `DB_NAME` ✅

**If missing:**
- Add them (see above)
- Redeploy

### Step 2: Test Database Connection

**Test locally first:**
```bash
# Using MySQL client
mysql -h your-db-host -u your-user -p your-database

# Or using Node.js
node -e "const mysql = require('mysql2'); const conn = mysql.createConnection({host: 'your-host', user: 'your-user', password: 'your-password', database: 'your-db'}); conn.connect((err) => { if (err) console.error(err); else console.log('Connected!'); conn.end(); });"
```

**If local connection works but Vercel doesn't:**
- Database firewall issue
- See Step 3

### Step 3: Configure Database Firewall

**For Cloud Databases:**

1. **PlanetScale:**
   - Go to database settings
   - Enable "Allow connections from anywhere"
   - Or add specific IP ranges

2. **AWS RDS:**
   - Go to RDS Console → Security Groups
   - Add inbound rule:
     - Type: MySQL/Aurora
     - Port: 3306
     - Source: 0.0.0.0/0 (or specific IPs)

3. **Railway:**
   - Should work by default
   - Check "Public Networking" is enabled

4. **DigitalOcean:**
   - Go to Database → Settings → Trusted Sources
   - Add 0.0.0.0/0 or specific IPs

### Step 4: Verify Database Credentials

**Double-check:**
- Host: Correct database host URL
- User: Correct username
- Password: Correct password (no extra spaces)
- Database: Database name exists

**Common mistakes:**
- Extra spaces in values
- Wrong host (localhost vs remote host)
- Database name typo
- Password with special characters not escaped

### Step 5: Redeploy

**After fixing:**
1. Go to Vercel Dashboard
2. Deployments → Latest
3. Click "..." → "Redeploy"
4. Wait for deployment
5. Test again

## 🔍 Debugging

### Check Vercel Function Logs:

1. Go to Vercel Dashboard → Your Project
2. Click **Functions** → `api/index.js`
3. Check logs for:
   - `❌ Unable to connect to the database`
   - Connection details (host, user, database)
   - Specific error messages

### Check Health Endpoint:

```
https://your-app.vercel.app/api/health
```

**If database disconnected:**
- Check environment variables
- Verify database is accessible
- Check firewall settings

### Test Database Connection:

**From your local machine:**
```bash
# Test MySQL connection
mysql -h your-db-host -u your-user -p your-database
```

**If this works but Vercel doesn't:**
- Firewall/security group issue
- Database not allowing external connections

## 📝 Database Provider Guides

### PlanetScale
```
DB_HOST=aws.connect.psdb.cloud
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
```
- Enable "Allow connections from anywhere" in settings

### AWS RDS
```
DB_HOST=your-db.xxxxx.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=your-password
DB_NAME=your-database
```
- Update security group to allow inbound MySQL (port 3306)

### Railway
```
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=railway
```
- Should work by default

### DigitalOcean
```
DB_HOST=your-db-do-user-xxx.db.ondigitalocean.com
DB_USER=doadmin
DB_PASSWORD=your-password
DB_NAME=defaultdb
```
- Add trusted sources in database settings

## ✅ Verification Checklist

After fixing:

- [ ] All 4 environment variables are set in Vercel
- [ ] Variables are set for Production environment
- [ ] Database credentials are correct
- [ ] Database firewall allows external connections
- [ ] Database is running and accessible
- [ ] Redeployed after making changes
- [ ] Health endpoint shows database connected
- [ ] Login works successfully

## 🆘 Still Having Issues?

1. **Check Function Logs** - Most important!
   - Look for specific error messages
   - Check connection details shown in logs

2. **Test Locally** - If it works locally but not on Vercel:
   - Database firewall issue
   - Environment variables not set correctly

3. **Contact Database Provider** - If database is not accessible:
   - Check provider status page
   - Verify database is running
   - Check firewall/security settings

---

**Most Common Issue:** Missing environment variables in Vercel!  
**Quick Fix:** Add all 4 database variables and redeploy.

