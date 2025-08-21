# 🎬 CinemaVerse

Your Universe of Cinema Experiences - A modern full-stack movie booking platform with IMDB-inspired design, featuring cutting-edge React frontend and robust Spring Boot backend with comprehensive movie management and seamless booking capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## ✨ Features

### 🎭 User Features
- **Browse Movies**: View movies with IMDB-like card design
- **Search & Filter**: Search movies by name and filter by genre
- **Movie Details**: Comprehensive movie information (cast, director, rating, etc.)
- **User Authentication**: Secure login and registration with JWT
- **Ticket Booking**: Book tickets for available shows
- **Responsive Design**: Mobile-first responsive UI

### 👨‍💼 Admin Features
- **Movie Management**: Add, update, delete movies
- **Theatre Management**: Manage theatre and show timings
- **User Management**: Admin dashboard for user oversight
- **Analytics**: View booking statistics and reports

### 🎨 UI/UX Features
- **IMDB-like Design**: Dark theme with yellow accents
- **Material-UI Components**: Professional and polished interface
- **Real-time Updates**: Dynamic content updates
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

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
- **Kafka** - Event streaming platform
- **Swagger/OpenAPI** - API documentation
- **Lombok** - Java boilerplate reduction
- **BCrypt** - Password encryption

## 🏗️ Architecture

```
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
Update `src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/MovieBookingApp
# or use MongoDB Atlas cloud connection
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/MovieBookingApp
```

#### Install Backend Dependencies
```bash
mvn clean install
```

### 3. Frontend Setup
```bash
cd MovieBookingFrontend
npm install
```

## 🏃‍♂️ Running the Application

### Method 1: Development Mode

#### Start Backend (Terminal 1)
```bash
# From project root
mvn spring-boot:run
# Backend runs on http://localhost:8000
```

#### Start Frontend (Terminal 2)
```bash
# From MovieBookingFrontend directory
cd MovieBookingFrontend
npm start
# Frontend runs on http://localhost:3000
```

### Method 2: Production Build

#### Build Backend JAR
```bash
mvn clean package -DskipTests
java -jar target/MovieBookingApp-0.0.1-SNAPSHOT.jar
```

#### Build Frontend
```bash
cd MovieBookingFrontend
npm run build
# Serve the build folder using a web server
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1.0/moviebooking/register` - User registration
- `POST /api/v1.0/moviebooking/login` - User login

### Movie Endpoints
- `GET /api/v1.0/moviebooking/all` - Get all movies
- `GET /api/v1.0/moviebooking/movies/search/{movieName}` - Search movies
- `POST /api/v1.0/moviebooking/addMovie` - Add movie (Admin)
- `PUT /api/v1.0/moviebooking/update/{movieName}` - Update movie (Admin)
- `DELETE /api/v1.0/moviebooking/delete/{movieName}` - Delete movie (Admin)

### Booking Endpoints
- `POST /api/v1.0/moviebooking/bookTicket` - Book tickets
- `GET /api/v1.0/moviebooking/getAllBookedTickets` - Get all bookings
- `GET /api/v1.0/moviebooking/getBookedTickets/{loginId}` - Get user bookings

### Swagger Documentation
Access interactive API docs at: `http://localhost:8000/swagger-ui.html`

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
cd MovieBookingFrontend

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in CI mode
npm test -- --ci --watchAll=false
```

## 📁 Project Structure

```
MovieBookingApp/
├── src/main/java/com/moviebookingapp/
│   ├── controller/          # REST controllers
│   ├── model/              # Entity models
│   ├── repository/         # Data repositories
│   ├── service/            # Business logic
│   ├── security/           # Security configuration
│   ├── config/             # Application configuration
│   └── MovieBookingAppApplication.java
├── src/main/resources/
│   ├── application.properties
│   └── static/
├── src/test/               # Backend tests
├── MovieBookingFrontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx
│   ├── public/             # Static assets
│   └── package.json
├── pom.xml                 # Maven configuration
└── README.md
```

## 🔧 Configuration

### Backend Configuration (`application.properties`)
```properties
# Server Configuration
server.port=8000

# Database Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/MovieBookingApp
spring.data.mongodb.database=MovieBookingApp

# JWT Configuration
moviebookingapp.app.jwtSecret=yourSecretKey
moviebookingapp.app.jwtExpirationMs=86400000

# Logging
logging.level.com.moviebookingapp=DEBUG
logging.file.name=./movieApp.log

# Swagger
springdoc.api-docs.path=/api-docs
```

### Frontend Configuration
Environment variables can be set in `.env` file:
```env
REACT_APP_API_BASE_URL=http://localhost:8000
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

### Docker Deployment
```bash
# Build backend image
docker build -t moviebooking-backend .

# Build frontend image
cd MovieBookingFrontend
docker build -t moviebooking-frontend .

# Run with docker-compose
docker-compose up -d
```

### Cloud Deployment
- **Backend**: Deploy to AWS, Heroku, or Azure
- **Frontend**: Deploy to Netlify, Vercel, or AWS S3
- **Database**: Use MongoDB Atlas for cloud database

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- **Bhumika Agarwal** - *Initial work* - [GitHub](https://github.com/bhumika-aga)

## 🙏 Acknowledgments

- IMDB for design inspiration
- Spring Boot community for excellent documentation
- Material-UI team for beautiful components
- React team for the amazing framework

---

**Happy Coding! 🎬✨**