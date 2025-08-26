package com.moviebookingapp.service.impl;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviebookingapp.model.Movie;
import com.moviebookingapp.model.Ticket;
import com.moviebookingapp.repository.MovieRepository;
import com.moviebookingapp.repository.TicketRepository;
import com.moviebookingapp.service.MockMovieService;
import com.moviebookingapp.service.MovieService;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private MockMovieService mockMovieService;

    @Override
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public List<Movie> getAllMovies() {
        try {
            return movieRepository.findAll();
        } catch (Exception e) {
            // Fallback to mock service when MongoDB is not available
            // MongoDB not available, using mock data service
            return mockMovieService.getAllMovies();
        }
    }

    @Override
    public List<Movie> getMovieByName(String movieName) {
        try {
            return movieRepository.findByMovieName(movieName);
        } catch (Exception e) {
            // Fallback to mock service when MongoDB is not available
            // MongoDB not available, using mock data service
            return mockMovieService.searchMovies(movieName);
        }
    }

    @Override
    public List<Movie> findAvailableTickets(String movieName, String theatreName) {
        return movieRepository.findAvailableTickets(movieName, theatreName);
    }

    @Override
    public boolean deleteMovieByName(String movieName) {
        movieRepository.deleteByMovieName(movieName);
        return true;
    }

    @Override
    public Ticket addTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> getAllBookedTickets(String movieName) {
        return ticketRepository.findByMovieName(movieName);
    }

    @Override
    public List<Ticket> findSeats(String movieName, String theatrename) {
        return ticketRepository.findSeats(movieName, theatrename);
    }

    public boolean updateAvailableTickets(String movieName, String theatreName, Integer noOfTickets) {
        ObjectId objectId = findAvailableTickets(movieName, theatreName).get(0).getMovieId();
        Movie movie = new Movie(objectId, movieName, theatreName,
                findAvailableTickets(movieName, theatreName).get(0).getTicketsAvailable() - noOfTickets);
        addMovie(movie);
        return true;
    }
}