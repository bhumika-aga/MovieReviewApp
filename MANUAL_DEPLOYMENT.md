# 🏠 ReelCritic Manual Deployment Guide

Complete guide for running ReelCritic movie review platform locally or on your own server infrastructure.

## 📋 Prerequisites

### System Requirements

- **Java 17+** (OpenJDK or Oracle JDK)
- **Node.js 18+** and npm
- **Maven 3.8+**
- **MongoDB** (Local installation or MongoDB Atlas)
- **Git** (for cloning the repository)

### Optional Tools

- **MongoDB Compass** (GUI for database management)
- **Postman** (API testing)
- **IDE** (IntelliJ IDEA, VS Code, Eclipse)

## 🔧 Environment Setup

### 1. Install Java 17+

#### Windows

```bash
# Using Chocolatey
choco install openjdk17

# Or download from Oracle/OpenJDK website
```

#### macOS

```bash
# Using Homebrew
brew install openjdk@17

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install openjdk-17-jdk maven
```

### 2. Install Node.js 18+

#### Windows/macOS

- Download from [nodejs.org](https://nodejs.org/)

#### Linux

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install Maven

Windows

```bash
# Using Chocolatey
choco install maven
```

MacOS

```bash
# Using Homebrew
brew install maven
```

Linux

```bash
sudo apt install maven
```

### 4. Verify Installations

```bash
java -version    # Should show Java 17+
node --version   # Should show Node 18+
npm --version    # Should show npm 9+
mvn --version    # Should show Maven 3.8+
```

## 🗃️ Database Setup

### Option 1: Local MongoDB Installation

#### Install MongoDB Community Edition

**Windows:**

1. Download MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run installer and follow setup wizard
3. Start MongoDB service

**macOS:**

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**

```bash
# Import GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Configure Local MongoDB

1. **Create Database Directory:**

```bash
# Default data directory
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
```

2.**Start MongoDB:**

```bash
# Start MongoDB daemon
mongod

# Or as service (Linux)
sudo systemctl start mongod
```

3.**Test Connection:**

```bash
# Connect to MongoDB shell
mongosh
# Or older version
mongo

# Create database
use ReelCritic
```

### Option 2: MongoDB Atlas (Cloud)

1. **Sign up** at [MongoDB Atlas](https://mongodb.com/atlas)
2. **Create free cluster** (M0 Sandbox)
3. **Configure database access** (create user)
4. **Configure network access** (allow your IP)
5. **Get connection string**

## 📥 Application Setup

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ReelCritic.git
cd ReelCritic
```

### 2. Backend Configuration

#### Update Database Configuration

Edit `src/main/resources/application.properties`:

**For Local MongoDB:**

```properties
# MongoDB Local Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/ReelCritic
spring.data.mongodb.database=ReelCritic
```

**For MongoDB Atlas:**

```properties
# MongoDB Atlas Configuration
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/ReelCritic
spring.data.mongodb.database=ReelCritic
```

#### Install Backend Dependencies

```bash
# Install dependencies and compile
mvn clean install

# Or skip tests for faster build
mvn clean install -DskipTests
```

### 3. Frontend Configuration

#### Install Frontend Dependencies

```bash
cd MovieReviewFrontend
npm install

# Or use legacy peer deps if needed
npm install --legacy-peer-deps
```

#### Configure API Endpoint

The frontend is already configured to use `http://localhost:8080` for the backend API.

## 🚀 Running the Application

### Method 1: Development Mode (Recommended for testing)

#### Terminal 1: Start Backend

```bash
# From project root directory
mvn spring-boot:run

# Or run the JAR directly
java -jar target/ReelCritic-1.0.0.jar
```

**Backend will start on:** `http://localhost:8080`

#### Terminal 2: Start Frontend

```bash
# From MovieReviewFrontend directory
cd MovieReviewFrontend
npm start
```

**Frontend will start on:** `http://localhost:3000`

### Method 2: Production Mode

#### Build Backend

```bash
# Create production JAR
mvn clean package -DskipTests

# Run production JAR
java -jar target/ReelCritic-1.0.0.jar
```

#### Build Frontend

```bash
cd MovieReviewFrontend
npm run build

# Serve static files (install serve globally first)
npm install -g serve
serve -s build -l 3000
```

### Method 3: Docker Deployment

#### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Manual Docker Build

```bash
# Build backend
docker build -f Dockerfile.render -t reelcritic-backend .
docker run -p 8080:8080 reelcritic-backend

# Build frontend
cd MovieReviewFrontend
docker build -t reelcritic-frontend .
docker run -p 3000:3000 reelcritic-frontend
```

## 🔐 Configuration Options

### Environment Variables

You can override default configurations using environment variables:

#### Backend Environment Variables

```bash
# Database Configuration
export MONGODB_URI="mongodb://localhost:27017/ReelCritic"
export SPRING_DATA_MONGODB_DATABASE="ReelCritic"

# JWT Configuration
export JWT_SECRET="YourSuperSecretKey256BitsMinimum"
export JWT_EXPIRATION_MS="86400000"

# CORS Configuration
export CORS_ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001"

# Server Configuration
export SERVER_PORT="8080"

# Run application
java -jar target/ReelCritic-1.0.0.jar
```

#### Frontend Environment Variables

Create `.env.local` in `MovieReviewFrontend/`:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_ENV=development
```

### Production Configuration

For production deployment, create `application-prod.properties`:

```properties
# Production optimized settings
server.port=8080
spring.profiles.active=prod

# Database
spring.data.mongodb.uri=${MONGODB_URI}

# Security
cinemaverse.app.jwtSecret=${JWT_SECRET}

# Logging
logging.level.root=WARN
logging.level.com.moviebookingapp=INFO

# Actuator
management.endpoints.web.exposure.include=health,info
```

Run with production profile:

```bash
java -jar -Dspring.profiles.active=prod target/ReelCritic-1.0.0.jar
```

## 🎯 Access Points

Once both services are running:

### Application URLs

- **Frontend (User Interface):** <http://localhost:3000>
- **Backend API:** <http://localhost:8080>
- **API Documentation:** <http://localhost:8080/swagger-ui.html>
- **Health Check:** <http://localhost:8080/actuator/health>

### Default Features

The application will automatically initialize with sample movie data on first startup.

## 🧪 Testing the Deployment

### 1. Health Checks

```bash
# Backend health
curl http://localhost:8080/actuator/health

# Frontend (should return HTML)
curl http://localhost:3000
```

### 2. API Testing

```bash
# Get all movies
curl http://localhost:8080/api/v1.0/moviebooking/all

# Register a user
curl -X POST http://localhost:8080/api/v1.0/moviebooking/register \
  -H "Content-Type: application/json" \
  -d '{"loginId":"testuser","firstName":"Test","lastName":"User","email":"test@example.com","password":"password123","contactNumber":"1234567890"}'

# Login
curl -X POST http://localhost:8080/api/v1.0/moviebooking/login \
  -H "Content-Type: application/json" \
  -d '{"loginId":"testuser","password":"password123"}'
```

### 3. Frontend Testing

1. Open browser to `http://localhost:3000`
2. Verify movie list displays
3. Test user registration
4. Test user login
5. Test movie search functionality

## 🛠️ Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Symptoms:** "Port 8080 already in use" or "Port 3000 already in use"

**Solutions:**

```bash
# Kill processes on specific ports
# For port 8080 (backend)
lsof -ti:8080 | xargs kill -9

# For port 3000 (frontend)  
lsof -ti:3000 | xargs kill -9

# Or use different ports
SERVER_PORT=8081 java -jar target/ReelCritic-1.0.0.jar
PORT=3001 npm start
```

#### 2. Database Connection Issues

**Symptoms:** "Failed to connect to MongoDB"

**Solutions:**

- **Local MongoDB:** Ensure MongoDB service is running

  ```bash
  # Start MongoDB
  sudo systemctl start mongod  # Linux
  brew services start mongodb-community  # macOS
  ```

- **MongoDB Atlas:** Check connection string, username, password, and network access
- **Firewall:** Ensure ports 27017 (MongoDB) are open

#### 3. Backend Build Issues

**Symptoms:** Maven build fails

**Solutions:**

```bash
# Clean and rebuild
mvn clean compile

# Skip tests if they're failing
mvn clean package -DskipTests

# Check Java version
java -version  # Should be 17+
```

#### 4. Frontend Build Issues

**Symptoms:** npm install or npm start fails

**Solutions:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps

# Check Node version
node --version  # Should be 18+
```

#### 5. CORS Errors

**Symptoms:** "CORS policy error" in browser console

**Solutions:**

- Ensure backend is running on port 8080
- Verify CORS configuration in `application.properties`
- Check that frontend is accessing correct backend URL

#### 6. JWT Token Issues

**Symptoms:** Authentication fails or tokens expire immediately

**Solutions:**

- Ensure JWT_SECRET is at least 256 bits (32+ characters)
- Check JWT expiration time configuration
- Verify token storage in sessionStorage

### Debug Commands

```bash
# Check running processes
ps aux | grep java    # Backend processes
ps aux | grep node    # Frontend processes

# Check port usage
netstat -tlnp | grep :8080  # Backend port
netstat -tlnp | grep :3000  # Frontend port

# Check logs
tail -f movieApp.log        # Backend logs
# Frontend logs in browser console
```

## 📊 Monitoring & Maintenance

### Application Monitoring

#### Backend Monitoring

```bash
# Health status
curl http://localhost:8080/actuator/health

# Application info
curl http://localhost:8080/actuator/info

# Metrics (if enabled)
curl http://localhost:8080/actuator/metrics
```

#### Database Monitoring

```bash
# MongoDB shell
mongosh ReelCritic

# Check collections
show collections

# Check movie count
db.movies.countDocuments()

# Check users
db.users.find().pretty()
```

### Log Management

#### Backend Logs

- Console output: Real-time in terminal
- File logs: `movieApp.log` (if configured)

#### Frontend Logs

- Browser Developer Console
- Network tab for API requests

### Performance Optimization

#### Backend

```properties
# JVM tuning
-Xms512m -Xmx1024m -XX:+UseG1GC

# MongoDB connection pooling
spring.data.mongodb.options.max-connection-pool-size=10
```

#### Frontend

```bash
# Production build optimization
npm run build

# Bundle analysis
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

## 🔒 Security Considerations

### Production Security Checklist

- [ ] Change default JWT secret to a secure 256-bit key
- [ ] Use HTTPS in production (reverse proxy with SSL/TLS)
- [ ] Restrict CORS origins to your domain only
- [ ] Use strong MongoDB authentication
- [ ] Enable firewall rules for specific ports only
- [ ] Regular security updates for dependencies
- [ ] Secure database connection strings (use environment variables)
- [ ] Enable rate limiting (using reverse proxy)

### Security Configuration

#### HTTPS with Nginx (Reverse Proxy)

```nginx
# /etc/nginx/sites-available/cinemaverse
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🚀 Production Deployment Tips

### Server Requirements

**Minimum:**

- 2 GB RAM
- 2 CPU cores
- 10 GB storage
- Ubuntu 20.04+ or CentOS 8+

**Recommended:**

- 4 GB RAM
- 4 CPU cores  
- 20 GB SSD storage
- Load balancer for high availability

### Process Management

#### Using systemd (Linux)

**Backend Service:**

```ini
# /etc/systemd/system/cinemaverse-backend.service
[Unit]
Description=ReelCritic Backend Service
After=network.target

[Service]
Type=simple
User=cinemaverse
ExecStart=/usr/bin/java -jar /opt/reelcritic/ReelCritic-1.0.0.jar
Restart=always
RestartSec=10
Environment=SPRING_PROFILES_ACTIVE=prod

[Install]
WantedBy=multi-user.target
```

**Frontend Service:**

```ini
# /etc/systemd/system/cinemaverse-frontend.service
[Unit]
Description=ReelCritic Frontend Service
After=network.target

[Service]
Type=simple
User=cinemaverse
ExecStart=/usr/bin/serve -s /opt/reelcritic/frontend/build -l 3000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Start Services:**

```bash
sudo systemctl enable cinemaverse-backend cinemaverse-frontend
sudo systemctl start cinemaverse-backend cinemaverse-frontend
sudo systemctl status cinemaverse-backend cinemaverse-frontend
```

## 📋 Manual Deployment Checklist

### Pre-Deployment

- [ ] Java 17+ installed and configured
- [ ] Node.js 18+ installed and configured  
- [ ] Maven 3.8+ installed and configured
- [ ] MongoDB running (local or Atlas configured)
- [ ] Repository cloned and up to date
- [ ] Environment variables set (if needed)

### Backend Deployment

- [ ] Dependencies installed (`mvn clean install`)
- [ ] Database configuration verified
- [ ] JAR file built successfully
- [ ] Backend starts on port 8080
- [ ] Health check returns {"status":"UP"}
- [ ] API endpoints accessible

### Frontend Deployment

- [ ] Dependencies installed (`npm install`)
- [ ] API endpoint configuration verified
- [ ] Production build successful
- [ ] Frontend starts on port 3000
- [ ] Can connect to backend API
- [ ] All pages load correctly

### Final Verification

- [ ] Complete user workflow test (register → login → browse)
- [ ] Database contains sample data
- [ ] API responses are correct
- [ ] CORS configured properly
- [ ] Both services restart after system reboot
- [ ] Security configurations applied
- [ ] Monitoring setup (if applicable)

## 🆘 Getting Help

### Resources

- **Application Logs:** Check console output and log files
- **Database Tools:** Use MongoDB Compass for database inspection
- **API Testing:** Use Postman or curl for API testing
- **Browser Tools:** Use Developer Console for frontend debugging

### Common Commands Reference

```bash
# Quick restart both services
sudo systemctl restart cinemaverse-backend cinemaverse-frontend

# View live logs
sudo journalctl -u cinemaverse-backend -f
sudo journalctl -u cinemaverse-frontend -f

# Database backup
mongodump --db CinemaVerse --out /backup/cinemaverse-$(date +%Y%m%d)

# Update application
git pull origin main
mvn clean package -DskipTests
cd MovieReviewFrontend && npm run build
sudo systemctl restart cinemaverse-backend cinemaverse-frontend
```

---

🎬 **Congratulations!** Your ReelCritic application is now running manually!

Access your application at:

- **Frontend:** <http://localhost:3000>
- **Backend:** <http://localhost:8080>
- **API Docs:** <http://localhost:8080/swagger-ui.html>

Happy Movie Reviewing! 🍿✨
