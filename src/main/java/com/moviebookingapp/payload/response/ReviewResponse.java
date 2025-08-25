package com.moviebookingapp.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    
    private String reviewId;
    private String userId;
    private String username;
    private String userFullName;
    private String movieName;
    private Double rating;
    private String title;
    private String content;
    private LocalDateTime createdDate;
    private Integer helpful;
}