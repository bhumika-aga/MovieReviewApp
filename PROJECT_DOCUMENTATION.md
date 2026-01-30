# 🎬 ReelCritic Project Documentation

A comprehensive guide to the architecture, concepts, and implementation of the ReelCritic movie review platform.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Authentication Flow](#authentication-flow)
- [Database Design](#database-design)
- [API Design Patterns](#api-design-patterns)
- [Frontend Architecture](#frontend-architecture)
- [Security Implementation](#security-implementation)
- [Data Initialization](#data-initialization)
- [Key Technical Concepts](#key-technical-concepts)

---

## Architecture Overview

ReelCritic follows a **three-tier architecture** separating concerns between presentation, business logic, and data persistence.

```txt
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React + TypeScript Frontend                 │   │
│  │  • Material-UI Components • React Router • Axios HTTP   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │ REST API (JSON)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │             Spring Boot Backend (Java 17)                │   │
│  │  • Controllers • Services • Security • Repositories      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │ MongoDB Driver
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    MongoDB Database                      │   │
│  │  Collections: users, movies, reviews, roles, tickets     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Backend Package Structure

```txt
com.moviebookingapp/
├── controller/       # REST endpoints (HTTP request handling)
├── service/          # Business logic layer
│   └── impl/         # Service implementations
├── repository/       # Data access layer (MongoDB queries)
├── model/            # Domain entities (Movie, User, Review, etc.)
├── payload/          # Request/Response DTOs
├── security/         # Authentication & authorization
│   └── jwt/          # JWT token handling
├── config/           # Application configuration beans
└── exception/        # Custom exception handlers
```

---

## Authentication Flow

ReelCritic uses **JWT (JSON Web Token)** for stateless authentication.

### Registration Flow

```txt
┌────────┐     POST /register      ┌────────────┐
│ Client │ ───────────────────────▶│ AuthController │
└────────┘   {username, password,  └────────────┘
              email, firstName...}        │
                                          ▼
                                 ┌─────────────────┐
                                 │ Validate Input  │
                                 │ Check Duplicates│
                                 └─────────────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │ Hash Password   │◀──── BCryptPasswordEncoder
                                 │ (BCrypt)        │
                                 └─────────────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │ Save to MongoDB │
                                 │ Assign ROLE_USER│
                                 └─────────────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │ Generate JWT    │
                                 │ Return Token    │
                                 └─────────────────┘
```

### Login Flow

```txt
┌────────┐     POST /login         ┌────────────┐
│ Client │ ───────────────────────▶│ AuthController │
└────────┘   {username, password}  └────────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │AuthenticationManager│
                                 │ Validate Creds  │
                                 └─────────────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │ JwtUtils        │
                                 │ Generate Token  │──── HMAC-SHA256 Signing
                                 └─────────────────┘
                                          │
                                          ▼
                    ┌────────────────────────────────────┐
                    │ Response: {token, type, id, roles} │
                    └────────────────────────────────────┘
```

### JWT Token Structure

```javascript
// Header
{
  "alg": "HS256",      // HMAC-SHA256 algorithm
  "typ": "JWT"
}

// Payload
{
  "sub": "username",   // Subject (username)
  "iat": 1706598000,   // Issued at timestamp
  "exp": 1706684400    // Expiration (24 hours)
}

// Signature
HMACSHA256(base64(header) + "." + base64(payload), secret)
```

### Request Authentication

Every protected endpoint requires the `Authorization` header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The `AuthTokenFilter` intercepts requests, validates tokens, and sets the security context.

---

## Database Design

### MongoDB Collections

#### `users` Collection

```javascript
{
  "_id": ObjectId,
  "username": String (unique, required),
  "firstName": String (required),
  "lastName": String (required),
  "email": String (unique, required),
  "password": String (BCrypt hashed),
  "contactNumber": Long,
  "role": [DBRef -> roles]  // Array of role references
}
```

#### `movies` Collection

```javascript
{
  "_id": ObjectId,
  "movieName": String (required),
  "theatreName": String,
  "reviewCount": Integer,
  "status": String ("NOW SHOWING" | "COMING SOON" | "CLASSIC"),
  "moviePoster": String (URL),
  "description": String,
  "director": String,
  "cast": [String],
  "genre": String,
  "language": String,
  "duration": Integer (minutes),
  "rating": Double (1-10),
  "releaseDate": LocalDate,
  "certificate": String ("PG" | "PG-13" | "R"),
  "trailerUrl": String (YouTube URL),
  "bookMyShowUrl": String,
  "ticketsAvailable": Integer,
  "ticketStatus": String
}
```

#### `reviews` Collection

```javascript
{
  "_id": ObjectId,
  "userId": ObjectId (reference),
  "username": String,
  "fullName": String,
  "movieName": String,
  "rating": Integer (1-5 stars),
  "title": String,
  "content": String,
  "createdDate": DateTime,
  "helpful": Integer (vote count)
}
```

#### `roles` Collection

```javascript
{
  "_id": ObjectId,
  "name": String ("ROLE_USER" | "ROLE_ADMIN")
}
```

---

## API Design Patterns

### RESTful Endpoint Convention

```txt
Base URL: /api/v1.0/moviebooking

GET    /all                          # List all movies
GET    /movies/search/{movieName}    # Search movies
POST   /addMovie                     # Create movie (Admin)
PUT    /{movieName}/update           # Update movie (Admin)
DELETE /{movieName}/delete           # Delete movie (Admin)

POST   /register                     # User registration
POST   /login                        # User authentication

GET    /movies/{movieName}/reviews   # Get movie reviews
POST   /movies/{movieName}/reviews   # Add review (Auth required)
PUT    /reviews/{id}/helpful         # Mark review helpful
```

### Response Format

**Success Response:**

```json
{
  "data": [...],
  "message": "Operation successful"
}
```

**Error Response:**

```json
{
  "message": "Error description",
  "timestamp": "2025-01-30T10:00:00Z",
  "status": 400
}
```

---

## Frontend Architecture

### Component Hierarchy

```txt
App.tsx
├── Navbar.tsx              # Navigation with auth state
├── Routes
│   ├── MovieList.tsx       # Home page (movie grid)
│   ├── MovieDetail.tsx     # Single movie view + reviews
│   ├── Login.tsx           # Authentication form
│   ├── Registration.tsx    # User signup form
│   ├── AddMovie.tsx        # Admin: add movie
│   └── UpdateMovie.tsx     # Admin: edit movie
└── Services
    ├── MovieService.ts     # Movie API calls
    ├── AuthService.ts      # Auth API calls
    ├── ReviewService.ts    # Review API calls
    └── PosterService.ts    # Image fallback logic
```

### State Management

- **AuthContext**: Global authentication state (user, token, roles)
- **Local State**: Component-specific state using React hooks
- **Session Storage**: JWT token persistence

### Poster Fallback System

The `PosterService` implements a multi-tier fallback for movie images:

```txt
1. Primary URL (stored in database)
       ↓ (if fails)
2. TMDb API lookup by movie name
       ↓ (if fails)
3. Amazon/IMDb URL pattern
       ↓ (if fails)
4. SVG placeholder with movie initials
```

---

## Security Implementation

### Spring Security Configuration

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    // Public endpoints (no auth required)
    .requestMatchers("/api/v1.0/moviebooking/register").permitAll()
    .requestMatchers("/api/v1.0/moviebooking/login").permitAll()
    .requestMatchers("/api/v1.0/moviebooking/all").permitAll()
    .requestMatchers(HttpMethod.GET, "/api/v1.0/moviebooking/**").permitAll()

    // Protected endpoints (auth required)
    .anyRequest().authenticated()
}
```

### Password Security

- **Algorithm**: BCrypt (adaptive hashing)
- **Strength**: Default cost factor (10 rounds)
- **Implementation**: `BCryptPasswordEncoder`

### CORS Configuration

```java
cors.allowed.origins=http://localhost:3000,https://reelcriticapp.onrender.com
cors.allowed.methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed.headers=Authorization,Content-Type
```

---

## Data Initialization

### Automatic Seeding

On application startup, `DataInitializationService` runs as a `CommandLineRunner`:

```java
@Order(2)  // Runs after RoleInitializationService
public class DataInitializationService implements CommandLineRunner {

    @Override
    public void run(String... args) {
        if (movieRepository.count() == 0) {
            // Initialize with sample movies
            initializeMovieData();
        } else {
            // Refresh data (for poster URL updates)
            movieRepository.deleteAll();
            initializeMovieData();
        }
    }
}
```

### Role Initialization

`RoleInitializationService` ensures default roles exist:

```java
@Order(1)
public class RoleInitializationService implements CommandLineRunner {

    @Override
    public void run(String... args) {
        if (!roleRepository.findByName(UserRole.ROLE_USER).isPresent()) {
            roleRepository.save(new Role(UserRole.ROLE_USER));
        }
        if (!roleRepository.findByName(UserRole.ROLE_ADMIN).isPresent()) {
            roleRepository.save(new Role(UserRole.ROLE_ADMIN));
        }
    }
}
```

---

## Key Technical Concepts

### 1. Stateless Authentication (JWT)

Unlike session-based auth, JWT allows:

- **Scalability**: No server-side session storage
- **Cross-domain**: Token works across different services
- **Self-contained**: User info embedded in token

### 2. MongoDB Document Model

NoSQL benefits for this application:

- **Flexible schema**: Movie metadata varies
- **Embedded documents**: Cast as array within movie
- **References (DBRef)**: User roles as separate collection

### 3. Lombok Annotations

Reduces boilerplate code:

- `@Data`: Generates getters, setters, toString, equals, hashCode
- `@NoArgsConstructor`: Default constructor
- `@AllArgsConstructor`: All-fields constructor

### 4. Spring Boot Auto-Configuration

Convention over configuration:

- `spring-boot-starter-web`: Embedded Tomcat, REST support
- `spring-boot-starter-data-mongodb`: MongoDB connection pooling
- `spring-boot-starter-security`: Security filters, authentication

### 5. React Hooks Pattern

Modern React state management:

- `useState`: Local component state
- `useEffect`: Side effects (API calls)
- `useContext`: Global state access (auth)
- `useNavigate`: Programmatic routing

### 6. Material-UI Theming

Consistent dark theme implementation:

```javascript
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#F5C518" }, // IMDb gold
    background: { default: "#121212" }, // Dark background
  },
});
```

---

## Environment Configuration

### Backend Properties

| Property                         | Description         | Default         |
| -------------------------------- | ------------------- | --------------- |
| `server.port`                    | HTTP port           | 8080            |
| `spring.data.mongodb.uri`        | Database connection | localhost:27017 |
| `reelcritic.app.jwtSecret`       | JWT signing key     | (configured)    |
| `reelcritic.app.jwtExpirationMs` | Token lifetime      | 86400000 (24h)  |

### Frontend Environment

| Variable                 | Description | Default                 |
| ------------------------ | ----------- | ----------------------- |
| `REACT_APP_API_BASE_URL` | Backend URL | <http://localhost:8080> |
| `REACT_APP_ENV`          | Environment | development             |

---

## Deployment Options

| Method         | Best For    | Guide                                        |
| -------------- | ----------- | -------------------------------------------- |
| Local/Manual   | Development | [MANUAL_DEPLOYMENT.md](MANUAL_DEPLOYMENT.md) |
| Cloud (Render) | Production  | [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) |

---

_Built with Spring Boot 3.4.8, React 19.1.1, MongoDB, and modern web technologies._
