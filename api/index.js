// Vercel Serverless Function Entry Point
// This file allows the Express backend to run on Vercel as serverless functions

const app = require('../backend/server');

// Export as Vercel serverless function handler
// Vercel routes /api/* to this function, and the Express app handles /api/* routes
module.exports = async (req, res) => {
  try {
    // Log request for debugging
    console.log(`[${req.method}] ${req.url}`);
    
    // Handle the request with Express app
    app(req, res, (err) => {
      if (err) {
        console.error('Serverless function error:', err);
        console.error('Error stack:', err.stack);
        
        if (!res.headersSent) {
          res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' ? err.message : undefined,
            stack: process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' ? err.stack : undefined
          });
        }
      }
    });
  } catch (error) {
    console.error('Fatal error in serverless function:', error);
    console.error('Error stack:', error.stack);
    
    if (!res.headersSent) {
      res.status(500).json({
        message: 'Fatal server error',
        error: process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

