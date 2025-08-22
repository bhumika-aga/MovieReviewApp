package com.moviebookingapp.repository;

import com.moviebookingapp.model.Review;
import com.moviebookingapp.model.Movie;
import com.moviebookingapp.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {
    
    List<Review> findByMovieOrderByCreatedDateDesc(Movie movie);
    
    List<Review> findByUserOrderByCreatedDateDesc(User user);
    
    boolean existsByUserAndMovie(User user, Movie movie);
    
    Long countByMovie(Movie movie);
}