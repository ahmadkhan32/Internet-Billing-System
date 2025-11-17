# Fix 504 Gateway Timeout Error on Vercel

## Problem
Getting `504 Gateway Timeout` errors when making API requests. This typically happens when:
1. Database connection takes too long
2. Function execution exceeds timeout limit
3. Cold start takes too long

## Solutions

### Solution 1: Check Database Connection (Most Common)

**Issue**: Database connection is slow or timing out.

**Fix**:
1. **Verify Database Credentials** in Vercel Environment Variables:
   ```
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   DB_PORT=3306 (or 5432 for PostgreSQL)
   ```

2. **Check Database Firewall**:
   - Database must allow connections from `0.0.0.0/0` (all IPs)
   - Vercel uses dynamic IPs, so IP whitelisting won't work
   - For Supabase: Go to Settings → Database → Connection Pooling

3. **Test Database Connection**:
   - Use the `/api/health` endpoint to test
   - Check Vercel function logs for connection errors

### Solution 2: Upgrade Vercel Plan (If Needed)

**Free Tier Limits**:
- Function timeout: **10 seconds max**
- Memory: 1024 MB

**Pro Tier**:
- Function timeout: **60 seconds max**
- Better for database connections

**Current Configuration**:
- `vercel.json` is set to 60 seconds (requires Pro plan)
- If on free tier, timeout will be capped at 10 seconds

### Solution 3: Optimize Database Connection

The code has been optimized with:
- Faster connection timeouts (10 seconds)
- Connection pooling (single connection for serverless)
- Retry logic for failed connections

### Solution 4: Check Vercel Function Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click on the deployment
4. Go to "Functions" tab
5. Click on the function that's timing out
6. Check the logs for:
   - Database connection errors
   - Timeout messages
   - Missing environment variables

### Solution 5: Use Connection Pooling (For Supabase)

If using Supabase:
1. Go to Supabase Dashboard
2. Settings → Database
3. Enable "Connection Pooling"
4. Use the pooled connection string:
   ```
   DB_HOST=db.xxxxx.supabase.co
   DB_PORT=6543 (pooled port, not 5432)
   ```

### Solution 6: Add Health Check Endpoint

Test your database connection:
```bash
curl https://your-app.vercel.app/api/health
```

This will show if the database connection is working.

## Quick Checklist

- [ ] Database credentials are correct in Vercel
- [ ] Database firewall allows connections from anywhere (0.0.0.0/0)
- [ ] Database is accessible from the internet
- [ ] All environment variables are set in Vercel
- [ ] Checked Vercel function logs for errors
- [ ] Database connection timeout is reasonable (< 10s for free tier)
- [ ] Using connection pooling if available (Supabase)

## Common Error Messages

### "Connection timeout"
- Database is not accessible
- Firewall blocking connections
- Wrong host/port

### "Access denied"
- Wrong username/password
- User doesn't have permissions

### "Database not found"
- Wrong database name
- Database doesn't exist

## Still Having Issues?

1. **Check Vercel Logs**: Most detailed error info is in function logs
2. **Test Locally**: Run `npm start` locally to see if it works
3. **Database Provider Docs**: Check your database provider's Vercel setup guide
4. **Vercel Support**: Contact Vercel support with function logs

## Configuration Updates Made

✅ Increased function timeout to 60 seconds (requires Pro plan)
✅ Optimized database connection timeouts (10 seconds)
✅ Added timeout handling in API handler
✅ Improved error messages for debugging

---

**Note**: If you're on Vercel free tier, the 10-second timeout limit may cause issues with slow database connections. Consider:
- Using a faster database (Supabase, PlanetScale)
- Enabling connection pooling
- Upgrading to Vercel Pro for 60-second timeout

