package com.moviebookingapp.service;

import java.util.List;

import com.moviebookingapp.model.Movie;
import com.moviebookingapp.model.Ticket;

public interface MovieService {

	public Movie addMovie(Movie movie);

	public List<Movie> getAllMovies();

	public List<Movie> getMovieByName(String movieName);

	public List<Movie> findAvailableTickets(String movieName, String theatreName);

	public boolean deleteMovieByName(String movieName);

	public Ticket addTicket(Ticket ticket);

	public List<Ticket> getAllBookedTickets(String movieName);

	public List<Ticket> findSeats(String movieName, String theatrename);

	public boolean updateAvailableTickets(String movieName, String theatreName, Integer noOfTickets);
}