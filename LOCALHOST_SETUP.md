# 🚀 Localhost Setup Guide

## ✅ Quick Start

Your project is now configured for localhost development!

## 📋 Prerequisites

1. **Node.js** installed (v16 or higher)
2. **Supabase Database** - Already configured in `.env` file
3. **Ports available:**
   - Backend: `8000`
   - Frontend: `3001`

## 🚀 Running the Project

### Option 1: Run Both Separately (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Option 2: Use Development Mode (Auto-restart)

**Terminal 1 - Backend (with nodemon):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Access the Application

Once both servers are running:

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:8000
- **API Health Check:** http://localhost:8000/api/health

## 🔧 Configuration

### Backend Configuration (`.env` file)

The `.env` file in `backend/` folder is already configured with:
- ✅ Supabase database credentials
- ✅ JWT secret
- ✅ Frontend URL: `http://localhost:3001`
- ✅ Port: `8000`

### Frontend Configuration

- ✅ Port: `3001`
- ✅ API Proxy: `/api` → `http://localhost:8000`
- ✅ Auto-configured in `vite.config.js`

## 🔍 Verify Setup

### 1. Check Backend is Running:
```bash
# Should see:
✅ Database connection established successfully.
🚀 Server running on port 8000
```

### 2. Check Frontend is Running:
```bash
# Should see:
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3001/
```

### 3. Test API Connection:
Open browser: http://localhost:8000/api/health

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

## 🐛 Troubleshooting

### Port Already in Use

**Backend (port 8000):**
```bash
cd backend
npm run kill-port
npm start
```

**Frontend (port 3001):**
- Change port in `frontend/vite.config.js`
- Or kill process: `netstat -ano | findstr :3001`

### Database Connection Failed

1. **Check `.env` file exists:**
   ```bash
   cd backend
   dir .env
   ```

2. **Verify Supabase credentials:**
   - Check `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` in `.env`
   - Verify Supabase project is active

3. **Test connection:**
   ```bash
   cd backend
   npm run test-db
   ```

### Frontend Can't Connect to Backend

1. **Check backend is running:**
   - Open http://localhost:8000/api/health

2. **Check CORS settings:**
   - Backend allows `http://localhost:3001` by default

3. **Check proxy configuration:**
   - Verify `vite.config.js` has correct proxy settings

## 📝 Default Login Credentials

Once database is set up, you can login with:

- **Super Admin:** `admin@billing.com` / `admin123`
- **ISP Admin:** `ispadmin@billing.com` / `admin123`
- **Account Manager:** `accountmanager@billing.com` / `admin123`
- **Technical Officer:** `technical@billing.com` / `admin123`
- **Recovery Officer:** `recovery@billing.com` / `admin123`
- **Customer:** `customer@billing.com` / `admin123`

## 🎯 Next Steps

1. **Run database migrations** (if not done):
   - Go to Supabase SQL Editor
   - Run `supabase/migrations/001_initial_schema.sql`
   - (Optional) Run `supabase/seed.sql` for initial data

2. **Start both servers:**
   - Backend: `cd backend && npm start`
   - Frontend: `cd frontend && npm run dev`

3. **Open browser:**
   - Go to http://localhost:3001
   - Login with default credentials

## ✅ Success!

You should now see:
- ✅ Backend running on port 8000
- ✅ Frontend running on port 3001
- ✅ Database connected
- ✅ Application accessible at http://localhost:3001

---

**Happy coding! 🎉**

