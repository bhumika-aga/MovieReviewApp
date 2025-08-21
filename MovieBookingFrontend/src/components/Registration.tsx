import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonAdd as RegisterIcon,
  Movie as MovieIcon,
} from '@mui/icons-material';
import axios from 'axios';

import { SignUpRequest } from '../types/User';

// Validation schema
const registrationSchema = yup.object({
  loginId: yup
    .string()
    .required('Login ID is required')
    .min(3, 'Login ID must be at least 3 characters'),
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  contactNumber: yup
    .string()
    .required('Contact number is required')
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits'),
});

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequest>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      loginId: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contactNumber: '',
    },
  });

  const onSubmit = async (data: SignUpRequest): Promise<void> => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post(
        'http://localhost:8080/api/v1.0/moviebooking/register',
        data
      );

      setSuccess('Registration successful! Please login to continue.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <MovieIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join MovieBooking to start booking tickets
          </Typography>
        </Box>

        {/* Success/Error Alerts */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="loginId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Login ID"
                    variant="outlined"
                    error={!!errors.loginId}
                    helperText={errors.loginId?.message}
                    disabled={loading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    disabled={loading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    disabled={loading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={loading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Contact Number"
                    variant="outlined"
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber?.message}
                    disabled={loading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            disabled={loading}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <RegisterIcon />}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Footer Links */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#f5c518',
                textDecoration: 'none',
                fontWeight: 'medium',
              }}
            >
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Registration;