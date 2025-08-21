import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import TheaterList from "./components/TheatreList";

// IMDB-like dark theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f5c518", // IMDB yellow
      contrastText: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#0f0f0f", // Very dark background
      paper: "#1a1a1a", // Dark paper background
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
    action: {
      hover: "rgba(245, 197, 24, 0.08)",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "Helvetica Neue", "sans-serif"].join(","),
    h1: {
      fontWeight: 700,
      color: "#f5c518",
    },
    h2: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h3: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h4: {
      fontWeight: 500,
      color: "#ffffff",
    },
    h5: {
      fontWeight: 500,
      color: "#ffffff",
    },
    h6: {
      fontWeight: 500,
      color: "#ffffff",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          border: "1px solid #333",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
            transition: "all 0.3s ease",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#f5c518",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#e6b800",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#555",
            },
            "&:hover fieldset": {
              borderColor: "#f5c518",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#f5c518",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          borderBottom: "1px solid #333",
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<MovieList />} />
            <Route path="/" element={<MovieList />} />
            <Route path="/movieList" element={<MovieList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/theater-list" element={<TheaterList />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
