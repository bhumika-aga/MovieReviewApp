package com.moviebookingapp.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(value = "ticket")
@Data
public class Ticket {
    
    @Id
    private ObjectId ticketId;
    private String username;
    private String movieName;
    private String theatreName;
    private Integer noOfTickets;
    private List<String> seatNumber;
    
    public Ticket() {
        super();
    }
    
    public Ticket(String username, String movieName, String theatreName, Integer noOfTickets, List<String> seatNumber) {
        this.username = username;
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.noOfTickets = noOfTickets;
        this.seatNumber = seatNumber;
    }
    
    public Ticket(ObjectId ticketId, String username, String movieName, String theatreName, Integer noOfTickets,
                  List<String> seatNumber) {
        super();
        this.ticketId = ticketId;
        this.username = username;
        this.movieName = movieName;
        this.theatreName = theatreName;
        this.noOfTickets = noOfTickets;
        this.seatNumber = seatNumber;
    }
    
    public ObjectId getTicketId() {
        return ticketId;
    }
    
    public void setTicketId(ObjectId ticketId) {
        this.ticketId = ticketId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getMovieName() {
        return movieName;
    }
    
    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }
    
    public String getTheatreName() {
        return theatreName;
    }
    
    public void setTheatreName(String theatreName) {
        this.theatreName = theatreName;
    }
    
    public Integer getNoOfTickets() {
        return noOfTickets;
    }
    
    public void setNoOfTickets(Integer noOfTickets) {
        this.noOfTickets = noOfTickets;
    }
    
    public List<String> getSeatNumber() {
        return seatNumber;
    }
    
    public void setSeatNumber(List<String> seatNumber) {
        this.seatNumber = seatNumber;
    }
}