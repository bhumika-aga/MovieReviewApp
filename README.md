# 🎬 ReelCritic

**The Premium Movie Review Platform** - A sophisticated, production-ready full-stack movie review platform that combines the elegance of IMDb's design philosophy with modern web technologies. Built for movie enthusiasts and cinema critics, ReelCritic delivers an immersive, responsive experience that makes discovering, reviewing, and rating movies effortless and enjoyable.

## 🌟 What Makes ReelCritic Special?

ReelCritic isn't just another movie review app—it's a carefully crafted digital cinema experience that bridges the gap between movie discovery and comprehensive reviews. With its sleek IMDB-inspired dark theme, lightning-fast performance, and intuitive user interface, it transforms how users interact with cinema content.

**🎯 Perfect For:**

- 🎭 **Movie Enthusiasts** - Discover and review latest 2025 movies with rich metadata, ratings, and cast information
- 🎬 **Cinema Critics** - Write and read comprehensive movie reviews with community engagement
- 💻 **Developers** - Learn modern full-stack development with industry-standard technologies
- 🚀 **Startups** - Launch your movie review platform with a professional, scalable solution

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#️-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#️-running-the-application)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

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
- **External Booking Links**: Direct integration with external booking platforms
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

### Frontend Technologies

- **React** `19.1.1` - Modern UI framework with hooks and context
- **TypeScript** `4.9.5` - Type-safe JavaScript for better development experience
- **Material-UI** `5.15.0` - Professional component library with IMDB-inspired theming
- **React Router** `6.30.1` - Client-side routing for SPA navigation
- **Axios** `1.11.0` - Promise-based HTTP client with interceptors
- **React Hook Form** `7.62.0` - Performant form handling with validation

### Backend Technologies

- **Java** `17` - Modern LTS version with advanced features
- **Spring Boot** `3.4.8` - Production-ready application framework
- **Spring Security** `6.2.9` - Comprehensive security framework
- **Spring Data MongoDB** `3.4.8` - NoSQL data persistence layer
- **MongoDB** `4.4+` - Document-based production database
- **JWT (JSON Web Tokens)** `0.11.5` - Stateless authentication
- **Maven** `3.8+` - Dependency management and build automation
- **JUnit 5** `5.9.3` - Modern testing framework

### DevOps & Integration

- **Docker** - Containerization for consistent deployments
- **Render.com** - Cloud hosting platform with auto-deployment
- **GitHub Actions** - CI/CD pipeline support
- **TMDb API** - The Movie Database integration for rich poster content
- **Swagger/OpenAPI** `3.0` - Interactive API documentation
- **Lombok** - Java boilerplate code reduction
- **BCrypt** - Industry-standard password encryption

## 🏗️ Architecture

```txt
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Spring Boot    │    │    MongoDB      │
│   (Port 3000)   │◄──►│   Backend       │◄──►│   Database      │
│                 │    │  (Port 8080)    │    │                 │
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
cd ReelCritic
```

### 2. Backend Setup

#### MongoDB Configuration

The application is configured to use MongoDB Atlas. Update `src/main/resources/application.properties`:

```properties
# MongoDB Atlas connection
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/ReelCritic
spring.data.mongodb.database=ReelCritic
# or use local MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/ReelCritic
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
java -jar target/ReelCritic-1.0.0.jar
```

#### Build Frontend

```bash
cd MovieReviewFrontend
npm run build
# Serve the build folder using a web server
```

## 📚 API Documentation & Examples

### 🔐 Authentication Endpoints

#### User Registration

```http
POST /api/v1.0/moviebooking/register
Content-Type: application/json

{
  "username": "johnsmith",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "contactNumber": 9876543210,
  "password": "SecurePass123"
}
```

**Response (201 Created):**

```json
{
  "message": "User registered successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### User Login

```http
POST /api/v1.0/moviebooking/login
Content-Type: application/json

