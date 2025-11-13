// Vercel Serverless Function Entry Point
// This file allows the Express backend to run on Vercel as serverless functions

let app;
let appInitialized = false;

// Initialize app on first request (lazy loading for serverless)
const getApp = () => {
  if (!appInitialized) {
    try {
      app = require('../backend/server');
      appInitialized = true;
      console.log('✅ Express app initialized for serverless function');
    } catch (error) {
      console.error('❌ Failed to initialize Express app:', error);
      throw error;
    }
  }
  return app;
};

// Export as Vercel serverless function handler
module.exports = async (req, res) => {
  try {
    // Initialize app if not already done
    const expressApp = getApp();
    
    // Handle the request
    return new Promise((resolve, reject) => {
      expressApp(req, res, (err) => {
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
          resolve();
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Fatal error in serverless function:', error);
    console.error('Error stack:', error.stack);
    
    if (!res.headersSent) {
      res.status(500).json({
        message: 'Fatal server error - failed to initialize application',
        error: process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' 
          ? error.message 
          : undefined
      });
    }
  }
};

