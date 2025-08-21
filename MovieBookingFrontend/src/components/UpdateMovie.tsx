import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';

const UpdateMovie: React.FC = () => {
  const { movieName } = useParams<{ movieName: string }>();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Update Movie
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {movieName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Update movie functionality coming soon!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateMovie;