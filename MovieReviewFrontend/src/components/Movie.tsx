import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PosterService from "../services/PosterService";
import { Movie as MovieType } from "../types/Movie";

interface MovieProps {
  movie: MovieType;
  onDelete: (movieName: string) => Promise<void>;
  isAdmin: boolean;
}

const Movie: React.FC<MovieProps> = ({ movie, onDelete, isAdmin }) => {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [posterUrl, setPosterUrl] = useState<string>(movie.moviePoster || "");

  const handleBookTickets = (): void => {
    // Use encodeURIComponent to properly handle special characters like colons
    navigate(`/movie/${encodeURIComponent(movie.movieName)}`);
  };

  const handleEditMovie = (): void => {
    navigate(`/edit-movie/${movie.movieName}`);
  };

  const handleDeleteClick = (): void => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(movie.movieName);
      setShowDeleteDialog(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = (): void => {
    setShowDeleteDialog(false);
  };

  const formatDuration = (duration?: number): string => {
    if (!duration) return "";
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const getImageSrc = (): string => {
    if (imageError) {
      // Create a simple SVG placeholder as a data URL using encodeURIComponent
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
        <rect width="300" height="450" fill="#1a1a1a"/>
        <circle cx="150" cy="180" r="40" fill="#f5c518"/>
        <rect x="130" y="160" width="40" height="30" fill="#1a1a1a"/>
        <rect x="135" y="175" width="8" height="8" fill="#1a1a1a"/>
        <rect x="157" y="175" width="8" height="8" fill="#1a1a1a"/>
        <text x="150" y="250" font-family="Arial, sans-serif" font-size="14" fill="#f5c518" text-anchor="middle">No Image</text>
        <text x="150" y="270" font-family="Arial, sans-serif" font-size="14" fill="#f5c518" text-anchor="middle">Available</text>
      </svg>`;
      return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    }

    // Use the posterUrl state which might be updated by PosterService
    if (posterUrl) {
      if (posterUrl.startsWith("http")) {
        return posterUrl;
      }
      return `data:image/jpeg;base64,${posterUrl}`;
    }

    // Default fallback for movies without posters
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
      <rect width="300" height="450" fill="#1a1a1a"/>
      <circle cx="150" cy="180" r="40" fill="#f5c518"/>
      <rect x="130" y="160" width="40" height="30" fill="#1a1a1a"/>
      <rect x="135" y="175" width="8" height="8" fill="#1a1a1a"/>
      <rect x="157" y="175" width="8" height="8" fill="#1a1a1a"/>
      <text x="150" y="250" font-family="Arial, sans-serif" font-size="14" fill="#f5c518" text-anchor="middle">No Image</text>
      <text x="150" y="270" font-family="Arial, sans-serif" font-size="14" fill="#f5c518" text-anchor="middle">Available</text>
    </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const handleImageError = (): void => {
    setImageError(true);
  };

  // Fetch better poster URL on component mount
  useEffect(() => {
    const fetchPosterUrl = async () => {
      try {
        const year = movie.releaseDate
          ? new Date(movie.releaseDate).getFullYear().toString()
          : undefined;
        const betterUrl = await PosterService.getPosterUrl(
          movie.movieName,
          movie.moviePoster,
          year,
        );

        if (betterUrl && betterUrl !== movie.moviePoster) {
          setPosterUrl(betterUrl);
          setImageError(false); // Reset error state when we get a new URL
        }
      } catch (error) {}
    };

    fetchPosterUrl();
  }, [movie.movieName, movie.moviePoster, movie.releaseDate]);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 30px rgba(245, 197, 24, 0.2)",
          },
        }}
      >
        <Box sx={{ position: "relative", maxWidth: "267px", margin: "0 auto" }}>
          <CardMedia
            component="img"
            image={getImageSrc()}
            alt={movie.movieName}
            onError={handleImageError}
            sx={{
              width: "100%",
              height: "500px", // Set to 500px to match poster aspect ratio
              objectFit: "contain", // Fit entire image within container without cropping
              objectPosition: "center", // Center the image
              transition: "transform 0.3s ease",
              backgroundColor: "#1c1c1c", // Fallback background
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />

          {/* Rating Badge */}
          {movie.rating && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "primary.main",
                color: "black",
                borderRadius: 1,
                px: 1,
                py: 0.5,
                fontWeight: "bold",
                fontSize: "0.875rem",
              }}
            >
              <StarIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
              {movie.rating.toFixed(1)}
            </Box>
          )}

          {/* Play Button Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <IconButton
              onClick={handleBookTickets}
              sx={{
                backgroundColor: "rgba(245, 197, 24, 0.9)",
                color: "black",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              <PlayIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              lineHeight: 1.2,
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.movieName}
          </Typography>

          {/* Movie Details */}
          <Box sx={{ mb: 2, space: 1 }}>
            {movie.releaseDate && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Year: {new Date(movie.releaseDate).getFullYear()}
              </Typography>
            )}

            {movie.duration && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <TimeIcon
                  sx={{ fontSize: "1rem", mr: 0.5, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatDuration(movie.duration)}
                </Typography>
              </Box>
            )}

            {movie.genre && (
              <Box sx={{ mb: 1 }}>
                <Chip
                  label={movie.genre.split(",")[0]?.trim()}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    height: "24px",
                    borderColor: "primary.main",
                    color: "primary.main",
                  }}
                />
              </Box>
            )}

            {movie.director && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                Director: {movie.director}
              </Typography>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                Stars: {movie.cast.slice(0, 3).join(", ")}
              </Typography>
            )}
          </Box>

          {/* Theatre and Review Info */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Theatre: {movie.theatreName}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarIcon
                sx={{ fontSize: "1rem", mr: 0.5, color: "text.secondary" }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  fontWeight: "medium",
                }}
              >
                {movie.reviewCount} reviews • {movie.status}
              </Typography>
            </Box>
          </Box>

          {/* Rating Display */}
          {movie.rating && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                value={movie.rating / 2}
                precision={0.1}
                readOnly
                size="small"
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                ({movie.rating}/10)
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ mt: "auto" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleBookTickets}
              sx={{ mb: isAdmin ? 1 : 0, py: 1 }}
            >
              Read Reviews
            </Button>

            {movie.bookMyShowUrl && (
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => window.open(movie.bookMyShowUrl, "_blank")}
                sx={{ mb: isAdmin ? 1 : 0, py: 0.75, mt: 1 }}
                size="small"
              >
                Book on BookMyShow
              </Button>
            )}

            {isAdmin && (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEditMovie}
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteClick}
                  size="small"
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{movie.movieName}"? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Movie;
