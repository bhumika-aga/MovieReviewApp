package com.moviebookingapp.service;

import com.moviebookingapp.model.Movie;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MockMovieService {
    
    private static List<Movie> movies = new ArrayList<>();
    
    static {
        initializeMockData();
    }
    
    private static void initializeMockData() {
        movies = Arrays.asList(
            createMovie("Avengers: Endgame", "CinemaVerse IMAX", 120, "BOOK ASAP", 
                "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
                "Anthony Russo, Joe Russo", 
                Arrays.asList("Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"),
                "Action, Adventure, Drama", "English", 181, 8.4, LocalDate.of(2019, 4, 26), "PG-13",
                "https://www.youtube.com/watch?v=TcMBFSGVi1c"),

            createMovie("The Dark Knight", "INOX", 80, "BOOK ASAP",
                "https://m.media-amazon.com/images/I/91KkWf50SoL._AC_SL1500_.jpg",
                "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "Christopher Nolan",
                Arrays.asList("Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"),
                "Action, Crime, Drama", "English", 152, 9.0, LocalDate.of(2008, 7, 18), "PG-13",
                "https://www.youtube.com/watch?v=EXeTwQWrcwY"),

            createMovie("Inception", "Cinepolis", 120, "BOOK ASAP",
                "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
                "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "Christopher Nolan",
                Arrays.asList("Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Joseph Gordon-Levitt", "Ellen Page"),
                "Action, Sci-Fi, Thriller", "English", 148, 8.8, LocalDate.of(2010, 7, 16), "PG-13",
                "https://www.youtube.com/watch?v=YoHD9XEInc0"),

            createMovie("Parasite", "PVR Cinemas", 90, "BOOK ASAP",
                "https://m.media-amazon.com/images/I/91sustWPwHL._AC_SL1500_.jpg",
                "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
                "Bong Joon Ho",
                Arrays.asList("Kang-ho Song", "Sun-kyun Lee", "Yeo-jeong Jo", "Woo-sik Choi", "So-dam Park"),
                "Comedy, Drama, Thriller", "Korean", 132, 8.5, LocalDate.of(2019, 5, 30), "R",
                "https://www.youtube.com/watch?v=5xH0HfJHsaY"),

            createMovie("Spider-Man: No Way Home", "INOX", 150, "BOOK ASAP",
                "https://m.media-amazon.com/images/I/81z4Q4TJsXL._AC_SL1500_.jpg",
                "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
                "Jon Watts",
                Arrays.asList("Tom Holland", "Zendaya", "Benedict Cumberbatch", "Tobey Maguire", "Andrew Garfield"),
                "Action, Adventure, Fantasy", "English", 148, 8.2, LocalDate.of(2021, 12, 17), "PG-13",
                "https://www.youtube.com/watch?v=JfVOs4VSpmA"),

            createMovie("Interstellar", "Cinepolis", 110, "BOOK ASAP",
                "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_SL1500_.jpg",
                "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                "Christopher Nolan",
                Arrays.asList("Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Casey Affleck"),
                "Adventure, Drama, Sci-Fi", "English", 169, 8.6, LocalDate.of(2014, 11, 7), "PG-13",
                "https://www.youtube.com/watch?v=zSWdZVtXT7E"),

            createMovie("The Shawshank Redemption", "PVR Cinemas", 75, "BOOK ASAP",
                "https://m.media-amazon.com/images/I/81WUijN2NUL._AC_SL1500_.jpg",
                "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "Frank Darabont",
                Arrays.asList("Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown"),
                "Drama", "English", 142, 9.3, LocalDate.of(1994, 9, 23), "R",
                "https://www.youtube.com/watch?v=NmzuHjWmXOc"),

            createMovie("Black Panther", "INOX", 95, "BOOK ASAP",
                "https://m.media-amazon.com/images/I/81VhHnX7wuL._AC_SL1500_.jpg",
                "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
                "Ryan Coogler",
                Arrays.asList("Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o", "Danai Gurira", "Martin Freeman"),
                "Action, Adventure, Sci-Fi", "English", 134, 7.3, LocalDate.of(2018, 2, 16), "PG-13",
                "https://www.youtube.com/watch?v=xjDjIWPwcPU")
        );
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
    
    private static Movie createMovie(String name, String theatre, Integer tickets, String status,
                                   String poster, String description, String director, List<String> cast,
                                   String genre, String language, Integer duration, Double rating,
                                   LocalDate releaseDate, String certificate, String trailerUrl) {
        return new Movie(name, theatre, tickets, status, poster, description, director, cast,
                        genre, language, duration, rating, releaseDate, certificate, trailerUrl);
    }
}