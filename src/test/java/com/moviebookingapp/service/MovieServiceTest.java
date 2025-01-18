package com.moviebookingapp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import com.moviebookingapp.model.Movie;
import com.moviebookingapp.model.Ticket;
import com.moviebookingapp.repository.MovieRepository;
import com.moviebookingapp.repository.TicketRepository;

@SpringBootTest
@ActiveProfiles("test")
public class MovieServiceTest {

	@MockBean
	private MovieRepository movieRepository;

	@MockBean
	private TicketRepository ticketRepository;

	@Autowired
	private MovieService movieService;

	@Test
	public void testGetAllMovies() {
		List<Movie> movies = new ArrayList<>();
		movies.add(new Movie("Movie 1", "Theatre 1", 120, "Book Now"));
		movies.add(new Movie("Movie 2", "Theatre 2", 150, "Book Now"));
		when(movieRepository.findAll()).thenReturn(movies);

		List<Movie> result = movieService.getAllMovies();
		assertEquals(movies, result);
	}

	@Test
	public void testGetMovieByName() {
		List<Movie> movies = new ArrayList<>();
		movies.add(new Movie("Dasara", "Miraj", 126, "Book ASAP"));
		movies.add(new Movie("The Matrix", "Hollywood", 150, "Experience the action"));
		movies.add(new Movie("Inception", "Hollywood", 148, "Your mind is the scene of the crime"));
		when(movieRepository.findByMovieName("Matrix")).thenReturn(
				movies.stream().filter(m -> m.getMovieName().equals("The Matrix")).collect(Collectors.toList()));
		List<Movie> result = movieService.getMovieByName("Matrix");

		assertEquals(1, result.size());
		assertEquals("The Matrix", result.get(0).getMovieName());
	}

	@Test
	public void testFindSeats() {
		List<Ticket> tickets = new ArrayList<>();
		tickets.add(new Ticket("Ram", "The Matrix", "Screen 1", 2, new ArrayList<String>(List.of("a1", "a2"))));
		when(ticketRepository.findSeats("The Matrix", "Screen 1")).thenReturn(tickets);
		List<Ticket> result = movieService.findSeats("The Matrix", "Screen 1");
		assertEquals(1, result.size());
	}

	@Test
	public void testFindAvailableTickets() {
		String movieName = "Avengers: Endgame";
		String theatreName = "Theatre 1";
		List<Movie> expectedMovies = new ArrayList<>();
		expectedMovies.add(new Movie("Avengers: Endgame", "Action", 180, "Incredible!"));
		expectedMovies.add(new Movie("Avengers: Endgame", "Action", 180, "Amazing!"));
		expectedMovies.add(new Movie("Avengers: Endgame", "Action", 180, "Thrilling!"));
		when(movieRepository.findAvailableTickets(movieName, theatreName)).thenReturn(expectedMovies);
		List<Movie> actualMovies = movieService.findAvailableTickets(movieName, theatreName);
		assertEquals(expectedMovies, actualMovies);
	}

	@Test
	public void testSaveTicket() {
		Ticket expectedTicket = new Ticket("Ram", "The Matrix", "Screen 1", 2,
				new ArrayList<String>(List.of("a1", "a2")));
		movieService.addTicket(expectedTicket);
		verify(ticketRepository, times(1)).save(expectedTicket);
	}

	@Test
	public void testSaveMovie() {
		Movie expectedMovie = new Movie("Avengers: Endgame", "Action", 180, "Incredible!");
		movieService.addMovie(expectedMovie);
		verify(movieRepository, times(1)).save(expectedMovie);
	}

	@Test
	public void testGetAllBookedTickets() {
		String movieName = "Avengers: Endgame";
		List<Ticket> expectedTickets = new ArrayList<>();
		expectedTickets.add(new Ticket("Ram", "The Matrix", "Screen 1", 2, new ArrayList<String>(List.of("a1", "a2"))));
		when(ticketRepository.findByMovieName(movieName)).thenReturn(expectedTickets);
		List<Ticket> actualTickets = movieService.getAllBookedTickets(movieName);
		assertEquals(expectedTickets, actualTickets);
	}

	@Test
	public void testFindByMovieName() {
		String movieName = "The Dark Knight";
		List<Movie> movies = new ArrayList<>(
				List.of(new Movie("The Dark Knight", "Christopher Nolan", 152, "A Batman Movie"),
						new Movie("The Dark Knight Rises", "Christopher Nolan", 165, "Another Batman Movie")));
		when(movieRepository.findByMovieName(movieName)).thenReturn(movies);
		assertEquals(movies, movieService.getMovieByName(movieName));
	}

	@Test
	public void testDeleteByMovieName() {
		String movieName = "The Dark Knight";
		movieService.deleteMovieByName(movieName);
		verify(movieRepository, times(1)).deleteByMovieName(movieName);
	}
}