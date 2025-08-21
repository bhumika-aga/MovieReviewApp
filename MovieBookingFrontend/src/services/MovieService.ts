import axios, { AxiosResponse } from 'axios';
import { Movie } from '../types/Movie';

const BASE_URL = 'http://localhost:8080/api/v1.0/moviebooking';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class MovieService {
  static async getMovies(): Promise<AxiosResponse<Movie[]>> {
    return api.get<Movie[]>('/all');
  }

  static async getMovieByName(movieName: string): Promise<AxiosResponse<Movie[]>> {
    return api.get<Movie[]>(`/movies/search/${movieName}`);
  }

  static async addMovie(movie: Movie): Promise<AxiosResponse<Movie>> {
    return api.post<Movie>('/addMovie', movie);
  }

  static async updateMovie(movieName: string, movie: Movie): Promise<AxiosResponse<Movie>> {
    return api.put<Movie>(`/update/${movieName}`, movie);
  }

  static async deleteMovie(movieName: string): Promise<AxiosResponse<void>> {
    return api.delete<void>(`/delete/${movieName}`);
  }

  static async bookTicket(
    movieName: string,
    theatreName: string,
    numberOfTickets: number
  ): Promise<AxiosResponse<any>> {
    return api.post('/bookTicket', {
      movieName,
      theatreName,
      numberOfTickets,
    });
  }

  static async getAllBookedTickets(): Promise<AxiosResponse<any[]>> {
    return api.get<any[]>('/getAllBookedTickets');
  }

  static async getBookedTicketsByUser(loginId: string): Promise<AxiosResponse<any[]>> {
    return api.get<any[]>(`/getBookedTickets/${loginId}`);
  }

  static async updateTicketStatus(
    movieName: string,
    status: string
  ): Promise<AxiosResponse<Movie>> {
    return api.put<Movie>(`/updateTicketStatus/${movieName}/${status}`);
  }
}

export default MovieService;