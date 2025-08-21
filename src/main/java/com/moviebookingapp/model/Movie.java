package com.moviebookingapp.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(value = "movie")
@Data
public class Movie {
    
    @Id
    private ObjectId movieId;
    private String movieName;
    private String theatreName;
    private Integer ticketsAvailable;
    private String ticketStatus;
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
    
    public Movie() {
    }
    
    public Movie(String movieName, String theatreName, Integer ticketsAvailable, String ticketStatus) {
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.ticketsAvailable = ticketsAvailable;
        this.ticketStatus = ticketStatus;
    }
    
    public Movie(String movieName, String theatreName, Integer ticketsAvailable) {
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.ticketsAvailable = ticketsAvailable;
    }
    
    public Movie(ObjectId movieId, String movieName, String theatreName, Integer ticketsAvailable) {
        this.movieId = movieId;
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.ticketsAvailable = ticketsAvailable;
    }
    
    public Movie(ObjectId movieId, String movieName, String theatreName, Integer ticketsAvailable,
                 String ticketStatus) {
        this.movieId = movieId;
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.ticketsAvailable = ticketsAvailable;
        this.ticketStatus = ticketStatus;
    }
    
    public Movie(String movieName, String theatreName, Integer ticketsAvailable, String ticketStatus,
                 String moviePoster, String description, String director, List<String> cast, String genre,
                 String language, Integer duration, Double rating, LocalDate releaseDate, String certificate,
                 String trailerUrl) {
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.ticketsAvailable = ticketsAvailable;
        this.ticketStatus = ticketStatus;
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
}