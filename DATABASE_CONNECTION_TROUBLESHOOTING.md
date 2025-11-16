# 🔧 Database Connection Failed - Complete Troubleshooting Guide

## ❌ Error Message
```
Database connection failed. Please check your database configuration and ensure database is accessible from Vercel.
```

## 🔍 Common Causes & Solutions

### 1. Missing Environment Variables ⚠️ MOST COMMON

**Check:** Go to Vercel → Settings → Environment Variables

**Required Variables:**
- `DB_HOST` - Your database host (e.g., `aws.connect.psdb.cloud`)
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password (must be non-empty in production)
- `DB_NAME` - Database name

**Fix:** Add missing variables and **redeploy**

---

### 2. Database Firewall/Network Access 🔥 VERY COMMON

**Problem:** Database doesn't allow connections from Vercel IPs

**Symptoms:**
- Connection timeout
- `ECONNREFUSED` error
- Works locally but fails on Vercel

**Solution:**

#### For PlanetScale:
1. Go to PlanetScale Dashboard
2. Select your database
3. Go to **Settings** → **Connectivity**
4. Enable **"Allow connections from anywhere"**
5. Or add IP ranges (but Vercel uses dynamic IPs)

#### For AWS RDS:
1. Go to AWS RDS Console
2. Select your database instance
3. Go to **Connectivity & security** tab
4. Click on **Security groups**
5. Edit **Inbound rules**
6. Add rule:
   - Type: `MySQL/Aurora`
   - Port: `3306`
   - Source: `0.0.0.0/0` (allows all IPs)
7. Save

#### For Railway:
1. Go to Railway Dashboard
2. Select your database service
3. Go to **Settings**
4. Enable **"Public Networking"**
5. Save

#### For DigitalOcean:
1. Go to DigitalOcean Dashboard
2. Select your database
3. Go to **Settings** → **Trusted Sources**
4. Add `0.0.0.0/0` (allows all IPs)
5. Save

#### For Other Providers:
- Check database firewall/security settings
- Allow connections from `0.0.0.0/0` (all IPs)
- Vercel uses dynamic IPs, so IP whitelisting won't work

---

### 3. SSL/TLS Configuration 🔒

**Problem:** Cloud databases require SSL, but it's not configured

**Symptoms:**
- SSL certificate errors
- Connection fails with SSL-related messages

**Solution:**

The code **automatically enables SSL** for:
- PlanetScale (`.psdb.cloud`)
- AWS RDS (`.rds.amazonaws.com`)
- Railway (`.railway.app`)
- Any database when `NODE_ENV=production` or `VERCEL=1`

**If you need to disable SSL** (not recommended):
- Set `DB_SSL=false` in environment variables
- **Warning:** Only do this for local development or databases that don't support SSL

**If you have SSL certificate issues:**
- Most cloud databases use public CA certificates (automatically trusted)
- If using custom certificates, you may need to configure them
- Check database provider documentation

---

### 4. Incorrect Database Credentials 🔐

**Problem:** Wrong username, password, or database name

**Symptoms:**
- `Access denied for user`
- `Unknown database`
- Authentication errors

**Solution:**

1. **Verify credentials:**
   - Test connection locally:
     ```bash
     mysql -h your-host -u your-user -p your-database
     ```

2. **Check in Vercel:**
   - Go to Settings → Environment Variables
   - Verify:
     - `DB_HOST` is correct (no typos)
     - `DB_USER` is correct
     - `DB_PASSWORD` is correct (no extra spaces)
     - `DB_NAME` exists and is correct

3. **Common mistakes:**
   - Extra spaces in values
   - Wrong database name
   - User doesn't have remote access permissions
   - Password has special characters that need escaping

---

### 5. Database Not Running or Unavailable 🚫

**Problem:** Database service is down or not accessible

**Symptoms:**
- Connection timeout
- `ECONNREFUSED`
- Service unavailable errors

**Solution:**

1. **Check database status:**
   - Go to your database provider dashboard
   - Verify database is running
   - Check for any service outages

2. **Test connection:**
   ```bash
   # Test from your local machine
   mysql -h your-host -u your-user -p your-database
   
   # Or use telnet to test port
   telnet your-host 3306
   ```

3. **If local connection works but Vercel doesn't:**
   - It's a firewall/network issue (see #2)

---

