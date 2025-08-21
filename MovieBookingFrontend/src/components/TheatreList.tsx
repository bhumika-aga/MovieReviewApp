import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { Movie } from '../types/Movie';

const TheatreList: React.FC = () => {
  const location = useLocation();
  const movie = location.state?.movie as Movie;

  if (!movie) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No Movie Selected
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please select a movie to view theatres.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Theatres
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {movie.movieName}
        </Typography>
        
        <Paper sx={{ p: 3, mb: 2, bgcolor: 'background.default' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">{movie.theatreName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.ticketsAvailable} seats available
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              disabled={movie.ticketsAvailable === 0}
            >
              Book Now
            </Button>
          </Box>
        </Paper>
      </Paper>
    </Container>
  );
};

export default TheatreList;