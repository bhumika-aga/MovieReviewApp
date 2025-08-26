package com.moviebookingapp.model;

import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(value = "movie")
@Data
public class Movie {

    @Id
    private ObjectId movieId;
    private String movieName;
    private String theatreName;
    private Integer reviewCount;
    private String status;
    private String moviePoster;
    private String description;
    private String director;
    private List<String> cast;
    private String genre;
    private String language;
    private Integer duration;
    private Double rating;
    private LocalDate releaseDate;
    private String certificate;
    private String trailerUrl;
    private String bookMyShowUrl;
    private Integer ticketsAvailable;
    private String ticketStatus;

    public Movie() {
    }

    public Movie(String movieName, String theatreName, Integer reviewCount, String status) {
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.reviewCount = reviewCount;
        this.status = status;
    }

    public Movie(String movieName, String theatreName, Integer reviewCount) {
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.reviewCount = reviewCount;
    }

    public Movie(ObjectId movieId, String movieName, String theatreName, Integer reviewCount) {
        this.movieId = movieId;
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.reviewCount = reviewCount;
    }

    public Movie(ObjectId movieId, String movieName, String theatreName, Integer reviewCount,
            String status) {
        this.movieId = movieId;
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.reviewCount = reviewCount;
        this.status = status;
    }

    public Movie(String movieName, String theatreName, Integer reviewCount, String status,
            String moviePoster, String description, String director, List<String> cast, String genre,
            String language, Integer duration, Double rating, LocalDate releaseDate, String certificate,
            String trailerUrl) {
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.reviewCount = reviewCount;
        this.status = status;
        this.moviePoster = moviePoster;
        this.description = description;
        this.director = director;
        this.cast = cast;
        this.genre = genre;
        this.language = language;
        this.duration = duration;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.certificate = certificate;
        this.trailerUrl = trailerUrl;
    }

    public Movie(String movieName, String theatreName, Integer reviewCount, String status,
            String moviePoster, String description, String director, List<String> cast, String genre,
            String language, Integer duration, Double rating, LocalDate releaseDate, String certificate,
            String trailerUrl, String bookMyShowUrl) {
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.reviewCount = reviewCount;
        this.status = status;
        this.moviePoster = moviePoster;
        this.description = description;
        this.director = director;
        this.cast = cast;
        this.genre = genre;
        this.language = language;
        this.duration = duration;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.certificate = certificate;
        this.trailerUrl = trailerUrl;
        this.bookMyShowUrl = bookMyShowUrl;
    }
}