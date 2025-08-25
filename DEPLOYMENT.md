# 🚀 ReelCritic Deployment Overview

ReelCritic movie review platform supports multiple deployment strategies to suit different needs and environments. This guide provides an overview and directs you to the appropriate detailed deployment guide.

## 🎯 Choose Your Deployment Method

### 🏠 Manual/Local Deployment

**Best for:** Development, testing, self-hosted solutions, full control

- **Ports:** Backend (8080), Frontend (3000)
- **Database:** Local MongoDB or MongoDB Atlas
- **Requirements:** Java 17+, Node.js 18+, Maven 3.8+

📖 **[Complete Manual Deployment Guide →](MANUAL_DEPLOYMENT.md)**

### ☁️ Cloud Deployment (Render.com)

**Best for:** Production hosting, automatic scaling, managed infrastructure

- **Platform:** Render.com (free tier available)
- **Database:** MongoDB Atlas (required)
- **Features:** Auto-deploy, health checks, custom domains

📖 **[Complete Cloud Deployment Guide →](RENDER_DEPLOYMENT.md)**

## 🛠️ Quick Start Commands

### Manual Deployment

```bash
# Prepare and validate
./scripts/deploy.sh

# Start backend (Terminal 1)
mvn spring-boot:run

# Start frontend (Terminal 2)
cd MovieReviewFrontend && npm start
```

### Cloud Deployment

```bash
# Prepare for cloud
./scripts/deploy.sh

# Push to GitHub
git push origin main

# Follow Render.com setup in RENDER_DEPLOYMENT.md
```

## ✅ Current Application Status

### Backend Features

- ✅ **Spring Boot 3.4.8** - Latest stable version
- ✅ **Java 17** - Modern JVM features
- ✅ **Spring Security 6.2.9** - Advanced security
- ✅ **JWT 0.11.5** - Secure token authentication
- ✅ **MongoDB Integration** - Cloud and local support
- ✅ **JUnit 5.9.3** - Comprehensive testing
- ✅ **Maven Build** - Reliable dependency management

### Frontend Features

- ✅ **React 19.1.1** - Latest React features
- ✅ **TypeScript 4.9.5** - Type-safe development
- ✅ **Material-UI 5.15.0** - Professional UI components
- ✅ **React Router 6.30.1** - Modern client-side routing
- ✅ **Axios 1.11.0** - HTTP client with interceptors
- ✅ **React Hook Form 7.62.0** - Efficient form handling

### Production Ready Features

- ✅ **Modern Movie Collection** - 2023-2024 latest blockbusters with comprehensive metadata
- ✅ **Complete Review System** - User reviews with star ratings and community interaction
- ✅ **YouTube Trailer Integration** - Embedded trailer playback with modal interface
- ✅ **IMDB-inspired Design** - Professional dark theme with Material-UI v5 and golden accents
- ✅ **Responsive Layout** - Mobile-first approach across all devices with smooth animations
- ✅ **JWT Authentication System** - Secure token-based auth with login/logout/registration
- ✅ **Advanced Search & Filtering** - Intelligent movie search with fuzzy matching
- ✅ **Auto Database Initialization** - Smart seeding with comprehensive movie data
- ✅ **API Documentation** - Complete Swagger/OpenAPI documentation with all endpoints
- ✅ **Review Analytics** - Community engagement features with helpful vote system
- ✅ **Environment Configuration** - Multi-environment support with proper security configs

## 🌐 Access Points

### Manual Deployment URLs

- **Frontend:** <http://localhost:3000>
- **Backend API:** <http://localhost:8080>
- **API Documentation:** <http://localhost:8080/swagger-ui.html>
- **Health Check:** <http://localhost:8080/actuator/health>
- **Database:** MongoDB (local:27017 or Atlas)

### Cloud Deployment URLs

- **Frontend:** <https://your-app-name.onrender.com>
- **Backend API:** <https://your-backend-name.onrender.com>
- **API Documentation:** <https://your-backend-name.onrender.com/swagger-ui.html>
- **Health Check:** <https://your-backend-name.onrender.com/actuator/health>

## 📋 Deployment Comparison

| Feature | Manual Deployment | Cloud Deployment |
|---------|------------------|------------------|
| **Cost** | Free (own hardware) | Free tier available |
| **Setup Time** | 15-30 minutes | 30-45 minutes |
| **Maintenance** | Self-managed | Managed service |
| **Scaling** | Manual | Auto-scaling |
| **SSL/HTTPS** | Manual setup | Automatic |
| **Custom Domain** | Self-configured | Easy setup |
| **Database** | Local or Atlas | Atlas required |
| **Backups** | Manual | Platform-managed |
| **Monitoring** | Self-setup | Built-in |
| **Updates** | Manual | Git-based auto-deploy |

## 🔧 Environment Configuration

### Development

```properties
server.port=8080
spring.profiles.active=development
cors.allowed.origins=http://localhost:3000
```

### Production (Manual)

```properties
server.port=8080
spring.profiles.active=production
cors.allowed.origins=https://yourdomain.com
```

### Production (Cloud)

```properties
server.port=${PORT}
spring.profiles.active=production
cors.allowed.origins=${CORS_ALLOWED_ORIGINS}
```

## 🚨 Common Issues & Solutions

### Port Conflicts

- **Issue:** Port 8080 or 3000 already in use
- **Solution:** Kill existing processes or use different ports
- **Commands:** `lsof -ti:8080 | xargs kill -9`

### Database Connection

- **Issue:** MongoDB connection failed
- **Solutions:**
  - Local: Start MongoDB service
  - Atlas: Check connection string and network access

### CORS Errors

- **Issue:** Frontend cannot reach backend
- **Solutions:**
  - Verify backend is running on correct port
  - Check CORS configuration includes frontend URL

### Build Failures

- **Issue:** Maven or npm build fails
- **Solutions:**
  - Check Java/Node versions
  - Clear caches: `mvn clean`, `npm cache clean --force`
  - Update dependencies if needed

## 📈 Next Steps After Deployment

1. **Test Core Features**
   - User registration, login, and logout
   - Movie browsing, search, and detail views
   - YouTube trailer integration
   - Review submission and interaction
   - API endpoints functionality

2. **Configure Monitoring** (Production)
   - Set up logging aggregation
   - Configure health check alerts
   - Monitor resource usage

3. **Security Hardening** (Production)
   - Update default JWT secret
   - Enable HTTPS
   - Configure rate limiting
   - Regular dependency updates

4. **Performance Optimization**
   - Database indexing
   - CDN for static assets
   - Caching strategies
   - Bundle size optimization

## 📚 Additional Resources

- **[Manual Deployment Guide](MANUAL_DEPLOYMENT.md)** - Complete local setup
- **[Cloud Deployment Guide](RENDER_DEPLOYMENT.md)** - Render.com deployment
- **[Project README](README.md)** - Project overview and features
- **[API Documentation](http://localhost:8080/swagger-ui.html)** - Interactive API docs

## 🆘 Getting Help

If you encounter issues during deployment:

1. Check the specific deployment guide for your method
2. Review the troubleshooting sections
3. Verify all prerequisites are met
4. Check application logs for specific error messages

---

**Choose your preferred deployment method and follow the corresponding detailed guide for step-by-step instructions.**

🎬 **Happy Movie Reviewing!** ✨
