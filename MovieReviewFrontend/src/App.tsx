import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import TheaterList from "./components/TheatreList";
import { AuthProvider } from "./contexts/AuthContext";

// ReelCritic Premium Dark Theme - Enhanced IMDb-inspired design
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff6b35", // ReelCritic signature orange-red
      dark: "#e55a2b",
      light: "#ff8c5a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffd700", // Premium gold accent
      dark: "#ccad00",
      light: "#ffdf33",
      contrastText: "#000000",
    },
    background: {
      default: "#0a0a0a", // Deeper black background
      paper: "#1c1c1c", // Rich dark paper
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
    action: {
      hover: "rgba(255, 107, 53, 0.08)",
      selected: "rgba(255, 107, 53, 0.12)",
    },
    divider: "#333333",
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Arial",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      color: "#ff6b35",
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 700,
      color: "#ffffff",
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 600,
      color: "#ffffff",
      letterSpacing: "-0.015em",
    },
    h4: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h5: {
      fontWeight: 500,
      color: "#ffffff",
    },
    h6: {
      fontWeight: 500,
      color: "#cccccc",
    },
    body1: {
      color: "#ffffff",
      lineHeight: 1.6,
    },
    body2: {
      color: "#cccccc",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1c1c1c",
          border: "1px solid #333333",
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 40px rgba(255, 107, 53, 0.15)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "1px solid #ff6b35",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
          padding: "10px 24px",
          fontSize: "0.95rem",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)",
          color: "#ffffff",
          boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #e55a2b 0%, #d44922 100%)",
            boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #ffd700 0%, #ccad00 100%)",
          color: "#000000",
          "&:hover": {
            background: "linear-gradient(135deg, #ccad00 0%, #b8960d 100%)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": {
              borderColor: "#555555",
              borderWidth: 2,
            },
            "&:hover fieldset": {
              borderColor: "#ff6b35",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff6b35",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1c1c1c",
          borderBottom: "2px solid #333333",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: "#ffd700",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#333333",
          color: "#ffffff",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#444444",
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Navbar />
            <Routes>
              <Route index element={<MovieList />} />
              <Route path="/" element={<MovieList />} />
              <Route path="/movieList" element={<MovieList />} />
              <Route path="/movie/:movieName" element={<MovieDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/theater-list" element={<TheaterList />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
