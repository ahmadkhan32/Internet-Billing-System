# ⚡ Quick ngrok Setup with XAMPP - 5 Minutes

## 🚀 Quick Steps

### Step 1: Install & Start ngrok

```bash
# Download from https://ngrok.com/download
# Or: npm install -g ngrok

# Start tunnel
ngrok tcp 3306
```

**Copy the address shown:**
- Host: `0.tcp.ngrok.io` (example)
- Port: `12345` (example)

### Step 2: Configure XAMPP MySQL

1. **Open phpMyAdmin:** http://localhost/phpmyadmin
2. **SQL tab** → Run:
   ```sql
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your_password';
   FLUSH PRIVILEGES;
   ```

3. **Edit:** `C:\xampp\mysql\bin\my.ini`
   - Change: `bind-address = 0.0.0.0`
   - Restart MySQL

### Step 3: Set Vercel Environment Variables

**Go to:** Vercel → Settings → Environment Variables

**Add/Update:**
- `DB_HOST` = `0.tcp.ngrok.io` (your ngrok host)
- `DB_PORT` = `12345` (your ngrok port)
- `DB_USER` = `root`
- `DB_PASSWORD` = Your MySQL password
- `DB_NAME` = Your database name
- `DB_SSL` = `false`
- `NODE_ENV` = `production`
- `JWT_SECRET` = Random 32+ chars

### Step 4: Redeploy

1. **Vercel** → Deployments → Latest → Redeploy
2. **Wait** 2-5 minutes

### Step 5: Test

- Visit: `/api/diagnose` → Should show connected ✅
- Login: Should work and redirect to dashboard ✅

---

## ⚠️ Important

- **Keep ngrok running** (don't close terminal)
- **Keep computer on 24/7**
- **URL changes** every ngrok restart (free tier)
- **Update Vercel** if URL changes

---

## ✅ Done!

**Your app now connects to XAMPP through ngrok!**

**See `SETUP_NGROK_WITH_XAMPP.md` for detailed instructions!**

