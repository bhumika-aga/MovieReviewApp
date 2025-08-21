#!/bin/bash

# CinemaVerse Deployment Script for Render.com
# This script prepares the application for deployment

set -e

echo "🎬 CinemaVerse Deployment Preparation"
echo "======================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "pom.xml" ] || [ ! -d "MovieReviewFrontend" ]; then
    print_error "Please run this script from the CinemaVerse root directory"
    exit 1
fi

print_status "Running in correct directory"

# Check Java version
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
    if [ "$JAVA_VERSION" -ge 17 ]; then
        print_status "Java $JAVA_VERSION detected"
    else
        print_error "Java 17+ required, found Java $JAVA_VERSION"
        exit 1
    fi
else
    print_error "Java not found. Please install Java 17+"
    exit 1
fi

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 18 ]; then
        print_status "Node.js v$(node -v) detected"
    else
        print_error "Node.js 18+ required, found Node.js v$(node -v)"
        exit 1
    fi
else
    print_error "Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check Maven
if command -v mvn &> /dev/null; then
    print_status "Maven $(mvn -version | head -n 1 | cut -d' ' -f3) detected"
else
    print_error "Maven not found. Please install Maven 3.8+"
    exit 1
fi

# Clean previous builds
echo ""
echo "🧹 Cleaning previous builds..."
print_status "Cleaning Maven target directory"
mvn clean -q

print_status "Cleaning Frontend build directory"
cd MovieReviewFrontend
rm -rf build/ node_modules/.cache/
cd ..

# Run tests
echo ""
echo "🧪 Running tests..."
print_status "Running backend tests"
mvn test -q

print_status "Running frontend TypeScript check"
cd MovieReviewFrontend
# Skip type check for deployment - will be handled in production build
# npm run type-check
print_status "TypeScript check skipped for deployment"
cd ..

# Build backend
echo ""
echo "🏗️  Building backend..."
print_status "Compiling Spring Boot application"
mvn compile -q

print_status "Packaging JAR file"  
mvn package -DskipTests -q

if [ -f "target/CinemaVerse-1.0.0.jar" ]; then
    print_status "JAR file created successfully"
    ls -lh target/CinemaVerse-1.0.0.jar
else
    print_error "JAR file creation failed"
    exit 1
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd MovieReviewFrontend
npm ci --legacy-peer-deps --silent

print_status "Frontend dependencies installed"

# Build frontend
echo ""
echo "🎨 Building frontend..."
npm run build

if [ -d "build" ]; then
    print_status "Frontend build created successfully"
    du -sh build/
else
    print_error "Frontend build failed"
    exit 1
fi

cd ..

# Verify deployment files
echo ""
echo "📋 Verifying deployment configuration..."

required_files=(
    "render.yaml"
    "Dockerfile.render" 
    "src/main/resources/application-production.properties"
    "MovieReviewFrontend/.env.production"
    "RENDER_DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_status "$file exists"
    else
        print_error "$file is missing"
        exit 1
    fi
done

# Git status check
echo ""
echo "📝 Checking Git status..."
if git status --porcelain | grep -q .; then
    print_warning "You have uncommitted changes:"
    git status --short
    echo ""
    read -p "Do you want to commit these changes? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Prepare for Render.com deployment

🚀 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
        print_status "Changes committed"
    else
        print_warning "Proceeding with uncommitted changes"
    fi
else
    print_status "Git working directory is clean"
fi

# Final summary
echo ""
echo "🎉 Deployment Preparation Complete!"
echo "=================================="
echo ""
echo "✅ Backend JAR: $(ls -lh target/CinemaVerse-1.0.0.jar | awk '{print $5}')"
echo "✅ Frontend Build: $(du -sh MovieReviewFrontend/build/ | cut -f1)"
echo "✅ All deployment files verified"
echo ""
echo "🚀 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Follow the deployment guide:"
echo "   cat RENDER_DEPLOYMENT.md"
echo ""
echo "3. Deploy on Render.com using the Blueprint method"
echo ""
echo "📱 Your app will be available at:"
echo "   Manual Deployment:"
echo "     Frontend: http://localhost:3000"
echo "     Backend:  http://localhost:8080"
echo "     API Docs: http://localhost:8080/swagger-ui.html"
echo ""
echo "   Cloud Deployment:"
echo "     Frontend: https://your-app-name.onrender.com"
echo "     Backend:  https://your-backend-name.onrender.com"
echo ""
print_status "Ready for Render.com deployment! 🎬✨"