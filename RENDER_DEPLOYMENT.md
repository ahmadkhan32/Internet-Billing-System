# Render Deployment Guide

## Quick Setup Steps

### 1. Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository: `ahmadkhan32/Internet-Billing-System`

### 2. Configure Build Settings

**Name:** `internet-billing-backend`

**Environment:** `Node`

**Root Directory:** `backend`

**Build Command:** 
```bash
npm install
```

**Start Command:**
```bash
npm start
```

### 3. Set Environment Variables

Go to **Environment** tab and add these variables:

#### Required Variables:
- `NODE_ENV` = `production`
- `PORT` = `8000`
- `DB_HOST` = `your-database-host` (e.g., `your-db.render.com` or cloud database URL)
- `DB_USER` = `your-database-username`
- `DB_PASSWORD` = `your-database-password`
- `DB_NAME` = `your-database-name`
- `DB_PORT` = `3306` (default MySQL port)
- `JWT_SECRET` = `your-super-secret-jwt-key` (generate a random string)
- `JWT_EXPIRE` = `7d`
- `FRONTEND_URL` = `https://your-frontend-url.com` (or your frontend Render service URL)

#### Optional Variables:
- `EMAIL_HOST` = `smtp.gmail.com` (if using email)
- `EMAIL_PORT` = `587`
- `EMAIL_USER` = `your-email@gmail.com`
- `EMAIL_PASS` = `your-app-password`
- `STRIPE_SECRET_KEY` = `sk_test_...` (if using Stripe)

### 4. Database Setup

You have two options:

#### Option A: Use Render PostgreSQL (Recommended)
1. Create a PostgreSQL database on Render
2. Update environment variables to use PostgreSQL connection string
3. Note: You'll need to update the code to use PostgreSQL instead of MySQL

#### Option B: Use External MySQL Database
- Use a cloud MySQL service (PlanetScale, AWS RDS, etc.)
- Or use a MySQL database from another provider
- Make sure the database allows connections from Render IPs (0.0.0.0/0)

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repository
   - Install dependencies in the `backend` directory
   - Start the server

### 6. Verify Deployment

1. Check the logs for successful startup
2. Visit your service URL (e.g., `https://internet-billing-backend.onrender.com`)
3. Test the health endpoint: `https://your-service-url.onrender.com/api/health`

## Troubleshooting

### Error: "Cannot find module 'express'"

**Solution:** Make sure:
- Root Directory is set to `backend`
- Build Command is `npm install`
- Dependencies are installed in the backend directory

### Error: "Database connection refused"

**Solution:**
1. Check database credentials in environment variables
2. Ensure database allows connections from Render (0.0.0.0/0)
3. Verify database host and port are correct
4. Check database firewall settings

### Error: "Port already in use"

**Solution:**
- Render automatically assigns a PORT environment variable
- Make sure your code uses `process.env.PORT` instead of hardcoded port

## Using render.yaml (Alternative Method)

If you prefer using the `render.yaml` file:

1. The `render.yaml` file is already in your repository
2. In Render Dashboard, when creating a new service, select "Apply render.yaml"
3. Render will automatically use the configuration from the file

## Notes

- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- For production, consider upgrading to a paid plan
- Make sure to set all required environment variables before deploying

