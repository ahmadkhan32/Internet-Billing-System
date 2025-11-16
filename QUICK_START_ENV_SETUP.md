# ⚡ Quick Start: Create .env File & Set DB_PASSWORD in Vercel

## 🎯 Two Simple Steps

### Step 1: Create .env File (Local)

1. **Go to:** `backend` folder
2. **Copy** `env.template` file
3. **Rename** to `.env` (remove `.template`)
4. **Open** `.env` file
5. **Fill in** your database password:
   ```
   DB_PASSWORD=your_actual_password_here
   ```
6. **Save** the file

**See `CREATE_ENV_FILE.md` for detailed instructions.**

---

### Step 2: Set DB_PASSWORD in Vercel

1. **Go to:** https://vercel.com → Your Project
2. **Click:** Settings → Environment Variables
3. **Click:** "Add New"
4. **Enter:**
   - Key: `DB_PASSWORD`
   - Value: Your database password (same as in .env file)
   - Environments: ✅ Production, ✅ Preview
5. **Click:** "Save"
6. **Redeploy:** Deployments → Latest → Redeploy

**See `SET_DB_PASSWORD_VERCEL_STEP_BY_STEP.md` for detailed instructions.**

---

## ✅ That's It!

After Step 2, your app will work! 🎉

---

## 📋 Quick Checklist

- [ ] Created `.env` file in `backend` folder
- [ ] Filled in `DB_PASSWORD` in `.env` file
- [ ] Added `DB_PASSWORD` in Vercel
- [ ] Set for Production environment
- [ ] Redeployed in Vercel
- [ ] Tested `/api/diagnose` - shows `DB_PASSWORD: "✅ SET"`

---

## 🔍 Need Help?

- **Creating .env file:** See `CREATE_ENV_FILE.md`
- **Setting in Vercel:** See `SET_DB_PASSWORD_VERCEL_STEP_BY_STEP.md`
- **Getting password:** Check your database provider dashboard

---

**Remember:**
- ✅ `.env` file is for local development
- ✅ Vercel environment variables are for production
- ✅ Use the same password value in both places