{
  "username": "johnsmith",
  "password": "SecurePass123"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": "65f1a2b3c4d5e6f7a8b9c0d1",
  "username": "johnsmith",
  "email": "john@example.com",
  "roles": ["ROLE_USER"]
}
```

### 🎬 Movie Endpoints

#### Get All Movies

```http
GET /api/v1.0/moviebooking/all
```

**Response (200 OK):**

```json
[
  {
    "movieId": "65f1a2b3c4d5e6f7a8b9c0d1",
    "movieName": "Avatar: The Way of Water",
    "director": "James Cameron",
    "cast": ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    "genre": "Action",
    "releaseDate": "2023-12-16",
    "duration": 192,
    "rating": 8.4,
    "reviewCount": 156,
    "description": "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora...",
    "trailerUrl": "https://www.youtube.com/watch?v=d9MyW72ELq0",
    "posterUrl": "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg",
    "theatres": [
      {
        "theatreName": "PVR Cinemas",
        "location": "Mumbai",
        "totalSeats": 200,
        "availableSeats": 150
      }
    ]
  }
]
```

#### Search Movies by Name

```http
GET /api/v1.0/moviebooking/movies/search/Avatar
```

#### Add New Movie (Admin Only)

```http
POST /api/v1.0/moviebooking/addMovie
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "movieName": "The Batman",
  "director": "Matt Reeves",
  "cast": ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
  "genre": "Action",
  "releaseDate": "2024-03-04",
  "duration": 176,
  "description": "When a killer targets Gotham's elite with a series of sadistic machinations...",
  "trailerUrl": "https://www.youtube.com/watch?v=mqqft2x_Aa4",
  "theatres": [
    {
      "theatreName": "INOX",
      "location": "Delhi",
      "totalSeats": 150,
      "availableSeats": 150
    }
  ]
}
```

### ⭐ Review Endpoints

#### Add Movie Review (Authentication Required)

```http
POST /api/v1.0/moviebooking/movies/Avatar: The Way of Water/reviews
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "rating": 4,
  "title": "Visually Stunning Masterpiece",
  "content": "James Cameron has outdone himself once again. The underwater sequences are breathtaking and the story builds beautifully on the first film. A must-watch in IMAX!"
}
```

**Response (200 OK):**

```json
{
  "message": "Review added successfully"
}
```

#### Get Movie Reviews

```http
GET /api/v1.0/moviebooking/movies/Avatar: The Way of Water/reviews
```

**Response (200 OK):**

```json
[
  {
    "reviewId": "65f2b3c4d5e6f7a8b9c0d1e2",
    "userId": "65f1a2b3c4d5e6f7a8b9c0d1",
    "username": "johnsmith",
    "fullName": "John Smith",
    "movieName": "Avatar: The Way of Water",
    "rating": 4,
    "title": "Visually Stunning Masterpiece",
    "content": "James Cameron has outdone himself once again...",
    "createdDate": "2025-08-26T10:30:00Z",
    "helpful": 23
  }
]
```

#### Mark Review as Helpful

```http
PUT /api/v1.0/moviebooking/reviews/65f2b3c4d5e6f7a8b9c0d1e2/helpful
```

### 🎫 Booking Endpoints

#### Book Tickets (Authentication Required)

```http
POST /api/v1.0/moviebooking/bookTicket
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "movieName": "Avatar: The Way of Water",
  "theatreName": "PVR Cinemas",
  "numberOfTickets": 2
}
```

**Response (200 OK):**

```json
{
  "message": "Tickets booked successfully!",
  "bookingId": "BK001",
  "movieName": "Avatar: The Way of Water",
  "theatreName": "PVR Cinemas",
  "numberOfTickets": 2,
  "totalPrice": 600
}
```

#### Get User Bookings

```http
GET /api/v1.0/moviebooking/getBookedTickets/johnsmith
Authorization: Bearer {jwt_token}
```

### 🔍 Error Response Format

All endpoints return consistent error responses:

```json
{
  "message": "Error description here",
  "timestamp": "2025-08-26T12:00:00Z",
  "status": 400
}
```

### 📖 Interactive Documentation

Access the complete Swagger UI documentation at:

- **Local:** `http://localhost:8080/swagger-ui.html`
- **Production:** `https://reelcriticserver.onrender.com/swagger-ui.html`

### 🔑 Authentication Headers

All protected endpoints require JWT token in Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🖼️ User Interface Overview

### 🏠 Homepage - Movie Discovery

The homepage features a **Netflix/IMDb-inspired dark theme** with golden accents:

- **Hero Section**: Featured movie carousel with high-quality posters
- **Movie Grid**: Responsive cards showing movie posters, ratings, and quick actions
- **Smart Search Bar**: Real-time movie search with auto-suggestions
- **Filter Options**: Genre-based filtering and sorting capabilities
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎬 Movie Details Page

Comprehensive movie information display:

