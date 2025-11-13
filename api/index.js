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
      
      // Set Vercel environment before requiring server
      process.env.VERCEL = '1';
      
      // Try to load the server
      app = require('../backend/server');
      
      // Verify app is valid
      if (!app || typeof app !== 'function') {
        throw new Error('Invalid Express app - app is not a function');
      }
      
      appInitialized = true;
      console.log('✅ Express app initialized successfully for serverless function');
    } catch (error) {
      console.error('❌ Failed to initialize Express app:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Store error to prevent repeated attempts
      initializationError = error;
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
      try {
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
          }
          resolve();
        });
      } catch (handlerError) {
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
    const errorDetails = {
      message: 'Fatal server error - failed to initialize application',
      error: process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' 
        ? error.message 
        : undefined
    };
    
    // Add more debugging info
    if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development') {
      errorDetails.name = error.name;
      errorDetails.stack = error.stack;
      errorDetails.tips = [
        'Check if all dependencies are installed (cd backend && npm install)',
        'Verify environment variables are set correctly',
        'Check Vercel function logs for more details',
        'Ensure database connection details are correct'
      ];
    }
    
    if (!res.headersSent) {
      res.status(500).json(errorDetails);
    }
  }
};

