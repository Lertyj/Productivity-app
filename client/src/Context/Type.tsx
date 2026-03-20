export interface UserData {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: UserData;
  error?: string | string[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (email: string, password: string) => Promise<AuthResponse>;
  registerUser: (email: string, password: string) => Promise<AuthResponse>;
  resetPasswordUser: (
    email: string,
    newPassword: string,
    reEnterPassword: string,
  ) => Promise<AuthResponse>;
  logout: () => Promise<AuthResponse>;
}
