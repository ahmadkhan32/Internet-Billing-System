# 🔐 Vercel Environment Variables Setup Guide

## 📋 Required Environment Variables

You **MUST** set these environment variables in Vercel for the application to work:

### 1. Database Configuration (REQUIRED)

```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```

**Examples:**
- **PlanetScale:** `DB_HOST=aws.connect.psdb.cloud`
- **AWS RDS:** `DB_HOST=your-db.xxxxx.us-east-1.rds.amazonaws.com`
- **Railway:** `DB_HOST=containers-us-west-xxx.railway.app`
- **Local/Remote MySQL:** `DB_HOST=your-ip-address` or `your-domain.com`

### 2. Application Configuration (REQUIRED)

```
NODE_ENV=production
JWT_SECRET=your-secret-key-minimum-32-characters-long
```

**JWT_SECRET:** Must be at least 32 characters. Generate one:
```bash
# Linux/Mac
openssl rand -base64 32

# Or use any random string generator
# Example: "my-super-secret-jwt-key-2024-production-xyz123"
```

### 3. Frontend URL (OPTIONAL but Recommended)

```
FRONTEND_URL=https://your-app.vercel.app
```

**Note:** Replace `your-app.vercel.app` with your actual Vercel deployment URL.

---

## 🚀 How to Configure in Vercel

### Step 1: Go to Project Settings

1. Log in to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)

### Step 2: Add Environment Variables

For **EACH** variable:

1. Click **"Add New"** button
2. Enter the **Key** (variable name)
3. Enter the **Value** (variable value)
4. Select environments:
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development** (optional)
5. Click **"Save"**

### Step 3: Add All Required Variables

Add these variables one by one:

#### Variable 1: NODE_ENV
```
Key: NODE_ENV
Value: production
Environments: Production, Preview, Development
```

#### Variable 2: DB_HOST
```
Key: DB_HOST
Value: your-actual-database-host
Environments: Production, Preview, Development
```

#### Variable 3: DB_USER
```
Key: DB_USER
Value: your-actual-database-username
Environments: Production, Preview, Development
```

#### Variable 4: DB_PASSWORD
```
Key: DB_PASSWORD
Value: your-actual-database-password
Environments: Production, Preview, Development
```

#### Variable 5: DB_NAME
```
Key: DB_NAME
Value: your-actual-database-name
Environments: Production, Preview, Development
```

#### Variable 6: JWT_SECRET
```
Key: JWT_SECRET
Value: your-32-character-secret-key
Environments: Production, Preview, Development
```

#### Variable 7: FRONTEND_URL (Optional)
```
Key: FRONTEND_URL
Value: https://your-app.vercel.app
Environments: Production, Preview, Development
```

### Step 4: Redeploy

**IMPORTANT:** After adding environment variables:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

---

## 📸 Visual Guide

### Vercel Dashboard Navigation:
```
Vercel Dashboard
  └── Your Project
      └── Settings
          └── Environment Variables
              └── Add New
```

### Environment Variable Form:
```
┌─────────────────────────────────────┐
│ Key: DB_HOST                        │
│ Value: [your-database-host]         │
│                                     │
│ Environments:                       │
│ ☑ Production                        │
│ ☑ Preview                           │
│ ☐ Development                       │
│                                     │
│ [Save] [Cancel]                    │
└─────────────────────────────────────┘
```

---

## 🔍 Common Database Providers

### PlanetScale
```
DB_HOST=aws.connect.psdb.cloud
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

### AWS RDS
```
DB_HOST=your-db.xxxxx.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

### Railway
```
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=railway
```

### DigitalOcean Managed Database
```
DB_HOST=your-db-do-user-xxx.db.ondigitalocean.com
DB_USER=doadmin
DB_PASSWORD=your-password
DB_NAME=defaultdb
```

### Self-Hosted MySQL
```
DB_HOST=your-server-ip-or-domain.com
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

---

## ✅ Verification Checklist

After setting up environment variables:

- [ ] All 6 required variables are added
- [ ] Variables are set for Production and Preview environments
- [ ] Database credentials are correct
- [ ] JWT_SECRET is at least 32 characters
- [ ] Deployment has been redeployed after adding variables
- [ ] Test health endpoint: `https://your-app.vercel.app/api/health`

---

## 🐛 Troubleshooting

### Error: "Missing required environment variables"

**Solution:**
1. Check that all variables are added in Vercel
2. Ensure variables are set for the correct environment (Production/Preview)
3. Redeploy after adding variables

### Error: "Database connection failed"

**Solution:**
1. Verify database credentials are correct
2. Check database allows connections from Vercel IPs
3. Ensure database is accessible from the internet
4. Check firewall rules

### Error: "JWT_SECRET is not set"

**Solution:**
1. Add JWT_SECRET environment variable
2. Ensure it's at least 32 characters long
3. Redeploy after adding

### Variables Not Working After Adding

**Solution:**
1. **Redeploy** - Variables only apply to new deployments
2. Go to Deployments → Latest → Redeploy
3. Wait for deployment to complete

---

## 🔒 Security Best Practices

1. **Never commit** `.env` files to Git
2. **Use strong passwords** for database
3. **Rotate JWT_SECRET** periodically
4. **Use different credentials** for Production and Preview
5. **Restrict database access** to Vercel IPs only

---

## 📝 Quick Reference

**Minimum Required Variables:**
```
NODE_ENV=production
DB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-database
JWT_SECRET=your-32-char-secret
```

**After Adding Variables:**
1. ✅ Save all variables
2. ✅ Redeploy project
3. ✅ Test health endpoint
4. ✅ Check function logs for errors

---

**Need Help?** Check Vercel Function Logs for detailed error messages!

