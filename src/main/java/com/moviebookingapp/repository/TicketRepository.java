package com.moviebookingapp.repository;

import com.moviebookingapp.model.Ticket;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, ObjectId> {
    
    @Query(value = "{'movieName': ?0, 'theatreName': ?1}", fields = "{_id:0, seatNumber:1}")
    List<Ticket> findSeats(String movieName, String theatreName);
    
    List<Ticket> findByMovieName(String movieName);
    
    List<Ticket> findByTicketId(ObjectId ticketId);
}