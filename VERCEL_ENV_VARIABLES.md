# 🔐 Vercel Environment Variables - Copy & Paste

## 📋 Required Environment Variables for Vercel

Copy these and paste into Vercel Dashboard → Settings → Environment Variables:

---

### Database Configuration (Supabase)

```
DB_DIALECT=postgres
DB_HOST=db.qppdkzzmijjyoihzfdxw.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=3oqj6vL2Tr5BZLaf
DB_NAME=postgres
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

---

### JWT Configuration

```
JWT_SECRET=2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be
JWT_EXPIRE=7d
```

---

### Application Configuration

```
NODE_ENV=production
VERCEL=1
FRONTEND_URL=https://your-app-name.vercel.app
```

**Note**: Update `FRONTEND_URL` after first deployment with your actual Vercel URL.

---

## 📝 How to Add in Vercel

1. **Go to**: Vercel Dashboard → Your Project
2. **Click**: Settings → Environment Variables
3. **Add each variable**:
   - Key: `DB_DIALECT`
   - Value: `postgres`
   - Environment: Production, Preview, Development (select all)
   - Click "Save"
4. **Repeat** for all variables above
5. **Redeploy** after adding variables

---

## ⚠️ Important Notes

1. **Never commit `.env` file** - it's already in `.gitignore`
2. **Set variables in Vercel** - they're not in the repository
3. **Redeploy required** - after adding/changing variables
4. **Supabase must be active** - restore if paused before deploying

---

## ✅ Verification

After deployment, check:
```
https://your-app.vercel.app/api/health
https://your-app.vercel.app/api/diagnose
```

Both should show database connected.

---

**Copy the variables above and paste into Vercel!** 🚀

