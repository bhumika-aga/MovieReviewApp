import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const BookTicket: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Book Ticket
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ticket booking functionality coming soon!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookTicket;