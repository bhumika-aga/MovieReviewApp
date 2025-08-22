# 🎬 CinemaVerse

**Your Universe of Cinema Reviews** - A sophisticated, production-ready full-stack movie review platform that combines the elegance of IMDB's design philosophy with modern web technologies. Built for movie enthusiasts and cinema critics, CinemaVerse delivers an immersive, responsive experience that makes discovering, reviewing, and booking movies effortless and enjoyable.

## 🌟 What Makes CinemaVerse Special?

CinemaVerse isn't just another movie review app—it's a carefully crafted digital cinema experience that bridges the gap between movie discovery and comprehensive reviews. With its sleek IMDB-inspired dark theme, lightning-fast performance, and intuitive user interface, it transforms how users interact with cinema content.

**🎯 Perfect For:**

- 🎭 **Movie Enthusiasts** - Discover and review latest 2025 movies with rich metadata, ratings, and cast information
- 🎬 **Cinema Critics** - Write and read comprehensive movie reviews with community engagement
- 💻 **Developers** - Learn modern full-stack development with industry-standard technologies
- 🚀 **Startups** - Launch your movie review platform with a professional, scalable solution

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#- architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#- running-the-application)
- [API Documentation](#-api-documentation)
- [Testing](# -testing)
- [Project Structure](# -project-structure)
- [Contributing](# -contributing)

## ✨ Features

### 🎭 User Features

- **Browse Latest Movies**: View 2025-2024 blockbusters with IMDB-like card design
- **Smart Poster Management**: High-quality movie posters with fallback mechanisms
- **Advanced Search & Filter**: Search movies by name with intelligent matching
- **Rich Movie Details**: Comprehensive movie information with cast, director, ratings, duration, and more
- **YouTube Trailer Integration**: Watch movie trailers directly in embedded modal players
- **Complete Review System**: Write detailed movie reviews with star ratings and community engagement
- **Secure Authentication**: JWT-based login, logout, and registration with form validation
- **Review Interactions**: Mark reviews as helpful and engage with the community
- **BookMyShow Integration**: Direct links to book tickets on BookMyShow
- **Responsive Design**: Mobile-first responsive UI with dark IMDB-inspired theme

### 👨‍💼 Admin Features

- **Complete Movie Management**: Add, update, delete movies with rich metadata and trailer URLs
- **Review Moderation**: Monitor and manage user reviews and community interactions
- **User Management**: Admin dashboard for user oversight and role management
- **Analytics Dashboard**: Track review counts, ratings, and user engagement metrics
- **Dynamic Data**: Automatic database initialization with latest 2025 movies

### 🎨 UI/UX Features

- **Modern IMDB-inspired Design**: Dark theme with golden accents
- **Material-UI v5**: Latest professional and polished components
- **Smart Image Handling**: Poster fallback system with SVG placeholders
- **Smooth Animations**: Loading states and hover effects
- **Comprehensive Error Handling**: User-friendly error messages and recovery

## 🛠️ Tech Stack

### Frontend

- **React** `19.1.1` - UI framework
- **TypeScript** `4.9.5` - Type-safe JavaScript
- **Material-UI** `5.15.0` - Component library
- **React Router** `6.30.1` - Client-side routing
- **Axios** `1.11.0` - HTTP client
- **React Hook Form** `7.62.0` - Form handling

### Backend

- **Java** `17` - Core programming language
- **Spring Boot** `3.4.8` - Application framework
- **Spring Security** `6.2.9` - Authentication & authorization
- **Spring Data MongoDB** `3.4.8` - Data persistence
- **MongoDB** - Production database
- **JWT** `0.11.5` - Token-based authentication
- **Maven** `3.8+` - Dependency management
- **JUnit 5** `5.9.3` - Testing framework

### Additional Technologies

- **TMDb API** - The Movie Database integration for posters
- **Swagger/OpenAPI** - API documentation
- **Lombok** - Java boilerplate reduction
- **BCrypt** - Password encryption
- **Auto-initialization** - Smart database seeding with latest movies

## 🏗️ Architecture

```txt
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Spring Boot    │    │    MongoDB      │
│   (Port 3000)   │◄──►│   Backend       │◄──►│   Database      │
│                 │    │  (Port 8000)    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Material-UI   │    │   JWT Security  │    │   Data Models   │
│   Components    │    │   + Spring      │    │   + Queries     │
│                 │    │   Security      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

### System Requirements

- **Java** 17 or higher
- **Node.js** 18+ and npm
- **MongoDB** 4.4+ (local or cloud)
- **Maven** 3.8+
- **Git** (for version control)

### Development Tools (Recommended)

- **VS Code** or **IntelliJ IDEA**
- **MongoDB Compass** (database GUI)
- **Postman** (API testing)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MovieBookingApp
```

### 2. Backend Setup

#### MongoDB Configuration

The application is configured to use MongoDB Atlas. Update `src/main/resources/application.properties`:

```properties
# MongoDB Atlas connection
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/CinemaVerse
spring.data.mongodb.database=CinemaVerse
# or use local MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/CinemaVerse
```

#### Install Backend Dependencies

```bash
mvn clean install
```

### 3. Frontend Setup

```bash
cd MovieReviewFrontend
npm install
```

## 🏃‍♂️ Running the Application

### Method 1: Development Mode

#### Start Backend (Terminal 1)

```bash
# From project root
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

#### Start Frontend (Terminal 2)

```bash
# From MovieReviewFrontend directory
cd MovieReviewFrontend
npm start
# Frontend runs on http://localhost:3000
```

### Method 2: Production Build

#### Build Backend JAR

```bash
mvn clean package -DskipTests
java -jar target/CinemaVerse-1.0.0.jar
```

#### Build Frontend

```bash
cd MovieReviewFrontend
npm run build
# Serve the build folder using a web server
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1.0/moviebooking/register` - User registration
- `POST /api/v1.0/moviebooking/login` - User login

### Movie Endpoints

- `GET /api/v1.0/moviebooking/all` - Get all movies
- `GET /api/v1.0/moviebooking/movies/search/{movieName}` - Search movies by name
- `POST /api/v1.0/moviebooking/addMovie` - Add movie (Admin only)
- `PUT /api/v1.0/moviebooking/update/{movieName}` - Update movie (Admin only)
- `DELETE /api/v1.0/moviebooking/delete/{movieName}` - Delete movie (Admin only)

### Review Endpoints

- `POST /api/v1.0/moviebooking/movies/{movieName}/reviews` - Add movie review (Auth required)
- `GET /api/v1.0/moviebooking/movies/{movieName}/reviews` - Get all reviews for a movie
- `GET /api/v1.0/moviebooking/users/{username}/reviews` - Get all reviews by a user
- `PUT /api/v1.0/moviebooking/reviews/{reviewId}/helpful` - Mark review as helpful

### Booking Endpoints

- `POST /api/v1.0/moviebooking/{movieName}/add` - Book movie tickets (Auth required)
- `GET /api/v1.0/moviebooking/userTickets/{movieName}` - Get all booked tickets (Admin only)
- `PUT /api/v1.0/moviebooking/{movieName}/update/{ticketId}` - Update ticket status (Admin only)

### Swagger Documentation

Access interactive API docs at: `http://localhost:8080/swagger-ui.html`

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=MovieServiceTest

# Run with coverage
mvn test jacoco:report
```

### Frontend Tests

```bash
cd MovieReviewFrontend

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in CI mode
npm test -- --ci --watchAll=false
```

## 📁 Project Structure

```txt
CinemaVerse/
├── src/main/java/com/moviebookingapp/
│   ├── controller/          # REST controllers
│   ├── model/              # Entity models
│   ├── repository/         # Data repositories
│   ├── service/            # Business logic
│   │   └── impl/           # Service implementations
│   ├── security/           # Security configuration
│   ├── config/             # Application configuration
│   └── MovieBookingAppApplication.java
├── src/main/resources/
│   ├── application.properties
│   ├── application-production.properties
│   └── static/
├── src/test/               # Backend tests
├── MovieReviewFrontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx
│   ├── public/             # Static assets
│   ├── .env.production     # Production environment
│   └── package.json
├── scripts/                # Deployment scripts
│   └── deploy.sh           # Render deployment prep
├── docker-compose.yml      # Docker configuration
├── Dockerfile.render       # Render Docker build
├── render.yaml             # Render Blueprint config
├── pom.xml                # Maven configuration
├── RENDER_DEPLOYMENT.md    # Render deployment guide
├── DEPLOYMENT.md          # General deployment guide
└── README.md              # This file
```

## 🔧 Configuration

### Backend Configuration (`application.properties`)

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/CinemaVerse
spring.data.mongodb.database=CinemaVerse

# JWT Configuration
cinemaverse.app.jwtSecret=CinemaVerseSecretKeyForJwtTokenGenerationThatIsLongEnoughForHMAC256
cinemaverse.app.jwtExpirationMs=86400000

# Logging
logging.level.com.moviebookingapp=DEBUG
logging.file.name=./movieApp.log

# Swagger
springdoc.api-docs.path=/api-docs
```

### Frontend Configuration

Environment variables can be set in `.env` file:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_ENV=development
```


## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Cross-origin resource sharing setup
- **Role-based Access**: Admin and user role separation
- **Input Validation**: Comprehensive input validation
- **Security Headers**: Security headers configuration

## 🚀 Deployment

### 🏠 Manual Deployment (Local/Server)

Run CinemaVerse on your local machine or server:

```bash
# Quick setup guide
cat MANUAL_DEPLOYMENT.md

# Automated preparation
./scripts/deploy.sh
```

**📋 Manual Deployment Checklist:**

- [ ] Java 17+ and Node.js 18+ installed
- [ ] MongoDB running (local or Atlas)
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3000
- [ ] Database initialized with sample data

**🔗 Access Points:**

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:8080>
- API Docs: <http://localhost:8080/swagger-ui.html>

### 🎯 Render.com Deployment (Cloud)

Deploy CinemaVerse to Render.com's free tier:

```bash
# Prepare for cloud deployment
./scripts/deploy.sh

# Follow cloud deployment guide  
cat RENDER_DEPLOYMENT.md
```

**📋 Deployment Checklist:**

- [ ] MongoDB Atlas database setup
- [ ] GitHub repository configured
- [ ] Render.com Blueprint deployment
- [ ] Environment variables configured
- [ ] Frontend-backend connectivity verified

**🔗 Live Demo:** [Coming Soon]

### Docker Deployment

```bash
# Build backend image
docker build -f Dockerfile.render -t cinemaverse-backend .

# Build frontend image  
cd MovieReviewFrontend
docker build -t cinemaverse-frontend .

# Run with docker-compose
docker-compose up -d
```

### Alternative Cloud Platforms

- **Backend**: AWS, Heroku, Azure, Railway
- **Frontend**: Netlify, Vercel, AWS S3, Firebase Hosting  
- **Database**: MongoDB Atlas (recommended), AWS DocumentDB

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🔮 Roadmap

### Phase 1 (Current) ✅

- Core movie browsing and authentication
- IMDB-inspired UI/UX design
- MongoDB integration with latest 2025-2024 movies
- TMDb API integration for poster management
- BookMyShow integration for ticket booking
- Review-focused user interface
- Smart fallback systems and error handling

### Phase 2 (Completed) ✅

- ✅ User-generated movie reviews and ratings with star system
- ✅ Review voting and community engagement (helpful votes)
- ✅ YouTube trailer integration with modal player
- ✅ Complete authentication flow with JWT security
- ✅ IMDb-like responsive UI with dark theme

### Phase 3 (Future) 🌟

- AI-powered movie recommendations based on reviews
- Social features and user profiles
- Mobile app (React Native)
- Multi-language support
- Real-time notifications for new reviews

## 👥 Authors & Contributors

- **Bhumika Agarwal** - *Project Creator & Lead Developer* - [GitHub](https://github.com/bhumika-aga)

*We welcome contributions! See our [Contributing Guidelines](#-contributing) to get started.*

## 🙏 Acknowledgments & Inspiration

- **IMDB** - For setting the gold standard in movie database UI/UX design
- **Spring Boot Community** - For comprehensive documentation and best practices
- **Material-UI Team** - For creating beautiful, accessible React components
- **React Team** - For revolutionizing frontend development
- **MongoDB** - For flexible, scalable database solutions
- **Open Source Community** - For the amazing ecosystem of tools and libraries

## 📊 Project Stats

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.8-green?style=flat-square&logo=spring)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue?style=flat-square&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-5.15.0-blue?style=flat-square&logo=mui)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)

---

**⭐ Star this repository if you find it helpful!**

Built with ❤️ and lots of ☕ by developers who love great cinema experiences

Happy Coding & Happy Watching! 🎬✨
