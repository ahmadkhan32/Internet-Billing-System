# 🌐 Setup ngrok with XAMPP for Vercel - Complete Guide

## ⚠️ Important Notes

- **This is for testing only, not production!**
- Your computer must be on 24/7
- ngrok free tier changes URL every restart
- Security risk - exposes your local database
- **Recommended:** Use cloud database instead (see `MIGRATE_XAMPP_TO_CLOUD.md`)

---

## 📋 STEP 1: Install ngrok

### Option A: Download (Recommended)

1. **Go to:** https://ngrok.com/download
2. **Download** for Windows
3. **Extract** the zip file
4. **Place** `ngrok.exe` in a folder (e.g., `C:\ngrok\`)

### Option B: Using npm

```bash
npm install -g ngrok
```

---

## 📋 STEP 2: Start MySQL in XAMPP

1. **Open XAMPP Control Panel**
2. **Start MySQL** (click "Start" button)
3. **Verify** it's running (should show green "Running")
4. **Note:** MySQL usually runs on port `3306`

---

## 📋 STEP 3: Create ngrok Tunnel

### Option A: Using ngrok.exe

1. **Open Command Prompt or PowerShell**
2. **Navigate** to ngrok folder:
   ```bash
   cd C:\ngrok
   ```
   (Or wherever you placed ngrok.exe)

3. **Create TCP tunnel:**
   ```bash
   ngrok tcp 3306
   ```

### Option B: Using npm ngrok

```bash
ngrok tcp 3306
```

### What You'll See:

```
ngrok

Session Status                online
Account                       (your account)
Version                       3.x.x
Region                        United States (us)
Latency                       45ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    tcp://0.tcp.ngrok.io:12345 -> localhost:3306

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**Important:** Copy the forwarding address:
- **Host:** `0.tcp.ngrok.io` (or similar)
- **Port:** `12345` (the number after the colon)

---

## 📋 STEP 4: Configure XAMPP MySQL for Remote Access

### Step 4.1: Allow Remote Connections

1. **Open phpMyAdmin:** http://localhost/phpmyadmin
2. **Click** "SQL" tab
3. **Run this SQL:**
   ```sql
   CREATE USER 'root'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   ```
   (Replace `your_password` with your MySQL root password)

4. **Or** if you want to use existing user:
   ```sql
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your_password';
   FLUSH PRIVILEGES;
   ```

### Step 4.2: Configure MySQL to Listen on All Interfaces

1. **Open:** `C:\xampp\mysql\bin\my.ini` (or `my.cnf`)
2. **Find** the line: `bind-address = 127.0.0.1`
3. **Change** to: `bind-address = 0.0.0.0`
4. **Save** the file
5. **Restart** MySQL in XAMPP

**⚠️ Security Warning:** This allows connections from anywhere. Only do this if you understand the risks!

---

## 📋 STEP 5: Update Vercel Environment Variables

1. **Go to:** https://vercel.com → Your Project
2. **Settings** → **Environment Variables**
3. **Update/Add these variables:**

   **DB_HOST:**
   - Key: `DB_HOST`
   - Value: `0.tcp.ngrok.io` (your ngrok hostname)
   - Environments: ✅ Production, ✅ Preview

   **DB_PORT:**
   - Key: `DB_PORT`
   - Value: `12345` (your ngrok port)
   - Environments: ✅ Production, ✅ Preview

   **DB_USER:**
   - Key: `DB_USER`
   - Value: `root` (or your MySQL username)
   - Environments: ✅ Production, ✅ Preview

   **DB_PASSWORD:**
   - Key: `DB_PASSWORD`
   - Value: Your MySQL password
   - Environments: ✅ Production, ✅ Preview

   **DB_NAME:**
   - Key: `DB_NAME`
   - Value: Your database name (e.g., `internet_billing_db`)
   - Environments: ✅ Production, ✅ Preview

   **DB_SSL:**
   - Key: `DB_SSL`
   - Value: `false` (ngrok doesn't use SSL)
   - Environments: ✅ Production, ✅ Preview

   **NODE_ENV:**
   - Key: `NODE_ENV`
   - Value: `production`
   - Environments: ✅ Production, ✅ Preview

   **JWT_SECRET:**
   - Key: `JWT_SECRET`
   - Value: Random 32+ character string
   - Environments: ✅ Production, ✅ Preview

4. **Save** each variable

---

## 📋 STEP 6: Redeploy in Vercel

1. **Go to:** Deployments tab
2. **Latest deployment** → "..." → "Redeploy"
3. **Wait** 2-5 minutes

---

## 📋 STEP 7: Test Connection

1. **Visit:** `https://your-app.vercel.app/api/diagnose`
2. **Should show:**
   ```json
   {
     "environmentVariables": {
       "DB_HOST": "0.tcp.ngrok.io...",
       "DB_PORT": "12345",
       "DB_PASSWORD": "✅ SET"
     },
     "connectionTest": {
       "status": "SUCCESS"
     }
   }
   ```

3. **Test login:**
   - Go to: `https://your-app.vercel.app`
   - Login: `admin@billing.com` / `admin123`
   - Should redirect to dashboard ✅

---

## ⚠️ Important Warnings

### ngrok Free Tier Limitations:

1. **URL Changes Every Restart:**
   - Every time you restart ngrok, you get a new URL
   - You must update `DB_HOST` and `DB_PORT` in Vercel each time
   - Very inconvenient!

2. **Computer Must Be On 24/7:**
   - If your computer turns off, Vercel can't connect
   - App will fail

3. **Slow Connection:**
   - ngrok adds latency
   - Much slower than cloud database

4. **Security Risk:**
   - Exposes your local database to internet
   - Anyone with ngrok URL can try to connect

### ngrok Paid Tier:

- **Fixed URL:** Costs money but gives you a fixed URL
- **Better performance:** Still slower than cloud database
- **Still requires:** Computer on 24/7

---

## 🔄 Keeping ngrok Running

### Option 1: Keep Terminal Open

- Keep the terminal/command prompt open
- Don't close it
- ngrok will keep running

### Option 2: Run as Service (Windows)

1. **Use NSSM** (Non-Sucking Service Manager)
2. **Install ngrok as Windows service**
3. **Runs automatically on startup**

### Option 3: Use ngrok Authtoken (Free)

1. **Sign up** for free ngrok account: https://dashboard.ngrok.com
2. **Get authtoken**
3. **Configure:**
   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```
4. **Still changes URL** on free tier, but more stable

---

## 📋 Quick Checklist

- [ ] ngrok installed
- [ ] MySQL running in XAMPP
- [ ] ngrok tunnel created (`ngrok tcp 3306`)
- [ ] Copied ngrok hostname and port
- [ ] MySQL configured for remote access
- [ ] Updated Vercel environment variables:
  - [ ] `DB_HOST` = ngrok hostname
  - [ ] `DB_PORT` = ngrok port
  - [ ] `DB_USER` = MySQL username
  - [ ] `DB_PASSWORD` = MySQL password
  - [ ] `DB_NAME` = Database name
  - [ ] `DB_SSL` = `false`
- [ ] Redeployed in Vercel
- [ ] Tested `/api/diagnose` - shows connected
- [ ] Tested login - works and redirects to dashboard

---

## 🆘 Troubleshooting

### Problem: "Connection refused"

**Solution:**
- Make sure MySQL is running in XAMPP
- Make sure ngrok is running
- Check MySQL is listening on `0.0.0.0` (not just `127.0.0.1`)

### Problem: "Access denied"

**Solution:**
- Check MySQL user has permissions for remote connections
- Verify password is correct
- Run the GRANT SQL commands in Step 4.1

### Problem: ngrok URL changed

**Solution:**
- Update `DB_HOST` and `DB_PORT` in Vercel
- Redeploy
- Or get ngrok paid plan for fixed URL

### Problem: Connection timeout

**Solution:**
- Check your internet connection
- Make sure ngrok is still running
- Verify firewall isn't blocking ngrok

---

## ✅ After Setup

**Your app will:**
- ✅ Connect to XAMPP MySQL through ngrok
- ✅ Work on Vercel
- ✅ Login and redirect to dashboard

**But remember:**
- ⚠️ Computer must stay on
- ⚠️ ngrok must keep running
- ⚠️ URL changes on restart (free tier)
- ⚠️ Not production-ready

---

## 🎯 Recommendation

**For production, use a cloud database instead:**
- ✅ Always available
- ✅ Fast and reliable
- ✅ Secure
- ✅ Free tier available

**See `MIGRATE_XAMPP_TO_CLOUD.md` for migration guide!**

---

**This setup works, but cloud database is much better!**

