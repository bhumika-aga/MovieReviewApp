package com.moviebookingapp.repository;

import com.moviebookingapp.model.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends MongoRepository<Movie, ObjectId> {
    
    @Query("{$or:[{movieName:{$regex:?0, $options:'i'}}, {movieName:{$regex:'^?0', $options:'i'}}]}")
    List<Movie> findByMovieName(String movieName);
    
    @Query("{'movieName' : ?0,'theatreName' : ?1}")
    List<Movie> findAvailableTickets(String moviename, String theatreName);
    
    void deleteByMovieName(String movieName);
}