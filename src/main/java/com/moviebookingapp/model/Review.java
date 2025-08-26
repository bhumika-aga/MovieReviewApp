package com.moviebookingapp.model;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(value = "review")
@Data
public class Review {

    @Id
    private ObjectId reviewId;

    @DBRef
    private User user;

    @DBRef
    private Movie movie;

    private Double rating;
    private String title;
    private String content;
    private LocalDateTime createdDate;
    private Integer helpful;

    public Review() {
        this.createdDate = LocalDateTime.now();
        this.helpful = 0;
    }

    public Review(User user, Movie movie, Double rating, String title, String content) {
        this.user = user;
        this.movie = movie;
        this.rating = rating;
        this.title = title;
        this.content = content;
        this.createdDate = LocalDateTime.now();
        this.helpful = 0;
    }
}