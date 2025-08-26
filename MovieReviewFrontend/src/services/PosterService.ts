// PosterService.ts - Service to fetch movie posters from TMDb
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500';

// Reliable TMDb poster URLs for known movies
const KNOWN_POSTER_URLS: Record<string, string> = {
  // Latest 2025 Movies
  "Captain America: Brave New World": "https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Thunderbolts": "https://m.media-amazon.com/images/M/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc@._V1_FMjpg_UY2818_.jpg",
  "Fantastic Four: First Steps": "https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_FMjpg_UX1086_.jpg",
  "Superman": "https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_FMjpg_UY2048_.jpg",

  // Latest 2024 Movies
  "Dune: Part Two": "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  "Deadpool & Wolverine": "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
  "Inside Out 2": "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
  "Beetlejuice Beetlejuice": "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",

  // Latest 2023 Movies
  "Oppenheimer": "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  "Barbie": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
  "Guardians of the Galaxy Vol. 3": "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
  "John Wick: Chapter 4": "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",

  // Classic Movies  
  "Avengers: Endgame": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  "The Dark Knight": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "Inception": "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  "Parasite": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
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

    // Allow reliable poster URLs from TMDb and other trusted sources
    if (currentUrl &&
      currentUrl.startsWith('http') &&
      currentUrl !== '/fbf435.jpg' &&
      !currentUrl.includes('/placeholder-poster.jpg') &&
      (currentUrl.includes('tmdb.org') || // TMDb images are reliable
        currentUrl.includes('image.tmdb.org') ||
        currentUrl.includes('imdb.com'))) { // Direct IMDB links
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