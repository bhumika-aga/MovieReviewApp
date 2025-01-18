package com.moviebookingapp.model;

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
	private Integer ticketsAvailable;
	private String ticketStatus;

	public ObjectId getMovieId() {
		return movieId;
	}

	public void setMovieId(ObjectId movieId) {
		this.movieId = movieId;
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

	public Integer getTicketsAvailable() {
		return ticketsAvailable;
	}

	public void setTicketsAvailable(Integer ticketsAvailable) {
		this.ticketsAvailable = ticketsAvailable;
	}

	public String getTicketStatus() {
		return ticketStatus;
	}

	public void setTicketStatus(String ticketStatus) {
		this.ticketStatus = ticketStatus;
	}

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
}