import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  type: string;
  id: string;
  username: string;
  email: string;
  roles: string[];
}

interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNumber: number;
  role?: string[];
}

interface RegisterResponse {
  message: string;
}

class AuthService {
  private static readonly API_URL = `${API_BASE_URL}/api/v1.0/moviebooking`;

  static async login(loginData: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.API_URL}/login`,
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  }

  static async register(registerData: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> {
    try {
      const response = await axios.post<RegisterResponse>(
        `${this.API_URL}/register`,
        registerData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Registration service error:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  static getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export default AuthService;