- **High-Resolution Poster**: TMDb API integration for quality images
- **Movie Metadata**: Director, cast, genre, duration, release date
- **YouTube Trailer**: Embedded modal player for movie trailers
- **Star Rating System**: Visual 5-star rating display with average scores
- **Review Section**: User reviews with helpful voting system
- **Booking Integration**: Direct links to ticket booking platforms

### 🔐 Authentication UI

Modern, secure authentication experience:

- **Login Form**: Material-UI components with form validation
- **Registration Form**: Multi-step validation with password strength indicators
- **Password Visibility Toggle**: User-friendly password input
- **Error Handling**: Clear, contextual error messages
- **JWT Token Management**: Automatic token refresh and logout

### ⭐ Review System

Interactive review and rating platform:

- **Review Form**: Rich text editor for detailed movie reviews
- **Star Rating Input**: Interactive 5-star rating selection
- **Review Display**: Clean card layout with user information
- **Community Features**: "Helpful" voting system for reviews
- **User Profiles**: Individual review history pages

### 📱 Responsive Mobile UI

Mobile-first responsive design:

- **Collapsible Navigation**: Hamburger menu for mobile devices
- **Touch-Optimized**: Large touch targets and smooth scrolling
- **Optimized Images**: Progressive image loading and responsive sizing
- **Mobile Search**: Slide-out search interface for small screens

### 🎨 Design System

Professional Material-UI implementation:

- **Color Palette**: Dark theme (#121212) with golden accents (#F5C518)
- **Typography**: Roboto font family with clear hierarchy
- **Animations**: Smooth hover effects and loading states
- **Accessibility**: WCAG compliant with keyboard navigation support

## 📊 Sample UI Components

### Movie Card Component

```typescript
interface MovieCardProps {
  movie: {
    movieName: string;
    director: string;
    genre: string;
    rating: number;
    posterUrl: string;
    duration: number;
  };
  onViewDetails: (movieName: string) => void;
}
```

### Review Form Component

```typescript
interface ReviewFormProps {
  movieName: string;
  onSubmit: (review: {
    rating: number;
    title: string;
    content: string;
  }) => void;
}
```

## 🧪 Testing & Development

### 🔬 API Testing with cURL

#### Test User Registration

```bash
curl -X POST "http://localhost:8080/api/v1.0/moviebooking/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "contactNumber": 9876543210,
    "password": "TestPass123"
  }'
```

#### Test User Login

```bash
curl -X POST "http://localhost:8080/api/v1.0/moviebooking/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "TestPass123"
  }'
```

#### Test Get All Movies

```bash
curl -X GET "http://localhost:8080/api/v1.0/moviebooking/all" \
  -H "Accept: application/json"
```

#### Test Movie Search

```bash
curl -X GET "http://localhost:8080/api/v1.0/moviebooking/movies/search/Avatar" \
  -H "Accept: application/json"
```

#### Test Add Review (Replace {JWT_TOKEN} with actual token)

```bash
curl -X POST "http://localhost:8080/api/v1.0/moviebooking/movies/Avatar/reviews" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -d '{
    "rating": 5,
    "title": "Amazing Movie!",
    "content": "This movie exceeded all my expectations. Highly recommended!"
  }'
```

#### Test Book Tickets

```bash
curl -X POST "http://localhost:8080/api/v1.0/moviebooking/bookTicket" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -d '{
    "movieName": "Avatar",
    "theatreName": "PVR Cinemas",
    "numberOfTickets": 2
  }'
```

### 🧪 Automated Testing

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
ReelCritic/
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
reelcritic.app.jwtSecret=ReelCriticSecretKeyForJwtTokenGenerationThatIsLongEnoughForHMAC256
reelcritic.app.jwtExpirationMs=86400000

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

Run ReelCritic on your local machine or server:

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

Deploy ReelCritic to Render.com's free tier:

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
docker build -f Dockerfile.render -t reelcritic-backend .

# Build frontend image
cd MovieReviewFrontend
docker build -t reelcritic-frontend .

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
- ✅ Full review system with proper validation and error handling
- ✅ Seamless review submission and display functionality

### Phase 3 (Future) 🌟

- AI-powered movie recommendations based on reviews
- Social features and user profiles
- Mobile app (React Native)
- Multi-language support
- Real-time notifications for new reviews

## 👥 Authors & Contributors

- **Bhumika Agarwal** - _Project Creator & Lead Developer_ - [GitHub](https://github.com/bhumika-aga)

_We welcome contributions! See our [Contributing Guidelines](#-contributing) to get started._

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
