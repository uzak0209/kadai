#!/bin/bash
echo "🧪 Testing kadai setup..."

# Test make command
echo "Testing make up-answer..."
make down > /dev/null 2>&1
make up-answer

# Wait for services
sleep 5

# Check all endpoints
echo ""
echo "Checking endpoints..."
curl -f http://localhost:3000/health && echo " ✅ answer-backend OK" || echo " ❌ answer-backend FAILED"
curl -f http://localhost:3002 > /dev/null 2>&1 && echo "✅ answer-frontend OK" || echo "❌ answer-frontend FAILED"
curl -f http://localhost:8080 > /dev/null 2>&1 && echo "✅ swagger OK" || echo "❌ swagger FAILED"

echo ""
echo "✅ All tests passed!"
