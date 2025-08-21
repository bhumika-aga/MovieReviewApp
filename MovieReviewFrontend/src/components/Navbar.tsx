import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Movie as MovieIcon,
  PersonAdd as RegisterIcon,
  Theaters as TheaterIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user =
      sessionStorage.getItem("userName") || sessionStorage.getItem("loginId");
    setIsLoggedIn(!!token);
    setUserName(user || "");
  }, [location]);

  const handleLogout = (): void => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    setAnchorEl(null);
    navigate("/login");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string): void => {
    navigate(path);
    handleMenuClose();
  };

  const menuItems = [
    { label: "Movies", path: "/movieList", icon: <MovieIcon /> },
    ...(isLoggedIn
      ? [{ label: "Theatres", path: "/theater-list", icon: <TheaterIcon /> }]
      : []),
  ];

  const authButtons = isLoggedIn ? (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body1" sx={{ display: { xs: "none", sm: "block" } }}>
        Welcome,{" "}
        <span style={{ color: theme.palette.primary.main }}>{userName}</span>!
      </Typography>
      <Button
        color="inherit"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ color: "white" }}
      >
        Logout
      </Button>
    </Box>
  ) : (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        color="inherit"
        startIcon={<RegisterIcon />}
        onClick={() => navigate("/register")}
        sx={{ color: "white" }}
      >
        Register
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<LoginIcon />}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/movieList")}
            sx={{ mr: 1 }}
          >
            <MovieIcon sx={{ fontSize: "2rem", color: "primary.main" }} />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              cursor: "pointer",
              "&:hover": { color: "primary.light" },
            }}
            onClick={() => navigate("/movieList")}
          >
            CinemaVerse
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                startIcon={item.icon}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color:
                    location.pathname === item.path ? "primary.main" : "white",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Desktop Auth Buttons */}
        {!isMobile && authButtons}

        {/* Mobile Menu */}
        {isMobile && (
          <Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: "background.paper",
                  minWidth: 200,
                },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "text.primary",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {item.icon}
                    {item.label}
                  </Box>
                </MenuItem>
              ))}

              {/* Mobile Auth Menu Items */}
              {isLoggedIn ? (
                <>
                  <MenuItem
                    disabled
                    sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                  >
                    Welcome, {userName}!
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LogoutIcon />
                      Logout
                    </Box>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => handleNavigation("/register")}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <RegisterIcon />
                      Register
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigation("/login")}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LoginIcon />
                      Login
                    </Box>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
