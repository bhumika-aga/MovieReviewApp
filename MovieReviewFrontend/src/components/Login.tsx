import { yupResolver } from "@hookform/resolvers/yup";
import {
  Login as LoginIcon,
  Movie as MovieIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useAuth } from "../contexts/AuthContext";

interface LoginRequest {
  username: string;
  password: string;
}

// Enhanced validation schema
const loginSchema = yup.object({
  username: yup
    .string()
    .required("Username or email is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Get the intended destination or default to home
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginRequest): Promise<void> => {
    setError("");

    try {
      await login(data.username, data.password);
      // Navigate to intended destination or home
      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError(
          "Invalid credentials. Please check your username and password."
        );
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
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
            Welcome to ReelCritic
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to your universe of cinema experiences
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Username"
                  placeholder="Enter your username"
                  variant="outlined"
                  error={!!errors.username}
                  helperText={
                    errors.username?.message || "Your ReelCritic username"
                  }
                  disabled={isSubmitting}
                  autoComplete="username"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={
                    errors.password?.message || "Your account password"
                  }
                  disabled={isSubmitting}
                  autoComplete="current-password"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? <CircularProgress size={20} /> : <LoginIcon />
              }
              sx={{ py: 1.5, mt: 2 }}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </form>

        {/* Footer Links */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#f5c518",
                textDecoration: "none",
                fontWeight: "medium",
              }}
            >
              Sign up here
            </Link>
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Link
              to="/reset-password"
              style={{
                color: "#f5c518",
                textDecoration: "none",
                fontWeight: "medium",
              }}
            >
              Forgot your password?
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
