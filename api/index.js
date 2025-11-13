// Vercel Serverless Function Entry Point
// This file allows the Express backend to run on Vercel as serverless functions

const app = require('../backend/server');

// Export as Vercel serverless function handler
// Vercel will route /api/* requests to this function
// The Express app already has /api prefix in routes, so the path matches correctly
module.exports = app;

