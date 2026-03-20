import React, { createContext, useContext, useState, useEffect } from "react";
import { login, register, resetPassword, getMe, logoutApi } from "../Api/Auth";
import { AuthContextType, AuthResponse } from "./Type";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkToken = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await getMe();
      setIsAuthenticated(response.success === true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const result: AuthResponse = await login(email, password);
      setIsAuthenticated(result.success);
      return result;
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Ошибка при входе",
      };
    }
  };

  const registerUser = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const result: AuthResponse = await register(email, password);
      return result;
    } catch (error: unknown) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Ошибка при регистрации",
      };
    }
  };

  const resetPasswordUser = async (
    email: string,
    newPassword: string,
    reEnterPassword: string,
  ): Promise<AuthResponse> => {
    try {
      const result: AuthResponse = await resetPassword(
        email,
        newPassword,
        reEnterPassword,
      );
      return result;
    } catch (error: unknown) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Ошибка при сбросе пароля",
      };
    }
  };

  const logout = async (): Promise<AuthResponse> => {
    try {
      const result = await logoutApi();
      setIsAuthenticated(false);
      return result;
    } catch (error: unknown) {
      setIsAuthenticated(false);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Ошибка при выходе",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        loginUser,
        registerUser,
        resetPasswordUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
