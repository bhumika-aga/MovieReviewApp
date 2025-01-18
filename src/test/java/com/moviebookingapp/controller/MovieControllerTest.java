package com.moviebookingapp.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.moviebookingapp.model.Movie;
import com.moviebookingapp.model.Ticket;
import com.moviebookingapp.service.MovieService;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class MovieControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private MovieService movieService;

	// @MockBean
	// private KafkaTemplate template;

	// Mock the authentication process
	private void authUser() {
		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("testUser",
				"testPassword", List.of(new SimpleGrantedAuthority("USER"))));
	}

	private void authAdmin() {
		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("testUser",
				"testPassword", List.of(new SimpleGrantedAuthority("ADMIN"))));
	}

	// Use MockMvc to send a get request to the /api/v1.0/moviebooking/all endpoint
	@Test
	public void getAllMoviesAndFoundNone() throws Exception {
		authUser();
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1.0/moviebooking/all")).andExpect(status().isNotFound());
	}

	@Test
	public void getAllMoviesAndFound() throws Exception {
		authUser();
		List<Movie> movies = new ArrayList<>();
		Movie movie1 = new Movie("Movie 1", "Theatre 1", 120, "Book Now");
		Movie movie2 = new Movie("Movie 2", "Theatre 2", 150, "Book Now");
		movies.add(movie1);
		movies.add(movie2);
		when(movieService.getAllMovies()).thenReturn(movies);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1.0/moviebooking/all")).andExpect(status().isFound());
	}

	// Use MockMvc to send a get request to the
	// /api/v1.0/moviebooking/movies/search/{movieName} endpoint

	@Test
	public void testGetMovieByNameAndFound() throws Exception {
		authUser();
		String movieName = "Movie";
		List<Movie> movies = new ArrayList<>();
		movies.add(new Movie("Movie", "Theatre", 120, "Book Now"));
		when(movieService.getMovieByName(movieName)).thenReturn(movies);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1.0/moviebooking/movies/search/{movieName}", movieName))
				.andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));
	}

	@Test
	public void testGetMovieByNameAndNotFound() throws Exception {
		authUser();
		String movieName = "Movie";
		List<Movie> movies = new ArrayList<>();
		when(movieService.getMovieByName(movieName)).thenReturn(movies);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1.0/moviebooking/movies/search/{movieName}", movieName))
				.andExpect(status().isNotFound());
	}

	public void testGetAllBookedTickets() throws Exception {
		authAdmin();
		List<Ticket> tickets = new ArrayList<>();
		tickets.add(new Ticket("Ram", "The Matrix", "Screen 1", 2, new ArrayList<String>(List.of("a1", "a2"))));
		when(movieService.getAllBookedTickets("Movie1")).thenReturn(tickets);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1.0/moviebooking/userTickets/Movie1"))
				.andExpect(status().isOk());
	}

}