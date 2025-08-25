import { yupResolver } from "@hookform/resolvers/yup";
import {
  Movie as MovieIcon,
  PersonAdd as RegisterIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useAuth } from "../contexts/AuthContext";

interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
}

// Enhanced validation schema
const registrationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name cannot exceed 30 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name cannot exceed 30 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  email: yup
    .string()
    .required("Email address is required")
    .email("Please enter a valid email address")
    .max(100, "Email address cannot exceed 100 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  contactNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpRequest>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
    },
  });

  const onSubmit = async (data: SignUpRequest): Promise<void> => {
    setError("");
    setSuccess("");

    try {
      await register({
        ...data,
        contactNumber: parseInt(data.contactNumber),
      });
      setSuccess("Registration successful! You are now logged in.");
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again later.");
      }
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
          backgroundColor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <MovieIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join ReelCritic to start reviewing and discovering movies
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
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username"
                    placeholder="Enter your unique username"
                    variant="outlined"
                    error={!!errors.username}
                    helperText={
                      errors.username?.message ||
                      "3-20 characters, letters, numbers, and underscores only"
                    }
                    disabled={isSubmitting}
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
                    placeholder="Enter your first name"
                    variant="outlined"
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName?.message || "Letters and spaces only"
                    }
                    disabled={isSubmitting}
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
                    placeholder="Enter your last name"
                    variant="outlined"
                    error={!!errors.lastName}
                    helperText={
                      errors.lastName?.message || "Letters and spaces only"
                    }
                    disabled={isSubmitting}
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
                    label="Email Address"
                    placeholder="Enter your email address"
                    type="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={
                      errors.email?.message ||
                      "We'll use this for account notifications"
                    }
                    disabled={isSubmitting}
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
                    label="Phone Number"
                    placeholder="Enter 10-digit mobile number"
                    type="tel"
                    variant="outlined"
                    error={!!errors.contactNumber}
                    helperText={
                      errors.contactNumber?.message ||
                      "Indian mobile number (10 digits)"
                    }
                    disabled={isSubmitting}
                    inputProps={{
                      maxLength: 10,
                      pattern: "[6-9][0-9]{9}",
                    }}
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
                    placeholder="Create a strong password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    error={!!errors.password}
                    helperText={
                      errors.password?.message ||
                      "8+ characters with uppercase, lowercase, and number"
                    }
                    disabled={isSubmitting}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            disabled={isSubmitting}
                            aria-label="toggle password visibility"
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
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword?.message ||
                      "Must match the password above"
                    }
                    disabled={isSubmitting}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            disabled={isSubmitting}
                            aria-label="toggle password visibility"
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
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={20} />
                  ) : (
                    <RegisterIcon />
                  )
                }
                sx={{ py: 1.5 }}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Footer Links */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#f5c518",
                textDecoration: "none",
                fontWeight: "medium",
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
