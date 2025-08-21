import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const ResetPassword: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This feature is coming soon!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;