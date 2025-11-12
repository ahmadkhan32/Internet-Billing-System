# Network Error Troubleshooting Guide

## Common Causes of Network Errors

### 1. Backend Server Not Running

**Check if backend is running:**
```bash
# Check if port 8000 is in use
# Windows
netstat -ano | findstr :8000

# Linux/Mac
lsof -i :8000
```

**Start the backend:**
```bash
cd backend
npm start
# or
npm run dev
```

You should see:
```
✅ Database connection established successfully
✅ Database models synchronized
🚀 Server running on port 8000
```

### 2. Port Mismatch

**Current Configuration:**
- Backend: Port `8000` (default)
- Frontend: Port `3001` (from vite.config.js)
- API URL: `http://localhost:8000/api` (default)

**Check your configuration:**

1. **Backend `.env` file:**
```env
PORT=8000
FRONTEND_URL=http://localhost:3001
```

2. **Frontend environment:**
   - Check if `VITE_API_BASE_URL` is set in `.env` file
   - Default: `http://localhost:8000/api`

3. **Vite proxy (vite.config.js):**
   - Should proxy `/api` to `http://localhost:8000`

### 3. CORS Issues

**Backend CORS configuration:**
The backend should allow requests from `http://localhost:3001`

Check `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
```

**If using a different frontend port:**
- Update `FRONTEND_URL` in backend `.env`
- Restart backend server

### 4. Firewall/Antivirus Blocking

**Windows:**
- Check Windows Firewall
- Check antivirus settings
- Allow Node.js through firewall

**Linux:**
```bash
# Check firewall status
sudo ufw status
# If needed, allow port 8000
sudo ufw allow 8000
```

### 5. Quick Diagnostic Steps

**Step 1: Test Backend Health Endpoint**
```bash
# In browser or terminal
curl http://localhost:8000/api/health
```

Should return:
```json
{"status":"OK","message":"Server is running"}
```

**Step 2: Test Login Endpoint Directly**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@billing.com","password":"admin123"}'
```

**Step 3: Check Browser Console**
1. Open DevTools (F12)
2. Go to Network tab
3. Try to login
4. Check the failed request:
   - Status: Should show error code
   - Preview: Check error message
   - Headers: Check request URL

**Step 4: Check Backend Console**
- Look for incoming requests
- Check for error messages
- Verify CORS headers

### 6. Fix Common Issues

**Issue: "ERR_CONNECTION_REFUSED"**
- Backend not running
- Wrong port
- Firewall blocking

**Solution:**
```bash
# Start backend
cd backend
npm start
```

**Issue: "CORS policy" error**
- Frontend URL not in CORS whitelist

**Solution:**
Update `backend/.env`:
```env
FRONTEND_URL=http://localhost:3001
```
Restart backend.

**Issue: "Network Error" in browser**
- Backend crashed
- Port conflict
- Wrong API URL

**Solution:**
1. Check backend console for errors
2. Verify port 8000 is available
3. Check `VITE_API_BASE_URL` in frontend

### 7. Manual Configuration

**If using different ports:**

1. **Backend `.env`:**
```env
PORT=8000
FRONTEND_URL=http://localhost:3001
```

2. **Frontend `.env` (create if doesn't exist):**
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

3. **Restart both servers**

### 8. Verify Setup

**Complete checklist:**
- [ ] Backend server is running
- [ ] Backend shows "Server running on port 8000"
- [ ] Database connection successful
- [ ] Frontend server is running
- [ ] Frontend shows "Local: http://localhost:3001"
- [ ] `http://localhost:8000/api/health` returns OK
- [ ] No firewall blocking port 8000
- [ ] CORS configured correctly
- [ ] API_BASE_URL matches backend URL

### 9. Still Having Issues?

**Enable detailed logging:**

1. **Backend:** Already logs requests
2. **Frontend:** Check browser console (F12)
3. **Network tab:** Shows all API requests

**Common fixes:**
- Restart both servers
- Clear browser cache
- Check for port conflicts
- Verify .env files exist and are correct

