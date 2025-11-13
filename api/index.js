// Vercel Serverless Function Entry Point
// This file allows the Express backend to run on Vercel as serverless functions

const app = require('../backend/server');

// Export as Vercel serverless function handler
module.exports = (req, res) => {
  // Remove /api prefix from the path since Vercel routes already include it
  // But our Express routes already have /api prefix, so we need to handle this
  return app(req, res);
};

