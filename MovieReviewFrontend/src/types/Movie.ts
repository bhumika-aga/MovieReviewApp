export interface Movie {
  movieId?: string;
  movieName: string;
  theatreName: string;
  reviewCount: number;
  status: string;
  moviePoster?: string;
  description?: string;
  director?: string;
  cast?: string[];
  genre?: string;
  language?: string;
  duration?: number;
  rating?: number;
  releaseDate?: string;
  certificate?: string;
  trailerUrl?: string;
  bookMyShowUrl?: string;
}

export interface MovieFormData {
  movieName: string;
  theatreName: string;
  reviewCount: number;
  status: string;
  moviePoster?: string;
  description?: string;
  director?: string;
  cast?: string;
  genre?: string;
  language?: string;
  duration?: number;
  rating?: number;
  releaseDate?: string;
  certificate?: string;
  trailerUrl?: string;
  bookMyShowUrl?: string;
}