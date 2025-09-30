#!/bin/bash

# TechTea Setup Script
# This script helps you set up TechTea quickly

echo "🚀 Welcome to TechTea Setup!"
echo "================================"
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required"
    echo "Current version: $(node -v)"
    echo "Please upgrade Node.js and try again"
    exit 1
fi

echo "✅ Node.js version check passed: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env and add your API keys"
else
    echo "ℹ️  .env file already exists"
fi

echo ""

# Create placeholder icons
echo "🎨 Setting up PWA icons..."
mkdir -p public

# Create placeholder icon files (user should replace these)
cat > public/icon-192x192.png << 'EOF'
<!-- Replace this with actual 192x192 PNG icon -->
EOF

cat > public/icon-512x512.png << 'EOF'
<!-- Replace this with actual 512x512 PNG icon -->
EOF

echo "✅ Placeholder icons created"
echo "⚠️  Replace placeholder icons in public/ directory"
echo ""

# Summary
echo "================================"
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Replace placeholder icons in public/"
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Main documentation"
echo "   - SETUP.md - Detailed setup guide"
echo "   - DEPLOYMENT.md - Deployment guide"
echo ""
echo "Happy coding! ☕"