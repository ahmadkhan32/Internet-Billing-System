#!/bin/bash
set -e

echo "📦 Installing backend dependencies..."
npm install --include=dev --prefix backend

echo "📦 Installing frontend dependencies..."
npm install --include=dev --prefix frontend

echo "🏗️  Building frontend..."
npm run build --prefix frontend

echo "✅ Build complete!"

