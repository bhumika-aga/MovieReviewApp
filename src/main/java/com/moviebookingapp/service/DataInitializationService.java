package com.moviebookingapp.service;

import com.moviebookingapp.model.Movie;
import com.moviebookingapp.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@org.springframework.core.annotation.Order(2) // Run after RoleInitializationService
public class DataInitializationService implements CommandLineRunner {
    
    @Autowired
    private MovieRepository movieRepository;
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("🎬 ReelCritic Data Initialization Starting...");
        try {
            long movieCount = movieRepository.count();
            System.out.println("Found " + movieCount + " movies in database");
            
            if (movieCount == 0) {
                System.out.println("Database is empty, initializing with sample movie data...");
                initializeMovieData();
                System.out.println("✅ ReelCritic movie data initialized successfully!");
            } else {
                // Temporary: Force refresh to fix broken poster URLs
                System.out.println("🔄 Clearing existing movie data and reinitializing with updated poster URLs...");
                movieRepository.deleteAll();
                initializeMovieData();
                System.out.println("✅ ReelCritic movie data refreshed successfully with working poster URLs!");
                // TODO: Remove the above refresh logic after deployment - restore original check
            }
        } catch (Exception e) {
            System.err.println("⚠️  Warning: Could not initialize MongoDB data. Using mock service as fallback.");
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    private void initializeMovieData() {
        List<Movie> movies = Arrays.asList(
            // Latest 2025 Movies
            createMovie("Captain America: Brave New World", "ReelCritic IMAX", 245, "NOW SHOWING",
                "https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                "Sam Wilson, who's officially taken up the mantle of Captain America, finds himself in the middle of an international incident.",
                "Julius Onah",
                Arrays.asList("Anthony Mackie", "Danny Ramirez", "Shira Haas", "Xosha Roquemore", "Carl Lumbly"),
                "Action, Adventure, Sci-Fi", "English", 118, 7.2, LocalDate.of(2025, 2, 14), "PG-13",
                "https://www.youtube.com/watch?v=FEa9pPqGhPY",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=captain+america"),
            
            createMovie("Thunderbolts", "INOX", 312, "COMING SOON",
                "https://m.media-amazon.com/images/M/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc@._V1_FMjpg_UY2818_.jpg",
                "A group of supervillains are recruited to go on missions for the government.",
                "Jake Schreier",
                Arrays.asList("Florence Pugh", "Sebastian Stan", "David Harbour", "Wyatt Russell", "Julia Louis-Dreyfus"),
                "Action, Adventure, Comedy", "English", 130, 7.5, LocalDate.of(2025, 5, 2), "PG-13",
                "https://www.youtube.com/watch?v=bCDhh5GK8sg",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=thunderbolts"),
            
            createMovie("Fantastic Four: First Steps", "Cinepolis", 298, "COMING SOON",
                "https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_FMjpg_UX1086_.jpg",
                "A group of astronauts gain superpowers after a cosmic radiation exposure and must use them to oppose the plans of their enemy, Doctor Doom.",
                "Matt Shakman",
                Arrays.asList("Pedro Pascal", "Vanessa Kirby", "Joseph Quinn", "Ebon Moss-Bachrach", "Ralph Ineson"),
                "Action, Adventure, Sci-Fi", "English", 125, 8.0, LocalDate.of(2025, 7, 25), "PG-13",
                "https://www.youtube.com/watch?v=NYnQnNerddA",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=fantastic+four"),
            
            createMovie("Superman", "PVR Cinemas", 189, "COMING SOON",
                "https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_FMjpg_UY2048_.jpg",
                "Superman struggles to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.",
                "James Gunn",
                Arrays.asList("David Corenswet", "Rachel Brosnahan", "Nicholas Hoult", "Edi Gathegi", "Nathan Fillion"),
                "Action, Adventure, Drama", "English", 140, 8.5, LocalDate.of(2025, 7, 11), "PG-13",
                "https://www.youtube.com/watch?v=BdRF2sCCOz0",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=superman"),
            
            // Latest 2024 Movies
            createMovie("Dune: Part Two", "CinemaVerse IMAX", 523, "NOW SHOWING",
                "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
                "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
                "Denis Villeneuve",
                Arrays.asList("Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin", "Austin Butler"),
                "Action, Adventure, Drama", "English", 166, 8.8, LocalDate.of(2024, 3, 1), "PG-13",
                "https://www.youtube.com/watch?v=Way9Dexny3w",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=dune+part+two"),
            
            createMovie("Deadpool & Wolverine", "INOX", 487, "NOW SHOWING",
                "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
                "Deadpool's peaceful existence comes crashing down when the Time Variance Authority recruits him to help safeguard the multiverse.",
                "Shawn Levy",
                Arrays.asList("Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Morena Baccarin", "Rob Delaney"),
                "Action, Comedy, Sci-Fi", "English", 128, 8.1, LocalDate.of(2024, 7, 26), "R",
                "https://www.youtube.com/watch?v=73_1biulkYk",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=deadpool+wolverine"),
            
            createMovie("Inside Out 2", "Cinepolis", 432, "NOW SHOWING",
                "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
                "As Riley enters her teenage years, her emotions face new challenges when new emotions arrive at headquarters.",
                "Kelsey Mann",
                Arrays.asList("Amy Poehler", "Maya Hawke", "Kensington Tallman", "Liza Lapira", "Tony Hale"),
                "Animation, Family, Comedy", "English", 96, 7.8, LocalDate.of(2024, 6, 14), "PG",
                "https://www.youtube.com/watch?v=LEjhY15eCx0",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=inside+out+2"),
            
            createMovie("Beetlejuice Beetlejuice", "PVR Cinemas", 298, "NOW SHOWING",
                "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
                "After an unexpected family tragedy, three generations of the Deetz family return home to Winter River.",
                "Tim Burton",
                Arrays.asList("Michael Keaton", "Winona Ryder", "Catherine O'Hara", "Jenna Ortega", "Willem Dafoe"),
                "Comedy, Horror, Fantasy", "English", 104, 7.2, LocalDate.of(2024, 9, 6), "PG-13",
                "https://www.youtube.com/watch?v=CoZqL3N_jL0",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=beetlejuice"),
            
            // Latest 2023 Movies  
            createMovie("Oppenheimer", "CinemaVerse IMAX", 612, "NOW SHOWING",
                "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
                "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
                "Christopher Nolan",
                Arrays.asList("Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"),
                "Biography, Drama, History", "English", 180, 8.4, LocalDate.of(2023, 7, 21), "R",
                "https://www.youtube.com/watch?v=uYPbbksJxIg",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=oppenheimer"),
            
            createMovie("Barbie", "INOX", 578, "NOW SHOWING",
                "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
                "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
                "Greta Gerwig",
                Arrays.asList("Margot Robbie", "Ryan Gosling", "America Ferrera", "Kate McKinnon", "Issa Rae"),
                "Adventure, Comedy, Fantasy", "English", 114, 7.0, LocalDate.of(2023, 7, 21), "PG-13",
                "https://www.youtube.com/watch?v=pBk4NYhWNMM",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=barbie"),
            
            createMovie("Guardians of the Galaxy Vol. 3", "Cinepolis", 456, "NOW SHOWING",
                "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
                "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and protect one of their own.",
                "James Gunn",
                Arrays.asList("Chris Pratt", "Zoe Saldana", "Dave Bautista", "Karen Gillan", "Pom Klementieff"),
                "Action, Adventure, Comedy", "English", 150, 8.0, LocalDate.of(2023, 5, 5), "PG-13",
                "https://www.youtube.com/watch?v=u3V5KDHRQvk",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=guardians+galaxy"),
            
            createMovie("John Wick: Chapter 4", "PVR Cinemas", 389, "NOW SHOWING",
                "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
                "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
                "Chad Stahelski",
                Arrays.asList("Keanu Reeves", "Donnie Yen", "Bill Skarsgård", "Laurence Fishburne", "Hiroyuki Sanada"),
                "Action, Crime, Thriller", "English", 169, 7.7, LocalDate.of(2023, 3, 24), "R",
                "https://www.youtube.com/watch?v=qEVUtrk8_B4",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=john+wick+4"),
            
            // Classic Movies (Updated with proper TMDb URLs)
            createMovie("Avengers: Endgame", "CinemaVerse IMAX", 743, "CLASSIC",
                "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
                "Anthony Russo, Joe Russo",
                Arrays.asList("Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"),
                "Action, Adventure, Drama", "English", 181, 8.4, LocalDate.of(2019, 4, 26), "PG-13",
                "https://www.youtube.com/watch?v=TcMBFSGVi1c",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=avengers+endgame"),
            
            createMovie("The Dark Knight", "INOX", 892, "CLASSIC",
                "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "Christopher Nolan",
                Arrays.asList("Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"),
                "Action, Crime, Drama", "English", 152, 9.0, LocalDate.of(2008, 7, 18), "PG-13",
                "https://www.youtube.com/watch?v=EXeTwQWrcwY",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=dark+knight"),
            
            createMovie("Inception", "Cinepolis", 723, "CLASSIC",
                "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
                "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "Christopher Nolan",
                Arrays.asList("Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Joseph Gordon-Levitt", "Elliot Page"),
                "Action, Sci-Fi, Thriller", "English", 148, 8.8, LocalDate.of(2010, 7, 16), "PG-13",
                "https://www.youtube.com/watch?v=YoHD9XEInc0",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=inception"),
            
            createMovie("Parasite", "PVR Cinemas", 654, "CLASSIC",
                "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
                "Bong Joon Ho",
                Arrays.asList("Kang-ho Song", "Sun-kyun Lee", "Yeo-jeong Jo", "Woo-sik Choi", "So-dam Park"),
                "Comedy, Drama, Thriller", "Korean", 132, 8.5, LocalDate.of(2019, 5, 30), "R",
                "https://www.youtube.com/watch?v=5xH0HfJHsaY",
                "https://in.bookmyshow.com/explore/movies-mumbai?q=parasite")
        );
        
        movieRepository.saveAll(movies);
        System.out.println("Movie data initialized successfully!");
    }
    
    private Movie createMovie(String name, String theatre, Integer reviewCount, String status,
                              String poster, String description, String director, List<String> cast,
                              String genre, String language, Integer duration, Double rating,
                              LocalDate releaseDate, String certificate, String trailerUrl, String bookMyShowUrl) {
        return new Movie(name, theatre, reviewCount, status, poster, description, director, cast,
            genre, language, duration, rating, releaseDate, certificate, trailerUrl, bookMyShowUrl);
    }
}