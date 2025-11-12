#!/bin/bash

# Test All Script for Internet Billing System
# Runs both backend and frontend tests

echo "========================================"
echo "  Internet Billing System - Test Suite"
echo "========================================"
echo ""

# Check if backend and frontend directories exist
if [ ! -d "backend" ]; then
    echo "❌ Error: backend directory not found!"
    exit 1
fi

if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found!"
    exit 1
fi

BACKEND_FAILED=false
FRONTEND_FAILED=false

# Run Backend Tests
echo "🧪 Running Backend Tests..."
echo "----------------------------------------"
cd backend
if npm test; then
    echo "✅ Backend tests passed!"
else
    BACKEND_FAILED=true
    echo "❌ Backend tests failed!"
fi
cd ..

echo ""

# Run Frontend Tests
echo "🧪 Running Frontend Tests..."
echo "----------------------------------------"
cd frontend
if npm test; then
    echo "✅ Frontend tests passed!"
else
    FRONTEND_FAILED=true
    echo "❌ Frontend tests failed!"
fi
cd ..

echo ""
echo "========================================"
echo "  Test Summary"
echo "========================================"

if [ "$BACKEND_FAILED" = true ] && [ "$FRONTEND_FAILED" = true ]; then
    echo "❌ All tests failed!"
    exit 1
elif [ "$BACKEND_FAILED" = true ]; then
    echo "⚠️  Backend tests failed, Frontend tests passed"
    exit 1
elif [ "$FRONTEND_FAILED" = true ]; then
    echo "⚠️  Frontend tests failed, Backend tests passed"
    exit 1
else
    echo "✅ All tests passed!"
    exit 0
fi

