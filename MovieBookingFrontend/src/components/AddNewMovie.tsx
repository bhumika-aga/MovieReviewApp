import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const AddNewMovie: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Add New Movie
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add movie functionality coming soon!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddNewMovie;