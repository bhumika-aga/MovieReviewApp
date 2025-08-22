import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Close as CloseIcon,
  Language as LanguageIcon,
  Person as PersonIcon,
  PlayArrow as PlayIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MovieService from "../services/MovieService";
import ReviewService, { ReviewResponse } from "../services/ReviewService";
import { Movie } from "../types/Movie";

// Using ReviewResponse from service instead

const MovieDetail: React.FC = () => {
  const { movieName } = useParams<{ movieName: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
  });

  useEffect(() => {
    if (movieName) {
      fetchMovieDetails();
      fetchReviews();
    }
  }, [movieName]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      // For now, we'll search for the movie by name
      const response = await MovieService.getMovieByName(movieName || "");
      const foundMovie = response.data.find(
        (m: Movie) =>
          m.movieName.toLowerCase() ===
          movieName?.toLowerCase().replace(/-/g, " ")
      );
      setMovie(foundMovie || null);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!movieName) return;

    try {
      const response = await ReviewService.getMovieReviews(movieName);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  const handleAddReview = async () => {
    if (!movieName || !isAuthenticated) return;

    try {
      setSubmittingReview(true);
      await ReviewService.addReview(movieName, newReview);
      setReviewDialogOpen(false);
      setNewReview({ rating: 5, title: "", content: "" });
      // Refresh reviews
      await fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
      // You might want to show an error message to the user
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      await ReviewService.markReviewHelpful(reviewId);
      // Refresh reviews to update the helpful count
      await fetchReviews();
    } catch (error) {
      console.error("Error marking review as helpful:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Movie not found</Typography>
        <Button onClick={() => navigate("/")} sx={{ mt: 2 }}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  const videoId = movie.trailerUrl ? getYouTubeVideoId(movie.trailerUrl) : null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Movie Header Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
              }}
              src={movie.moviePoster}
              alt={movie.movieName}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMTExIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSIjZjVjNTE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4Ij5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+";
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Title and Rating */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {movie.movieName}
              </Typography>

              {movie.rating && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating
                    value={movie.rating / 2}
                    precision={0.1}
                    readOnly
                    size="large"
                  />
                  <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
                    {movie.rating}/10
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 2 }}
                  >
                    ({movie.reviewCount} reviews)
                  </Typography>
                </Box>
              )}

              <Typography variant="h6" color="text.secondary" gutterBottom>
                {movie.description}
              </Typography>
            </Box>

            {/* Movie Info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    <strong>Director:</strong> {movie.director}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    <strong>Genre:</strong> {movie.genre}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TimeIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    <strong>Duration:</strong>{" "}
                    {Math.floor((movie.duration || 0) / 60)}h{" "}
                    {(movie.duration || 0) % 60}m
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CalendarIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    <strong>Release Date:</strong>{" "}
                    {new Date(movie.releaseDate || "").toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LanguageIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    <strong>Language:</strong> {movie.language}
                  </Typography>
                </Box>

                <Typography variant="body1">
                  <strong>Certificate:</strong> {movie.certificate}
                </Typography>
              </Grid>
            </Grid>

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Cast
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {movie.cast.map((actor, index) => (
                    <Chip key={index} label={actor} variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
              {videoId && (
                <Button
                  variant="contained"
                  startIcon={<PlayIcon />}
                  onClick={() => setTrailerOpen(true)}
                  size="large"
                >
                  Watch Trailer
                </Button>
              )}

              {movie.bookMyShowUrl && (
                <Button
                  variant="outlined"
                  onClick={() => window.open(movie.bookMyShowUrl, "_blank")}
                  size="large"
                >
                  Book Tickets
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Reviews Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h2">
            User Reviews
          </Typography>
          {isAuthenticated ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setReviewDialogOpen(true)}
            >
              Write Review
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Login to Write Review
            </Button>
          )}
        </Box>

        <List>
          {reviews.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", py: 4 }}
            >
              No reviews yet. Be the first to review this movie!
            </Typography>
          ) : (
            reviews.map((review) => (
              <React.Fragment key={review.reviewId}>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar>{review.username.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6">{review.title}</Typography>
                        <Rating
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {review.rating}/5
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          by {review.userFullName || review.username} •{" "}
                          {new Date(review.createdDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {review.content}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            size="small"
                            onClick={() => handleMarkHelpful(review.reviewId)}
                          >
                            Helpful ({review.helpful})
                          </Button>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>
      </Box>

      {/* Trailer Dialog */}
      <Dialog
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {movie.movieName} - Trailer
          <IconButton onClick={() => setTrailerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {videoId && (
            <Box
              sx={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography component="legend" gutterBottom>
              Rating
            </Typography>
            <Rating
              value={newReview.rating}
              onChange={(_, newValue) =>
                setNewReview({ ...newReview, rating: newValue || 0 })
              }
              size="large"
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Review Title"
              value={newReview.title}
              onChange={(e) =>
                setNewReview({ ...newReview, title: e.target.value })
              }
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Your Review"
              multiline
              rows={4}
              value={newReview.content}
              onChange={(e) =>
                setNewReview({ ...newReview, content: e.target.value })
              }
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                onClick={() => setReviewDialogOpen(false)}
                disabled={submittingReview}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddReview}
                disabled={
                  submittingReview ||
                  !newReview.title.trim() ||
                  !newReview.content.trim()
                }
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default MovieDetail;
