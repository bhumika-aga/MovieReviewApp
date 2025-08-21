# 🎬 CinemaVerse Frontend

A cutting-edge React TypeScript frontend application with stunning IMDB-inspired design for the CinemaVerse platform.

## 🛠️ Tech Stack

- **React** `19.1.1` - Latest UI framework
- **TypeScript** `4.9.5` - Type-safe JavaScript
- **Material-UI** `7.3.1` - Professional component library
- **React Router** `6.30.1` - Client-side routing
- **Axios** `1.11.0` - HTTP client with interceptors
- **React Hook Form** `7.62.0` - Efficient form handling
- **Yup** - Schema validation

## 🎨 Design Features

### IMDB-inspired Theme
- **Dark Theme**: Professional dark color scheme
- **Yellow Accents**: IMDB signature color (#f5c518)
- **Material Design**: Consistent Material-UI components
- **Responsive Layout**: Mobile-first responsive design

### Components
- **Movie Cards**: Rich movie information display
- **Search & Filter**: Real-time movie search and genre filtering
- **Authentication**: Secure login/registration forms
- **Navigation**: Responsive navbar with mobile drawer
- **Notifications**: Snackbar notifications for user feedback

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Backend API running on port 8000

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run type-check
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Movie.tsx        # Movie card component
│   ├── MovieList.tsx    # Movie listing page
│   ├── Navbar.tsx       # Navigation component
│   ├── Login.tsx        # Login form
│   ├── Registration.tsx # Registration form
│   └── ...
├── services/            # API services
│   └── MovieService.ts  # Movie API calls
├── types/               # TypeScript interfaces
│   ├── Movie.ts         # Movie-related types
│   └── User.ts          # User-related types
├── App.tsx              # Main application component
└── index.tsx            # Entry point
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_ENV=development
```

### Material-UI Theme
The application uses a custom IMDB-inspired theme:
- Primary color: #f5c518 (IMDB yellow)
- Background: #0f0f0f (Dark)
- Paper: #1a1a1a (Dark gray)
- Text: White/Gray variants

## 🎯 Features

### User Authentication
- JWT-based authentication
- Form validation with Yup schemas
- Persistent login state
- Role-based access control

### Movie Management
- Browse movies with rich metadata
- Search movies by name
- Filter by genre
- View movie details (cast, director, rating)
- Admin movie CRUD operations

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Adaptive navigation
- Touch-friendly interfaces

### Performance
- Code splitting with React.lazy
- Optimized re-renders
- Efficient state management
- Image optimization

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- --testNamePattern="Movie"
```

### Test Structure
- Component tests with React Testing Library
- Service tests for API calls
- Integration tests for user flows
- Type checking with TypeScript

## 🚀 Deployment

### Build Process
```bash
# Create production build
npm run build

# Preview build locally
npx serve -s build
```

### Deployment Options
- **Netlify**: Auto-deploy from Git
- **Vercel**: Zero-config deployments
- **AWS S3**: Static website hosting
- **Docker**: Containerized deployment

## 🔒 Security

- XSS protection with React's built-in sanitization
- JWT token secure storage
- HTTPS enforcement in production
- Input validation on all forms
- CORS configuration

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use Material-UI components consistently
3. Maintain responsive design patterns
4. Write tests for new features
5. Follow the established folder structure

## 📋 Scripts

- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run test suite
- `npm run type-check` - TypeScript type checking
- `npm run eject` - Eject from Create React App (not recommended)

## 🎭 Component Guide

### Movie Component
Displays individual movie cards with:
- Movie poster with hover effects
- Rating display with stars
- Movie metadata (year, duration, genre)
- Action buttons (Book, Edit, Delete)

### MovieList Component  
Main listing page featuring:
- Search functionality
- Genre filtering
- Responsive grid layout
- Loading states
- Error handling

### Authentication Components
- Login form with validation
- Registration form with all required fields
- Password visibility toggle
- Error message display

---

**Built with ❤️ using React & TypeScript**