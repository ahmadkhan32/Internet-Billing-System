# Port Configuration

The project has been configured to run on different ports:

## 🚀 Ports Used

- **Backend Server**: Port **8000** (changed from 5000)
- **Frontend Server**: Port **3001** (changed from 3000)

## 📝 Configuration Files Updated

### Backend
- `backend/server.js` - Default port changed to 8000
- CORS origin updated to http://localhost:3001

### Frontend
- `frontend/vite.config.js` - Port changed to 3001, proxy updated to 8000
- `frontend/src/utils/constants.js` - API URL updated to http://localhost:8000/api

## 🔧 Environment Variables

If you want to customize ports further, you can set them in `.env` files:

**Backend `.env`:**
```env
PORT=8000
FRONTEND_URL=http://localhost:3001
```

**Frontend `.env` (optional):**
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🌐 Access URLs

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **Health Check**: http://localhost:8000/api/health

## ⚠️ Important Notes

1. Make sure MySQL database is set up before starting the backend
2. Create `backend/.env` file with database credentials
3. The backend will automatically create tables on first run
4. Default login: admin@billing.com / admin123

