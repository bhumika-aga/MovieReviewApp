# 🚀 MovieBooking Application Deployment Guide

## ✅ Pre-Deployment Verification

### Backend Status
- ✅ **Spring Boot 3.4.8** - Latest version configured
- ✅ **Java 17** - Compiler and runtime configured
- ✅ **Spring Security 6.2.9** - Modern security implementation
- ✅ **JWT 0.11.5** - Token authentication working
- ✅ **MongoDB Integration** - Database connectivity established
- ✅ **JUnit 5.9.3** - Testing framework updated
- ✅ **Maven Build** - Clean compilation and packaging

### Frontend Status
- ✅ **React 19.1.1** - Latest version implemented
- ✅ **TypeScript 4.9.5** - Type checking configured
- ✅ **Material-UI 5.15.0** - Component library integrated
- ✅ **React Router 6.30.1** - Navigation implemented
- ✅ **Axios 1.11.0** - API communication ready
- ✅ **React Hook Form 7.62.0** - Form handling implemented
- ✅ **Production Build** - Optimized build created

## 🔧 Environment Setup

### System Requirements
```bash
# Check versions
java -version    # Should be 17+
node --version   # Should be 18+
npm --version    # Should be 9+
mvn --version    # Should be 3.8+
```

### Database Setup
```bash
# MongoDB (Local)
mongod --version  # Should be 4.4+

# Or MongoDB Atlas (Cloud)
# Update application.properties with cloud connection string
```

## 🏃‍♂️ Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd MovieBookingApp

# Backend dependencies
mvn clean install

# Frontend dependencies
cd MovieBookingFrontend
npm install --legacy-peer-deps
cd ..
```

### 2. Environment Configuration

#### Backend (`src/main/resources/application.properties`)
```properties
# Server
server.port=8000

# Database
spring.data.mongodb.uri=mongodb://localhost:27017/MovieBookingApp
# OR for cloud:
# spring.data.mongodb.uri=mongodb+srv://user:pass@cluster.mongodb.net/MovieBookingApp

# JWT (Use a secure key in production)
moviebookingapp.app.jwtSecret=yourSecretKeyForJwtTokenGenerationThatIsLongEnoughForHMAC256
moviebookingapp.app.jwtExpirationMs=86400000

# Logging
logging.level.com.moviebookingapp=INFO
logging.file.name=./logs/movieApp.log
```

#### Frontend (`.env` in MovieBookingFrontend/)
```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_ENV=production
```

### 3. Run Application

#### Development Mode
```bash
# Terminal 1: Start Backend
mvn spring-boot:run

# Terminal 2: Start Frontend
cd MovieBookingFrontend
npm start
```

#### Production Mode
```bash
# Build Backend
mvn clean package -DskipTests
java -jar target/MovieBookingApp-0.0.1-SNAPSHOT.jar

# Build Frontend
cd MovieBookingFrontend
npm run build
# Serve build/ folder using web server
```

## 🌐 Access Points

### Application URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/swagger-ui.html
- **Actuator**: http://localhost:8000/actuator

### Default Login (if seed data is loaded)
- **Admin**: admin@movie.com / admin123
- **User**: user@movie.com / user123

## 🔄 CI/CD Pipeline

### Build Commands
```bash
# Backend Build & Test
mvn clean compile
mvn test
mvn package

# Frontend Build & Test
npm run type-check
npm run build
# npm test (requires additional Jest configuration)
```

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
EXPOSE 8000
ENTRYPOINT ["java","-jar","/app.jar"]

# Frontend Dockerfile  
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
```

## 📊 Monitoring & Health Checks

### Backend Health
```bash
curl http://localhost:8000/actuator/health
```

### Application Metrics
```bash
curl http://localhost:8000/actuator/metrics
curl http://localhost:8000/actuator/info
```

## 🔒 Security Configuration

### Production Security Checklist
- [ ] Update JWT secret key (256-bit minimum)
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Configure security headers
- [ ] Enable logging and monitoring
- [ ] Set up database authentication
- [ ] Review exposed actuator endpoints

### Environment Variables (Production)
```bash
# Backend
SPRING_PROFILES_ACTIVE=prod
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secure-256-bit-key
LOGGING_LEVEL=WARN

# Frontend
REACT_APP_API_BASE_URL=https://your-api-domain.com
REACT_APP_ENV=production
```

## 🚨 Troubleshooting

### Common Issues

#### Backend Issues
```bash
# Port already in use
lsof -ti:8000 | xargs kill -9

# MongoDB connection issues
mongod --config /usr/local/etc/mongod.conf --fork

# JWT issues
# Ensure secret key is at least 256 bits (32+ characters)
```

#### Frontend Issues
```bash
# Dependency conflicts
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Build issues
rm -rf build/
npm run build

# CORS issues (development)
# Use proxy in package.json or configure backend CORS
```

### Log Locations
- **Backend Logs**: `./logs/movieApp.log`
- **Frontend Logs**: Browser Developer Console
- **Build Logs**: `./target/` and `./build/`

## 📈 Performance Optimization

### Backend
- Enable database indexing
- Configure connection pooling
- Set up caching with Redis
- Optimize JVM parameters
- Use production profiles

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement code splitting
- Optimize bundle size
- Enable browser caching

## 🧪 Testing Strategy

### Backend Testing
```bash
mvn test                    # Unit tests
mvn integration-test        # Integration tests
mvn verify                  # All tests + quality checks
```

### Frontend Testing
```bash
npm run type-check          # TypeScript validation
npm run build               # Build validation
# npm test                  # Unit tests (needs Jest config)
```

### API Testing
```bash
# Use Postman collection or curl
curl -X GET http://localhost:8000/api/v1.0/moviebooking/all
curl -X POST http://localhost:8000/api/v1.0/moviebooking/login \
  -H "Content-Type: application/json" \
  -d '{"loginId":"user","password":"pass"}'
```

## 📋 Production Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Security review completed
- [ ] Performance testing done
- [ ] Database migrations ready
- [ ] Environment variables configured
- [ ] SSL certificates installed

### Deployment
- [ ] Blue-green deployment strategy
- [ ] Database backup created
- [ ] Health checks configured
- [ ] Monitoring alerts set up
- [ ] Rollback plan prepared

### Post-Deployment
- [ ] Smoke tests executed
- [ ] Performance metrics monitored
- [ ] Error rates checked
- [ ] User acceptance testing
- [ ] Documentation updated

---

**Ready for Production! 🎬✨**