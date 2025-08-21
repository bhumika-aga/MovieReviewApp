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
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { LoginRequest } from "../types/User";

// Validation schema
const loginSchema = yup.object({
  loginId: yup
    .string()
    .required("Login ID is required")
    .min(3, "Login ID must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      loginId: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginRequest): Promise<void> => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1.0/moviebooking/login",
        data
      );

      const { token, type, loginId, firstName, lastName, email, roles } =
        response.data;

      // Store user data in session storage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("tokenType", type);
      sessionStorage.setItem("loginId", loginId);
      sessionStorage.setItem("userName", `${firstName} ${lastName}`);
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userType", roles[0]);

      // Navigate to movies page
      navigate("/movieList");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError(
          "Invalid credentials. Please check your login ID and password."
        );
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
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
            Welcome to CinemaVerse
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

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} /> : <LoginIcon />
              }
              sx={{ py: 1.5, mt: 2 }}
            >
              {loading ? "Signing In..." : "Sign In"}
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
