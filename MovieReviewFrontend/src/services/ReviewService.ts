import axios, { AxiosResponse } from 'axios';
import AuthService from './AuthService';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

interface ReviewRequest {
  rating: number;
  title: string;
  content: string;
}

interface ReviewResponse {
  reviewId: string;
  userId: string;
  username: string;
  userFullName: string;
  movieName: string;
  rating: number;
  title: string;
  content: string;
  createdDate: string;
  helpful: number;
}

interface MessageResponse {
  message: string;
}

class ReviewService {
  private static readonly API_URL = `${API_BASE_URL}/api/v1.0/moviebooking`;

  static async addReview(movieName: string, reviewData: ReviewRequest): Promise<AxiosResponse<MessageResponse>> {
    try {
      const response = await axios.post<MessageResponse>(
        `${this.API_URL}/movies/${encodeURIComponent(movieName)}/reviews`,
        reviewData,
        {
          headers: {
            'Content-Type': 'application/json',
            ...AuthService.getAuthHeader(),
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Add review service error:', error);
      throw error;
    }
  }

  static async getMovieReviews(movieName: string): Promise<AxiosResponse<ReviewResponse[]>> {
    try {
      const response = await axios.get<ReviewResponse[]>(
        `${this.API_URL}/movies/${encodeURIComponent(movieName)}/reviews`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Get movie reviews service error:', error);
      throw error;
    }
  }

  static async getUserReviews(username: string): Promise<AxiosResponse<ReviewResponse[]>> {
    try {
      const response = await axios.get<ReviewResponse[]>(
        `${this.API_URL}/users/${encodeURIComponent(username)}/reviews`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Get user reviews service error:', error);
      throw error;
    }
  }

  static async markReviewHelpful(reviewId: string): Promise<AxiosResponse<MessageResponse>> {
    try {
      const response = await axios.put<MessageResponse>(
        `${this.API_URL}/reviews/${reviewId}/helpful`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Mark review helpful service error:', error);
      throw error;
    }
  }
}

export default ReviewService;
export type { ReviewRequest, ReviewResponse };

