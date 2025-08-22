import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MovieService from "../services/MovieService";
import { Movie } from "../types/Movie";
import MovieComponent from "./Movie";

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    const role = sessionStorage.getItem("userType");
    setIsAdmin(role || "");
  }, [location]);

  const filterArray = (data: Movie[]): Movie[] => {
    const filteredArray: Movie[] = [];
    data.forEach((movie) => {
      if (!filteredArray.some((item) => item.movieName === movie.movieName)) {
        filteredArray.push(movie);
      }
    });
    return filteredArray;
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await MovieService.getMovies();
        const uniqueArray = filterArray(response.data);
        setMovies(uniqueArray);
        setFilteredMovies(uniqueArray);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setErrorMessage("Failed to load movies. Please try again.");
        setShowError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const matchesSearch = movie.movieName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGenre =
        !selectedGenre ||
        movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase());
      return matchesSearch && matchesGenre;
    });
    setFilteredMovies(filtered);
  }, [movies, searchTerm, selectedGenre]);

  const deleteMovie = async (movieName: string): Promise<void> => {
    try {
      await MovieService.deleteMovie(movieName);
      const updatedMovies = movies.filter(
        (movie) => movie.movieName !== movieName
      );
      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);
    } catch (error: any) {
      if (error.response?.data?.message?.includes("Required request header")) {
        setErrorMessage(
          "You are not logged in. Please login before proceeding."
        );
      } else {
        setErrorMessage("Failed to delete movie. Please try again.");
      }
      setShowError(true);
    }
  };

  const genres = [
    ...new Set(
      movies.map((movie) => movie.genre?.split(",")[0]?.trim()).filter(Boolean)
    ),
  ];

  const handleCloseError = (): void => {
    setShowError(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          🎬 CinemaVerse
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Your Universe of Cinema Experiences
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="text.secondary">
              {filteredMovies.length} movie
              {filteredMovies.length !== 1 ? "s" : ""} found
            </Typography>
          </Grid>

          {isAdmin === "ROLE_ADMIN" && (
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate("/add-movie")}
                sx={{ py: 1.5 }}
              >
                Add Movie
              </Button>
            </Grid>
          )}
        </Grid>
      </Card>

      {/* Movies Grid */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress size={60} sx={{ color: "primary.main" }} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredMovies.map((movie, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`${movie.movieName}-${movie.theatreName}-${index}`}
            >
              <MovieComponent
                movie={movie}
                onDelete={deleteMovie}
                isAdmin={isAdmin === "ROLE_ADMIN"}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* No Movies Found */}
      {!loading && filteredMovies.length === 0 && (
        <Card sx={{ p: 6, textAlign: "center", mt: 4 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No movies found
          </Typography>
          <Typography color="text.secondary">
            {searchTerm || selectedGenre
              ? "Try adjusting your search or filter criteria"
              : "No movies available at the moment"}
          </Typography>
        </Card>
      )}

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MovieList;
