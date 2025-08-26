package com.moviebookingapp.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moviebookingapp.exception.MovieNotFoundException;
import com.moviebookingapp.exception.SeatAlreadyBookedException;
import com.moviebookingapp.model.Movie;
import com.moviebookingapp.model.Ticket;
import com.moviebookingapp.model.User;
import com.moviebookingapp.payload.request.LoginRequest;
import com.moviebookingapp.repository.MovieRepository;
import com.moviebookingapp.repository.TicketRepository;
import com.moviebookingapp.repository.UserRepository;
import com.moviebookingapp.service.MovieService;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@CrossOrigin("*")
@OpenAPIDefinition(info = @Info(title = "Movie Application API", description = "Provides endpoints for managing movies."))
public class MovieController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private MovieService movieService;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private MovieRepository movieRepository;

    @PutMapping("/{username}/forgot")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "reset password")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> changePassword(@RequestBody LoginRequest request,
            @PathVariable("username") String username) {
        Optional<User> newUser = userRepository.findByUsername(username);
        User availableUser = new User();
        if (newUser.isPresent()) {
            availableUser = newUser.get();
        }
        User updatedUser = new User(username, availableUser.getFirstName(), availableUser.getLastName(),
                availableUser.getEmail(), availableUser.getContactNumber(),
                encoder.encode(availableUser.getPassword()));
        updatedUser.setUserId(availableUser.getUserId());
        updatedUser.setRole(availableUser.getRole());
        userRepository.save(updatedUser);
        return new ResponseEntity<>("Password changed successfully!", HttpStatus.OK);
    }

    @GetMapping("/all")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "search all movies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> allMovies = movieService.getAllMovies();
        if (allMovies.isEmpty()) {
            throw new MovieNotFoundException("No Movies Available!");
        }
        return new ResponseEntity<>(allMovies, HttpStatus.OK);
    }

    @GetMapping("/movies/search/{movieName}")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Search Movies By Name")
    public ResponseEntity<List<Movie>> getMovieByName(@PathVariable("movieName") String movieName) {
        List<Movie> allMovies = movieService.getMovieByName(movieName);
        if (allMovies.isEmpty()) {
            throw new MovieNotFoundException("Movie not found: " + movieName);
        }
        return ResponseEntity.ok(allMovies);
    }

    @PostMapping("/{movieName}/add")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "book ticket")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> bookTickets(@RequestBody Ticket ticket, @PathVariable("movieName") String movieName) {
        List<Ticket> allTickets = movieService.findSeats(movieName, ticket.getTheatreName());
        for (Ticket each : allTickets) {
            for (int i = 0; i < ticket.getNoOfTickets(); i++) {
                if (each.getSeatNumber().contains(ticket.getSeatNumber().get(i))) {
                    throw new SeatAlreadyBookedException(
                            "Seat number " + ticket.getSeatNumber().get(i) + " is already booked!");
                }
            }
        }

        if (movieService.findAvailableTickets(movieName, ticket.getTheatreName()).get(0).getTicketsAvailable() >= ticket
                .getNoOfTickets()) {
            movieService.addTicket(ticket);
            movieService.updateAvailableTickets(movieName, ticket.getTheatreName(), ticket.getNoOfTickets());
            return ResponseEntity.ok("Tickets Booked Successfully! Seat Numbers are: " + ticket.getSeatNumber());
        }

        return new ResponseEntity<>("\"All Tickets Sold Out!\"", HttpStatus.OK);
    }

    @GetMapping("/userTickets/{movieName}")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Get all booked tickets(Admin Only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Ticket>> getAllBookedTickets(@PathVariable("movieName") String movieName) {
        return ResponseEntity.ok(movieService.getAllBookedTickets(movieName));
    }

    @PutMapping("/{movieName}/update/{ticketId}")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update the status of tickets available for a movie (Admin Only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateTicketStatus(@PathVariable("movieName") String movieName,
            @PathVariable("ticketId") ObjectId ticketId) {
        List<Movie> movie = movieRepository.findByMovieName(movieName);
        List<Ticket> ticket = ticketRepository.findByTicketId(ticketId);
        if (movie.isEmpty()) {
            throw new MovieNotFoundException("Movie not found: " + movieName);
        }
        if (ticket.isEmpty()) {
            throw new NoSuchElementException("Ticket not found: " + ticketId);
        }
        for (Movie eachMovie : movie) {
            if (eachMovie.getTicketsAvailable().equals(0)) {
                eachMovie.setTicketStatus("SOLD OUT");
            } else {
                eachMovie.setTicketStatus("BOOK ASAP");
            }
            movieService.addMovie(eachMovie);
        }
        return new ResponseEntity<>("Ticket status updated successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/{movieName}/delete/{movieId}")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete a movie (Admin Only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteMovie(@PathVariable("movieName") String movieName,
            @PathVariable("movieId") ObjectId movieId) {
        List<Movie> availableMovies = movieService.getMovieByName(movieName);
        if (availableMovies.isEmpty()) {
            throw new MovieNotFoundException("No movies available with the name: " + movieName);
        }
        movieService.deleteMovieByName(movieName);
        return new ResponseEntity<>("Movie deleted successfully!", HttpStatus.OK);
    }
}