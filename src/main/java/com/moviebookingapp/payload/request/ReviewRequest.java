package com.moviebookingapp.payload.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ReviewRequest {

    @NotNull(message = "Rating is required")
    @DecimalMin(value = "1.0", message = "Rating must be at least 1")
    @DecimalMax(value = "5.0", message = "Rating must be at most 5")
    private Double rating;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(max = 1000, message = "Content must be less than 1000 characters")
    private String content;
}