// Vercel Serverless Function Entry Point
// This file allows the Express backend to run on Vercel as serverless functions

let app;
let appInitialized = false;
let initializationError = null;

// Initialize app on first request (lazy loading for serverless)
const getApp = () => {
  if (initializationError) {
    throw initializationError;
  }
  
  if (!appInitialized) {
    try {
      console.log('🔄 Initializing Express app for serverless function...');
      console.log('📦 Node version:', process.version);
      console.log('📦 NODE_ENV:', process.env.NODE_ENV);
      console.log('📦 VERCEL:', process.env.VERCEL);
      
      // Set Vercel environment before requiring server
      process.env.VERCEL = '1';
      
      // Check if backend directory exists
      const fs = require('fs');
      const path = require('path');
      const backendPath = path.join(__dirname, '../backend');
      
      if (!fs.existsSync(backendPath)) {
        throw new Error(`Backend directory not found at: ${backendPath}`);
      }
      
      console.log('📁 Backend path exists:', backendPath);
      
      // Check if backend node_modules exists
      const backendNodeModules = path.join(backendPath, 'node_modules');
      if (!fs.existsSync(backendNodeModules)) {
        console.error('❌ Backend node_modules not found at:', backendNodeModules);
        console.error('💡 Backend dependencies need to be installed!');
        console.error('💡 Check Vercel build logs - installCommand should install backend dependencies');
        throw new Error('Backend dependencies not installed. Ensure installCommand installs backend dependencies: cd backend && npm install');
      }
      
      // Check if express is installed
      const expressPath = path.join(backendNodeModules, 'express');
      if (!fs.existsSync(expressPath)) {
        console.error('❌ Express module not found in backend/node_modules');
        console.error('💡 Backend dependencies are missing!');
        throw new Error('Express module not found. Backend dependencies need to be installed.');
      }
      
      // Try to load the server
      console.log('📥 Loading backend/server.js...');
      
      // Set Vercel environment before loading models
      process.env.VERCEL = '1';
      
      try {
        app = require('../backend/server');
        console.log('✅ Server module loaded');
      } catch (requireError) {
        console.error('❌ Error requiring server module:', requireError.message);
        console.error('Error stack:', requireError.stack);
        console.error('💡 This usually means backend dependencies are not installed');
        console.error('💡 Check that installCommand in vercel.json installs backend dependencies');
        throw requireError;
      }
      
      // Verify app is valid
      if (!app) {
        throw new Error('App is null or undefined');
      }
      
      if (typeof app !== 'function') {
        console.error('⚠️  App type:', typeof app);
        console.error('⚠️  App value:', app);
        throw new Error(`Invalid Express app - expected function, got ${typeof app}`);
      }
      
      appInitialized = true;
      console.log('✅ Express app initialized successfully for serverless function');
    } catch (error) {
      console.error('❌ Failed to initialize Express app:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      console.error('Error stack:', error.stack);
      
      // Check for common issues
      if (error.code === 'MODULE_NOT_FOUND') {
        console.error('💡 MODULE_NOT_FOUND - Check if:');
        console.error('   1. All dependencies are installed (cd backend && npm install)');
        console.error('   2. node_modules exists in backend directory');
        console.error('   3. package.json has all required dependencies');
      }
      
      if (error.message && error.message.includes('Cannot find module')) {
        console.error('💡 Missing module detected - install dependencies');
      }
      
      // Store error to prevent repeated attempts
      initializationError = error;
      throw error;
    }
  }
  return app;
};

// Export as Vercel serverless function handler
module.exports = async (req, res) => {
  // Set timeout for the entire request (50 seconds to avoid 504)
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      console.error('⏱️  Request timeout - responding with 504');
      res.status(504).json({
        message: 'Gateway Timeout',
        error: 'The request took too long to process. This may be due to database connection issues.',
        tips: [
          'Check database connection settings',
          'Verify database is accessible from Vercel',
          'Check database firewall settings',
          'Review Vercel function logs for more details'
        ]
      });
    }
  }, 50000); // 50 seconds timeout

  try {
    // Initialize app if not already done
    const expressApp = getApp();
    
    // Handle the request
    return new Promise((resolve, reject) => {
      try {
        // Clear timeout when request completes
        const originalEnd = res.end;
        res.end = function(...args) {
          clearTimeout(timeout);
          return originalEnd.apply(this, args);
        };

        expressApp(req, res, (err) => {
          clearTimeout(timeout);
          
          if (err) {
            console.error('Serverless function error:', err);
            console.error('Error stack:', err.stack);
            
            if (!res.headersSent) {
              const errorResponse = {
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' 
                  ? err.message 
                  : undefined
              };
              
              // Add more details in development
              if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development') {
                errorResponse.stack = err.stack;
              }
              
              res.status(500).json(errorResponse);
            }
          }
          resolve();
        });
      } catch (handlerError) {
        clearTimeout(timeout);
        console.error('Error in request handler:', handlerError);
        if (!res.headersSent) {
          res.status(500).json({
            message: 'Error processing request',
            error: process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' 
              ? handlerError.message 
              : undefined
          });
        }
        resolve();
      }
    });
  } catch (error) {
    console.error('Fatal error in serverless function:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Provide more detailed error information
    // Always show error message in Vercel for debugging
    const isDev = process.env.NODE_ENV === 'development' || 
                  process.env.VERCEL_ENV === 'development' || 
                  process.env.VERCEL_ENV === 'preview';
    
    const errorDetails = {
      message: 'Fatal server error - failed to initialize application',
      error: error.message || 'Unknown error',
      name: error.name || 'Error'
    };
    
    // Add more debugging info - always show in Vercel for debugging
    const isVercelEnv = process.env.VERCEL || process.env.VERCEL_ENV;
    
    if (isDev || isVercelEnv) {
      errorDetails.stack = error.stack;
      errorDetails.code = error.code;
      errorDetails.environment = {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV,
        hasDB_HOST: !!process.env.DB_HOST,
        hasDB_USER: !!process.env.DB_USER,
        hasDB_PASSWORD: !!process.env.DB_PASSWORD,
        hasDB_NAME: !!process.env.DB_NAME,
        hasJWT_SECRET: !!process.env.JWT_SECRET
      };
      errorDetails.tips = [
        'Check if all dependencies are installed (cd backend && npm install)',
        'Verify environment variables are set correctly in Vercel',
        'Check Vercel function logs for more details',
        'Ensure database connection details are correct',
        'Check if backend/node_modules exists',
        'Verify all required files are in the repository',
        'See VERCEL_ENV_SETUP.md for environment variable setup guide'
      ];
    } else {
      // Even in production, show basic error info for debugging
      errorDetails.hint = 'Check Vercel function logs for detailed error information';
    }
    
    if (!res.headersSent) {
      res.status(500).json(errorDetails);
    }
  }
};

