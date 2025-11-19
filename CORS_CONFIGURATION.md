# 🔒 CORS Configuration - Frontend & Backend

## 📍 File Locations

### Backend CORS Configuration
**File:** `backend/server.js`  
**Lines:** 40-95

### Frontend API Configuration
**File:** `frontend/src/utils/constants.js`  
**Lines:** 1-47

**File:** `frontend/vite.config.js`  
**Lines:** 6-15 (Proxy configuration)

**File:** `frontend/src/api/apiClient.js`  
**Lines:** 1-147 (Axios client configuration)

---

## 🔧 Backend CORS Settings

### Location: `backend/server.js`

```javascript
// Allowed Origins Configuration (Lines 40-51)
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL] 
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];

// Add Vercel URL if in Vercel environment
if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}
if (process.env.VERCEL) {
  allowedOrigins.push(/^https:\/\/.*\.vercel\.app$/);
}

// CORS Configuration (Lines 54-95)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin
    if (!origin) return callback(null, true);
    
    // In Vercel, allow all Vercel URLs
    if (process.env.VERCEL) {
      if (origin.includes('.vercel.app')) {
        return callback(null, true);
      }
    }
    
    // Check if origin matches allowed origins
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      // In development or Vercel, allow all origins
      if (process.env.NODE_ENV !== 'production' || process.env.VERCEL) {
        callback(null, true);
      } else {
        console.warn('⚠️  CORS: Origin not allowed:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
```

### Current Backend CORS Settings:

✅ **Allowed Origins (Localhost):**
- `http://localhost:3000`
- `http://localhost:3001` (Default frontend port)
- `http://localhost:3002`
- Or from `FRONTEND_URL` environment variable

✅ **Allowed Origins (Vercel):**
- All `*.vercel.app` domains (if `VERCEL=true`)
- Specific Vercel URL from `VERCEL_URL` env variable

✅ **Credentials:** Enabled (`credentials: true`)

✅ **Methods:** GET, POST, PUT, DELETE, PATCH, OPTIONS

✅ **Headers:**
- Allowed: `Content-Type`, `Authorization`, `X-Requested-With`
- Exposed: `Content-Range`, `X-Content-Range`

---

## 🌐 Frontend API Configuration

### Location: `frontend/src/utils/constants.js`

```javascript
// API Base URL Configuration (Lines 4-47)
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  // If explicitly set, validate and fix it
  if (envUrl) {
    let url = envUrl.trim();
    // Ensure it ends with /api
    // ... validation logic ...
    return url;
  }
  
  // In production/Vercel, use relative path
  if (import.meta.env.PROD || window.location.hostname.includes('vercel.app')) {
    return '/api';
  }
  
  // In development, default to localhost
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getApiBaseUrl();
```

### Current Frontend API Settings:

✅ **Development:** `http://localhost:8000/api`  
✅ **Production/Vercel:** `/api` (relative path)  
✅ **Custom:** From `VITE_API_BASE_URL` environment variable

---

### Location: `frontend/vite.config.js`

```javascript
// Vite Dev Server Proxy (Lines 6-15)
server: {
  port: 3001,
  host: true, // Allow external connections
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false
    }
  }
}
```

### Current Vite Proxy Settings:

✅ **Port:** 3001  
✅ **Host:** `true` (allows external connections)  
✅ **Proxy Target:** `http://localhost:8000`  
✅ **Change Origin:** `true`  
✅ **Secure:** `false` (for localhost)

---

## 🔍 Environment Variables

### Backend (.env)
```env
FRONTEND_URL=http://localhost:3001  # Frontend URL for CORS
VERCEL=0                           # Set to 1 for Vercel deployment
VERCEL_URL=your-app.vercel.app     # Vercel deployment URL
```

### Frontend (.env or Vercel)
```env
VITE_API_BASE_URL=http://localhost:8000/api  # For localhost
# OR
VITE_API_BASE_URL=/api                       # For Vercel (relative)
# OR
VITE_API_BASE_URL=https://your-backend.vercel.app/api  # For separate backend
```

---

## ✅ Current Configuration Summary

### Localhost Development:
- **Frontend:** `http://localhost:3001`
- **Backend:** `http://localhost:8000`
- **CORS:** ✅ Allowed (localhost:3001 is in allowed origins)
- **API Calls:** ✅ Proxy through Vite dev server

### Vercel Production:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-app.vercel.app/api` (via rewrites)
- **CORS:** ✅ Allowed (all Vercel domains allowed)
- **API Calls:** ✅ Relative path `/api` works with rewrites

---

## 🛠️ How to Update CORS

### Add New Allowed Origin (Backend):

1. **Edit `backend/server.js`** (around line 40):
   ```javascript
   const allowedOrigins = process.env.FRONTEND_URL 
     ? [process.env.FRONTEND_URL] 
     : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://your-new-domain.com'];
   ```

2. **Or use environment variable:**
   ```env
   FRONTEND_URL=https://your-new-domain.com
   ```

### Change Frontend API URL:

1. **For localhost:** Edit `frontend/src/utils/constants.js` (line 46)
2. **For Vercel:** Set `VITE_API_BASE_URL` environment variable in Vercel dashboard

---

## 🐛 Troubleshooting CORS Issues

### Error: "Not allowed by CORS"

**Solution:**
1. Check if frontend URL is in `allowedOrigins` array
2. Verify `FRONTEND_URL` environment variable is set correctly
3. In development, CORS allows all origins (line 81-82)
4. Check browser console for actual origin being blocked

### Error: "Network Error" or "CORS policy blocked"

**Solution:**
1. Verify backend is running on correct port (8000)
2. Check `API_BASE_URL` in frontend console
3. Ensure Vite proxy is working (check Network tab)
4. Verify `credentials: true` matches frontend axios config

---

## 📝 Quick Reference

| Setting | Backend File | Frontend File |
|---------|-------------|---------------|
| CORS Origins | `backend/server.js:40-51` | N/A |
| CORS Config | `backend/server.js:54-95` | N/A |
| API Base URL | N/A | `frontend/src/utils/constants.js:4-47` |
| Proxy Config | N/A | `frontend/vite.config.js:6-15` |
| Axios Client | N/A | `frontend/src/api/apiClient.js:1-147` |

---

**Current Status:** ✅ CORS is properly configured for both localhost and Vercel deployment.

