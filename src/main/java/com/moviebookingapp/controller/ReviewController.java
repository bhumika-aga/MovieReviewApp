package com.moviebookingapp.controller;

import com.moviebookingapp.model.Movie;
import com.moviebookingapp.model.Review;
import com.moviebookingapp.model.User;
import com.moviebookingapp.payload.request.ReviewRequest;
import com.moviebookingapp.payload.response.MessageResponse;
import com.moviebookingapp.payload.response.ReviewResponse;
import com.moviebookingapp.repository.MovieRepository;
import com.moviebookingapp.repository.ReviewRepository;
import com.moviebookingapp.repository.UserRepository;
import com.moviebookingapp.security.jwt.JwtUtils;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@CrossOrigin("*")
public class ReviewController {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private MovieRepository movieRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @PostMapping("/movies/{movieName}/reviews")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @Operation(summary = "Add a review for a movie")
    public ResponseEntity<?> addReview(@PathVariable String movieName,
                                       @Valid @RequestBody ReviewRequest reviewRequest,
                                       @RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            String username = jwtUtils.getUsernameFromToken(jwt);
            
            Optional<User> userOptional = userRepository.findByUsername(username);
            if (userOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
            }
            
            List<Movie> movies = movieRepository.findByMovieName(movieName);
            if (movies.isEmpty()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Movie not found"));
            }
            
            User user = userOptional.get();
            Movie movie = movies.get(0);
            
            if (reviewRepository.existsByUserAndMovie(user, movie)) {
                return ResponseEntity.badRequest().body(new MessageResponse("You have already reviewed this movie"));
            }
            
            Review review = new Review(user, movie, reviewRequest.getRating(),
                reviewRequest.getTitle(), reviewRequest.getContent());
            reviewRepository.save(review);
            
            updateMovieRating(movie);
            
            return ResponseEntity.ok(new MessageResponse("Review added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error adding review: " + e.getMessage()));
        }
    }
    
    @GetMapping("/movies/{movieName}/reviews")
    @Operation(summary = "Get all reviews for a movie")
    public ResponseEntity<List<ReviewResponse>> getMovieReviews(@PathVariable String movieName) {
        try {
            List<Movie> movies = movieRepository.findByMovieName(movieName);
            if (movies.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Movie movie = movies.get(0);
            List<Review> reviews = reviewRepository.findByMovieOrderByCreatedDateDesc(movie);
            
            List<ReviewResponse> reviewResponses = reviews.stream()
                                                       .map(this::convertToResponse)
                                                       .collect(Collectors.toList());
            
            return ResponseEntity.ok(reviewResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/users/{username}/reviews")
    @Operation(summary = "Get all reviews by a user")
    public ResponseEntity<List<ReviewResponse>> getUserReviews(@PathVariable String username) {
        try {
            Optional<User> userOptional = userRepository.findByUsername(username);
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            User user = userOptional.get();
            List<Review> reviews = reviewRepository.findByUserOrderByCreatedDateDesc(user);
            
            List<ReviewResponse> reviewResponses = reviews.stream()
                                                       .map(this::convertToResponse)
                                                       .collect(Collectors.toList());
            
            return ResponseEntity.ok(reviewResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/reviews/{reviewId}/helpful")
    @Operation(summary = "Mark a review as helpful")
    public ResponseEntity<?> markReviewHelpful(@PathVariable String reviewId) {
        try {
            Optional<Review> reviewOptional = reviewRepository.findById(new ObjectId(reviewId));
            if (reviewOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Review review = reviewOptional.get();
            review.setHelpful(review.getHelpful() + 1);
            reviewRepository.save(review);
            
            return ResponseEntity.ok(new MessageResponse("Review marked as helpful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error updating review"));
        }
    }
    
    private void updateMovieRating(Movie movie) {
        List<Review> reviews = reviewRepository.findByMovieOrderByCreatedDateDesc(movie);
        if (!reviews.isEmpty()) {
            double averageRating = reviews.stream()
                                       .mapToDouble(Review::getRating)
                                       .average()
                                       .orElse(0.0);
            
            movie.setRating(averageRating * 2);
            movie.setReviewCount(reviews.size());
            movieRepository.save(movie);
        }
    }
    
    private ReviewResponse convertToResponse(Review review) {
        return new ReviewResponse(
            review.getReviewId().toString(),
            review.getUser().getUserId().toString(),
            review.getUser().getUsername(),
            review.getUser().getFirstName() + " " + review.getUser().getLastName(),
            review.getMovie().getMovieName(),
            review.getRating(),
            review.getTitle(),
            review.getContent(),
            review.getCreatedDate(),
            review.getHelpful()
        );
    }
}