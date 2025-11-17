#!/bin/bash
set -e

echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

echo "✅ Build complete!"

