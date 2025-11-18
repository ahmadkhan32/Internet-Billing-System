# 🎯 Most Important Environment Variables for Vercel

## ⚠️ Minimum Required (Must Have)

These are the **ABSOLUTE MINIMUM** to get your app running:

### Backend (9 Critical):

1. **`DB_DIALECT`** = `postgres`
2. **`DB_HOST`** = `db.qppdkzzmijjyoihzfdxw.supabase.co`
3. **`DB_USER`** = `postgres`
4. **`DB_PASSWORD`** = `3oqj6vL2Tr5BZLaf`
5. **`DB_NAME`** = `postgres`
6. **`DB_SSL`** = `true`
7. **`DB_SSL_REJECT_UNAUTHORIZED`** = `false`
8. **`JWT_SECRET`** = `2dc998eb35cb110e2f5d8a076e9f40875cbd2fc403db53b8d593eb1460b1b3be`
9. **`FRONTEND_URL`** = `https://your-frontend.vercel.app`

### Frontend (1 Critical):

1. **`VITE_API_BASE_URL`** = `https://your-backend.vercel.app`

---

## ✅ Recommended (Should Have)

These improve functionality but aren't critical:

- `DB_PORT` = `5432`
- `JWT_EXPIRE` = `7d`
- `NODE_ENV` = `production`
- `PORT` = `8000`
- `VERCEL` = `1`

---

## 📋 Priority Order

### Set These First (Database Connection):
1. `DB_DIALECT`
2. `DB_HOST`
3. `DB_USER`
4. `DB_PASSWORD`
5. `DB_NAME`
6. `DB_SSL`
7. `DB_SSL_REJECT_UNAUTHORIZED`

### Then Set (Authentication):
8. `JWT_SECRET`
9. `JWT_EXPIRE`

### Then Set (CORS):
10. `FRONTEND_URL` (backend)
11. `VITE_API_BASE_URL` (frontend)

### Finally Set (Optional):
12. `NODE_ENV`
13. `PORT`
14. `VERCEL`
15. `DB_PORT`

---

## 🚀 Quick Start

**Minimum to Deploy:**
- Set the 9 backend variables above
- Set the 1 frontend variable above
- Deploy!

**Everything else can be added later.**

---

**See `VERCEL_ENV_VARIABLES_CORRECT.md` for complete list with correct format.**

