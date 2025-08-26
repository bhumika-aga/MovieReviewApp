package com.moviebookingapp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.moviebookingapp.model.Movie;

@Service
public class MockMovieService {

    private static List<Movie> movies = new ArrayList<>();

    static {
        initializeMockData();
    }

    private static void initializeMockData() {
        // Simplified mock data for fallback - same as latest movies from
        // DataInitializationService
        movies = Arrays.asList(
                createMovie("Captain America: Brave New World", "CinemaVerse IMAX", 245, "NOW SHOWING",
                        "https://m.media-amazon.com/images/M/MV5BOGQ5YTM3NDMtYjUxOS00NDA1LWFhNGEtMzVkNWZiNzEzY2Q3XkEyXkFqcGc@._V1_SX300.jpg",
                        "Sam Wilson, who's officially taken up the mantle of Captain America.",
                        "Julius Onah", Arrays.asList("Anthony Mackie", "Danny Ramirez"),
                        "Action, Adventure, Sci-Fi", "English", 118, 7.2, LocalDate.of(2025, 2, 14), "PG-13",
                        "https://www.youtube.com/watch?v=FEa9pPqGhPY",
                        "https://in.bookmyshow.com/explore/movies-mumbai"),

                createMovie("Dune: Part Two", "CinemaVerse IMAX", 523, "NOW SHOWING",
                        "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGc@._V1_SX300.jpg",
                        "Paul Atreides unites with Chani and the Fremen.",
                        "Denis Villeneuve", Arrays.asList("Timothée Chalamet", "Zendaya"),
                        "Action, Adventure, Drama", "English", 166, 8.8, LocalDate.of(2024, 3, 1), "PG-13",
                        "https://www.youtube.com/watch?v=Way9Dexny3w",
                        "https://in.bookmyshow.com/explore/movies-mumbai"),

                createMovie("Oppenheimer", "CinemaVerse IMAX", 612, "NOW SHOWING",
                        "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGc@._V1_SX300.jpg",
                        "The story of American scientist J. Robert Oppenheimer.",
                        "Christopher Nolan", Arrays.asList("Cillian Murphy", "Emily Blunt"),
                        "Biography, Drama, History", "English", 180, 8.4, LocalDate.of(2023, 7, 21), "R",
                        "https://www.youtube.com/watch?v=uYPbbksJxIg",
                        "https://in.bookmyshow.com/explore/movies-mumbai"));
    }

    private static Movie createMovie(String name, String theatre, Integer reviewCount, String status,
            String poster, String description, String director, List<String> cast,
            String genre, String language, Integer duration, Double rating,
            LocalDate releaseDate, String certificate, String trailerUrl, String bookMyShowUrl) {
        return new Movie(name, theatre, reviewCount, status, poster, description, director, cast,
                genre, language, duration, rating, releaseDate, certificate, trailerUrl, bookMyShowUrl);
    }

    public List<Movie> getAllMovies() {
        return new ArrayList<>(movies);
    }

    public List<Movie> searchMovies(String movieName) {
        return movies.stream()
                .filter(movie -> movie.getMovieName().toLowerCase().contains(movieName.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Optional<Movie> findByMovieName(String movieName) {
        return movies.stream()
                .filter(movie -> movie.getMovieName().equals(movieName))
                .findFirst();
    }

    public void addMovie(Movie movie) {
        movies.add(movie);
    }

    public boolean deleteMovie(String movieName) {
        return movies.removeIf(movie -> movie.getMovieName().equals(movieName));
    }

    public void updateMovie(String movieName, Movie updatedMovie) {
        for (int i = 0; i < movies.size(); i++) {
            if (movies.get(i).getMovieName().equals(movieName)) {
                movies.set(i, updatedMovie);
                break;
            }
        }
    }
}