### 6. Database User Permissions 👤

**Problem:** Database user doesn't have proper permissions

**Symptoms:**
- Connection succeeds but queries fail
- Permission denied errors

**Solution:**

1. **Grant proper permissions:**
   ```sql
   -- Connect to MySQL as admin
   GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'%';
   FLUSH PRIVILEGES;
   ```

2. **For remote connections:**
   ```sql
   -- Allow user to connect from any host
   CREATE USER 'your_user'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'%';
   FLUSH PRIVILEGES;
   ```

---

## 📋 Step-by-Step Diagnostic Process

### Step 1: Verify Environment Variables

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Verify all 4 variables are set:
   - ✅ `DB_HOST`
   - ✅ `DB_USER`
   - ✅ `DB_PASSWORD`
   - ✅ `DB_NAME`

**If any are missing:** Add them and redeploy

---

### Step 2: Test Database Connection Locally

```bash
# Test MySQL connection
mysql -h your-db-host -u your-db-user -p your-db-name
```

**If this fails:**
- Credentials are wrong
- Database is not accessible
- Fix credentials first

**If this works:**
- Credentials are correct
- Issue is likely firewall/network (see Step 3)

---

### Step 3: Check Database Firewall

**For each database provider:**

1. **PlanetScale:**
   - Settings → Connectivity → Allow connections from anywhere

2. **AWS RDS:**
   - Security Groups → Inbound Rules → Allow 3306 from 0.0.0.0/0

3. **Railway:**
   - Settings → Public Networking → Enable

4. **DigitalOcean:**
   - Settings → Trusted Sources → Add 0.0.0.0/0

**Important:** Vercel uses dynamic IPs, so you must allow all IPs (0.0.0.0/0)

---

### Step 4: Check Vercel Function Logs

1. Go to **Vercel Dashboard** → Your Project
2. Click **Functions** tab
3. Click on `api/index.js`
4. Check **Logs** for detailed error messages

**Look for:**
- Specific error codes
- SSL errors
- Connection timeout
- Authentication errors

---

### Step 5: Verify SSL Configuration

**The code automatically enables SSL for:**
- Cloud databases (PlanetScale, AWS RDS, Railway)
- Production environments

**If you see SSL errors:**
1. Verify your database supports SSL
2. Check database provider documentation
3. If needed, set `DB_SSL=false` (not recommended for production)

---

## 🎯 Quick Fix Checklist

- [ ] All 4 environment variables are set in Vercel
- [ ] Variables are set for **Production** environment
- [ ] **Redeployed** after adding variables
- [ ] Database firewall allows connections from `0.0.0.0/0`
- [ ] Database credentials are correct
- [ ] Database is running and accessible
- [ ] Tested connection locally (works)
- [ ] Checked Vercel function logs for specific errors

---

## 🔍 Specific Error Messages

### "ECONNREFUSED"
- **Cause:** Database firewall blocking connections
- **Fix:** Allow connections from `0.0.0.0/0`

### "Access denied for user"
- **Cause:** Wrong credentials or user permissions
- **Fix:** Verify credentials and user permissions

### "Unknown database"
- **Cause:** Database name is wrong or doesn't exist
- **Fix:** Verify `DB_NAME` is correct

### "SSL connection error"
- **Cause:** SSL configuration issue
- **Fix:** SSL is auto-enabled for cloud databases. Check provider docs.

### "Connection timeout"
- **Cause:** Database not accessible or firewall blocking
- **Fix:** Check firewall and database accessibility

---

## 📞 Still Not Working?

1. **Check Vercel Function Logs:**
   - Vercel Dashboard → Functions → api/index.js → Logs
   - Look for specific error messages

2. **Test Connection Locally:**
   ```bash
   mysql -h your-host -u your-user -p your-database
   ```

3. **Verify Database Provider Status:**
   - Check provider status page
   - Verify database is running

4. **Contact Database Provider Support:**
   - If database is not accessible
   - If firewall configuration is unclear

---

## ✅ Success Indicators

When everything is working:
- ✅ Health endpoint: `/api/health` shows `{"status": "OK", "database": "connected"}`
- ✅ Login works successfully
- ✅ No connection errors in Vercel logs
- ✅ Database queries execute successfully

---

**The most common issue is database firewall blocking Vercel IPs. Make sure to allow connections from `0.0.0.0/0`!**

