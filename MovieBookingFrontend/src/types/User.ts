export interface User {
  id?: string;
  loginId: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface SignUpRequest {
  loginId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNumber: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: string;
  loginId: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}