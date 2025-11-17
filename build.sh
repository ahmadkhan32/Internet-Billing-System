#!/bin/bash
set -e

echo "📦 Installing backend dependencies..."
cd backend
npm install --include=dev
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
npm install --include=dev

echo "🏗️  Building frontend..."
npm run build

echo "✅ Build complete!"
cd ..

