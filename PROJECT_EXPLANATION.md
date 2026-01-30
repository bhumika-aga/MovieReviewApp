# Project Implementation and Concepts

## 1. Project Overview

ReelCritic is a full-stack movie review and booking application designed with a modern, 3-tier architecture. It allows users to browse movies, book tickets, and write reviews, while administrators can manage movie data. The project leverages Java (Spring Boot) for the backend and React (TypeScript) for the frontend.

## 2. Architectural Concepts

### Three-Tier Architecture

The application is structured into three main layers:

1. **Presentation Layer (Frontend)**: Built with React and Material-UI. It handles user interactions and communicates with the backend via REST APIs.
2. **Logic Layer (Backend Service)**: Built with Spring Boot. It processes business logic, handles security, and manages data flow.
3. **Data Layer (Database)**: Uses MongoDB, a NoSQL database, to store flexible document-based data for movies, users, and reviews.

### Stateless Authentication with JWT

The system uses JSON Web Tokens (JWT) for security. Instead of storing sessions on the server:

- When a user logs in, the server generates a signed token.
- The client stores this token (e.g., in localStorage).
- Every subsequent request includes this token in the `Authorization` header.
- The server validates the token signature to identify the user without database lookups for session validation.

## 3. Implementation Logic

### Backend (Spring Boot)

- **Controller Layer**: Exposes REST endpoints (e.g., `MovieController`, `AuthController`). It delegates work to the Service layer.
- **Service Layer**: Contains business logic (e.g., `MovieService`). It performs validations and calls the Repository layer.
- **Repository Layer**: Extends `MongoRepository` to interact with MongoDB.
- **Security**: Configured in `WebSecurityConfig.java`. It defines which endpoints are public and which require authentication. using `DaoAuthenticationProvider` backed by a custom `UserDetailsService`.

### Frontend (React)

- **Components**: Reusable UI parts (e.g., Movie Cards, Navbar).
- **Services**: Axios-based modules to make HTTP requests to the backend.
- **Routing**: `react-router-dom` manages navigation between pages.

## 4. Key Improvements and Fixes

Recent updates focused on modernizing the codebase and resolving deprecations:

### Deprecation Fix: DaoAuthenticationProvider

**Issue**: The no-argument constructor for `DaoAuthenticationProvider` in Spring Security was deprecated.
**Fix**: Updated `WebSecurityConfig.java` to use the parameterized constructor accepting `UserDetailsService`.
**Logic**: This ensures the authentication provider is correctly initialized with the necessary user service dependency at creation time, adhering to modern dependency injection principles and Spring Security 6+ best practices.

### Code Quality

- Ensured strict type safety in the backend.
- Verified build integrity for both backend (Maven) and frontend (NPM).
- Cleaned up project structure to ensure only necessary files are present.

## 5. Deployment Strategy

The project currently supports:

- **Local Deployment**: Running Spring Boot and React dev servers separately.
- **Containerization**: `Dockerfile` provided for creating production-ready images.
- **Cloud Hosting**: Configurations for Render.com (`render.yaml`).
