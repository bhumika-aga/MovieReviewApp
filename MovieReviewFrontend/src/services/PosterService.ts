// PosterService.ts - Service to fetch movie posters from TMDb
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500';

// Fallback URLs for known movies (IMDb poster URLs for maximum reliability)
const KNOWN_POSTER_URLS: Record<string, string> = {
  // Latest 2025 Movies
  "Captain America: Brave New World": "https://m.media-amazon.com/images/M/MV5BOGQ5YTM3NDMtYjUxOS00NDA1LWFhNGEtMzVkNWZiNzEzY2Q3XkEyXkFqcGc@._V1_SX300.jpg",
  "Thunderbolts": "https://m.media-amazon.com/images/M/MV5BZWUzZjNmNzktOTA4MS00OTQyLTg5NDEtNTZjZTdjY2M0OTdjXkEyXkFqcGc@._V1_SX300.jpg",
  "Fantastic Four: First Steps": "https://m.media-amazon.com/images/M/MV5BN2NlNzg0ZTAtYjc5MS00MjE1LWJkZWYtZDZhNzI5NGI4ZmE2XkEyXkFqcGc@._V1_SX300.jpg",
  "Superman": "https://m.media-amazon.com/images/M/MV5BNzMxNWVkMDMtOTgwZS00ZWI5LWJmOTMtMGVkMDFhMDYzZjNjXkEyXkFqcGc@._V1_SX300.jpg",

  // Latest 2024 Movies
  "Dune: Part Two": "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGc@._V1_SX300.jpg",
  "Deadpool & Wolverine": "https://m.media-amazon.com/images/M/MV5BNzRiMjg0MzUtNTQ1Mi00Y2Q5LWEwM2MtMzUwZDU5NmVjN2NkXkEyXkFqcGc@._V1_SX300.jpg",
  "Inside Out 2": "https://m.media-amazon.com/images/M/MV5BZGI4Y2I3OGItOWZjNy00YzVkLWJjMjEtNjdkODAzYjM0NjE2XkEyXkFqcGc@._V1_SX300.jpg",
  "Beetlejuice Beetlejuice": "https://m.media-amazon.com/images/M/MV5BM2YwZjA0NzUtMmZjZC00MWFlLTljMTAtNTJjODVjZTc0OGJkXkEyXkFqcGc@._V1_SX300.jpg",

  // Latest 2023 Movies
  "Oppenheimer": "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGc@._V1_SX300.jpg",
  "Barbie": "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGc@._V1_SX300.jpg",
  "Guardians of the Galaxy Vol. 3": "https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGc@._V1_SX300.jpg",
  "John Wick: Chapter 4": "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGc@._V1_SX300.jpg",

  // Classic Movies  
  "Avengers: Endgame": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
  "The Dark Knight": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
  "Inception": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  "Parasite": "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGc@._V1_SX300.jpg"
};

interface TMDbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

interface TMDbSearchResponse {
  results: TMDbMovie[];
}

export class PosterService {
  private static hasShownApiWarning = false;

  static async searchMoviePoster(movieTitle: string, year?: string): Promise<string | null> {
    // First, check if we have a known URL for this movie
    const knownUrl = KNOWN_POSTER_URLS[movieTitle];
    if (knownUrl) {
      return knownUrl;
    }

    // If no API key, return null (will fall back to SVG placeholder)
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
      // Only warn once to reduce console spam
      if (!this.hasShownApiWarning) {
        console.info('TMDb API key not configured. Using fallback poster URLs.');
        this.hasShownApiWarning = true;
      }
      return null;
    }

    try {
      let query = encodeURIComponent(movieTitle);
      if (year) {
        query += `&year=${year}`;
      }

      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
      );

      if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status}`);
      }

      const data: TMDbSearchResponse = await response.json();

      if (data.results.length > 0) {
        const movie = data.results[0];
        if (movie.poster_path) {
          return `${IMAGE_BASE_URL}${movie.poster_path}`;
        }
      }

      return null;
    } catch (error) {
      console.error('Error fetching movie poster:', error);
      return null;
    }
  }

  // Get poster with multiple fallback strategies
  static async getPosterUrl(movieTitle: string, currentUrl?: string, year?: string): Promise<string | null> {
    // First check known poster URLs for instant loading
    const knownUrl = KNOWN_POSTER_URLS[movieTitle];
    if (knownUrl) {
      return knownUrl;
    }

    // Skip broken URLs but allow IMDb poster URLs from Amazon's media CDN
    if (currentUrl &&
      currentUrl.startsWith('http') &&
      currentUrl !== '/fbf435.jpg' &&
      !currentUrl.includes('81z4Q4TJsXL') &&
      !currentUrl.includes('81VhHnX7wuL') &&
      !currentUrl.includes('81WUijN2NUL') &&
      (currentUrl.includes('tmdb.org') ||
        currentUrl.includes('imdb.com') ||
        (currentUrl.includes('m.media-amazon.com') && currentUrl.includes('MV5B')) || // IMDb posters on Amazon CDN
        !currentUrl.match(/\d{8,}/))) { // Skip URLs with long numeric patterns
      return currentUrl;
    }

    // Try to get from TMDb or return null for fallback
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
      return null; // Will use SVG fallback
    }

    return this.searchMoviePoster(movieTitle, year);
  }

}

export default PosterService;