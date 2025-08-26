# 🚀 ReelCritic Deployment Guide for Render.com

Complete step-by-step guide for deploying ReelCritic movie review platform to Render.com's free tier.

## 📋 Prerequisites

### Required Accounts

- [GitHub](https://github.com) account (for code repository)
- [Render.com](https://render.com) account (free tier)
- [MongoDB Atlas](https://mongodb.com/atlas) account (free tier)

### Local Requirements

- Git installed
- Node.js 18+ and npm
- Java 17+
- Maven 3.8+

## 🗃️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Database

1. **Sign up/Login to MongoDB Atlas**
   - Go to [MongoDB Atlas](https://mongodb.com/atlas)
   - Create account or sign in

2. **Create a New Cluster**
   - Click "Create a New Cluster"
   - Choose **M0 Sandbox** (FREE tier)
   - Select region closest to you
   - Name your cluster (e.g., "reelcritic-cluster")

3. **Configure Database Access**
   - Go to "Database Access" in sidebar
   - Click "Add New Database User"
   - Create username and strong password
   - Set "Database User Privileges" to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in sidebar  
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" in sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Save this for later (e.g., `mongodb+srv://username:password@cluster.mongodb.net/ReelCritic`)

## 🏗️ Repository Setup

### Step 1: Fork/Clone Repository

```bash
# If you haven't already, push your code to GitHub
git add .
git commit -m "Prepare for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ReelCritic.git
git push -u origin main
```

### Step 2: Verify Deployment Files

Ensure these files exist in your repository:

- ✅ `render.yaml` (deployment configuration)
- ✅ `Dockerfile.render` (Docker configuration)  
- ✅ `src/main/resources/application-production.properties`
- ✅ `MovieBookingFrontend/.env.production`

## 🚀 Render.com Deployment

### Method 1: Blueprint Deployment (Recommended)

1. **Login to Render.com**
   - Go to [Render.com](https://render.com)
   - Sign in with GitHub

2. **Create New Blueprint**
   - Click "New +"
   - Select "Blueprint"
   - Connect your GitHub repository
   - Select your ReelCritic repository
   - Branch: `main`
   - Render will detect the `render.yaml` file

3. **Configure Environment Variables**

   **Backend Service Environment Variables:**

   ```txt
   SPRING_PROFILES_ACTIVE=production
   MONGODB_URI=mongodb+srv://bhumika-aga:NEW_SECURE_PASSWORD@movie.elou1o4.mongodb.net/ReelCritic
   SPRING_DATA_MONGODB_DATABASE=ReelCritic
   JWT_SECRET=your_super_secret_jwt_key_256_bits_minimum
   JWT_EXPIRATION_MS=86400000
   CORS_ALLOWED_ORIGINS=https://reelcriticapp.onrender.com
   LOGGING_LEVEL_ROOT=WARN
   LOGGING_LEVEL_APP=INFO
   LOGGING_LEVEL_JWT=INFO
   MANAGEMENT_ENDPOINTS=health,info
   ```

   **Frontend Service Environment Variables:**

   ```txt
   REACT_APP_API_BASE_URL=https://reelcriticserver.onrender.com
   REACT_APP_ENV=production
   ```

4. **Deploy Services**
   - Click "Apply" to deploy both services
   - Wait for build and deployment (10-15 minutes)

### Method 2: Manual Service Creation

If Blueprint doesn't work, create services manually:

#### Backend Service

1. **Create Web Service**
   - New + → Web Service
   - Connect Repository: Your ReelCritic repo
   - Branch: `main`
   - Root Directory: Leave empty
   - Environment: `Docker`
   - Dockerfile Path: `Dockerfile.render`

2. **Configure Backend Service**
   - **Name:** `reelcritic-backend`
   - **Plan:** Free
   - **Health Check Path:** `/actuator/health`
   - **Auto-Deploy:** Yes

3. **Add Environment Variables** (as listed above)

#### Frontend Service

1. **Create Static Site**
   - New + → Static Site
   - Connect Repository: Your ReelCritic repo
   - Branch: `main`
   - Root Directory: `MovieReviewFrontend`
   - Build Command: `npm ci --legacy-peer-deps && npm run build`
   - Publish Directory: `build`

2. **Configure Frontend Service**
   - **Name:** `reelcritic-frontend`
   - **Plan:** Free
   - **Auto-Deploy:** Yes

3. **Add Environment Variables** (as listed above)

## 🔧 Configuration Details

### Environment Variables Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `SPRING_PROFILES_ACTIVE` | Activates production config | `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/ReelCritic` |
| `JWT_SECRET` | Secret key for JWT tokens (256-bit) | `YourSuperSecretKeyThatIs256BitsMinimumForSecurity` |
| `JWT_EXPIRATION_MS` | JWT token expiration time | `86400000` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `https://yourapp.onrender.com` |
| `LOGGING_LEVEL_ROOT` | Root logging level | `WARN` |
| `LOGGING_LEVEL_APP` | App logging level | `INFO` |
| `LOGGING_LEVEL_JWT` | JWT logging level | `INFO` |
| `MANAGEMENT_ENDPOINTS` | Actuator endpoints | `health,info` |
| `REACT_APP_API_BASE_URL` | Backend API URL for frontend | `https://backend.onrender.com` |

### Important Notes

- **Free Tier Limitations:**
  - Services spin down after 15 minutes of inactivity
  - First request after spin-down takes 30-60 seconds
  - 750 hours/month total (sufficient for personal projects)

- **Custom Domains:** Available on paid plans
- **Build Time:** Initial deployment takes 10-15 minutes
- **Auto-Deploy:** Services redeploy automatically on GitHub pushes

## 🎯 Post-Deployment Steps

### 1. Verify Deployment

**Backend Health Check:**

```bash
curl https://your-reelcritic-backend.onrender.com/actuator/health
```

**Expected Response:**

```json
{"status":"UP"}
```

**Frontend Access:**

- Open `https://your-reelcritic-frontend.onrender.com`
- Should display ReelCritic homepage

### 2. Test Core Functionality

1. **Browse Movies** - Homepage should display movie list
2. **User Registration** - Create new account
3. **User Login** - Sign in with created account
4. **Movie Search** - Search for movies
5. **API Endpoints** - Test via browser or Postman

### 3. Initialize Sample Data

The application automatically initializes with sample movie data on first startup. If needed, you can trigger reinitialization by restarting the backend service.

## 🔍 Troubleshooting

### Common Issues

#### 1. Backend Service Won't Start

**Symptoms:** Backend service fails during startup
**Solutions:**

- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Render logs for specific errors
- Ensure JWT_SECRET is at least 256 bits (32+ characters)

#### 2. CORS Errors

**Symptoms:** Frontend can't connect to backend
**Solutions:**

- Update `CORS_ALLOWED_ORIGINS` with exact frontend URL
- Ensure no trailing slashes in URLs
- Check both applications are deployed and running

#### 3. Database Connection Issues

**Symptoms:** "MongoDB connection failed" in logs
**Solutions:**

- Verify MongoDB Atlas connection string
- Check database user permissions
- Ensure network access allows Render IP ranges
- Test connection string locally first

#### 4. Frontend Build Fails

**Symptoms:** Frontend deployment fails during build
**Solutions:**

- Check Node.js version (use Node 18+)
- Verify all dependencies in package.json
- Use `npm ci --legacy-peer-deps` for build command
- Check TypeScript compilation errors

#### 5. Services Spin Down (Free Tier)

**Symptoms:** Slow response after inactivity
**Solutions:**

- Use services regularly to keep them active
- Implement "keep-alive" ping service (external)
- Upgrade to paid plan for always-on services

### Debugging Commands

**View Backend Logs:**

```bash
# In Render dashboard
Services → your-backend → Logs
```

**Test Local Production Build:**

```bash
# Backend
SPRING_PROFILES_ACTIVE=production java -jar target/ReelCritic-1.0.0.jar

# Frontend  
cd MovieReviewFrontend
npm run build
serve -s build
```

**Check Environment Variables:**

```bash
# In Render service settings
Environment → View all variables
```

## 📊 Monitoring & Maintenance

### Health Monitoring

- **Backend Health:** `https://your-backend.onrender.com/actuator/health`
- **Frontend Status:** Check if homepage loads correctly
- **API Status:** Test key endpoints regularly

### Log Access

- Render Dashboard → Services → Your Service → Logs
- Monitor for errors, performance issues
- Set up alerts for critical errors

### Updates & Maintenance

1. **Code Updates:**
   - Push to GitHub → Automatic redeploy
   - Monitor deployment in Render dashboard

2. **Dependency Updates:**
   - Update package.json and pom.xml regularly
   - Test locally before deploying

3. **Database Maintenance:**
   - Monitor MongoDB Atlas usage
   - Backup important data
   - Monitor connection limits

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] GitHub repository set up with all deployment files
- [ ] Render.com account created and connected to GitHub
- [ ] Backend service deployed and health check passing
- [ ] Frontend service deployed and accessible
- [ ] Environment variables configured correctly
- [ ] CORS configured for frontend-backend communication
- [ ] Sample data initialized in database
- [ ] User registration and login working
- [ ] Movie browsing and search functional
- [ ] API endpoints responding correctly

## 🆘 Support & Resources

### Render.com Resources

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [Render Status](https://status.render.com)

### MongoDB Atlas Resources  

- [Atlas Documentation](https://docs.atlas.mongodb.com)
- [Atlas Support](https://support.mongodb.com)

### Project Resources

- [ReelCritic Issues](https://github.com/YOUR_USERNAME/ReelCritic/issues)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/docs)

---

🎬 **Congratulations!** Your ReelCritic application is now live on Render.com!

Share your deployment: `https://your-frontend-app.onrender.com`

Happy Movie Reviewing! 🚀✨
